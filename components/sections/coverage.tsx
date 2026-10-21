import { CoverageMap } from "@/components/coverage-map";
import { stateNames } from "@/lib/energy";
import { site } from "@/lib/site";

export function Coverage() {
  return (
    <section aria-labelledby="coverage-title" className="bg-ink text-white">
      <div className="shell grid items-start gap-14 section-y lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <h2 id="coverage-title" data-reveal className="text-heading text-[2.25rem] sm:text-5xl">
            Where you can choose
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-dark">
            Energy choice exists where states have opened supply to competition. {site.name} lists these states, and
            serves others too.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2">
            {site.listedStates.map((state) => (
              <li key={state} className="flex items-center gap-3">
                <span className="size-2.5 shrink-0 rounded-full bg-highlight" aria-hidden="true" />
                {stateNames[state]}
              </li>
            ))}
          </ul>
        </div>
        <CoverageMap />
      </div>
    </section>
  );
}
