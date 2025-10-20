import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calculator, ShieldCheck, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SimpleCT600FilingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Simple Corporation Tax Return Filing (CT600)
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            File your company’s Corporation Tax Return (CT600) quickly and
            accurately. Our service ensures full HMRC compliance, accurate
            submission, and stress-free tax filing for your limited company.
          </p>
          <Link href="/submission-forms/simple-corp-tax-return-ct600-form">
            <Button size="lg" className="text-lg px-8 py-6">
              File Your CT600 Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our CT600 Filing Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accurate Tax Calculation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We calculate your Corporation Tax based on your company’s
                  financials to ensure correct figures before submission.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>CT600 Form Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experts prepare your CT600 form and supporting schedules
                  according to HMRC’s latest filing requirements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>HMRC Submission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We file your CT600 securely through HMRC’s online portal,
                  ensuring timely and compliant submission every time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Confirmation & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive confirmation of submission and access ongoing support
                  for any tax-related questions after filing.
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
