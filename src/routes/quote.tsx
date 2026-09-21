import { createFileRoute } from "@tanstack/react-router";
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
        content:
          "Fast WhatsApp quotations for electrical, solar and fire protection projects across Kenya.",
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
  {
    title: "Reply within the hour",
    text: "Working hours responses from a real engineer, not a call centre.",
  },
  {
    title: "Licensed and insured",
    text: "EPRA and NCA registered teams with full public liability cover.",
  },
  {
    title: "Free site survey",
    text: "We measure loads and roof space before quoting a single shilling.",
  },
];

function QuotePage() {
  return (
    <div className="container-page grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">Get a free quotation</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Answer five quick questions. We format them into a WhatsApp message so our engineers have
          everything they need to price your works accurately.
        </p>
        <dl className="mt-8 space-y-4">
          {perks.map((p) => (
            <div key={p.title} className="border-l-2 border-primary pl-4">
              <dt className="font-semibold">{p.title}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{p.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-sm text-muted-foreground">
          Prefer to talk?{" "}
          <a href={company.phoneHref} className="text-primary hover:underline">
            Call {company.phone}
          </a>{" "}
          or{" "}
          <a href={`mailto:${company.email}`} className="text-primary hover:underline">
            email {company.email}
          </a>
          .
        </p>
      </div>
      <QuoteForm />
    </div>
  );
}
