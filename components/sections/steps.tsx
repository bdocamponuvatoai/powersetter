import { SectionHeading, TextLink } from "@/components/ui";
import { steps } from "@/lib/content";

export function Steps({ withLink = true }: { withLink?: boolean }) {
  return (
    <section aria-labelledby="steps-title" className="shell section-y">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="steps-title" title="How switching works" />
        {withLink ? <TextLink href="/how-it-works">More on how it works</TextLink> : null}
      </div>
      <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.25rem] bg-line ring-1 ring-line md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="bg-paper p-7 sm:p-9">
            <span className="tabular text-display text-6xl text-blue">{index + 1}</span>
            <h3 className="mt-8 text-heading text-2xl">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
