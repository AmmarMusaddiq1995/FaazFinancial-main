import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ItinApplicationForm } from "@/components/submission-forms/itin-application-form";

export default function ItinServicesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute -z-20 top-0 left-0 w-full min-h-full" style={{backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)", backgroundSize: "10px 10px"}}></div>
      <Header />
      <div className="py-20">
        <ItinApplicationForm />
      </div>
      <Footer />
    </div>
  );
}