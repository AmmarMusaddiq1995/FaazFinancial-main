import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Calculator, BarChart3, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function FullYearReconciliationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Full Year Reconciliation Service
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Ensure your books are accurate and compliant with our Full Year
            Reconciliation Service. We analyze and reconcile your company’s
            financial records, ensuring every transaction aligns perfectly with
            your bank statements and accounting reports.
          </p>
          <Link href="/submission-forms/full-year-reconciliation-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Reconciliation Service
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need Full Year Reconciliation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <FileSearch className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Identify Discrepancies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We carefully review your transactions to detect and correct
                  any inconsistencies in your financial records throughout the
                  year.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accurate Financial Records</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experts ensure that your books, statements, and ledgers
                  are precisely balanced for complete financial transparency.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Year-End Reporting Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive accurate reconciled reports that simplify your
                  year-end closing, audits, and tax filing preparations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Compliance & Accuracy Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We guarantee error-free reconciliation that aligns with
                  accounting standards and ensures full regulatory compliance.
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
