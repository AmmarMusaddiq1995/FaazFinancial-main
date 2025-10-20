import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ComplexCorpTaxReturnPage } from "@/components/submission-forms/complex-ct600-filing-form";

export default function ComplexCT600FilingFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <ComplexCorpTaxReturnPage />
      </main>
      <Footer />
    </div>
  );
}