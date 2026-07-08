"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Loader2,
  ShieldCheck,
  Upload,
} from "lucide-react";

/* ── Card processing fee (applied on top of the service price) ── */
export const CARD_FEE_RATE = 0.045;
export const CARD_FEE_LABEL = "4.5%";
export const cardFeeAmount = (price) => Math.ceil(price * CARD_FEE_RATE);
export const totalWithCardFee = (price) => Math.ceil(price * (1 + CARD_FEE_RATE));

/* ── Submit-hang guard ──
   supabase-js serializes auth calls through the Navigator LockManager with no
   timeout, so a stale `sb-*-auth-token` lock (e.g. after the tab sat idle through
   a token refresh) leaves `await supabase.auth.getUser()` pending forever and the
   submit button stuck on "Submitting...". `withTimeout` rejects after `ms` so the
   caller's catch/finally still run, and it steals any stuck auth lock first so a
   retry doesn't queue behind the same dead holder (retry works without a reload). */
async function releaseStuckAuthLocks() {
  try {
    if (typeof navigator === "undefined" || !navigator.locks?.query) return;
    const { held = [] } = await navigator.locks.query();
    const stuckAuthLocks = held.filter((lock) => lock.name?.startsWith("lock:sb-"));
    // `steal: true` force-releases the dead holder; the empty callback then
    // releases the lock immediately so the next auth call can acquire it.
    await Promise.all(
      stuckAuthLocks.map((lock) =>
        navigator.locks.request(lock.name, { steal: true }, () => {})
      )
    );
  } catch {
    // Best-effort cleanup — the timeout error is surfaced regardless.
  }
}

export function withTimeout(promise, ms = 10000) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(async () => {
        await releaseStuckAuthLocks();
        reject(new Error("The request timed out. Please try again."));
      }, ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

/* Shared input styling for all service forms. */
export const inputStyles =
  "h-11 w-full rounded-lg border-gray-200 bg-white shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30";

/* US states shared by the formation forms (underscored so they match the price-table keys). */
export const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New_Hampshire",
  "New_Jersey",
  "New_Mexico",
  "New_York",
  "North_Carolina",
  "North_Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode_Island",
  "South_Carolina",
  "South_Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West_Virginia",
  "Wisconsin",
  "Wyoming",
];

/* Pill-style toggle for Yes/No style questions (stores the same values as the old selects). */
export function OptionToggle({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2" role="radiogroup">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`flex min-h-[44px] items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
              selected
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            {selected && <Check className="h-4 w-4" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/* Calendar popover field storing an ISO date string, with a hidden required input like before. */
export function DateField({ id, value, onChange, required }) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`${inputStyles} justify-start text-left font-normal ${
              value ? "text-gray-800" : "text-muted-foreground"
            }`}
            id={id}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
            {value ? new Date(value).toLocaleDateString() : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) =>
              date && onChange(date.toISOString().split("T")[0])
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {required && <input type="hidden" value={value} required readOnly />}
    </>
  );
}

/* Styled file-input: visually a dashed drop-area, the real input stays in the DOM for `required`.
   `status` (optional): "uploading" | "success" | "error" — shows progress/result feedback. */
export function FileUploadField({ id, uploaded, placeholder, required, onChange, status }) {
  const isUploading = status === "uploading";
  return (
    <>
      <label
        htmlFor={id}
        className={`flex min-h-[44px] items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-600 transition-colors ${
          isUploading
            ? "cursor-wait opacity-70"
            : "cursor-pointer hover:border-primary/50 hover:bg-primary/5"
        }`}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 text-primary shrink-0 animate-spin" />
        ) : (
          <Upload className="h-4 w-4 text-primary shrink-0" />
        )}
        {isUploading
          ? "Uploading file..."
          : uploaded
          ? "File uploaded — choose another to replace"
          : placeholder}
      </label>
      <input
        type="file"
        id={id}
        onChange={onChange}
        required={required}
        disabled={isUploading}
        className="sr-only"
      />
      {status === "success" && (
        <p className="flex items-center gap-1.5 text-xs font-medium text-green-600 animate-in fade-in duration-200">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> File uploaded successfully
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className="flex items-center gap-1.5 text-xs font-medium text-destructive animate-in fade-in duration-200"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> File upload failed — please try again
        </p>
      )}
    </>
  );
}

/* Info tooltip listing a package's inclusions/exclusions and price. */
export function PackageDetailsTooltip({ label, features, excluded, price }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            aria-label={`${label} package details`}
            onClick={(e) => e.stopPropagation()}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Info className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="text-xs text-gray-800">
            <p className="font-semibold mb-1">Includes:</p>
            <ul className="list-disc ml-4 space-y-1">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {excluded?.length > 0 && (
              <>
                <p className="font-semibold mt-3 mb-1">Excluded:</p>
                <ul className="list-disc ml-4 space-y-1">
                  {excluded.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
            {price != null && (
              <p className="mt-2">
                <span className="font-semibold">Price:</span> ${price}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/* Selectable package cards (replaces the old Normal/Express dropdown, same stored values).
   options: [{ value, label, delivery, icon, badge?, price?, tooltip? }] */
export function PackageCards({ options, value, onChange, locked }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((pkg) => {
        const selected = value === pkg.value;
        const PkgIcon = pkg.icon;
        return (
          <button
            key={pkg.value}
            type="button"
            disabled={locked && !selected}
            onClick={() => !locked && onChange(pkg.value)}
            className={`relative rounded-xl border-2 p-4 text-left transition-all duration-200 ${
              selected
                ? "border-primary bg-primary/5 shadow-md"
                : "border-gray-200 bg-white hover:border-primary/40 hover:shadow-sm"
            } ${locked && !selected ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {pkg.badge && (
              <span className="absolute -top-2.5 right-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                {pkg.badge}
              </span>
            )}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {PkgIcon && (
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      selected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    <PkgIcon className="h-4.5 w-4.5" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">{pkg.label}</p>
                  {pkg.delivery && (
                    <p className="text-xs text-muted-foreground">{pkg.delivery}</p>
                  )}
                </div>
              </div>
              {pkg.tooltip}
            </div>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-lg font-bold text-gray-800">
                {pkg.price != null ? `$${pkg.price}` : pkg.priceFallback ?? ""}
              </span>
              {selected && (
                <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                  <Check className="h-3.5 w-3.5" /> Selected
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* Pill shown under the title when the user arrives with a pre-selected pricing package. */
export function PricingBadge({ pricingData }) {
  if (!pricingData?.price || pricingData.price === "0") return null;
  return (
    <div className="mt-3 mx-auto flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm">
      <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
      <span>
        <span className="font-semibold">{pricingData.planName}</span> — $
        {pricingData.price}
        <span className="text-xs text-muted-foreground">
          {" "}
          · {pricingData.packageType === "normal"
            ? "Normal (14 business days)"
            : "Express (7 business days)"}{" "}
          · {pricingData.state}
        </span>
      </span>
    </div>
  );
}

/* Price breakdown block: caller passes the base rows, fee + total are computed here. */
export function PriceSummary({ rows = [], price }) {
  if (!(price > 0)) return null;
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
      <p className="text-base font-semibold mb-3 text-gray-800">
        Service Price Breakdown
      </p>
      <div className="space-y-1.5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex justify-between">
            <span>{row.label}:</span>
            <span>${row.amount}</span>
          </div>
        ))}
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${price}</span>
        </div>
        <div className="flex justify-between">
          <span>Card Processing Fee ({CARD_FEE_LABEL}):</span>
          <span>${cardFeeAmount(price)}</span>
        </div>
        <hr className="my-2 border-primary/20" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span className="text-primary font-bold">${totalWithCardFee(price)}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Shared multi-step form shell ──
   steps: [{ title, subtitle, icon, heading?, intro?, validate?: () => string, content }]
   With a single step the stepper is hidden and it renders as a simple styled card.
   Native `required` validation runs per step via reportValidity; `validate` covers
   custom controls (toggles/cards) the browser can't check. */
export function FormWizard({
  title,
  description,
  badge,
  steps,
  onSubmit,
  loading,
  submitLabel,
  price = 0,
}) {
  const [step, setStep] = useState(0);
  const [stepError, setStepError] = useState("");
  const formRef = useRef(null);
  const cardRef = useRef(null);

  const isMultiStep = steps.length > 1;
  const isLastStep = step === steps.length - 1;
  const current = steps[step];

  const goToStep = (nextStep) => {
    setStepError("");
    setStep(nextStep);
    // Bring the top of the wizard back into view after a step change
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleNext = () => {
    // Only the current step's inputs are mounted, so this validates just this step
    if (formRef.current && !formRef.current.reportValidity()) return;
    const error = current.validate?.() || "";
    if (error) {
      setStepError(error);
      return;
    }
    goToStep(step + 1);
  };

  const handleSubmitClick = (e) => {
    // Custom controls on the last step still need their check before native submit
    const error = current.validate?.() || "";
    if (error) {
      e.preventDefault();
      setStepError(error);
    }
  };

  const handleFormKeyDown = (e) => {
    // Enter should advance the wizard, not submit, on intermediate steps
    if (e.key === "Enter" && !isLastStep && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <Card
      ref={cardRef}
      className="max-w-3xl mx-auto scroll-mt-24 overflow-hidden border shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-primary/20 transition-shadow duration-500 rounded-2xl"
    >
      {/* ── Header with progress stepper ── */}
      <CardHeader className="bg-gradient-to-b from-primary/5 to-transparent pb-4">
        <CardTitle className="text-xl md:text-2xl font-bold text-center text-gray-800">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-center">{description}</CardDescription>
        )}
        {badge}

        {isMultiStep && (
          <>
            {/* Desktop stepper */}
            <div className="hidden md:flex items-center justify-between mt-6 px-2">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isDone = i < step;
                const isCurrent = i === step;
                return (
                  <div key={s.title} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isDone
                            ? "border-primary bg-primary text-white"
                            : isCurrent
                            ? "border-primary bg-primary/10 text-primary ring-4 ring-primary/15"
                            : "border-gray-200 bg-white text-gray-400"
                        }`}
                      >
                        {isDone ? (
                          <Check className="h-5 w-5" />
                        ) : Icon ? (
                          <Icon className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-semibold">{i + 1}</span>
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isCurrent ? "text-primary" : isDone ? "text-gray-700" : "text-gray-400"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="mx-2 mb-5 h-0.5 flex-1 rounded bg-gray-200 overflow-hidden">
                        <div
                          className={`h-full bg-primary transition-all duration-500 ${
                            isDone ? "w-full" : "w-0"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile progress bar */}
            <div className="md:hidden mt-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-primary">
                  Step {step + 1} of {steps.length} — {current.title}
                </span>
                <span className="text-muted-foreground">{current.subtitle}</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </>
        )}
      </CardHeader>

      <CardContent className="pt-6">
        <form ref={formRef} onSubmit={onSubmit} onKeyDown={handleFormKeyDown}>
          {/* key={step} retriggers the entrance animation on each step change */}
          <div
            key={step}
            className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6"
          >
            {(current.heading || current.intro) && (
              <div className="space-y-1">
                {current.heading && (
                  <h2 className="text-lg font-bold text-gray-800">{current.heading}</h2>
                )}
                {current.intro && (
                  <p className="text-sm text-muted-foreground">{current.intro}</p>
                )}
              </div>
            )}
            {current.content}
          </div>

          {/* Inline error for card/toggle fields that native validation can't catch */}
          {stepError && (
            <p
              role="alert"
              className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive animate-in fade-in duration-200"
            >
              {stepError}
            </p>
          )}

          {/* ── Footer: running total + navigation ── */}
          <div className="mt-6 border-t pt-4 space-y-4">
            {price > 0 && !isLastStep && (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 border px-4 py-2.5 text-sm">
                <span className="text-muted-foreground">
                  Estimated total{" "}
                  <span className="text-xs">(incl. {CARD_FEE_LABEL} card fee)</span>
                </span>
                <span className="text-lg font-bold text-primary">
                  ${totalWithCardFee(price)}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3">
              {isMultiStep && step > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => goToStep(step - 1)}
                  className="min-w-[100px]"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back
                </Button>
              )}
              {/* Distinct keys force a fresh DOM node when Continue becomes Submit.
                  Without them React mutates the same <button> from type="button" to
                  type="submit" mid-click, and the browser's default action for that
                  click submits the form the moment the last step is reached. */}
              {!isLastStep ? (
                <Button
                  key="wizard-continue"
                  type="button"
                  onClick={handleNext}
                  className="flex-1 h-11 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer"
                >
                  Continue <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button
                  key="wizard-submit"
                  type="submit"
                  onClick={handleSubmitClick}
                  className="flex-1 h-11 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : submitLabel}
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
