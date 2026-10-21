import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowUp, Phone } from "lucide-react";
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="PowerSetter home">
              <Image
                src="/assets/powersetter-logo.png"
                width={220}
                height={41}
                alt="PowerSetter"
              />
            </Link>
            <p>
              A better energy future.
              <br />A little more power to you.
            </p>
            <a className="footer-phone" href="tel:+18008336952">
              <Phone size={16} />
              (800) 833-6952
            </a>
          </div>
          <div>
            <h3>Your energy</h3>
            <Link href="/energy/">Electricity & gas</Link>
            <Link href="/community-solar/">Community solar</Link>
            <Link href="/business/">For business</Link>
            <Link href="/compare/">Explore options</Link>
          </div>
          <div>
            <h3>Get to know us</h3>
            <Link href="/about/">About PowerSetter</Link>
            <Link href="/how-it-works/">How it works</Link>
            <Link href="/learn/">Energy explained</Link>
            <Link href="/contact/">Get in touch</Link>
          </div>
          <div>
            <h3>A little clarity</h3>
            <Link href="/savings/">Supply cost calculator</Link>
            <Link href="/learn/read-your-energy-bill/">
              Understand your bill
            </Link>
            <Link href="/learn/community-solar-explained/">
              Solar, explained
            </Link>
            <a
              href="https://www.powersetter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Current website <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 PowerSetter · Design concept by Nuvato</span>
          <div>
            <a
              href="https://www.powersetter.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy policy
            </a>
            <a
              href="https://www.powersetter.com/terms-and-conditions/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of service
            </a>
          </div>
          <a href="#top">
            Back to top <ArrowUp size={12} />
          </a>
        </div>
        <p className="concept-disclosure">
          Private design preview. Brand and imagery are proposed concepts.
          Company figures are reported by PowerSetter. Live rate lookup and
          enrollment are not connected; no form entries are sent from this
          preview.
        </p>
      </div>
    </footer>
  );
}
