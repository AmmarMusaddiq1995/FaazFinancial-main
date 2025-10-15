import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function EINServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            EIN Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Obtain your Federal Employer Identification Number (EIN) quickly and
            hassle-free. We take care of the IRS filing process for your
            business, ensuring accurate and timely registration for your tax and
            banking needs.
          </p>
          <Link href="/submission-forms/ein-services-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Get EIN Service
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need EIN Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>IRS Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  An EIN is required by the IRS for tax filing, business
                  registration, and legal compliance. We handle the entire
                  process for you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Open Business Bank Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most banks require an EIN to open a business account. Get your
                  EIN fast and start managing your business finances legally.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Hire Employees Legally</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you plan to hire employees, an EIN is required for payroll
                  and employment tax reporting.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Quick & Hassle-Free Filing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We handle your EIN registration with the IRS, saving you time
                  and avoiding filing errors.
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

