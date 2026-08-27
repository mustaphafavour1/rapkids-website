import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Single-password auth for the /admin content base. No user accounts, no
 * database of credentials — just one shared secret (KB_ADMIN_PASSWORD) and a
 * signed, expiring session cookie (signed with KB_SESSION_SECRET) so we never
 * store the password itself client-side.
 */

export const ADMIN_SESSION_COOKIE = "kb_admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

export function isAdminConfigured(): boolean {
  return Boolean(process.env.KB_ADMIN_PASSWORD && process.env.KB_SESSION_SECRET);
}

/** Constant-time password comparison (via fixed-length digests) to avoid timing leaks. */
export function checkPassword(candidate: string): boolean {
  const expected = process.env.KB_ADMIN_PASSWORD;
  if (!expected || !candidate) return false;
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Returns null if KB_SESSION_SECRET isn't set — callers must treat that as "can't log in." */
export function createSessionCookieValue(): string | null {
  const secret = process.env.KB_SESSION_SECRET;
  if (!secret) return null;
  const exp = Date.now() + SESSION_TTL_MS;
  const sig = createHmac("sha256", secret).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}

export function verifySessionCookieValue(value: string | undefined | null): boolean {
  const secret = process.env.KB_SESSION_SECRET;
  if (!secret || !value) return false;

  const [expStr, sig] = value.split(".");
  if (!expStr || !sig) return false;

  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;

  const expectedSig = createHmac("sha256", secret).update(expStr).digest("hex");
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expectedSig, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
