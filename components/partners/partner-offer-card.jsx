import { Check } from "lucide-react";

// Both offer cards share one layout and differ only in palette, so the light /
// dark treatments live in a lookup rather than in two duplicated components.
const theme = {
  light: {
    card: "bg-white border-gray-200 shadow-sm",
    option: "text-gray-400",
    title: "text-slate-900",
    description: "text-gray-600",
    payoutBox: "bg-gray-50 border-gray-200",
    payoutLabel: "text-gray-400",
    payoutNote: "text-gray-500",
    benefitTitle: "text-slate-900",
    benefitDetail: "text-gray-500",
    divider: "border-gray-200",
    footnote: "text-gray-500",
  },
  dark: {
    card: "bg-slate-950 border-slate-800 shadow-xl shadow-black/20",
    option: "text-gray-500",
    title: "text-white",
    description: "text-gray-400",
    payoutBox: "bg-white/[0.04] border-white/10",
    payoutLabel: "text-gray-500",
    payoutNote: "text-gray-500",
    benefitTitle: "text-white",
    benefitDetail: "text-gray-400",
    divider: "border-white/10",
    footnote: "text-gray-500",
  },
};

export function PartnerOfferCard({
  variant = "light",
  badge,
  option,
  title,
  description,
  payout,
  benefits,
  footnote,
}) {
  const t = theme[variant] ?? theme.light;

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-6 sm:p-8 ${t.card}`}
    >
      {badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-primary px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/25 sm:left-8 sm:text-[11px]">
          {badge}
        </span>
      )}

      <p
        className={`font-mono text-[11px] uppercase tracking-widest ${t.option}`}
      >
        {option}
      </p>

      <h3
        className={`mt-4 text-xl font-bold tracking-tight sm:text-2xl ${t.title}`}
      >
        {title}
      </h3>

      <p className={`mt-3 text-sm leading-relaxed text-pretty ${t.description}`}>
        {description}
      </p>

      {/* Payout box */}
      <div className={`mt-6 rounded-xl border p-5 ${t.payoutBox}`}>
        <p
          className={`font-mono text-[11px] uppercase tracking-widest ${t.payoutLabel}`}
        >
          {payout.label}
        </p>
        <p className="mt-2 text-xl font-bold tracking-tight text-primary sm:text-2xl">
          {payout.value}
        </p>
        <p className={`mt-1.5 text-xs ${t.payoutNote}`}>{payout.note}</p>
      </div>

      {/* Benefits */}
      <ul className="mt-6 mb-8 space-y-4">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="flex gap-3">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              strokeWidth={3}
              aria-hidden="true"
            />
            <div>
              <p className={`text-sm font-semibold ${t.benefitTitle}`}>
                {benefit.title}
              </p>
              <p
                className={`mt-1 text-xs leading-relaxed text-pretty ${t.benefitDetail}`}
              >
                {benefit.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Footnote pinned to the bottom so both cards align */}
      <div className={`mt-auto border-t pt-6 ${t.divider}`}>
        <p className={`text-xs ${t.footnote}`}>
          {footnote.before}
          <span className="font-semibold text-primary">
            {footnote.highlight}
          </span>
          {footnote.after}
        </p>
      </div>
    </div>
  );
}
