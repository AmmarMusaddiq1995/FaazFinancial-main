import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FilingArticlesOfAmendmentsForm } from "@/components/submission-forms/filing-articles-of-amendments-form";


export default function FilingArticlesOfAmendmentsPage() {
  return (
  <div className="relative min-h-screen">
    <Header />
    <div className="absolute -z-20 top-0 left-0 w-full min-h-full" style={{backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)", backgroundSize: "10px 10px"}}></div>
    <div className="py-20">
     <FilingArticlesOfAmendmentsForm />
     </div>
    <Footer />
  </div>
  );
}