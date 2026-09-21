import type { ProjectCategory } from "@/lib/projects";

interface ProjectFilterProps {
  categories: ProjectCategory[];
  active: ProjectCategory;
  onChange: (category: ProjectCategory) => void;
}

export function ProjectFilter({ categories, active, onChange }: ProjectFilterProps) {
  const panelId = "project-filter-panel";
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          aria-selected={active === cat}
          aria-controls={panelId}
          onClick={() => onChange(cat)}
          className={`rounded px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
            active === cat
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-card text-muted-foreground hover:bg-surface"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
