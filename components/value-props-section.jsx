"use client";

import { Building2, Landmark, Calculator, Headset } from "lucide-react";
import { useScrollReveal } from "@/components/ui/use-scroll-reveal";

const valueProps = [
  {
    Icon: Building2,
    title: "Formation & Compliance",
    body: "LLC, Corporation, and UK Ltd formation — done right the first time, in any state or jurisdiction.",
  },
  {
    Icon: Landmark,
    title: "Banking & Bookkeeping",
    body: "US business bank account setup and ongoing bookkeeping, kept clean and audit-ready.",
  },
  {
    Icon: Calculator,
    title: "Tax Advice & Filing",
    body: "From EIN and ITIN to UK Corporation Tax and VAT — one team handles both sides of the Atlantic.",
  },
  {
    Icon: Headset,
    title: "Real Human Support",
    body: "No ticket queues. Talk to someone who actually understands cross-border compliance.",
  },
];

export function ValuePropsSection() {
  const sectionRef = useScrollReveal();

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-black">
      <div className="container px-4 mx-auto">
        <div className="reveal text-center mb-12 lg:mb-16">
          <h2 className="text-2xl text-white sm:text-3xl lg:text-5xl font-bold tracking-tight text-balance">
            Everything Your Business Needs,{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              In Every Jurisdiction You Operate
            </span>
            {/* <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              Founders
            </span> */}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto ">
          {valueProps.map(({ Icon, title, body }, i) => (
            <div
              key={title}
              className="reveal group relative rounded-2xl bg-white border border-gray-200/80 p-7 shadow-sm  transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="h-13 w-13 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-6 shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-primary/35 group-hover:scale-105">
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>

              <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-2 text-balance">
                {title}
              </h3>
              <p className="text-sm lg:text-[15px] text-muted-foreground leading-relaxed text-pretty">
                {body}
              </p>

              <span
                className="absolute bottom-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
