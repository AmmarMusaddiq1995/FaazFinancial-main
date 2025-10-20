import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Calculator, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ComplexCT600FilingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Complex Corporation Tax Return (CT600)
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Handle complex Corporation Tax Return (CT600) filings with expert
            accuracy and compliance. Our team manages advanced tax computations,
            group reliefs, and detailed disclosures to ensure full HMRC
            compliance for your company.
          </p>
          <Link href="/submission-forms/complex-ct600-filing-form">
            <Button size="lg" className="text-lg px-8 py-6">
              File Your Complex CT600
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Complex CT600 Filing Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Advanced Tax Calculations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We manage complex tax computations involving multiple income
                  streams, adjustments, and capital allowances for accuracy and
                  compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSpreadsheet className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Group Relief & Loss Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our specialists handle group company submissions, loss reliefs,
                  and tax adjustments for businesses with complex structures.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlert className="h-12 w-12 text-primary mb-4" />
                <CardTitle>HMRC Compliance Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every return is carefully reviewed to meet HMRC’s latest tax
                  rules and accounting standards, minimizing risk of penalties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Submission & Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We handle the submission process and provide post-filing
                  guidance for audits, amendments, and HMRC queries.
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
