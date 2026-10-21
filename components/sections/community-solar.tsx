import { ButtonLink, Checklist, Photo } from "@/components/ui";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export function CommunitySolar() {
  return (
    <section aria-labelledby="solar-title" className="shell section-y">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Photo
          image={images.solar}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] lg:aspect-[5/6]"
          position="object-[40%_50%]"
        />
        <div>
          <h2 id="solar-title" data-reveal className="text-heading text-[2.25rem] sm:text-5xl">
            Solar power, without panels on your roof
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Community solar lets eligible customers take part in a shared solar project instead of installing equipment
            at home. {site.name}’s enrollment options include programs for qualifying low-income households.
          </p>
          <Checklist
            className="mt-8"
            items={[
              "No equipment on your property",
              "Programs depend on your state and utility",
              "Read how credits, charges and cancellation work",
            ]}
          />
          <ButtonLink href="/community-solar" variant="dark" className="mt-10">
            How community solar works
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
