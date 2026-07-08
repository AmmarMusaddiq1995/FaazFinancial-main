"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Calculator } from "lucide-react";
import {
  FormWizard,
  OptionToggle,
  PriceSummary,
  withTimeout,
} from "@/components/submission-forms/form-wizard";

const TAX_BUDGETING_PRICE = 336;

export function TaxBudgetingServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({

   budgetingRequiredFor: "",

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
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const { error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "Tax Budgeting Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:336


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
      subtitle: "Tax budgeting",
      icon: Calculator,
      validate: () => {
        if (!formData.budgetingRequiredFor)
          return "Please select what the budgeting is required for.";
        return "";
      },
      content: (
        <>
          <div className="space-y-2">
            <Label>Budgeting required for ?</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { value: "corporationTax", label: "Corporation Tax" },
                { value: "incomeTax", label: "Income Tax" },
                { value: "both", label: "Both" },
              ].map((option) => {
                const selected = formData.budgetingRequiredFor === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      setFormData({ ...formData, budgetingRequiredFor: option.value })
                    }
                    className={`flex min-h-[44px] items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                      selected
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <PriceSummary
            price={TAX_BUDGETING_PRICE}
            rows={[{ label: "Tax Budgeting Services", amount: TAX_BUDGETING_PRICE }]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your Tax Budgeting Services"
      description="Fill out the form below to begin your Tax Budgeting Services process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Tax Budgeting Services"
      price={TAX_BUDGETING_PRICE}
    />
  );
}
