"use client";

import { useState } from "react";
import { cx } from "@/components/ui";
import { formatUsd, supplyComparison } from "@/lib/energy";

function RateField({
  id,
  label,
  value,
  onChange,
  invalid,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={0}
          max={100}
          step={0.1}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={invalid ? true : undefined}
          aria-describedby="calculator-error"
          className="tabular h-14 w-full rounded-2xl bg-paper pr-20 pl-4 font-mono text-lg ring-1 ring-ink/20 outline-none focus:ring-2 focus:ring-blue aria-invalid:ring-2 aria-invalid:ring-error"
        />
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 mono-label text-muted">
          ¢/kWh
        </span>
      </div>
    </div>
  );
}

export function Calculator() {
  const [usage, setUsage] = useState(900);
  const [current, setCurrent] = useState("15");
  const [compared, setCompared] = useState("12");

  const result =
    current.trim() !== "" && compared.trim() !== "" ? supplyComparison(usage, Number(current), Number(compared)) : null;
  const difference = result?.annualDifference ?? 0;
  const outcome = !result ? "invalid" : difference > 0 ? "lower" : difference < 0 ? "higher" : "same";

  return (
    <div className="rounded-[1.5rem] bg-white p-5 shadow-[0_30px_60px_-40px_rgb(10_34_56/0.5),0_0_0_1px_rgb(10_34_56/0.08)] sm:p-9">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor="usage" className="font-semibold">
          Monthly electricity use
        </label>
        <output htmlFor="usage" className="tabular font-mono text-lg font-semibold">
          {usage.toLocaleString("en-US")} kWh
        </output>
      </div>
      <input
        id="usage"
        type="range"
        min={100}
        max={3000}
        step={50}
        value={usage}
        onChange={(event) => setUsage(Number(event.target.value))}
        className="mt-4 h-11 w-full cursor-pointer accent-blue"
      />
      <div className="flex justify-between mono-label text-muted" aria-hidden="true">
        <span>100</span>
        <span>3,000</span>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <RateField
          id="current-rate"
          label="Your current supply rate"
          value={current}
          onChange={setCurrent}
          invalid={!result}
        />
        <RateField
          id="compared-rate"
          label="A rate to compare"
          value={compared}
          onChange={setCompared}
          invalid={!result}
        />
      </div>
      <p id="calculator-error" className="mt-2 min-h-6 text-sm text-error">
        {outcome === "invalid" ? "Enter both rates between 0 and 100 cents per kWh." : ""}
      </p>

      <div
        aria-live="polite"
        className={cx(
          "mt-4 rounded-2xl p-6",
          outcome === "higher" ? "bg-ink text-white" : outcome === "invalid" ? "bg-paper" : "bg-highlight",
        )}
      >
        <p className="font-semibold">
          {outcome === "lower"
            ? "Lower supply cost per year"
            : outcome === "higher"
              ? "Higher supply cost per year"
              : outcome === "same"
                ? "Same supply cost"
                : "Waiting for valid rates"}
        </p>
        <p className="tabular mt-2 text-display text-5xl sm:text-6xl">
          {result ? formatUsd(Math.abs(difference), 0) : "–"}
        </p>
        {result ? (
          <p className={cx("mt-4 text-sm", outcome === "higher" ? "text-muted-dark" : "text-ink/80")}>
            Supply per month: {formatUsd(result.monthlyCurrent)} now, {formatUsd(result.monthlyProposed)} compared.
          </p>
        ) : null}
      </div>

      <details className="group mt-6">
        <summary className="inline-flex min-h-11 cursor-pointer items-center font-semibold text-blue-strong underline underline-offset-4">
          How this is calculated
        </summary>
        <p className="mt-2 leading-relaxed text-muted">
          Monthly usage × (current rate − compared rate) ÷ 100 × 12. Usage and rates are held constant. Delivery
          charges, taxes, fees, credits and cancellation costs are not included, so a real bill will differ.
        </p>
      </details>
    </div>
  );
}
