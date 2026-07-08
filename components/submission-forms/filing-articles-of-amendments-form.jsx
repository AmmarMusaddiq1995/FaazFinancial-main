"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { Building2, Package, Clock, Zap } from "lucide-react";
import {
  FormWizard,
  PackageCards,
  PackageDetailsTooltip,
  PriceSummary,
  inputStyles,
  withTimeout,
} from "@/components/submission-forms/form-wizard";

// const PACKAGE_FEATURES = {
//     normal: [
//       "Delivery in 14 business days",
//       "State fee is not included",
//       "Our service fee is 125$"
//     ],
//     express: [
//       "Delivery in 7 business days",
//       "State fee is not included",
//       "Our service fee is 125$"
//     ],
//   };

export function FilingArticlesOfAmendmentsForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
   businessName: "",
   reasonForFilingAmendments: "",
   provideNewBusinessName: "",
   ownerFullLegalName: "",
   emailAddress: "",
   ownerAddress: "",
   contactNumber: "",
   businessAddress: "",
  //  packageType: "",
  });

  const router = useRouter();

  const { user } = useAuthContext();
  const [userPersonalId, setUserPersonalId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.id) return;
      console.log("user :", user);

      const { data, error } = await supabase
        .from("user_data")
        .select("id")
        .eq("auth_user_id", user?.id)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        console.log("user data :", data);
        setUserPersonalId(data.id);
        console.log("user personal id :", data.id);
      }
    };

    fetchUserData();
  }, [user]);


  // const [price, setPrice] = useState(0);
  // useEffect(()=>{
  //   if(formData.packageType === "normal"){
  //     const selectedPrice = 125;
  //     setPrice(selectedPrice);
  //   } else if(formData.packageType === "express"){
  //     const selectedPrice = 125;
  //     setPrice(selectedPrice);
  //   }
  // }, [formData.packageType]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await withTimeout(supabase.auth.getUser());

      console.log("userPersonalId :", userPersonalId);
      console.log("user :", user);

      if (!user || userError) {
        alert("Please login to submit business formation", userError);
        return;
      }

      const submissionData = {
        ...formData,
        price : 125,
        payment_status: "pending",
        payment_id: "",
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const { error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "Filing Articles of Amendments",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: 125,
          payment_id: "",
        },
      ]);

      console.log("form_submissions inserted successfully");

      router.push("/form-submission-success");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Business",
      subtitle: "Amendment details",
      icon: Building2,
      heading: "Business & amendment details",
      intro: "Tell us about the business and what you're amending.",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasonForFilingAmendments">Reason for filing amendments</Label>
              <Input
                type="text"
                id="reasonForFilingAmendments"
                value={formData.reasonForFilingAmendments}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reasonForFilingAmendments: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="provideNewBusinessName">Provide new business name</Label>
            <Input
              type="text"
              id="provideNewBusinessName"
              value={formData.provideNewBusinessName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  provideNewBusinessName: e.target.value,
                })
              }
              className={inputStyles}
              placeholder="If business name is changing, provide new business name (optional)"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ownerFullLegalName">Owner full legal name</Label>
              <Input
                type="text"
                id="ownerFullLegalName"
                value={formData.ownerFullLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ownerFullLegalName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email address</Label>
              <Input
                type="text"
                id="emailAddress"
                value={formData.emailAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emailAddress: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerAddress">Owner address</Label>
              <Input
                type="text"
                id="ownerAddress"
                value={formData.ownerAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ownerAddress: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">US contact number</Label>
              <Input
                type="text"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactNumber: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business address</Label>
            <Input
              type="text"
              id="businessAddress"
              value={formData.businessAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  businessAddress: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>
           <PriceSummary
            price={125}
            rows={[
              {
                label: `Filing Articles of Amendments (${formData.packageType || ""})`,
                amount: 125,
              },
            ]}
          />
        </>
      ),
    },
    // {
    //   title: "Package",
    //   subtitle: "Review & submit",
    //   icon: Package,
    //   heading: "Select Package Type",
    //   intro: "Choose your filing speed, review the price, and submit.",
    //   validate: () => {
    //     if (!formData.packageType) return "Please choose a package to continue.";
    //     return "";
    //   },
    //   content: (
    //     <>
    //       <PackageCards
    //         value={formData.packageType}
    //         onChange={(value) =>
    //           setFormData({ ...formData, packageType: value })
    //         }
    //         options={[
    //           {
    //             value: "normal",
    //             label: "Normal",
    //             delivery: "14 business days",
    //             icon: Clock,
    //             price: 125,
    //             tooltip: (
    //               <PackageDetailsTooltip
    //                 label="Normal"
    //                 features={PACKAGE_FEATURES.normal}
    //               />
    //             ),
    //           },
    //           {
    //             value: "express",
    //             label: "Express",
    //             delivery: "7 business days",
    //             icon: Zap,
    //             badge: "Fastest",
    //             price: 125,
    //             tooltip: (
    //               <PackageDetailsTooltip
    //                 label="Express"
    //                 features={PACKAGE_FEATURES.express}
    //               />
    //             ),
    //           },
    //         ]}
    //       />

          // <PriceSummary
          //   price={125}
          //   rows={[
          //     {
          //       label: `Filing Articles of Amendments (${formData.packageType || ""})`,
          //       amount: 125,
          //     },
          //   ]}
          // />
    //     </>
    //   ),
    // },
  ];

  return (
    <FormWizard
      title="Start Your Filing Articles of Amendments"
      description="2 quick steps — about 3 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Filing Articles of Amendments"
      price={125}
    />
  );
}
