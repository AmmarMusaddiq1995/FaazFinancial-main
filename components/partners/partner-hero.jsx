import { partnerHero } from "@/lib/partner-program-data";

// Dark hero, left-aligned. Negative top margin pulls the section under the
// sticky glass header (same technique as components/hero-section.jsx).
export function PartnerHero() {
  const { eyebrow, headline, subhead, stats } = partnerHero;

  return (
    <section className="relative -mt-20 overflow-hidden bg-slate-950 pt-20 text-white">
      {/* Layered background: subtle grid + soft glows */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.09) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 30% 40%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 30% 40%, black 40%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-orange-600/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl py-16 lg:py-28">
          {/* Eyebrow */}
          <div
            className="animate-hero-fade-up mb-7 flex items-center gap-2"
            style={{ animationDelay: "0ms" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full bg-primary"
              aria-hidden="true"
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
              {eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="animate-hero-fade-up mb-6 text-3xl font-bold leading-[1.12] tracking-tight text-balance sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "90ms" }}
          >
            {headline.before}
            <span className="text-primary">{headline.highlight}</span>
            {headline.after}
          </h1>

          {/* Subhead */}
          <p
            className="animate-hero-fade-up max-w-2xl text-sm leading-relaxed text-gray-400 text-pretty sm:text-base lg:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            {subhead}
          </p>

          {/* Stats */}
          <dl
            className="animate-hero-fade-up mt-12 flex flex-wrap gap-x-10 gap-y-8 sm:mt-14 sm:gap-x-16"
            style={{ animationDelay: "270ms" }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-xs text-gray-500 sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
