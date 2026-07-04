"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe, ShieldCheck, FileText } from "lucide-react";
import { useScrollReveal } from "@/components/ui/use-scroll-reveal";

// Decorative floating chips — purely visual, hidden from AT and small screens.
const floatingChips = [
  {
    Icon: Globe,
    label: "US + UK",
    position: "left-[7%] top-[30%] -rotate-6",
    delay: "0s",
  },
  {
    Icon: FileText,
    label: "Filed ✓",
    position: "right-[6%] top-[42%] rotate-6",
    delay: "1.4s",
  },
  {
    Icon: ShieldCheck,
    label: "Compliant",
    position: "left-[11%] bottom-[24%] rotate-3",
    delay: "2.4s",
  },
];

export function FooterCTASection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-t border-white/[0.06] overflow-hidden"
    >
      {/* Soft glowing accents */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-primary/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-orange-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-slate-700/25 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating decorative chips — outside the panel, in the section margins */}
      {floatingChips.map(({ Icon, label, position, delay }) => (
        <div
          key={label}
          aria-hidden="true"
          className={`hidden xl:flex absolute ${position} items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-3.5 py-2 shadow-lg shadow-black/20 animate-hero-float pointer-events-none z-10`}
          style={{ animationDelay: delay }}
        >
          <Icon className="h-4 w-4 text-orange-400" />
          <span className="text-xs font-medium text-gray-300 whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}

      <div className="relative container px-4 mx-auto">
        {/* Glass panel */}
        <div className="reveal relative max-w-4xl mx-auto rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 shadow-2xl shadow-black/30 px-6 sm:px-12 lg:px-20 py-14 lg:py-20 text-center overflow-hidden">
          {/* Inner top glow + hairline highlight */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[520px] rounded-full bg-primary/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            aria-hidden="true"
          />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Ready to Build Your Business{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                the Right Way?
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
              Whether you're a first-time founder or expanding across borders,
              we'll handle the paperwork so you can focus on the business.
            </p>
            <Link href="/start-business">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground px-10 py-7 text-lg min-h-[44px] rounded-xl cursor-pointer shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/50 hover:-translate-y-0.5"
              >
                Get Started Today{" "}
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
