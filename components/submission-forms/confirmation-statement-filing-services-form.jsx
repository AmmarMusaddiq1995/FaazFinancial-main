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

const CONFIRMATION_STATEMENT_PRICE = 47;

export function ConfirmationStatementFilingServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    companyRegistrationNumber: "",
    companyHouseAuthenticationCode: "",
    cannotFindCompanyCode: false,
    registeredEmailAddress: "",
    noRegisteredEmailAddress: false,
    passwordOfCompanyWebfilingAccount: "",
    cannotProvidePassword: false,


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
          service_name: "Confirmation Statement Filing Service",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:47


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
      subtitle: "Confirmation statement",
      icon: FileText,
      content: (
        <>
          <div className="space-y-2">
            <Label htmlFor="registeredEmailAddress">
              Registered Email address with company house webfiling account
            </Label>
            <Input
              id="registeredEmailAddress"
              value={formData.registeredEmailAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registeredEmailAddress: e.target.value,
                })
              }
              className={inputStyles}
            />
            <div className="flex items-center space-x-2">
              <input
                id="noRegisteredEmailAddress"
                type="checkbox"
                className="accent-primary h-4 w-4"
                checked={!!formData.noRegisteredEmailAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    noRegisteredEmailAddress: e.target.checked,
                  })
                }
              />
              <Label htmlFor="noRegisteredEmailAddress">I don't have one</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passwordOfCompanyWebfilingAccount">
              Password of company webfiling account
            </Label>
            <Input
              id="passwordOfCompanyWebfilingAccount"
              value={formData.passwordOfCompanyWebfilingAccount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  passwordOfCompanyWebfilingAccount: e.target.value,
                })
              }
              className={inputStyles}
            />
            <div className="flex items-center space-x-2">
              <input
                id="cannotProvidePassword"
                type="checkbox"
                className="accent-primary h-4 w-4"
                checked={!!formData.cannotProvidePassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cannotProvidePassword: e.target.checked,

                  })
                }
              />
              <Label htmlFor="cannotProvidePassword">I can't provide it</Label>
            </div>
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

          <div className="space-y-2">
            <Label htmlFor="companyHouseAuthenticationCode">
              Company house authentication code
            </Label>
            <Input
              id="companyHouseAuthenticationCode"
              value={formData.companyHouseAuthenticationCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  companyHouseAuthenticationCode: e.target.value,
                })
              }
              className={inputStyles}
            />
            <div className="flex items-center space-x-2">
              <input
                id="cannotFindCompanyCode"
                type="checkbox"
                className="accent-primary h-4 w-4"
                checked={!!formData.cannotFindCompanyCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cannotFindCompanyCode: e.target.checked,
                  })
                }
              />
              <Label htmlFor="cannotFindCompanyCode">I can't find it</Label>
            </div>
          </div>

          <PriceSummary
            price={CONFIRMATION_STATEMENT_PRICE}
            rows={[
              { label: "Confirmation Statement Filing", amount: CONFIRMATION_STATEMENT_PRICE },
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your Confirmation Statement Filing Service"
      description="Fill out the form below to begin your Confirmation Statement Filing Service process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Confirmation Statement Filing Service"
      price={CONFIRMATION_STATEMENT_PRICE}
    />
  );
}
