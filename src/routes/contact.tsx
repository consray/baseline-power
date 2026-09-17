import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company, whatsappLink } from "@/lib/company";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Baseline Power Systems | Electrical & Solar Contractors Nairobi" },
      {
        name: "description",
        content:
          "Contact Baseline Power Systems in Nairobi for electrical, solar and fire safety works. Phone, WhatsApp, email, office hours and 24/7 emergency hotline.",
      },
      { property: "og:title", content: "Contact Baseline Power Systems" },
      {
        property: "og:description",
        content: "Reach our Nairobi office by phone, WhatsApp or email — 24/7 emergency response.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const fieldClass =
  "h-11 w-full rounded border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `*Website enquiry — ${company.name}*\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || "-"}\n\n${message}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">Contact us</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Our Nairobi office coordinates site teams nationwide. For faults and outages, use the
        emergency hotline any time of day.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact methods — grouped, not repetitive cards */}
        <div className="space-y-3">
          <a
            href={company.phoneHref}
            className="flex items-center gap-3 rounded border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary"
          >
            <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="font-medium">{company.phone}</span>
            <span className="ml-auto text-muted-foreground">Call us</span>
          </a>
          <a
            href={whatsappLink(`Hello ${company.name}, I'd like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary"
          >
            <MessageCircle className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="font-medium">WhatsApp</span>
            <span className="ml-auto text-muted-foreground">Chat with an engineer</span>
          </a>
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-3 rounded border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary"
          >
            <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="font-medium">{company.email}</span>
          </a>
          <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-3 text-sm">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{company.address}</span>
          </div>
          <div className="flex items-center gap-3 rounded border border-border bg-card px-4 py-3 text-sm">
            <Clock className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{company.hours}</span>
          </div>
          <div className="flex items-center gap-3 rounded border-2 border-secondary bg-card px-4 py-3 text-sm">
            <AlertTriangle className="size-4 shrink-0 text-secondary" aria-hidden="true" />
            <span className="font-medium">24/7 emergency: {company.emergency}</span>
          </div>
        </div>

        {/* Form + Map */}
        <div className="grid gap-5">
          <form
            onSubmit={handleSubmit}
            className="grid gap-3 rounded border border-border bg-card p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-medium">
                Name
                <input
                  className={fieldClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Phone
                <input
                  className={fieldClass}
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>
            </div>
            <label className="grid gap-1 text-sm font-medium">
              Email (optional)
              <input
                className={fieldClass}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="grid gap-1 text-sm font-medium">
              How can we help?
              <textarea
                className="min-h-28 w-full rounded border border-input bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground hover:opacity-90"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> Send via WhatsApp
            </button>
          </form>

          <div className="overflow-hidden rounded border border-border">
            <iframe
              title="Baseline Power Systems office location"
              src="https://www.google.com/maps?q=10+Masaba+Rd+Nairobi+Kenya&output=embed"
              loading="lazy"
              className="h-64 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
