import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Flame,
  Phone,
  MessageCircle,
  ShieldCheck,
  Sun,
  Zap,
  Quote as QuoteIcon,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import electricalImg from "@/assets/electrical.jpg";
import solarImg from "@/assets/solar.jpg";
import fireImg from "@/assets/fire.jpg";
import { company, serviceGroups, whatsappLink } from "@/lib/company";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Electrical, Solar & Fire Safety Contractors in Kenya | Baseline Power Systems" },
      {
        name: "description",
        content:
          "Baseline Power Systems delivers licensed electrical installation, solar energy and fire protection engineering for homes, industry and institutions across Kenya.",
      },
      { property: "og:title", content: "Baseline Power Systems | Engineering, Solar & Fire Safety in Kenya" },
      {
        property: "og:description",
        content:
          "Licensed electrical, solar and fire safety contractors serving Nairobi and all 47 counties. Free site survey and same-day quotations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ElectricalContractor",
          name: company.name,
          description: company.tagline,
          telephone: company.phone,
          email: company.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Enterprise Road, Industrial Area",
            addressLocality: "Nairobi",
            addressCountry: "KE",
          },
          areaServed: "Kenya",
          openingHours: "Mo-Fr 08:00-17:30, Sa 08:00-13:00",
        }),
      },
    ],
  }),
  component: Home,
});

const icons = { electrical: Zap, solar: Sun, "fire-protection": Flame } as const;
const images = { electrical: electricalImg, solar: solarImg, "fire-protection": fireImg } as const;

const stats = [
  { value: "1,200+", label: "Projects delivered" },
  { value: "14", label: "Years in operation" },
  { value: "47", label: "Counties covered" },
  { value: "8.4 MW", label: "Solar capacity installed" },
];

const testimonials = [
  {
    quote:
      "They rewired two of our production lines over a single shutdown weekend and handed over full test certificates. Zero downtime since.",
    name: "Peter Mwangi",
    role: "Plant Manager, Ruiru food processing plant",
  },
  {
    quote:
      "Our 180kW rooftop solar plant cut the monthly power bill by 41%. The monitoring reports arrive every month without us asking.",
    name: "Aisha Noor",
    role: "Facilities Director, Mombasa Road logistics park",
  },
  {
    quote:
      "The fire alarm and hydrant works passed county inspection first time. That alone saved us weeks on occupancy approval.",
    name: "James Kariuki",
    role: "Project Lead, Kilimani apartment development",
  },
];

const projects = [
  { title: "220kW industrial rooftop solar", location: "Athi River, Machakos", category: "Manufacturing", img: solarImg },
  { title: "Substation & LV distribution upgrade", location: "Westlands, Nairobi", category: "Commercial offices", img: electricalImg },
  { title: "Fire detection & hydrant system", location: "Nyali, Mombasa", category: "Hospitality", img: fireImg },
];

const credentials = ["EPRA Licensed Class A", "NCA Registered", "KEBS Compliant", "ISO 45001 Safety", "NEMA Approved"];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand text-brand-foreground">
        <img
          src={heroImg}
          alt="Baseline Power Systems engineers installing solar panels on a Nairobi rooftop"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="container-page relative grid gap-8 py-20 md:py-28 lg:max-w-3xl lg:py-32">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-foreground/25 px-3 py-1 text-xs font-medium uppercase tracking-wider">
            <ShieldCheck className="size-4" aria-hidden="true" /> EPRA & NCA licensed contractors
          </p>
          <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Power, solar and fire safety engineering built for Kenya
          </h1>
          <p className="max-w-xl text-base text-brand-foreground/80 sm:text-lg">
            {company.name} designs, installs and maintains electrical, solar and fire protection systems
            for homes, factories, hospitals, schools, hotels and government projects nationwide.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/quote"
              className="inline-flex h-12 items-center gap-2 rounded bg-secondary px-6 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
            >
              Get a free quote <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappLink(`Hello ${company.name}, I'd like to discuss a project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp us
            </a>
            <a
              href={company.phoneHref}
              className="inline-flex h-12 items-center gap-2 rounded border border-brand-foreground/30 px-6 text-sm font-semibold transition-colors hover:bg-brand-foreground/10"
            >
              <Phone className="size-4" aria-hidden="true" /> Call now
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Three disciplines, one accountable team</h2>
          <p className="mt-4 text-muted-foreground">
            One contract, one site team and one set of certificates covering power, energy and life safety.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {serviceGroups.map((g) => {
            const Icon = icons[g.slug];
            return (
              <article key={g.slug} className="group overflow-hidden rounded-lg border border-border bg-card">
                <img
                  src={images[g.slug]}
                  alt={g.name}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className="h-44 w-full object-cover"
                />
                <div className="p-6">
                  <span className="flex size-10 items-center justify-center rounded bg-accent text-accent-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{g.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{g.short}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {g.items.slice(0, 4).map((i) => (
                      <li key={i.title} className="flex gap-2">
                        <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {i.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/services/$slug"
                    params={{ slug: g.slug }}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5"
                  >
                    Explore {g.name} <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-page">
          <h2 className="text-3xl font-bold sm:text-4xl">Featured projects</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <article key={p.title} className="overflow-hidden rounded-lg border border-border bg-card">
                <img src={p.img} alt={p.title} loading="lazy" width={1200} height={800} className="h-44 w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">{p.category}</p>
                  <h3 className="mt-2 font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-3xl font-bold sm:text-4xl">What clients say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-lg border border-border bg-card p-6">
              <QuoteIcon className="size-6 text-secondary" aria-hidden="true" />
              <blockquote className="mt-4 text-sm leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="block text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-12">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold text-muted-foreground">
          {credentials.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </section>

      <section className="container-page grid gap-10 py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Find our Nairobi office</h2>
          <p className="mt-4 text-muted-foreground">
            {company.address}. Site teams dispatch daily to Nairobi metro, Central, Coast, Rift Valley
            and Western Kenya.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">{company.hours}</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Contact the team <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <iframe
            title="Baseline Power Systems office location on Google Maps"
            src="https://www.google.com/maps?q=Enterprise%20Road%20Industrial%20Area%20Nairobi&output=embed"
            loading="lazy"
            className="h-80 w-full"
          />
        </div>
      </section>
    </>
  );
}
