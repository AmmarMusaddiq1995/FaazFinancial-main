import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MapPin, Clock, Shield } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AddressChangeServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Address Change Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
          Keep your business compliant with state regulations by updating your official business address.
          We handle the filing process, ensure timely updates with the Secretary of State, and protect your privacy.
          </p>
          <Link href="/submission-forms/address-change-services-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Address Change Services
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
          Why You Need an Address Change Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Stay Compliant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                States require LLCs and corporations to keep a current registered business address on record.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                
                <Check className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Avoid Penalties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                Failure to update your address can result in fines or missed legal notices.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Protect Your Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                Keep your personal address off public records by using our registered business address.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
              <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Save Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                We handle all state-level filing and paperwork for you.
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
