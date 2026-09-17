## Project Overview

- **Framework**: TanStack Start (React + SSR) with Vite, Tailwind CSS v4, TypeScript
- **Router**: TanStack Router (file-based, `src/routes/`, auto-generated `routeTree.gen.ts`)
- **Package Manager**: Bun (uses `bun.lock`, config in `bunfig.toml`)
- **Deployment**: Cloudflare (via Nitro preset in `@lovable.dev/vite-tanstack-config`)

## Commands

```bash
bun dev          # Start dev server (vite dev)
bun run build    # Production build (vite build)
bun run lint     # Run ESLint
bun run format   # Run Prettier --write
bun run preview  # Preview production build
```

## Project Structure

```
src/
├── routes/              # File-based routes (TanStack Router)
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Home page
│   ├── about.tsx
│   ├── contact.tsx
│   ├── quote.tsx
│   ├── services.index.tsx
│   └── services.$slug.tsx
├── components/          # Reusable UI components
│   ├── quote-form.tsx
│   ├── whatsapp-button.tsx
│   ├── site-header.tsx
│   └── site-footer.tsx
├── lib/                 # Utilities & error handling
│   ├── error-page.ts    # Custom 500 error page
│   ├── error-capture.ts # SSR error capture
│   └── company.ts       # Company config
├── router.tsx           # Router factory with QueryClient
├── start.ts             # TanStack Start middleware (CSRF + error boundary)
├── server.ts            # Cloudflare/Nitro entry (wraps TanStack Start)
└── styles.css           # Global styles (Tailwind imports)
```

## Key Conventions

- **Path alias**: `@/*` → `./src/*` (configured in tsconfig.json & Vite)
- **SSR error handling**: `src/server.ts` wraps TanStack Start entry to normalize h3-swallowed errors
- **Server functions**: Protected by CSRF middleware in `src/start.ts`
- **No `server-only` package**: Use `*.server.ts` suffix or `@tanstack/react-start/server-only` (ESLint enforces this)
- **TypeScript strict mode**: Enabled with extra strictness flags
- **Prettier + ESLint**: Prettier rules enforced via eslint-plugin-prettier

## Environment

- Uses `@lovable.dev/vite-tanstack-config` which bundles: TanStack Start, React, Tailwind, tsConfigPaths, Nitro (Cloudflare), devtools, error logger
- **Do not manually add** those plugins to `vite.config.ts` — they'll conflict

## Development Notes

- Route tree is auto-generated — edit `src/routes/` files, not `routeTree.gen.ts`
- React 19, TanStack Router v1, TanStack Start v1
