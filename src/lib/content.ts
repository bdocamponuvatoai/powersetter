export const company = {
  name: "PowerSetter",
  phone: "(800) 833-6952",
  phoneHref: "tel:+18008336952",
  official: "https://www.powersetter.com/",
};
export type Interest = "electricity" | "gas" | "solar" | "business";
export const interestNames: Record<Interest, string> = {
  electricity: "Electricity",
  gas: "Natural gas",
  solar: "Community solar",
  business: "Business energy",
};
export const faqs = [
  {
    q: "What does PowerSetter help me do?",
    a: "PowerSetter helps people and businesses explore electricity and natural gas supply plans, compare suppliers, and learn about community solar. Available options depend on your location and utility.",
  },
  {
    q: "Do I need solar panels to join community solar?",
    a: "Community solar is different from a rooftop installation. Eligible customers participate in a shared solar project. Program charges, credits, eligibility and cancellation terms vary, so review the specific offer before enrolling.",
  },
  {
    q: "Can I compare energy plans for my business?",
    a: "Yes. PowerSetter serves residential and business customers. Your utility, recent usage, contract end date and number of locations help guide a business energy conversation.",
  },
  {
    q: "What should I look at besides the price?",
    a: "Compare the rate type, monthly fees, contract term, cancellation charges, renewable content and renewal conditions. Use your own usage to understand what each offer could mean for you.",
  },
  {
    q: "Are the numbers in the calculator live offers?",
    a: "No. The calculator compares supply costs using editable example rates and usage. It is not a quote, an eligibility check or a live offer, and it excludes delivery charges, taxes, fees and contract costs.",
  },
];
export const articles = [
  {
    slug: "read-your-energy-bill",
    category: "THE EVERYDAY GUIDE",
    title: "A little less mystery in your energy bill.",
    description:
      "Understand supply, delivery and the numbers worth paying attention to.",
    minutes: 4,
    image: "/assets/evening-home.webp",
    sections: [
      {
        heading: "Start with what you use",
        text: "Look for your electricity usage in kilowatt-hours (kWh), or the usage unit shown for your gas service. Check the billing dates: a longer period or a weather change can make a month-to-month comparison misleading.",
      },
      {
        heading: "Separate supply from delivery",
        text: "The supply charge relates to the energy you purchase. Delivery charges relate to getting it to your location. Comparing supply offers does not mean every line on your bill will change.",
      },
      {
        heading: "Find the terms behind the rate",
        text: "Keep your current supply rate, rate type, monthly fees and contract end date together. Before considering a new offer, review cancellation fees and renewal conditions in your existing agreement.",
      },
      {
        heading: "Bring the right information",
        text: "Have a recent bill and your current agreement ready when speaking with an energy specialist. Avoid sharing your account number in an unsecured message.",
      },
    ],
  },
  {
    slug: "community-solar-explained",
    category: "A BRIGHTER POSSIBILITY",
    title: "Meet solar that goes beyond your roof.",
    description:
      "A simple introduction to shared solar and the questions to ask.",
    minutes: 3,
    image: "/assets/community-solar-small.webp",
    sections: [
      {
        heading: "One project, shared participation",
        text: "Community solar connects eligible customers with a shared solar project instead of an installation on their own property. That makes the starting conversation different from shopping for rooftop equipment.",
      },
      {
        heading: "Location still matters",
        text: "Programs depend on geography and utility service territories. An available project in one area does not establish eligibility in another. PowerSetter can help you explore the next step for your location.",
      },
      {
        heading: "Read the complete program offer",
        text: "Ask how credits and charges appear, what participation costs, how billing works and how to cancel. Check whether moving affects your eligibility. The answers depend on the individual program.",
      },
      {
        heading: "Explore household eligibility",
        text: "PowerSetter describes community solar enrollment options including programs for qualifying low-income households. Confirm the requirements and approved process before providing supporting information.",
      },
    ],
  },
  {
    slug: "compare-energy-plans",
    category: "SMARTER ENERGY CHOICES",
    title: "A good comparison goes beyond the rate.",
    description:
      "Five things to have on your checklist before choosing a supply plan.",
    minutes: 4,
    image: "/assets/solar-home-small.webp",
    sections: [
      {
        heading: "Compare like with like",
        text: "Use the same monthly usage and billing assumptions for each plan. A headline rate alone does not account for every fee or condition.",
      },
      {
        heading: "Understand the rate type",
        text: "Read whether the supply rate is fixed, variable or subject to other conditions. Check exactly what is fixed and for how long. Delivery costs and other charges may be separate.",
      },
      {
        heading: "Look at the whole term",
        text: "Review the contract duration, monthly fees, cancellation charges and renewal provisions. Note any conditions attached to advertised prices or credits.",
      },
      {
        heading: "Keep your decision easy to revisit",
        text: "Save the full agreement, confirmation and contract end date. Revisit your options before renewal so the next decision has the same attention as the first.",
      },
    ],
  },
];
