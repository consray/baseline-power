import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import { useState } from "react";
import { createNewProject } from "../../api/projects.server";
import { projectCategories, type Project, type ProjectCategory } from "@/lib/projects";

// Route for creating a new project
export const Route = createFileRoute("/admin/projects/new")({
  component: ProjectForm,
});

function ProjectForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    location: "",
    year: new Date().getFullYear().toString(),
    category: "Electrical Installation" as ProjectCategory,
    description: "",
    challenge: "",
    approach: "",
    scope: [] as string[],
    result: "",
    coverImage: "",
  });

  const [newScopeItem, setNewScopeItem] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addScopeItem = () => {
    if (newScopeItem.trim()) {
      setForm((prev) => ({ ...prev, scope: [...prev.scope, newScopeItem.trim()] }));
      setNewScopeItem("");
    }
  };

  const removeScopeItem = (index: number) => {
    setForm((prev) => ({
      ...prev,
      scope: prev.scope.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const project: Omit<Project, "id"> = {
        title: form.title,
        location: form.location,
        year: form.year,
        category: form.category,
        description: form.description,
        coverImage: form.coverImage || "",
        images: form.coverImage ? [form.coverImage] : [],
      };

      // Only add optional fields if they have values
      if (form.challenge) project.challenge = form.challenge;
      if (form.approach) project.approach = form.approach;
      if (form.scope.length > 0) project.scope = form.scope;
      if (form.result) project.result = form.result;

      await createNewProject({ data: { project } });
      navigate({ to: "/admin/projects" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to="/admin/projects"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> All projects
      </Link>

      <h1 className="text-2xl font-bold">New Project</h1>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Commercial Electrical Installation"
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          />
        </div>

        {/* Location + Year */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-medium">
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Westlands, Nairobi"
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
            />
          </div>
          <div>
            <label htmlFor="year" className="mb-1 block text-sm font-medium">
              Year *
            </label>
            <input
              id="year"
              name="year"
              type="text"
              required
              value={form.year}
              onChange={handleChange}
              placeholder="e.g. 2024"
              className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          >
            {projectCategories
              .filter((c) => c !== "All Projects")
              .map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            value={form.description}
            onChange={handleChange}
            placeholder="Brief description of the project..."
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          />
        </div>

        {/* Challenge */}
        <div>
          <label htmlFor="challenge" className="mb-1 block text-sm font-medium">
            The Challenge
          </label>
          <textarea
            id="challenge"
            name="challenge"
            rows={3}
            value={form.challenge}
            onChange={handleChange}
            placeholder="What problem or requirement needed to be addressed?"
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          />
        </div>

        {/* Approach */}
        <div>
          <label htmlFor="approach" className="mb-1 block text-sm font-medium">
            Our Approach
          </label>
          <textarea
            id="approach"
            name="approach"
            rows={3}
            value={form.approach}
            onChange={handleChange}
            placeholder="What engineering solution was implemented?"
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          />
        </div>

        {/* Scope */}
        <div>
          <label className="mb-1 block text-sm font-medium">Scope of Work</label>
          <div className="grid gap-2">
            {form.scope.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex-1 rounded border border-border bg-surface px-3 py-2 text-sm">
                  {item}
                </span>
                <button
                  type="button"
                  onClick={() => removeScopeItem(i)}
                  className="shrink-0 rounded p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newScopeItem}
                onChange={(e) => setNewScopeItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addScopeItem();
                  }
                }}
                placeholder="Add scope item..."
                className="flex-1 rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
              />
              <button
                type="button"
                onClick={addScopeItem}
                className="shrink-0 rounded border border-border px-3 py-2 text-sm hover:bg-surface"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Result */}
        <div>
          <label htmlFor="result" className="mb-1 block text-sm font-medium">
            Result
          </label>
          <textarea
            id="result"
            name="result"
            rows={2}
            value={form.result}
            onChange={handleChange}
            placeholder="What was completed or achieved?"
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          />
        </div>

        {/* Cover Image URL */}
        <div>
          <label htmlFor="coverImage" className="mb-1 block text-sm font-medium">
            Cover Image URL
          </label>
          <input
            id="coverImage"
            name="coverImage"
            type="url"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full rounded border border-border bg-background px-3 py-2 text-sm focus:outline-2 focus:outline-primary"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Paste a URL to the project cover image. Image uploads coming soon.
          </p>
        </div>

        {error && (
          <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            <Save className="size-4" />
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-medium hover:bg-surface"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
