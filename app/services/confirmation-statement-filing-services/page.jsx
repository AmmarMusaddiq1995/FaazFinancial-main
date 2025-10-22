import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, Calculator, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ConfirmationStatementFilingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Confirmation Statement Filing Service
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Ensure your company remains compliant with Companies House by filing your annual 
            confirmation statement on time. We handle the entire filing process — verifying 
            company details, shareholders, and key information to keep your records up to date.
          </p>
          <Link href="/submission-forms/confirmation-statement-filing-form">
            <Button size="lg" className="text-lg px-8 py-6">
              File Your Confirmation Statement
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Confirmation Statement Filing Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accurate Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We review and confirm all your company details — including directors, 
                  shareholders, and registered address — before filing to ensure accuracy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileSpreadsheet className="h-12 w-12 text-primary mb-4" />
                <CardTitle>On-Time Submission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Avoid penalties or company strike-offs by letting us file your confirmation 
                  statement with Companies House before the deadline.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlert className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Compliance Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ensure full compliance with UK Companies House regulations 
                  so your business remains in good legal standing all year round.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Professional Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experts provide guidance on any company changes, including 
                  share capital updates or officer amendments, before final submission.
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
