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
  inputStyles,
  withTimeout,
} from "@/components/submission-forms/form-wizard";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];



const PACKAGE_FEATURES = {
    normal: [
      "Delivery in 14 business days",
      "State fee is not included",
      "Our service fee is 165$"
    ],
    express: [
      "Delivery in 7 business days",
      "State fee is not included",
      "Our service fee is 200$"
    ],
  };


export function CompanyDissolutionForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmailId: "",
    ownerFullLegalName: "",
    businessAddress: "",
    reasonOfDissolution: "",
    contactNumber: "",
    articlesOfFormation: "",
    einLetter: "",
    packageType: "",
  });

  const { user } = useAuthContext();
  const [userPersonalId, setUserPersonalId] = useState(null);
  const [price, setPrice] = useState(0);
  useEffect(()=>{
    if(formData.packageType === "normal"){
      const selectedPrice = 165;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = 200;
      setPrice(selectedPrice);
    }
  }, [formData.packageType]);
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
          service_name: "Company Dissolution",
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
      subtitle: "Company details",
      icon: Building2,
      heading: "Business details",
      intro: "Tell us about the company you want to dissolve.",
      validate: () => {
        if (!formData.state) return "Please select your state of formation.";
        return "";
      },
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
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

            <div className="space-y-2">
              <Label htmlFor="businessEmailId">Business Email ID</Label>
              <Input
                id="businessEmailId"
                value={formData.businessEmailId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessEmailId: e.target.value,
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
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactNumber: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reasonOfDissolution">Reason of Dissolution</Label>
            <Input
              id="reasonOfDissolution"
              value={formData.reasonOfDissolution}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reasonOfDissolution: e.target.value,
                })
              }
              className={inputStyles}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dobOfOwner">Date of birth of owner</Label>
              <DateField
                id="dobOfOwner"
                value={formData.dobOfOwner}
                onChange={(value) =>
                  setFormData({ ...formData, dobOfOwner: value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfDissolution">Date of dissolution</Label>
              <DateField
                id="dateOfDissolution"
                value={formData.dateOfDissolution}
                onChange={(value) =>
                  setFormData({ ...formData, dateOfDissolution: value })
                }
                required
              />
            </div>
          </div>

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
        </>
      ),
    },
    {
      title: "Filing",
      subtitle: "Package & documents",
      icon: FileText,
      heading: "Package & documents",
      intro: "Pick your filing speed, upload your documents, and submit.",
      validate: () => {
        if (!formData.packageType) return "Please choose a package to continue.";
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
                  value: "normal",
                  label: "Normal",
                  delivery: "14 business days",
                  icon: Clock,
                  price: 165,
                  tooltip: (
                    <PackageDetailsTooltip
                      label="Normal"
                      features={PACKAGE_FEATURES.normal}
                    />
                  ),
                },
                {
                  value: "express",
                  label: "Express",
                  delivery: "7 business days",
                  icon: Zap,
                  badge: "Fastest",
                  price: 200,
                  tooltip: (
                    <PackageDetailsTooltip
                      label="Express"
                      features={PACKAGE_FEATURES.express}
                    />
                  ),
                },
              ]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="articlesOfFormation">
              Articles of Formation/Organization/Certificate of Formation
            </Label>
            <FileUploadField
              id="articlesOfFormation"
              uploaded={!!formData.articlesOfFormation}
              placeholder="Scan of your articles of formation/organization/certificate of formation"
              status={uploadStatus.articlesOfFormation}
              onChange={(e) => handleFileUpload(e, "articlesOfFormation")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="einLetter">EIN letter</Label>
            <FileUploadField
              id="einLetter"
              uploaded={!!formData.einLetter}
              placeholder="Upload your EIN letter"
              required
              status={uploadStatus.einLetter}
              onChange={(e) => handleFileUpload(e, "einLetter")}
            />
          </div>

          <PriceSummary
            price={price}
            rows={[
              {
                label: `Company Dissolution (${formData.packageType || ""})`,
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
      title="Start Your Company Dissolution"
      description="2 quick steps — about 3 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Company Dissolution"
      price={price}
    />
  );
}
