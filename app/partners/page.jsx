import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PartnerHero } from "@/components/partners/partner-hero";
import { PartnerOffersSection } from "@/components/partners/partner-offers-section";
import { BaseRatesSection } from "@/components/partners/base-rates-section";
import { WhiteLabelFlow } from "@/components/partners/white-label-flow";
import { PartnerCta } from "@/components/partners/partner-cta";

export const metadata = {
  title: "Partner Program | Faaz Financial Group",
  description:
    "Earn by referring LLC formation clients to Faaz Financial Group. Take a flat $20 per referral, or run your own branded formation business on our backend as a White Label partner.",
  openGraph: {
    title: "Faaz Partner Program — Refer a client once, get paid every time",
    description:
      "Two ways to earn by referring LLC formation clients to Faaz Financial Group: a flat $20 commission, or White Label with your own pricing.",
    url: "https://faazfinancialgroup.com/partners",
    siteName: "Faaz Financial Group",
    type: "website",
  },
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PartnerHero />
        <PartnerOffersSection />
        <BaseRatesSection />
        <WhiteLabelFlow />
        <PartnerCta />
      </main>
      <Footer />
    </div>
  );
}
