import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, MapPin, Clock, Shield } from "lucide-react"
import Link from "next/link"

export default function RegisteredAgentPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Registered Agent Services</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Professional registered agent service to keep your business compliant and your personal address private.
          </p>
          <Link href="/start-business">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Registered Agent
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why You Need a Registered Agent</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Privacy Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Keep your personal address private from public records.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Available during business hours to receive important documents.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>State Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Meet state requirements for registered agent services.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Check className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Document Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Professional handling of legal and tax documents.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
