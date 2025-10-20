import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Calculator, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AnnualAccountsPreparationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Simple and Complex Annual Accounts Preparation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            We prepare both simple and complex annual accounts for businesses of all sizes.
            From small enterprises to large corporations, our experts ensure full accuracy,
            compliance with accounting standards, and clarity for stakeholders and HMRC.
          </p>
          <Link href="/submission-forms/annual-accounts-preparation-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Your Annual Accounts Prepared
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Annual Accounts Preparation Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accurate Financial Statements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prepare profit & loss statements, balance sheets, and notes with
                  precise figures — giving you complete clarity on your company’s performance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSpreadsheet className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Complex Accounts Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  From multi-entity consolidations to group reporting, we handle
                  complex accounting structures with expert care and accuracy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlert className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All reports comply with UK accounting standards (FRS 102 / FRS 105)
                  and HMRC filing requirements, ensuring your business remains fully compliant.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Expert Guidance & Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our accountants review your data, advise on tax efficiency, and
                  provide ongoing support — ensuring your year-end accounts are flawless.
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
