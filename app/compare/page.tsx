import type { Metadata } from "next";
import { Suspense } from "react";
import { CompareWizard, CompareWizardFromParams } from "@/components/compare-wizard";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find my energy options",
  description: "Three quick questions to find where to start comparing electricity, natural gas or community solar.",
  alternates: { canonical: "/compare" },
};

export default function ComparePage() {
  return (
    <section data-hero className="shell grid gap-12 pt-10 pb-20 sm:pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:pb-28">
      <div>
        <h1 className="text-display text-[2.75rem] sm:text-6xl">Find my energy options</h1>
        <p className="mt-6 max-w-md animate-rise text-lg leading-relaxed text-muted [animation-delay:80ms]">
          Three quick questions point you to the right place to compare. Nothing you enter here is saved or sent.
        </p>
        <p className="mt-8 animate-rise text-muted [animation-delay:160ms]">
          Prefer to talk it through?{" "}
          <a href={site.phoneHref} className="tabular font-semibold whitespace-nowrap text-ink underline">
            Call {site.phone}
          </a>
        </p>
      </div>
      {/* The fallback is the same wizard without URL presets, so step one is in the static HTML. */}
      <Suspense fallback={<CompareWizard />}>
        <CompareWizardFromParams />
      </Suspense>
    </section>
  );
}
