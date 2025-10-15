import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AddressChangeServicesForm } from "@/components/submission-forms/address-change-services-form";



export default function AddressChangeServicesFormPage() {
    return (
        <div>
            <Header />

            <div className = "mt-10 mb-10">
                <AddressChangeServicesForm />
            </div>
            <Footer />
        </div>

           
    )
}