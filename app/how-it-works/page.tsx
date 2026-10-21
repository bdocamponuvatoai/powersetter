import type { Metadata } from "next";
import { Bill } from "@/components/bill";
import { BillNotes } from "@/components/sections/bill-notes";
import { Steps } from "@/components/sections/steps";
import { ButtonLink, FaqSection, FinalCta, PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "How it works",
  description: "How switching energy supplier works: your utility keeps delivering, you choose the supply plan.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro
        label="How it works"
        title="You do not need to be an energy expert"
        actions={<ButtonLink href="/compare">Get started</ButtonLink>}
      >
        <p>
          Start with your ZIP code, compare the whole plan, and switch when the details work for you. Your utility keeps
          delivering your energy either way.
        </p>
      </PageIntro>
      <Steps withLink={false} />
      <div className="bg-white">
        <div className="shell grid items-center gap-12 section-y lg:grid-cols-2 lg:gap-20">
          <Bill className="lg:max-w-[30rem]" />
          <BillNotes title="Only the supply line changes" layout="stack" />
        </div>
      </div>
      <FaqSection />
      <FinalCta />
    </>
  );
}
