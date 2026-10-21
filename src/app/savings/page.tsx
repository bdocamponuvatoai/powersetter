import type { Metadata } from "next";
import Calculator from "@/components/calculator";
import { PageIntro, Eyebrow, FinalCTA, CheckList } from "@/components/ui";
export const metadata: Metadata = { title: "Supply cost calculator" };
export default function SavingsPage() {
  return (
    <>
      <PageIntro
        eyebrow="A CLEARER LOOK AT THE NUMBERS"
        title={
          <>
            A few cents.
            <br />
            <span>A different perspective.</span>
          </>
        }
        description="Explore how two electricity supply rates compare at your monthly usage. These editable numbers are examples, not live offers."
      />
      <section className="container savings-detail">
        <Calculator />
        <div>
          <Eyebrow>KNOW WHAT YOU’RE COMPARING</Eyebrow>
          <h2>
            The supply part
            <br />
            of the picture.
          </h2>
          <p>
            This tool compares electricity supply costs only. Your full bill
            includes other charges, and your usage can change from month to
            month.
          </p>
          <CheckList
            items={[
              "Use your actual monthly kWh",
              "Enter rates in cents per kWh",
              "Review fees and contract costs separately",
              "Treat the result as an illustration",
            ]}
          />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
