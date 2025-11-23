import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PayrollWithholdingPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute -z-20 top-0 left-0 w-full min-h-full"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e6e6e6 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      ></div>
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Payroll Withholding Account Registration
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Register your Payroll Withholding Account effortlessly. We handle
            state-level employer account setup so you can legally process
            payroll, remit taxes, and remain compliant without dealing with
            complex filing steps.
          </p>
          <Link href="/submission-forms/payroll-withholding-services-form">
            <Button size="lg" className="text-lg px-8 py-6 shadow-lg shadow-black transition-all duration-300 hover:scale-105 cursor-pointer">
              Start Registration
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Payroll Withholding Registration Is Essential
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>State Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every employer must register for a Payroll Withholding Account
                  to comply with state employment tax laws. We ensure proper and
                  timely registration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Required for Payroll Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You cannot run payroll or remit state income tax without this
                  account. We help you set it up correctly from day one.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Avoid Penalties & Delays</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Improper or delayed registration can lead to penalties. Our
                  experts take care of everything to ensure full compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fast & Accurate Filing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We streamline the entire registration process, saving you time
                  and helping your business start payroll operations quickly.
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
