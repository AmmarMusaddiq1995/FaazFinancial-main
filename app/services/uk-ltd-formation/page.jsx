import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileText, ShieldCheck, Globe } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function UKFormationLTDPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            UK Formation LTD
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Start your business journey in the United Kingdom with our UK LTD
            Formation Service. We handle company registration with Companies
            House, ensuring full compliance with HMRC and UK regulations.
          </p>
          <Link href="/submission-forms/uk-ltd-formation-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Register Your LTD Company
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our UK LTD Formation Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Company Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get your company registered with Companies House quickly and
                  professionally, ensuring all legal requirements are met.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Official Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive your Certificate of Incorporation, Memorandum, and
                  Articles of Association directly after registration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>HMRC Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ensure your company meets HMRC requirements, helping you
                  stay compliant with UK tax and accounting standards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Registered UK Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Secure a professional registered office address in the UK for
                  all your legal and correspondence purposes.
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
