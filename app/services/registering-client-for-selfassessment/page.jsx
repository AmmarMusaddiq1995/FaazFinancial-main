import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, FileText, ShieldCheck, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RegisterSelfAssessmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Registering Client for Self Assessment
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            We make it easy to register individuals and businesses for HMRC Self
            Assessment. Our experts ensure your client is properly registered to
            file tax returns, manage income reporting, and stay compliant with
            HMRC requirements.
          </p>
          <Link href="/submission-forms/register-client-for-self-assessment-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Register Client for Self Assessment
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Self Assessment Registration Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <UserPlus className="h-12 w-12 text-primary mb-4" />
                <CardTitle>HMRC Registration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We handle the full HMRC registration process for individuals,
                  partnerships, and limited company directors quickly and
                  accurately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>UTR Application</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get your client’s Unique Taxpayer Reference (UTR) number issued
                  efficiently for tax filing and compliance purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Compliance Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ensure your client’s registration complies with HMRC
                  standards, preventing delays and ensuring timely approval.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>End-to-End Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive continuous support throughout the registration process,
                  including updates, document help, and HMRC communication.
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
