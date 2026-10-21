"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Flame, Sun, ArrowUpRight, ArrowRight, Check } from "lucide-react";
const options = [
  {
    key: "electricity",
    label: "Electricity",
    icon: Zap,
    title: "A better plan starts with a little clarity.",
    copy: "Bring your energy choices into focus. Compare supply rates, contract terms and the details that make a plan right for your home.",
    href: "/energy/",
    image: "/assets/evening-home.webp",
    tag: "MORE CHOICE FOR YOUR EVERYDAY",
    benefits: [
      "Compare supply options",
      "Understand your plan",
      "Choose with confidence",
    ],
  },
  {
    key: "gas",
    label: "Natural gas",
    icon: Flame,
    title: "Make yourself comfortable with your options.",
    copy: "Your natural gas plan deserves a closer look, too. Explore suppliers in participating areas and understand the full cost before making a move.",
    href: "/energy/?type=gas",
    image: "/assets/solar-home.webp",
    tag: "COMFORT, WITH A CLEARER PICTURE",
    benefits: [
      "Review the supply rate",
      "Check the full term",
      "Find your next step",
    ],
  },
  {
    key: "solar",
    label: "Community solar",
    icon: Sun,
    title: "A little more sunshine. A lot more possibility.",
    copy: "You don’t need a solar roof to take part. Explore shared solar programs and find out what participation could look like for your household.",
    href: "/community-solar/",
    image: "/assets/community-solar.webp",
    tag: "YOUR SHARE OF A BRIGHTER FUTURE",
    benefits: [
      "Shared solar projects",
      "No rooftop installation",
      "Location-based options",
    ],
  },
];
export default function EnergyExplorer() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("type") === "gas")
      setActive(1);
  }, []);
  const item = options[active];
  return (
    <div className="energy-explorer">
      <div
        className="explorer-tabs"
        role="tablist"
        aria-label="Energy solutions"
      >
        {options.map((tab, i) => (
          <button
            key={tab.key}
            id={`tab-${tab.key}`}
            role="tab"
            aria-selected={active === i}
            aria-controls="energy-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? 2
                      : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                setActive(next);
                document.getElementById(`tab-${options[next].key}`)?.focus();
              }
            }}
          >
            <tab.icon size={21} />
            <span>{tab.label}</span>
            <ArrowUpRight size={18} />
          </button>
        ))}
      </div>
      <div
        className="explorer-panel"
        id="energy-panel"
        role="tabpanel"
        aria-labelledby={`tab-${item.key}`}
      >
        <div className="explorer-content">
          <span className="micro-label">{item.tag}</span>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
          <ul>
            {item.benefits.map((b) => (
              <li key={b}>
                <Check size={14} />
                {b}
              </li>
            ))}
          </ul>
          <Link href={item.href} className="text-link">
            Explore {item.label.toLowerCase()}
            <ArrowRight size={19} />
          </Link>
        </div>
        <div className="explorer-photo">
          <Image
            src={item.image}
            alt={`Illustrative ${item.label.toLowerCase()} concept`}
            fill
            sizes="(max-width:700px) 100vw, 50vw"
          />
          <span className="photo-caption">Concept imagery</span>
        </div>
      </div>
    </div>
  );
}
