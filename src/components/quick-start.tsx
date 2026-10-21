"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, MapPin, House, Building2, Check } from "lucide-react";
import { validZip } from "@/lib/calculator";
export default function QuickStart() {
  const [audience, setAudience] = useState("home");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  return (
    <div className="quick-start">
      <div className="audience-switch" aria-label="Property type">
        <button
          type="button"
          aria-pressed={audience === "home"}
          className={audience === "home" ? "selected" : ""}
          onClick={() => setAudience("home")}
        >
          <House size={14} />
          For my home
        </button>
        <button
          type="button"
          aria-pressed={audience === "business"}
          className={audience === "business" ? "selected" : ""}
          onClick={() => setAudience("business")}
        >
          <Building2 size={14} />
          For my business
        </button>
      </div>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!validZip(zip)) {
            setError("Enter a valid 5-digit ZIP code.");
            return;
          }
          router.push(
            `/compare/?zip=${encodeURIComponent(zip)}&interest=${audience === "business" ? "business" : "electricity"}`,
          );
        }}
      >
        <label htmlFor="hero-zip" className="sr-only">
          Your ZIP code
        </label>
        <div className="zip-input">
          <MapPin size={18} />
          <input
            id="hero-zip"
            placeholder="Your ZIP code"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value);
              setError("");
            }}
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            aria-invalid={!!error}
            aria-describedby="quick-error"
          />
        </div>
        <button type="submit">
          Find my options
          <ArrowUpRight size={20} />
        </button>
      </form>
      <p
        id="quick-error"
        className={error ? "form-error" : "quick-note"}
        aria-live="polite"
      >
        {error || (
          <>
            <Check size={12} />
            Start with your location. Explore at your pace.
          </>
        )}
      </p>
    </div>
  );
}
