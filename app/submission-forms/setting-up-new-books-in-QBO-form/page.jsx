import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SettingUpNewBooksForm } from "@/components/submission-forms/setting-up-new-books-form";


export default function SettingUpNewBooksFormPage() {
  return (
    <div>
      <Header />
        <div className = "mt-10 mb-10">
           <SettingUpNewBooksForm />
        </div>
      <Footer />
    </div>
  );
}
