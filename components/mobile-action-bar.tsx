"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "@/components/icons";
import { buttonClass, cx } from "@/components/ui";
import { site } from "@/lib/site";

// Fixed Call / Compare bar on phones, shown once the page intro is out of view.
export function MobileActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.querySelector("[data-hero]") ?? document.querySelector("main section");
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry ? !entry.isIntersecting : false));
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

  if (pathname === "/compare") return null;

  return (
    <div
      data-testid="mobile-action-bar"
      data-visible={visible || undefined}
      inert={!visible}
      className="invisible fixed inset-x-0 bottom-0 z-30 translate-y-full border-t border-line bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-[transform,visibility] duration-300 data-visible:visible data-visible:translate-y-0 sm:hidden"
    >
      <div className="grid grid-cols-2 gap-3">
        <a href={site.phoneHref} className={cx(buttonClass("outline"), "px-4")}>
          <Phone size={18} />
          Call
        </a>
        <Link href="/compare" className={cx(buttonClass("primary"), "px-4")}>
          Find my options
        </Link>
      </div>
    </div>
  );
}
