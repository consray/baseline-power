# Baseline Power Systems — Repository Audit

**Date:** September 17, 2026
**Auditor:** opencode
**Scope:** Full codebase architecture, data layer, security, and implementation planning

---

## 1. Architecture Overview

### Stack

| Layer      | Technology         | Version            |
| ---------- | ------------------ | ------------------ |
| Framework  | TanStack Start     | 1.168.32           |
| Router     | TanStack Router    | 1.170.18           |
| UI Library | React              | 19.2.0             |
| Styling    | Tailwind CSS v4    | 4.2.1              |
| Language   | TypeScript         | 5.8.3              |
| Build      | Vite               | 8.1.5              |
| Runtime    | Bun                | (latest)           |
| Deployment | Cloudflare Workers | via Nitro 3.0 beta |
| Icons      | Lucide React       | 0.575.0            |

### Current Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                  Cloudflare CDN                  │
└─────────────────────┬───────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────┐
│            Cloudflare Workers (Nitro)            │
│  ┌──────────────────────────────────────────┐   │
│  │           src/server.ts                   │   │
│  │    (SSR error wrapper + h3 recovery)      │   │
│  └──────────────────┬───────────────────────┘   │
│                     │                            │
│  ┌──────────────────▼───────────────────────┐   │
│  │           src/start.ts                    │   │
│  │    (CSRF middleware + error middleware)    │   │
│  └──────────────────┬───────────────────────┘   │
│                     │                            │
│  ┌──────────────────▼───────────────────────┐   │
│  │      TanStack Start Server Entry          │   │
│  │    (SSR rendering + API routes)           │   │
│  └──────────────────┬───────────────────────┘   │
│                     │                            │
│  ┌──────────────────▼───────────────────────┐   │
│  │         React SSR (Server Components)     │   │
│  │    ┌─────────────────────────────────┐   │   │
│  │    │     Route Tree (7 routes)        │   │   │
│  │    │  / /about /contact /quote        │   │   │
│  │    │  /projects /services /services/$ │   │   │
│  │    └─────────────────────────────────┘   │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │         Static Assets (public/)           │   │
│  │  logo.png, partners/*.svg, robots.txt     │   │
│  └──────────────────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

### Data Flow

```
User Request → Cloudflare → Nitro Worker → SSR Render → HTML Response
                                                       ↓
User Interaction → WhatsApp wa.me URL (no server submission)
```

**Critical finding: There is no backend data layer.** All form submissions (contact, quote) redirect to WhatsApp. All content is hardcoded in TypeScript files.

---

## 2. Database Schema

### Current State: No Database

The application has **zero database dependencies**. All data lives in two TypeScript files:

| File                  | Data                                                      | Records                                                                                        |
| --------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/lib/company.ts`  | Company info, services, counties, building types, budgets | 1 company, 3 service groups, 24 service items, 12 counties, 10 building types, 6 budget ranges |
| `src/lib/projects.ts` | Project portfolio                                         | 6 placeholder projects                                                                         |

### Proposed Database Schema

If the application evolves to require dynamic content, user accounts, or form submissions, the following schema would be appropriate:

```sql
-- Core content management
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  year VARCHAR(4) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  challenge TEXT,
  approach TEXT,
  scope JSONB DEFAULT '[]',
  result TEXT,
  cover_image_url VARCHAR(500),
  images JSONB DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  short_description TEXT NOT NULL,
  intro TEXT NOT NULL,
  meta_title VARCHAR(255) NOT NULL,
  meta_description VARCHAR(500) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE service_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- Lead capture (replacing WhatsApp forms)
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  service VARCHAR(255) NOT NULL,
  building_type VARCHAR(255) NOT NULL,
  county VARCHAR(255) NOT NULL,
  budget VARCHAR(100) NOT NULL,
  details TEXT,
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Partner/credential management
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true
);

-- Indexes
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_published ON projects(published);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_quote_requests_status ON quote_requests(status);
CREATE INDEX idx_quote_requests_created ON quote_requests(created_at);
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
```

---

## 3. Migration Plan

### Phase 1: Static Site Cleanup (Current — No Changes Needed)

The current architecture is appropriate for a **brochure website**. No migration required unless business requirements change.

**Current capabilities:**

- Company information display
- Service listings (24 items across 3 categories)
- Project portfolio (6 placeholder projects)
- WhatsApp-based lead capture (contact form + quote form)
- SEO (sitemap, robots.txt, structured data)
- Responsive design

**Limitations:**

- No dynamic content management
- No form submission storage
- No analytics/tracking
- No admin dashboard
- No multi-language support
- Placeholder project data needs real content

### Phase 2: Form Backend (If WhatsApp Insufficient)

**Trigger:** Client wants form submissions stored and emailed, not just WhatsApp redirects.

**Implementation:**

1. Add Cloudflare D1 (SQLite) or KV for storage
2. Create API routes in `src/routes/api/`:
   - `POST /api/quote` — Store quote request, send email notification
   - `POST /api/contact` — Store contact message, send email notification
3. Add Hono or existing TanStack Start server functions for form handling
4. Update `quote-form.tsx` and `contact.tsx` to submit to API instead of WhatsApp
5. Add basic admin page to view submissions

**Estimated effort:** 2-3 days

### Phase 3: CMS Integration (If Content Updates Frequent)

**Trigger:** Client wants to update services, projects, or company info without code changes.

**Options:**

- **Option A: Local CMS** — Add a simple admin interface with D1 database (keep everything on Cloudflare)
- **Option B: Headless CMS** — Integrate Sanity, Strapi, or Contentful
- **Option C: Markdown files** — Use MDX for content with file-based updates via Git

**Recommended:** Option A (D1 + admin page) for this use case — keeps the stack simple and costs low.

**Estimated effort:** 1-2 weeks

### Phase 4: Full Application (If Business Grows)

**Trigger:** Client needs client portals, project management, invoicing, etc.

**This is a complete rebuild** — the current architecture is a brochure site, not a web application. Would require:

- Authentication (Cloudflare Access or custom)
- Database (D1 or external)
- Admin dashboard
- Client portal
- File storage (R2)
- Email service (Resend, SendGrid)

**Not recommended** unless there's a clear business case.

---

## 4. Security Considerations

### Current Security Posture

| Area                    | Status         | Notes                                                                             |
| ----------------------- | -------------- | --------------------------------------------------------------------------------- |
| HTTPS                   | ✅ Enforced    | Cloudflare handles TLS termination                                                |
| CSRF Protection         | ✅ Active      | `createCsrfMiddleware()` on server functions                                      |
| XSS                     | ✅ Mitigated   | React escapes by default; no `dangerouslySetInnerHTML` used                       |
| SQL Injection           | ✅ N/A         | No database                                                                       |
| Dependency Security     | ⚠️ Moderate    | Bun's 24h supply-chain guard active; `@lovable.dev/vite-tanstack-config` exempted |
| Secrets Management      | ✅ Clean       | No secrets in codebase; `.dev.vars` gitignored                                    |
| Error Handling          | ✅ Robust      | 3-layer SSR error recovery; no stack traces leaked to client                      |
| External Links          | ✅ Safe        | `rel="noopener,noreferrer"` on all external links                                 |
| Form Validation         | ⚠️ Client-only | No server-side validation (forms redirect to WhatsApp)                            |
| Rate Limiting           | ❌ None        | No protection against abuse on form submissions or pages                          |
| Content Security Policy | ❌ None        | No CSP headers configured                                                         |
| CORS                    | ✅ Default     | Cloudflare default policies apply                                                 |

### Security Recommendations

**Priority 1 (Before Production):**

1. **Add Content Security Policy headers** — Prevent XSS and data injection
   ```
   Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https:; connect-src 'self'; font-src 'self';
   ```
2. **Add rate limiting** — Cloudflare Rate Limiting rules or Turnstile for form pages
3. **Remove `baseline-logo.png.asset.json`** — Lovable artifact with R2 storage references

**Priority 2 (If Forms Add Backend):** 4. **Server-side form validation** — Validate all inputs before storage 5. **Input sanitization** — Strip HTML from user-submitted content 6. **Email validation** — Verify email format before processing 7. **Phone validation** — Verify Kenyan phone number format 8. **CSRF tokens on forms** — Already handled by TanStack Start middleware

**Priority 3 (If Admin Added):** 9. **Authentication** — Cloudflare Access or custom JWT 10. **Authorization** — Role-based access control 11. **Audit logging** — Track who changed what 12. **Data encryption at rest** — D1 handles this automatically

### Vulnerability Assessment

| Risk                       | Likelihood | Impact | Mitigation                                  |
| -------------------------- | ---------- | ------ | ------------------------------------------- |
| WhatsApp link hijacking    | Low        | Medium | Use only `wa.me` URLs (no API keys exposed) |
| Google Maps API abuse      | Low        | Low    | Public embed only, no API key               |
| Form spam                  | Medium     | Low    | Add Turnstile or honeypot fields            |
| Dependency compromise      | Low        | High   | 24h supply-chain guard active               |
| SSR error information leak | Low        | Medium | Custom error pages hide stack traces        |
| Open redirect via WhatsApp | Low        | Medium | Validate URLs before redirect               |

---

## 5. Implementation Plan

### Current Feature Completeness

| Feature              | Status      | Notes                                                                     |
| -------------------- | ----------- | ------------------------------------------------------------------------- |
| Homepage             | ✅ Complete | Hero, stats, services, projects, testimonials, partners, credentials, map |
| About Page           | ✅ Complete | History, mission/vision/values, team, licences, safety                    |
| Services Listing     | ✅ Complete | 3 groups, 24 items                                                        |
| Service Detail       | ✅ Complete | Dynamic routing, JSON-LD structured data                                  |
| Projects Portfolio   | ✅ Complete | Filtering, detail drawer, gallery lightbox                                |
| Contact Page         | ✅ Complete | Form, map, contact methods                                                |
| Quote Form           | ✅ Complete | Multi-field form with WhatsApp delivery                                   |
| WhatsApp Integration | ✅ Complete | Floating button + contact page CTA                                        |
| Smart Header         | ✅ Complete | Scroll-direction aware, responsive                                        |
| Footer               | ✅ Complete | 4-column, responsive                                                      |
| SEO                  | ✅ Complete | Sitemap, robots.txt, meta tags, structured data                           |
| Responsive Design    | ✅ Complete | Mobile-first, all breakpoints                                             |
| Error Handling       | ✅ Complete | 3-layer SSR recovery, 404 page                                            |

### Known TODOs

1. **Replace placeholder project data** (`src/lib/projects.ts:29`) — 6 projects need real content
2. **Remove Lovable asset metadata** (`src/assets/baseline-logo.png.asset.json`) — Platform artifact
3. **Load Inter font** — CSS declares `"Inter"` but no font file is loaded
4. **Remove unused ProjectCategories** — "Industrial Automation" and "Maintenance & Upgrades" have no projects
5. **Consider removing emergency number placeholder** — `+254 700 000 001` appears to be placeholder

### Recommended Next Steps

| Priority | Task                                                | Effort    | Impact |
| -------- | --------------------------------------------------- | --------- | ------ |
| 1        | Replace placeholder project images with real photos | 1 day     | High   |
| 2        | Add Inter font (Google Fonts or self-hosted)        | 15 min    | Medium |
| 3        | Add Cloudflare Turnstile to forms                   | 1 hour    | Medium |
| 4        | Add CSP headers via Cloudflare                      | 30 min    | High   |
| 5        | Remove `baseline-logo.png.asset.json`               | 1 min     | Low    |
| 6        | Add Google Analytics or Plausible                   | 30 min    | Medium |
| 7        | Add Open Graph images for social sharing            | 2 hours   | Medium |
| 8        | Implement form submissions to D1 (if needed)        | 2-3 days  | High   |
| 9        | Add admin dashboard (if needed)                     | 1-2 weeks | High   |

---

## 6. File Inventory

### Source Files (19 TypeScript/TSX files)

| File                                 | Lines | Purpose                                                                 |
| ------------------------------------ | ----- | ----------------------------------------------------------------------- |
| `src/routes/__root.tsx`              | 142   | Root layout, error boundaries, SEO meta                                 |
| `src/routes/index.tsx`               | 356   | Homepage (hero, stats, services, projects, testimonials, partners, map) |
| `src/routes/about.tsx`               | 164   | About page (history, team, licences, safety)                            |
| `src/routes/contact.tsx`             | 159   | Contact page (form, map, contact methods)                               |
| `src/routes/quote.tsx`               | 67    | Quote request page                                                      |
| `src/routes/projects.tsx`            | 101   | Portfolio page with filtering                                           |
| `src/routes/services.index.tsx`      | 59    | Services listing                                                        |
| `src/routes/services.$slug.tsx`      | 130   | Service detail (dynamic route)                                          |
| `src/components/site-header.tsx`     | 140   | Smart sticky header                                                     |
| `src/components/site-footer.tsx`     | 99    | Footer                                                                  |
| `src/components/quote-form.tsx`      | 133   | Multi-field quote form                                                  |
| `src/components/whatsapp-button.tsx` | 27    | Floating WhatsApp CTA                                                   |
| `src/components/project-card.tsx`    | 39    | Project card                                                            |
| `src/components/project-detail.tsx`  | 181   | Project detail drawer                                                   |
| `src/components/project-filter.tsx`  | 30    | Category filter tabs                                                    |
| `src/components/project-gallery.tsx` | 87    | Image lightbox                                                          |
| `src/lib/company.ts`                 | 203   | Company data, services, utilities                                       |
| `src/lib/projects.ts`                | 185   | Project data and types                                                  |
| `src/lib/error-capture.ts`           | 81    | SSR error capture (h3 recovery)                                         |
| `src/lib/error-page.ts`              | 30    | Static 500 error page                                                   |
| `src/lib/error-reporting.ts`         | 18    | Client-side error logging                                               |
| `src/router.tsx`                     | 16    | Router factory                                                          |
| `src/start.ts`                       | 29    | Middleware stack (CSRF + error)                                         |
| `src/server.ts`                      | 61    | Cloudflare entry (SSR error wrapper)                                    |
| `src/styles.css`                     | 116   | Design system (Tailwind v4)                                             |

### Configuration Files (7 files)

| File               | Purpose                           |
| ------------------ | --------------------------------- |
| `package.json`     | Dependencies, scripts             |
| `tsconfig.json`    | TypeScript config (strict mode)   |
| `vite.config.ts`   | Vite + TanStack Start config      |
| `eslint.config.js` | ESLint flat config                |
| `.prettierrc`      | Prettier config                   |
| `bunfig.toml`      | Bun config (supply-chain guard)   |
| `AGENTS.md`        | Project conventions for AI agents |

### Static Assets (12 files)

| File/Directory          | Purpose                                         |
| ----------------------- | ----------------------------------------------- |
| `public/logo.png`       | Company logo                                    |
| `public/favicon.png`    | Site favicon                                    |
| `public/robots.txt`     | Search engine directives                        |
| `public/sitemap.xml`    | URL listing for crawlers                        |
| `public/partners/*.svg` | 6 partner logos                                 |
| `src/assets/*.jpg`      | 4 source images (hero, electrical, solar, fire) |

---

## 7. Conclusion

The Baseline Power Systems website is a **well-structured, static brochure site** built on a modern SSR stack. The architecture is appropriate for its current purpose — showcasing services and capturing leads via WhatsApp.

**Key strengths:**

- Clean component architecture
- Robust SSR error handling
- Good SEO foundation
- Responsive design
- Accessible (ARIA labels, keyboard navigation, focus states)

**Key limitations:**

- No dynamic content management
- No form submission storage
- Placeholder project data
- No analytics or tracking
- No admin interface

**Recommendation:** The current architecture is production-ready for a brochure website. Do not add a database or backend unless there's a specific business requirement that WhatsApp-based lead capture cannot fulfill.
