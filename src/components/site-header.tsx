"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  Phone,
  ChevronDown,
  Zap,
  Sun,
  Building2,
} from "lucide-react";

export default function SiteHeader() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDetailsElement>(null);
  const close = () => {
    dialog.current?.close();
    document.body.style.overflow = "";
  };
  useEffect(() => {
    dialog.current?.close();
    document.body.style.overflow = "";
    if (dropdown.current) dropdown.current.open = false;
  }, [pathname]);
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  const items = [
    ["/energy/", "Energy plans"],
    ["/community-solar/", "Community solar"],
    ["/business/", "For business"],
    ["/how-it-works/", "How it works"],
    ["/learn/", "Energy explained"],
  ];
  return (
    <>
      <div className="topline">
        <div className="container">
          <span>
            <span className="status-dot" /> A fresh perspective on energy.
          </span>
          <a href="tel:+18008336952">
            Let’s talk <span>(800) 833-6952</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="PowerSetter home">
            <Image
              src="/assets/powersetter-logo.png"
              width={190}
              height={35}
              priority
              alt="PowerSetter"
            />
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav">
            <details ref={dropdown} className="nav-dropdown">
              <summary
                className={pathname.startsWith("/energy") ? "active" : ""}
              >
                Explore energy
                <ChevronDown size={13} />
              </summary>
              <div className="dropdown-panel">
                <Link href="/energy/">
                  <Zap />
                  <span>
                    <strong>Energy plans</strong>
                    <small>Electricity & natural gas</small>
                  </span>
                  <ArrowUpRight />
                </Link>
                <Link href="/community-solar/">
                  <Sun />
                  <span>
                    <strong>Community solar</strong>
                    <small>Your share of a brighter future</small>
                  </span>
                  <ArrowUpRight />
                </Link>
                <Link href="/business/">
                  <Building2 />
                  <span>
                    <strong>Business energy</strong>
                    <small>Room for your ambition</small>
                  </span>
                  <ArrowUpRight />
                </Link>
              </div>
            </details>
            <Link
              className={pathname === "/community-solar/" ? "active" : ""}
              href="/community-solar/"
            >
              Community solar
            </Link>
            <Link
              className={pathname === "/business/" ? "active" : ""}
              href="/business/"
            >
              For business
            </Link>
            <Link
              className={pathname === "/how-it-works/" ? "active" : ""}
              href="/how-it-works/"
            >
              How it works
            </Link>
          </nav>
          <Link className="header-button" href="/compare/">
            Find my options
            <ArrowUpRight size={16} />
          </Link>
          <button
            className="mobile-toggle"
            aria-label="Open navigation"
            ref={trigger}
            onClick={() => {
              dialog.current?.showModal();
              document.body.style.overflow = "hidden";
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      <dialog
        className="mobile-dialog"
        ref={dialog}
        aria-label="Navigation"
        onClose={() => {
          document.body.style.overflow = "";
          trigger.current?.focus();
        }}
      >
        <div className="mobile-dialog-head">
          <Image
            src="/assets/powersetter-logo.png"
            width={180}
            height={34}
            alt="PowerSetter"
          />
          <button onClick={close} aria-label="Close navigation">
            <X />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {items.map(([href, label]) => (
            <Link key={href} href={href} onClick={close}>
              {label}
              <ArrowUpRight />
            </Link>
          ))}
          <Link href="/about/" onClick={close}>
            About PowerSetter
            <ArrowUpRight />
          </Link>
        </nav>
        <Link className="button button-blue" href="/compare/" onClick={close}>
          Explore my options
          <ArrowUpRight size={20} />
        </Link>
        <a className="mobile-phone" href="tel:+18008336952">
          <Phone size={16} />
          (800) 833-6952
        </a>
      </dialog>
    </>
  );
}
