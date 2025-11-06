import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ComplexCorpTaxReturnPage } from "@/components/submission-forms/complex-ct600-filing-form";

export default function ComplexCT600FilingFormPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute -z-20 top-0 left-0 w-full min-h-full" style={{backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)", backgroundSize: "10px 10px"}}></div>
      <div className="py-20">
        <ComplexCorpTaxReturnPage />
      </div>
      <Footer />
    </div>
  )
}       