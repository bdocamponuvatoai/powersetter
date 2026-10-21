# Images

Every photograph on the site is AI-generated with ChatGPT's built-in image tool, and every placement is labelled "Illustrative image". None show PowerSetter customers, staff, installations or projects, and none contain third-party logos.

| File                                       | Used on                                     | Prompt (as generated)                                                                                                                                                                              |
| ------------------------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/images/evening-home.webp`          | Home (services), energy, bill guide         | Warm architectural home at dusk, no rooftop panels                                                                                                                                                 |
| `assets/images/community-solar.webp`       | Home, community solar, about, solar guide   | Photorealistic shared solar farm, 1536×1024, aerial oblique landscape, green countryside and blue panels, late-morning light, no labels or interface                                               |
| `assets/images/business-owner.webp`        | Home (business), business, comparison guide | Photorealistic independent cafe owner in a navy shirt reviewing a bill beside a laptop; bright oak-and-cream cafe, natural daylight, editorial composition; no logos, legible text or solar panels |
| `assets/images/powersetter-logo.png`       | Header, mobile menu                         | Proposed wordmark: geometric P symbol followed by lowercase "owersetter", navy `#0D2438` with blue `#1668E8` accent, transparent background. Trimmed to 760 px wide for the web.                   |
| `assets/images/powersetter-logo-light.png` | Footer                                      | Derived from the wordmark: navy replaced with white for dark backgrounds                                                                                                                           |

The logo is a proposed design, not an approved PowerSetter rebrand. The original 2102 × 404 artwork is in `source-assets/`.

## Retired

`solar-home.webp` (a house with rooftop solar panels) was the original hero. It was removed because PowerSetter is a comparison platform, not a solar installer, and the image implied otherwise.

## Rendered assets

`app/opengraph-image.jpg` (1200 × 630), `app/apple-icon.png` and `public/icon-*.png` were rendered from `app/icon.svg` and the light wordmark with Playwright and Edge. Regenerate them if the logo or headline changes.
