import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SimpleCorpTaxReturnPage } from "@/components/submission-forms/simple-corp-tax-return-ct600-form";

export default function SimpleCorpTaxReturnFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <SimpleCorpTaxReturnPage />
      </main>
      <Footer />
    </div>
  );
}


