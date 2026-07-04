"use client";

import { Globe, Layers, UserCheck } from "lucide-react";
import { useScrollReveal } from "@/components/ui/use-scroll-reveal";

const columns = [
  {
    Icon: Globe,
    title: "You're Not a US Resident",
    body: "Foreign-owned LLCs need EIN applications without an SSN, ITIN guidance, Form 5472 compliance, and BOI reporting done correctly from day one. We do this every day.",
  },
  {
    Icon: Layers,
    title: "You Operate in the US and UK",
    // VERIFY before publishing: "one of the few firms" — confirm this claim is accurate.
    body: "Need a Delaware LLC and a UK Ltd? VAT registration alongside US sales tax nexus? We're one of the few firms that files in both jurisdictions under one roof.",
  },
  {
    Icon: UserCheck,
    title: "You Want a Real Advisor, Not Just a Filing Service",
    body: "Formation is the easy part. We stay with you for annual compliance, bookkeeping, payroll, and tax — so nothing falls through the cracks after year one.",
  },
];

export function WhyInternationalFounders() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-slate-950 text-white overflow-hidden"
    >
      {/* Layered background: subtle grid + soft glows, echoing the hero */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.09) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 75% 80% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />
      <div
        className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container px-4 mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-14 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-orange-400 mb-4">
            Why International Founders Choose Faaz
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-balance mb-5">
            Built for{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              Founders
            </span>{" "}
            Who Don't Fit the{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              Standard Mold
            </span>
          </h2>
          {/* VERIFY before publishing: "the other 90% of cases" — confirm this figure is accurate. */}
          <p className="text-sm sm:text-base lg:text-xl text-gray-400 max-w-3xl mx-auto text-pretty leading-relaxed">
            Most formation services are built for one type of customer: a US resident starting
            their first US LLC. We built Faaz for the other 90% of cases — the ones generic
            formation mills get wrong.
          </p>
        </div>

        {/* Glass cards */}
        <div className="grid md:grid-cols-3 gap-5 lg:gap-8 max-w-6xl mx-auto">
          {columns.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              className="reveal group relative rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-7 lg:p-9 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-primary/10"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Index marker */}
              <span
                className="absolute top-6 right-7 text-4xl lg:text-5xl font-bold text-white/[0.06] group-hover:text-primary/20 transition-colors duration-300 select-none"
                aria-hidden="true"
              >
                0{i + 1}
              </span>

              {/* Icon tile */}
              <div className="relative h-13 w-13 lg:h-14 lg:w-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow duration-300">
                <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-white" aria-hidden="true" />
              </div>

              <h3 className="text-lg lg:text-xl font-bold text-white mb-3 text-balance">
                {title}
              </h3>
              <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-pretty">
                {body}
              </p>

              {/* Bottom accent line grows on hover */}
              <span
                className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
