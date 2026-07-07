"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import {
  FormWizard,
  OptionToggle,
  PackageCards,
  PriceSummary,
} from "@/components/submission-forms/form-wizard";

export function AnnualAccountsPreparationServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    packageType: "",
    doYouUseAnAccountingSoftware: "",


  });


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

  const [price, setPrice] = useState(0);
  useEffect(()=>{
    if(formData.packageType === "simple"){
      const selectedPrice = 80.50;
      setPrice(selectedPrice);
    } else if(formData.packageType === "complex"){
      const selectedPrice = 188;
      setPrice(selectedPrice);
    }
  }, [formData.packageType]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("userPersonalId :", userPersonalId);
      console.log("user :", user);

      if (!user || userError) {
        alert("Please login to submit business formation", userError);
        return;
      }

      const submissionData = {
        ...formData,
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const { error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "Annual Accounts Preparation Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:price,
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
      title: "Details",
      subtitle: "Accounts preparation",
      icon: FileText,
      validate: () => {
        if (!formData.packageType)
          return "Please select the type of annual accounts preparation.";
        if (!formData.doYouUseAnAccountingSoftware)
          return "Please tell us if you use an accounting software.";
        return "";
      },
      content: (
        <>
          <div className="space-y-2">
            <Label>Select Package Type</Label>
            <PackageCards
              value={formData.packageType}
              onChange={(value) =>
                setFormData({ ...formData, packageType: value })
              }
              options={[
                {
                  value: "simple",
                  label: "Simple",
                  delivery: "Simple annual accounts preparation",
                  price: 80.50,
                },
                {
                  value: "complex",
                  label: "Complex",
                  delivery: "Complex annual accounts preparation",
                  price: 188,
                },
              ]}
            />
          </div>

          <div className="space-y-2">
            <Label>Do you use an accounting software ?</Label>
            <OptionToggle
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={formData.doYouUseAnAccountingSoftware}
              onChange={(value) =>
                setFormData({ ...formData, doYouUseAnAccountingSoftware: value })
              }
            />
          </div>

          <PriceSummary
            price={price}
            rows={[
              {
                label: `Annual Accounts Preparation (${formData.packageType || ""})`,
                amount: price,
              },
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your Annual Accounts Preparation Services"
      description="Fill out the form below to begin your Annual Accounts Preparation Services process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Annual Accounts Preparation Services"
      price={price}
    />
  );
}
