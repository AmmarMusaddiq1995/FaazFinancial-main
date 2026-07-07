"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import {
  FormWizard,
  PriceSummary,
  inputStyles,
} from "@/components/submission-forms/form-wizard";

const REGISTER_CLIENT_PRICE = 40;

export function RegisterClientForSelfAssessmentForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
   governmentGatewayId: "",
   noGovernmentGatewayId: false,
   cannotProvideGovernmentGatewayId: false,
   governmentPassword: "",
    emailAddress: "",
    phoneNumber: "",
    reasonToRegisterForSelfAssessment: "",

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
          service_name: "Register Client for Self Assessment",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:40


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
      subtitle: "Self assessment registration",
      icon: FileText,
      content: (
        <>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Regularly used email address</Label>
              <Input
                id="emailAddress"
                value={formData.emailAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emailAddress: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Regularly used phone number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reasonToRegisterForSelfAssessment">
              Reason to register for self assessment
            </Label>
            <Textarea
              id="reasonToRegisterForSelfAssessment"
              value={formData.reasonToRegisterForSelfAssessment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reasonToRegisterForSelfAssessment: e.target.value,
                })
              }
              className="rounded-lg border-gray-200 bg-white shadow-sm transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
              required
              rows={4}
            />
          </div>

          <PriceSummary
            price={REGISTER_CLIENT_PRICE}
            rows={[
              { label: "Register Client for Self Assessment", amount: REGISTER_CLIENT_PRICE },
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your Register Client for Self Assessment"
      description="Fill out the form below to begin your Register Client for Self Assessment process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Register Client for Self Assessment"
      price={REGISTER_CLIENT_PRICE}
    />
  );
}
