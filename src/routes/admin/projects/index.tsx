import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { fetchAllProjectsAdmin, deleteExistingProject } from "../../api/projects.server";

export const Route = createFileRoute("/admin/projects/")({
  loader: async () => {
    const projects = await fetchAllProjectsAdmin();
    return { projects };
  },
  component: AdminProjectsList,
});

function AdminProjectsList() {
  const { projects } = Route.useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) {
      try {
        await deleteExistingProject({ data: { id } });
        navigate({ to: "/admin/projects", replace: true });
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to delete project");
      }
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/admin"
            className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> Dashboard
          </Link>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="mt-1 text-muted-foreground">
            {projects.length} project{projects.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          <Plus className="size-4" /> New Project
        </Link>
      </div>

      {/* Projects table */}
      <div className="overflow-hidden rounded border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-left font-medium">Title</th>
              <th className="px-4 py-3 text-left font-medium">Category</th>
              <th className="px-4 py-3 text-left font-medium">Location</th>
              <th className="px-4 py-3 text-left font-medium">Year</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: import("@/lib/projects").Project) => (
              <tr key={project.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link
                    to="/admin/projects/$id"
                    params={{ id: project.id }}
                    className="font-medium hover:text-primary hover:underline"
                  >
                    {project.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{project.category}</td>
                <td className="px-4 py-3 text-muted-foreground">{project.location}</td>
                <td className="px-4 py-3 text-muted-foreground">{project.year}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                      project.published !== false
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.published !== false ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to="/admin/projects/$id"
                      params={{ id: project.id }}
                      className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs hover:bg-surface"
                    >
                      Edit <ArrowRight className="size-3" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id, project.title)}
                      aria-label={`Delete ${project.title}`}
                      className="inline-flex items-center gap-1 rounded border border-red-200 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="size-3" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {projects.length === 0 && (
        <div className="rounded border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">No projects yet.</p>
          <Link
            to="/admin/projects/new"
            className="mt-3 inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="size-4" /> Create your first project
          </Link>
        </div>
      )}
    </div>
  );
}
