import type { Metadata } from "next";
import {
  PageIntro,
  ButtonLink,
  Eyebrow,
  FinalCTA,
  CheckList,
} from "@/components/ui";
import {
  Building2,
  ChartNoAxesCombined,
  CalendarDays,
  MapPinned,
  ArrowUpRight,
} from "lucide-react";
export const metadata: Metadata = { title: "Energy for business" };
export default function BusinessPage() {
  return (
    <>
      <PageIntro
        eyebrow="ENERGY FOR YOUR AMBITION"
        title={
          <>
            You’re building something.
            <br />
            <span>Let’s power the conversation.</span>
          </>
        }
        description="Bring energy decisions into your business planning. Start with your usage, your locations and the priorities behind your next move."
      >
        <ButtonLink href="/compare/?interest=business">
          Explore business options
        </ButtonLink>
      </PageIntro>
      <section className="container business-detail">
        <div className="business-detail-main">
          <Building2 size={44} />
          <h2>
            A clearer view
            <br />
            of your business energy.
          </h2>
          <p>
            PowerSetter serves businesses as well as households. A productive
            conversation starts with the details of how and where your business
            uses energy.
          </p>
          <a className="text-link" href="tel:+18008336952">
            Talk with the team
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="business-checklist">
          <Eyebrow>BRING THESE TO THE CONVERSATION</Eyebrow>
          {[
            {
              icon: ChartNoAxesCombined,
              title: "Recent energy usage",
              text: "Your recent bills and typical consumption.",
            },
            {
              icon: CalendarDays,
              title: "Current contract details",
              text: "Your rate, agreement and renewal date.",
            },
            {
              icon: MapPinned,
              title: "Your locations",
              text: "The utilities and service areas you operate in.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon />
              <span>
                <strong>{title}</strong>
                <p>{text}</p>
              </span>
            </div>
          ))}
        </div>
      </section>
      <section className="section container split-copy">
        <div>
          <Eyebrow>MAKE ROOM FOR BETTER QUESTIONS</Eyebrow>
          <h2>
            The right fit starts
            <br />
            with the full picture.
          </h2>
        </div>
        <div>
          <p className="lead">Every business has its own rhythm.</p>
          <p>
            Seasonal usage, operating hours, multiple locations and renewal
            timing can shape your energy needs. Discuss the complete offer and
            how its terms relate to your operation.
          </p>
          <CheckList
            items={[
              "Compare rates and contract terms together",
              "Review fees and renewal conditions",
              "Keep agreements and decision dates accessible",
            ]}
          />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
