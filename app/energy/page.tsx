import type { Metadata } from "next";
import { BillNotes } from "@/components/sections/bill-notes";
import { ButtonLink, Checklist, FaqSection, FinalCta, PageIntro, Photo, TextLink } from "@/components/ui";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Electricity and natural gas plans",
  description: "Compare electricity and natural gas supply plans: rate type, contract term, fees and renewal.",
  alternates: { canonical: "/energy" },
};

const sections = [
  {
    id: "electricity",
    title: "Electricity",
    text: "Your utility sets a default supply rate. In deregulated states, licensed suppliers offer their own rates and terms, and some plans are fully or partly renewable.",
    items: [
      "Fixed or variable: check exactly what is fixed, and for how long",
      "Monthly fees and cancellation charges",
      "What the rate becomes when the contract ends",
    ],
  },
  {
    id: "gas",
    title: "Natural gas",
    text: "Gas supply works the same way in participating areas: the utility keeps delivering, and you can compare who supplies the gas and on what terms.",
    items: [
      "The supply rate per therm or unit on your bill",
      "Seasonal usage, since winter bills dominate the year",
      "Contract length and renewal conditions",
    ],
  },
];

export default function EnergyPage() {
  return (
    <>
      <PageIntro
        label="Electricity & natural gas"
        title="Compare the supply. Keep the utility."
        actions={<ButtonLink href="/compare">Find my options</ButtonLink>}
      >
        <p>
          Switching supplier changes who you buy energy from and the rate you pay for it. Your utility still delivers
          it, reads the meter and handles the wires.
        </p>
      </PageIntro>

      <div className="shell">
        <Photo
          image={images.home}
          sizes="(min-width: 1216px) 1152px, 100vw"
          className="aspect-[16/9] sm:aspect-[21/9]"
          preload
        />
      </div>

      <BillNotes title="Read the bill before you compare" />

      <div className="bg-white">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="shell grid gap-10 border-b border-line section-y last:border-b-0 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <h2 id={`${section.id}-title`} data-reveal className="text-heading text-[2.25rem] sm:text-5xl">
                {section.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{section.text}</p>
            </div>
            <div>
              <h3 className="font-semibold">What to check</h3>
              <Checklist items={section.items} className="mt-5 text-lg" />
              <TextLink href="/savings" className="mt-8">
                Try the supply cost calculator
              </TextLink>
            </div>
          </section>
        ))}
      </div>

      <FaqSection limit={5} />
      <FinalCta />
    </>
  );
}
