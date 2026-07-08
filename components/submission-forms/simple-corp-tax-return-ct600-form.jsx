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
  withTimeout,
} from "@/components/submission-forms/form-wizard";

const SIMPLE_CT600_PRICE = 87.20;

export function SimpleCorpTaxReturnPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({

    governmentGatewayId: "",
    noGovernmentGatewayId: false,
    cannotProvideGovernmentGatewayId: false,
    corpTaxActivated: "",
    governmentPassword: "",
    averageNumberCompanyHas: "",
    annualAccountsFiled: "",
    doYouWantAnnualAccountsFiled: "",
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
          service_name: "Simple Corporation Tax Return(CT600)",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:87.20


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
      subtitle: "CT600 filing",
      icon: FileText,
      validate: () => {
        if (!formData.corpTaxActivated)
          return "Please tell us if corporation tax is activated.";
        if (!formData.annualAccountsFiled)
          return "Please tell us if your annual accounts are filed.";
        return "";
      },
      content: (
        <>
          <div className="space-y-2">
            <Label>Corporation tax activated ?</Label>
            <OptionToggle
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={formData.corpTaxActivated}
              onChange={(value) =>
                setFormData({ ...formData, corpTaxActivated: value })
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
              <Label htmlFor="averageNumberCompanyHas">Average number your company has ?</Label>
              <Input
                id="averageNumberCompanyHas"
                value={formData.averageNumberCompanyHas}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    averageNumberCompanyHas: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Annual accounts filed ?</Label>
            <OptionToggle
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={formData.annualAccountsFiled}
              onChange={(value) =>
                setFormData({ ...formData, annualAccountsFiled: value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>If no, do you want to File Annual Accounts as well ?</Label>
            <OptionToggle
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={formData.doYouWantAnnualAccountsFiled}
              onChange={(value) =>
                setFormData({ ...formData, doYouWantAnnualAccountsFiled: value })
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company name ?</Label>
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
              <Label htmlFor="companyRegistrationNumber">Company registration number ?</Label>
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
            price={SIMPLE_CT600_PRICE}
            rows={[
              { label: "Simple Corporation Tax Return (CT600)", amount: SIMPLE_CT600_PRICE },
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your Simple Corporation Tax Return (CT600)"
      description="Fill out the form below to begin your Simple Corporation Tax Return (CT600) process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Simple Corporation Tax Return (CT600)"
      price={SIMPLE_CT600_PRICE}
    />
  );
}
