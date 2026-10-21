import Image from "next/image";
import Link from "next/link";
import logoLight from "@/assets/images/powersetter-logo-light.png";
import { ExternalLink } from "@/components/ui";
import { footerNavigation, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink-deep pb-24 text-white sm:pb-0">
      <div className="shell grid gap-12 pt-16 pb-10 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="-m-2 inline-block p-2" aria-label={`${site.name} home`}>
            <Image src={logoLight} alt="" className="h-7 w-auto" sizes="180px" />
          </Link>
          <p className="mt-6 max-w-xs leading-relaxed text-muted-dark">{site.tagline}</p>
          <a href={site.phoneHref} className="tabular mt-6 inline-flex min-h-11 items-center text-2xl font-semibold">
            {site.phone}
          </a>
          <address className="mt-2 leading-relaxed text-muted-dark not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
          </address>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNavigation.map((group) => (
            <div key={group.title}>
              <h2 className="mono-label text-muted-dark">{group.title}</h2>
              <ul className="mt-4 space-y-1">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center hover:text-highlight">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="shell py-8 text-sm text-muted-dark">
        <div className="flex flex-col gap-4 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Founded {site.founded}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            <li>
              <ExternalLink href={site.privacyPolicy} className="inline-flex min-h-11 items-center hover:text-white">
                Privacy policy
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={site.terms} className="inline-flex min-h-11 items-center hover:text-white">
                Terms of service
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={site.reviews} className="inline-flex min-h-11 items-center hover:text-white">
                Customer reviews
              </ExternalLink>
            </li>
          </ul>
        </div>
        <p className="mt-6 max-w-3xl leading-relaxed">
          Concept website prepared by Nuvato for {site.name}. Photographs are illustrative and AI-generated. Rates,
          availability and enrollment are handled on{" "}
          <ExternalLink href={site.official} className="underline hover:text-white">
            powersetter.com
          </ExternalLink>
          ; nothing you enter on this site is sent or stored.
        </p>
      </div>
    </footer>
  );
}
