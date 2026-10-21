# PowerSetter website (concept)

A redesigned marketing site for [PowerSetter](https://www.powersetter.com/), the energy comparison platform, prepared by Nuvato as a pitch. It is a private preview: search indexing is off, and nothing a visitor types is stored or sent. Live rates, availability and enrollment stay on powersetter.com.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4. Every route is statically prerendered and deploys to Vercel with no extra configuration.

## Quick start

Requires Node 24 (see `.nvmrc`) and npm 11.

```sh
npm ci
npm run dev          # http://localhost:3000
```

## Scripts

| Script              | What it does                                                   |
| ------------------- | -------------------------------------------------------------- |
| `npm run dev`       | Development server                                             |
| `npm run build`     | Production build                                               |
| `npm run start`     | Serve the production build                                     |
| `npm run check`     | Prettier check, zero-warning ESLint, typecheck, unit tests     |
| `npm run lint`      | ESLint with `--max-warnings=0`                                 |
| `npm run typecheck` | `next typegen` then `tsc --noEmit` (works on a clean checkout) |
| `npm run format`    | Prettier, including Tailwind class sorting                     |
| `npm test`          | Unit tests with Node's built-in runner (`lib/**/*.test.ts`)    |
| `npm run test:e2e`  | Playwright against the production build (run `build` first)    |

Running the end-to-end suite locally:

```sh
npm run build
npx playwright install firefox webkit     # once; Chromium can reuse Edge or Chrome
PW_CHANNEL=msedge npx playwright test      # or PW_CHANNEL=chrome
```

## Environment

Copy `.env.example` to `.env.local` for local overrides. Both variables are read at build time.

| Variable                     | Purpose                                                                                                               | Default                                                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`       | Canonical origin for metadata, sitemap and structured data                                                            | Vercel production domain, else `http://localhost:3000` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` lets search engines index the site. Only applies to Vercel production deployments; previews are never indexed. | `false`                                                |

## Structure

```text
app/                  routes, layout, metadata, error boundaries, robots, sitemap, manifest, icons, social image
  globals.css         design tokens (@theme), custom utilities, motion
components/
  sections/           one file per homepage section (several are reused on inner pages)
  bill.tsx            the example bill: switch the supply rate, only the supply line changes
  coverage-map.tsx    tile map of the listed states, with a ZIP check
  compare-wizard.tsx  three-step "find my options" flow
  quick-start.tsx     hero ZIP form (a plain GET form, works without JavaScript)
  calculator.tsx      supply cost calculator
  site-header.tsx, site-footer.tsx, mobile-action-bar.tsx, reveal-observer.tsx
  ui.tsx, icons.tsx   shared primitives and inline SVG icons
lib/
  site.ts             business facts and navigation: the single source of truth
  content.ts          services, FAQs, steps, guides, state tile layout
  energy.ts           pure logic: ZIP validation, ZIP-to-state lookup, calculator, example bill
  env.ts              site URL and indexing rules (server only)
  images.ts           static image imports with alt text
  *.test.ts           unit tests
e2e/                  Playwright specs
assets/images/        images imported by next/image (blur placeholders, AVIF/WebP)
public/               PNG icons for the web manifest
source-assets/        original artwork, not deployed
docs/                 content provenance and image notes
```

## Design system

- **Palette.** Navy `#0a2238` and electric blue `#1668e8` come from the wordmark. Paper `#f6f4ee` is the off-white of a printed statement. Highlighter yellow `#ffe35a` marks the part of a bill a customer can shop. Link text uses `#0f56c9` because the logo blue is only 4.4:1 on the light-blue tint.
- **Type.** The Red Hat family, self-hosted by `next/font`: Display (heavy, wide bowls that echo the wordmark), Text for body copy, and Mono for bill figures and labels.
- **Signature moments.** The hero bill, where switching between a utility rate and a supplier rate changes only the supply line, and the coverage map plotted from PowerSetter's published state list.
- **Rules.** No eyebrow label on every section, no icon grids, no invented statistics or testimonials. Every photograph is AI-generated and labelled "Illustrative image". Headings and images reveal on scroll; everything is visible without JavaScript or with reduced motion.
- **Utilities.** `shell`, `section-y`, `text-display`, `text-heading`, `mono-label` and `highlighter` are defined with `@utility` in `app/globals.css`.

## Deploying to Vercel

The repository deploys as a standard Next.js project; no `vercel.json` or `vercel.ts` is needed.

1. In Vercel, **Add New → Project** and import `bdocamponuvatoai/powersetter`. The framework preset is detected as Next.js, and Node 24 is selected from `engines` in `package.json`.
2. Environment variables, **Production** only:
   - `NEXT_PUBLIC_SITE_URL`: the production origin, for example `https://www.powersetter.com`.
   - `NEXT_PUBLIC_ALLOW_INDEXING`: leave unset (or `false`) until PowerSetter approves the launch.
   - Leave both unset for **Preview**. Previews fall back to the production domain for canonical URLs and are always `noindex`.
3. Every pull request gets a preview URL. Preview builds widen the CSP just enough for the Vercel toolbar (`vercel.live`); production does not.
4. In GitHub, protect `main`: require a pull request and the `Lint, typecheck, unit tests, build` and `End-to-end` checks.

Security headers (CSP, HSTS, `X-Frame-Options`, `Permissions-Policy` and others) are set in `next.config.ts` for production builds and verified by `e2e/home.spec.ts`. If you add analytics, embeds or third-party scripts, extend the CSP, or the end-to-end console-error check will fail.

## Content rules

Every business fact lives in `lib/site.ts` and traces to powersetter.com; see [docs/content-sources.md](docs/content-sources.md). Claims we could not verify (for example "save up to 52%", testimonials and press logos) are deliberately left off and listed there as questions for PowerSetter. The bill and calculator use example figures and say so on the page.

## Known advisories

`npm audit` reports a high-severity advisory in `braces`, pulled in by `eslint-config-next`. It is a development dependency only; `npm audit --omit=dev` is clean, and CI checks that. Do not run `npm audit fix --force`, which downgrades `eslint-config-next`.

## Measured results

October 22, 2026, Lighthouse 12.8.2, mobile preset, production build on a Windows laptop, three or more runs per page. These are lab numbers, not field data from the live site.

| Page       | Performance                          | Accessibility | Best practices | SEO (indexing on) |
| ---------- | ------------------------------------ | ------------- | -------------- | ----------------- |
| `/`        | 94–95                                | 100           | 100            | 100               |
| `/compare` | 94–95                                | 100           | 100            | not measured      |
| `/energy`  | 92–94 (one outlier at 61, CPU spike) | 100           | 100            | not measured      |

SEO reads 69 while `noindex` is on; that is the crawlability audit, by design. End-to-end: 187 tests pass on desktop and mobile Chromium, Firefox and WebKit, with zero console errors and zero axe WCAG 2.2 AA violations on every page and every compare step.

## Before launch

- [ ] PowerSetter approves the copy, the proposed logo and the illustrative imagery
- [ ] Answers to the open questions in `docs/content-sources.md`
- [ ] Replace illustrative photographs with real ones where PowerSetter has them
- [ ] Decide where the compare flow hands off (today: powersetter.com and its contact form)
- [ ] Set `NEXT_PUBLIC_SITE_URL`, then `NEXT_PUBLIC_ALLOW_INDEXING=true` on Production
- [ ] Connect the domain in Vercel and test the call buttons on a real phone
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Re-run Lighthouse on the live domain before quoting any score
