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
  PriceSummary,
  inputStyles,
} from "@/components/submission-forms/form-wizard";

const VAT_RETURN_PRICE = 121;

export function VATReturnFilingForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({

   governmentGatewayId: "",
   noGovernmentGatewayId: false,
   cannotProvideGovernmentGatewayId: false,
   governmentPassword: "",
   VATRegistrationNumber: "",

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
          service_name: "VAT Return Filing Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:121


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
      subtitle: "VAT return filing",
      icon: FileText,
      content: (
        <>
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
            <div className="flex items-center space-x-2">
              <input
                id="noGovernmentGatewayId"
                type="checkbox"
                className="accent-primary h-4 w-4"
                checked={!!formData.noGovernmentGatewayId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    noGovernmentGatewayId: e.target.checked,
                  })
                }
              />
              <Label htmlFor="noGovernmentGatewayId">I don't have one</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="cannotProvideGovernmentGatewayId"
                type="checkbox"
                className="accent-primary h-4 w-4"
                checked={!!formData.cannotProvideGovernmentGatewayId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cannotProvideGovernmentGatewayId: e.target.checked,
                  })
                }
              />
              <Label htmlFor="cannotProvideGovernmentGatewayId">I can't provide it</Label>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="governmentPassword">Government password</Label>
              <Input
                id="governmentPassword"
                value={formData.governmentPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    governmentPassword: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="VATRegistrationNumber">VAT registration number</Label>
              <Input
                id="VATRegistrationNumber"
                value={formData.VATRegistrationNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    VATRegistrationNumber: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <PriceSummary
            price={VAT_RETURN_PRICE}
            rows={[{ label: "VAT Return Filing Services", amount: VAT_RETURN_PRICE }]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your VAT Return Filing Services"
      description="Fill out the form below to begin your VAT Return Filing Services process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start VAT Return Filing Services"
      price={VAT_RETURN_PRICE}
    />
  );
}
