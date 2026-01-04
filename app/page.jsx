import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PricingSection } from "@/components/pricing-section.jsx";
import { ServicesSection } from "@/components/services-section";
import { Separator } from "@/components/ui/separator";
import Script from "next/script";
import TestimonialsSection from "@/components/testimonials";


export default function HomePage() {
  return(
    <div className="min-h-screen">
      <Header />
      <main>
        
        <HeroSection />      
        <ServicesSection />
        <PricingSection />
        <CTASection />
       {/* <TestimonialsSection />  */}
        <Separator />
      </main>
      <Footer />
    </div>
  )
}