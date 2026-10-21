import type { Metadata } from "next";
import { ButtonLink, TextLink } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section data-hero className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <p className="mono-label text-muted">404</p>
      <h1 className="mt-5 max-w-3xl text-display text-[2.75rem] sm:text-7xl">This page is not on the bill.</h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        The link may be old, or the address mistyped. Everything else is where you left it.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ButtonLink href="/">Back to the homepage</ButtonLink>
        <TextLink href="/compare">Find my options</TextLink>
      </div>
    </section>
  );
}
