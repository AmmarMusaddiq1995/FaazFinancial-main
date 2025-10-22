import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConfirmationStatementFilingServicesForm } from "@/components/submission-forms/confirmation-statement-filing-services-form";

export default function ConfirmationStatementFilingFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <ConfirmationStatementFilingServicesForm />
      </main>
      <Footer />
    </div>
  );
}