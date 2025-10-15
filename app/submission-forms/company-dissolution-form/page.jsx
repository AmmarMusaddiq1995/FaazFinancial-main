import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CompanyDissolutionForm } from "@/components/submission-forms/company-dissolution-form";

export default function CompanyDissolution() {
  return (
    <div>
            <Header />

            <div className = "mt-10 mb-10">
                <CompanyDissolutionForm />
            </div>
            <Footer />
        </div>

  );
}