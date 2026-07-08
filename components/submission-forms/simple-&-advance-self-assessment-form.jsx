"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import {
  FormWizard,
  PackageCards,
  PriceSummary,
  inputStyles,
  withTimeout,
} from "@/components/submission-forms/form-wizard";

const INCOME_OPTIONS = [
  "Employment income",
  "Trading income",
  "Interest income",
  "Pension income",
  "Property income",
  "Dividend income",
];

export function SimpleAndAdvanceSelfAssessmentForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    packageType: "",
    governmentGatewayId: "",
    governmentGatewayPassword: "",
    incomes: [],

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
    } else if(formData.packageType === "advance"){
      const selectedPrice = 147.50;
      setPrice(selectedPrice);
    }
  }, [formData.packageType]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.packageType) {
        alert("Please select a package type");
        setLoading(false);
        return;
      }

      if (!formData.governmentGatewayId || !formData.governmentGatewayPassword) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (!userPersonalId) {
        alert("User data is still loading. Please wait a moment and try again.");
        setLoading(false);
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await withTimeout(supabase.auth.getUser());

      console.log("userPersonalId :", userPersonalId);
      console.log("user :", user);

      if (!user || userError) {
        alert("Please login to submit the form");
        setLoading(false);
        return;
      }

      const submissionData = {
        ...formData,
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const { data: insertedForm, error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "Simple and Advance Self Assessment",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: Math.round(price),
          payment_id: "",
        },
      ]).select().single();

      if (error) {
        console.error("Error inserting form_submissions:", error);
        alert(`Failed to save form data: ${error.message}`);
        setLoading(false);
        return;
      }

      console.log("form_submissions inserted successfully");
      console.log("insertedForm id:", insertedForm?.id);

      router.push("/form-submission-success");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const toggleIncome = (income) => {
    setFormData((prev) => {
      const exists = prev.incomes.includes(income);
      return {
        ...prev,
        incomes: exists
          ? prev.incomes.filter((i) => i !== income)
          : [...prev.incomes, income],
      };
    });
  };

  const steps = [
    {
      title: "Details",
      subtitle: "Self assessment",
      icon: FileText,
      validate: () => {
        if (!formData.packageType)
          return "Please select the type of self assessment tax return.";
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
                  delivery: "Simple self assessment tax return",
                  price: 80.50,
                },
                {
                  value: "advance",
                  label: "Advance",
                  delivery: "Advance self assessment tax return",
                  price: 147.50,
                },
              ]}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="governmentGatewayId">Government gateway ID</Label>
              <Input
                id="governmentGatewayId"
                value={formData.governmentGatewayId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    governmentGatewayId: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="governmentGatewayPassword">Government gateway password</Label>
              <Input
                id="governmentGatewayPassword"
                value={formData.governmentGatewayPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    governmentGatewayPassword: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Select the incomes you earn</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {INCOME_OPTIONS.map((income) => {
                const selected = formData.incomes.includes(income);
                return (
                  <label
                    key={income}
                    className={`flex min-h-[44px] cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      selected
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="accent-primary h-4 w-4"
                      checked={selected}
                      onChange={() => toggleIncome(income)}
                    />
                    <span>{income}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <PriceSummary
            price={price}
            rows={[
              {
                label: `Self Assessment Tax Return (${formData.packageType || ""})`,
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
      title="Start Self Assessment Tax Return"
      description="Fill out the form below to begin your Self Assessment Tax Return process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Self Assessment Tax Return"
      price={price}
    />
  );
}
