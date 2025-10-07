import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Shield } from "lucide-react"
import Link from "next/link"

export default function BusinessFormationGuidePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Complete Business Formation Guide</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Everything you need to know about starting your business. From choosing the right structure to filing
            paperwork, we'll guide you through every step.
          </p>
          <Link href="/start-business">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your Business
            </Button>
          </Link>
        </div>
      </section>

      {/* Guide Steps */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Step-by-Step Formation Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                  1
                </div>
                <CardTitle>Choose Business Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Decide between LLC, Corporation, Partnership, or Sole Proprietorship based on your needs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                  2
                </div>
                <CardTitle>Select Business Name</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Choose a unique name and check availability in your state's business registry.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                  3
                </div>
                <CardTitle>File Formation Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Submit Articles of Incorporation or Organization to your state's Secretary of State.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-2">
                  4
                </div>
                <CardTitle>Get EIN & Licenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Obtain your Employer Identification Number and any required business licenses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Business Structure</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Limited Liability Company (LLC)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Most popular choice for small businesses. Offers personal asset protection with tax flexibility.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Personal asset protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Tax flexibility</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Simple management structure</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Corporation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Best for businesses planning to raise capital or go public. More complex but offers maximum
                  protection.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Maximum liability protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Easier to raise capital</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Perpetual existence</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let our experts handle the paperwork while you focus on building your business.
          </p>
          <Link href="/start-business">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
