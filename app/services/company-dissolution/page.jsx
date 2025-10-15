import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CompanyDissolutionServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Company Dissolution Service
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Officially close your business with ease and full compliance. Our
            experts handle all dissolution paperwork, tax clearances, and state
            filings to ensure your business is legally and properly closed.
          </p>
          <Link href="/submission-forms/company-dissolution-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Company Dissolution
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need Company Dissolution Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Stay Legally Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Avoid penalties and legal obligations by formally dissolving
                  your business with the state instead of simply stopping
                  operations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Handle All Paperwork</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prepare and file dissolution documents, tax forms, and
                  final reports required by your state and the IRS.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Peace of Mind</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Rest easy knowing your business is closed correctly, with no
                  lingering tax or legal responsibilities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fast & Efficient Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team ensures a quick turnaround so your company is
                  officially dissolved without delays or complications.
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
