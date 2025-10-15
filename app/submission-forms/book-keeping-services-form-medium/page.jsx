import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookKeepingServicesFormMediumBusiness } from "@/components/submission-forms/book-keeping-services-form-medium";


export default function BookKeepingServices() {
  return (
    <div>
            <Header />

            <div className = "mt-10 mb-10">
                <BookKeepingServicesFormMediumBusiness />
            </div>
            <Footer />
        </div>

  );
}