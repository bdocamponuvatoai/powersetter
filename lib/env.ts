// Server-only environment helpers for metadata, robots, sitemap and structured data.

const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? (vercelProduction ? `https://${vercelProduction}` : "http://localhost:3000")
).replace(/\/$/, "");

// Indexing needs an explicit opt-in, and never applies to Vercel preview or development deployments.
export const allowIndexing =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  (process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production");
