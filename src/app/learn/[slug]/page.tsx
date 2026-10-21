import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/content";
import { Photo, ButtonLink } from "@/components/ui";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: articles.find((a) => a.slug === slug)?.title ?? "Energy journal",
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <article className="article-page container">
      <Link className="article-back" href="/learn/">
        <ArrowLeft size={16} />
        Energy journal
      </Link>
      <div className="article-title">
        <p className="eyebrow">
          {article.category} · {article.minutes} MIN READ
        </p>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
      </div>
      <Photo
        className="article-hero"
        src={article.image}
        alt="Illustrative energy concept"
        priority
      />
      <div className="article-body">
        {article.sections.map((s, i) => (
          <section key={s.heading}>
            <span>0{i + 1}</span>
            <div>
              <h2>{s.heading}</h2>
              <p>{s.text}</p>
            </div>
          </section>
        ))}
        <div className="article-source">
          <p>
            Based on PowerSetter’s descriptions of its energy comparison and
            community solar services. Reviewed October 21, 2026. Specific offers
            and agreements govern availability and terms.
          </p>
          <a
            href="https://www.powersetter.com/about-us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            About PowerSetter
            <ArrowUpRight size={14} />
          </a>
        </div>
        <ButtonLink href="/compare/">Explore my next step</ButtonLink>
      </div>
    </article>
  );
}
