import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, MessageCircle, Phone } from "lucide-react";
import electricalImg from "@/assets/electrical.jpg";
import solarImg from "@/assets/solar.jpg";
import fireImg from "@/assets/fire.jpg";
import { company, serviceGroups, whatsappLink } from "@/lib/company";

const images: Record<string, string> = {
  electrical: electricalImg,
  solar: solarImg,
  "fire-protection": fireImg,
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const group = serviceGroups.find((g) => g.slug === params.slug);
    if (!group) throw notFound();
    return { group };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    }
    const g = loaderData.group;
    return {
      meta: [
        { title: g.metaTitle },
        { name: "description", content: g.metaDescription },
        { property: "og:title", content: g.metaTitle },
        { property: "og:description", content: g.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: g.name,
            description: g.metaDescription,
            areaServed: "Kenya",
            provider: { "@type": "Organization", name: company.name },
          }),
        },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { group } = Route.useLoaderData();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <Link to="/services" className="text-sm font-semibold text-primary">
              ← All services
            </Link>
            <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{group.name}</h1>
            <p className="mt-4 text-muted-foreground">{group.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex h-12 items-center gap-2 rounded bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:opacity-90"
              >
                Request a quote <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink(`Hello ${company.name}, I need help with ${group.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground hover:opacity-90"
              >
                <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
              </a>
              <a
                href={company.phoneHref}
                className="inline-flex h-12 items-center gap-2 rounded border border-border px-6 text-sm font-semibold hover:bg-accent"
              >
                <Phone className="size-4" aria-hidden="true" /> Call now
              </a>
            </div>
          </div>
          <img
            src={images[group.slug]}
            alt={group.name}
            loading="lazy"
            width={1200}
            height={800}
            className="rounded-lg border border-border object-cover"
          />
        </div>
      </section>

      <section className="container-page py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">What we deliver</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {group.items.map((i) => (
            <li key={i.title} className="rounded-lg border border-border bg-card p-5">
              <BadgeCheck className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 font-semibold">{i.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{i.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pb-16">
        <div className="rounded-lg bg-brand p-8 text-brand-foreground sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Free site survey anywhere in Kenya</h2>
          <p className="mt-3 max-w-2xl text-brand-foreground/80">
            Tell us the building type, county and budget and we'll come back with a costed scope of works.
          </p>
          <Link
            to="/quote"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded bg-secondary px-6 text-sm font-semibold text-secondary-foreground hover:opacity-90"
          >
            Start your quote <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
