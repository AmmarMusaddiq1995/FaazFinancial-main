import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SalesAndUsetaxRegistrationForm } from "@/components/submission-forms/sales-and-usetax-registration-form";



export default function SalesAndUsetaxRegistrationPage() {
  return (
  <div>
    <Header />
    <div className = "mt-10 mb-10">
     <SalesAndUsetaxRegistrationForm />
     </div>
    <Footer />
  </div>
  );
}
