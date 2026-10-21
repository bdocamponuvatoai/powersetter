import type { Metadata } from "next";
import {
  PageIntro,
  Eyebrow,
  Photo,
  FinalCTA,
  ButtonLink,
} from "@/components/ui";
export const metadata: Metadata = { title: "About PowerSetter" };
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="MORE CHOICE. MORE UNDERSTANDING."
        title={
          <>
            A better energy conversation.
            <br />
            <span>That’s where we started.</span>
          </>
        }
        description="Since 2014, PowerSetter has helped people explore energy choices with a simple idea: comparing your options should feel clearer."
      >
        <ButtonLink href="/contact/">Get in touch</ButtonLink>
      </PageIntro>
      <section className="container about-metrics">
        <div>
          <strong>250,000+</strong>
          <p>customers served</p>
        </div>
        <div>
          <strong>40+</strong>
          <p>suppliers compared</p>
        </div>
        <div>
          <strong>Since 2014</strong>
          <p>helping people explore their options</p>
        </div>
      </section>
      <section className="section container image-copy">
        <Photo
          src="/assets/community-solar.webp"
          alt="Illustrative shared solar landscape"
        />
        <div>
          <Eyebrow>LOOKING AT ENERGY A LITTLE DIFFERENTLY</Eyebrow>
          <h2>
            Put understanding
            <br />
            before the decision.
          </h2>
          <p>
            PowerSetter’s digital platform helps residential and business
            customers compare electricity and gas suppliers. It also helps
            customers explore community solar programs, including options for
            qualifying low-income households.
          </p>
          <p>
            The goal is a clearer view of your options, from your first
            question to your next decision.
          </p>
          <p className="fine-print">
            Company figures are reported on PowerSetter’s current website.
          </p>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
