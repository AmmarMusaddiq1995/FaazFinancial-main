import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Briefcase, Shield, Rocket } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function DBATrademarkRegistrationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            DBA / Trademark Registration
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Secure your business name and brand identity legally. 
            We help you file your DBA (Doing Business As) or Trademark registration quickly, 
            ensuring compliance across all U.S. states.
          </p>
          <Link href="/submission-forms/dba-trademark-registration-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Start My Registration
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need DBA / Trademark Registration
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Legal Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Protect your business name and brand identity from being used by others.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Operate Under a Trade Name</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A DBA lets you legally run your business under a trade name 
                  different from your LLC or personal name.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Check className="h-12 w-12 text-primary mb-4" />
                <CardTitle>State & Federal Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We handle all state filings and USPTO paperwork, 
                  ensuring full compliance for your DBA or trademark.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Rocket className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Build Brand Credibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gain customer trust and stand out by registering your business or brand name officially.
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
