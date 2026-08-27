"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, LogOut } from "lucide-react";

type KbFields = {
  rapkids: string;
  raptures: string;
  championship: string;
  guidelines: string;
};

const EMPTY: KbFields = { rapkids: "", raptures: "", championship: "", guidelines: "" };

const SECTIONS: {
  key: keyof KbFields;
  label: string;
  hint: string;
}[] = [
  {
    key: "rapkids",
    label: "RapKids",
    hint: "What RapKids is, how the app works, what the subscription includes — general brand and product facts.",
  },
  {
    key: "raptures",
    label: "Raptures",
    hint: "Anything about Raptures the assistant should know and be able to answer questions on.",
  },
  {
    key: "championship",
    label: "The Championship",
    hint: "Extra championship notes beyond what's already on the site (the site's own rules/prizes/FAQ pages are included automatically).",
  },
  {
    key: "guidelines",
    label: "Response Guidelines",
    hint: "Tone, boundaries, things to always say or never say. These are added as extra instructions for the assistant.",
  },
];

export default function KnowledgeBaseEditor() {
  const router = useRouter();
  const [fields, setFields] = useState<KbFields>(EMPTY);
  const [maxFieldLength, setMaxFieldLength] = useState(4000);
  const [persistent, setPersistent] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/kb");
        if (res.status === 401) {
          router.refresh();
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        setFields({
          rapkids: data.kb?.rapkids ?? "",
          raptures: data.kb?.raptures ?? "",
          championship: data.kb?.championship ?? "",
          guidelines: data.kb?.guidelines ?? "",
        });
        setUpdatedAt(data.kb?.updatedAt || null);
        setPersistent(Boolean(data.persistent));
        setMaxFieldLength(data.maxFieldLength ?? 4000);
      } catch {
        if (!cancelled) setStatus({ kind: "error", text: "Couldn't load the content base." });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/kb", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus({ kind: "error", text: data?.error ?? "Couldn't save." });
        return;
      }
      setUpdatedAt(data.kb?.updatedAt || null);
      setStatus({ kind: "ok", text: "Saved." });
    } catch {
      setStatus({ kind: "error", text: "Network error. Try again." });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    router.refresh();
  };

  if (loading) {
    return <p className="text-center text-sm text-muted">Loading content base…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-cream">Content Base</h1>
          <p className="mt-1 text-sm text-muted">
            What the RapKids chatbot knows, and how it should respond.
            {updatedAt ? ` Last saved ${new Date(updatedAt).toLocaleString()}.` : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-full border border-line/20 px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-punch/40 hover:text-cream"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>

      {!persistent ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-peach/30 bg-peach/[0.06] p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-peach" />
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-semibold text-cream">No persistent storage configured.</span>{" "}
            Upstash Redis env vars (<code>UPSTASH_REDIS_REST_URL</code>, <code>UPSTASH_REDIS_REST_TOKEN</code>) aren&apos;t
            set, so changes only last for this server session and won&apos;t survive a redeploy or restart.
          </p>
        </div>
      ) : null}

      <div className="mt-8 space-y-8">
        {SECTIONS.map((s) => {
          const value = fields[s.key];
          return (
            <div key={s.key}>
              <div className="mb-1.5 flex items-baseline justify-between gap-4">
                <label htmlFor={`kb-${s.key}`} className="text-sm font-semibold text-cream">
                  {s.label}
                </label>
                <span className="shrink-0 font-mono text-xs text-faint">
                  {value.length.toLocaleString()} / {maxFieldLength.toLocaleString()}
                </span>
              </div>
              <p className="mb-2 text-xs text-muted">{s.hint}</p>
              <textarea
                id={`kb-${s.key}`}
                value={value}
                maxLength={maxFieldLength}
                onChange={(e) => setFields((f) => ({ ...f, [s.key]: e.target.value }))}
                rows={s.key === "guidelines" ? 6 : 8}
                className="w-full resize-y rounded-xl border border-line/20 bg-[#F2ECFE] px-4 py-3 text-sm leading-relaxed text-cream outline-none transition-colors focus:border-punch/50 focus:bg-white"
                placeholder={`Paste ${s.label.toLowerCase()} content here…`}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="btn-primary !px-6 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {status ? (
          <span className={`text-sm font-medium ${status.kind === "ok" ? "text-green-600" : "text-red-600"}`}>
            {status.text}
          </span>
        ) : null}
      </div>
    </div>
  );
}
