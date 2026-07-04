import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { FooterCTASection } from "@/components/footer-cta-section";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ITServicesTeaser } from "@/components/it-services-teaser";
// Unused imports stay commented alongside their commented sections below —
// re-enable both together. Keeping them imported ships dead JS to the client.
// import { PricingCategoriesSection } from "@/components/pricing-categories-section";
import { PricingSection } from "@/components/pricing-section.jsx";
// import { ServicesSection } from "@/components/services-section";
// import { Separator } from "@/components/ui/separator";
import TestimonialsSection from "@/components/testimonials";
import { ValuePropsSection } from "@/components/value-props-section";
import { WhyInternationalFounders } from "@/components/why-international-founders";


export default function HomePage() {
  return(
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ValuePropsSection />
        {/* <ServicesSection /> */}
        <WhyInternationalFounders />
        <PricingSection />
        <ITServicesTeaser />
        <CTASection />
        <TestimonialsSection />
        {/* <PricingCategoriesSection /> */}
        {/* <Separator /> */}
        <FooterCTASection />
      </main>
      <Footer />
    </div>
  )
}