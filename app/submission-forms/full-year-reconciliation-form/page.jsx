import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FullYearReconciliationForm } from "@/components/submission-forms/full-year-reconciliation-form";


export default function FullYearReconciliationFormPage() {
  return (
    <div>
      <Header />
        <div className = "mt-10 mb-10">
           <FullYearReconciliationForm />
        </div>
      <Footer />
    </div>
  );
}