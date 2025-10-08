import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { EinServicesForm } from "@/components/submission-forms/ein-services-form";


export default function EinServicesPage() {
  return (
  <div>
    <Header />
    <div className = "mt-10 mb-10">
     <EinServicesForm />
     </div>
    <Footer />
  </div>
  );
}
