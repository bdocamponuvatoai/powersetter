import type { Metadata } from "next";
import { Calculator } from "@/components/calculator";
import { Checklist, FinalCta, PageIntro, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Supply cost calculator",
  description: "See how two electricity supply rates compare at your monthly usage. Example figures, not live offers.",
  alternates: { canonical: "/savings" },
};

export default function SavingsPage() {
  return (
    <>
      <PageIntro label="Supply cost calculator" title="What a few cents per kWh adds up to">
        <p>Compare two electricity supply rates at your own monthly usage. These are your numbers, not live offers.</p>
      </PageIntro>
      <section
        aria-label="Calculator"
        className="shell grid items-start gap-12 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28"
      >
        <Calculator />
        <div className="lg:pt-4">
          <SectionHeading title="This is the supply part only">
            <p>Your full bill also includes delivery, taxes and fees, and your usage changes month to month.</p>
          </SectionHeading>
          <Checklist
            className="mt-8"
            items={[
              "Use the kWh from a recent bill",
              "Enter rates in cents per kWh",
              "Check fees and contract terms separately",
              "Treat the result as an estimate",
            ]}
          />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
