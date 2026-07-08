"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { User, FileText } from "lucide-react";
import {
  FileUploadField,
  FormWizard,
  PriceSummary,
  inputStyles,
  withTimeout,
} from "@/components/submission-forms/form-wizard";

const ITIN_PRICE = 400;

export function ItinApplicationForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    legalName: "",
    permanentAddress: "",
    mailingAddress: "",
    phoneNumber: "",
    emailAddress: "",
    profession: "",
    countryTaxId: "",
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
          service_name: "ITIN Application",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:"400"


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
      title: "Applicant",
      subtitle: "Personal details",
      icon: User,
      heading: "Applicant details",
      intro: "Tell us about yourself, exactly as it appears on your passport.",
      content: (
        <>
          <div className="space-y-2">
            <Label htmlFor="legalName">Full legal name as per passport</Label>
            <Input
              id="legalName"
              value={formData.legalName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  legalName: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="permanentAddress">Permanent address</Label>
            <Input
              id="permanentAddress"
              value={formData.permanentAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  permanentAddress: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mailingAddress">Mailing address</Label>
            <Input
              id="mailingAddress"
              value={formData.mailingAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mailingAddress: e.target.value,
                })
              }
              className={inputStyles}
              placeholder="If different from permanent address document will be mailed by IRS"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone number</Label>
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email address</Label>
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
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                value={formData.profession}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profession: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="countryTaxId">Your country tax ID</Label>
              <Input
                id="countryTaxId"
                value={formData.countryTaxId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    countryTaxId: e.target.value,
                  })
                }
                className={inputStyles}
                placeholder="If you don't have a tax ID, leave blank"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Documents",
      subtitle: "Review & submit",
      icon: FileText,
      heading: "Upload your documents",
      intro: "Last step — upload the required documents, review the price, and submit.",
      content: (
        <>
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

          <div className="space-y-2">
            <Label htmlFor="usaVisa">Upload USA Visa</Label>
            <FileUploadField
              id="usaVisa"
              uploaded={!!formData.usaVisa}
              placeholder="Only if you have a USA visa"
              status={uploadStatus.usaVisa}
              onChange={(e) => handleFileUpload(e, "usaVisa")}
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

          <div className="space-y-2">
            <Label htmlFor="certificateOfFormation">
              Certificate of formation for your LLC
            </Label>
            <FileUploadField
              id="certificateOfFormation"
              uploaded={!!formData.certificateOfFormation}
              placeholder="Upload your certificate of formation"
              required
              status={uploadStatus.certificateOfFormation}
              onChange={(e) => handleFileUpload(e, "certificateOfFormation")}
            />
          </div>

          <PriceSummary
            price={ITIN_PRICE}
            rows={[{ label: "ITIN Application", amount: ITIN_PRICE }]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your ITIN Application"
      description="2 quick steps — about 3 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start ITIN Application"
      price={ITIN_PRICE}
    />
  );
}
