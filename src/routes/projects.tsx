import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useState } from "react";
import { projects, projectCategories, type Project, type ProjectCategory } from "@/lib/projects";
import { company, whatsappLink } from "@/lib/company";
import { ProjectCard } from "@/components/project-card";
import { ProjectFilter } from "@/components/project-filter";
import { ProjectDetail } from "@/components/project-detail";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Selected Projects | Baseline Power Systems" },
      {
        name: "description",
        content:
          "A selection of electrical engineering projects delivered by Baseline Power Systems across Kenya — solar installations, power distribution, fire protection and industrial automation.",
      },
      { property: "og:title", content: "Selected Projects | Baseline Power Systems" },
      {
        property: "og:description",
        content:
          "Explore electrical engineering projects delivered by Baseline Power Systems across Kenya.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-surface">
        <div className="container-page py-12">
          <h1 className="max-w-3xl text-3xl font-bold sm:text-4xl">Selected Projects</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            A selection of electrical engineering projects delivered with precision, safety, and
            reliability.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="container-page py-12">
        <ProjectFilter
          categories={projectCategories}
          active={activeCategory}
          onChange={setActiveCategory}
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            No projects found in this category.
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="border-y border-border bg-surface py-12">
        <div className="container-page text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Have an electrical project in mind?</h2>
          <p className="mt-3 text-muted-foreground">
            Let&apos;s discuss your requirements and find the right engineering solution.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex h-11 items-center gap-2 rounded bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Discuss Your Project <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappLink(`Hello ${company.name}, I'd like to discuss a project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground hover:opacity-90"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Detail drawer */}
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
