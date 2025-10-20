import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { InitialComplianceAfterFormationServiceForm } from "@/components/submission-forms/initial-compliance-after-formation-service-form";

export default function InitialComplianceAfterFormationFormPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <InitialComplianceAfterFormationServiceForm />
      </main>
      <Footer />
    </div>
  );
}