import { Bill } from "@/components/bill";
import { QuickStart } from "@/components/quick-start";

export function Hero() {
  return (
    <section data-hero aria-labelledby="hero-title" className="overflow-x-clip">
      <div className="shell grid items-center gap-14 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <h1 id="hero-title" className="text-display text-[3rem] sm:text-7xl lg:text-[5.25rem]">
            Your utility delivers it. <span className="highlighter">You choose who supplies it.</span>
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-muted [animation-delay:100ms] sm:text-xl">
            Compare electricity and natural gas plans from more than 40 suppliers, or join a community solar project.
            For your home or your business.
          </p>
          <QuickStart className="mt-9 animate-rise [animation-delay:200ms]" />
        </div>
        <Bill className="animate-rise [animation-delay:300ms] lg:ml-auto lg:max-w-[30rem]" />
      </div>
    </section>
  );
}
