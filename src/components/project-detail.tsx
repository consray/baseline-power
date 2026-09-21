import { useEffect, useCallback, useState } from "react";
import { X } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectGallery } from "./project-gallery";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prev;
    };
  }, [handleKey]);

  function openGallery(index: number) {
    setGalleryIndex(index);
    setGalleryOpen(true);
  }

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/50" onClick={onClose} aria-hidden="true" />
      <aside
        className="fixed top-0 right-0 bottom-0 z-[91] w-full overflow-y-auto bg-background sm:max-w-lg"
        role="dialog"
        aria-label={`Project details: ${project.title}`}
        aria-modal="true"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-6 py-4">
          <h2 className="truncate text-lg font-semibold">{project.title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Close project details"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          {/* Cover image */}
          <button
            type="button"
            onClick={() => openGallery(0)}
            className="group w-full overflow-hidden rounded border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </button>

          {/* Meta */}
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Location</p>
              <p className="font-medium">{project.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Year</p>
              <p className="font-medium">{project.year}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Category</p>
              <p className="font-medium">{project.category}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium">Engineering Project</p>
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Engineering story */}
          {project.challenge && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                The Challenge
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{project.challenge}</p>
            </div>
          )}

          {project.approach && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Our Approach
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{project.approach}</p>
            </div>
          )}

          {project.scope && project.scope.length > 0 && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Scope of Work
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {project.scope.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.result && (
            <div className="mt-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Result
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{project.result}</p>
            </div>
          )}

          {/* Gallery thumbnails */}
          {project.images.length > 1 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Gallery
              </h3>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => openGallery(i)}
                    className="overflow-hidden rounded border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <img
                      src={img}
                      alt={`${project.title} — image ${i + 1}`}
                      loading="lazy"
                      className="h-20 w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {galleryOpen && (
        <ProjectGallery
          images={project.images.map((img, i) => ({
            src: img,
            alt: `${project.title} — image ${i + 1}`,
          }))}
          startIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
}
