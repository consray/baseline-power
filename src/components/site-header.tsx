import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Phone, X, Zap } from "lucide-react";
import { company } from "@/lib/company";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-brand text-brand-foreground md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p>{company.address}</p>
          <div className="flex items-center gap-5">
            <span>Emergency: {company.emergency}</span>
            <a className="hover:text-secondary" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded bg-primary text-primary-foreground">
            <Zap className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-tight">{company.name}</span>
            <span className="block text-[11px] text-muted-foreground">Engineering · Solar · Fire</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            <Phone className="size-4" aria-hidden="true" />
            {company.phone}
          </a>
          <Link
            to="/quote"
            className="inline-flex h-10 items-center rounded bg-secondary px-4 text-sm font-semibold text-secondary-foreground transition-opacity hover:opacity-90"
          >
            Get a free quote
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded border border-border md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border md:hidden">
          <nav className="container-page flex flex-col py-2" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-medium last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="my-3 inline-flex h-11 items-center justify-center rounded bg-secondary text-sm font-semibold text-secondary-foreground"
            >
              Get a free quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
