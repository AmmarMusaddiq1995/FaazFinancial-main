import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Calculator, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function VATReturnFilingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            VAT Return Filing Service
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Stay compliant with HMRC by letting us handle your VAT return filing. 
            Our experts ensure all VAT transactions, input, and output taxes are accurately reported — 
            minimizing errors and keeping your business on track with timely submissions.
          </p>
          <Link href="/submission-forms/vat-return-filing-services-form">
            <Button size="lg" className="text-lg px-8 py-6">
              File Your VAT Return
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our VAT Return Filing Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accurate VAT Calculations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We calculate input and output VAT precisely, ensuring your business claims 
                  eligible refunds and reports correct payable amounts to HMRC.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSpreadsheet className="h-12 w-12 text-primary mb-4" />
                <CardTitle>MTD-Compliant Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our service fully complies with HMRC’s Making Tax Digital (MTD) 
                  requirements, filing VAT returns through approved digital software.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlert className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Error Prevention & Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every return undergoes a detailed review process to prevent 
                  discrepancies, late submissions, or penalties from HMRC.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Expert Support & Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get ongoing support from our tax experts — including assistance with 
                  VAT registration, record keeping, and submission tracking.
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
