import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, FileText, DollarSign, Clock } from "lucide-react"
import Link from "next/link"

export default function StateRequirementsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">State-Specific Business Requirements</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Every state has different requirements for business formation. Find out what you need to know for your state
            and get compliant from day one.
          </p>
          <Link href="/start-business">
            <Button size="lg" className="text-lg px-8 py-6">
              Check Your State Requirements
            </Button>
          </Link>
        </div>
      </section>

      {/* Popular States */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Formation States</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delaware
                </CardTitle>
                <CardDescription>Business-friendly laws</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Filing Fee:</span>
                    <span className="text-sm font-medium">$89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Processing Time:</span>
                    <span className="text-sm font-medium">7-10 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Annual Report:</span>
                    <span className="text-sm font-medium">$300</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Nevada
                </CardTitle>
                <CardDescription>No state income tax</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Filing Fee:</span>
                    <span className="text-sm font-medium">$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Processing Time:</span>
                    <span className="text-sm font-medium">5-7 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Annual Report:</span>
                    <span className="text-sm font-medium">$150</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Wyoming
                </CardTitle>
                <CardDescription>Low fees and privacy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Filing Fee:</span>
                    <span className="text-sm font-medium">$100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Processing Time:</span>
                    <span className="text-sm font-medium">3-5 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Annual Report:</span>
                    <span className="text-sm font-medium">$50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements Overview */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Common State Requirements</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Articles of Organization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Required filing document that officially creates your LLC in your chosen state.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <CardTitle>State Filing Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fees vary by state, typically ranging from $50 to $500 for LLC formation.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Processing Times</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Standard processing takes 5-15 business days, with expedited options available.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Registered Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Most states require a registered agent with a physical address in the state.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Get Expert Help with State Requirements</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Don't navigate complex state requirements alone. Our experts ensure you're compliant from day one.
          </p>
          <Link href="/start-business">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your Business Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
