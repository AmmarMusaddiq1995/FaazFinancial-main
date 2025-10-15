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
import { Footer } from "../footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";




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

  const handleFileUpload = async (e, type) => {
    

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

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Start Your BOI Filing Services
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your BOI filing services process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">
              
              
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyName: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>


              <div className="space-y-2">
              <Label htmlFor="dateOfFormation">Date of formation</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal border-gray-300"
                    id="dateOfFormation"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfFormation
                      ? new Date(formData.dateOfFormation).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.dateOfFormation
                        ? new Date(formData.dateOfFormation)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        dateOfFormation: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.dateOfFormation}
                required
                readOnly
              />
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
                <SelectTrigger className="border-gray-300">
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
                </SelectContent>
              </Select>
            </div>

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
                  className="border-gray-300"
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
                  className="border-gray-300"
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
                  className="border-gray-300"
                  optional
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
                  className="border-gray-300"
                  optional
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
                  className="border-gray-300"
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
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
              <Label htmlFor="packageType">Select Package Type</Label>
                <Select
                  value={formData.packageType}
                   onValueChange={(value) =>
                   setFormData({ ...formData, packageType: value })
                 }
                 required
                >
               <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                 <SelectItem value="express">Express</SelectItem>
              </SelectContent>
              </Select>
          </div>

             

             

              <div className="space-y-2">
                <Label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">Upload your passport</Label>
                <input
                  type="file"
                  id="passport"
                  onChange={(e) => {
                    handleFileUpload(e, "passport");
                  }}
                  required
                  placeholder="Scan of your passport copy"
                  className="border-gray-300 cursor-pointer"
                />
              </div>

              
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Start BOI Filing Services"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
