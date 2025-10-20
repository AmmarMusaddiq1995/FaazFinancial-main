import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calculator, ShieldCheck, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SimpleSA100FilingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Simple Self Assessment (SA100) Filing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            File your personal Self Assessment (SA100) tax return quickly and
            accurately. We handle income reporting, tax calculations, and HMRC
            submissions so you can file stress-free and stay compliant.
          </p>
          <Link href="/submission-forms/simple-sa100-filing-form">
            <Button size="lg" className="text-lg px-8 py-6">
              File Your SA100 Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Simple SA100 Filing Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accurate Tax Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We calculate your income tax and deductions precisely to ensure
                  you pay the right amount and avoid HMRC penalties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Complete SA100 Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team prepares and reviews your SA100 form with all required
                  income, expenses, and allowance details for smooth submission.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>HMRC Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every return is reviewed to meet HMRC guidelines and deadlines,
                  ensuring complete compliance and accuracy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Submission Confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Once filed, you’ll receive confirmation of submission and
                  continued support for any follow-up or HMRC queries.
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
