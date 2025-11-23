
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CorporationFormationForm } from "@/components/submission-forms/c-corporation-formation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Clock, Check, Loader2 } from "lucide-react";
import Link from "next/link";

function CorpFormationContent() {
  const searchParams = useSearchParams();

  const pricingData = {
    packageType: searchParams.get("packageType") || "normal",
    state: searchParams.get("state") || "Alabama",
    serviceType: searchParams.get("serviceType") || "C Corporation Formation",
    planName: searchParams.get("planName") || "Starter",
    price: searchParams.get("price") || "0",
  };

  // If pricing data is provided, show the form instead of the landing page
  if (pricingData.price !== "0") {
  return (
    <div>
      <CorporationFormationForm pricingData={pricingData} />
    </div>
  );
}

return (
  <div className="relative min-h-screen">
    <div className="absolute -z-20 top-0 left-0 w-full min-h-full" style={{backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)", backgroundSize: "10px 10px"}}></div>
    {/* Hero Section */}
    <section className="py-20 px-4">
      <div className="container max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
          Corporation Formation Services
        </h1>
        <p className="text-xl text-muted-foreground mb-8 text-pretty">
          Start your Corporation with confidence. We handle the
          paperwork while you focus on building your business.
        </p>

        <Link
          href={{
            pathname: "/submission-forms/corporation-formation-form",
            
          }}
        >
          <Button size="lg" className="text-lg px-8 py-6 shadow-lg shadow-black transition-all duration-300 hover:scale-105 cursor-pointer">
            Start Your Corporation Today
          </Button>
        </Link>
      </div>
    </section>

    {/* Benefits Section */}
    <section className="py-16 px-4 bg-muted/50">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Corporation Formation?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Personal Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Protect your personal assets from business liabilities and
                debts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <FileText className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Tax Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Enjoy flexible tax options and potential deductions for your
                business.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Quick Setup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get your Corporation formed quickly with our streamlined process.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Check className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Professional Image</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Establish credibility with customers, vendors, and partners.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </div>
);
}







export default function CorporationFormationPage() {
  return (
    <div>
      <Header />
      {/* ✅ Wrap inside Suspense */}
      <Suspense fallback={<div><Loader2 className="h-4 w-4 animate-spin" /></div>}>
        <CorpFormationContent />
      </Suspense>
      <Footer />
    </div>
  );
}

