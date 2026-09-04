import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Zap } from "lucide-react";
import { company, serviceGroups } from "@/lib/company";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-brand text-brand-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded bg-primary text-primary-foreground">
              <Zap className="size-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-bold">{company.name}</span>
          </div>
          <p className="mt-4 text-sm text-brand-foreground/70">
            {company.tagline}. Licensed contractors serving residential, commercial, industrial and
            government clients.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Services</h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-foreground/70">
            {serviceGroups.map((g) => (
              <li key={g.slug}>
                <Link to="/services/$slug" params={{ slug: g.slug }} className="hover:text-secondary">
                  {g.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="hover:text-secondary">
                All services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-brand-foreground/70">
            <li>
              <Link to="/about" className="hover:text-secondary">
                About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-secondary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/quote" className="hover:text-secondary">
                Request a quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-brand-foreground/70">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {company.address}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={company.phoneHref} className="hover:text-secondary">
                {company.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <a href={`mailto:${company.email}`} className="hover:text-secondary">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-brand-foreground/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p>{company.hours}</p>
        </div>
      </div>
    </footer>
  );
}
