"use client";

import { useScrollReveal } from "@/components/ui/use-scroll-reveal";
import { baseRates } from "@/lib/partner-program-data";

// Rate tile — repeated per delivery speed. `featured` only changes the price colour.
function RateTile({ name, duration, price, note, featured }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-900">{name}</p>
        <span className="shrink-0 rounded-md border border-gray-200 bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-gray-500">
          {duration}
        </span>
      </div>
      <p
        className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl ${
          featured ? "text-primary" : "text-slate-900"
        }`}
      >
        {price}
      </p>
      <p className="mt-2 text-xs text-gray-500">{note}</p>
    </div>
  );
}

export function BaseRatesSection() {
  const sectionRef = useScrollReveal();
  const { eyebrow, title, description, tiers } = baseRates;

  return (
    <section ref={sectionRef} className="bg-card pb-16 lg:pb-24">
      <div className="container mx-auto px-4">
        <div className="reveal rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr] lg:items-start lg:gap-8">
            {/* Label block */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-gray-400">
                {eyebrow}
              </p>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                {title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-gray-500 text-pretty sm:text-sm">
                {description}
              </p>
            </div>

            {/* Tiles: stacked on mobile, paired on sm, folded into the outer grid on lg */}
            <div className="grid gap-4 sm:grid-cols-2 lg:contents">
              {tiers.map((tier) => (
                <RateTile key={tier.name} {...tier} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
