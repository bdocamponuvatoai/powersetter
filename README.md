# PowerSetter — Next.js website

A complete, responsive website concept rebuilt in Next.js App Router with strict TypeScript and React. The redesign replaces the original single-page HTML mock-up and introduces a proposed PowerSetter identity, an editorial layout, new generated imagery and a guided comparison experience.

## Stack

- Next.js 16.4.2, React 19.3.1, TypeScript
- App Router, typed content, reusable server and client components
- Self-hosted Manrope and Inter fonts through `next/font/local`
- Optimized WebP imagery, transparent logo and SVG app icon
- Lucide icons, responsive CSS, native semantic controls and reduced-motion support
- Static export for private Sites hosting; the source remains a normal Next.js project

## Development

```sh
npm ci
npm run dev
```

Open `http://localhost:4173`. The development wrapper translates Sites preview flags into Next.js flags. It uses Webpack, matching the production compiler.

```sh
npm run typecheck
npm test
npm run build
```

`next build` exports the complete website to `out/`. Serve that directory with a static host. No dependency installation is needed on the hosting side. Sites identity and the `out` deployment directory are retained in `.openai/hosting.json`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | New brand, hero, home/business ZIP entry, energy explorer, community solar, platform explanation, process, business and journal |
| `/energy/` | Electricity and natural gas options, plan-review checklist |
| `/community-solar/` | Shared solar, eligibility questions, program considerations |
| `/business/` | Business energy and preparation checklist |
| `/how-it-works/` | Three-step decision guide |
| `/compare/` | Accessible three-step interest, location and next-step flow |
| `/savings/` | Editable electricity supply-cost comparison |
| `/about/` | Verified company description and company-reported figures |
| `/contact/` | Public phone and current official contact page |
| `/learn/` | Energy journal |
| `/learn/read-your-energy-bill/` | Bill-reading guide |
| `/learn/community-solar-explained/` | Shared-solar guide |
| `/learn/compare-energy-plans/` | Plan comparison guide |

A custom not-found page provides a route back home.

## Behavior and integration boundary

- Energy tabs support mouse, touch, arrow keys, Home and End.
- The guided flow validates ZIP format, preserves leading zeros and carries the chosen interest and ZIP from the home page.
- Query-string interests are checked against an allowlist.
- Calculator handles savings, equal-cost, higher-cost and invalid-rate states. Tests cover unit conversion and ZIP validation.
- Mobile navigation uses a native modal dialog for focus containment and Escape behavior.
- Forms do not store or send visitor input. No fake submission success, rate availability or enrollment is shown.
- The final step explicitly links to the current PowerSetter website for live availability and enrollment. Supplier APIs, a CRM, analytics and a submission backend are not connected.
- The preview remains private, and metadata is `noindex, nofollow`.

## Image and brand assets

Created with the built-in image generation tool. Website-bound assets are under `public/assets/`. Original generation outputs are preserved separately by the generation service. Generated scenes are conceptual and do not claim to show PowerSetter installations.

| Asset | Placement | Art direction |
| --- | --- | --- |
| `powersetter-logo.png` | Navigation and footer | Single geometric P symbol followed by lowercase navy “owersetter”; negative-space diagonal and electric-blue accent; transparent background |
| `solar-home.webp` and `solar-home-small.webp` | Home hero and editorial content | Photorealistic sunlit modern limestone-and-oak home with a clean solar roof, blue sky and natural landscaping |
| `community-solar.webp` and `community-solar-small.webp` | Community solar and editorial content | Photorealistic shared solar farm in green rolling countryside, precise blue arrays and a curving access path |
| `evening-home.webp` | Energy explorer and editorial content | Previously generated warm architectural home at dusk, with no rooftop panels |

Prompt set: logo-brand, horizontal single-line `powersetter` wordmark, navy `#0D2438`, blue `#1668E8`, clean geometric P and no tagline; photorealistic-natural home hero, 1536×1024, warm materials and soft sunlight, central composition for mobile cropping, no text or people; photorealistic-natural shared solar farm, 1536×1024, aerial oblique landscape, green countryside and blue panels, late-morning light, no labels or interface. Images were compressed and resized for the site; transparent empty logo margins were trimmed for navigation use.

The new identity is a proposed design, not a claim of an approved corporate rebrand. Fonts are self-hosted. Package versions and dependency integrity are retained in `package-lock.json`.

## Factual sources

Reviewed October 21, 2026:

- https://www.powersetter.com/ — company-reported 250,000+ customers, 40+ energy suppliers, founded in 2014; electricity and natural gas comparison.
- https://www.powersetter.com/about-us/ — home/business comparison, community solar, low-income enrollment options, public phone.
- https://www.powersetter.com/community-solar-customer-acquisition/ — community solar without equipment installation on the customer's property.
- https://nextjs.org/docs/app/guides/static-exports — App Router static deployment approach.

The lead's individual email, sales owner, pipeline ID and discovery-call details are not in the website.

## Homepage section revision — October 21, 2026

Replaced the homepage block headed “Let the numbers do the talking” and its example calculator with a clear explanation of PowerSetter’s comparison-platform role. The replacement links to electricity plans, natural gas plans and renewable options, and explicitly distinguishes PowerSetter from a solar installer. The original hero, navigation, other homepage sections and supporting pages remain intact. The standalone supply-cost calculator is still available at `/savings/`.

Logo correction: edited with the built-in image tool to remove only the duplicate lowercase p, retaining the P symbol followed by “owersetter”, the navy/blue palette and transparent background. Empty alpha margins were trimmed for website placement.

## Business section redesign — October 22, 2026

The homepage business-energy section now uses an editorial split layout, custom cafe-owner imagery, clear electricity/natural gas labels, primary and secondary navigation, and a three-part guide to usage, contract terms and renewal. The rest of the website is unchanged.

`public/assets/business-owner.webp` is a generated illustrative business scene, not a PowerSetter customer endorsement. Built-in image prompt: photorealistic independent cafe owner in a navy shirt reviewing a bill beside a laptop; bright oak-and-cream cafe, natural daylight, editorial composition; no logos, legible text or solar panels. Original 1536×1024 image compressed to WebP for the site.
