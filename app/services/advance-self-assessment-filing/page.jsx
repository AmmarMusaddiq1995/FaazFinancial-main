import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Calculator, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AdvanceSA100FilingPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute -z-20 top-0 left-0 w-full min-h-full" style={{backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)", backgroundSize: "10px 10px"}}></div>
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Advance Self Assessment (SA100) Filing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Manage complex Self Assessment (SA100) filings with expert precision.
            We handle multiple income sources, foreign earnings, property income,
            and capital gains to ensure full HMRC compliance and peace of mind.
          </p>
          <Link href="/submission-forms/simple-sa100-filing-form">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg shadow-black transition-all duration-300 hover:scale-105 cursor-pointer">
              File Your Advance SA100
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Advance SA100 Filing Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Complex Tax Calculations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We manage detailed tax computations involving multiple income
                  streams, property income, dividends, and foreign earnings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSpreadsheet className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Capital Gains & Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team prepares accurate reports for capital gains, stock
                  investments, and complex financial disclosures for HMRC filing.
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
                  Each return is thoroughly reviewed to meet HMRC’s standards,
                  minimizing risks of errors or penalties for complex filings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Full Support & Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get expert assistance from filing to submission and aftercare,
                  including handling HMRC queries and amendments if required.
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
