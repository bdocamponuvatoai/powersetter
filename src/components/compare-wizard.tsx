"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Zap,
  Flame,
  Sun,
  Building2,
  ArrowUpRight,
  ArrowLeft,
  Check,
  MapPin,
  ArrowRight,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { type Interest, interestNames } from "@/lib/content";
import { validZip } from "@/lib/calculator";
const services = [
  { id: "electricity", icon: Zap, description: "A clearer plan for your home" },
  { id: "gas", icon: Flame, description: "Explore natural gas suppliers" },
  { id: "solar", icon: Sun, description: "Your share of a shared project" },
  {
    id: "business",
    icon: Building2,
    description: "Energy for your next chapter",
  },
] as const;
export default function CompareWizard() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState<Interest>("electricity");
  const [zip, setZip] = useState("");
  const [goal, setGoal] = useState("Understand my options");
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const candidate = params.get("interest");
    if (candidate && services.some((service) => service.id === candidate))
      setInterest(candidate as Interest);
    const initialZip = params.get("zip");
    if (initialZip && validZip(initialZip)) setZip(initialZip);
  }, [params]);
  const go = (n: number) => {
    setStep(n);
    setError("");
    requestAnimationFrame(() => heading.current?.focus());
  };
  const SelectedIcon = services.find((service) => service.id === interest)?.icon ?? Zap;
  return (
    <div className="wizard">
      <ol className="wizard-progress" aria-label="Progress">
        {["Your interest", "Your place", "Your next step"].map((label, i) => (
          <li
            className={step >= i + 1 ? "current" : ""}
            key={label}
            aria-current={step === i + 1 ? "step" : undefined}
          >
            <span>{step > i + 1 ? <Check size={13} /> : i + 1}</span>
            {label}
          </li>
        ))}
      </ol>
      <div className="wizard-content">
        <p className="eyebrow">A LITTLE CLARITY STARTS HERE</p>
        <h1 tabIndex={-1} ref={heading}>
          {step === 1
            ? "What brings you here?"
            : step === 2
              ? "Tell us about your place."
              : "Your next step, made clearer."}
        </h1>
        <p className="wizard-intro">
          {step === 1
            ? "Choose the energy conversation you’d like to have."
            : step === 2
              ? "A few details help point the conversation in the right direction."
              : "Here’s your starting point. Real availability is checked by PowerSetter."}
        </p>
        {step === 1 && (
          <>
            <div
              className="service-choices"
              role="radiogroup"
              aria-label="Energy interest"
            >
              {services.map(({ id, icon: Icon, description }) => (
                <label className={interest === id ? "chosen" : ""} key={id}>
                  <input
                    type="radio"
                    name="interest"
                    checked={interest === id}
                    onChange={() => setInterest(id)}
                  />
                  <Icon size={25} />
                  <span>
                    <strong>{interestNames[id]}</strong>
                    <small>{description}</small>
                  </span>
                  <span className="radio-dot">
                    {interest === id && <Check size={13} />}
                  </span>
                </label>
              ))}
            </div>
            <button
              className="button button-blue wizard-next"
              onClick={() => go(2)}
            >
              Continue
              <ArrowRight size={20} />
            </button>
          </>
        )}
        {step === 2 && (
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!validZip(zip)) {
                setError("Please enter a valid 5-digit ZIP code.");
                document.getElementById("wizard-zip")?.focus();
                return;
              }
              go(3);
            }}
          >
            <div className="wizard-selected">
              <SelectedIcon size={16} />
              <span>{interestNames[interest]}</span>
              <button type="button" onClick={() => go(1)}>
                Change
              </button>
            </div>
            <label className="field-label" htmlFor="wizard-zip">
              Your service ZIP code
            </label>
            <div className="wizard-zip">
              <MapPin size={19} />
              <input
                id="wizard-zip"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value);
                  setError("");
                }}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="Enter 5-digit ZIP code"
                aria-invalid={!!error}
                aria-describedby="wizard-error"
              />
            </div>
            <p className="form-error" id="wizard-error" aria-live="polite">
              {error}
            </p>
            <label className="field-label" htmlFor="goal">
              What matters most to you?
            </label>
            <select
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <option>Understand my options</option>
              <option>Compare my supply costs</option>
              <option>Explore renewable energy</option>
              <option>Review an expiring contract</option>
            </select>
            <div className="wizard-actions">
              <button
                type="button"
                className="back-button"
                onClick={() => go(1)}
              >
                <ArrowLeft size={17} />
                Back
              </button>
              <button type="submit" className="button button-blue">
                See my next step
                <ArrowUpRight size={18} />
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
          <>
            <div className="summary-card">
              <span className="summary-icon">
                <Check size={25} />
              </span>
              <div>
                <p>YOUR EXPLORATION SUMMARY</p>
                <h2>{interestNames[interest]}</h2>
              </div>
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd>ZIP {zip}</dd>
                </div>
                <div>
                  <dt>Your priority</dt>
                  <dd>{goal}</dd>
                </div>
              </dl>
            </div>
            <div className="handoff-note">
              <ShieldCheck size={22} />
              <p>
                This preview hasn’t checked availability or submitted a request.
                Continue to PowerSetter to explore current options and enter
                your location there.
              </p>
            </div>
            <a
              className="button button-blue wizard-next"
              href={
                interest === "business"
                  ? "https://www.powersetter.com/contact-us/"
                  : "https://www.powersetter.com/"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue to PowerSetter
              <ArrowUpRight size={19} />
            </a>
            <a className="wizard-phone" href="tel:+18008336952">
              <Phone size={15} />
              Prefer a conversation? (800) 833-6952
            </a>
            <button className="back-button" onClick={() => go(1)}>
              <ArrowLeft size={16} />
              Change my selections
            </button>
          </>
        )}
        <p className="privacy-note">
          Design preview. Your entries stay on this page and aren’t saved or
          sent.
        </p>
      </div>
    </div>
  );
}
