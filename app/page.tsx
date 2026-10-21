import type { Metadata } from "next";
import { BillNotes } from "@/components/sections/bill-notes";
import { Business } from "@/components/sections/business";
import { CommunitySolar } from "@/components/sections/community-solar";
import { Coverage } from "@/components/sections/coverage";
import { Guides } from "@/components/sections/guides";
import { Hero } from "@/components/sections/hero";
import { Proof } from "@/components/sections/proof";
import { Services } from "@/components/sections/services";
import { Steps } from "@/components/sections/steps";
import { FaqSection, FinalCta } from "@/components/ui";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <BillNotes />
      <Services />
      <Coverage />
      <CommunitySolar />
      <Business />
      <Steps />
      <Guides />
      <FaqSection />
      <FinalCta />
    </>
  );
}
