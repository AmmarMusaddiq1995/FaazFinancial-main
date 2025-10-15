import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, BarChart3, FileSpreadsheet, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ProBookkeepingServicesLargePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Pro-Bookkeeping Services (Large Business)
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Empower your enterprise with comprehensive bookkeeping solutions
            designed for large-scale operations. We deliver advanced financial
            management, multi-department coordination, and precise reporting to
            maintain accuracy and compliance across your organization.
          </p>
          <Link href="/submission-forms/book-keeping-services-form-large">
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
            Why Large Businesses Need Pro-Bookkeeping
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Enterprise-Scale Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Manage high-volume transactions and multi-branch accounts with
                  precision and real-time financial visibility.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Advanced Financial Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gain access to analytics, forecasting, and business
                  intelligence dashboards to drive smarter financial decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSpreadsheet className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Multi-Department Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get consolidated financial statements that integrate all
                  departments, ensuring accuracy and transparency.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Security & Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We maintain enterprise-grade data protection and ensure full
                  compliance with national and international financial
                  regulations.
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
