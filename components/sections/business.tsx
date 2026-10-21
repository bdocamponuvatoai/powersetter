import { ButtonLink, Photo, TextLink } from "@/components/ui";
import { images } from "@/lib/images";

const details = [
  { title: "Your usage", text: "Recent bills show how much energy each location uses, and when." },
  { title: "Your terms", text: "Rate type, fees and the contract end date, side by side." },
  { title: "Your renewal", text: "Know the end date before the next plan is chosen for you." },
];

export function Business() {
  return (
    <section aria-labelledby="business-title" className="bg-sky">
      <div className="shell section-y">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <h2 id="business-title" data-reveal className="text-heading text-[2.25rem] sm:text-5xl">
              Energy for the business you are building
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              From a single storefront to several locations, compare electricity and natural gas supply around how your
              business actually runs.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ButtonLink href="/business">Business energy</ButtonLink>
              <TextLink href="/contact">Talk to the team</TextLink>
            </div>
          </div>
          <Photo image={images.business} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[3/2]" />
        </div>
        <ul className="mt-16 grid gap-8 border-t border-ink/15 pt-10 md:grid-cols-3">
          {details.map((detail) => (
            <li key={detail.title}>
              <h3 className="text-xl font-semibold">{detail.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{detail.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
