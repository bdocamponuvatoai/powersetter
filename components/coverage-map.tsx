"use client";

import { useState } from "react";
import { cx } from "@/components/ui";
import { stateTiles } from "@/lib/content";
import { listedStateForZip, stateNames, validZip, type ListedStateCode } from "@/lib/energy";
import { site } from "@/lib/site";

const TILE = 44;
const GAP = 4;
const STEP = TILE + GAP;
const listed = new Set<string>(site.listedStates);

type Result = { kind: "listed"; state: ListedStateCode } | { kind: "other" } | { kind: "invalid" } | null;

export function CoverageMap() {
  const [result, setResult] = useState<Result>(null);
  const matched = result?.kind === "listed" ? result.state : null;

  return (
    <div>
      <svg
        viewBox={`0 0 ${11 * STEP - GAP} ${8 * STEP - GAP}`}
        role="img"
        aria-labelledby="coverage-map-title"
        className="w-full max-w-xl"
      >
        <title id="coverage-map-title">
          Map of the United States with the ten states PowerSetter lists highlighted
        </title>
        {stateTiles.map(([state, col, row]) => {
          const isListed = listed.has(state);
          const isMatch = state === matched;
          return (
            <g key={state} transform={`translate(${col * STEP} ${row * STEP})`}>
              <rect
                width={TILE}
                height={TILE}
                rx={7}
                className={cx(
                  "transition-[fill,stroke] duration-300",
                  isListed ? "fill-highlight" : "fill-ink-raised",
                  isMatch && "stroke-blue-light [stroke-width:4]",
                )}
              />
              <text
                x={TILE / 2}
                y={TILE / 2}
                dominantBaseline="central"
                textAnchor="middle"
                className={cx(
                  "font-mono text-[16px] font-semibold sm:text-[13px]",
                  isListed ? "fill-ink" : "fill-muted-dark",
                )}
              >
                {state}
              </text>
            </g>
          );
        })}
      </svg>

      <form
        noValidate
        className="mt-8 max-w-md"
        onSubmit={(event) => {
          event.preventDefault();
          // Read from the form, so a ZIP typed before hydration still counts.
          const value = String(new FormData(event.currentTarget).get("zip") ?? "").trim();
          if (!validZip(value)) return setResult({ kind: "invalid" });
          const state = listedStateForZip(value);
          setResult(state ? { kind: "listed", state } : { kind: "other" });
        }}
      >
        <label htmlFor="coverage-zip" className="font-semibold">
          Check a ZIP code
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="coverage-zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            name="zip"
            placeholder="e.g. 77019"
            aria-describedby="coverage-result"
            aria-invalid={result?.kind === "invalid" ? true : undefined}
            className="tabular h-12 w-full min-w-0 rounded-full bg-white/10 px-5 text-white ring-1 ring-white/30 outline-none placeholder:text-muted-dark focus:ring-2 focus:ring-blue-light"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-white px-6 font-semibold text-ink transition-colors hover:bg-highlight"
          >
            Check
          </button>
        </div>
        <p id="coverage-result" aria-live="polite" className="mt-3 min-h-12 leading-relaxed text-muted-dark">
          {result?.kind === "listed" ? (
            <>
              <strong className="text-white">{stateNames[result.state]}</strong> is one of the states PowerSetter lists.
              Which suppliers you can choose still depends on your utility.
            </>
          ) : result?.kind === "other" ? (
            "That ZIP code is outside the ten listed states. PowerSetter also serves other deregulated states, so it is still worth checking your options."
          ) : result?.kind === "invalid" ? (
            "Enter a 5-digit ZIP code."
          ) : (
            "Checked against PowerSetter’s published list. Nothing is sent anywhere."
          )}
        </p>
      </form>
    </div>
  );
}
