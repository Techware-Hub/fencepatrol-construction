# Gefence LLC — Fencing Website Design Spec

**Date:** 2026-05-18
**Status:** Approved (brainstorming complete; pending user spec review → writing-plans)
**Repo:** `fencepatrol-construction` (folder name unchanged; site rebrands to Gefence LLC)

---

## 1. Purpose & Goal

Convert the existing single-page "Fencepatrol & Construction" landing site into a complete,
content-dense, multi-page marketing website for **Gefence LLC**, a fence-installation
company serving Greeley and Northern Colorado. The site's job is lead generation:
move visitors toward a free-estimate request or phone call.

The client (Gary) explicitly requested that **we write all the content**.

### Success criteria
- 9 routes live, each with rich, well-formatted, unique content.
- Every page has unique SEO title/meta + `LocalBusiness` JSON-LD schema.
- No fake "membership/subscription" gate anywhere (removed).
- Single source of truth for all brand/content data — nothing hardcoded twice.
- Production build passes; existing dark/orange/blue design system preserved.

---

## 2. Brand & Identity (resolved decision)

The client data contained a conflict (company "Gefence LLC" vs domain `tntfenceco.com`
vs existing repo brand "Fencepatrol & Construction"). **Resolved: the site is
Gefence LLC.** `tntfenceco.com` is treated as the hosting domain only; the Fencepatrol
brand/logo/Long-Island content is fully replaced.

| Field | Value |
|-------|-------|
| Business name | Gefence LLC |
| Contact | Gary |
| Phone | (845) 551-1446 |
| Email | Gefence1@gmail.com |
| Location / service hub | Greeley, Colorado, USA |
| Domain | tntfenceco.com (hosting only) |
| Core services | Fence installation, automatic gate installation, deer fencing, pool fencing, fence repair |

> ⚠️ **Pre-launch verification item (client):** the supplied phone number
> `845-551-1446` is a New York (Hudson Valley) area code while the business is in
> Greeley, CO (970 area). The number is used **exactly as supplied** throughout the
> site. Flag to client to confirm/replace before go-live. Do not invent a substitute.

---

## 3. Architecture (Approach A — approved)

- **React Router multi-page SPA.** Vite + React 19 + Tailwind v3 + Framer Motion +
  React Icons (all already installed). No new heavy dependencies.
- **Centralized content layer** under `src/content/` — every page reads from it.
- **Real Service Detail page** replaces `src/pages/LockedService.jsx` (the
  membership-gate model is removed entirely, including the `$0/$49/$149` plans).
- **Design system kept as-is:** Tailwind brand tokens, `container-x`, `btn-primary`,
  `chip`, `heading-display`, CSS grid/noise textures, scroll/parallax animations.
  Only the Fencepatrol logo/wordmark is replaced with a Gefence LLC mark.
- **SEO:** lightweight custom `<Seo>` component sets `document.title` + meta tags +
  injects JSON-LD `LocalBusiness` schema per page; static `sitemap.xml` + `robots.txt`
  in `public/`. `vercel.json` SPA rewrite already present.

### Why not the alternatives
- **B (one long page):** contradicts the explicit "more pages" requirement; weak local SEO.
- **C (MDX pipeline):** unnecessary build complexity for a brochure site (YAGNI).

---

## 4. Site Map (9 routes — approved)

| Route | Page | In top nav |
|-------|------|:---:|
| `/` | Home | — (logo) |
| `/about` | About Gefence LLC | ✓ |
| `/services` | Services overview | ✓ |
| `/services/:slug` | Service detail (×5) | via Services menu |
| `/fence-styles` | Fence Styles | ✓ |
| `/gallery` | Project Gallery | ✓ |
| `/service-areas` | Service Areas | ✓ |
| `/contact` | Contact / Free Estimate | ✓ |
| `/faq` | FAQ | footer + FAQ links |
| `/*` | Friendly 404 → Home | — |

Service detail slugs: `fence-installation`, `automatic-gate-installation`,
`deer-fencing`, `pool-fencing`, `fence-repair`.

Footer carries secondary links (Privacy stub, Service Areas, all pages, social,
license-# placeholder) and a persistent "Get a Free Estimate" CTA. Floating
call button retained sitewide.

---

## 5. Homepage Section Stack (14 sections — approved)

1. Sticky navbar — Gefence LLC wordmark, nav, phone CTA
2. **Hero** — headline + subhead, dual CTA (Free Estimate / Call), trust chips, hero image
3. Trust/stats strip — years · projects · licensed & insured · 5-star · "Serving Greeley & Northern Colorado"
4. Services overview grid — 5 cards → detail pages
5. Why Gefence (value props) — licensed & insured, free estimates, written warranty, local crews, premium materials
6. Fence styles preview — 6 styles → Fence Styles page
7. How it works — 4-step process
8. Featured projects — gallery preview → Gallery page
9. Service areas list/map → Service Areas page
10. Testimonials — rotating 5-star NoCo reviews
11. Financing & warranty band
12. FAQ preview — top 5 → FAQ page
13. Final CTA band
14. Quick estimate form
+ Footer

---

## 6. Inner Page Layouts (approved)

Shared shell for every inner page: hero band → dense content sections →
mid-page CTA → contact/estimate band → footer. Each page: `<Seo>` +
breadcrumb + JSON-LD.

- **/about** — story/mission, owner (Gary) intro, why NoCo trusts us, credentials
  (licensed/insured/bonded), values grid, crew & equipment, stats, testimonial, CTA.
- **/services** — intro + 5 service cards w/ summaries linking to detail pages,
  process strip, materials, comparison table, CTA band.
- **/services/:slug** (×5) — hero, overview, what's included, process, materials/options,
  pricing factors, mini gallery, service-specific FAQ, related services, estimate CTA.
- **/fence-styles** — 6 styles (Wood, Vinyl, Chain-Link, Aluminum/Ornamental,
  Composite, Split-Rail); per style: photo, pros/cons, best-for, lifespan, price tier;
  comparison matrix; "help me choose" CTA.
- **/gallery** — filter by service/style, grid + lightbox, captions, before/after
  pairs, location tags, CTA.
- **/service-areas** — Greeley hub + ~10 NoCo towns (Windsor, Evans, Loveland,
  Fort Collins, Johnstown, Severance, Eaton, Milliken, Ault, Timnath, Wellington),
  per-town blurb (local SEO), coverage map visual, "not listed? call us" CTA.
- **/contact** — multi-field estimate form, phone/email/hours/address, map embed
  placeholder, response-time promise, trust chips.
- **/faq** — grouped accordions (pricing, permits, materials, timeline, warranty,
  maintenance), 15–20 Q&A, "still have questions" CTA.

---

## 7. Data Model

`src/content/` modules (single source of truth):

| File | Contents |
|------|----------|
| `business.js` | name, phone (raw+display+href), email, location, hours, socials, license placeholder, slogan |
| `services.js` | 5 services: slug, title, summary, overview, included[], process[], pricingFactors[], faqs[], image |
| `fenceStyles.js` | 6 styles: name, image, pros[], cons[], bestFor, lifespan, priceTier, description |
| `serviceAreas.js` | Greeley + ~10 towns: name, blurb |
| `testimonials.js` | name, role/town, text, rating |
| `faqs.js` | grouped: {group, items:[{q,a}]} |
| `gallery.js` | image, caption, service, style, beforeAfter? |
| `processSteps.js` | step, title, text |
| `valueProps.js` | icon, title, text |

Existing `src/data.js` is migrated into these modules and removed.

---

## 8. Component Plan

- **Layout/shared:** `Seo`, `Navbar` (rebranded, multi-page links + Services dropdown),
  `Footer` (expanded), `PhoneBadge`, `ScrollProgress`, `Reveal`, `CTABand`,
  `ContactForm`, `Breadcrumb`, `SectionHeading`.
- **Pages:** `Home`, `About`, `Services`, `ServiceDetail`, `FenceStyles`, `Gallery`,
  `ServiceAreas`, `Contact`, `Faq`, `NotFound`.
- **Home sections:** reuse/rework existing `Hero`, `Services`, `Process`, `Gallery`,
  `Testimonials`, `FAQ`, `CTA`, `About`, `Marquee`→stats strip, `ParallaxQuote`.
- **Removed:** `LockedService.jsx` and the `PLANS` membership model.

Each component stays focused and single-purpose; page files compose sections and
stay thin (data from content modules, not inline).

---

## 9. Asset Manifest & Image-Generation Prompts

Actual generation runs in the **implementation phase** via the codex image-gen skill
(once installed). Until assets exist, components reference planned `public/img/...`
paths with graceful fallbacks so the build never breaks.

**Global style suffix appended to every photo prompt:**
*"professional contractor/real-estate photography, natural daylight, Northern
Colorado residential setting, crisp focus, realistic, no text, no watermark,
16:9 unless noted."*

| # | Asset | File | Prompt (core) |
|---|-------|------|---------------|
| 1 | Logo/wordmark | `public/logo.png` | Minimal modern logo for "GEFENCE LLC" fence company — clean fence-picket + shield mark, orange #F97316 + deep blue #1E40AF, transparent background, vector style, square |
| 2 | Hero bg | `public/img/hero.jpg` | Two-person crew installing a tall cedar privacy fence in a suburban backyard, golden hour, faint Rocky Mountains on horizon |
| 3 | Fence Installation | `public/img/svc-installation.jpg` | Newly installed wood privacy fence along a green backyard, post caps, clean lines |
| 4 | Automatic Gate | `public/img/svc-gates.jpg` | Automatic swinging driveway gate in black aluminum opening onto a paved drive, keypad pedestal |
| 5 | Deer Fencing | `public/img/svc-deer.jpg` | Tall black poly/metal deer fence protecting a vegetable garden, trees behind |
| 6 | Pool Fencing | `public/img/svc-pool.jpg` | Black aluminum pool safety fence around a clean backyard pool, sunny |
| 7 | Fence Repair | `public/img/svc-repair.jpg` | Contractor repairing a leaning wooden fence post with tools, close detail |
| 8 | Wood style | `public/img/style-wood.jpg` | Eye-level shot of a cedar wood privacy fence, well-maintained yard |
| 9 | Vinyl style | `public/img/style-vinyl.jpg` | Eye-level shot of a white vinyl privacy fence, clean suburban yard |
| 10 | Chain-link style | `public/img/style-chainlink.jpg` | Eye-level shot of a galvanized chain-link fence around a backyard |
| 11 | Aluminum style | `public/img/style-aluminum.jpg` | Eye-level shot of a black ornamental aluminum fence, landscaped yard |
| 12 | Composite style | `public/img/style-composite.jpg` | Eye-level shot of a modern grey composite privacy fence |
| 13 | Split-rail style | `public/img/style-splitrail.jpg` | Eye-level shot of a wooden split-rail fence on a rural property, open land |
| 14–23 | Gallery ×10 | `public/img/gallery-01..10.jpg` | Mix of completed fences/gates across the 6 styles; 2–3 before/after pairs |
| 24 | About/crew | `public/img/about-crew.jpg` | Friendly small fence-contractor crew with branded truck and tools, smiling, jobsite |
| 25 | Service-area bg | `public/img/areas-map.jpg` | Soft muted aerial of Northern Colorado suburban neighborhoods, for dark overlay |
| 26 | OG share | `public/img/og.jpg` | Gefence LLC hero composition, finished fence, clean negative space for code-overlaid title (1200×630) |
| 27 | Favicon | `public/favicon.svg` | Derived from logo mark (fence-picket + shield), simple, 1-color-safe |

Process-step and value-prop icons use **react-icons** (already a dependency) — no
generation needed. Existing CSS grid/noise textures retained.

---

## 10. SEO & Technical Details

- `<Seo>` component per page: unique `<title>`, meta description, canonical,
  Open Graph + Twitter tags, JSON-LD `LocalBusiness` (name, phone, email,
  areaServed = Greeley + NoCo towns, service catalog).
- `public/sitemap.xml` (all 9 routes) + `public/robots.txt`.
- Semantic headings, alt text on all images, accessible nav (keyboard + aria),
  reduced-motion respect for Framer animations.
- Lighthouse target: performance/SEO/accessibility ≥ 90.
- Build: `npm run build` must pass clean; `vercel.json` SPA rewrite already in repo.

---

## 11. Out of Scope (YAGNI)

- Backend / real form submission (form is front-end demo; can wire to email/Formspree later).
- CMS, blog, e-commerce, online booking, payments.
- Multi-language.
- Real Google Maps API key (embed placeholder/static map until client provides).
- Membership/subscription anything (explicitly removed).

---

## 12. Open Items for Client (non-blocking)

1. Confirm/replace the phone number (845 area code vs Greeley CO 970).
2. Provide license/insurance numbers (placeholders used until then).
3. Confirm exact service-area town list.
4. Provide real project photos if available (generated placeholders used otherwise).
5. Confirm business hours and physical address (if public-facing).
