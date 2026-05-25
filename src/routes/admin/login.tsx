import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { signIn, getSession } from "@/admin/lib/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSession().then((s) => {
      if (s) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate({ to: "/admin" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.13_0.02_280)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-2xl shadow-[0_0_40px_-8px_oklch(0.65_0.27_295/0.8)]">
            PD
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-white/50">Pallabi Das — Content Manager</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[oklch(0.17_0.025_280)] border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-xs font-medium uppercase tracking-widest text-white/50 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium uppercase tracking-widest text-white/50 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/60 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_oklch(0.65_0.27_295/0.6)] hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
