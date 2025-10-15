import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ProBookkeepingServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Pro-Bookkeeping Services (Small Business)
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Keep your small business finances organized and stress-free with our
            professional bookkeeping services. We manage your books, reconcile
            accounts, and provide clear financial insights so you can focus on
            growing your business.
          </p>
          <Link href="/submission-forms/book-keeping-services-form-small">
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
                <CardTitle>Accurate Financial Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We maintain precise and up-to-date financial records so you
                  always know where your business stands.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Tax-Ready Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay ready for tax season with properly categorized expenses
                  and organized financial statements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Financial Clarity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gain clear insights into your cash flow, profits, and expenses
                  to make smarter business decisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Save Time & Reduce Stress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Focus on running your business while we handle your daily
                  bookkeeping, reconciliations, and reporting efficiently.
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
