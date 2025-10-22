"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CorporationFormationForm } from "@/components/submission-forms/c-corporation-formation";
import { useSearchParams } from "next/navigation";

export default function CorporationFormationPage() {
  const searchParams = useSearchParams();
  
  // Extract pricing data from URL parameters
  const pricingData = {
    packageType: searchParams.get('packageType') || 'normal',
    state: searchParams.get('state') || 'Alabama',
    serviceType: searchParams.get('serviceType') || 'C Corporation Formation',
    planName: searchParams.get('planName') || 'Starter',
    price: searchParams.get('price') || '0'
  };

  return (
  <div>
    <Header />
    <div className = "mt-10 mb-10">
     <CorporationFormationForm pricingData={pricingData} />
     </div>
    <Footer />
  </div>
  );
}
