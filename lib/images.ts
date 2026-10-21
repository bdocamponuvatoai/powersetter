import type { StaticImageData } from "next/image";
import home from "@/assets/images/evening-home.webp";
import solar from "@/assets/images/community-solar.webp";
import business from "@/assets/images/business-owner.webp";
import type { ImageKey } from "@/lib/content";

// Every photograph is AI-generated; components label them "Illustrative image".
export const images: Record<ImageKey, { src: StaticImageData; alt: string }> = {
  home: { src: home, alt: "A single-storey home at dusk with warm light in the windows" },
  solar: { src: solar, alt: "Rows of solar panels in a shared solar field among green farmland" },
  business: { src: business, alt: "A cafe owner reading a printed bill beside a laptop at her counter" },
};
