import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ListChecks, Users, DollarSign } from "lucide-react";
import Link from "next/link";

// TODO: replace with your real Calendly URL once available.
export const CALENDLY_URL = "https://calendly.com/zohaib-faazfinancialgroup/30min";

export default function AccountingServiceTemplate({ service }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-16 lg:py-24 px-4 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">
            {service.name} Services
          </h1>
          <p className="text-sm lg:text-xl text-muted-foreground mb-8 text-pretty">
            {service.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 cursor-pointer text-primary-foreground px-8 py-4 text-lg w-full sm:w-auto">
                Book a free consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg w-full sm:w-auto cursor-pointer">
                Send us a message
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Users className="h-7 w-7 text-primary" />
            <h2 className="text-xl lg:text-3xl font-bold">Who this is for</h2>
          </div>
          <ul className="space-y-3">
            {service.whoFor.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm lg:text-base text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <ListChecks className="h-7 w-7 text-primary" />
            <h2 className="text-xl lg:text-3xl font-bold">What's included</h2>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {service.included.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-sm lg:text-base bg-white rounded-lg border p-4">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing signal */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-xl lg:text-3xl font-bold mb-3">Pricing</h2>
          <p className="text-sm lg:text-lg text-muted-foreground mb-2">{service.pricingSignal}</p>
          <p className="text-xs text-muted-foreground">
            {/* TODO: replace with real pricing once available */}
            Final pricing is confirmed after a free consultation based on your specific needs.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 px-4 bg-slate-900 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-balance">
            Ready to talk about {service.name}?
          </h2>
          <p className="text-sm lg:text-lg text-gray-300 mb-8">
            Book a free consultation or send us a message and we'll get back to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 cursor-pointer text-primary-foreground px-8 py-4 text-lg w-full sm:w-auto">
                Book a free consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-slate-900 px-8 py-4 text-lg w-full sm:w-auto cursor-pointer">
                Send us a message
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
