import type { Route } from "next";

export type Interest = "electricity" | "gas" | "solar" | "business";

export const interests: { id: Interest; name: string; description: string }[] = [
  { id: "electricity", name: "Electricity", description: "Supply plans for your home" },
  { id: "gas", name: "Natural gas", description: "Gas supply plans for your home" },
  { id: "solar", name: "Community solar", description: "A share in a local solar project" },
  { id: "business", name: "Business energy", description: "Electricity and gas for your business" },
];

export function isInterest(value: string | null): value is Interest {
  return interests.some((interest) => interest.id === value);
}

export const priorities = [
  "Understand my options",
  "Compare my supply costs",
  "Explore renewable energy",
  "Review an expiring contract",
] as const;

export type ImageKey = "home" | "solar" | "business";

export const services: { id: Interest; title: string; text: string; href: Route; image: ImageKey }[] = [
  {
    id: "electricity",
    title: "Electricity",
    text: "Compare supplier rates, rate types and contract terms against what your utility charges today.",
    href: "/energy",
    image: "home",
  },
  {
    id: "gas",
    title: "Natural gas",
    text: "The same choice applies to gas supply in participating areas. Compare the rate and the whole term.",
    href: "/energy#gas",
    image: "home",
  },
  {
    id: "solar",
    title: "Community solar",
    text: "Join a shared solar project instead of putting panels on your roof, including programs for qualifying low-income households.",
    href: "/community-solar",
    image: "solar",
  },
  {
    id: "business",
    title: "Business energy",
    text: "Electricity and gas for one location or many, planned around your usage and renewal dates.",
    href: "/business",
    image: "business",
  },
];

export const steps = [
  {
    title: "Start with your ZIP code",
    text: "Your location decides which utility serves you and which suppliers and programs are available.",
  },
  {
    title: "Compare the whole plan",
    text: "Look at the supply rate, rate type, contract term, fees and renewal conditions together.",
  },
  {
    title: "Switch, then set a reminder",
    text: "Your utility keeps delivering your energy. Tell PowerSetter when your contract ends and they will remind you to compare again.",
  },
];

export const billNotes = [
  {
    label: "Usage",
    title: "Start with the kWh you actually use",
    text: "Your bill lists usage in kilowatt-hours. Compare plans at your own usage, not a sample figure.",
  },
  {
    label: "Delivery",
    title: "Delivery stays with your utility",
    text: "Poles, wires and the delivery charge stay the same whichever supplier you choose.",
  },
  {
    label: "Supply",
    title: "Supply is the part you can shop",
    text: "In deregulated states you can buy the energy itself from a different supplier. This is where comparing pays off.",
  },
];

export const faqs = [
  {
    q: "What does PowerSetter do?",
    a: "PowerSetter is a comparison platform. It helps households and businesses compare electricity and natural gas supply plans from more than 40 suppliers, and helps people enroll in community solar.",
  },
  {
    q: "Will my utility change if I switch supplier?",
    a: "No. Your local utility still delivers your energy and sends the delivery charge. Switching changes who supplies the energy and the rate you pay for that supply.",
  },
  {
    q: "Which states does PowerSetter serve?",
    a: "PowerSetter lists Connecticut, Pennsylvania, Ohio, Massachusetts, Maine, Illinois, New Jersey, Texas, Georgia and New Hampshire, among other deregulated states. Availability depends on your utility, so start with your ZIP code.",
  },
  {
    q: "Do I need solar panels to join community solar?",
    a: "No. Community solar lets eligible customers take part in a shared solar project instead of installing equipment on their own property. Credits, charges, eligibility and cancellation terms vary by program.",
  },
  {
    q: "What should I compare besides the price?",
    a: "The rate type, monthly fees, contract term, cancellation charges, renewable content and what happens at renewal. Use your own usage to see what each offer means for you.",
  },
  {
    q: "Are the numbers on this site live offers?",
    a: "No. The bill and the calculator use example figures you can edit. They are not quotes, eligibility checks or live offers, and they leave out taxes and other charges.",
  },
];

export const articles = [
  {
    slug: "read-your-energy-bill",
    category: "Your bill",
    title: "Read your energy bill in five minutes",
    description: "Supply, delivery and the numbers worth paying attention to.",
    minutes: 4,
    image: "home" as ImageKey,
    sections: [
      {
        heading: "Start with what you use",
        text: "Find your electricity usage in kilowatt-hours (kWh), or the usage unit for your gas service. Check the billing dates: a longer period or a change in the weather can make month-to-month comparisons misleading.",
      },
      {
        heading: "Separate supply from delivery",
        text: "The supply charge is for the energy you buy. The delivery charge is for getting it to you. Comparing supply offers does not change every line on your bill.",
      },
      {
        heading: "Find the terms behind the rate",
        text: "Keep your current supply rate, rate type, monthly fees and contract end date together. Before considering a new offer, check the cancellation fees and renewal conditions in your current agreement.",
      },
      {
        heading: "Bring the right information",
        text: "Have a recent bill and your current agreement ready when you speak to an energy specialist. Never send your account number in an unsecured message.",
      },
    ],
  },
  {
    slug: "community-solar-explained",
    category: "Community solar",
    title: "Community solar, without the rooftop",
    description: "How shared solar works, and the questions to ask before you enroll.",
    minutes: 3,
    image: "solar" as ImageKey,
    sections: [
      {
        heading: "One project, many participants",
        text: "Community solar connects eligible customers with a shared solar project instead of an installation on their own property. That makes it a different conversation from buying rooftop equipment.",
      },
      {
        heading: "Location still matters",
        text: "Programs depend on your state and utility. A project available in one area does not make you eligible in another. Start with your ZIP code.",
      },
      {
        heading: "Read the whole program offer",
        text: "Ask how credits and charges appear on your bill, what participation costs, how billing works and how to cancel. Check whether moving affects your eligibility.",
      },
      {
        heading: "Ask about household programs",
        text: "PowerSetter offers community solar enrollment options that include programs for qualifying low-income households. Confirm the requirements before you share any supporting documents.",
      },
    ],
  },
  {
    slug: "compare-energy-plans",
    category: "Comparing plans",
    title: "A good comparison goes beyond the rate",
    description: "Four things to check before you choose a supply plan.",
    minutes: 4,
    image: "business" as ImageKey,
    sections: [
      {
        heading: "Compare like with like",
        text: "Use the same monthly usage and billing assumptions for each plan. A headline rate on its own does not account for every fee or condition.",
      },
      {
        heading: "Understand the rate type",
        text: "Check whether the supply rate is fixed or variable, exactly what is fixed, and for how long. Delivery and other charges may be billed separately.",
      },
      {
        heading: "Look at the whole term",
        text: "Review the contract length, monthly fees, cancellation charges and renewal terms. Note any conditions attached to advertised prices or credits.",
      },
      {
        heading: "Make the decision easy to revisit",
        text: "Save the full agreement, your confirmation and the contract end date. Compare again before renewal so the next decision gets the same attention as the first.",
      },
    ],
  },
] as const;

export type Article = (typeof articles)[number];

// Square tile map of the US: [state, column, row]. Every state plus DC, one tile each.
export const stateTiles: [string, number, number][] = [
  ["AK", 0, 0],
  ["ME", 10, 0],
  ["WI", 5, 1],
  ["VT", 9, 1],
  ["NH", 10, 1],
  ["WA", 0, 2],
  ["ID", 1, 2],
  ["MT", 2, 2],
  ["ND", 3, 2],
  ["MN", 4, 2],
  ["IL", 5, 2],
  ["MI", 6, 2],
  ["NY", 8, 2],
  ["MA", 9, 2],
  ["OR", 0, 3],
  ["NV", 1, 3],
  ["WY", 2, 3],
  ["SD", 3, 3],
  ["IA", 4, 3],
  ["IN", 5, 3],
  ["OH", 6, 3],
  ["PA", 7, 3],
  ["NJ", 8, 3],
  ["CT", 9, 3],
  ["RI", 10, 3],
  ["CA", 0, 4],
  ["UT", 1, 4],
  ["CO", 2, 4],
  ["NE", 3, 4],
  ["MO", 4, 4],
  ["KY", 5, 4],
  ["WV", 6, 4],
  ["VA", 7, 4],
  ["MD", 8, 4],
  ["DE", 9, 4],
  ["AZ", 1, 5],
  ["NM", 2, 5],
  ["KS", 3, 5],
  ["AR", 4, 5],
  ["TN", 5, 5],
  ["NC", 6, 5],
  ["SC", 7, 5],
  ["DC", 8, 5],
  ["OK", 3, 6],
  ["LA", 4, 6],
  ["MS", 5, 6],
  ["AL", 6, 6],
  ["GA", 7, 6],
  ["HI", 0, 7],
  ["TX", 3, 7],
  ["FL", 8, 7],
];
