import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, LogOut, FolderOpen, Wrench, MessageSquareQuote } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

// Simple password gate (replace with Cloudflare Access in production)
const ADMIN_PASSWORD = "baseline-admin-2024";

function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    navigate({ to: "/" });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="w-full max-w-sm">
          <div className="rounded border border-border bg-card p-6">
            <div className="mb-6 text-center">
              <FolderOpen className="mx-auto size-10 text-primary" />
              <h1 className="mt-3 text-xl font-bold">Admin Console</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter the admin password to continue.
              </p>
            </div>

            <form onSubmit={handleLogin} className="grid gap-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
                  autoFocus
                />
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Sign in
              </button>
            </form>

            <Link
              to="/"
              className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" /> Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Admin header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm font-semibold text-primary">
              Baseline Power
            </Link>
            <span className="text-border">|</span>
            <span className="text-sm font-medium">Admin</span>
          </div>
          <nav className="flex items-center gap-2">
            <Link
              to="/admin"
              className="rounded px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/projects"
              className="inline-flex items-center gap-1 rounded px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <FolderOpen className="size-3.5" /> Projects
            </Link>
            <Link
              to="/admin/services"
              className="inline-flex items-center gap-1 rounded px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <Wrench className="size-3.5" /> Services
            </Link>
            <Link
              to="/admin/submissions"
              className="inline-flex items-center gap-1 rounded px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              <MessageSquareQuote className="size-3.5" /> Submissions
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/projects" className="text-sm text-muted-foreground hover:text-foreground">
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-surface"
            >
              <LogOut className="size-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Admin content */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
