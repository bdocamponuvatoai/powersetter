import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Phone, Plus } from "@/components/icons";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "primary" | "dark" | "light" | "outline" | "outline-light";

export function buttonClass(variant: ButtonVariant = "primary") {
  return cx(
    "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 active:translate-y-px",
    variant === "primary" && "bg-blue text-white hover:bg-blue-strong",
    variant === "dark" && "bg-ink text-white hover:bg-ink-raised",
    variant === "light" && "bg-white text-ink hover:bg-highlight",
    variant === "outline" && "text-ink ring-1 ring-ink/25 ring-inset hover:bg-ink hover:text-white",
    variant === "outline-light" && "text-white ring-1 ring-white/40 ring-inset hover:bg-white hover:text-ink",
  );
}

export function ButtonLink({
  href,
  children,
  variant,
  className,
}: {
  href: Route;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} className={cx(buttonClass(variant), className)}>
      {children}
      <ArrowRight size={18} />
    </Link>
  );
}

export function CallLink({ variant = "outline", className }: { variant?: ButtonVariant; className?: string }) {
  return (
    <a href={site.phoneHref} className={cx(buttonClass(variant), "tabular", className)}>
      <Phone size={18} />
      {site.phone}
    </a>
  );
}

export function TextLink({ href, children, className }: { href: Route; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cx(
        "group inline-flex min-h-11 items-center gap-2 font-semibold text-blue-strong underline decoration-blue/30 decoration-2 underline-offset-[6px] transition-colors hover:decoration-blue-strong",
        className,
      )}
    >
      {children}
      <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight size={14} className="ml-1 inline-block align-[-2px]" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Photo({
  image,
  sizes,
  className,
  preload = false,
  position,
}: {
  image: { src: StaticImageData; alt: string };
  sizes: string;
  className?: string;
  preload?: boolean;
  position?: string;
}) {
  return (
    <figure className={cx("relative overflow-hidden rounded-[1.25rem] bg-paper-deep", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        className={cx("object-cover", position)}
      />
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 mono-label text-[0.72rem] text-white backdrop-blur-sm">
        Illustrative image
      </figcaption>
    </figure>
  );
}

export function SectionHeading({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("max-w-2xl", className)}>
      <h2 id={id} data-reveal className="text-heading text-[2.25rem] sm:text-5xl">
        {title}
      </h2>
      {children ? <div className="mt-5 text-lg leading-relaxed text-muted">{children}</div> : null}
    </div>
  );
}

export function PageIntro({
  label,
  title,
  children,
  actions,
}: {
  label: string;
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="shell pt-12 pb-14 sm:pt-20 sm:pb-20">
      <p className="animate-rise mono-label text-muted">{label}</p>
      <h1 className="mt-5 max-w-4xl text-display text-[2.75rem] sm:text-7xl">{title}</h1>
      <div className="mt-7 max-w-2xl animate-rise text-lg leading-relaxed text-muted [animation-delay:160ms] sm:text-xl">
        {children}
      </div>
      {actions ? <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">{actions}</div> : null}
    </section>
  );
}

export function Checklist({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cx("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-highlight text-ink">
            <Check size={14} strokeWidth={2.4} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Faq({ limit, className }: { limit?: number; className?: string }) {
  return (
    <div className={cx("divide-y divide-line border-y border-line", className)}>
      {faqs.slice(0, limit).map((faq) => (
        <details key={faq.q} className="group">
          <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-lg font-semibold">
            {faq.q}
            <span className="grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-ink/20 transition-transform duration-300 group-open:rotate-45">
              <Plus size={18} />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-muted">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ limit, title = "Questions people ask" }: { limit?: number; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="shell grid gap-10 section-y lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <SectionHeading id="faq-title" title={title}>
        <p>
          Still unsure? Call PowerSetter on{" "}
          <a href={site.phoneHref} className="tabular font-semibold whitespace-nowrap text-ink underline">
            {site.phone}
          </a>
          .
        </p>
      </SectionHeading>
      <Faq limit={limit} />
    </section>
  );
}

export function FinalCta() {
  return (
    <section aria-labelledby="final-cta-title" className="bg-ink text-white">
      <div className="shell grid items-end gap-10 section-y lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 id="final-cta-title" data-reveal className="text-display text-[2.6rem] sm:text-6xl">
            Same utility. <span className="text-highlight">Your choice of supplier.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-dark">
            Start with your ZIP code, or talk it through with the PowerSetter team.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <ButtonLink href="/compare" variant="light">
            Find my options
          </ButtonLink>
          <CallLink variant="outline-light" />
        </div>
      </div>
    </section>
  );
}
