import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Calculator, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function InitialComplianceAfterFormationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Initial Compliance After Formation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Ensure your newly formed company meets all initial compliance requirements with HMRC and Companies House. 
            We handle the essential filings, registrations, and documentation to set your business on a fully compliant foundation.
          </p>
          <Link href="/submission-forms/initial-compliance-after-formation-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your Compliance Setup
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Initial Compliance Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>HMRC Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We handle your corporation tax registration with HMRC to ensure your new business meets all initial tax obligations on time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSpreadsheet className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Company Records Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Maintain proper statutory records including share registers, director details, and accounting reference dates for compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlert className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Confirmation Statement Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay on track with Companies House confirmation statements and understand your key filing deadlines from the start.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Ongoing Compliance Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We provide continuous support and reminders for all statutory filings, ensuring your company remains compliant from day one.
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
