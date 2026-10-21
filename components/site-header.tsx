"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/images/powersetter-logo.png";
import { ArrowRight, Close, Menu, Phone } from "@/components/icons";
import { buttonClass, cx } from "@/components/ui";
import { navigation, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className="sticky top-0 z-40 border-b border-transparent bg-paper/90 backdrop-blur-md transition-[border-color,box-shadow] duration-300 data-scrolled:border-line data-scrolled:shadow-[0_8px_24px_-18px_rgb(10_34_56/0.5)]"
    >
      <div className="shell flex h-18 items-center justify-between gap-6">
        <Link href="/" className="-m-2 shrink-0 p-2" aria-label={`${site.name} home`}>
          <Image src={logo} alt="" className="h-6 w-auto sm:h-7" preload sizes="160px" />
        </Link>

        <nav aria-label="Main" className="max-lg:hidden">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-medium text-ink/80 transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:bottom-1.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-blue"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="tabular inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[0.95rem] font-semibold max-xl:hidden"
          >
            <Phone size={17} />
            {site.phone}
          </a>
          <Link href="/compare" className={cx(buttonClass("primary"), "min-h-11 px-5 max-sm:hidden")}>
            Find my options
          </Link>
          <button
            ref={trigger}
            type="button"
            className="-mr-2 grid size-11 place-items-center rounded-full lg:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            onClick={() => dialog.current?.showModal()}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <dialog
        ref={dialog}
        aria-label="Menu"
        className="m-0 ml-auto h-dvh max-h-none w-full max-w-md bg-paper p-0 text-ink backdrop:bg-ink-deep/60"
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onClose={() => trigger.current?.focus()}
      >
        <div className="flex min-h-full flex-col px-4 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
          <div className="flex h-15 items-center justify-between">
            <Image src={logo} alt={site.name} className="h-6 w-auto" sizes="140px" />
            <button
              type="button"
              className="-mr-2 grid size-11 place-items-center rounded-full"
              aria-label="Close menu"
              onClick={() => dialog.current?.close()}
            >
              <Close size={24} />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-6">
            <ul className="divide-y divide-line border-y border-line">
              {[
                ...navigation,
                { href: "/about" as const, label: "About" },
                { href: "/contact" as const, label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => dialog.current?.close()}
                    className="flex min-h-15 items-center justify-between text-xl font-semibold aria-[current=page]:text-blue-strong"
                  >
                    {item.label}
                    <ArrowRight size={20} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 pt-10">
            <Link href="/compare" className={buttonClass("primary")} onClick={() => dialog.current?.close()}>
              Find my options
            </Link>
            <a href={site.phoneHref} className={cx(buttonClass("outline"), "tabular")}>
              <Phone size={18} />
              Call {site.phone}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
