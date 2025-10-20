import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Calculator, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function VATRegistrationServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Start Your VAT Registration Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Get your business VAT registered quickly and accurately. 
            Our experts handle the entire VAT registration process with HMRC — 
            ensuring compliance, correct setup, and a smooth transition to VAT reporting.
          </p>
          <Link href="/submission-forms/vat-registration-services-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Register for VAT
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our VAT Registration Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Seamless HMRC Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We manage your VAT registration directly with HMRC — from 
                  application to approval — ensuring accuracy and quick processing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSpreadsheet className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Proper VAT Scheme Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experts help you choose the right VAT scheme — standard, 
                  flat rate, or annual — based on your business type and turnover.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlert className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Compliance & Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ensure all required business details, bank information, 
                  and supporting documents meet HMRC’s VAT registration standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Expert Guidance Post-Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  After registration, we guide you through VAT number usage, 
                  invoicing requirements, and preparation for your first VAT return.
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
