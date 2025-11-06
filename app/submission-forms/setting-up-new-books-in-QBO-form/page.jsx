import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SettingUpNewBooksForm } from "@/components/submission-forms/setting-up-new-books-form";


export default function SettingUpNewBooksFormPage() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="absolute -z-20 top-0 left-0 w-full min-h-full" style={{backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)", backgroundSize: "10px 10px"}}></div>
        <div className = "py-20">
           <SettingUpNewBooksForm />
        </div>
      <Footer />
    </div>
  );
}
