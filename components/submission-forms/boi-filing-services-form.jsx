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
  PriceSummary,
  inputStyles,
  withTimeout,
} from "@/components/submission-forms/form-wizard";

export function BoiFilingServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    dateOfFormation: "",
    businessEntityType: "",
    member1FullLegalName: "",
    member1AddressDetails: "",
    member2FullLegalName: "",
    member2AddressDetails: "",
    usContactNumber: "",
    businessEmailAddress: "",
    passport: "",
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
      const selectedPrice = 25;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = 35;
      setPrice(selectedPrice);
    }
  }, [formData.packageType]);

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
          service_name: "BOI Filing Services",
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
      subtitle: "Business & members",
      icon: Building2,
      heading: "Company & member details",
      intro: "Tell us about the company and its beneficial owners.",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
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
            <Label htmlFor="businessType">Business Entity Type</Label>
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
              <SelectContent>
                <SelectItem value="LLC">
                  LLC
                </SelectItem>
                <SelectItem value="ECommerceBusiness">
                  E-Commerce Business
                </SelectItem>
                <SelectItem value="WholesaleBusiness">
                  Wholesale Business
                </SelectItem>
                <SelectItem value="RetailBusiness">
                  Retail Business
                </SelectItem>
                <SelectItem value="MarketingAgency">
                  Marketing Agency
                </SelectItem>
                <SelectItem value="ShopifyStore">
                  Shopify Store
                </SelectItem>
                <SelectItem value="Other">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="member1FullLegalName">
                Member 1 Full Legal Name
              </Label>
              <Input
                id="member1FullLegalName"
                value={formData.member1FullLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    member1FullLegalName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="member1AddressDetails">Member 1 Address Details</Label>
              <Input
                id="member1AddressDetails"
                value={formData.member1AddressDetails}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    member1AddressDetails: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="member2FullLegalName">
                Member 2 Full Legal Name
              </Label>
              <Input
                id="member2FullLegalName"
                value={formData.member2FullLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    member2FullLegalName: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="member2AddressDetails">Member 2 Address Details</Label>
              <Input
                id="member2AddressDetails"
                value={formData.member2AddressDetails}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    member2AddressDetails: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="usContactNumber">US Contact Number</Label>
              <Input
                id="usContactNumber"
                value={formData.usContactNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    usContactNumber: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEmailAddress">Business Email address</Label>
              <Input
                id="businessEmailAddress"
                value={formData.businessEmailAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessEmailAddress: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Filing",
      subtitle: "Package & passport",
      icon: FileText,
      heading: "Package & documents",
      intro: "Pick your filing speed, upload your passport, and submit.",
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
                { value: "normal", label: "Normal", icon: Clock, price: 25 },
                { value: "express", label: "Express", icon: Zap, badge: "Fastest", price: 35 },
              ]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passport">Upload your passport</Label>
            <FileUploadField
              id="passport"
              uploaded={!!formData.passport}
              placeholder="Scan of your passport copy"
              required
              status={uploadStatus.passport}
              onChange={(e) => handleFileUpload(e, "passport")}
            />
          </div>

          <PriceSummary
            price={price}
            rows={[
              {
                label: `BOI Filing (${formData.packageType || ""})`,
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
      title="Start Your BOI Filing Services"
      description="2 quick steps — about 3 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start BOI Filing Services"
      price={price}
    />
  );
}
