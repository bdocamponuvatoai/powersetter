import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Plus, Sun, Check } from "lucide-react";
import { faqs } from "@/lib/content";

export function ButtonLink({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "blue" | "light" | "outline";
  className?: string;
}) {
  return (
    <Link href={href} className={`button button-${variant} ${className}`}>
      <span>{children}</span>
      <ArrowUpRight size={19} />
    </Link>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function FAQ({ limit = 5 }: { limit?: number }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map((faq, i) => (
        <details key={faq.q}>
          <summary>
            <span className="faq-num">0{i + 1}</span>
            <span>{faq.q}</span>
            <Plus size={19} />
          </summary>
          <p>{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
export function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-grid">
        <div>
          <Eyebrow>THE NEXT MOVE IS YOURS</Eyebrow>
          <h2>
            Good energy starts
            <br />
            with a better choice.
          </h2>
          <p>Find a little clarity. Make a little room for possibility.</p>
          <ButtonLink href="/compare/" variant="light">
            Explore my options
          </ButtonLink>
        </div>
        <div className="cta-sun" aria-hidden="true">
          <Sun strokeWidth={0.65} />
          <span>
            MORE POWER
            <br />
            TO YOU.
          </span>
        </div>
      </div>
    </section>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-intro container">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <div className="intro-bottom">
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}
export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={16} />
          {item}
        </li>
      ))}
    </ul>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  caption = true,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  caption?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 700px) 100vw, 55vw"
        priority={priority}
      />
      {caption && (
        <span className="photo-caption">Illustrative concept imagery</span>
      )}
    </div>
  );
}
export function Steps() {
  return (
    <div className="steps-grid">
      {[
        {
          n: "01",
          title: "Tell us about your place.",
          text: "Start with your ZIP code, service and whether you’re exploring for a home or a business.",
        },
        {
          n: "02",
          title: "Get a clearer picture.",
          text: "Compare the full picture: supply rates, terms, fees and what matters to your energy needs.",
        },
        {
          n: "03",
          title: "Make your next move.",
          text: "Review the complete provider offer before enrolling. Choose when the details work for you.",
        },
      ].map((step) => (
        <article key={step.n}>
          <div className="step-top">
            <span>{step.n}</span>
            <ArrowRight size={24} />
          </div>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </article>
      ))}
    </div>
  );
}
