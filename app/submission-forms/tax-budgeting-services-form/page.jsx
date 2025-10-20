import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { TaxBudgetingServicesForm } from "@/components/submission-forms/tax-budgeting-services-form";

export default function TaxBudgetingServicesFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <TaxBudgetingServicesForm />
      </main>
      <Footer />
    </div>
  );
}