import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { useState } from "react";
import { createNewService } from "../../api/projects.server";

export const Route = createFileRoute("/admin/services/new")({
  component: ServiceForm,
});

function ServiceForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    intro: "",
    metaTitle: "",
    metaDescription: "",
    sortOrder: "0",
    published: true,
  });

  const [items, setItems] = useState<{ title: string; description: string }[]>([]);
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () => {
    if (newItem.title.trim() && newItem.description.trim()) {
      setItems((prev) => [...prev, { ...newItem }]);
      setNewItem({ title: "", description: "" });
    }
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await createNewService({
        data: {
          service: {
            slug: form.slug,
            name: form.name,
            shortDescription: form.shortDescription,
            intro: form.intro,
            metaTitle: form.metaTitle || form.name,
            metaDescription: form.metaDescription || form.shortDescription,
            sortOrder: parseInt(form.sortOrder, 10) || 0,
            published: form.published,
            items: items.map((item, i) => ({
              title: item.title,
              description: item.description,
              sortOrder: i + 1,
            })),
          },
        },
      });
      navigate({ to: "/admin/services" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create service");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to="/admin/services"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> All services
      </Link>

      <h1 className="text-2xl font-bold">New Service</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Electrical Services"
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="mb-1 block text-sm font-medium">
            Slug *
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            value={form.slug}
            onChange={handleChange}
            placeholder="e.g. electrical"
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-2 focus:outline-primary"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            URL-friendly identifier. Used in /services/{form.slug || "..."}. Must be unique.
          </p>
        </div>

        {/* Short Description */}
        <div>
          <label htmlFor="shortDescription" className="mb-1 block text-sm font-medium">
            Short Description *
          </label>
          <input
            id="shortDescription"
            name="shortDescription"
            type="text"
            required
            value={form.shortDescription}
            onChange={handleChange}
            placeholder="One-line summary for cards and listings"
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          />
        </div>

        {/* Intro */}
        <div>
          <label htmlFor="intro" className="mb-1 block text-sm font-medium">
            Intro Text *
          </label>
          <textarea
            id="intro"
            name="intro"
            required
            rows={3}
            value={form.intro}
            onChange={handleChange}
            placeholder="Detailed introduction shown at the top of the service page"
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          />
        </div>

        {/* SEO */}
        <fieldset className="grid gap-4 rounded border border-border p-4">
          <legend className="px-2 text-sm font-medium">SEO</legend>
          <div>
            <label htmlFor="metaTitle" className="mb-1 block text-sm font-medium">
              Meta Title
            </label>
            <input
              id="metaTitle"
              name="metaTitle"
              type="text"
              value={form.metaTitle}
              onChange={handleChange}
              placeholder="Defaults to service name"
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
            />
          </div>
          <div>
            <label htmlFor="metaDescription" className="mb-1 block text-sm font-medium">
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              rows={2}
              value={form.metaDescription}
              onChange={handleChange}
              placeholder="Defaults to short description"
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
            />
          </div>
        </fieldset>

        {/* Sort Order + Published */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="sortOrder" className="mb-1 block text-sm font-medium">
              Sort Order
            </label>
            <input
              id="sortOrder"
              name="sortOrder"
              type="number"
              value={form.sortOrder}
              onChange={handleChange}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
                className="size-4 rounded border-border"
              />
              Published
            </label>
          </div>
        </div>

        {/* Service Items */}
        <fieldset className="grid gap-3 rounded border border-border p-4">
          <legend className="px-2 text-sm font-medium">Service Items ({items.length})</legend>

          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2 rounded bg-surface p-3">
              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="shrink-0 rounded p-1 text-muted-foreground hover:bg-background hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}

          <div className="grid gap-2 rounded border border-dashed border-border p-3">
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Item title"
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
            />
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Item description"
              rows={2}
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
            />
            <button
              type="button"
              onClick={addItem}
              disabled={!newItem.title.trim() || !newItem.description.trim()}
              className="inline-flex items-center gap-1 self-end rounded border border-border px-3 py-1.5 text-sm hover:bg-surface disabled:opacity-50"
            >
              <Plus className="size-3.5" /> Add item
            </button>
          </div>
        </fieldset>

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            <Save className="size-4" />
            {isSubmitting ? "Creating..." : "Create Service"}
          </button>
          <Link
            to="/admin/services"
            className="inline-flex items-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-medium hover:bg-surface"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
