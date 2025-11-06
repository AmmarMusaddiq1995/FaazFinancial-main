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
    <div className="relative min-h-screen">
      <div className="absolute -z-20 top-0 left-0 w-full min-h-full" style={{backgroundImage: "radial-gradient(circle, #e6e6e6 1px, transparent 1px)", backgroundSize: "10px 10px"}}></div>
      <Header />

      <div className="py-12">
        <div className="container mx-auto px-4">
         

         
          <div>
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