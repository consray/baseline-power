import { createFileRoute } from "@tanstack/react-router";
import { Clock, ShieldCheck, Wrench } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { company } from "@/lib/company";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Request a Free Quote | Baseline Power Systems Kenya" },
      {
        name: "description",
        content:
          "Get a free costed quotation for electrical, solar or fire safety works in Kenya. Choose your service, building type, county and budget — we reply on WhatsApp within the hour.",
      },
      { property: "og:title", content: "Request a Free Quote | Baseline Power Systems" },
      {
        property: "og:description",
        content: "Fast WhatsApp quotations for electrical, solar and fire protection projects across Kenya.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/quote" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

const perks = [
  { icon: Clock, title: "Reply within the hour", text: "Working hours responses from a real engineer, not a call centre." },
  { icon: ShieldCheck, title: "Licensed and insured", text: "EPRA and NCA registered teams with full public liability cover." },
  { icon: Wrench, title: "Free site survey", text: "We measure loads and roof space before quoting a single shilling." },
];

function QuotePage() {
  return (
    <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 className="text-4xl font-bold sm:text-5xl">Get a free quotation</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Answer five quick questions. We format them into a WhatsApp message so our engineers have
          everything they need to price your works accurately.
        </p>
        <ul className="mt-10 space-y-6">
          {perks.map((p) => (
            <li key={p.title} className="flex gap-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded bg-accent text-accent-foreground">
                <p.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-semibold">{p.title}</h2>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-muted-foreground">
          Prefer to talk? Call {company.phone} or email {company.email}.
        </p>
      </div>
      <QuoteForm />
    </div>
  );
}
