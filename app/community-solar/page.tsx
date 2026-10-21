import type { Metadata } from "next";
import { ButtonLink, Checklist, FaqSection, FinalCta, PageIntro, Photo, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community solar",
  description:
    "Take part in a shared solar project without installing panels at home, including programs for qualifying low-income households.",
  alternates: { canonical: "/community-solar" },
};

const questions = [
  { title: "Is there a project near me?", text: "Projects and programs depend on your state and utility territory." },
  { title: "Am I eligible?", text: "Check the household, location and utility requirements before you apply." },
  { title: "How does billing work?", text: "Ask how credits and charges appear on your bill, and how to cancel." },
];

export default function CommunitySolarPage() {
  return (
    <>
      <PageIntro
        label="Community solar"
        title="A share of local solar, with nothing on your roof"
        actions={<ButtonLink href="/compare?interest=solar">Explore community solar</ButtonLink>}
      >
        <p>
          Community solar lets eligible customers take part in a shared solar project instead of installing equipment at
          home. {site.name} helps people enroll, including in programs for qualifying low-income households.
        </p>
      </PageIntro>

      <div className="shell">
        <Photo
          image={images.solar}
          sizes="(min-width: 1216px) 1152px, 100vw"
          className="aspect-[16/9] sm:aspect-[21/9]"
          preload
        />
      </div>

      <section aria-labelledby="how-solar-title" className="shell grid gap-10 section-y lg:grid-cols-2 lg:gap-20">
        <SectionHeading id="how-solar-title" title="How it differs from rooftop solar">
          <p>
            With rooftop solar you buy or lease equipment for your own home. With community solar you subscribe to part
            of a larger project, so there is nothing to install or maintain.
          </p>
        </SectionHeading>
        <Checklist
          className="text-lg lg:pt-3"
          items={[
            "No equipment on your property",
            "Programs vary by state and utility",
            "Credits, charges and cancellation terms vary by program",
            "Check whether moving house affects your participation",
          ]}
        />
      </section>

      <section aria-labelledby="questions-title" className="bg-white">
        <div className="shell section-y">
          <SectionHeading id="questions-title" title="Three questions to ask first" />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {questions.map((question, index) => (
              <li key={question.title} className="border-t-2 border-ink pt-6">
                <span className="mono-label text-muted">Question {index + 1}</span>
                <h3 className="mt-3 text-heading text-2xl">{question.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{question.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection limit={4} title="Community solar questions" />
      <FinalCta />
    </>
  );
}
