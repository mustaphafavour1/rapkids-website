import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, isAdminConfigured, verifySessionCookieValue } from "@/lib/admin-auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import KnowledgeBaseEditor from "@/components/admin/KnowledgeBaseEditor";

export const metadata: Metadata = {
  title: "Content Base",
  robots: { index: false, follow: false },
};

// This page's content depends on the request's session cookie; without this,
// a build where KB_ADMIN_PASSWORD/KB_SESSION_SECRET aren't set yet would skip
// the cookies() call entirely (short-circuited below) and Next could cache
// this page as static, freezing it at build-time state forever.
export const dynamic = "force-dynamic";

export default function AdminPage() {
  const configured = isAdminConfigured();
  const authed = configured && verifySessionCookieValue(cookies().get(ADMIN_SESSION_COOKIE)?.value);

  return (
    <main className="min-h-screen bg-surface py-20">
      <div className="container-page">
        {!configured ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-peach/30 bg-peach/[0.06] p-8 text-center">
            <h1 className="font-display text-2xl font-bold text-cream">Admin Not Configured</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Set <code>KB_ADMIN_PASSWORD</code> and <code>KB_SESSION_SECRET</code> as environment
              variables, then reload this page.
            </p>
          </div>
        ) : authed ? (
          <KnowledgeBaseEditor />
        ) : (
          <AdminLoginForm />
        )}
      </div>
    </main>
  );
}
