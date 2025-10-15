import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, FilePlus2, Database, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function SetupNewBooksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Setting Up New Books in QBO, Xero, or Any ERP
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Start your accounting journey on the right foot with professionally
            configured books in QuickBooks Online (QBO), Xero, or any ERP
            system. We ensure accurate setup, seamless integrations, and
            compliance from day one.
          </p>
          <Link href="/submission-forms/setting-up-new-books-in-QBO-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Set Up New Books
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why You Need a Professional Book Setup
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <Settings className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Customized ERP Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We configure your accounting software based on your business
                  structure, ensuring accurate tracking of income, expenses, and
                  assets from day one.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FilePlus2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Chart of Accounts Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get a perfectly designed chart of accounts tailored to your
                  industry and compliance standards for smooth financial
                  management.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Data Migration & Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We migrate your existing data securely and connect third-party
                  apps or systems to create a unified financial ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accuracy & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our setup follows accounting best practices and ensures
                  compliance with tax authorities, giving you complete peace of
                  mind.
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
