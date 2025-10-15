import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, FileCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function BOIFilingServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            BOI Filing Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Stay compliant with the new FinCEN requirements by filing your
            Beneficial Ownership Information (BOI) report. Our expert filing
            service ensures your company meets federal compliance regulations
            accurately and on time.
          </p>
          <Link href="/submission-forms/boi-filing-services-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Get BOI Filing Service
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need BOI Filing Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Stay Legally Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The Corporate Transparency Act requires all U.S. businesses to
                  file their BOI report. We make sure your submission meets
                  federal standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Avoid Fines & Penalties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Missing or incorrect filings can result in heavy fines or legal
                  consequences. We ensure your report is filed correctly and on time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Secure Data Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your personal and business information is handled with complete
                  confidentiality and in compliance with FinCEN security standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fast & Hassle-Free Filing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We manage the entire filing process for you — from data
                  collection to submission — saving you time and stress.
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
