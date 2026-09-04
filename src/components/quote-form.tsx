import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { budgets, buildingTypes, company, counties, serviceGroups, whatsappLink } from "@/lib/company";

const serviceOptions = serviceGroups.flatMap((g) => g.items.map((i) => `${g.name} — ${i.title}`));

const fieldClass =
  "h-11 w-full rounded border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30";

export function QuoteForm() {
  const [service, setService] = useState(serviceOptions[0]);
  const [building, setBuilding] = useState(buildingTypes[0]);
  const [county, setCounty] = useState(counties[0]);
  const [budget, setBudget] = useState(budgets[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  const message = [
    `*Quote request — ${company.name}*`,
    ``,
    `Name: ${name || "-"}`,
    `Phone: ${phone || "-"}`,
    `Service: ${service}`,
    `Building type: ${building}`,
    `County: ${county}`,
    `Budget: ${budget}`,
    details ? `Details: ${details}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Your name
          <input className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Wanjiru" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Phone number
          <input
            className={fieldClass}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            type="tel"
            placeholder="07xx xxx xxx"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
          Service needed
          <select className={fieldClass} value={service} onChange={(e) => setService(e.target.value)}>
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Building type
          <select className={fieldClass} value={building} onChange={(e) => setBuilding(e.target.value)}>
            {buildingTypes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          County
          <select className={fieldClass} value={county} onChange={(e) => setCounty(e.target.value)}>
            {counties.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
          Budget range
          <select className={fieldClass} value={budget} onChange={(e) => setBudget(e.target.value)}>
            {budgets.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
          Project details (optional)
          <textarea
            className="min-h-24 w-full rounded border border-input bg-background p-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Tell us about the site, timelines or existing installation."
          />
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        Send request on WhatsApp
      </button>
      <p className="text-xs text-muted-foreground">
        Your answers are formatted into a WhatsApp message and sent to our team. We respond within one
        working hour.
      </p>
    </form>
  );
}
