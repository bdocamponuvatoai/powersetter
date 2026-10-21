import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Photo, SectionHeading } from "@/components/ui";
import { services } from "@/lib/content";
import { images } from "@/lib/images";

export function Services() {
  return (
    <section aria-labelledby="services-title" className="bg-white">
      <div className="shell grid gap-12 section-y lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading id="services-title" title="What you can compare">
            <p>One place for the supply side of your energy, at home and at work.</p>
          </SectionHeading>
          <Photo
            image={images.home}
            sizes="(min-width: 1024px) 40vw, 1px"
            className="mt-10 aspect-[4/3] max-lg:hidden"
          />
        </div>
        <ul className="border-t border-line">
          {services.map((service) => (
            <li key={service.id} className="border-b border-line">
              <Link
                href={service.href}
                className="group grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-2 py-7 sm:py-9"
              >
                <h3 className="text-heading text-[1.75rem] transition-colors group-hover:text-blue-strong sm:text-4xl">
                  {service.title}
                </h3>
                <span className="row-span-2 mt-1 grid size-11 place-items-center rounded-full ring-1 ring-ink/20 transition-[background-color,color] group-hover:bg-blue group-hover:text-white group-hover:ring-blue">
                  <ArrowRight size={18} />
                </span>
                <p className="max-w-lg leading-relaxed text-muted">{service.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
