import Image from "next/image";
import Link from "next/link";
import { SectionHeading, TextLink } from "@/components/ui";
import { articles } from "@/lib/content";
import { images } from "@/lib/images";

export function GuideCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={`/learn/${article.slug}`} className="group block">
            <div className="relative aspect-[3/2] overflow-hidden rounded-[1.25rem] bg-paper-deep">
              <Image
                src={images[article.image].src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                placeholder="blur"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-5 mono-label text-muted">
              {article.category} · {article.minutes} min read
            </p>
            <Heading className="mt-2 text-heading text-2xl transition-colors group-hover:text-blue-strong">
              {article.title}
            </Heading>
            <p className="mt-2 leading-relaxed text-muted">{article.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Guides() {
  return (
    <section aria-labelledby="guides-title" className="border-t border-line">
      <div className="shell section-y">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="guides-title" title="Plain-English energy guides" />
          <TextLink href="/learn">All guides</TextLink>
        </div>
        <GuideCards />
      </div>
    </section>
  );
}
