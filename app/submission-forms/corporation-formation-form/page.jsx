import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CorporationFormationForm } from "@/components/submission-forms/c-corporation-formation";


export default function CorporationFormationPage() {
  return (
  <div>
    <Header />
    <div className = "mt-10 mb-10">
     <CorporationFormationForm />
     </div>
    <Footer />
  </div>
  );
}