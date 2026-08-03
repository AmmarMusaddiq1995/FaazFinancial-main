"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/components/ui/use-scroll-reveal";
import { partnerCta } from "@/lib/partner-program-data";

export function PartnerCta() {
  const sectionRef = useScrollReveal();
  const { before, highlight, buttonLabel, buttonHref, disclaimer } = partnerCta;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-950 py-14 text-white lg:py-20"
    >
      <div
        className="pointer-events-none absolute -top-32 left-1/4 h-80 w-[520px] rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4">
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl text-xl font-bold leading-snug tracking-tight text-balance sm:text-2xl lg:text-3xl">
            {before}
            <span className="text-primary">{highlight}</span>
          </h2>

          <Link href={buttonHref} className="shrink-0">
            <Button
              size="lg"
              className="min-h-[44px] cursor-pointer rounded-full bg-primary px-8 py-6 text-base text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
            >
              {buttonLabel}
            </Button>
          </Link>
        </div>

        {/* Fine print */}
        <p className="reveal mt-12 border-t border-white/[0.08] pt-6 text-xs text-gray-500 text-pretty">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
