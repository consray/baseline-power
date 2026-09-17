import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
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
      {
        property: "og:title",
        content: "Baseline Power Systems | Engineering, Solar & Fire Safety in Kenya",
      },
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
            streetAddress: "10 Masaba Rd",
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
  {
    title: "220kW industrial rooftop solar",
    location: "Athi River, Machakos",
    category: "Manufacturing",
    img: solarImg,
  },
  {
    title: "Substation & LV distribution upgrade",
    location: "Westlands, Nairobi",
    category: "Commercial offices",
    img: electricalImg,
  },
  {
    title: "Fire detection & hydrant system",
    location: "Nyali, Mombasa",
    category: "Hospitality",
    img: fireImg,
  },
];

const credentials = [
  "EPRA Licensed Class A",
  "NCA Registered",
  "KEBS Compliant",
  "ISO 45001 Safety",
  "NEMA Approved",
];

const partners = [
  { name: "Schneider Electric", logo: "/partners/schneider.svg" },
  { name: "ABB", logo: "/partners/abb.svg" },
  { name: "Legrand", logo: "/partners/legrand.svg" },
  { name: "JA Solar", logo: "/partners/ja-solar.svg" },
  { name: "Fronius", logo: "/partners/fronius.svg" },
  { name: "Hikvision", logo: "/partners/hikvision.svg" },
];

function Home() {
  return (
    <>
      {/* Hero — asymmetric two-column on desktop */}
      <section className="bg-brand text-brand-foreground">
        <div className="container-page grid gap-8 py-14 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
          <div className="grid gap-5">
            <h1 className="text-3xl font-bold leading-[1.1] sm:text-4xl">
              Power, solar and fire safety engineering built for Kenya
            </h1>
            <p className="max-w-lg text-base text-brand-foreground/75">
              {company.name} designs, installs and maintains electrical, solar and fire protection
              systems for homes, factories, hospitals, schools, hotels and government projects
              nationwide.
            </p>
            <p className="text-xs font-medium text-brand-foreground/50">
              EPRA Class A licensed &middot; NCA registered &middot; ISO 45001 aligned
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                to="/quote"
                className="inline-flex h-11 items-center gap-2 rounded bg-secondary px-5 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
              >
                Get a free quote <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink(`Hello ${company.name}, I'd like to discuss a project.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp us
              </a>
              <a
                href={company.phoneHref}
                className="inline-flex h-11 items-center gap-2 rounded border border-brand-foreground/25 px-5 text-sm font-semibold transition-colors hover:bg-brand-foreground/10"
              >
                <Phone className="size-4" aria-hidden="true" /> Call now
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded lg:order-last">
            <img
              src={heroImg}
              alt="Baseline Power Systems engineers installing solar panels on a Nairobi rooftop"
              width={1920}
              height={1088}
              className="h-64 w-full object-cover sm:h-80 md:h-full"
            />
          </div>
        </div>
      </section>

      {/* Stats — with dividers */}
      <section className="border-b border-border bg-surface">
        <div className="container-page grid grid-cols-2 gap-0 py-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-4 ${i > 0 ? "md:border-l md:border-border md:pl-8" : ""} ${i > 0 && i <= 2 ? "border-t border-border md:border-t-0" : ""} ${i === 2 ? "pl-0 md:pl-8" : ""}`}
            >
              <p className="text-2xl font-bold text-primary sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services — varied card treatment: no icon badges, cleaner composition */}
      <section className="container-page py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Three disciplines, one accountable team
          </h2>
          <p className="mt-3 text-muted-foreground">
            One contract, one site team and one set of certificates covering power, energy and life
            safety.
          </p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {serviceGroups.map((g) => (
            <article
              key={g.slug}
              className="group overflow-hidden rounded border border-border bg-card"
            >
              <img
                src={images[g.slug]}
                alt={g.name}
                loading="lazy"
                width={1200}
                height={800}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="font-semibold">{g.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.short}</p>
                <Link
                  to="/services/$slug"
                  params={{ slug: g.slug }}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:gap-2.5"
                >
                  Learn more <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Projects — first item featured wider */}
      <section className="bg-surface py-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold sm:text-3xl">Featured projects</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {projects.map((p, i) => (
              <article
                key={p.title}
                className={`overflow-hidden rounded border border-border bg-card ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1200}
                  height={800}
                  className={`w-full object-cover ${i === 0 ? "h-56 md:h-full" : "h-40"}`}
                />
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {p.category}
                  </p>
                  <h3 className="mt-1.5 font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — left-border treatment instead of cards */}
      <section className="container-page py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">What clients say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-l-2 border-secondary pl-5 py-1">
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="block text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="container-page py-16">
        <h2 className="text-2xl font-bold sm:text-3xl">Trusted by leading brands</h2>
        <p className="mt-3 text-muted-foreground">
          We partner with established manufacturers and suppliers to deliver quality components and
          warranties on every installation.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((p) => (
            <div
              key={p.name}
              className="flex h-20 items-center justify-center rounded border border-border bg-card px-4"
            >
              <img
                src={p.logo}
                alt={`${p.name} logo`}
                loading="lazy"
                width={160}
                height={60}
                className="max-h-10 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Credentials — tighter, more integrated */}
      <section className="border-y border-border bg-surface py-8">
        <div className="container-page">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Accreditations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            {credentials.map((c, i) => (
              <span key={c} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="hidden text-border md:inline" aria-hidden="true">
                    &middot;
                  </span>
                )}
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Map & contact */}
      <section className="container-page grid gap-8 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Find our Nairobi office</h2>
          <p className="mt-3 text-muted-foreground">
            {company.address}. Site teams dispatch daily to Nairobi metro, Central, Coast, Rift
            Valley and Western Kenya.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{company.hours}</p>
          <Link
            to="/contact"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Contact the team <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="overflow-hidden rounded border border-border">
          <iframe
            title="Baseline Power Systems office location on Google Maps"
            src="https://www.google.com/maps?q=10+Masaba+Rd+Nairobi+Kenya&output=embed"
            loading="lazy"
            className="h-72 w-full"
          />
        </div>
      </section>
    </>
  );
}
