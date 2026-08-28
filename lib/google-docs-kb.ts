import "server-only";

/**
 * The chatbot's knowledge base lives in four Google Docs (one per topic),
 * each set as a share-link env var — no admin page, no database. Each doc
 * must be shared as "Anyone with the link → Viewer" so the server can read
 * its plain-text export without authenticating as anyone.
 *
 * Reads fetch the doc's live export on demand, cached briefly per process so
 * a burst of chat messages doesn't refetch on every turn, while an edit in
 * the doc still shows up within about a minute — no redeploy required.
 */

export type KnowledgeBase = {
  rapkids: string;
  raptures: string;
  championship: string;
  guidelines: string;
};

const SECTION_ENV: Record<keyof KnowledgeBase, string> = {
  rapkids: "KB_DOC_RAPKIDS_URL",
  raptures: "KB_DOC_RAPTURES_URL",
  championship: "KB_DOC_CHAMPIONSHIP_URL",
  guidelines: "KB_DOC_GUIDELINES_URL",
};

/** Caps the worst-case system prompt size per section. */
export const MAX_SECTION_LENGTH = 4000;

const CACHE_TTL_MS = 60_000;

type CacheEntry = { text: string; fetchedAt: number };
const cache = new Map<string, CacheEntry>();

/** Accepts a full Google Docs share link (any of the usual formats) or a bare doc ID. */
function extractDocId(urlOrId: string): string | null {
  const trimmed = urlOrId.trim();
  if (!trimmed) return null;

  const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1]!;

  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) return trimmed;

  return null;
}

async function fetchDocText(docId: string): Promise<string | null> {
  const url = `https://docs.google.com/document/d/${docId}/export?format=txt`;

  let res: Response;
  try {
    res = await fetch(url, { redirect: "follow", cache: "no-store" });
  } catch (err) {
    console.warn(`[kb] fetch failed for doc ${docId}:`, err);
    return null;
  }

  if (!res.ok) {
    console.warn(
      `[kb] export for doc ${docId} returned ${res.status} — is it shared as "Anyone with the link"?`
    );
    return null;
  }

  // A doc that isn't publicly link-shared quietly redirects to a Google
  // sign-in page (still a 200) instead of erroring, so confirm we actually
  // landed on a docs.google.com response, not an accounts.google.com page.
  if (!res.url.includes("docs.google.com")) {
    console.warn(`[kb] export for doc ${docId} redirected away — check its sharing settings.`);
    return null;
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("text/plain")) {
    console.warn(`[kb] export for doc ${docId} returned unexpected content-type "${contentType}".`);
    return null;
  }

  return (await res.text()).trim();
}

async function getSectionText(section: keyof KnowledgeBase): Promise<string> {
  const envValue = process.env[SECTION_ENV[section]];
  if (!envValue) return "";

  const docId = extractDocId(envValue);
  if (!docId) {
    console.warn(`[kb] ${SECTION_ENV[section]} doesn't look like a Google Docs URL or ID.`);
    return "";
  }

  const cached = cache.get(docId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.text;
  }

  const text = await fetchDocText(docId);
  if (text === null) {
    // Serve the last known-good copy through a transient hiccup rather than
    // dropping the section to empty.
    return cached?.text ?? "";
  }

  const clamped = text.slice(0, MAX_SECTION_LENGTH);
  cache.set(docId, { text: clamped, fetchedAt: Date.now() });
  return clamped;
}

export async function getKnowledgeBase(): Promise<KnowledgeBase> {
  const [rapkids, raptures, championship, guidelines] = await Promise.all([
    getSectionText("rapkids"),
    getSectionText("raptures"),
    getSectionText("championship"),
    getSectionText("guidelines"),
  ]);
  return { rapkids, raptures, championship, guidelines };
}
