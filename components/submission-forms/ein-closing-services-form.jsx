"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { Building2 } from "lucide-react";
import {
  DateField,
  FormWizard,
  PriceSummary,
  inputStyles,
} from "@/components/submission-forms/form-wizard";

const EIN_CLOSING_PRICE = 80;

export function EinClosingServicesForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    BusinessLegalName: "",
    OwnerFullLegalName: "",
    AddressOfBusiness: "",
    AddressOfOwner: "",
    EmailAddress: "",
    ContactNumber: "",
    DateOfEINClosing: "",
    BusinessDissolutionDate: "",

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
        payment_status: "pending",
        price: 80 ,
        payment_id: "",
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const { error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "EIN Closing Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: EIN_CLOSING_PRICE,
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
      subtitle: "EIN closing",
      icon: Building2,
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="BusinessLegalName">Business Legal Name</Label>
              <Input
                id="BusinessLegalName"
                value={formData.BusinessLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    BusinessLegalName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="OwnerFullLegalName">Owner Full Legal Name</Label>
              <Input
                id="OwnerFullLegalName"
                value={formData.OwnerFullLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    OwnerFullLegalName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="AddressOfBusiness">Address of business</Label>
            <Input
              id="AddressOfBusiness"
              value={formData.AddressOfBusiness}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  AddressOfBusiness: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="AddressOfOwner">Address of owner</Label>
            <Input
              id="AddressOfOwner"
              value={formData.AddressOfOwner}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  AddressOfOwner: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="EmailAddress">Email address</Label>
              <Input
                id="EmailAddress"
                value={formData.EmailAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    EmailAddress: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ContactNumber">Contact number</Label>
              <Input
                id="ContactNumber"
                type="tel"
                value={formData.ContactNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ContactNumber: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="DateOfEINClosing">Date of EIN closing</Label>
              <DateField
                id="DateOfEINClosing"
                value={formData.DateOfEINClosing}
                onChange={(value) =>
                  setFormData({ ...formData, DateOfEINClosing: value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="BusinessDissolutionDate">
                Business dissolution date
              </Label>
              <DateField
                id="BusinessDissolutionDate"
                value={formData.BusinessDissolutionDate}
                onChange={(value) =>
                  setFormData({ ...formData, BusinessDissolutionDate: value })
                }
                required
              />
            </div>
          </div>

          <PriceSummary
            price={EIN_CLOSING_PRICE}
            rows={[{ label: "EIN Closing Services", amount: EIN_CLOSING_PRICE }]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your EIN Closing Services"
      description="Fill out the form below to begin your EIN closing services process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start EIN Closing Services"
      price={EIN_CLOSING_PRICE}
    />
  );
}
