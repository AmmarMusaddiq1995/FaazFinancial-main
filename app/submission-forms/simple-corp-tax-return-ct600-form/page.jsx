import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SimpleCorpTaxReturnPage } from "@/components/submission-forms/simple-corp-tax-return-ct600-form";

export default function SimpleCorpTaxReturnFormPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute -z-20 top-0 left-0 w-full min-h-full" style={{backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)", backgroundSize: "10px 10px"}}></div>
      <main className="container mx-auto px-4 py-20">
        <SimpleCorpTaxReturnPage />
      </main>
      <Footer />
    </div>
  );
}


