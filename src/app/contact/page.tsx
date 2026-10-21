import type { Metadata } from "next";
import { PageIntro, ButtonLink, Eyebrow } from "@/components/ui";
import { Phone, ArrowUpRight, MessageCircle, MapPin } from "lucide-react";
export const metadata: Metadata = { title: "Get in touch" };
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="A REAL CONVERSATION STARTS HERE"
        title={
          <>
            Big question?
            <br />
            <span>Small question? Let’s talk.</span>
          </>
        }
        description="Whether you’re curious about a plan, exploring shared solar or thinking about your business, the next step starts with a conversation."
      />
      <section className="container contact-grid">
        <a href="tel:+18008336952" className="contact-tile blue">
          <Phone size={30} />
          <span>GIVE US A CALL</span>
          <h2>(800) 833-6952</h2>
          <p>Talk through your energy questions.</p>
          <ArrowUpRight size={28} />
        </a>
        <a
          href="https://www.powersetter.com/contact-us/"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-tile"
        >
          <MessageCircle size={30} />
          <span>WRITE TO THE TEAM</span>
          <h2>Start a conversation.</h2>
          <p>Use PowerSetter’s current contact page.</p>
          <ArrowUpRight size={28} />
        </a>
      </section>
      <section className="section container split-copy">
        <div>
          <Eyebrow>NOT SURE WHERE TO START?</Eyebrow>
          <h2>
            Let your priorities
            <br />
            point the way.
          </h2>
        </div>
        <div>
          <p className="lead">A few details are all you need.</p>
          <p>
            Choose electricity, natural gas, community solar or business energy.
            Our preview helps organize your starting point before you continue
            with PowerSetter.
          </p>
          <ButtonLink href="/compare/">Explore my options</ButtonLink>
        </div>
      </section>
    </>
  );
}
