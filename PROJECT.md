# Project Overview

## Snapshot
- What this is: Personal portfolio website built with Next.js
- Target users: Recruiters, potential employers, clients
- Current status: Deployed on Vercel

## Tech Stack
- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript
- **UI Components**: shadcn/ui (Radix UI, Tailwind CSS 4)
- **Styling**: Tailwind CSS 4, CSS variables (oklch)
- **Icons**: lucide-react
- **Animation**: CSS animations, tw-animate-css
- **Data**: Local JSON (lib/portfolio.json)
- **Hosting**: Vercel

## Key Files
- Entry: app/page.tsx
- Layout: app/layout.tsx
- Config: next.config, tailwind.config, tsconfig.json
- Components: components/PortfolioClient.tsx
- Data: lib/portfolio.json
- Data types: lib/portfolio-data.ts

## Goals
**Now**
- Mobile-responsive design (done)

**Next**
-

**Later**
-

## Roadmap
- Milestone:

## Repository
- URL: https://github.com/Lart101/PortfolioNiLart
- Branch: main
- Last commit: 77051c2 - update

## Decisions
- Decision: Use local JSON for portfolio data
  - Rationale: GitHub Gist fetch unreliable on Vercel due to IP-based rate limiting
- Decision: Avatar hosted locally at /profile-cut.jpg
  - Rationale: Google Drive direct links unreliable for image hotlinking

## Open Questions / Risks
- (none)
