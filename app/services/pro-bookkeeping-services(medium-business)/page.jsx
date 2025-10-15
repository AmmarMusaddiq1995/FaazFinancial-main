import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ProBookkeepingServicesMediumPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Pro-Bookkeeping Services (Medium Business)
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Manage your growing business efficiently with our expert bookkeeping
            services tailored for medium-sized enterprises. We provide detailed
            financial tracking, account reconciliation, and reporting to help
            you stay compliant and make data-driven decisions.
          </p>
          <Link href="/submission-forms/book-keeping-services-form-medium">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Bookkeeping Service
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need Pro-Bookkeeping Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Enhanced Financial Oversight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Keep track of multiple accounts, cash flow, and transactions
                  with accuracy and transparency across all departments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Comprehensive Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive in-depth monthly and quarterly reports to analyze
                  financial performance and make informed business decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Regulatory & Tax Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ensure your financial records align with IRS and state
                  regulations, reducing the risk of fines and audits.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Time & Resource Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Let our professionals handle your bookkeeping so your team can
                  focus on business growth, strategy, and operations.
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
