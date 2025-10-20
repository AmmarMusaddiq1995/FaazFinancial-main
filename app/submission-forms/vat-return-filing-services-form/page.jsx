import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { VATReturnFilingForm } from "@/components/submission-forms/vat-return-filing-form";

export default function VATReturnFilingServicesFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <VATReturnFilingForm />
      </main>
      <Footer />
    </div>
  );
}