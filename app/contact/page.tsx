import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone } from "@/components/icons";
import { PageIntro } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${site.name} on ${site.phone} or write to the team.`,
  alternates: { canonical: "/contact" },
};

const tileClass =
  "group flex min-h-64 flex-col justify-between rounded-[1.5rem] p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9";

export default function ContactPage() {
  return (
    <>
      <PageIntro label="Contact" title="Big question or small, talk to a person">
        <p>
          Whether it is a plan, community solar or energy for your business, the team can help you find a starting
          point.
        </p>
      </PageIntro>
      <section aria-label="Ways to get in touch" className="shell grid gap-4 pb-20 md:grid-cols-3 lg:pb-28">
        <a href={site.phoneHref} className={`${tileClass} bg-blue text-white`}>
          <Phone size={30} />
          <span>
            <span className="block text-white">Call</span>
            <span className="tabular mt-2 block text-heading text-3xl">{site.phone}</span>
          </span>
        </a>
        <a
          href={site.contactForm}
          target="_blank"
          rel="noopener noreferrer"
          className={`${tileClass} bg-white ring-1 ring-line`}
        >
          <ArrowUpRight size={30} />
          <span>
            <span className="block text-muted">Write to the team</span>
            <span className="mt-2 block text-heading text-3xl">Contact form</span>
            <span className="sr-only"> (opens {site.name}’s current site in a new tab)</span>
          </span>
        </a>
        <Link href="/compare" className={`${tileClass} bg-ink text-white`}>
          <ArrowRight size={30} />
          <span>
            <span className="block text-muted-dark">Not sure where to start?</span>
            <span className="mt-2 block text-heading text-3xl">Find my options</span>
          </span>
        </Link>
        <address className="leading-relaxed text-muted not-italic md:col-span-3">
          {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode} · Fax{" "}
          <span className="tabular">{site.fax}</span>
        </address>
      </section>
    </>
  );
}
