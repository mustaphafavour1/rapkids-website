import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, verifySessionCookieValue } from "@/lib/admin-auth";
import { KB_SECTIONS, MAX_FIELD_LENGTH, getKnowledgeBase, isKbPersistent, saveKnowledgeBase } from "@/lib/kb-store";

export const runtime = "nodejs";

function isAuthed(): boolean {
  const value = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionCookieValue(value);
}

export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const kb = await getKnowledgeBase();
  return NextResponse.json({ kb, persistent: isKbPersistent(), maxFieldLength: MAX_FIELD_LENGTH });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const update: Partial<Record<(typeof KB_SECTIONS)[number], string>> = {};

  for (const section of KB_SECTIONS) {
    const value = input[section];
    if (value === undefined) continue;
    if (typeof value !== "string") {
      return NextResponse.json({ error: `"${section}" must be text.` }, { status: 400 });
    }
    update[section] = value;
  }

  const kb = await saveKnowledgeBase(update);
  return NextResponse.json({ kb, persistent: isKbPersistent(), maxFieldLength: MAX_FIELD_LENGTH });
}
