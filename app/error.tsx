"use client";

import { useEffect } from "react";
import { buttonClass } from "@/components/ui";
import { site } from "@/lib/site";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section data-hero className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <h1 className="max-w-3xl text-display text-[2.75rem] sm:text-6xl">Something went wrong on our side.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        Try again, or call{" "}
        <a href={site.phoneHref} className="tabular font-semibold text-ink underline">
          {site.phone}
        </a>
        .
      </p>
      <button type="button" onClick={reset} className={`${buttonClass("primary")} mt-10 self-start`}>
        Try again
      </button>
    </section>
  );
}
