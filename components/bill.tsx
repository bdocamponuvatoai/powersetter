"use client";

import { useState } from "react";
import { cx } from "@/components/ui";
import { billFor, exampleBill, formatUsd } from "@/lib/energy";

type RateKey = keyof typeof exampleBill.rates;

const rateOptions: { key: RateKey; label: string }[] = [
  { key: "current", label: "Utility rate" },
  { key: "compared", label: "Supplier rate" },
];

function Marker({ n, className }: { n: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "grid size-6 shrink-0 place-items-center rounded-full bg-ink mono-label text-[0.72rem] text-white",
        className,
      )}
    >
      {n}
    </span>
  );
}

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={cx("flex items-baseline justify-between gap-4", strong && "font-semibold")}>
      <span className="text-ink/75">{label}</span>
      <span className="tabular font-mono">{value}</span>
    </div>
  );
}

// The signature illustration: an example statement where only the supply section changes.
export function Bill({ className }: { className?: string }) {
  const [rateKey, setRateKey] = useState<RateKey>("current");
  const cents = exampleBill.rates[rateKey];
  const bill = billFor(cents);
  const baseline = billFor(exampleBill.rates.current);
  const monthlyDifference = baseline.total - bill.total;

  return (
    <figure className={cx("relative", className)} aria-labelledby="bill-caption">
      <div className="relative rotate-[0.6deg] rounded-2xl bg-white p-5 text-[0.95rem] shadow-[0_30px_60px_-30px_rgb(10_34_56/0.45),0_0_0_1px_rgb(10_34_56/0.08)] sm:p-7">
        <div className="flex items-start justify-between gap-4 border-b border-dashed border-ink/20 pb-4">
          <div>
            <p className="mono-label text-muted">Example statement</p>
            <p className="mt-1 text-lg font-semibold">Your local utility</p>
          </div>
          <p className="text-right mono-label whitespace-nowrap text-muted">
            Sep 3 – Oct 2
            <br />
            30 days
          </p>
        </div>

        <div className="space-y-5 pt-5">
          <div className="flex items-center gap-3">
            <Marker n={1} />
            <div className="grow">
              <Line label="Usage this period" value={`${bill.usageKwh} kWh`} strong />
            </div>
          </div>

          <div className="flex gap-3">
            <Marker n={2} className="mt-0.5" />
            <div className="grow space-y-1.5">
              <p className="font-semibold">
                Delivery <span className="font-normal text-muted">· your utility</span>
              </p>
              <Line label="Customer charge" value={formatUsd(exampleBill.customerCharge)} />
              <Line
                label={`Distribution ${bill.usageKwh} × ${exampleBill.deliveryCents.toFixed(1)}¢`}
                value={formatUsd(bill.delivery - exampleBill.customerCharge)}
              />
            </div>
          </div>

          <div className="relative -mx-2 flex gap-3 rounded-xl bg-highlight/70 px-2 py-3">
            <Marker n={3} className="mt-0.5" />
            <div className="grow space-y-1.5">
              <p className="font-semibold">
                Supply <span className="font-normal">· your choice</span>
              </p>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-ink/80">
                  Energy {bill.usageKwh} × <span className="tabular font-mono">{cents.toFixed(1)}¢</span>
                </span>
                <span key={cents} className="tabular animate-rise font-mono font-semibold">
                  {formatUsd(bill.supply)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline justify-between border-t-2 border-ink pt-4 text-lg font-bold">
            <span>Amount due</span>
            <span className="tabular font-mono">{formatUsd(bill.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div role="group" aria-label="Example supply rate" className="inline-flex rounded-full bg-ink/8 p-1">
          {rateOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              aria-pressed={rateKey === option.key}
              onClick={() => setRateKey(option.key)}
              className="min-h-11 rounded-full px-4 text-sm font-semibold text-ink/80 transition-colors aria-pressed:bg-ink aria-pressed:text-white"
            >
              {option.label} <span className="tabular font-mono">{exampleBill.rates[option.key].toFixed(1)}¢</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-muted" aria-live="polite">
          {monthlyDifference > 0
            ? `Delivery unchanged. ${formatUsd(monthlyDifference)} less this month.`
            : "Switch the rate: only the supply line moves."}
        </p>
      </div>
      <figcaption id="bill-caption" className="mt-3 text-sm text-muted">
        Example figures for illustration, not a quote or an offer. Supplier rates can be higher or lower than your
        utility’s.
      </figcaption>
    </figure>
  );
}
