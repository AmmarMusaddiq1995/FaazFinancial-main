import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RegisterClientForSelfAssessmentForm } from "@/components/submission-forms/register-client-for-self-assessment-form";

export default function RegisterClientForSelfAssessmentFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <RegisterClientForSelfAssessmentForm />
      </main>
      <Footer />
    </div>
  );
}