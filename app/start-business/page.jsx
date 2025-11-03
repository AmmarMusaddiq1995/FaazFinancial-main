"use client";

import { BusinessFormationForm } from "@/components/submission-forms/llc-formation-form";
import { CorporationFormationForm } from "@/components/submission-forms/c-corporation-formation";
import { EinServicesForm } from "@/components/submission-forms/ein-services-form";
import { ItinApplicationForm } from "@/components/submission-forms/itin-application-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


 function StartBusinessPage() {
  // const params = new URLSearchParams(window.location.search);
  // const serviceType = params.get("serviceType");

  const searchParams = useSearchParams();
  const serviceType = searchParams.get("serviceType");
  console.log("serviceType :", serviceType);
  const [selectedService, setSelectedService] = useState(serviceType || "");

  const serviceComponents = {
    llc: <BusinessFormationForm />,
    corp: <CorporationFormationForm />,
    ein: <EinServicesForm />,
    itin: <ItinApplicationForm />,
  };

  return (
    <div>
      <Header />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Business
            </h1>
            <p className="text-lg text-gray-600">
              Let's get your business formation started with our simple process
            </p>

           
          </div>

         
          <div className="mt-10 mb-10">
            <BusinessFormationForm />
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function MyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StartBusinessPage />
    </Suspense>
  );
}