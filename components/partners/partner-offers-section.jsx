"use client";

import { useScrollReveal } from "@/components/ui/use-scroll-reveal";
import { SectionEyebrow } from "@/components/partners/section-eyebrow";
import { PartnerOfferCard } from "@/components/partners/partner-offer-card";
import { partnerOffers } from "@/lib/partner-program-data";

export function PartnerOffersSection() {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      className="bg-card pt-16 pb-10 lg:pt-24 lg:pb-14"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="reveal max-w-2xl">
          <SectionEyebrow>The Offer</SectionEyebrow>
          <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 text-balance sm:text-3xl lg:text-4xl">
            Choose how you get paid
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-600 text-pretty sm:text-base">
            Every referral gets the same quality of service on our end. What
            changes is how the commercial side works — and how much of it you
            control.
          </p>
        </div>

        {/* Cards — pt-4 keeps the "most chosen" badge clear of the grid edge */}
        <div className="mt-10 grid gap-6 pt-4 md:grid-cols-2 lg:mt-14 lg:gap-8">
          {partnerOffers.map((offer, i) => (
            <div
              key={offer.option}
              className="reveal h-full"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <PartnerOfferCard {...offer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
