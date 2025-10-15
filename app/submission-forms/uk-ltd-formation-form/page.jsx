import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UKLTDFormationForm } from "@/components/submission-forms/uk-ltd-formation-form";


export default function UKLTDFormationFormPage() {
  return (
    <div>
      <Header />
        <div className = "mt-10 mb-10">
           <UKLTDFormationForm />
        </div>
      <Footer />
    </div>
  );
}
