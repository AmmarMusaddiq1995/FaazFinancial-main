import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { VATRegistrationServicesForm } from "@/components/submission-forms/vat-registration-services-form";

export default function VATRegistrationServicesFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <VATRegistrationServicesForm />
      </main>
      <Footer />
    </div>
  );
}