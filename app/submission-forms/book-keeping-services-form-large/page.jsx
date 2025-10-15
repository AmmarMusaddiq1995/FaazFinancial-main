import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BookKeepingServicesFormLargeBusiness } from "@/components/submission-forms/book-keeping-services-form-large";


export default function BookKeepingServices() {
  return (
    <div>
            <Header />

            <div className = "mt-10 mb-10">
                <BookKeepingServicesFormLargeBusiness />
            </div>
            <Footer />
        </div>

  );
}