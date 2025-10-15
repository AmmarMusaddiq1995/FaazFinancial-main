import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PricingSection } from "@/components/pricing-section";
import { ServicesSection } from "@/components/services-section";
import { Separator } from "@/components/ui/separator";


export default function HomePage() {
  return(
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />      
        <ServicesSection />
        <PricingSection />
        <CTASection />
        <Separator />
      </main>
      <Footer />
    </div>
  )
}