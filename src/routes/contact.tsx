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
      { property: "og:description", content: "Reach our Nairobi office by phone, WhatsApp or email — 24/7 emergency response." },
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
    <div className="container-page py-16">
      <h1 className="text-4xl font-bold sm:text-5xl">Contact us</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Our Nairobi office coordinates site teams nationwide. For faults and outages, use the emergency
        hotline any time of day.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <a href={company.phoneHref} className="flex gap-4 rounded-lg border border-border bg-card p-5 hover:border-primary">
            <Phone className="size-5 text-primary" aria-hidden="true" />
            <span>
              <span className="block font-semibold">Phone</span>
              <span className="text-sm text-muted-foreground">{company.phone}</span>
            </span>
          </a>
          <a
            href={whatsappLink(`Hello ${company.name}, I'd like to make an enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 rounded-lg border border-border bg-card p-5 hover:border-primary"
          >
            <MessageCircle className="size-5 text-primary" aria-hidden="true" />
            <span>
              <span className="block font-semibold">WhatsApp</span>
              <span className="text-sm text-muted-foreground">Chat with an engineer</span>
            </span>
          </a>
          <a href={`mailto:${company.email}`} className="flex gap-4 rounded-lg border border-border bg-card p-5 hover:border-primary">
            <Mail className="size-5 text-primary" aria-hidden="true" />
            <span>
              <span className="block font-semibold">Email</span>
              <span className="text-sm text-muted-foreground">{company.email}</span>
            </span>
          </a>
          <div className="flex gap-4 rounded-lg border border-border bg-card p-5">
            <MapPin className="size-5 text-primary" aria-hidden="true" />
            <span>
              <span className="block font-semibold">Office</span>
              <span className="text-sm text-muted-foreground">{company.address}</span>
            </span>
          </div>
          <div className="flex gap-4 rounded-lg border border-border bg-card p-5">
            <Clock className="size-5 text-primary" aria-hidden="true" />
            <span>
              <span className="block font-semibold">Office hours</span>
              <span className="text-sm text-muted-foreground">{company.hours}</span>
            </span>
          </div>
          <div className="flex gap-4 rounded-lg border border-secondary bg-card p-5">
            <AlertTriangle className="size-5 text-secondary" aria-hidden="true" />
            <span>
              <span className="block font-semibold">24/7 emergency hotline</span>
              <span className="text-sm text-muted-foreground">{company.emergency}</span>
            </span>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-border bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-medium">
                Name
                <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Phone
                <input className={fieldClass} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-medium">
              Email (optional)
              <input className={fieldClass} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="grid gap-1.5 text-sm font-medium">
              How can we help?
              <textarea
                className="min-h-32 w-full rounded border border-input bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground hover:opacity-90"
            >
              <MessageCircle className="size-5" aria-hidden="true" /> Send via WhatsApp
            </button>
          </form>

          <div className="mt-6 overflow-hidden rounded-lg border border-border">
            <iframe
              title="Baseline Power Systems office location"
              src="https://www.google.com/maps?q=Enterprise%20Road%20Industrial%20Area%20Nairobi&output=embed"
              loading="lazy"
              className="h-72 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
