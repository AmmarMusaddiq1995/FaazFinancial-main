import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function CorporationFormationPage() {
  return (
    <div>
      <Header />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Corporation Formation Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Incorporate your business for maximum growth potential, investor
              appeal, and tax advantages.
            </p>
            <Link href="/start-business">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Your Corporation
              </Button>
            </Link>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-muted/50">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Corporation Benefits
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Building className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Investor Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Attract investors and raise capital with a corporate
                    structure.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Stock Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Issue stock options to employees and attract top talent.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Growth Potential</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Scale your business with unlimited growth potential.
                  </p>
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
