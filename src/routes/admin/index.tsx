import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FolderOpen, Plus, Wrench, MessageSquareQuote } from "lucide-react";
import {
  fetchAllProjectsAdmin,
  fetchAllServicesAdmin,
  fetchAllQuoteRequests,
  fetchAllContactMessages,
} from "../api/projects.server";
import type { Project } from "@/lib/projects";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const [projects, services, quotes, messages] = await Promise.all([
      fetchAllProjectsAdmin(),
      fetchAllServicesAdmin(),
      fetchAllQuoteRequests(),
      fetchAllContactMessages(),
    ]);
    return { projects, services, quotes, messages };
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const { projects, services, quotes, messages } = Route.useLoaderData();

  const publishedCount = projects.filter((p: Project) => p.published !== false).length;
  const draftCount = projects.length - publishedCount;
  const newQuotes = quotes.filter((q: { status: string }) => q.status === "new").length;
  const newMessages = messages.filter((m: { status: string }) => m.status === "new").length;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Manage your content, services and submissions.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Projects</p>
          <p className="mt-1 text-2xl font-bold">{projects.length}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {publishedCount} published, {draftCount} draft{draftCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="rounded border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Services</p>
          <p className="mt-1 text-2xl font-bold">{services.length}</p>
        </div>
        <div className="rounded border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Quote Requests</p>
          <p className="mt-1 text-2xl font-bold">{quotes.length}</p>
          {newQuotes > 0 && <p className="mt-0.5 text-xs text-orange-600">{newQuotes} new</p>}
        </div>
        <div className="rounded border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Contact Messages</p>
          <p className="mt-1 text-2xl font-bold">{messages.length}</p>
          {newMessages > 0 && <p className="mt-0.5 text-xs text-orange-600">{newMessages} new</p>}
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded border border-border bg-card p-4">
        <h2 className="font-semibold">Quick Actions</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="size-4" /> New Project
          </Link>
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
          >
            <FolderOpen className="size-4" /> Manage Projects
          </Link>
          <Link
            to="/admin/services"
            className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
          >
            <Wrench className="size-4" /> Manage Services
          </Link>
          <Link
            to="/admin/submissions"
            className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm font-medium hover:bg-surface"
          >
            <MessageSquareQuote className="size-4" /> Submissions
          </Link>
        </div>
      </div>

      {/* Recent projects */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Recent Projects</h2>
          <Link to="/admin/projects" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-3 grid gap-3">
          {projects.slice(0, 5).map((project: Project) => (
            <Link
              key={project.id}
              to="/admin/projects/$id"
              params={{ id: project.id }}
              className="flex items-center justify-between rounded border border-border bg-card p-3 transition-colors hover:bg-surface"
            >
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-muted-foreground">
                  {project.location} · {project.year}
                </p>
              </div>
              <ArrowRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
