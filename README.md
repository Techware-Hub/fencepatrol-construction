# Gefence LLC — Fence Installation in Greeley, CO

> *Fences Built to Last. Service You Can Trust.*

Marketing and lead-generation site for **Gefence LLC**, a Greeley, Colorado fence installation company serving Northern Colorado (Greeley, Windsor, Loveland, Fort Collins, Evans, and surrounding towns). Wood, vinyl, aluminum, deer & pool fencing plus automatic gates.

## Tech Stack

- **Next.js 15** (App Router, Server Components, SSG)
- **React 19**
- **Tailwind CSS v3** with a custom brand palette
- **Framer Motion** for scroll-linked and parallax animations
- **React Icons**
- **Vitest** + Testing Library for unit/component tests

## Features

- **9 prerendered routes**: `/`, `/about`, `/services`, `/services/[slug]` (×5), `/fence-styles`, `/gallery`, `/service-areas`, `/contact`, `/faq`
- **Dynamic service detail pages** generated via `generateStaticParams` (5 services)
- **Pure-data content layer** under `src/content/` — business info, services, fence styles, service areas, testimonials, FAQs, gallery, process steps, value props
- **SEO**: per-route `metadata` exports (canonical URLs, OG/Twitter), `JsonLd` LocalBusiness markup, generated `sitemap.xml` and `robots.txt`
- **Optimized assets**: `next/image` with a `SafeImage` wrapper that falls back to a gradient when an asset is missing
- **Fonts**: Inter + Anton via `next/font`
- **Client interactivity** (only where needed): nav, mobile menu, gallery filter + lightbox, FAQ accordion, contact form, scroll progress, parallax
- **Floating phone CTA** on mobile
- **Vitest harness** with `@/` alias and jsdom; component + content tests included

## Develop

```bash
npm install
npm run dev      # next dev
```

Open http://localhost:3000.

## Build & Run Production

```bash
npm run build    # next build (statically prerenders all routes)
npm run start    # next start
```

## Test

```bash
npm test          # vitest run
npm run test:watch
```

## Deploy

Designed for Vercel — zero config. Just connect the repo and deploy. No `vercel.json` required; the framework is auto-detected.

```bash
vercel           # preview
vercel --prod    # production
```

## Project Structure

```
src/
  app/           # App Router pages, layouts, sitemap/robots, not-found
  components/    # Server + client UI components
  content/       # Pure-data content layer (single source of truth)
  test/          # Test setup
public/
  img/           # Project + style imagery (see "Open Items" below)
  logo.png
  favicon.svg
```

## Open Items for Client

These items in the spec are explicitly out of scope for this build and need client input before launch:

- **Brand assets** — `public/logo.png`, `public/favicon.svg`, hero/about/style/gallery images under `public/img/`. The `SafeImage` component gracefully renders a brand-colored gradient placeholder where assets are missing, so the site is fully usable in the meantime.
- **Contact form backend** — currently a frontend-only demo (renders a success state on submit). Wire to an email/CRM service (Resend, Formspree, etc.) or a Vercel function before launch.
- **Google Maps embed** on `/contact` — placeholder block awaits a confirmed business address (and optional Maps API key for an interactive embed).
- **Social links** — placeholders in `src/content/business.js` (`social.facebook`, `social.instagram`, `social.google`) need real URLs.
- **Domain & metadata** — `metadataBase` in `src/app/layout.jsx` and the sitemap base URL in `src/app/sitemap.js` are set to `https://tntfenceco.com`; update both when the production domain is confirmed.
- **Legal/license credentials** — surfaced as "Licensed & Insured — credentials on request" in the footer; provide license numbers if they should be displayed.

## Contact

**Gefence LLC**
Phone: (845) 551-1446 · Email: Gefence1@gmail.com
Greeley, CO — serving Northern Colorado
