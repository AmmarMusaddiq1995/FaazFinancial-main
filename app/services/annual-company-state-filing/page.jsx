import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Clock, FileCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AnnualCompanyStateFilingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Annual Company State Filing Service
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Stay compliant with your state’s annual report requirements. 
            Our Annual Filing Service ensures your business remains in good standing, 
            avoiding late fees, penalties, and potential administrative dissolution.
          </p>
          <Link href="/submission-forms/annual-company-state-filing-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Annual Filing Service
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need Annual State Filing Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Maintain Good Standing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ensure your business stays active and recognized by the state by filing required annual reports on time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Avoid Penalties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Late or missed filings can result in fines, suspension, or even dissolution of your business entity.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accurate & Timely Filing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experts handle your paperwork with accuracy and ensure timely submission to your state’s filing office.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Save Time & Stay Stress-Free</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Let us manage your annual filing so you can focus on running your business — we’ll take care of the compliance.
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
