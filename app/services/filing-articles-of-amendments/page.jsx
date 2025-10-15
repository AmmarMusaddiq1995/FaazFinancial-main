import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileEdit, FileText, Landmark, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function FilingArticlesOfAmendmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Filing Articles of Amendment
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Keep your business compliant and up to date with our Filing Articles
            of Amendment service. Whether you’re changing your business name,
            address, ownership, or management structure, we handle the entire
            filing process accurately and efficiently.
          </p>
          <Link href="/submission-forms/filing-articles-of-amendments-form">
            <Button size="lg" className="text-lg px-8 py-6">
              File Articles of Amendment
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why File Articles of Amendment with Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <FileEdit className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Update Business Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Amend your company’s name, address, ownership, or management
                  details legally and accurately with our expert guidance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accurate Document Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prepare and review all required amendment documents to
                  ensure your filing meets state-specific legal requirements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Landmark className="h-12 w-12 text-primary mb-4" />
                <CardTitle>State-Level Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experts file your amendment with the appropriate state
                  agency to maintain your business’s legal standing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Secure & Reliable Filing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We ensure your amendment filing is handled with confidentiality
                  and precision, protecting your business from legal risks.
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
