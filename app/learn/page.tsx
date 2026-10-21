import type { Metadata } from "next";
import { GuideCards } from "@/components/sections/guides";
import { FaqSection, FinalCta, PageIntro } from "@/components/ui";

export const metadata: Metadata = {
  title: "Energy guides",
  description: "Plain-English guides to reading your bill, comparing plans and community solar.",
  alternates: { canonical: "/learn" },
};

export default function LearnPage() {
  return (
    <>
      <PageIntro label="Energy guides" title="Plain-English answers to energy questions">
        <p>Short guides for the decisions behind your bill. Start with the one you have always wondered about.</p>
      </PageIntro>
      <section aria-label="Guides" className="shell pb-20 lg:pb-28">
        <GuideCards headingLevel="h2" />
      </section>
      <FaqSection />
      <FinalCta />
    </>
  );
}
