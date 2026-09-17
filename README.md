# Baseline Power Systems

Electrical, solar and fire safety engineering website for [Baseline Power Systems](https://baselinepower.co.ke), a licensed contractor serving residential, commercial, industrial and government clients across Kenya.

## Tech Stack

- **Framework**: TanStack Start (React + SSR) with Vite
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: Bun
- **Deployment**: Cloudflare (via Nitro)

## Getting Started

```sh
git clone <this-repository-url>
cd baseline-power
bun install
bun dev
```

## Commands

```sh
bun dev          # Start dev server
bun run build    # Production build
bun run lint     # Run ESLint
bun run format   # Run Prettier --write
bun run preview  # Preview production build
```

## Project Structure

```
src/
├── routes/              # File-based routes (TanStack Router)
├── components/          # Reusable UI components
├── lib/                 # Utilities & error handling
├── router.tsx           # Router factory with QueryClient
├── start.ts             # TanStack Start middleware
├── server.ts            # Cloudflare/Nitro entry
└── styles.css           # Global styles (Tailwind imports)
```
