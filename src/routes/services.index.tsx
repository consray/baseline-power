import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { serviceGroups } from "@/lib/company";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Electrical, Solar & Fire Services in Kenya | Baseline Power Systems" },
      {
        name: "description",
        content:
          "Full-service electrical contracting, solar energy systems and fire protection engineering for residential, commercial, industrial and government clients across Kenya.",
      },
      { property: "og:title", content: "Our Services | Baseline Power Systems" },
      {
        property: "og:description",
        content: "Electrical installation, solar energy and fire protection services delivered nationwide in Kenya.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="container-page py-16">
      <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">Engineering services across Kenya</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Every installation is designed, executed and certified in-house — no subcontracted guesswork.
      </p>

      <div className="mt-12 space-y-14">
        {serviceGroups.map((g) => (
          <section key={g.slug}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{g.name}</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{g.intro}</p>
              </div>
              <Link
                to="/services/$slug"
                params={{ slug: g.slug }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5"
              >
                View details <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {g.items.map((i) => (
                <li key={i.title} className="rounded-lg border border-border bg-card p-4">
                  <BadgeCheck className="size-5 text-primary" aria-hidden="true" />
                  <h3 className="mt-3 text-sm font-semibold">{i.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{i.description}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
