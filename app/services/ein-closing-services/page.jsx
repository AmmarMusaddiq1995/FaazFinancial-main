import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Shield, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function EINClosingServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            EIN Closing Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Closing your business or no longer using your EIN? 
            We handle the entire EIN closure process with the IRS, ensuring your records are properly finalized 
            and preventing future tax obligations or penalties.
          </p>
          <Link href="/submission-forms/ein-closing-services-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Close My EIN
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need EIN Closing Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Avoid Future Tax Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Properly closing your EIN prevents unwanted tax notices and liability for an inactive business.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>IRS Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We handle the paperwork and communication with the IRS to ensure full compliance and smooth closure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Prevent Penalties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Avoid fines or correspondence from the IRS by officially closing your EIN the right way.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Save Time & Hassle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We manage the process for you — from document preparation to IRS submission — so you can focus on moving forward.
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
