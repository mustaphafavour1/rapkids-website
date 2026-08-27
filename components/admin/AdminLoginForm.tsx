"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-6 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-punch/10 text-punch">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold text-cream">Content Base</h1>
        <p className="mt-1.5 text-sm text-muted">
          Enter the admin password to manage the chatbot&apos;s knowledge base.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="rounded-3xl border border-line/15 bg-surface/60 p-6">
        <label htmlFor="admin-password" className="mb-1.5 block text-sm font-semibold text-cream">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-line/20 bg-[#F2ECFE] px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-punch/50 focus:bg-white"
        />
        {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}
        <button type="submit" disabled={loading} className="btn-primary mt-5 w-full !px-6 disabled:opacity-60">
          {loading ? "Checking…" : "Log in"}
        </button>
      </form>
    </div>
  );
}
