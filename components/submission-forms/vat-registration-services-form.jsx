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
  OptionToggle,
  PriceSummary,
  inputStyles,
} from "@/components/submission-forms/form-wizard";

const VAT_REGISTRATION_PRICE = 54;

export function VATRegistrationServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({

   VATRegistrationOfWhichBusinessEntity: "",
   governmentGatewayId: "",
   noGovernmentGatewayId: false,
   cannotProvideGovernmentGatewayId: false,
   governmentPassword: "",
   VATRegistrationNumber: "",
   fullName: "",
   address: "",
   businessAddress: "",
   companyName: "",
   companyRegistrationNumber: "",

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
          service_name: "VAT Registration Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:54


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
      subtitle: "VAT registration",
      icon: FileText,
      validate: () => {
        if (!formData.VATRegistrationOfWhichBusinessEntity)
          return "Please select which business entity this VAT registration is for.";
        return "";
      },
      content: (
        <>
          <div className="space-y-2">
            <Label>VAT registration of which business entity ?</Label>
            <OptionToggle
              options={[
                { value: "soleTrade", label: "Sole Trade" },
                { value: "ukCompany", label: "UK Compnay" },
              ]}
              value={formData.VATRegistrationOfWhichBusinessEntity}
              onChange={(value) =>
                setFormData({ ...formData, VATRegistrationOfWhichBusinessEntity: value })
              }
            />
          </div>

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
              <Label htmlFor="fullName">Your full name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Your address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business address</Label>
            <Input
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companyName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyRegistrationNumber">Company registration number</Label>
              <Input
                id="companyRegistrationNumber"
                value={formData.companyRegistrationNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    companyRegistrationNumber: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <PriceSummary
            price={VAT_REGISTRATION_PRICE}
            rows={[{ label: "VAT Registration Services", amount: VAT_REGISTRATION_PRICE }]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your VAT Registration Services"
      description="Fill out the form below to begin your VAT Registration Services process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start VAT Registration Services"
      price={VAT_REGISTRATION_PRICE}
    />
  );
}
