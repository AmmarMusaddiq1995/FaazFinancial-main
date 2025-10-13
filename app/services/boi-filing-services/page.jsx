import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BoiFilingServicesForm } from "@/components/submission-forms/boi-filing-services-form";


export default function BoiFilingServicesPage() {
  return (
  <div>
    <Header />
    <div className = "mt-10 mb-10">
     <BoiFilingServicesForm />
     </div>
    <Footer />
  </div>
  );
}
