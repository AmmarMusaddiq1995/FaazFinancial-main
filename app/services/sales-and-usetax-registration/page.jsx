import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, CheckCircle, DollarSign } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SalesUseTaxRegistrationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Sales & Use Tax Registration Service
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Register your business for state sales and use tax quickly and
            accurately. We handle the entire registration process so your
            business remains compliant and ready to collect and remit sales tax
            in any U.S. state.
          </p>
          <Link href="/submission-forms/sales-and-usetax-registration-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Sales & Use Tax Registration
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need Sales & Use Tax Registration
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Stay State Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most states require businesses to register before collecting
                  or remitting sales tax. We ensure your filings meet state
                  regulations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Tax Collection Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get authorized to collect and remit sales and use tax legally
                  so your business operates smoothly from day one.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>We Handle All Paperwork</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experts take care of all registration forms and state
                  filings, saving you time and avoiding errors.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fast & Reliable Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We process your registration efficiently to ensure you receive
                  your tax ID and filing credentials without delay.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
