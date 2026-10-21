import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import { ButtonLink, Photo } from "@/components/ui";
import { articles } from "@/lib/content";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps<"/learn/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/learn/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description },
  };
}

export default async function ArticlePage({ params }: PageProps<"/learn/[slug]">) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return (
    <article className="pb-20 lg:pb-28">
      <header className="shell pt-10 pb-12 sm:pt-16">
        <Link href="/learn" className="inline-flex min-h-11 items-center gap-2 font-semibold text-blue-strong">
          <ArrowLeft size={17} />
          All guides
        </Link>
        <p className="mt-8 animate-rise mono-label text-muted">
          {article.category} · {article.minutes} min read
        </p>
        <h1 className="mt-4 max-w-4xl text-display text-[2.75rem] sm:text-6xl">{article.title}</h1>
        <p className="mt-6 max-w-2xl animate-rise text-xl leading-relaxed text-muted [animation-delay:160ms]">
          {article.description}
        </p>
      </header>
      <div className="shell">
        <Photo
          image={images[article.image]}
          sizes="(min-width: 1216px) 1152px, 100vw"
          className="aspect-[16/9] sm:aspect-[21/9]"
          preload
        />
      </div>
      <div className="shell mt-16 max-w-3xl">
        <ol className="space-y-12">
          {article.sections.map((section, index) => (
            <li key={section.heading} className="grid gap-4 sm:grid-cols-[3rem_1fr]">
              <span className="tabular text-display text-4xl text-blue" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h2 className="text-heading text-3xl">{section.heading}</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink/85">{section.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-16 border-t border-line pt-6 text-sm leading-relaxed text-muted">
          Based on {site.name}’s descriptions of its comparison and community solar services, reviewed October 2026.
          Each supplier’s offer and agreement sets the actual availability and terms.
        </p>
        <ButtonLink href="/compare" className="mt-8">
          Find my options
        </ButtonLink>
      </div>
    </article>
  );
}
