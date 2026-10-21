import type { Metadata } from "next";
import {
  PageIntro,
  ButtonLink,
  Eyebrow,
  FAQ,
  FinalCTA,
  Photo,
  CheckList,
} from "@/components/ui";
import { Sun, House, Users } from "lucide-react";
export const metadata: Metadata = { title: "Community solar" };
export default function SolarPage() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR SHARE OF SOMETHING BRIGHTER"
        title={
          <>
            The sun is for everyone.
            <br />
            <span>Let’s open up the possibilities.</span>
          </>
        }
        description="Community solar offers eligible customers a way to participate in shared solar generation without an installation on their own roof."
      >
        <ButtonLink href="/compare/?interest=solar">
          Explore community solar
        </ButtonLink>
      </PageIntro>
      <div className="container wide-photo-wrap">
        <Photo
          src="/assets/community-solar.webp"
          alt="Illustrative community solar field in open countryside"
          className="wide-photo"
          priority
        />
      </div>
      <section className="section container split-copy">
        <div>
          <Eyebrow>A DIFFERENT WAY TO GO SOLAR</Eyebrow>
          <h2>
            One shared project.
            <br />
            More people in the picture.
          </h2>
        </div>
        <div>
          <p className="lead">Your roof doesn’t have to do the work.</p>
          <p>
            PowerSetter helps people explore community solar enrollment,
            including options for qualifying low-income households. Availability
            and participation requirements are specific to the program and
            utility.
          </p>
          <CheckList
            items={[
              "Explore programs for your location",
              "Review how credits and charges work",
              "Understand participation and cancellation terms",
            ]}
          />
        </div>
      </section>
      <section className="soft-section section">
        <div className="container">
          <div className="section-head">
            <div>
              <Eyebrow>ASK THE RIGHT QUESTIONS</Eyebrow>
              <h2>Your solar starting point.</h2>
            </div>
          </div>
          <div className="info-grid">
            {[
              {
                icon: Sun,
                title: "What is available?",
                text: "Check the projects and programs available in your utility territory.",
              },
              {
                icon: House,
                title: "Am I eligible?",
                text: "Understand household, location and utility requirements before applying.",
              },
              {
                icon: Users,
                title: "How does it work?",
                text: "Review the credits, costs, billing arrangements and complete agreement.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={30} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>A LITTLE MORE UNDERSTANDING</Eyebrow>
          <h2>
            Curious about
            <br />
            community solar?
          </h2>
        </div>
        <FAQ limit={3} />
      </section>
      <FinalCTA />
    </>
  );
}
