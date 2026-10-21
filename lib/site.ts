import type { Route } from "next";

// Business facts. Every value here traces to powersetter.com; see docs/content-sources.md.
export const site = {
  name: "PowerSetter",
  tagline: "Compare electricity and natural gas suppliers for your home or business.",
  phone: "(800) 833-6952",
  phoneHref: "tel:+18008336952",
  fax: "(866) 783-7466",
  address: {
    street: "2929 Allen Parkway, STE 200",
    city: "Houston",
    region: "TX",
    postalCode: "77019",
    country: "US",
  },
  founded: 2014,
  customers: "250,000+",
  suppliers: "40+",
  official: "https://www.powersetter.com/",
  contactForm: "https://www.powersetter.com/contact-us/",
  privacyPolicy: "https://www.powersetter.com/privacy-policy/",
  terms: "https://www.powersetter.com/terms-and-conditions/",
  reviews: "https://www.shopperapproved.com/reviews/powersetter.com",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/powersetter/" },
    { label: "YouTube", href: "https://www.youtube.com/@powersetter8502" },
    { label: "Instagram", href: "https://www.instagram.com/powersetter101/" },
    { label: "Facebook", href: "https://www.facebook.com/PowerSetter" },
  ],
  // "PowerSetter operates in many deregulated states, including … and others."
  listedStates: ["CT", "PA", "OH", "MA", "ME", "IL", "NJ", "TX", "GA", "NH"],
} as const;

export type ListedState = (typeof site.listedStates)[number];

export const navigation: { href: Route; label: string }[] = [
  { href: "/energy", label: "Electricity & gas" },
  { href: "/community-solar", label: "Community solar" },
  { href: "/business", label: "Business" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/learn", label: "Learn" },
];

export const footerNavigation: { title: string; links: { href: Route; label: string }[] }[] = [
  {
    title: "Compare",
    links: [
      { href: "/energy", label: "Electricity & gas" },
      { href: "/community-solar", label: "Community solar" },
      { href: "/business", label: "Business energy" },
      { href: "/compare", label: "Find my options" },
    ],
  },
  {
    title: "Understand",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/savings", label: "Supply cost calculator" },
      { href: "/learn", label: "Energy guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About PowerSetter" },
      { href: "/contact", label: "Contact" },
    ],
  },
];
