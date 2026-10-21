"use client";

import Form from "next/form";
import { useRef, useState } from "react";
import { ArrowRight, MapPin } from "@/components/icons";
import { cx } from "@/components/ui";
import { validZip } from "@/lib/energy";

const audiences = [
  { value: "electricity", label: "For my home" },
  { value: "business", label: "For my business" },
] as const;

// A plain GET form to /compare, so it still works before hydration or without JavaScript.
export function QuickStart({ className }: { className?: string }) {
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  return (
    <Form
      action="/compare"
      noValidate
      className={cx("max-w-xl", className)}
      onSubmit={(event) => {
        if (validZip(input.current?.value.trim() ?? "")) return;
        event.preventDefault();
        setError("Enter a 5-digit ZIP code, for example 02108.");
        input.current?.focus();
      }}
    >
      <fieldset>
        <legend className="sr-only">Who is this for?</legend>
        <div className="inline-flex rounded-full bg-ink/8 p-1">
          {audiences.map((audience, index) => (
            <label
              key={audience.value}
              className="relative inline-flex min-h-11 cursor-pointer items-center rounded-full px-4 text-sm font-semibold text-ink/80 transition-colors has-checked:bg-ink has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue"
            >
              <input
                type="radio"
                name="interest"
                value={audience.value}
                defaultChecked={index === 0}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              {audience.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="hero-zip" className="sr-only">
          ZIP code
        </label>
        <div className="relative grow">
          <MapPin size={20} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
          <input
            ref={input}
            id="hero-zip"
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="ZIP code"
            aria-invalid={error ? true : undefined}
            aria-describedby="hero-zip-hint"
            onChange={() => setError("")}
            className="tabular h-14 w-full rounded-full bg-white pr-5 pl-12 text-lg shadow-[0_0_0_1px_rgb(10_34_56/0.18)] outline-none placeholder:text-[#6b7785] focus:shadow-[0_0_0_2px_var(--color-blue)] aria-invalid:shadow-[0_0_0_2px_var(--color-error)]"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-blue px-7 text-base font-semibold text-white transition-colors hover:bg-blue-strong"
        >
          Find my options
          <ArrowRight size={18} />
        </button>
      </div>
      <p id="hero-zip-hint" aria-live="polite" className={cx("mt-3 text-sm", error ? "text-error" : "text-muted")}>
        {error || "Your ZIP code decides which utility, suppliers and programs apply."}
      </p>
    </Form>
  );
}
