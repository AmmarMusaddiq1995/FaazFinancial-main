"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MapPin, ClipboardList, BadgeCheck } from "lucide-react";
import { useScrollReveal } from "@/components/ui/use-scroll-reveal";

const steps = [
  {
    Icon: MapPin,
    title: "Choose Your State",
    body: "Select the state where you want to form your LLC and we'll handle the rest.",
  },
  {
    Icon: ClipboardList,
    title: "Provide Your Information",
    body: "Fill out our simple form with your business details and contact information.",
  },
  {
    Icon: BadgeCheck,
    title: "We File Your LLC",
    body: "We prepare and file your Articles of Organization with the state.",
  },
];

export function CTASection() {
  const router = useRouter();
  const sectionRef = useScrollReveal();

  const handleClick = () => {
    router.push("/services/llc-formation-2");
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-24 bg-slate-950 text-white border-t border-white/[0.06] overflow-hidden"
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
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container px-4 text-center mx-auto">
        {/* Header */}
        <div className="reveal mb-14 lg:mb-20">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-orange-400 mb-4">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-balance">
            LLC Formation in{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="reveal relative max-w-5xl mx-auto mb-14 lg:mb-16">
          {/* Connector track (desktop) — sits at the vertical center of the circles */}
          <div
            className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-white/10"
            aria-hidden="true"
          />
          {/* Animated progress line */}
          <div
            className="timeline-line hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-orange-500/80 via-orange-400 to-amber-400/80"
            aria-hidden="true"
          />

          <div className="grid md:grid-cols-3 gap-2 md:gap-8">
            {steps.map(({ Icon, title, body }, i) => (
              <div key={title} className="group relative">
                {/* Numbered circle with icon */}
                <div className="relative z-10 h-20 w-20 mx-auto mb-3 md:mb-6 rounded-full bg-slate-950 border border-white/15 shadow-xl shadow-black/30 flex items-center justify-center transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-primary/20 group-hover:-translate-y-1">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-slate-950 border border-primary/50 text-orange-400 text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-lg lg:text-xl font-bold mb-2 text-balance transition-colors duration-300 group-hover:text-orange-400">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm lg:text-base leading-relaxed text-pretty max-w-xs mx-auto">
                  {body}
                </p>

                {/* Vertical connector between stacked steps (mobile only) */}
                {i < steps.length - 1 && (
                  <div
                    className="md:hidden h-10 w-px mx-auto mt-5 bg-gradient-to-b from-primary/50 to-white/10"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal">
          <Button
            onClick={handleClick}
            size="lg"
            className="bg-primary text-primary-foreground px-8 py-6 text-lg min-h-[44px] rounded-xl cursor-pointer shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            Start Your LLC Today
          </Button>
        </div>
      </div>
    </section>
  );
}
