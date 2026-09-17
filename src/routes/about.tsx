import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HardHat } from "lucide-react";
import electricalImg from "@/assets/electrical.jpg";
import { company } from "@/lib/company";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Baseline Power Systems | Engineering Contractors in Kenya" },
      {
        name: "description",
        content:
          "Founded in Nairobi, Baseline Power Systems is a licensed electrical, solar and fire safety engineering contractor serving clients in all 47 Kenyan counties.",
      },
      { property: "og:title", content: "About Baseline Power Systems" },
      {
        property: "og:description",
        content: "Our history, mission, leadership team, licences and safety policy.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const pillars = [
  {
    title: "Mission",
    text: "To deliver safe, compliant and efficient power and safety systems that keep Kenyan buildings and businesses running.",
  },
  {
    title: "Vision",
    text: "To be East Africa's most trusted multi-disciplinary engineering contractor by 2030.",
  },
  {
    title: "Values",
    text: "Safety first, technical honesty, on-time handover and lifetime support for every system we install.",
  },
];

const team = [
  {
    name: "Eng. Samuel Otieno",
    role: "Managing Director",
    note: "18 years in LV/MV distribution and industrial projects.",
  },
  {
    name: "Eng. Grace Mutiso",
    role: "Head of Solar",
    note: "Delivered over 6MW of commercial and industrial PV.",
  },
  {
    name: "Daniel Kiprotich",
    role: "Fire Safety Manager",
    note: "NFPA-trained, leads detection and suppression works.",
  },
  {
    name: "Faith Achieng",
    role: "HSE & Quality Lead",
    note: "Owns method statements, permits and site audits.",
  },
];

const licences = [
  "EPRA Electrical Contractor Licence — Class A",
  "National Construction Authority (NCA) registration",
  "Ministry of Labour fire equipment servicing approval",
  "NEMA environmental compliance for solar installations",
  "ISO 45001-aligned occupational health & safety system",
];

function About() {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container-page py-12">
          <h1 className="max-w-3xl text-3xl font-bold sm:text-4xl">
            Engineers who stay accountable long after handover
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {company.name} started in 2012 as a two-man electrical maintenance outfit in
            Nairobi&apos;s Industrial Area. Today we are a 60-person contractor delivering
            electrical, solar and fire protection works for factories, hospitals, schools, hotels
            and developers across Kenya.
          </p>
        </div>
      </section>

      {/* Mission / Vision / Values — clean text blocks, no icon badges */}
      <section className="container-page grid gap-8 py-12 lg:grid-cols-2 lg:items-center">
        <img
          src={electricalImg}
          alt="Technician testing a distribution panel"
          loading="lazy"
          width={1200}
          height={800}
          className="rounded border border-border object-cover"
        />
        <div className="grid gap-5">
          {pillars.map((p) => (
            <div key={p.title} className="border-l-2 border-primary pl-5">
              <h2 className="font-semibold">{p.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership team — no monogram circles, clean layout */}
      <section className="bg-surface py-12">
        <div className="container-page">
          <h2 className="text-2xl font-bold">Leadership team</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <article key={m.name} className="rounded border border-border bg-card p-4">
                <h3 className="font-semibold">{m.name}</h3>
                <p className="mt-0.5 text-sm font-medium text-primary">{m.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{m.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Licences & Safety — side by side */}
      <section className="container-page grid gap-8 py-12 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">Licences & certifications</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {licences.map((l) => (
              <li key={l} className="flex gap-2 border-b border-border py-2.5 last:border-0">
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Safety policy</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Every job begins with a documented risk assessment and method statement. Crews carry
            full PPE, lock-out/tag-out kits and calibrated test equipment, and no live works proceed
            without a permit signed by a supervising engineer. We record and review every incident
            and near-miss.
          </p>
          <div className="mt-5 flex items-center gap-3 rounded border border-border bg-card p-4">
            <HardHat className="size-5 shrink-0 text-secondary" aria-hidden="true" />
            <p className="text-sm font-medium">
              Over 900,000 site hours worked without a lost-time injury.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Talk to our team <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
