import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AnnualCompanyStateFilingForm } from "@/components/submission-forms/annual-company-state-filing-form";

export default function AnnualCompanyStateFiling() {
    return (
        <div>
        <Header />
        <div className = "mt-10 mb-10">
         <AnnualCompanyStateFilingForm />
         </div>
        <Footer />
        </div>
    )
}