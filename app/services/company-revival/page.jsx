import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, FileCheck2, Building2, Shield } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CompanyRevivalServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Company Revival Service
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Bring your business back to life with our expert Company Revival
            Service. Whether your company has been struck off or is inactive, we
            handle all legal, tax, and compliance formalities to get it back in
            good standing quickly and efficiently.
          </p>
          <Link href="/submission-forms/company-revival-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Revive Your Company
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Company Revival Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <RefreshCw className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Restore Your Business Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We help you reinstate your company’s active legal status,
                  ensuring it’s recognized once again by state and federal
                  authorities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileCheck2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Clear Compliance Backlogs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experts file all pending annual reports, tax documents,
                  and state requirements to restore your business compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Reinstate Business Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Once revived, you can reopen bank accounts, sign contracts,
                  and legally operate your company without restrictions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Legal Protection & Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ensure full legal protection and guide you through every
                  step of the reinstatement process, avoiding penalties or
                  non-compliance risks.
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
