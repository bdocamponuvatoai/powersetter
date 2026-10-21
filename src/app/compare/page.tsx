import type { Metadata } from "next";
import { Suspense } from "react";
import CompareWizard from "@/components/compare-wizard";
export const metadata: Metadata = { title: "Find your energy options" };
export default function ComparePage() {
  return (
    <section className="compare-page container">
      <div className="compare-aside">
        <span className="micro-label">MORE POWER TO YOU.</span>
        <h2>
          A good next step.
          <br />A brighter outlook.
        </h2>
        <p>
          A few simple questions.
          <br />A clearer place to start.
        </p>
        <div className="compare-aside-art" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <Suspense
        fallback={
          <div className="wizard-loading">
            Getting your starting point ready…
          </div>
        }
      >
        <CompareWizard />
      </Suspense>
    </section>
  );
}
