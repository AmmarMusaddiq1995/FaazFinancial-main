import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, PieChart, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TaxBudgetingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Tax Budgeting Services
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Plan ahead and manage your tax liabilities effectively with our professional Tax Budgeting service. 
            We help individuals and businesses forecast, plan, and optimize their taxes to ensure compliance and maximize savings throughout the financial year.
          </p>
          <Link href="/submission-forms/tax-budgeting-services-form">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Your Tax Budgeting Plan
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Tax Budgeting Service
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <Card>
              <CardHeader>
                <Calculator className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Accurate Tax Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We estimate your expected tax liabilities based on current income, expenses, and business performance — giving you a clear financial outlook.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <PieChart className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Cash Flow Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our experts help you align your tax obligations with cash flow, ensuring funds are available when tax payments are due.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlert className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Compliance & Risk Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay compliant with HMRC requirements and avoid penalties by planning ahead with well-structured tax budgeting strategies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Strategic Tax Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get personalized guidance on reducing tax liabilities through legitimate allowances, deductions, and strategic financial planning.
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
