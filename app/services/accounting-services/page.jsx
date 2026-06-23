import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { accountingCategories, accountingServices } from "@/lib/accounting-services-data";
import { CALENDLY_URL } from "@/components/accounting-service-template";

export const metadata = {
  title: "Accounting Services | Faaz Financial Group",
  description:
    "Bookkeeping, accounting & financial management, and operational support services for US businesses - from monthly bookkeeping to fractional CFO support.",
};

export default function AccountingServicesHubPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-16 lg:py-24 px-4 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">
            Accounting Services
          </h1>
          <p className="text-sm lg:text-xl text-muted-foreground mb-8 text-pretty">
            From day-to-day bookkeeping to fractional CFO support, explore our full range of
            accounting and financial management services for US businesses.
          </p>
          <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 cursor-pointer text-primary-foreground px-8 py-4 text-lg">
              Book a free consultation
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      {accountingCategories.map((category) => {
        const services = accountingServices.filter((s) => s.category === category.id);
        return (
          <section key={category.id} className="py-16 px-4 even:bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-xl lg:text-3xl font-bold mb-8 text-balance">{category.title}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`}>
                    <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-base lg:text-lg flex items-center justify-between gap-2">
                          {service.name}
                          <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{service.intro}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 lg:py-20 px-4 bg-slate-900 text-white">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-balance">
            Not sure which service you need?
          </h2>
          <p className="text-sm lg:text-lg text-gray-300 mb-8">
            Book a free consultation and we'll help you figure out the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 cursor-pointer text-primary-foreground px-8 py-4 text-lg w-full sm:w-auto">
                Book a free consultation
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg w-full sm:w-auto cursor-pointer">
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
