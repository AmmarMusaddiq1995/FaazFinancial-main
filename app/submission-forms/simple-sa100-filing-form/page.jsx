import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RegisteringForSelfAssessmentPage } from "@/components/submission-forms/simple-self-assessment-form";

export default function RegisteringForSelfAssessmentFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <RegisteringForSelfAssessmentPage />
      </main>
      <Footer />
    </div>
  );
}