"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, FileText, Clock, Zap } from "lucide-react";
import {
  DateField,
  FormWizard,
  PackageCards,
  PriceSummary,
  US_STATES,
  inputStyles,
  withTimeout,
} from "@/components/submission-forms/form-wizard";

  const priceTableForDBAServices = {
    Wyoming: { normal:250, express: 320},
    Texas: { normal: 175, express: 245},
    Washington: { normal: 155, express: 225},
    California: { normal: 250, express: 320},
    Colorado: { normal: 185, express: 250},
    Florida: { normal: 200, express: 270},
    Georgia: { normal: 250, express: 320},
    New_York:{ normal: 250, express: 320},
    Alabama: { normal: 160, express: 230},
    Alaska: { normal: 200, express: 270},
    New_Hampshire: { normal: 165, express: 235},
    Hawaii: { normal: 200, express: 270},
    West_Virginia: { normal: 175, express: 245},
    Virginia: { normal: 160, express: 230},
    Arizona: { normal: 175, express: 245},
    Arkansas: { normal: 175, express: 245},
    New_Jersey: { normal: 200, express: 270},
    New_Mexico: { normal: 200, express: 270},
    Connecticut: { normal: 200, express: 270},
    Delaware: { normal: 175, express: 245},
    Vermont: { normal: 190, express: 260},
    Idaho: { normal: 175, express: 245},
    Illinois: { normal: 300, express: 370},
    Indiana: { normal: 180, express: 250},
    Iowa: { normal: 155, express: 225},
    Kansas: { normal: 150, express: 220},
    Kentucky: { normal: 165, express: 235},
    Louisiana: { normal: 225, express: 295},
    Maine: { normal: 175, express: 245},
    Maryland: { normal: 250, express: 320},
    Massachusetts: { normal: 200, express: 270},
    Michigan: { normal: 160, express: 230},
    Minnesota: { normal: 200, express: 270},
    Mississippi: { normal: 175, express: 245},
    Missouri: { normal: 157, express: 227},
    Montana: { normal: 170, express: 220},
    Nebraska: { normal: 250, express: 320},
    Nevada: { normal: 170, express: 240},
    North_Carolina:{ normal: 176, express: 246},
    North_Dakota:{ normal: 175, express: 245},
    Ohio: { normal: 175, express: 245},
    Oklahoma: { normal: 175, express: 245},
    Oregon: { normal: 200, express: 270},
    Pennsylvania: { normal: 220, express: 290},
    Rhode_Island: { normal: 200, express: 270},
    South_Carolina: { normal: 175, express: 245},
    South_Dakota: { normal: 170, express: 240},
    Tennessee: { normal: 170, express: 240},
    Utah: { normal: 172, express: 242},
    Wisconsin: { normal: 165, express: 235},


  }

export function DBATrademarkRegistrationServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessLegalName: "",
    proposedTradeName: "",
    businessFormationDate: "",
    ownerLegalName: "",
    dateOfBirth: "",
    businessAddress: "",
    ownerAddress: "",
    naicsCode: "",
    businessEntityType: "",
    primaryBusinessActivities: "",
    state: "",
    packageType: "",

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
    if(formData.packageType === "normal"){
      const selectedPrice = priceTableForDBAServices[formData.state]?.normal ?? 0;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = priceTableForDBAServices[formData.state]?.express ?? 0;
      setPrice(selectedPrice);
    }
  }, [formData.packageType, formData.state]);



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
          service_name: "DBA Trademark Registration Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:price


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
      subtitle: "Company & owner",
      icon: Building2,
      heading: "Business & owner details",
      intro: "Tell us about the business and the trade name you want.",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessLegalName">Business Legal Name</Label>
              <Input
                id="businessLegalName"
                value={formData.businessLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessLegalName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposedTradeName">Proposed Trade Name</Label>
              <Input
                id="proposedTradeName"
                value={formData.proposedTradeName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    proposedTradeName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessFormationDate">Business formation date</Label>
              <DateField
                id="businessFormationDate"
                value={formData.businessFormationDate}
                onChange={(value) =>
                  setFormData({ ...formData, businessFormationDate: value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerLegalName">Owner Full Legal Name</Label>
              <Input
                id="ownerLegalName"
                value={formData.ownerLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ownerLegalName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of birth</Label>
              <DateField
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(value) =>
                  setFormData({ ...formData, dateOfBirth: value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="naicsCode">NAICS Code</Label>
              <Input
                id="naicsCode"
                value={formData.naicsCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    naicsCode: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessAddress">Business Address</Label>
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

          <div className="space-y-2">
            <Label htmlFor="ownerAddress">Owner Address</Label>
            <Input
              id="ownerAddress"
              value={formData.ownerAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ownerAddress: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessType">Business Entity Type</Label>
              <Select
                value={formData.businessEntityType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessEntityType: value })
                }
              >
                <SelectTrigger className={inputStyles}>
                  <SelectValue placeholder="Select business entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LLC">
                    LLC
                  </SelectItem>
                  <SelectItem value="C-Corp">
                    C-Corp
                  </SelectItem>
                  <SelectItem value="S-Corp">
                    S-Corp
                  </SelectItem>
                  <SelectItem value="Partnership">
                    Partnership
                  </SelectItem>
                  <SelectItem value="Non-Profit">
                    Non-Profit
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryBusinessActivities">Primary Business Activities</Label>
              <Input
                id="primaryBusinessActivities"
                value={formData.primaryBusinessActivities}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    primaryBusinessActivities: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Filing",
      subtitle: "State & package",
      icon: FileText,
      heading: "State & package",
      intro: "Pick the state and filing speed, review the price, and submit.",
      validate: () => {
        if (!formData.state) return "Please select your state of formation.";
        if (!formData.packageType) return "Please choose a package to continue.";
        return "";
      },
      content: (
        <>
          <div className="space-y-2">
            <Label htmlFor="state">State of Formation</Label>
            <Select
              value={formData.state}
              onValueChange={(value) =>
                setFormData({ ...formData, state: value })
              }
              required
            >
              <SelectTrigger className={inputStyles}>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Select Package Type</Label>
            <PackageCards
              value={formData.packageType}
              onChange={(value) =>
                setFormData({ ...formData, packageType: value })
              }
              options={[
                {
                  value: "normal",
                  label: "Normal",
                  icon: Clock,
                  price: formData.state
                    ? priceTableForDBAServices[formData.state]?.normal ?? null
                    : null,
                  priceFallback: "Select a state",
                },
                {
                  value: "express",
                  label: "Express",
                  icon: Zap,
                  badge: "Fastest",
                  price: formData.state
                    ? priceTableForDBAServices[formData.state]?.express ?? null
                    : null,
                  priceFallback: "Select a state",
                },
              ]}
            />
          </div>

          <PriceSummary
            price={price}
            rows={[
              {
                label: `DBA Trademark Registration (${formData.packageType || ""} - ${formData.state || ""})`,
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
      title="Start Your DBA Trademark Registration Services"
      description="2 quick steps — about 3 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start DBA Trademark Registration Services"
      price={price}
    />
  );
}
