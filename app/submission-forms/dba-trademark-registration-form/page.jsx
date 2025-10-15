import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DBATrademarkRegistrationServicesForm } from "@/components/submission-forms/dba-trademark-registration-services-form";



export default function DBATrademarkRegistrationServicesFormPage() {
    return (
        <div>
            <Header />

            <div className = "mt-10 mb-10">
                <DBATrademarkRegistrationServicesForm />
            </div>
            <Footer />
        </div>

           
    )
}