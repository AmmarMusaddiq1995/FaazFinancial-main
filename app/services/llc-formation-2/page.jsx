

/*------------ Fixed Code ------------ */


"use client";

import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Shield, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BusinessFormationForm } from "@/components/submission-forms/llc-formation-form";
import { useSearchParams } from "next/navigation";

// ✅ Split the logic into a child component that uses useSearchParams()
function LLCFormationContent() {
  const searchParams = useSearchParams();

  const pricingData = {
    packageType: searchParams.get("packageType") || "normal",
    state: searchParams.get("state") || "Alabama",
    serviceType: searchParams.get("serviceType") || "LLC Formation",
    planName: searchParams.get("planName") || "Starter",
    price: searchParams.get("price") || "0",
  };

  // If pricing data is provided, show the form instead of the landing page
  if (pricingData.price !== "0") {
    return (
      <div className="mt-10 mb-10">
        <BusinessFormationForm pricingData={pricingData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            LLC Formation Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Start your Limited Liability Company with confidence. We handle the
            paperwork while you focus on building your business.
          </p>

          <Link
            href={{
              pathname: "/start-business",
              query: { serviceType: "llc" },
            }}
          >
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your LLC Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose LLC Formation?
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
                  Get your LLC formed quickly with our streamlined process.
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

export default function LLCFormationPage() {
  return (
    <div>
      <Header />
      {/* ✅ Wrap with Suspense to fix the error */}
      <Suspense fallback={<div>Loading...</div>}>
        <LLCFormationContent />
      </Suspense>
      <Footer />
    </div>
  );
}
