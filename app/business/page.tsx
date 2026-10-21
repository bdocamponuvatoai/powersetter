import type { Metadata } from "next";
import { ButtonLink, CallLink, Checklist, FinalCta, PageIntro, Photo, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Business energy",
  description: "Compare electricity and natural gas supply for one business location or several.",
  alternates: { canonical: "/business" },
};

const bring = [
  { title: "Recent bills", text: "Twelve months if you have them, so seasonal usage is visible." },
  { title: "Current contract", text: "Your rate, rate type, fees and the contract end date." },
  { title: "Your locations", text: "Each service address and the utility that serves it." },
];

export default function BusinessPage() {
  return (
    <>
      <PageIntro
        label="Business energy"
        title="Plan your energy like the rest of the business"
        actions={
          <>
            <ButtonLink href="/compare?interest=business">Explore business options</ButtonLink>
            <CallLink />
          </>
        }
      >
        <p>
          {site.name} serves businesses as well as households. Compare electricity and natural gas supply around how and
          where your business uses energy.
        </p>
      </PageIntro>

      <section aria-labelledby="bring-title" className="bg-sky">
        <div className="shell grid items-center gap-12 section-y lg:grid-cols-2 lg:gap-20">
          <Photo image={images.business} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3]" preload />
          <div>
            <SectionHeading id="bring-title" title="What to have ready" />
            <dl className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
              {bring.map((item) => (
                <div key={item.title} className="py-5">
                  <dt className="text-xl font-semibold">{item.title}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="fit-title" className="shell grid gap-10 section-y lg:grid-cols-2 lg:gap-20">
        <SectionHeading id="fit-title" title="The right plan fits how you operate">
          <p>
            Seasonal demand, opening hours, several sites and renewal timing all shape which offer makes sense. Look at
            the complete agreement, not only the rate.
          </p>
        </SectionHeading>
        <Checklist
          className="text-lg lg:pt-3"
          items={[
            "Compare rates and contract terms together",
            "Review fees, cancellation and renewal conditions",
            "Keep every agreement and end date in one place",
            `Ask ${site.name} to remind you before a contract ends`,
          ]}
        />
      </section>

      <FinalCta />
    </>
  );
}
