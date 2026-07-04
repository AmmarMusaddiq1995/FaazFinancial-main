"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  BarChart2,
  Lightbulb,
  Target,
  Building2,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Globe,
} from "lucide-react";
import Link from "next/link";

// Floating glassmorphic cards flanking the headline on large screens.
// Content mirrors real service outcomes (formation, compliance, tax, banking)
// in the two jurisdictions Faaz serves: US + UK.
const floatingCards = [
  {
    Icon: Building2,
    title: "LLC Approved",
    detail: "Delaware · USA",
    position: "left-[3%] top-[24%] -rotate-3",
    delay: "0s",
  },
  {
    Icon: ShieldCheck,
    title: "BOI Filing",
    detail: "Compliance · Submitted",
    position: "left-[6%] bottom-[26%] rotate-2",
    delay: "1.8s",
  },
  {
    Icon: FileText,
    title: "ITIN Services",
    detail: "",
    position: "right-[3%] top-[22%] rotate-3",
    delay: "0.9s",
  },
  {
    Icon: Landmark,
    title: "Business Account",
    detail: "Banking · Ready to use",
    position: "right-[5%] bottom-[24%] -rotate-2",
    delay: "2.6s",
  },
];

// Key statistics — values already published elsewhere on the site
// (hero badge, testimonials section, services catalogue).
const stats = [
  { value: "50", label: "US States Covered" },
  { value: "80+", label: "Countries Served" },
  { value: "4.7/5", label: "Trustpilot Rating" },
  { value: "30+", label: "Services Offered" },
];



export function HeroSection() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden -mt-20 pt-20">
      {/* Layered background: subtle grid pattern + soft radial glows */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.09) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, black 40%, transparent 100%)",
        }}
      />
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[720px] rounded-full bg-primary/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-orange-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -right-32 h-96 w-96 rounded-full bg-slate-700/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating service cards — large screens only */}
      {floatingCards.map(({ Icon, title, detail, position, delay }) => (
        <div
          key={title}
          aria-hidden="true"
          className={`hidden xl:flex absolute ${position} items-center gap-3 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 px-4 py-3 shadow-xl shadow-black/20 animate-hero-float pointer-events-none z-10`}
          style={{ animationDelay: delay }}
        >
          <div className="h-9 w-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight flex items-center gap-1.5">
              {title}
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            </p>
            <p className="text-xs text-gray-400">{detail}</p>
          </div>
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 container px-4 mx-auto">
        <div className="hero-main max-w-4xl mx-auto text-center pt-16 pb-14 lg:pt-28 lg:pb-20">
          {/* Trust badge */}
          <div
            className="hero-badge animate-hero-fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm px-4 py-1.5 mb-8"
            style={{ animationDelay: "0ms" }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
            </span>
            <span className="text-xs sm:text-sm font-medium tracking-wide text-orange-200">
              TRUSTED BY ENTREPRENEURS IN 50 STATES AND 80+ COUNTRIES
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-headline animate-hero-fade-up text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance mb-6"
            style={{ animationDelay: "90ms" }}
          >
            The Compliance Partner for{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              Founders Building Across Borders
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="hero-subhead animate-hero-fade-up text-base sm:text-lg lg:text-2xl text-gray-300 max-w-2xl mx-auto text-pretty mb-10"
            style={{ animationDelay: "180ms" }}
          >
            Formation, Tax, Bookkeeping, Payroll and ongoing compliance for US and UK businesses —
            built for entrepreneurs who don't stop at one country.
          </p>

          {/* CTAs */}
          <div
            className="hero-ctas animate-hero-fade-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
            style={{ animationDelay: "270ms" }}
          >
            <Link href="/start-business">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground px-8 py-6 text-lg min-h-[44px] rounded-xl cursor-pointer shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Start Your Business →
              </Button>
            </Link>
            <Link
              href="/how-it-works"
              className="group text-gray-200 hover:text-white transition-colors text-base font-medium min-h-[44px] px-4 flex items-center gap-1"
            >
              See how it works
              <span
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div
            className="hero-trust animate-hero-fade-up flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mb-14"
            style={{ animationDelay: "360ms" }}
          >
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <Globe className="h-4 w-4 text-orange-400" aria-hidden="true" />
              USA + UK Filings
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <ShieldCheck className="h-4 w-4 text-orange-400" aria-hidden="true" />
              Registered Agent Included
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-orange-400" aria-hidden="true" />
              Rated Excellent on Trustpilot
            </span>
          </div>

          {/* Stat cards */}
          <div
            className="animate-hero-fade-up grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto"
            style={{ animationDelay: "450ms" }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="hero-stat rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/10 px-4 py-5 shadow-lg shadow-black/10 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.08]"
              >
                <p className="hero-stat-value text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs lg:text-sm text-gray-400 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Icons */}
      {/* <div className="relative z-20 border-t border-white/5 bg-white/[0.03] backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {featureIcons.map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center space-y-2">
                <div className="h-12 w-12 lg:h-16 lg:w-16 bg-primary/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                  <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" aria-hidden="true" />
                </div>
                <span className="text-xs lg:text-md font-medium text-gray-300">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  );
}
