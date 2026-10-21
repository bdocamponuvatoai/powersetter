import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, FAQ, Eyebrow, FinalCTA } from "@/components/ui";
import { articles } from "@/lib/content";
export const metadata: Metadata = { title: "Energy explained" };
export default function LearnPage() {
  return (
    <>
      <PageIntro
        eyebrow="THE ENERGY JOURNAL"
        title={
          <>
            Good questions.
            <br />
            <span>A little more understanding.</span>
          </>
        }
        description="Plain-language guides for the decisions that power your everyday. Start with the things you’ve always wanted to understand."
      />
      <section className="container article-grid journal-grid">
        {articles.map((a) => (
          <Link
            href={`/learn/${a.slug}/`}
            className="article-card"
            key={a.slug}
          >
            <div className="article-image">
              <Image
                src={a.image}
                alt="Illustrative energy concept"
                fill
                sizes="(max-width:700px) 100vw, 33vw"
              />
              <span>
                <ArrowUpRight size={20} />
              </span>
            </div>
            <div className="article-meta">
              <span>{a.category}</span>
              <span>{a.minutes} MIN READ</span>
            </div>
            <h2>{a.title}</h2>
            <p>{a.description}</p>
          </Link>
        ))}
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>A FEW THINGS PEOPLE ASK</Eyebrow>
          <h2>
            Let’s clear
            <br />
            the air.
          </h2>
        </div>
        <FAQ />
      </section>
      <FinalCTA />
    </>
  );
}
