import type { Metadata } from "next";
import EnergyExplorer from "@/components/energy-explorer";
import { PageIntro, ButtonLink, Eyebrow, FAQ, FinalCTA } from "@/components/ui";
import { ScanLine, CalendarDays, FileCheck2 } from "lucide-react";
export const metadata: Metadata = { title: "Electricity & natural gas" };
export default function EnergyPage() {
  return (
    <>
      <PageIntro
        eyebrow="ELECTRICITY & NATURAL GAS"
        title={
          <>
            A little more choice.
            <br />
            <span>A lot more clarity.</span>
          </>
        }
        description="Make space for a better energy conversation. Explore the supply options available for your home or business and understand what’s behind the rate."
      >
        <ButtonLink href="/compare/">Find my energy options</ButtonLink>
      </PageIntro>
      <section className="container subpage-explorer">
        <EnergyExplorer />
      </section>
      <section className="section container">
        <div className="section-head">
          <div>
            <Eyebrow>THE DETAILS MAKE THE DIFFERENCE</Eyebrow>
            <h2>Look at the whole plan.</h2>
          </div>
          <p>
            A headline price is a starting point.
            <br />
            These details help complete the picture.
          </p>
        </div>
        <div className="info-grid">
          {[
            {
              icon: ScanLine,
              title: "Your actual usage",
              copy: "Compare costs using the energy you use. Check recent bills and look at seasonal changes.",
            },
            {
              icon: CalendarDays,
              title: "The full contract",
              copy: "Understand the term, rate type, fees and what happens when the plan renews.",
            },
            {
              icon: FileCheck2,
              title: "Your current agreement",
              copy: "Review any cancellation costs before switching, and save the complete terms of the new offer.",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <article key={title}>
              <Icon size={30} />
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>THE QUESTIONS THAT COUNT</Eyebrow>
          <h2>
            Know a little more.
            <br />
            Choose a little better.
          </h2>
        </div>
        <FAQ />
      </section>
      <FinalCTA />
    </>
  );
}
