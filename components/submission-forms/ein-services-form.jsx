"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Package, Clock, Zap } from "lucide-react";
import {
  DateField,
  FormWizard,
  OptionToggle,
  PackageCards,
  PriceSummary,
  inputStyles,
  withTimeout,
} from "@/components/submission-forms/form-wizard";

export function EinServicesForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CompanyName: "",
    dateOfFormation: "",
    businessEntityType: "",
    OwnerFullLegalName: "",
    members: "",
    fiscalYearEndDate: "",
    anyUsEmployee: "",
    registrationDate: "",
    contactNumber: "",
    businessActivityNature: "",
    prevEin: "",
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


  const [price, setPrice] = useState(0);
  useEffect(()=>{
    if(formData.packageType === "normal"){
      const selectedPrice = 40;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = 75;
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
      } = await withTimeout(supabase.auth.getUser());

      console.log("userPersonalId :", userPersonalId);
      console.log("user :", user);

      if (!user || userError) {
        alert("Please login to submit business formation", userError);
        return;
      }

      const submissionData = {
        ...formData,
        price,
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
          service_name: "EIN Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: price,
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
      subtitle: "Company details",
      icon: Building2,
      heading: "Company details",
      intro: "Tell us about the business that needs an EIN.",
      validate: () => {
        if (!formData.anyUsEmployee)
          return "Please tell us if you have any US employees.";
        return "";
      },
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="CompanyName">Company name</Label>
              <Input
                id="CompanyName"
                value={formData.CompanyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CompanyName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfFormation">Date of formation</Label>
              <DateField
                id="dateOfFormation"
                value={formData.dateOfFormation}
                onChange={(value) =>
                  setFormData({ ...formData, dateOfFormation: value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEntityType">Business entity type</Label>
              <Select
                value={formData.businessEntityType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessEntityType: value })
                }
                required
              >
                <SelectTrigger className={inputStyles}>
                  <SelectValue placeholder="Select business entity type" />
                </SelectTrigger>
                <SelectContent className="border-gray-300">
                  <SelectItem value="LLC">LLC</SelectItem>
                  <SelectItem value="C-Corp">C-Corp</SelectItem>
                  <SelectItem value="S-Corp">S-Corp</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                  <SelectItem value="Marketing-Agency">Marketing Agency</SelectItem>
                  <SelectItem value="Shopify-Store">Shopify Store</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="OwnerFullLegalName">Owner full legal name</Label>
              <Input
                type="text"
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

            <div className="space-y-2">
              <Label htmlFor="members">How many members/partners</Label>
              <Input
                type="text"
                id="members"
                value={formData.members}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    members: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiscalYearEndDate">Fiscal year end date</Label>
              <DateField
                id="fiscalYearEndDate"
                value={formData.fiscalYearEndDate}
                onChange={(value) =>
                  setFormData({ ...formData, fiscalYearEndDate: value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationDate">Business registeration date</Label>
              <DateField
                id="registrationDate"
                value={formData.registrationDate}
                onChange={(value) =>
                  setFormData({ ...formData, registrationDate: value })
                }
                required
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
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Do you have any US employees?</Label>
            <OptionToggle
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
              value={formData.anyUsEmployee}
              onChange={(value) =>
                setFormData({ ...formData, anyUsEmployee: value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessActivityNature">
              Business activity/nature
            </Label>
            <Input
              type="text"
              id="businessActivityNature"
              value={formData.businessActivityNature}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  businessActivityNature: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prevEin">
              Have you previously obtained the EIN if yes provide the number?
            </Label>
            <Input
              className={inputStyles}
              type="text"
              id="prevEin"
              value={formData.prevEin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prevEin: e.target.value,
                })
              }
            />
          </div>
        </>
      ),
    },
    {
      title: "Package",
      subtitle: "Review & submit",
      icon: Package,
      heading: "Select Package Type",
      intro: "Choose your processing speed, review the price, and submit.",
      validate: () => {
        if (!formData.packageType) return "Please choose a package to continue.";
        return "";
      },
      content: (
        <>
          <PackageCards
            value={formData.packageType}
            onChange={(value) =>
              setFormData({ ...formData, packageType: value })
            }
            options={[
              { value: "normal", label: "Normal", icon: Clock, price: 40 },
              { value: "express", label: "Express", icon: Zap, badge: "Fastest", price: 75 },
            ]}
          />

          <PriceSummary
            price={price}
            rows={[
              {
                label: `EIN Services (${formData.packageType || ""})`,
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
      title="Start Your EIN Services"
      description="2 quick steps — about 3 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Business Formation"
      price={price}
    />
  );
}
