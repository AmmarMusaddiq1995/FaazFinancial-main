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

export default function LLCFormationPage() {
  return (
    <div>
      <Header />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              LLC Formation Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Start your Limited Liability Company with confidence. We handle
              the paperwork while you focus on building your business.
            </p>

            {/* <Link href={{ pathname: "/page2", query: { id: userId, name: userName } }}></Link> */}

            {/* <Link href="/start-business?serviceType=llc"> */}
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

        {/* Pricing Section */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              LLC Formation Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic LLC</CardTitle>
                  <CardDescription>$49 + State Fee</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>LLC Formation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Articles of Organization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Email Support</span>
                    </li>
                  </ul>
                  <Link href="/start-business">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>Standard LLC</CardTitle>
                  <CardDescription>$149 + State Fee</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Everything in Basic</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Operating Agreement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>EIN Application</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Phone Support</span>
                    </li>
                  </ul>
                  <Link href="/start-business">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Premium LLC</CardTitle>
                  <CardDescription>$299 + State Fee</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Everything in Standard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Registered Agent (1 Year)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Business Banking Setup</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Priority Support</span>
                    </li>
                  </ul>
                  <Link href="/start-business">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
