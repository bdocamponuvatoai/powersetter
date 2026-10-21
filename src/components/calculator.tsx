"use client";
import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Equal, Info } from "lucide-react";
import { supplyComparison } from "@/lib/calculator";
const currency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
export default function Calculator() {
  const [usage, setUsage] = useState(900);
  const [current, setCurrent] = useState("15");
  const [proposed, setProposed] = useState("12");
  const result =
    current !== "" && proposed !== ""
      ? supplyComparison(usage, Number(current), Number(proposed))
      : null;
  const increase = result && result.annualDifference < 0;
  return (
    <div className="calculator">
      <div className="calculator-head">
        <span>LET’S MAKE IT TANGIBLE</span>
        <span>
          <Info size={12} />
          Example, not an offer
        </span>
      </div>
      <div className="usage-label">
        <label htmlFor="usage">Monthly electricity use</label>
        <span>
          <output htmlFor="usage">{usage.toLocaleString()}</output> kWh
        </span>
      </div>
      <input
        id="usage"
        type="range"
        min="100"
        max="3000"
        step="50"
        value={usage}
        onChange={(e) => setUsage(Number(e.target.value))}
      />
      <div className="range-labels">
        <span>100 kWh</span>
        <span>3,000 kWh</span>
      </div>
      <div className="rate-inputs">
        <div>
          <label htmlFor="current-rate">Your current supply rate</label>
          <div>
            <input
              id="current-rate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              inputMode="decimal"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
            <span>¢ / kWh</span>
          </div>
        </div>
        <div>
          <label htmlFor="new-rate">A rate to compare</label>
          <div>
            <input
              id="new-rate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              inputMode="decimal"
              value={proposed}
              onChange={(e) => setProposed(e.target.value)}
            />
            <span>¢ / kWh</span>
          </div>
        </div>
      </div>
      {!result && (
        <p className="form-error" role="alert">
          Enter rates from 0 to 100 cents per kWh.
        </p>
      )}
      <div
        className={`calculator-result ${increase ? "increase" : ""}`}
        aria-live="polite"
      >
        <div>
          <p>
            {increase
              ? "Annual supply cost increase"
              : result?.annualDifference === 0
                ? "Same annual supply cost"
                : "Potential annual supply difference"}
          </p>
          <strong>
            {result ? currency(Math.abs(result.annualDifference)) : "—"}
            <span>/ year</span>
          </strong>
        </div>
        <span className="result-arrow">
          {increase ? (
            <ArrowUpRight />
          ) : result?.annualDifference === 0 ? (
            <Equal />
          ) : (
            <ArrowDownRight />
          )}
        </span>
      </div>
      {result && (
        <div className="calc-monthly">
          <span>
            Current supply:{" "}
            <strong>{currency(result.monthlyCurrent)}/mo</strong>
          </span>
          <span>
            Comparison: <strong>{currency(result.monthlyProposed)}/mo</strong>
          </span>
        </div>
      )}
      <details className="calc-assumptions">
        <summary>
          How this example is calculated
          <PlusIcon />
        </summary>
        <p>
          Monthly usage × (current rate − comparison rate) ÷ 100 × 12. The
          example holds usage and rates constant. It excludes delivery charges,
          taxes, fees, credits and cancellation costs. Actual savings may
          differ.
        </p>
      </details>
    </div>
  );
}
function PlusIcon() {
  return <span aria-hidden="true">+</span>;
}
