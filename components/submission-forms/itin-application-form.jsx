"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

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

  const handleFileUpload = async (e, type) => {
    debugger;

    let fileUrl = null;
    const fileName = `${userPersonalId}/${type}/${Date.now()}-${
      e.target.files[0].name
    }`;
    const file = e.target.files[0];
    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
    } else {
      console.log("File uploaded successfully");
    }

    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(fileName);

    fileUrl = publicUrlData.publicUrl;
    console.log("fileUrl :", fileUrl);

    setFormData({
      ...formData,
      [type]: fileUrl,
    });
  };

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
          service_name: "ITIN Application",
          form_data: submissionData,
          status: "pending",
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

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Start Your ITIN Application
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your ITIN application process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">
              <div className="space-y-2">
                <Label htmlFor="legalName">
                  Full legal name as per passport
                </Label>
                <Input
                  id="legalName"
                  value={formData.legalName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      legalName: e.target.value,
                    })
                  }
                  className="border-gray-300"
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
                  className="border-gray-300"
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
                  className="border-gray-300"
                  placeholder="If different from permanent address document will be mailed by IRS"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
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
                  className="border-gray-300"
                  required
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
                  className="border-gray-300"
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
                  className="border-gray-300"
                  placeholder="If you don't have a tax ID, leave blank"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload your passport</Label>
                <input
                  type="file"
                  id="passport"
                  onChange={(e) => {
                    handleFileUpload(e, "passport");
                  }}
                  required
                  placeholder="Scan of your passport copy"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload USA Visa</Label>
                <input
                  type="file"
                  id="usaVisa"
                  onChange={(e) => {
                    handleFileUpload(e, "usaVisa");
                  }}
                  optional
                  placeholder="Only if you have a USA visa"
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">EIN letter</Label>
                <input
                  type="file"
                  id="einLetter"
                  onChange={(e) => {
                    handleFileUpload(e, "einLetter");
                  }}
                  required
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">
                  Certificate of formation for your LLC
                </Label>
                <input
                  type="file"
                  id="certificateOfFormation"
                  onChange={(e) => {
                    handleFileUpload(e, "certificateOfFormation");
                  }}
                  required
                  className="border-gray-300"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Start ITIN Application"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
