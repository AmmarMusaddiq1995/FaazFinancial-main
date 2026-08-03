"use client";

import { useScrollReveal } from "@/components/ui/use-scroll-reveal";
import { SectionEyebrow } from "@/components/partners/section-eyebrow";
import { whiteLabelFlow } from "@/lib/partner-program-data";

export function WhiteLabelFlow() {
  const sectionRef = useScrollReveal();
  const { eyebrow, title, description, steps } = whiteLabelFlow;

  return (
    <section
      ref={sectionRef}
      className="border-t border-gray-200 bg-card py-16 lg:py-24"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="reveal max-w-2xl">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 text-balance sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 text-pretty sm:text-base">
            {description}
          </p>
        </div>

        {/* Steps — each column opens with its own rule, as in the source design */}
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {steps.map((item, i) => (
            <li
              key={item.step}
              className="reveal border-t-2 border-slate-900 pt-4"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="font-mono text-xs font-semibold tracking-widest text-primary">
                {item.step}
              </span>
              <h3 className="mt-3 text-base font-bold text-slate-900 text-balance">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-gray-500 text-pretty sm:text-sm">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
