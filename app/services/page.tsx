import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CreditCard, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function BusinessBankingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Business Banking Solutions</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Open a business bank account and manage your finances with our trusted banking partners. Get the financial
            foundation your business needs to succeed.
          </p>
          <Link href="/start-business">
            <Button size="lg" className="text-lg px-8 py-6">
              Open Business Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Banking Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Building2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Business Checking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Professional business checking accounts with no monthly fees and unlimited transactions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CreditCard className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Business Credit Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build business credit with rewards cards designed for small businesses.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>FDIC Insured</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your deposits are protected up to $250,000 with FDIC insurance coverage.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Business Loans</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access to business loans and lines of credit to fuel your growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Open Your Business Account?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get started with professional banking solutions tailored for your business needs.
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
