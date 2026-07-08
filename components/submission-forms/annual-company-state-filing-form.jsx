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
  FileUploadField,
  FormWizard,
  PackageCards,
  PackageDetailsTooltip,
  PriceSummary,
  US_STATES,
  inputStyles,
  withTimeout,
} from "@/components/submission-forms/form-wizard";

  const priceTableForAnnualCompanyStateFiling = {
    Wyoming: { normal:130, express: 160},
    Texas: { normal: 70, express: 100},
    Alabama: { normal: 70, express: 100},
    Alaska: { normal: 170, express: 200},
    Arizona: { normal: 70, express: 100},
    Arkansas: { normal: 220, express: 250},
    California: { normal: 90, express: 120},
    Colorado: { normal: 95, express: 125},
    Connecticut: { normal: 150, express: 180},
    Delaware: { normal: 370, express: 400},
    Florida: { normal: 208.75, express: 238.75},
    Georgia: { normal: 120, express: 150},
    Hawaii: { normal: 85, express: 115},
    Idaho: { normal: 70, express: 100},
    Illinois: { normal: 145, express: 175},
    Indiana: { normal: 102, express: 132},
    Iowa: { normal: 100, express: 130},
    Kansas: { normal: 120, express: 150},
    Kentucky: { normal: 85, express: 115},
    Louisiana: { normal: 100, express: 130},
    Maine: { normal: 155, express: 185},
    Maryland: { normal: 370, express: 400},
    Massachusetts: { normal: 570, express: 600},
    Michigan: { normal: 95, express: 125},
    Minnesota: { normal: 70, express: 100},
    Mississippi: { normal: 70, express: 100},
    Missouri: { normal: 70, express: 100},
    Montana: { normal: 70, express: 100},
    Nebraska: { normal: 95, express: 125},
    Nevada: { normal: 420, express: 450},
    New_Hampshire: { normal: 170, express: 200},
    New_Jersey: { normal: 145, express: 175},
    New_Mexico: { normal: 70, express: 100},
    New_York:{ normal: 79, express: 109},
    North_Carolina:{ normal: 273, express: 303},
    North_Dakota:{ normal: 120, express: 150},
    Ohio: { normal: 70, express: 100},
    Oklahoma: { normal: 95, express: 125},
    Oregon: { normal: 170, express: 200},
    Pennsylvania: { normal: 77, express: 107},
    Rhode_Island: { normal: 120, express: 150},
    South_Carolina: { normal: 70, express: 100},
    South_Dakota: { normal: 125, express: 155},
    Tennessee: { normal: 370, express: 400},
    Utah: { normal: 88, express: 118},
    Vermont: { normal: 115, express: 145},
    Virginia: { normal: 120, express: 150},
    Washington: { normal: 140, express: 170},
    West_Virginia: { normal: 95, express: 125},
    Wisconsin: { normal: 95, express: 125},

  }

  const PACKAGE_FEATURES = {
    normal: [
      "Delivery in 14 business days",
      "State fee is included",
    ],
    express: [
      "Delivery in 7 business days",
      "State fee is included",
    ],
  };

export function AnnualCompanyStateFilingForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
        businessName: "",
        state: "",
        dateOfFormation: "",
        ownerFullLegalName: "",
        emailAddress: "",
        cashBalanceOfBusiness: "",
        accountsRecieveables: "",
        bankAccountBalanaceAsOfDate: "",
        packageType: "",
        balanceSheet: "",

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
      const selectedPrice = priceTableForAnnualCompanyStateFiling[formData.state]?.normal ?? 0;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = priceTableForAnnualCompanyStateFiling[formData.state]?.express ?? 0;
      setPrice(selectedPrice);
    }
  }, [formData.packageType, formData.state]);


  const [uploadStatus, setUploadStatus] = useState({});

  const handleFileUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus((prev) => ({ ...prev, [type]: "uploading" }));

    try {
      const fileName = `${userPersonalId}/${type}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("uploads")
        .getPublicUrl(fileName);

      setFormData((prev) => ({ ...prev, [type]: publicUrlData.publicUrl }));
      setUploadStatus((prev) => ({ ...prev, [type]: "success" }));
    } catch (err) {
      console.error("Error uploading file:", err);
      // Clear the input so `required` still blocks submit and the same file can be re-picked
      e.target.value = "";
      setFormData((prev) => ({ ...prev, [type]: null }));
      setUploadStatus((prev) => ({ ...prev, [type]: "error" }));
    }
  };



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
          service_name: "Annual Company State Filing",
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
      title: "Company",
      subtitle: "Business & package",
      icon: Building2,
      heading: "Company details",
      intro: "Tell us about the company and pick your filing speed.",
      validate: () => {
        if (!formData.state) return "Please select your state of formation.";
        if (!formData.packageType) return "Please choose a package to continue.";
        return "";
      },
      content: (
        <>
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  businessName: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
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
                  delivery: "14 business days",
                  icon: Clock,
                  price: formData.state
                    ? priceTableForAnnualCompanyStateFiling[formData.state]?.normal ?? null
                    : null,
                  priceFallback: "Select a state",
                  tooltip: (
                    <PackageDetailsTooltip
                      label="Normal"
                      features={PACKAGE_FEATURES.normal}
                      price={
                        formData.state
                          ? priceTableForAnnualCompanyStateFiling[formData.state]?.normal ?? "—"
                          : null
                      }
                    />
                  ),
                },
                {
                  value: "express",
                  label: "Express",
                  delivery: "7 business days",
                  icon: Zap,
                  badge: "Fastest",
                  price: formData.state
                    ? priceTableForAnnualCompanyStateFiling[formData.state]?.express ?? null
                    : null,
                  priceFallback: "Select a state",
                  tooltip: (
                    <PackageDetailsTooltip
                      label="Express"
                      features={PACKAGE_FEATURES.express}
                      price={
                        formData.state
                          ? priceTableForAnnualCompanyStateFiling[formData.state]?.express ?? "—"
                          : null
                      }
                    />
                  ),
                },
              ]}
            />
          </div>
        </>
      ),
    },
    {
      title: "Details",
      subtitle: "Review & submit",
      icon: FileText,
      heading: "Owner & financial details",
      intro: "Last step — a few financial details, then review the price and submit.",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ownerFullLegalName">Owner Full Legal Name</Label>
              <Input
                id="ownerFullLegalName"
                value={formData.ownerFullLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ownerFullLegalName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address</Label>
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cashBalanceOfBusiness">Cash Balance of Business</Label>
              <Input
                id="cashBalanceOfBusiness"
                value={formData.cashBalanceOfBusiness}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cashBalanceOfBusiness: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountsRecieveables">Accounts Recieveables</Label>
              <Input
                id="accountsRecieveables"
                value={formData.accountsRecieveables}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accountsRecieveables: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankAccountBalanaceAsOfDate">Bank Account Balanace As Of Date</Label>
            <Input
              id="bankAccountBalanaceAsOfDate"
              value={formData.bankAccountBalanaceAsOfDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bankAccountBalanaceAsOfDate: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="balanceSheet">Balance Sheet</Label>
            <FileUploadField
              id="balanceSheet"
              uploaded={!!formData.balanceSheet}
              placeholder="Click to upload your balance sheet"
              status={uploadStatus.balanceSheet}
              onChange={(e) => handleFileUpload(e, "balanceSheet")}
            />
          </div>

          <PriceSummary
            price={price}
            rows={[
              {
                label: `Annual State Filing (${formData.packageType || ""} - ${formData.state || ""})`,
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
      title="Start Your Annual Company State Filing"
      description="2 quick steps — about 3 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Annual Company State Filing"
      price={price}
    />
  );
}
