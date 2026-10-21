import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { siteUrl } from "@/lib/env";

const routes = [
  "",
  "/energy",
  "/community-solar",
  "/business",
  "/how-it-works",
  "/compare",
  "/savings",
  "/learn",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...articles.map((article) => `/learn/${article.slug}`)].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
