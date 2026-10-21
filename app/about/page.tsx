import type { Metadata } from "next";
import { Proof } from "@/components/sections/proof";
import { ButtonLink, FinalCta, PageIntro, Photo, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a digital energy comparison platform for homes and businesses, founded in ${site.founded}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        label={`About ${site.name}`}
        title="No one should overpay for electricity"
        actions={<ButtonLink href="/contact">Contact the team</ButtonLink>}
      >
        <p>
          {site.name} was co-founded on that belief. Since {site.founded} it has helped households and businesses
          compare energy suppliers instantly, the way people compare hotel rates.
        </p>
      </PageIntro>
      <Proof />
      <section
        aria-labelledby="platform-title"
        className="shell grid items-center gap-12 section-y lg:grid-cols-2 lg:gap-20"
      >
        <Photo image={images.solar} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3]" />
        <div>
          <SectionHeading id="platform-title" title="A comparison platform for homes and businesses">
            <p>
              {site.name}’s digital platform helps residential and business customers compare electricity and natural
              gas suppliers. It also helps customers enroll in community solar programs, including options for
              qualifying low-income households.
            </p>
            <p className="mt-4">
              Tell {site.name} when your contract ends and they will remind you to compare again before it renews.
            </p>
          </SectionHeading>
          <address className="mt-10 border-l-2 border-highlight pl-5 leading-relaxed not-italic">
            <span className="font-semibold">{site.name}</span>
            <br />
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
          </address>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
