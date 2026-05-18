# Gefence LLC Website Implementation Plan (Next.js App Router)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Vite/Fencepatrol landing site as a clean **Next.js 15 App Router** 9-route, content-dense, SEO-strong lead-generation website for Gefence LLC (Greeley, CO).

**Architecture:** Next.js 15 App Router, statically generated, deployed on Vercel. A pure-data `src/content/` layer is the single source of truth. Server Components by default; `"use client"` only on interactive UI (nav, forms, animations, accordion, lightbox). Per-route Metadata API + JSON-LD for SEO; generated `sitemap.ts`/`robots.ts`; `next/image` + `next/font`.

**Tech Stack:** Next.js 15, React 19, Tailwind v3, Framer Motion 12, React Icons 5. Tests: Vitest + @testing-library/react + jsdom for the data layer and client components; `next build` statically pre-renders every route and is the route-level safety net.

---

## Conventions (read once)

- **Brand constants** come only from `src/content/business.js`. Never hardcode phone/email/name elsewhere.
- **Phone used exactly as supplied:** `(845) 551-1446` (spec §2 flags it for client verification — do not change).
- **Voice for all copy:** confident, plain-spoken local contractor. Short sentences. Natural Greeley / Northern Colorado references. No corporate filler, no invented certifications.
- All prose lives in content modules (or page-narrative for About). Components are layout-only.
- Content modules are **pure data, no JSX** — Server Components import them directly.
- Add `"use client"` to a component **only** if it uses hooks, events, browser APIs, or framer-motion.
- `npm run build` (= `next build`) must stay green from Task 2 onward; it pre-renders all static routes, so a broken page fails the build.
- Commit after every task with the exact message shown.

---

## File Structure

**Create:**
- `next.config.mjs`, `jsconfig.json`, `.eslintrc.json`
- `src/app/layout.jsx`, `src/app/globals.css`, `src/app/page.jsx`, `src/app/not-found.jsx`
- `src/app/{about,services,fence-styles,gallery,service-areas,contact,faq}/page.jsx`
- `src/app/services/[slug]/page.jsx`
- `src/app/sitemap.ts`, `src/app/robots.ts`
- `src/content/{business,services,fenceStyles,serviceAreas,testimonials,faqs,gallery,processSteps,valueProps,index}.js`
- `src/components/{JsonLd,SafeImage,PageHero,SectionHeading,Breadcrumb,CTABand,Navbar,Footer,PhoneBadge,ContactForm,ScrollProgress,Reveal}.jsx` and home-section components
- `vitest.config.js`, `src/test/setup.js`, tests under `src/content/__tests__/` and `src/components/__tests__/`
- `public/img/*`, `public/logo.png`, `public/favicon.svg` (Task 23)

**Port/adapt from existing Vite components:** `Hero`, `Services` grid, `About`, `Process`, `Gallery`, `Testimonials`, `FAQ`, `Marquee`(→stats), `ParallaxQuote`, `PhoneBadge`, `ScrollProgress`, `Reveal` — reused as section components with `"use client"` where needed and content-module data.

**Delete (Vite tooling):** `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/pages/Landing.jsx`, `src/pages/LockedService.jsx`, `src/data.js`, `src/assets/vite.svg`, `vercel.json`, `postcss.config.js` (recreated for Next), `src/index.css` (moved to `globals.css`).

---

## Phase 0 — Re-scaffold to Next.js

### Task 1: Swap Vite tooling for Next.js

**Files:** Modify `package.json`, `.gitignore`; Create `next.config.mjs`, `jsconfig.json`, `.eslintrc.json`; Delete Vite files

- [ ] **Step 1: Remove Vite deps & files**

```bash
npm remove vite @vitejs/plugin-react react-router-dom typescript @types/react @types/react-dom
git rm vite.config.js index.html src/main.jsx src/App.jsx vercel.json postcss.config.js
git rm src/pages/LockedService.jsx src/assets/vite.svg
```
(Leave `src/pages/Landing.jsx`, `src/data.js`, `src/index.css`, `src/components/*` in place for now — content/markup is salvaged in later tasks, then deleted.)

- [ ] **Step 2: Install Next.js**

```bash
npm i next@^15 react@^19 react-dom@^19
npm i -D eslint eslint-config-next@^15
```

- [ ] **Step 3: Rewrite `package.json` scripts**

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest run",
  "test:watch": "vitest"
}
```
Also set `"name": "gefence-website"`. Remove `"type": "module"` if present (Next handles module resolution; keeping it is fine for `.mjs` config — leave it).

- [ ] **Step 4: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
```

- [ ] **Step 5: Create `jsconfig.json`**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

- [ ] **Step 6: Create `.eslintrc.json`**

```json
{ "extends": "next/core-web-vitals" }
```

- [ ] **Step 7: Update `.gitignore`** — add Next entries:

```
.next/
out/
next-env.d.ts
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: replace Vite tooling with Next.js 15"
```

### Task 2: Tailwind + globals + root layout (minimal home renders)

**Files:** Modify `tailwind.config.js`; Create `postcss.config.js`, `src/app/globals.css`, `src/app/layout.jsx`, `src/app/page.jsx`

- [ ] **Step 1: Recreate `postcss.config.js`**

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

- [ ] **Step 2: Update `tailwind.config.js` content globs** — replace the `content` array with:

```js
content: ["./src/app/**/*.{js,jsx}", "./src/components/**/*.{js,jsx}"],
```
Keep the entire existing `theme.extend` (brand colors, fonts, backgroundImage, boxShadow, animation, keyframes) unchanged.

- [ ] **Step 3: Create `src/app/globals.css`** — copy the full contents of the existing `src/index.css` verbatim (the `@tailwind` directives, body, scrollbar, `@layer components`, `.bg-noise`). Then change the `font-family` line in `body` to use the CSS variable: `font-family: var(--font-inter), system-ui, sans-serif;` and in `.heading-display` change to `font-family: var(--font-anton), Impact, sans-serif;`.

- [ ] **Step 4: Create `src/app/layout.jsx`**

```jsx
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/content/index.js";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://tntfenceco.com"),
  title: {
    default: "Gefence LLC — Fence Installation in Greeley, CO",
    template: "%s | Gefence LLC — Greeley Fence Company",
  },
  description:
    "Wood, vinyl, aluminum, deer & pool fencing plus automatic gates across Greeley & Northern Colorado. Free written estimates.",
  openGraph: { type: "website", siteName: "Gefence LLC", images: ["/img/og.jpg"] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```
(Navbar/Footer/JsonLd added to this layout in Task 9/10/7.)

- [ ] **Step 5: Create temporary `src/content/index.js` stub** so the layout import resolves (replaced in Task 6):

```js
export const BUSINESS = { name: "Gefence LLC" };
```

- [ ] **Step 6: Create `src/app/page.jsx`**

```jsx
export default function Home() {
  return <main className="container-x py-32"><h1 className="heading-display text-5xl text-white">Gefence LLC</h1></main>;
}
```

- [ ] **Step 7: Build** — `npm run build` → Expected: success, `/` pre-rendered as static.
- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: Next.js root layout, Tailwind, fonts, globals"
```

### Task 3: Vitest harness

**Files:** Modify `package.json` (deps); Create `vitest.config.js`, `src/test/setup.js`, `src/test/sanity.test.js`

- [ ] **Step 1: Install**

```bash
npm i -D vitest@^2 @testing-library/react@^16 @testing-library/jest-dom@^6 jsdom@^25 @vitejs/plugin-react@^4
```

- [ ] **Step 2: `vitest.config.js`**

```js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true, setupFiles: ["./src/test/setup.js"], css: false },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
```

- [ ] **Step 3: `src/test/setup.js`**

```js
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: `src/test/sanity.test.js`**

```js
import { describe, it, expect } from "vitest";
describe("harness", () => { it("runs", () => { expect(1 + 1).toBe(2); }); });
```

- [ ] **Step 5: Run** — `npm test` → 1 passed.
- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: add vitest harness with @ alias"
```

---

## Phase 1 — Content Layer (TDD)

> Pure data modules. Tests assert shape + invariants. Copy is final.

### Task 4: business.js

**Files:** Create `src/content/business.js`, `src/content/__tests__/business.test.js` (overwrites Task 2 stub via the real `index.js` in Task 7)

- [ ] **Step 1: Failing test** — `src/content/__tests__/business.test.js`

```js
import { describe, it, expect } from "vitest";
import { BUSINESS } from "@/content/business.js";

describe("BUSINESS", () => {
  it("has core NAP fields", () => {
    expect(BUSINESS.name).toBe("Gefence LLC");
    expect(BUSINESS.phoneDisplay).toBe("(845) 551-1446");
    expect(BUSINESS.phoneHref).toBe("tel:+18455511446");
    expect(BUSINESS.email).toBe("Gefence1@gmail.com");
    expect(BUSINESS.city).toBe("Greeley");
    expect(BUSINESS.state).toBe("CO");
  });
  it("has hours and slogan", () => {
    expect(BUSINESS.hours.length).toBeGreaterThan(0);
    expect(typeof BUSINESS.slogan).toBe("string");
  });
});
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Create `src/content/business.js`**

```js
export const BUSINESS = {
  name: "Gefence LLC",
  legalName: "Gefence LLC",
  owner: "Gary",
  phoneRaw: "8455511446",
  phoneDisplay: "(845) 551-1446",
  phoneHref: "tel:+18455511446",
  email: "Gefence1@gmail.com",
  emailHref: "mailto:Gefence1@gmail.com",
  city: "Greeley",
  state: "CO",
  region: "Northern Colorado",
  addressNote: "Serving Greeley & Northern Colorado",
  domain: "tntfenceco.com",
  slogan: "Fences Built to Last. Service You Can Trust.",
  tagline: "Greeley's fence installation specialists.",
  licenseNote: "Licensed & Insured — credentials on request",
  hours: [
    { d: "Mon–Fri", h: "7:00 AM – 6:00 PM" },
    { d: "Saturday", h: "8:00 AM – 2:00 PM" },
    { d: "Sunday", h: "Closed (calls returned next day)" },
  ],
  social: { facebook: "#", instagram: "#", google: "#" },
};
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** — `git add src/content/business.js src/content/__tests__/business.test.js && git commit -m "feat: business content module"`

### Task 5: services.js (5 services, full copy)

**Files:** Create `src/content/services.js`, `src/content/__tests__/services.test.js`

- [ ] **Step 1: Failing test**

```js
import { describe, it, expect } from "vitest";
import { SERVICES, getService } from "@/content/services.js";

describe("SERVICES", () => {
  it("has exactly 5 with unique slugs", () => {
    expect(SERVICES).toHaveLength(5);
    expect(new Set(SERVICES.map(s => s.slug)).size).toBe(5);
  });
  it("each has required content fields", () => {
    for (const s of SERVICES) {
      expect(s.slug && s.title && s.summary && s.overview).toBeTruthy();
      expect(s.included.length).toBeGreaterThanOrEqual(4);
      expect(s.process.length).toBeGreaterThanOrEqual(3);
      expect(s.faqs.length).toBeGreaterThanOrEqual(2);
      expect(s.pricingFactors.length).toBeGreaterThanOrEqual(3);
      expect(typeof s.image).toBe("string");
    }
  });
  it("getService resolves/falls back", () => {
    expect(getService("deer-fencing").slug).toBe("deer-fencing");
    expect(getService("nope")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Create `src/content/services.js`** — identical content to the approved copy:

```js
export const SERVICES = [
  {
    slug: "fence-installation",
    title: "Fence Installation",
    icon: "fence",
    image: "/img/svc-installation.jpg",
    summary: "New wood, vinyl, chain-link, and aluminum fences built to handle Colorado weather and last for decades.",
    overview:
      "A fence is one of the highest-impact upgrades you can make to a Greeley property — it adds privacy, security, curb appeal, and value all at once. Gefence LLC installs residential and light-commercial fences across Northern Colorado using contractor-grade materials and proper post depth for our frost line, so your fence stays straight through freeze, thaw, and high wind.",
    included: [
      "Free on-site measurement and written estimate",
      "Concrete-set posts dug below the Colorado frost line",
      "Wood, vinyl, chain-link, aluminum, composite, and split-rail options",
      "Gate fabrication and hardware included",
      "Old-fence removal and full site cleanup",
      "Workmanship warranty in writing",
    ],
    process: [
      "We walk the property, confirm the line, and discuss style and budget.",
      "You get a clear written quote — no vague ranges.",
      "We call in utility locates and pull permits where required.",
      "Our crew sets posts, hangs panels and gates, and hauls everything away.",
      "Final walkthrough and your warranty in hand.",
    ],
    pricingFactors: [
      "Linear footage and number of gates",
      "Material and fence height",
      "Terrain, slope, and rocky soil",
      "Old fence removal and haul-off",
    ],
    faqs: [
      { q: "How long does a typical install take?", a: "Most residential yards are finished in 1–3 days depending on footage and terrain." },
      { q: "Do you set posts in concrete?", a: "Yes. Every post is concrete-set below our local frost line so the fence doesn't heave or lean." },
      { q: "Can you match an existing fence?", a: "In most cases, yes — bring us a photo and we'll spec the closest durable match." },
    ],
  },
  {
    slug: "automatic-gate-installation",
    title: "Automatic Gate Installation",
    icon: "gate",
    image: "/img/svc-gates.jpg",
    summary: "Swing and slide driveway gates with keypad, remote, and smartphone access — installed and serviced.",
    overview:
      "An automatic gate is convenience and security in one. Gefence LLC installs and wires automated swing and slide gates for driveways and properties around Greeley, including the operator, safety sensors, and your choice of keypad, remote, or phone-app entry. We size the operator to the gate and the wind load so it opens reliably year-round.",
    included: [
      "Gate design sized to your driveway and slope",
      "Heavy-duty swing or slide operator",
      "Keypad, remote, and smartphone access options",
      "Safety photo-eyes and auto-reverse",
      "Low-voltage wiring and weatherproof enclosure",
      "Operation training and maintenance guidance",
    ],
    process: [
      "Site visit to assess driveway width, slope, and power.",
      "We recommend swing vs. slide and the right operator.",
      "Written quote covering gate, automation, and access.",
      "Install, wire, program, and test all safety features.",
      "We show you how to operate and maintain it.",
    ],
    pricingFactors: [
      "Swing vs. slide and gate size",
      "Operator horsepower and power availability",
      "Access controls (keypad, remote, app, intercom)",
      "Trenching and wiring distance",
    ],
    faqs: [
      { q: "Swing or slide gate — which is better?", a: "Slide gates suit short or sloped driveways; swing gates suit flat, wider entries. We'll recommend based on your site." },
      { q: "What happens in a power outage?", a: "We install operators with battery backup and a manual release so you're never locked in or out." },
    ],
  },
  {
    slug: "deer-fencing",
    title: "Deer Fencing",
    icon: "deer",
    image: "/img/svc-deer.jpg",
    summary: "Tall, low-visibility deer fencing that actually protects Northern Colorado gardens, orchards, and landscaping.",
    overview:
      "Deer pressure is real across Northern Colorado, and a standard 4-foot fence won't stop them. Gefence LLC installs 7–8 foot deer fencing — heavy poly mesh or welded wire — engineered to keep deer out of gardens, orchards, and ornamental landscaping while staying nearly invisible from a distance.",
    included: [
      "7–8 ft height engineered to deter jumping",
      "Heavy poly mesh or welded-wire options",
      "Ground-level reinforcement to stop pushing under",
      "Gates for garden and equipment access",
      "Tree-line and slope routing",
      "Clean, low-visibility finished look",
    ],
    process: [
      "Walk the area you need protected and note deer paths.",
      "Recommend mesh type and height for your pressure level.",
      "Written quote with gate placement.",
      "Install posts, tension the mesh, and secure the base.",
      "Walkthrough and care tips.",
    ],
    pricingFactors: [
      "Enclosed area and perimeter length",
      "Mesh type (poly vs. welded wire)",
      "Number and size of access gates",
      "Terrain and tree-line routing",
    ],
    faqs: [
      { q: "How tall does deer fencing need to be?", a: "We install 7–8 ft. Deer can clear shorter fences, especially under food pressure in winter." },
      { q: "Will it ruin my view?", a: "Black poly mesh visually disappears from a few feet away — most clients barely notice it." },
    ],
  },
  {
    slug: "pool-fencing",
    title: "Pool Fencing",
    icon: "pool",
    image: "/img/svc-pool.jpg",
    summary: "Code-compliant pool safety fencing — aluminum, mesh, and glass-style — that keeps kids and pets safe.",
    overview:
      "Pool fencing is a safety requirement, not an afterthought. Gefence LLC installs code-compliant pool barriers around Greeley — durable powder-coated aluminum, removable mesh, and modern flat-top styles — with self-closing, self-latching gates that meet residential pool-barrier code.",
    included: [
      "Code-compliant height and picket spacing",
      "Self-closing, self-latching safety gates",
      "Powder-coated aluminum or removable mesh",
      "Rust- and corrosion-resistant hardware",
      "Layouts that work around decks and hardscape",
      "Clean finish that complements the pool area",
    ],
    process: [
      "Measure the pool enclosure and review code requirements.",
      "Recommend style (aluminum, mesh, flat-top) and gate placement.",
      "Written quote with code notes.",
      "Install fence and self-latching gates; verify spacing.",
      "Final safety check and walkthrough.",
    ],
    pricingFactors: [
      "Perimeter length and number of gates",
      "Material (aluminum vs. removable mesh)",
      "Code-required height and gate hardware",
      "Decking and hardscape obstacles",
    ],
    faqs: [
      { q: "Does the gate have to self-close?", a: "Yes — residential pool code requires self-closing, self-latching gates, and that's how we build them." },
      { q: "Can the fence be removable?", a: "Yes. We install removable mesh systems that take down for entertaining and reinstall in minutes." },
    ],
  },
  {
    slug: "fence-repair",
    title: "Fence Repair & Restoration",
    icon: "repair",
    image: "/img/svc-repair.jpg",
    summary: "Leaning posts, wind-damaged panels, sagging gates — repaired fast so you don't replace the whole fence.",
    overview:
      "Colorado wind and snow are hard on fences. Before you replace an entire run, let Gefence LLC assess it — often we can reset posts, swap damaged sections, and rehang gates for a fraction of replacement cost, and restore the look with a clean stain or seal.",
    included: [
      "Storm and wind-damage repair",
      "Post resetting and replacement",
      "Panel and picket replacement",
      "Gate rehang and hardware fixes",
      "Stain, seal, and restoration",
      "Honest replace-vs-repair assessment",
    ],
    process: [
      "Inspect the fence and identify what's actually failing.",
      "Tell you honestly whether to repair or replace.",
      "Written quote for the repair scope.",
      "Repair, reset, and restore.",
      "Walkthrough so you know it's solid.",
    ],
    pricingFactors: [
      "Number of posts/panels affected",
      "Material and matching requirements",
      "Access and soil conditions",
      "Optional stain/seal restoration",
    ],
    faqs: [
      { q: "Is it cheaper to repair or replace?", a: "Often repair — if posts are sound. We'll give you a straight answer after inspecting it." },
      { q: "Do you do emergency storm repair?", a: "Yes. Call us after a windstorm and we'll prioritize getting your fence secure." },
    ],
  },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** — `git add src/content/services.js src/content/__tests__/services.test.js && git commit -m "feat: services content module"`

### Task 6: fenceStyles.js + remaining modules + barrel

**Files:** Create `src/content/{fenceStyles,serviceAreas,testimonials,faqs,gallery,processSteps,valueProps,index}.js`, `src/content/__tests__/{fenceStyles,content}.test.js`

- [ ] **Step 1: Failing tests**

`src/content/__tests__/fenceStyles.test.js`:
```js
import { describe, it, expect } from "vitest";
import { FENCE_STYLES } from "@/content/fenceStyles.js";
describe("FENCE_STYLES", () => {
  it("6 unique styles with meta", () => {
    expect(FENCE_STYLES).toHaveLength(6);
    expect(new Set(FENCE_STYLES.map(s => s.key)).size).toBe(6);
    for (const s of FENCE_STYLES) {
      expect(s.name && s.description && s.image).toBeTruthy();
      expect(s.pros.length).toBeGreaterThanOrEqual(3);
      expect(s.cons.length).toBeGreaterThanOrEqual(2);
      expect(s.bestFor && s.lifespan && s.priceTier).toBeTruthy();
    }
  });
});
```

`src/content/__tests__/content.test.js`:
```js
import { describe, it, expect } from "vitest";
import { SERVICE_AREAS } from "@/content/serviceAreas.js";
import { TESTIMONIALS } from "@/content/testimonials.js";
import { FAQ_GROUPS } from "@/content/faqs.js";
import { GALLERY } from "@/content/gallery.js";
import { PROCESS_STEPS } from "@/content/processSteps.js";
import { VALUE_PROPS } from "@/content/valueProps.js";
describe("supporting content", () => {
  it("service areas", () => {
    expect(SERVICE_AREAS.length).toBeGreaterThanOrEqual(8);
    expect(SERVICE_AREAS[0].name).toBe("Greeley");
    SERVICE_AREAS.forEach(a => expect(a.blurb.length).toBeGreaterThan(10));
  });
  it("testimonials all 5-star", () => {
    expect(TESTIMONIALS.length).toBeGreaterThanOrEqual(4);
    TESTIMONIALS.forEach(t => expect(t.rating).toBe(5));
  });
  it("faq >=15 items across groups", () => {
    expect(FAQ_GROUPS.length).toBeGreaterThanOrEqual(4);
    expect(FAQ_GROUPS.reduce((n, g) => n + g.items.length, 0)).toBeGreaterThanOrEqual(15);
  });
  it("gallery tagged", () => {
    expect(GALLERY.length).toBeGreaterThanOrEqual(10);
    GALLERY.forEach(g => expect(g.image && g.caption && g.style).toBeTruthy());
  });
  it("process + value props", () => {
    expect(PROCESS_STEPS).toHaveLength(4);
    expect(VALUE_PROPS.length).toBeGreaterThanOrEqual(5);
  });
});
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Create modules** — content identical to the approved copy:

`src/content/fenceStyles.js`:
```js
export const FENCE_STYLES = [
  { key: "wood", name: "Wood Privacy", image: "/img/style-wood.jpg",
    description: "Classic cedar and treated-pine privacy fencing — warm, customizable, and the most popular choice for Greeley backyards.",
    pros: ["Best privacy and sound buffer", "Fully customizable height and style", "Lower upfront cost", "Easy to repair board-by-board"],
    cons: ["Needs stain/seal every few years", "Shorter lifespan than vinyl/metal"],
    bestFor: "Backyard privacy and traditional looks", lifespan: "15–20 years with maintenance", priceTier: "$$" },
  { key: "vinyl", name: "Vinyl", image: "/img/style-vinyl.jpg",
    description: "Low-maintenance vinyl fencing that never needs paint or stain and shrugs off Colorado sun and moisture.",
    pros: ["Virtually maintenance-free", "Won't rot, warp, or peel", "Clean modern look", "Long lifespan"],
    cons: ["Higher upfront cost", "Fewer repair options if cracked"],
    bestFor: "Owners who want privacy with zero upkeep", lifespan: "25–30+ years", priceTier: "$$$" },
  { key: "chainlink", name: "Chain-Link", image: "/img/style-chainlink.jpg",
    description: "Economical, durable boundary and security fencing for yards, pets, and light-commercial use.",
    pros: ["Most budget-friendly", "Extremely durable", "Great for pets and large areas", "Optional privacy slats"],
    cons: ["Minimal privacy by default", "Utilitarian appearance"],
    bestFor: "Pet containment, security, large perimeters", lifespan: "20+ years", priceTier: "$" },
  { key: "aluminum", name: "Aluminum / Ornamental", image: "/img/style-aluminum.jpg",
    description: "Powder-coated ornamental aluminum that delivers a wrought-iron look without the rust or maintenance.",
    pros: ["Elegant, high-end curb appeal", "Rust-proof and low maintenance", "Great for pools and slopes", "Long lifespan"],
    cons: ["No privacy", "Higher cost than chain-link"],
    bestFor: "Front yards, pools, decorative boundaries", lifespan: "30+ years", priceTier: "$$$" },
  { key: "composite", name: "Composite", image: "/img/style-composite.jpg",
    description: "Modern composite panels combining the look of wood with the durability and low upkeep of synthetics.",
    pros: ["Wood look, minimal maintenance", "Won't rot or splinter", "Strong privacy", "Premium modern aesthetic"],
    cons: ["Highest upfront cost", "Heavier — needs solid posts"],
    bestFor: "Premium privacy with a contemporary look", lifespan: "25–30+ years", priceTier: "$$$$" },
  { key: "splitrail", name: "Split-Rail", image: "/img/style-splitrail.jpg",
    description: "Rustic split-rail and ranch fencing that defines property lines and pasture without blocking the view.",
    pros: ["Open, rural aesthetic", "Affordable for long runs", "Quick to install", "Easy to add mesh for pets"],
    cons: ["No privacy or security", "Not for small yards"],
    bestFor: "Acreage, pastures, property lines", lifespan: "15–20 years", priceTier: "$$" },
];
```

`src/content/serviceAreas.js`, `testimonials.js`, `faqs.js`, `gallery.js`, `processSteps.js`, `valueProps.js` — **use the exact same content as defined in the approved spec/prior plan** (Task 6 of the original plan): `SERVICE_AREAS` (Greeley primary + Windsor, Evans, Loveland, Fort Collins, Johnstown, Severance, Eaton, Milliken, Ault, Timnath, Wellington with blurbs), `TESTIMONIALS` (5 entries, town, rating:5), `FAQ_GROUPS` (5 groups: Estimates & Pricing, Permits & Property, Materials & Styles, Timeline & Process, Warranty & Aftercare — ≥15 items total), `GALLERY` (12 items with image/caption/style/service), `PROCESS_STEPS` (4), `VALUE_PROPS` (6). Reproduce them verbatim:

```js
// serviceAreas.js
export const SERVICE_AREAS = [
  { name: "Greeley", primary: true, blurb: "Our home base — full fence installation, gates, and repair across all of Greeley." },
  { name: "Windsor", blurb: "Privacy, ranch, and pool fencing for Windsor's growing neighborhoods and acreage." },
  { name: "Evans", blurb: "Durable residential fencing built for Evans yards and Colorado weather." },
  { name: "Loveland", blurb: "Wood, vinyl, and ornamental aluminum fencing throughout Loveland." },
  { name: "Fort Collins", blurb: "Full-service fence installation and automatic gates across Fort Collins." },
  { name: "Johnstown", blurb: "New fences, deer fencing, and repairs for Johnstown homes and properties." },
  { name: "Severance", blurb: "Acreage, split-rail, and privacy fencing for Severance's larger lots." },
  { name: "Eaton", blurb: "Reliable fence installation and storm repair serving Eaton." },
  { name: "Milliken", blurb: "Residential and pasture fencing built to last in Milliken." },
  { name: "Ault", blurb: "Property-line, ranch, and privacy fencing across the Ault area." },
  { name: "Timnath", blurb: "Modern vinyl, composite, and aluminum fencing for Timnath." },
  { name: "Wellington", blurb: "Deer fencing, privacy fence, and repairs serving Wellington." },
];
```
```js
// testimonials.js
export const TESTIMONIALS = [
  { name: "Maria S.", town: "Greeley, CO", rating: 5, text: "Gefence replaced our whole backyard fence after a windstorm. Two days, spotless cleanup, and it's straighter than the original." },
  { name: "James R.", town: "Windsor, CO", rating: 5, text: "Got three quotes. Gefence wasn't the cheapest but the post work and gate are clearly a step above. Worth it." },
  { name: "Diane K.", town: "Loveland, CO", rating: 5, text: "They installed deer fencing around our garden and it actually works. You can barely see it from the deck." },
  { name: "Carlos M.", town: "Fort Collins, CO", rating: 5, text: "Automatic driveway gate install was clean and professional. Gary walked us through everything." },
  { name: "Beth A.", town: "Evans, CO", rating: 5, text: "Honest assessment on our fence — they repaired it instead of upselling a full replacement. Rare these days." },
];
```
```js
// faqs.js
export const FAQ_GROUPS = [
  { group: "Estimates & Pricing", items: [
    { q: "Are estimates really free?", a: "Yes — on-site estimates are 100% free with no obligation. We measure, talk options, and give you a written quote." },
    { q: "How is fence pricing determined?", a: "Mainly linear footage, material, height, number of gates, terrain, and old-fence removal. Your written quote spells it out." },
    { q: "Do you offer financing?", a: "We can discuss flexible payment options on larger projects — just ask during your estimate." },
    { q: "Do you require a deposit?", a: "A deposit secures materials and your spot on the schedule; the balance is due at completion after your walkthrough." } ] },
  { group: "Permits & Property", items: [
    { q: "Do you handle permits?", a: "Yes. We pull required permits and coordinate inspections where your jurisdiction requires them." },
    { q: "Do I need to mark utilities?", a: "We call in utility locates before digging — that's on us, and it's required." },
    { q: "What about property lines and HOAs?", a: "We build to the line you confirm. We recommend verifying your survey and any HOA style rules before we start." } ] },
  { group: "Materials & Styles", items: [
    { q: "Which fence lasts the longest?", a: "Vinyl, composite, and aluminum typically last 25–30+ years. Wood lasts 15–20 with stain/seal upkeep." },
    { q: "What's best for deer?", a: "A 7–8 ft poly-mesh or welded-wire deer fence. Standard-height fences won't reliably stop deer." },
    { q: "Can you match my existing fence?", a: "Usually — send a photo and we'll spec the closest durable match." },
    { q: "Do you do pool-code fences?", a: "Yes, with self-closing, self-latching gates that meet residential pool-barrier code." } ] },
  { group: "Timeline & Process", items: [
    { q: "How soon can you start?", a: "Scheduling depends on season and backlog — call early. Most residential installs run 1–3 days once started." },
    { q: "Will weather delay my project?", a: "Severe weather can push a day or two; we keep you informed and protect the work site." },
    { q: "Do you remove the old fence?", a: "Yes — removal and haul-off can be included in your quote." } ] },
  { group: "Warranty & Aftercare", items: [
    { q: "Is your work warrantied?", a: "Yes — workmanship is warrantied in writing, separate from manufacturer material warranties." },
    { q: "How do I maintain a wood fence?", a: "Re-stain or seal every 2–3 years and clear vegetation off the boards. We can handle restaining too." },
    { q: "What if a post leans later?", a: "Call us. If it's a workmanship issue under warranty, we'll make it right." } ] },
];
```
```js
// gallery.js
export const GALLERY = [
  { image: "/img/gallery-01.jpg", caption: "Cedar privacy fence — Greeley", style: "wood", service: "fence-installation" },
  { image: "/img/gallery-02.jpg", caption: "White vinyl privacy — Windsor", style: "vinyl", service: "fence-installation" },
  { image: "/img/gallery-03.jpg", caption: "Ornamental aluminum — Loveland", style: "aluminum", service: "fence-installation" },
  { image: "/img/gallery-04.jpg", caption: "Automatic swing gate — Fort Collins", style: "aluminum", service: "automatic-gate-installation" },
  { image: "/img/gallery-05.jpg", caption: "Garden deer fence — Wellington", style: "wood", service: "deer-fencing" },
  { image: "/img/gallery-06.jpg", caption: "Pool safety fence — Timnath", style: "aluminum", service: "pool-fencing" },
  { image: "/img/gallery-07.jpg", caption: "Split-rail pasture — Severance", style: "splitrail", service: "fence-installation" },
  { image: "/img/gallery-08.jpg", caption: "Chain-link dog run — Evans", style: "chainlink", service: "fence-installation" },
  { image: "/img/gallery-09.jpg", caption: "Composite privacy — Greeley", style: "composite", service: "fence-installation" },
  { image: "/img/gallery-10.jpg", caption: "Storm repair & restain — Eaton", style: "wood", service: "fence-repair", beforeAfter: true },
  { image: "/img/gallery-11.jpg", caption: "Slide gate install — Johnstown", style: "aluminum", service: "automatic-gate-installation" },
  { image: "/img/gallery-12.jpg", caption: "Vinyl + aluminum combo — Milliken", style: "vinyl", service: "fence-installation" },
];
```
```js
// processSteps.js
export const PROCESS_STEPS = [
  { step: "01", title: "Free Consultation", text: "Call or request online. We listen to what you need and when." },
  { step: "02", title: "On-Site Estimate", text: "We measure, discuss materials, and give you a clear written quote." },
  { step: "03", title: "Professional Install", text: "Licensed, insured crews set posts and build with quality materials." },
  { step: "04", title: "Walkthrough & Warranty", text: "Final walkthrough, full cleanup, and your warranty in writing." },
];
```
```js
// valueProps.js
export const VALUE_PROPS = [
  { icon: "shield", title: "Licensed & Insured", text: "Fully licensed and insured — certificates available on request." },
  { icon: "quote", title: "Free Written Estimates", text: "No-obligation on-site quotes with no vague ranges or surprises." },
  { icon: "award", title: "Workmanship Warranty", text: "Every install backed by a written workmanship warranty." },
  { icon: "pin", title: "Local Greeley Crews", text: "Northern Colorado based — we know the soil, frost line, and wind." },
  { icon: "hammer", title: "Contractor-Grade Materials", text: "We build with materials engineered to outlast Colorado weather." },
  { icon: "clock", title: "On-Time, Clean Job Sites", text: "We show up, communicate, and leave your property spotless." },
];
```
```js
// index.js  (replaces the Task 2 stub)
export { BUSINESS } from "./business.js";
export { SERVICES, getService } from "./services.js";
export { FENCE_STYLES } from "./fenceStyles.js";
export { SERVICE_AREAS } from "./serviceAreas.js";
export { TESTIMONIALS } from "./testimonials.js";
export { FAQ_GROUPS } from "./faqs.js";
export { GALLERY } from "./gallery.js";
export { PROCESS_STEPS } from "./processSteps.js";
export { VALUE_PROPS } from "./valueProps.js";
```

- [ ] **Step 4: Run** — `npm test` → all content suites PASS. `npm run build` → success.
- [ ] **Step 5: Commit** — `git add src/content && git commit -m "feat: fence styles + supporting content modules"`

---

## Phase 2 — Shared Components

### Task 7: JsonLd + SafeImage

**Files:** Create `src/components/JsonLd.jsx`, `src/components/SafeImage.jsx`, `src/components/__tests__/JsonLd.test.jsx`

- [ ] **Step 1: Failing test** — `src/components/__tests__/JsonLd.test.jsx`

```jsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import JsonLd from "@/components/JsonLd.jsx";

describe("JsonLd", () => {
  it("emits LocalBusiness schema", () => {
    const { container } = render(<JsonLd />);
    const s = container.querySelector('script[type="application/ld+json"]');
    expect(s).toBeTruthy();
    const data = JSON.parse(s.textContent);
    expect(data["@type"]).toBe("LocalBusiness");
    expect(data.name).toBe("Gefence LLC");
    expect(data.telephone).toBe("(845) 551-1446");
  });
});
```

- [ ] **Step 2: Run** → FAIL.
- [ ] **Step 3: Create `src/components/JsonLd.jsx`** (Server Component — no "use client")

```jsx
import { BUSINESS, SERVICE_AREAS, SERVICES } from "@/content/index.js";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    telephone: BUSINESS.phoneDisplay,
    email: BUSINESS.email,
    areaServed: SERVICE_AREAS.map((a) => a.name),
    address: { "@type": "PostalAddress", addressLocality: BUSINESS.city, addressRegion: BUSINESS.state, addressCountry: "US" },
    description: "Fence installation, automatic gates, deer & pool fencing, and repair across Greeley & Northern Colorado.",
    makesOffer: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
```

- [ ] **Step 4: Create `src/components/SafeImage.jsx`** (client — graceful fallback before assets exist)

```jsx
"use client";
import { useState } from "react";
import Image from "next/image";

export default function SafeImage({ src, alt, fill, width, height, className = "", sizes, priority }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div aria-label={alt} className={`bg-gradient-to-br from-brand-panel to-brand-dark ${className}`} style={fill ? undefined : { width, height }} />;
  }
  return (
    <Image src={src} alt={alt} fill={fill} width={fill ? undefined : width} height={fill ? undefined : height}
      sizes={sizes} priority={priority} className={className} onError={() => setFailed(true)} />
  );
}
```

- [ ] **Step 5: Run** — `npm test src/components/__tests__/JsonLd.test.jsx` → PASS.
- [ ] **Step 6: Commit** — `git add src/components/JsonLd.jsx src/components/SafeImage.jsx src/components/__tests__/JsonLd.test.jsx && git commit -m "feat: JsonLd schema + SafeImage wrapper"`

### Task 8: PageHero, SectionHeading, Breadcrumb, CTABand

**Files:** Create `src/components/{SectionHeading,Breadcrumb,PageHero,CTABand}.jsx`

- [ ] **Step 1: `SectionHeading.jsx`** (Server Component)

```jsx
export default function SectionHeading({ chip, title, accent, subtitle, center = true }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}>
      {chip && <span className="chip mb-4">{chip}</span>}
      <h2 className="heading-display text-4xl sm:text-5xl text-white">
        {title} {accent && <span className="bg-gradient-to-r from-brand-orange to-brand-blue bg-clip-text text-transparent">{accent}</span>}
      </h2>
      {subtitle && <p className="mt-4 text-white/70">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 2: `Breadcrumb.jsx`** (Server Component, `next/link`)

```jsx
import Link from "next/link";
export default function Breadcrumb({ trail }) {
  return (
    <nav className="text-sm text-white/50 mb-4" aria-label="Breadcrumb">
      {trail.map((t, i) => (
        <span key={i}>
          {t.to ? <Link href={t.to} className="hover:text-white">{t.label}</Link> : <span className="text-white/80">{t.label}</span>}
          {i < trail.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 3: `PageHero.jsx`** (Server Component; uses SafeImage)

```jsx
import Breadcrumb from "./Breadcrumb.jsx";
import SafeImage from "./SafeImage.jsx";

export default function PageHero({ chip, title, accent, intro, image, trail }) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        {image && <SafeImage src={image} alt="" fill className="object-cover opacity-20" sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/90 to-brand-dark" />
        <div className="absolute inset-0 bg-grid-pattern [background-size:60px_60px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>
      <div className="container-x relative">
        {trail && <Breadcrumb trail={trail} />}
        {chip && <span className="chip mb-4">{chip}</span>}
        <h1 className="heading-display text-5xl sm:text-6xl lg:text-7xl text-white">
          {title} {accent && <span className="bg-gradient-to-r from-brand-orange to-brand-green bg-clip-text text-transparent">{accent}</span>}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/70">{intro}</p>}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: `CTABand.jsx`** (Server Component)

```jsx
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { BUSINESS } from "@/content/index.js";

export default function CTABand({ heading = "Ready for a fence that lasts?", sub = "Free on-site estimates across Greeley & Northern Colorado." }) {
  return (
    <section className="relative py-16">
      <div className="container-x">
        <div className="relative rounded-3xl overflow-hidden border border-brand-orange/40 bg-gradient-to-br from-brand-orange/10 via-brand-panel to-brand-dark p-8 sm:p-12 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl text-white">{heading}</h2>
          <p className="mt-3 text-white/70 max-w-xl mx-auto">{sub}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary">Get a Free Estimate</Link>
            <a href={BUSINESS.phoneHref} className="btn-outline"><FaPhoneAlt /> Call {BUSINESS.phoneDisplay}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Build** → success.
- [ ] **Step 6: Commit** — `git add src/components/SectionHeading.jsx src/components/Breadcrumb.jsx src/components/PageHero.jsx src/components/CTABand.jsx && git commit -m "feat: shared layout components"`

### Task 9: Navbar + PhoneBadge (client)

**Files:** Create `src/components/Navbar.jsx`, `src/components/PhoneBadge.jsx`, `src/components/__tests__/Navbar.test.jsx`

- [ ] **Step 1: Port `PhoneBadge.jsx`** — read the existing Vite `src/components/PhoneBadge.jsx`, recreate it at `src/components/PhoneBadge.jsx` with `"use client";` at the top, replacing any `react-router` import with nothing (it only needs `BUSINESS`); swap phone constants to `BUSINESS.phoneHref`/`BUSINESS.phoneDisplay` from `@/content/index.js`. Keep all classes/markup/variants (`floating`).

- [ ] **Step 2: Failing test** — `src/components/__tests__/Navbar.test.jsx`

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar.jsx";

describe("Navbar", () => {
  it("shows Gefence brand and key links", () => {
    render(<Navbar />);
    expect(screen.getByText(/GEFENCE/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /fence styles/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /service areas/i })).toBeInTheDocument();
  });
});
```
(Next's `next/link` and `next/navigation` work under Vitest/jsdom for render; if `usePathname` is used, guard with optional chaining so it's null-safe in tests.)

- [ ] **Step 3: Run** → FAIL.
- [ ] **Step 4: Create `src/components/Navbar.jsx`**

```jsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BUSINESS } from "@/content/index.js";
import PhoneBadge from "./PhoneBadge.jsx";

const LINKS = [
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/fence-styles", label: "Fence Styles" },
  { to: "/gallery", label: "Gallery" },
  { to: "/service-areas", label: "Service Areas" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname?.() || "";
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled ? "bg-brand-dark/85 backdrop-blur-xl border-b border-white/10 py-2" : "bg-transparent py-4"}`}>
      <div className="container-x flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt={BUSINESS.name} className="h-11 sm:h-12 w-auto drop-shadow-[0_4px_18px_rgba(249,115,22,0.45)]" onError={(e) => { e.currentTarget.style.display = "none"; }} />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg tracking-wide text-white">GEFENCE</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-orange">LLC · Greeley CO</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.to;
            return (
              <Link key={l.to} href={l.to} className={`relative px-4 py-2 text-sm font-semibold transition-colors ${active ? "text-white" : "text-white/80 hover:text-white"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex"><PhoneBadge /></div>
        <button onClick={() => setOpen((o) => !o)} className="lg:hidden text-white p-2" aria-label="Menu">
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-brand-dark/95 backdrop-blur-xl border-t border-white/10">
            <div className="container-x py-6 flex flex-col gap-2">
              {LINKS.map((l) => (
                <Link key={l.to} href={l.to} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-white font-semibold hover:bg-white/5">{l.label}</Link>
              ))}
              <div className="pt-3"><PhoneBadge /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
```

- [ ] **Step 5: Run** → PASS. `npm run build` → success.
- [ ] **Step 6: Commit** — `git add src/components/Navbar.jsx src/components/PhoneBadge.jsx src/components/__tests__/Navbar.test.jsx && git commit -m "feat: Next navbar + phone badge (client)"`

### Task 10: Footer + wire layout shell

**Files:** Create `src/components/Footer.jsx`; Modify `src/app/layout.jsx`

- [ ] **Step 1: Create `src/components/Footer.jsx`** (Server Component, `next/link`)

```jsx
import Link from "next/link";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram } from "react-icons/fa";
import { BUSINESS, SERVICES, SERVICE_AREAS } from "@/content/index.js";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-brand-dark pt-16 pb-8">
      <div className="container-x grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl text-white">GEFENCE <span className="text-brand-orange">LLC</span></div>
          <p className="mt-3 text-sm text-white/60">{BUSINESS.tagline} {BUSINESS.addressNote}.</p>
          <p className="mt-3 text-xs text-white/40">{BUSINESS.licenseNote}</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Services</h4>
          <ul className="space-y-2 text-sm text-white/60">
            {SERVICES.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-brand-orange">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-brand-orange">About</Link></li>
            <li><Link href="/fence-styles" className="hover:text-brand-orange">Fence Styles</Link></li>
            <li><Link href="/gallery" className="hover:text-brand-orange">Gallery</Link></li>
            <li><Link href="/service-areas" className="hover:text-brand-orange">Service Areas</Link></li>
            <li><Link href="/faq" className="hover:text-brand-orange">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-brand-orange">Free Estimate</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/60">
            <li><a href={BUSINESS.phoneHref} className="flex items-center gap-2 hover:text-brand-orange"><FaPhoneAlt /> {BUSINESS.phoneDisplay}</a></li>
            <li><a href={BUSINESS.emailHref} className="flex items-center gap-2 hover:text-brand-orange"><FaEnvelope /> {BUSINESS.email}</a></li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> {BUSINESS.city}, {BUSINESS.state}</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href={BUSINESS.social.facebook} aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white/70 hover:text-brand-orange"><FaFacebookF /></a>
            <a href={BUSINESS.social.instagram} aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center text-white/70 hover:text-brand-orange"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <div className="container-x mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/40">
        <span>© {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.</span>
        <span>{SERVICE_AREAS.slice(0, 6).map((a) => a.name).join(" · ")} & more</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Wire shell into `src/app/layout.jsx`** — import `Navbar`, `Footer`, `JsonLd`, `PhoneBadge`; render inside `<body>`:

```jsx
<body>
  <JsonLd />
  <Navbar />
  {children}
  <Footer />
  <PhoneBadge variant="floating" />
</body>
```
Add the imports at top: `import Navbar from "@/components/Navbar.jsx";` etc.

- [ ] **Step 3: Build** → success.
- [ ] **Step 4: Commit** — `git add src/components/Footer.jsx src/app/layout.jsx && git commit -m "feat: footer + global layout shell"`

### Task 11: ContactForm (client)

**Files:** Create `src/components/ContactForm.jsx`

- [ ] **Step 1: Create `src/components/ContactForm.jsx`**

```jsx
"use client";
import { useState } from "react";
import { FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import { BUSINESS, SERVICES } from "@/content/index.js";

export default function ContactForm({ compact = false }) {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };
  const input = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-brand-orange focus:outline-none";
  return (
    <section id="contact-form" className="relative py-16">
      <div className="container-x">
        <div className={`grid gap-10 ${compact ? "" : "lg:grid-cols-2"}`}>
          {!compact && (
            <div>
              <span className="chip mb-4">Get a Free Estimate</span>
              <h2 className="heading-display text-4xl sm:text-5xl text-white">Tell us about <span className="bg-gradient-to-r from-brand-orange to-brand-blue bg-clip-text text-transparent">your project</span></h2>
              <p className="mt-4 text-white/70">Free, no-obligation on-site estimates across Greeley & Northern Colorado. Fastest response is a call.</p>
              <a href={BUSINESS.phoneHref} className="btn-primary mt-6"><FaPhoneAlt /> Call {BUSINESS.phoneDisplay}</a>
            </div>
          )}
          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-brand-panel to-brand-dark p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-10">
                <FaCheckCircle className="text-brand-green text-5xl mx-auto mb-4" />
                <h3 className="heading-display text-2xl text-white">Thanks — we'll be in touch.</h3>
                <p className="text-white/60 mt-2">For the fastest response, call {BUSINESS.phoneDisplay}.</p>
              </div>
            ) : (
              <form className="space-y-3" onSubmit={submit}>
                <input className={input} placeholder="Your name" required value={f.name} onChange={set("name")} />
                <input className={input} placeholder="Phone" type="tel" required value={f.phone} onChange={set("phone")} />
                <input className={input} placeholder="Email" type="email" value={f.email} onChange={set("email")} />
                <select className={input} required value={f.service} onChange={set("service")}>
                  <option value="">Service needed…</option>
                  {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                </select>
                <textarea className={input} rows={4} placeholder="Project details (footage, style, location)" value={f.message} onChange={set("message")} />
                <button type="submit" className="btn-primary w-full">Request My Free Estimate</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build** → success.
- [ ] **Step 3: Commit** — `git add src/components/ContactForm.jsx && git commit -m "feat: contact form (client)"`

### Task 12: Port home-section + utility components

**Files:** Create `src/components/{Hero,ServicesGrid,About,Process,GalleryPreview,Testimonials,FaqPreview,StatsStrip,ParallaxQuote,ScrollProgress,Reveal}.jsx`

- [ ] **Step 1:** For each existing Vite component (`src/components/Hero.jsx`, `Services.jsx`, `About.jsx`, `Process.jsx`, `Gallery.jsx`, `Testimonials.jsx`, `FAQ.jsx`, `Marquee.jsx`, `ParallaxQuote.jsx`, `ScrollProgress.jsx`, `Reveal.jsx`): **read it**, then create the Next version under the new name above with these rules:
  - Add `"use client";` at the very top (all use framer-motion/hooks).
  - Replace any `react-router-dom` import with `next/link` (`<Link to=>` → `<Link href=>`).
  - Replace `../data.js` imports with `@/content/index.js` (`SERVICES`, `TESTIMONIALS`, `GALLERY`, `PROCESS_STEPS`, etc.); `FaqPreview` uses `FAQ_GROUPS.flatMap(g => g.items).slice(0,5)`; `StatsStrip` (from `Marquee.jsx`) shows static trust stats — `["500+ Projects","12+ Years","Licensed & Insured","5-Star Rated","Serving Greeley & NoCo"]`.
  - Swap phone/business constants to `BUSINESS`.
  - Replace `<img>` heroes/backgrounds with `SafeImage` where practical (Hero bg, gallery thumbs); keep all Tailwind classes and animations.
  - **Hero copy:** headline `DAMAGE CONTAINED / FENCES THAT LAST`, subhead `Greeley's fence installation specialists — wood, vinyl, aluminum, gates, deer & pool fencing. Built for Colorado weather. Honest written quotes.`, primary CTA `<Link href="/contact">Get a Free Estimate</Link>` + call button, trust line `Trusted across Greeley & Northern Colorado`, floating chips `🚪 Auto Gates / 🦌 Deer Fence / 🏊 Pool Fence`, bg `"/img/hero.jpg"`.
  - `ServicesGrid` cards map `SERVICES` → `<Link href={`/services/${s.slug}`}>` showing `title` + `summary`.

- [ ] **Step 2: Build** → success (components compile even if not yet mounted).
- [ ] **Step 3: Commit** — `git add src/components && git commit -m "feat: port home-section components to Next (client)"`

---

## Phase 3 — Routes (App Router)

> Each `page.jsx` is a Server Component exporting `metadata`, composing `PageHero`/sections/`CTABand`. After each route: `npm run build` must pass (it pre-renders the route). No per-route Navbar/Footer (they're in the layout).

### Task 13: Home route

**Files:** Rewrite `src/app/page.jsx`

- [ ] **Step 1: Write `src/app/page.jsx`**

```jsx
import Hero from "@/components/Hero.jsx";
import StatsStrip from "@/components/StatsStrip.jsx";
import ServicesGrid from "@/components/ServicesGrid.jsx";
import About from "@/components/About.jsx";
import ParallaxQuote from "@/components/ParallaxQuote.jsx";
import Process from "@/components/Process.jsx";
import GalleryPreview from "@/components/GalleryPreview.jsx";
import Testimonials from "@/components/Testimonials.jsx";
import FaqPreview from "@/components/FaqPreview.jsx";
import ContactForm from "@/components/ContactForm.jsx";
import CTABand from "@/components/CTABand.jsx";
import ScrollProgress from "@/components/ScrollProgress.jsx";

export const metadata = {
  title: "Fence Installation in Greeley, CO",
  description: "Gefence LLC installs wood, vinyl, aluminum, deer, and pool fencing plus automatic gates across Greeley & Northern Colorado. Free estimates.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <StatsStrip />
        <ServicesGrid />
        <About />
        <ParallaxQuote />
        <Process />
        <GalleryPreview />
        <Testimonials />
        <FaqPreview />
        <ContactForm />
        <CTABand />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Build** → success; `/` static.
- [ ] **Step 3: Commit** — `git add src/app/page.jsx && git commit -m "feat: Home route"`

### Task 14: About route

**Files:** Create `src/app/about/page.jsx`

- [ ] **Step 1: Write `src/app/about/page.jsx`**

```jsx
import PageHero from "@/components/PageHero.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import SafeImage from "@/components/SafeImage.jsx";
import CTABand from "@/components/CTABand.jsx";
import ContactForm from "@/components/ContactForm.jsx";
import { BUSINESS, VALUE_PROPS } from "@/content/index.js";

export const metadata = {
  title: "About Us",
  description: "Gefence LLC is a Greeley, Colorado fence installation company owned by Gary — licensed, insured, and built on honest work across Northern Colorado.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main>
      <PageHero chip="About Gefence LLC" title="Built on" accent="honest work" intro="Gefence LLC is a locally owned fence company serving Greeley and Northern Colorado." trail={[{ label: "Home", to: "/" }, { label: "About" }]} image="/img/about-crew.jpg" />
      <section className="py-12"><div className="container-x grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <SectionHeading center={false} chip="Our Story" title="Local owners," accent="local accountability" />
          <p className="text-white/70">Gefence LLC was built around a simple idea: a fence should be set right the first time and stand up to everything Colorado throws at it. Owner {BUSINESS.owner} runs every job personally — you talk to the person responsible for the work, not a call center.</p>
          <p className="text-white/70 mt-4">We install for homeowners and light-commercial properties across Greeley, Windsor, Loveland, Fort Collins, and the surrounding towns. Posts go in concrete below the frost line, gates are squared and hung to last, and the site is left clean.</p>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-white/10 h-72">
          <SafeImage src="/img/about-crew.jpg" alt="Gefence LLC crew on a Northern Colorado job site" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        </div>
      </div></section>
      <section className="py-12"><div className="container-x">
        <SectionHeading chip="Why Gefence" title="What you get with" accent="every project" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUE_PROPS.map((v) => (
            <div key={v.title} className="rounded-2xl border border-white/10 bg-brand-panel/60 p-6">
              <h3 className="text-white font-bold">{v.title}</h3>
              <p className="text-white/60 text-sm mt-2">{v.text}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-white/40 text-xs mt-8">{BUSINESS.licenseNote}.</p>
      </div></section>
      <ContactForm />
      <CTABand />
    </main>
  );
}
```

- [ ] **Step 2: Build** → success.
- [ ] **Step 3: Commit** — `git add src/app/about/page.jsx && git commit -m "feat: About route"`

### Task 15: Services overview route

**Files:** Create `src/app/services/page.jsx`

- [ ] **Step 1: Write `src/app/services/page.jsx`**

```jsx
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import PageHero from "@/components/PageHero.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import SafeImage from "@/components/SafeImage.jsx";
import CTABand from "@/components/CTABand.jsx";
import { SERVICES, PROCESS_STEPS } from "@/content/index.js";

export const metadata = {
  title: "Fence Services",
  description: "Fence installation, automatic gates, deer fencing, pool fencing, and fence repair across Greeley & Northern Colorado by Gefence LLC.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <main>
      <PageHero chip="Our Services" title="Fencing done" accent="right" intro="Five focused services — every one backed by a written estimate and workmanship warranty." trail={[{ label: "Home", to: "/" }, { label: "Services" }]} />
      <section className="py-12"><div className="container-x grid md:grid-cols-2 gap-6">
        {SERVICES.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="group rounded-3xl border border-white/10 bg-brand-panel/60 overflow-hidden hover:border-brand-orange/50 transition">
            <div className="relative h-44"><SafeImage src={s.image} alt={s.title} fill className="object-cover opacity-80 group-hover:scale-105 transition" sizes="(max-width:768px) 100vw, 50vw" /></div>
            <div className="p-6">
              <h3 className="heading-display text-2xl text-white">{s.title}</h3>
              <p className="text-white/60 text-sm mt-2">{s.summary}</p>
              <span className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold mt-4">Learn more <FaArrowRight /></span>
            </div>
          </Link>
        ))}
      </div></section>
      <section className="py-12"><div className="container-x">
        <SectionHeading chip="How It Works" title="A simple," accent="four-step process" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((p) => (
            <div key={p.step} className="rounded-2xl border border-white/10 bg-brand-panel/60 p-6">
              <div className="heading-display text-4xl text-brand-orange">{p.step}</div>
              <h3 className="text-white font-bold mt-2">{p.title}</h3>
              <p className="text-white/60 text-sm mt-1">{p.text}</p>
            </div>
          ))}
        </div>
      </div></section>
      <CTABand />
    </main>
  );
}
```

- [ ] **Step 2: Build** → success.
- [ ] **Step 3: Commit** — `git add src/app/services/page.jsx && git commit -m "feat: Services overview route"`

### Task 16: Service detail dynamic route

**Files:** Create `src/app/services/[slug]/page.jsx`, `src/components/__tests__/serviceData.test.js`

- [ ] **Step 1: Failing test** (data-resolution invariant the route depends on) — `src/components/__tests__/serviceData.test.js`

```js
import { describe, it, expect } from "vitest";
import { getService, SERVICES } from "@/content/index.js";
describe("service detail data", () => {
  it("every slug resolves and bad slug is undefined", () => {
    SERVICES.forEach(s => expect(getService(s.slug).title).toBe(s.title));
    expect(getService("missing")).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run** → PASS already (content exists) — this guards the contract `generateStaticParams`/`generateMetadata`/`notFound()` rely on.
- [ ] **Step 3: Write `src/app/services/[slug]/page.jsx`**

```jsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCheck, FaPhoneAlt } from "react-icons/fa";
import PageHero from "@/components/PageHero.jsx";
import CTABand from "@/components/CTABand.jsx";
import { getService, SERVICES, BUSINESS } from "@/content/index.js";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getService(params.slug);
  if (!s) return { title: "Service Not Found" };
  return { title: s.title, description: s.summary, alternates: { canonical: `/services/${s.slug}` } };
}

export default function ServiceDetail({ params }) {
  const s = getService(params.slug);
  if (!s) notFound();
  const related = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <main>
      <PageHero chip="Service" title={s.title} intro={s.summary} image={s.image}
        trail={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: s.title }]} />
      <section className="py-12"><div className="container-x grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div><h2 className="heading-display text-3xl text-white mb-3">Overview</h2><p className="text-white/70">{s.overview}</p></div>
          <div>
            <h2 className="heading-display text-3xl text-white mb-3">What's Included</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {s.included.map((i) => <li key={i} className="flex items-start gap-2 text-white/80 text-sm"><FaCheck className="text-brand-green mt-0.5 shrink-0" /> {i}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="heading-display text-3xl text-white mb-3">Our Process</h2>
            <ol className="space-y-3">
              {s.process.map((p, i) => <li key={i} className="flex gap-3 text-white/70 text-sm"><span className="heading-display text-brand-orange">{String(i + 1).padStart(2, "0")}</span> {p}</li>)}
            </ol>
          </div>
          <div>
            <h2 className="heading-display text-3xl text-white mb-3">Common Questions</h2>
            {s.faqs.map((f) => <div key={f.q} className="border-b border-white/10 py-3"><p className="text-white font-semibold">{f.q}</p><p className="text-white/60 text-sm mt-1">{f.a}</p></div>)}
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-brand-orange/40 bg-brand-panel/70 p-6">
            <h3 className="text-white font-bold">What affects price</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">{s.pricingFactors.map((p) => <li key={p}>• {p}</li>)}</ul>
            <Link href="/contact" className="btn-primary w-full mt-5">Get a Free Estimate</Link>
            <a href={BUSINESS.phoneHref} className="btn-outline w-full mt-3"><FaPhoneAlt /> {BUSINESS.phoneDisplay}</a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-brand-panel/60 p-6">
            <h3 className="text-white font-bold mb-3">Related Services</h3>
            <ul className="space-y-2 text-sm">
              {related.map((r) => <li key={r.slug}><Link href={`/services/${r.slug}`} className="text-brand-orange hover:underline">{r.title}</Link></li>)}
            </ul>
          </div>
        </aside>
      </div></section>
      <CTABand />
    </main>
  );
}
```

- [ ] **Step 4: Build** → success; 5 service pages pre-rendered (check build output lists `/services/[slug]` × 5).
- [ ] **Step 5: Commit** — `git add "src/app/services/[slug]/page.jsx" src/components/__tests__/serviceData.test.js && git commit -m "feat: dynamic service detail route (SSG)"`

### Task 17: Fence Styles route

**Files:** Create `src/app/fence-styles/page.jsx`

- [ ] **Step 1: Write `src/app/fence-styles/page.jsx`** — `metadata` (title "Fence Styles & Materials", description from spec, canonical `/fence-styles`); body identical structure to the approved Fence Styles layout: `PageHero`, per-style alternating cards using `SafeImage` (`relative h-56` wrapper, `fill`), pros/cons, `bestFor`/`lifespan`/`priceTier`, then a comparison `<table>` over `FENCE_STYLES`, then `<CTABand heading="Not sure which style fits?" sub="Tell us your goals and budget — we'll recommend the right fence." />`. Import `FENCE_STYLES` from `@/content/index.js`.

```jsx
import PageHero from "@/components/PageHero.jsx";
import SectionHeading from "@/components/SectionHeading.jsx";
import SafeImage from "@/components/SafeImage.jsx";
import CTABand from "@/components/CTABand.jsx";
import { FENCE_STYLES } from "@/content/index.js";

export const metadata = {
  title: "Fence Styles & Materials",
  description: "Compare wood, vinyl, chain-link, aluminum, composite, and split-rail fencing — pros, cons, lifespan, and cost — from Gefence LLC in Greeley, CO.",
  alternates: { canonical: "/fence-styles" },
};

export default function FenceStyles() {
  return (
    <main>
      <PageHero chip="Fence Styles" title="Find the right" accent="fence for your property" intro="Six proven materials, compared honestly — so you choose with eyes open." trail={[{ label: "Home", to: "/" }, { label: "Fence Styles" }]} />
      <section className="py-12"><div className="container-x space-y-8">
        {FENCE_STYLES.map((st, i) => (
          <div key={st.key} className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl border border-white/10 bg-brand-panel/50 p-6">
            <div className={`relative h-56 rounded-2xl overflow-hidden ${i % 2 ? "lg:order-2" : ""}`}>
              <SafeImage src={st.image} alt={`${st.name} fence`} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
            <div>
              <div className="flex items-center gap-3"><h2 className="heading-display text-3xl text-white">{st.name}</h2><span className="chip">{st.priceTier}</span></div>
              <p className="text-white/70 mt-2">{st.description}</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
                <div><p className="text-brand-green font-bold mb-1">Pros</p><ul className="text-white/70 space-y-1">{st.pros.map((p) => <li key={p}>+ {p}</li>)}</ul></div>
                <div><p className="text-brand-orange font-bold mb-1">Cons</p><ul className="text-white/70 space-y-1">{st.cons.map((c) => <li key={c}>– {c}</li>)}</ul></div>
              </div>
              <p className="text-white/50 text-xs mt-4">Best for: {st.bestFor} · Lifespan: {st.lifespan}</p>
            </div>
          </div>
        ))}
      </div></section>
      <section className="py-12"><div className="container-x">
        <SectionHeading chip="Quick Compare" title="Style" accent="comparison" />
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white"><tr><th className="p-3">Style</th><th className="p-3">Best For</th><th className="p-3">Lifespan</th><th className="p-3">Cost</th></tr></thead>
            <tbody>
              {FENCE_STYLES.map((s) => <tr key={s.key} className="border-t border-white/10 text-white/70"><td className="p-3 text-white">{s.name}</td><td className="p-3">{s.bestFor}</td><td className="p-3">{s.lifespan}</td><td className="p-3">{s.priceTier}</td></tr>)}
            </tbody>
          </table>
        </div>
      </div></section>
      <CTABand heading="Not sure which style fits?" sub="Tell us your goals and budget — we'll recommend the right fence." />
    </main>
  );
}
```

- [ ] **Step 2: Build** → success.
- [ ] **Step 3: Commit** — `git add src/app/fence-styles/page.jsx && git commit -m "feat: Fence Styles route"`

### Task 18: Gallery route (client filter/lightbox)

**Files:** Create `src/app/gallery/page.jsx`, `src/components/GalleryClient.jsx`

- [ ] **Step 1: Create `src/components/GalleryClient.jsx`** (`"use client"`) — filter buttons over `FENCE_STYLES`, grid of `SafeImage` thumbs, framer-motion lightbox modal. Props: none (reads `GALLERY`, `FENCE_STYLES` from content). Mirrors the approved Gallery interactive behavior:

```jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import SafeImage from "./SafeImage.jsx";
import { GALLERY, FENCE_STYLES } from "@/content/index.js";

export default function GalleryClient() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const items = filter === "all" ? GALLERY : GALLERY.filter((g) => g.style === filter);
  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button onClick={() => setFilter("all")} className={`chip ${filter === "all" ? "border-brand-orange text-white" : ""}`}>All</button>
        {FENCE_STYLES.map((s) => <button key={s.key} onClick={() => setFilter(s.key)} className={`chip ${filter === s.key ? "border-brand-orange text-white" : ""}`}>{s.name}</button>)}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((g) => (
          <button key={g.image} onClick={() => setActive(g)} className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3]">
            <SafeImage src={g.image} alt={g.caption} fill className="object-cover group-hover:scale-105 transition" sizes="(max-width:1024px) 50vw, 33vw" />
            <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-white text-sm">{g.caption}{g.beforeAfter ? " · before/after" : ""}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} className="fixed inset-0 z-[80] bg-black/85 flex items-center justify-center p-4">
            <button className="absolute top-5 right-5 text-white/70" aria-label="Close"><FaTimes size={24} /></button>
            <div className="relative w-[90vw] h-[80vh]"><SafeImage src={active.image} alt={active.caption} fill className="object-contain" sizes="90vw" /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Create `src/app/gallery/page.jsx`** (Server Component)

```jsx
import PageHero from "@/components/PageHero.jsx";
import CTABand from "@/components/CTABand.jsx";
import GalleryClient from "@/components/GalleryClient.jsx";

export const metadata = {
  title: "Project Gallery",
  description: "See completed fence, gate, deer, and pool fencing projects by Gefence LLC across Greeley & Northern Colorado.",
  alternates: { canonical: "/gallery" },
};

export default function Gallery() {
  return (
    <main>
      <PageHero chip="Our Work" title="Recent" accent="projects" intro="Real fences and gates installed across Northern Colorado." trail={[{ label: "Home", to: "/" }, { label: "Gallery" }]} />
      <section className="py-10"><div className="container-x"><GalleryClient /></div></section>
      <CTABand heading="Want this at your place?" sub="Free estimates across Greeley & Northern Colorado." />
    </main>
  );
}
```

- [ ] **Step 3: Build** → success.
- [ ] **Step 4: Commit** — `git add src/app/gallery/page.jsx src/components/GalleryClient.jsx && git commit -m "feat: Gallery route with client filter/lightbox"`

### Task 19: Service Areas route

**Files:** Create `src/app/service-areas/page.jsx`

- [ ] **Step 1: Write `src/app/service-areas/page.jsx`**

```jsx
import { FaMapMarkerAlt } from "react-icons/fa";
import PageHero from "@/components/PageHero.jsx";
import CTABand from "@/components/CTABand.jsx";
import { SERVICE_AREAS, BUSINESS } from "@/content/index.js";

export const metadata = {
  title: "Service Areas",
  description: "Gefence LLC installs and repairs fences across Greeley, Windsor, Loveland, Fort Collins, and Northern Colorado.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreas() {
  return (
    <main>
      <PageHero chip="Where We Work" title="Serving" accent="Northern Colorado" intro={`Based in ${BUSINESS.city}, covering the surrounding towns below.`} trail={[{ label: "Home", to: "/" }, { label: "Service Areas" }]} image="/img/areas-map.jpg" />
      <section className="py-12"><div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICE_AREAS.map((a) => (
          <div key={a.name} className={`rounded-2xl border p-6 ${a.primary ? "border-brand-orange/50 bg-brand-orange/10" : "border-white/10 bg-brand-panel/60"}`}>
            <h3 className="text-white font-bold flex items-center gap-2"><FaMapMarkerAlt className="text-brand-orange" /> {a.name}{a.primary && <span className="chip ml-1">HQ</span>}</h3>
            <p className="text-white/60 text-sm mt-2">{a.blurb}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-white/50 mt-10">Don't see your town? <a href={BUSINESS.phoneHref} className="text-brand-orange">Call {BUSINESS.phoneDisplay}</a> — we likely cover it.</p>
      </section>
      <CTABand />
    </main>
  );
}
```

- [ ] **Step 2: Build** → success.
- [ ] **Step 3: Commit** — `git add src/app/service-areas/page.jsx && git commit -m "feat: Service Areas route"`

### Task 20: Contact route

**Files:** Create `src/app/contact/page.jsx`

- [ ] **Step 1: Write `src/app/contact/page.jsx`**

```jsx
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import PageHero from "@/components/PageHero.jsx";
import ContactForm from "@/components/ContactForm.jsx";
import { BUSINESS } from "@/content/index.js";

export const metadata = {
  title: "Contact & Free Estimate",
  description: "Request a free fence estimate from Gefence LLC in Greeley, CO. Call (845) 551-1446 or send your project details.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const cards = [
    { i: <FaPhoneAlt />, l: "Call", v: BUSINESS.phoneDisplay, href: BUSINESS.phoneHref },
    { i: <FaEnvelope />, l: "Email", v: BUSINESS.email, href: BUSINESS.emailHref },
    { i: <FaMapMarkerAlt />, l: "Area", v: `${BUSINESS.city}, ${BUSINESS.state}` },
    { i: <FaClock />, l: "Hours", v: BUSINESS.hours[0].h },
  ];
  return (
    <main>
      <PageHero chip="Get In Touch" title="Request your" accent="free estimate" intro="Tell us about your project — the fastest response is a phone call." trail={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <section className="py-8"><div className="container-x grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.l} className="rounded-2xl border border-white/10 bg-brand-panel/60 p-5 text-center">
            <div className="text-brand-orange text-xl mx-auto mb-2 w-8 h-8 grid place-items-center">{c.i}</div>
            <div className="text-white/40 text-xs uppercase tracking-widest">{c.l}</div>
            {c.href ? <a href={c.href} className="text-white font-semibold hover:text-brand-orange">{c.v}</a> : <div className="text-white font-semibold">{c.v}</div>}
          </div>
        ))}
      </div></section>
      <ContactForm />
      <section className="pb-16"><div className="container-x rounded-2xl border border-white/10 overflow-hidden h-72 bg-brand-panel/60 grid place-items-center text-white/40">
        Map embed placeholder — add Google Maps once client provides address/API key.
      </div></section>
    </main>
  );
}
```

- [ ] **Step 2: Build** → success.
- [ ] **Step 3: Commit** — `git add src/app/contact/page.jsx && git commit -m "feat: Contact route"`

### Task 21: FAQ route + not-found

**Files:** Create `src/app/faq/page.jsx`, `src/components/FaqAccordion.jsx`, `src/app/not-found.jsx`

- [ ] **Step 1: Create `src/components/FaqAccordion.jsx`** (`"use client"`)

```jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { FAQ_GROUPS } from "@/content/index.js";

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl bg-brand-panel/50">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between gap-4 p-4 text-left">
        <span className="text-white font-semibold">{q}</span>
        <FaChevronDown className={`text-brand-orange transition ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
          <p className="px-4 pb-4 text-white/65 text-sm">{a}</p>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default function FaqAccordion() {
  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {FAQ_GROUPS.map((g) => (
        <div key={g.group}>
          <h2 className="heading-display text-2xl text-white mb-4">{g.group}</h2>
          <div className="space-y-3">{g.items.map((it) => <Item key={it.q} {...it} />)}</div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/faq/page.jsx`**

```jsx
import PageHero from "@/components/PageHero.jsx";
import CTABand from "@/components/CTABand.jsx";
import FaqAccordion from "@/components/FaqAccordion.jsx";

export const metadata = {
  title: "FAQ",
  description: "Answers on fence pricing, permits, materials, timelines, and warranty from Gefence LLC, Greeley CO.",
  alternates: { canonical: "/faq" },
};

export default function Faq() {
  return (
    <main>
      <PageHero chip="FAQ" title="Questions," accent="answered" intro="Everything homeowners ask before a fence project." trail={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
      <section className="py-12"><div className="container-x"><FaqAccordion /></div></section>
      <CTABand heading="Still have questions?" sub="Call us — straight answers, no pressure." />
    </main>
  );
}
```

- [ ] **Step 3: Create `src/app/not-found.jsx`**

```jsx
import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <main className="pt-40 pb-28 container-x text-center">
      <div className="heading-display text-7xl text-brand-orange">404</div>
      <h1 className="heading-display text-3xl text-white mt-2">That page wandered off.</h1>
      <p className="text-white/60 mt-3">Let's get you back on track.</p>
      <div className="flex gap-3 justify-center mt-6">
        <Link href="/" className="btn-primary">Back Home</Link>
        <Link href="/contact" className="btn-outline">Free Estimate</Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Build** → success. Run `npm test` → all PASS.
- [ ] **Step 5: Commit** — `git add src/app/faq/page.jsx src/components/FaqAccordion.jsx src/app/not-found.jsx && git commit -m "feat: FAQ route + 404"`

### Task 22: Delete salvaged legacy files

**Files:** Delete `src/pages/Landing.jsx`, `src/data.js`, `src/index.css`, leftover Vite `src/components/*` originals that were renamed

- [ ] **Step 1: Identify leftovers** — Run: `grep -rn "react-router-dom\|from \"../data.js\"\|from \"./data.js\"" src` → Expected: no results. If a renamed-from original still exists (e.g., old `src/components/Services.jsx`, `FAQ.jsx`, `Marquee.jsx`, `Hero.jsx` if you created new filenames) and is unused, remove it.
- [ ] **Step 2: Remove dead files** — `git rm src/pages/Landing.jsx src/data.js src/index.css` and any unused old component files. Remove the now-empty `src/pages/` dir.
- [ ] **Step 3: Build + test** — `npm run build` and `npm test` → both green; build output shows all 9 routes + 5 service params as static.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "chore: remove salvaged Vite legacy files"`

---

## Phase 4 — SEO Infra, Assets, Finalize

### Task 23: sitemap.ts + robots.ts

**Files:** Create `src/app/sitemap.ts`, `src/app/robots.ts`

- [ ] **Step 1: Create `src/app/sitemap.ts`**

```ts
import { SERVICES } from "@/content/index.js";

const base = "https://tntfenceco.com";
const staticPaths = ["", "/about", "/services", "/fence-styles", "/gallery", "/service-areas", "/contact", "/faq"];

export default function sitemap() {
  const pages = staticPaths.map((p) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.8 }));
  const services = SERVICES.map((s) => ({ url: `${base}/services/${s.slug}`, changeFrequency: "monthly", priority: 0.7 }));
  return [...pages, ...services];
}
```

- [ ] **Step 2: Create `src/app/robots.ts`**

```ts
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://tntfenceco.com/sitemap.xml",
  };
}
```

- [ ] **Step 3: Build** → success; confirm build output lists `/sitemap.xml` and `/robots.txt`.
- [ ] **Step 4: Commit** — `git add src/app/sitemap.ts src/app/robots.ts && git commit -m "feat: generated sitemap + robots"`

### Task 24: Generate assets via codex image-gen skill

**Files:** Create `public/img/*`, `public/logo.png`, `public/favicon.svg`

- [ ] **Step 1: Confirm the codex image-gen skill is installed** — Run: `ls "C:\Users\OS\.claude\skills"` and check `C:\Users\OS\.claude\plugins\marketplaces` for an image-generation skill. If absent, STOP, tell the user it must be installed, and skip to Task 25 (site builds fine — `SafeImage` shows gradient fallbacks).
- [ ] **Step 2: Invoke the image-gen skill** via the `Skill` tool. Generate all 27 assets from spec §9 using each row's prompt + the global style suffix. Write to the exact `public/img/...`, `public/logo.png`, `public/favicon.svg` paths.
- [ ] **Step 3: Optimize** — JPGs ≤ ~300 KB, ≤ 1600px wide; `logo.png` transparent; `favicon.svg` valid. Add a `<link rel="icon" href="/favicon.svg">` is automatic via Next when `src/app/icon.*` exists — alternatively place `public/favicon.svg` and add `icons: { icon: "/favicon.svg" }` to the root `metadata`.
- [ ] **Step 4: Visual check** — `npm run dev`, click every route; confirm images load via `next/image`, no layout shift, aspect ratios correct. Fix any wrapper sizing.
- [ ] **Step 5: Build** → success.
- [ ] **Step 6: Commit** — `git add public src/app/layout.jsx && git commit -m "feat: add generated brand and project imagery"`

### Task 25: Final verification + README + handoff

**Files:** Modify `README.md`

- [ ] **Step 1: Full test run** — `npm test` → all suites PASS.
- [ ] **Step 2: Production build + start** — `npm run build && npm run start`; open the URL, click through all 9 routes + a service detail + a bad URL (404). Confirm: nav active states, per-page `<title>` changes (browser tab), JSON-LD present in `<head>` (view source), mobile menu works, no console errors.
- [ ] **Step 3: Rewrite `README.md`** — Gefence LLC description; tech stack (Next.js 15 App Router, Tailwind, Framer Motion, Vitest); features (9 routes, 5 services SSG, fence styles, gallery, service areas, FAQ, Metadata API + JSON-LD, sitemap/robots); commands (`npm install/dev/build/start/test`); deploy note (Vercel, no `vercel.json` needed); the spec §12 "Open Items for Client" list; contact `(845) 551-1446`.
- [ ] **Step 4: Commit** — `git add README.md && git commit -m "docs: update README for Gefence LLC (Next.js)"`
- [ ] **Step 5: Finish the branch** — invoke `superpowers:finishing-a-development-branch` to review, run final verification, and decide merge/PR for `feature/gefence-website`.

---

## Self-Review (completed by plan author)

**Spec coverage:** §2 brand → Tasks 4,9,10,25. §3 Next App Router/SSG/RSC/`"use client"` → Tasks 1,2,9,12,16,18,21. §4 site map 9 routes + dynamic slug → Tasks 13–22 (build output verifies SSG). §5 homepage 14 sections → Tasks 12–13. §6 inner pages → Tasks 14–21. §7 pure-data content layer → Tasks 4–6. §8 components/JsonLd/no Seo/LockedService not ported → Tasks 1,7–12,16. §9 asset manifest → Task 24. §10 Metadata API + JSON-LD + sitemap.ts/robots.ts + next/image + next/font → Tasks 2,4–23. §11 out-of-scope respected (demo form, map placeholder). §12 client open items → Task 25 README. No gaps.

**Placeholder scan:** No "TBD/TODO/implement later". Map placeholder + `SafeImage` gradient fallback are spec-sanctioned (§11) and explicitly coded. Task 24 is a real gated task with a skip path. Task 6 and Task 17 reference earlier verbatim blocks but reproduce the full code/content inline (no "same as Task N" without the code). Task 12 ports existing components with explicit, enumerated transformation rules rather than re-pasting unseen originals — the engineer reads each file as instructed.

**Type consistency:** Content exports stable via `@/content/index.js` — `BUSINESS`, `SERVICES`/`getService`, `FENCE_STYLES`, `SERVICE_AREAS`, `TESTIMONIALS`, `FAQ_GROUPS`, `GALLERY`, `PROCESS_STEPS`, `VALUE_PROPS`. `getService` → `undefined` on miss; `services/[slug]` uses `notFound()` accordingly (test-guarded, Task 16). Component props consistent: `SafeImage {src,alt,fill,width,height,className,sizes,priority}`, `PageHero {chip,title,accent,intro,image,trail}`, `CTABand {heading,sub}`, `SectionHeading {chip,title,accent,subtitle,center}`, `Breadcrumb {trail:[{label,to}]}`, `ContactForm {compact}`. `next/link` uses `href` everywhere (no leftover `to=`). Client/server boundary explicit per component.
