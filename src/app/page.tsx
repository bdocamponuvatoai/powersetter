import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Sun,
  Zap,
  Leaf,
  Check,
  Building2,
  ArrowRight,
  Flame,
  SlidersHorizontal,
  CalendarDays,
  FileCheck2,
  ChartNoAxesCombined,
} from "lucide-react";
import QuickStart from "@/components/quick-start";
import EnergyExplorer from "@/components/energy-explorer";
import {
  ButtonLink,
  Eyebrow,
  TextLink,
  FAQ,
  FinalCTA,
  Steps,
  Photo,
} from "@/components/ui";
import { articles } from "@/lib/content";
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <Eyebrow>LESS GUESSWORK. MORE POSSIBILITY.</Eyebrow>
          <h1>
            Better energy.
            <br />
            On <span>your terms.</span>
          </h1>
          <p className="hero-description">
            Your home is full of possibilities.
            <br />
            Your energy should be, too. Explore electricity, gas and community
            solar with a clearer view.
          </p>
          <QuickStart />
          <div className="hero-bottom">
            <span className="hero-mini-icon">
              <Sun size={22} />
            </span>
            <p>
              A brighter outlook.
              <br />
              <strong>A little more power to you.</strong>
            </p>
            <Link href="/community-solar/" aria-label="Explore community solar">
              <ArrowUpRight size={22} />
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/assets/solar-home.webp"
            alt="Conceptual sunlit modern home, representing a brighter energy future"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 53vw"
          />
          <div className="hero-image-top">
            <span>
              <span className="status-dot" /> ENERGY FOR YOUR EVERYDAY
            </span>
            <Sun size={21} />
          </div>
          <div className="hero-float">
            <span className="float-icon">
              <Zap size={24} />
            </span>
            <div>
              <span>A BETTER START</span>
              <strong>
                More choice.
                <br />
                Less second-guessing.
              </strong>
            </div>
            <ArrowUpRight size={20} />
          </div>
          <span className="photo-caption">
            Energy concept imagery · Not a PowerSetter installation
          </span>
        </div>
      </section>
      <section className="trust-strip container">
        <p>
          Big on possibility.
          <br />
          <strong>Grounded in experience.</strong>
        </p>
        <div>
          <strong>
            250k<span>+</span>
          </strong>
          <p>customers served</p>
        </div>
        <div>
          <strong>
            40<span>+</span>
          </strong>
          <p>energy suppliers compared</p>
        </div>
        <div>
          <strong>2014</strong>
          <p>the year our story began</p>
        </div>
      </section>
      <section className="section container">
        <div className="section-head">
          <div>
            <Eyebrow>YOUR EVERYDAY, REENERGIZED</Eyebrow>
            <h2>
              Different needs.
              <br />
              Better possibilities.
            </h2>
          </div>
          <p>
            One place to get to know your options.
            <br />
            Choose the conversation that feels right for you.
          </p>
        </div>
        <EnergyExplorer />
      </section>
      <section className="community-feature">
        <div className="container community-feature-grid">
          <Photo
            src="/assets/community-solar.webp"
            alt="Illustrative shared solar farm in green countryside"
            className="community-feature-photo"
          />
          <div className="community-feature-copy">
            <Eyebrow>A LITTLE MORE SUNSHINE FOR EVERYONE</Eyebrow>
            <h2>
              Solar power.
              <br />
              <span>Minus the rooftop.</span>
            </h2>
            <p>
              You don’t need panels on your own roof to be part of something
              brighter. Explore community solar and what shared generation could
              mean for your household.
            </p>
            <div className="solar-benefits">
              <span>
                <Sun />
                Shared solar projects
              </span>
              <span>
                <Leaf />
                No rooftop installation
              </span>
            </div>
            <ButtonLink href="/community-solar/" variant="light">
              Get to know community solar
            </ButtonLink>
            <p className="fine-print">
              Eligibility and program terms depend on your location and utility.
            </p>
          </div>
        </div>
      </section>
      <section className="section container platform-clarity-section" aria-labelledby="platform-clarity-title">
        <div className="section-copy">
          <Eyebrow>WHAT POWERSETTER DOES</Eyebrow>
          <h2 id="platform-clarity-title">
            We compare energy.<br />
            You choose the plan.
          </h2>
          <p>
            PowerSetter is a digital energy comparison platform for people and
            businesses. Compare electricity and natural gas plans, find
            opportunities to lower your bills and explore renewable options.
          </p>
          <div className="platform-clarity-note">
            <SlidersHorizontal size={21} />
            <p><strong>A comparison platform, not a solar installer.</strong>
              We help you understand supplier plans and energy options.
              Community solar is one of those options—no rooftop installation required.
            </p>
          </div>
          <ButtonLink href="/compare/">Compare energy plans</ButtonLink>
        </div>
        <div className="platform-service-list">
          <p className="micro-label">THREE WAYS TO EXPLORE YOUR ENERGY OPTIONS</p>
          <Link href="/energy/" className="platform-service-row">
            <span className="platform-service-icon"><Zap size={25} /></span>
            <div><h3>Electricity plans</h3><p>Compare suppliers, supply rates and contract terms for your home or business.</p></div>
            <ArrowUpRight size={22} />
          </Link>
          <Link href="/energy/?type=gas" className="platform-service-row">
            <span className="platform-service-icon"><Flame size={25} /></span>
            <div><h3>Natural gas plans</h3><p>Explore gas suppliers and understand the rates, fees and conditions behind each plan.</p></div>
            <ArrowUpRight size={22} />
          </Link>
          <Link href="/community-solar/" className="platform-service-row">
            <span className="platform-service-icon renewable"><Leaf size={25} /></span>
            <div><h3>Renewable options</h3><p>Learn about community solar: participation in a shared project, without panels on your property.</p></div>
            <ArrowUpRight size={22} />
          </Link>
          <p className="fine-print">Plan and program availability depends on your location and utility.</p>
        </div>
      </section>
      <section className="process-section section">
        <div className="container">
          <div className="section-head">
            <div>
              <Eyebrow>IT STARTS WITH A LITTLE CLARITY</Eyebrow>
              <h2>
                Your next move,
                <br />
                made a little simpler.
              </h2>
            </div>
            <TextLink href="/how-it-works/">See how it works</TextLink>
          </div>
          <Steps />
        </div>
      </section>
      <section className="business-spotlight container" aria-labelledby="business-spotlight-title">
        <div className="business-spotlight-grid">
          <div className="business-spotlight-photo">
            <Image
              src="/assets/business-owner.webp"
              alt="Illustrative cafe owner reviewing a bill beside a laptop at her counter"
              fill
              sizes="(max-width: 850px) 100vw, 50vw"
            />
            <span className="business-photo-label">ILLUSTRATIVE BUSINESS SCENE</span>
            <div className="business-photo-caption">
              <span className="business-caption-icon"><Building2 size={24} /></span>
              <div><span>ELECTRICITY + NATURAL GAS</span><strong>Energy for your workday.<br />Clarity for your next move.</strong></div>
            </div>
          </div>
          <div className="business-spotlight-copy">
            <Eyebrow>FOR THE PEOPLE BUILDING WHAT’S NEXT</Eyebrow>
            <h2 id="business-spotlight-title">Big plans deserve<br /><span>a better energy plan.</span></h2>
            <p>From your first location to your next chapter, compare electricity and natural gas options around the way your business works.</p>
            <div className="business-service-line"><span><Zap size={17} />Electricity</span><span><Flame size={17} />Natural gas</span></div>
            <div className="business-spotlight-actions">
              <ButtonLink href="/business/" variant="blue">Explore business energy</ButtonLink>
              <TextLink href="/contact/">Talk to the team</TextLink>
            </div>
            <p className="business-comparison-note">Compare suppliers. Understand the details. Choose with confidence.</p>
          </div>
        </div>
        <div className="business-benefit-rail">
          <div><ChartNoAxesCombined size={24} /><span><strong>Put your usage in perspective</strong><p>Review supply costs around the energy your business uses.</p></span></div>
          <div><FileCheck2 size={24} /><span><strong>See the complete agreement</strong><p>Look at rates, contract terms and fees together.</p></span></div>
          <div><CalendarDays size={24} /><span><strong>Plan ahead for renewal</strong><p>Know your end date before choosing your next plan.</p></span></div>
        </div>
      </section>
      <section className="section container learn-section">
        <div className="section-head">
          <div>
            <Eyebrow>A LITTLE KNOWLEDGE GOES A LONG WAY</Eyebrow>
            <h2>
              Good questions.
              <br />
              Clearer answers.
            </h2>
          </div>
          <TextLink href="/learn/">Explore the energy journal</TextLink>
        </div>
        <div className="article-grid">
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
                  <ArrowUpRight size={19} />
                </span>
              </div>
              <div className="article-meta">
                <span>{a.category}</span>
                <span>{a.minutes} MIN READ</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <Eyebrow>LET’S CLEAR A FEW THINGS UP</Eyebrow>
          <h2>
            Wondering
            <br />
            about something?
          </h2>
          <p>
            We’re here for the questions,
            <br />
            big and small.
          </p>
          <TextLink href="/contact/">Talk to the team</TextLink>
        </div>
        <FAQ />
      </section>
      <FinalCTA />
    </>
  );
}
