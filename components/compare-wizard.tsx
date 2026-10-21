"use client";

import { useSearchParams } from "next/navigation";
import { useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MapPin, Phone } from "@/components/icons";
import { buttonClass, cx } from "@/components/ui";
import { interests, isInterest, priorities, type Interest } from "@/lib/content";
import { listedStateForZip, stateNames, validZip } from "@/lib/energy";
import { site } from "@/lib/site";

type Step = 1 | 2 | 3;

const stepLabels = ["Interest", "Location", "Next step"] as const;

/** Reads presets from the URL. Rendered inside Suspense; the fallback is the same wizard without presets. */
export function CompareWizardFromParams() {
  const params = useSearchParams();
  const interest = params.get("interest");
  const zip = params.get("zip")?.trim() ?? "";
  const presetInterest = isInterest(interest) ? interest : undefined;
  const presetZip = validZip(zip) ? zip : undefined;
  return (
    <CompareWizard
      key={`${presetInterest ?? ""}-${presetZip ?? ""}`}
      initialInterest={presetInterest}
      initialZip={presetZip}
    />
  );
}

export function CompareWizard({ initialInterest, initialZip }: { initialInterest?: Interest; initialZip?: string }) {
  const [step, setStep] = useState<Step>(initialInterest && initialZip ? 2 : 1);
  const [interest, setInterest] = useState<Interest>(initialInterest ?? "electricity");
  const [zip, setZip] = useState(initialZip ?? "");
  const [priority, setPriority] = useState<string>(priorities[0]);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const zipInput = useRef<HTMLInputElement>(null);
  const headingId = useId();

  const go = (next: Step) => {
    setStep(next);
    setError("");
    requestAnimationFrame(() => heading.current?.focus());
  };

  const selected = interests.find((item) => item.id === interest) ?? interests[0]!;
  const state = listedStateForZip(zip);
  const handoff = interest === "business" ? site.contactForm : site.official;

  return (
    <div className="rounded-[1.5rem] bg-white p-5 shadow-[0_30px_60px_-40px_rgb(10_34_56/0.5),0_0_0_1px_rgb(10_34_56/0.08)] sm:p-10">
      <ol aria-label="Progress" className="flex gap-2">
        {stepLabels.map((label, index) => {
          const n = index + 1;
          return (
            <li
              key={label}
              aria-current={step === n ? "step" : undefined}
              className="flex grow flex-col gap-2 text-sm font-medium text-muted aria-[current=step]:text-ink"
            >
              <span
                className={cx("h-1.5 rounded-full transition-colors", step >= n ? "bg-blue" : "bg-ink/10")}
                aria-hidden="true"
              />
              <span>
                <span className="sr-only">Step {n}: </span>
                {label}
                {step > n ? <span className="sr-only"> (done)</span> : null}
              </span>
            </li>
          );
        })}
      </ol>

      <section aria-labelledby={headingId} className="mt-10">
        <h2 id={headingId} ref={heading} tabIndex={-1} className="text-heading text-3xl outline-none sm:text-4xl">
          {step === 1 ? "What would you like to compare?" : step === 2 ? "Where is the service?" : "Your next step"}
        </h2>

        {step === 1 ? (
          <form
            className="mt-8"
            onSubmit={(event) => {
              event.preventDefault();
              go(2);
            }}
          >
            <fieldset>
              <legend className="sr-only">Energy interest</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {interests.map((item) => (
                  <label
                    key={item.id}
                    className="flex min-h-20 cursor-pointer items-center gap-4 rounded-2xl p-4 ring-1 ring-ink/15 transition-[box-shadow,background-color] has-checked:bg-sky has-checked:ring-2 has-checked:ring-blue has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue"
                  >
                    <input
                      type="radio"
                      name="interest"
                      value={item.id}
                      checked={interest === item.id}
                      onChange={() => setInterest(item.id)}
                      className="peer sr-only"
                    />
                    <span className="grid size-6 shrink-0 place-items-center rounded-full ring-2 ring-ink/25 peer-checked:bg-blue peer-checked:text-white peer-checked:ring-blue">
                      {interest === item.id ? <Check size={14} strokeWidth={2.6} /> : null}
                    </span>
                    <span>
                      <span className="block font-semibold">{item.name}</span>
                      <span className="block text-sm text-muted">{item.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className={cx(buttonClass("primary"), "mt-8 w-full sm:w-auto")}>
              Continue
              <ArrowRight size={18} />
            </button>
          </form>
        ) : null}

        {step === 2 ? (
          <form
            noValidate
            className="mt-8"
            onSubmit={(event) => {
              event.preventDefault();
              if (!validZip(zip.trim())) {
                setError("Enter a 5-digit ZIP code, for example 02108.");
                zipInput.current?.focus();
                return;
              }
              setZip(zip.trim());
              go(3);
            }}
          >
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              Comparing <strong className="text-ink">{selected.name}</strong>
              <button
                type="button"
                className="min-h-11 font-semibold text-blue-strong underline underline-offset-4"
                onClick={() => go(1)}
              >
                Change
              </button>
            </p>
            <label htmlFor="compare-zip" className="mt-6 block font-semibold">
              Service ZIP code
            </label>
            <div className="relative mt-2 max-w-sm">
              <MapPin size={20} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
              <input
                ref={zipInput}
                id="compare-zip"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                value={zip}
                onChange={(event) => {
                  setZip(event.target.value);
                  setError("");
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby="compare-zip-error"
                className="tabular h-14 w-full rounded-2xl bg-paper pr-4 pl-12 text-lg ring-1 ring-ink/20 outline-none focus:ring-2 focus:ring-blue aria-invalid:ring-2 aria-invalid:ring-error"
              />
            </div>
            <p id="compare-zip-error" aria-live="polite" className="mt-2 min-h-6 text-sm text-error">
              {error}
            </p>

            <label htmlFor="compare-priority" className="mt-4 block font-semibold">
              What matters most?
            </label>
            <select
              id="compare-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="mt-2 h-14 w-full max-w-sm rounded-2xl bg-paper px-4 text-base ring-1 ring-ink/20 outline-none focus:ring-2 focus:ring-blue"
            >
              {priorities.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button type="button" className={buttonClass("outline")} onClick={() => go(1)}>
                <ArrowLeft size={18} />
                Back
              </button>
              <button type="submit" className={buttonClass("primary")}>
                See my next step
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        ) : null}

        {step === 3 ? (
          <div className="mt-8">
            <dl className="divide-y divide-line rounded-2xl bg-paper px-5 ring-1 ring-line">
              {[
                ["Comparing", selected.name],
                ["ZIP code", zip],
                ["State", state ? `${stateNames[state]} (listed by ${site.name})` : "Not on the published list"],
                ["Priority", priority],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-wrap justify-between gap-x-6 gap-y-1 py-4">
                  <dt className="text-muted">{term}</dt>
                  <dd className="tabular font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 leading-relaxed text-muted">
              {state
                ? `${site.name} lists ${stateNames[state]}. Live plans and availability for your utility are checked on ${site.name}’s current site.`
                : `${site.name} also serves states beyond its published list. Check live availability for ZIP ${zip} on ${site.name}’s current site.`}{" "}
              This page has not checked availability or sent your details anywhere.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={handoff} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
                Continue to {site.name}
                <ArrowUpRight size={18} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={site.phoneHref} className={cx(buttonClass("outline"), "tabular")}>
                <Phone size={18} />
                {site.phone}
              </a>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-blue-strong"
              onClick={() => go(1)}
            >
              <ArrowLeft size={17} />
              Change my answers
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
