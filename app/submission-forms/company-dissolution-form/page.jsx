import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CompanyDissolutionForm } from "@/components/submission-forms/company-dissolution-form";

export default function CompanyDissolution() {
  return (
    <div className="relative min-h-screen">
            <Header />
            <div className="absolute -z-20 top-0 left-0 w-full min-h-full" style={{backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)", backgroundSize: "10px 10px"}}></div>
            <div className = "py-20">
                <CompanyDissolutionForm />
            </div>
            <Footer />
        </div>

  );
}