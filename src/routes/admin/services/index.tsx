import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import { fetchAllServicesAdmin, deleteExistingService } from "../../api/projects.server";
import type { Service } from "@/lib/db";

export const Route = createFileRoute("/admin/services/")({
  loader: async () => {
    const services = await fetchAllServicesAdmin();
    return { services };
  },
  component: AdminServicesList,
});

function AdminServicesList() {
  const { services } = Route.useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete "${name}"? This will also remove all its service items.`)) {
      try {
        await deleteExistingService({ data: { id } });
        navigate({ to: "/admin/services", replace: true });
      } catch (err) {
        alert(err instanceof Error ? err.message : "Failed to delete service");
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
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="mt-1 text-muted-foreground">
            {services.length} service{services.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          to="/admin/services/new"
          className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          <Plus className="size-4" /> New Service
        </Link>
      </div>

      <div className="overflow-hidden rounded border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Slug</th>
              <th className="px-4 py-3 text-left font-medium">Items</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service: Service) => (
              <tr key={service.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link
                    to="/admin/services/$id"
                    params={{ id: service.id }}
                    className="font-medium hover:text-primary hover:underline"
                  >
                    {service.name}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  /{service.slug}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{service.items.length}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                      service.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {service.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to="/admin/services/$id"
                      params={{ id: service.id }}
                      className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs hover:bg-surface"
                    >
                      Edit <ArrowRight className="size-3" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(service.id, service.name)}
                      aria-label={`Delete ${service.name}`}
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
    </div>
  );
}
