import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <article className="group overflow-hidden rounded border border-border bg-card">
      <div className="relative overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-project.jpg";
          }}
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
          {project.category}
        </p>
        <h3 className="mt-2 font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          View Project <ArrowRight className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
