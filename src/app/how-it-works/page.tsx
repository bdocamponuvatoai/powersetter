import type { Metadata } from "next";
import {
  PageIntro,
  ButtonLink,
  Eyebrow,
  Steps,
  FAQ,
  FinalCTA,
  Photo,
} from "@/components/ui";
export const metadata: Metadata = { title: "How it works" };
export default function HowPage() {
  return (
    <>
      <PageIntro
        eyebrow="FROM CURIOUS TO CONFIDENT"
        title={
          <>
            Less guesswork.
            <br />
            <span>More forward.</span>
          </>
        }
        description="You don’t need to be an energy expert. Start with a few details, understand your options and take the next step when you’re ready."
      >
        <ButtonLink href="/compare/">Let’s get started</ButtonLink>
      </PageIntro>
      <section className="container how-steps">
        <Steps />
      </section>
      <section className="section container image-copy">
        <Photo
          src="/assets/evening-home.webp"
          alt="Illustrative comfortable home at dusk"
        />
        <div>
          <Eyebrow>YOUR DECISION, YOUR PACE</Eyebrow>
          <h2>
            Good decisions
            <br />
            start with good details.
          </h2>
          <p>
            Have your current bill and agreement nearby. Review the full terms
            of any plan before enrolling, and keep the contract end date
            somewhere easy to find.
          </p>
          <ButtonLink href="/learn/compare-energy-plans/" variant="outline">
            Your comparison checklist
          </ButtonLink>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>LET’S MAKE IT CLEAR</Eyebrow>
          <h2>
            A few answers
            <br />
            before you begin.
          </h2>
        </div>
        <FAQ />
      </section>
      <FinalCTA />
    </>
  );
}
