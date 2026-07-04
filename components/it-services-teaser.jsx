"use client";

import { Button } from "@/components/ui/button";
import { Code2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useScrollReveal } from "@/components/ui/use-scroll-reveal";

const cards = [
  {
    Icon: Code2,
    title: "Web Development",
    body: "Custom business and e-commerce websites built to convert.",
    offset: "",
  },
  {
    Icon: Sparkles,
    title: "AI Automation",
    body: "Workflow and chatbot automation that cuts manual busywork.",
    offset: "sm:translate-y-8",
  },
];

export function ITServicesTeaser() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white overflow-hidden"
    >
      {/* Layered background: subtle grid + soft glows */}
      <div
        className="absolute inset-0 opacity-[0.2]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.09) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 90% at 70% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 90% at 70% 50%, black 30%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -right-32 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-orange-600/[0.08] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-orange-300 px-4 py-1.5 text-xs sm:text-sm font-medium tracking-wide mb-6">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Web Development & AI Automation
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight mb-5 text-balance">
              Need more than compliance? We{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                build
              </span>{" "}
              your tech, too.
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-gray-400 leading-relaxed mb-9 text-pretty max-w-xl">
              Beyond formation and bookkeeping, we design and build websites and AI-powered
              automation that helps your business run leaner and look sharper online.
            </p>
            <Link href="/it-services">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground px-8 py-6 text-base lg:text-lg min-h-[44px] rounded-xl cursor-pointer shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                Explore IT Services
                <ArrowRight
                  className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>

          {/* Staggered glass cards */}
          <div className="reveal grid sm:grid-cols-2 gap-5 lg:gap-6 sm:pb-8">
            {cards.map(({ Icon, title, body, offset }) => (
              <div
                key={title}
                className={`group relative rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-7 lg:p-8 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-white/[0.06] hover:shadow-2xl hover:shadow-primary/10 ${offset}`}
              >
                {/* Icon tile */}
                <div className="h-14 w-14 lg:h-16 lg:w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg shadow-primary/25 transition-all duration-300 group-hover:shadow-primary/40 group-hover:scale-105">
                  <Icon className="h-7 w-7 lg:h-8 lg:w-8 text-white" aria-hidden="true" />
                </div>

                <h3 className="text-lg lg:text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm lg:text-base text-gray-400 leading-relaxed">
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
      </div>
    </section>
  );
}
