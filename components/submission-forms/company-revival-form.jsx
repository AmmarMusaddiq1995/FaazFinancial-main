

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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";





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
      "Our service fee is 130$"
    ],
    express: [
      "Delivery in 7 business days",
      "State fee is not included",
      "Our service fee is 170$"
    ],
  };


export function CompanyRevivalForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmailId: "",
    ownerFullLegalName: "",
    businessAddress: "",
    contactNumber: "",
    articlesOfFormation: "",
    einLetter: "",
    dateOfRevival: "",
    packageType: "",
  });

  const { user } = useAuthContext();
  const [userPersonalId, setUserPersonalId] = useState(null);
  const [price, setPrice] = useState(0);
  useEffect(()=>{
    if(formData.packageType === "normal"){
      const selectedPrice = 130;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = 170;
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
          service_name: "Company Revival",
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
      <Card className="lg:max-w-2xl md:max-w-xl max-w-md mx-auto shadow-2xl shadow-black hover:shadow-2xl hover:shadow-primary transition-all duration-600 border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Start Your Company Revival
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your company revival process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">


              <div className="space-y-2">
                <Label htmlFor="businessName">
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessName: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
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
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
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
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>


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
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactNumber: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  
                />
              </div>



              <div className="space-y-2">
              <Label htmlFor="dobOfOwner">Date of birth of owner</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal border-gray-300 shadow-md shadow-black"
                    id="dobOfOwner"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dobOfOwner
                      ? new Date(formData.dobOfOwner).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.dobOfOwner
                        ? new Date(formData.dobOfOwner)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        dobOfOwner: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.dobOfOwner}
                required
                readOnly
              />
            </div>



            <div className="space-y-2">
              <Label htmlFor="dateOfRevival">Date of revival</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal border-gray-300 shadow-md shadow-black"
                    id="dateOfRevival"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfRevival
                      ? new Date(formData.dateOfRevival).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.dateOfRevival
                        ? new Date(formData.dateOfRevival)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        dateOfRevival: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.dateOfRevival}
                
                readOnly
              />
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
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
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
              <Label htmlFor="packageType">Select Package Type</Label>
                <Select
                  value={formData.packageType}
                   onValueChange={(value) =>
                   setFormData({ ...formData, packageType: value })
                 }
                 required
                >
               <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">
                  <div className="flex items-center justify-between gap-3">
                    <span>Normal</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" aria-label="Normal package details" className="text-gray-500 hover:text-gray-700">
                            <Info className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="text-xs text-white p-2">
                            {/* <p className="font-semibold mb-1">Includes:</p> */}
                            <ul className="list-disc ml-4 space-y-1">
                              {PACKAGE_FEATURES.normal.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul>
                            {/* <p className="font-semibold mt-3 mb-1">Excluded:</p>
                            <ul className="list-disc ml-4 space-y-1">
                              {PACKAGE_EXCLUDED.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul> */}
                            {/* <ul className="list-disc ml-4 space-y-1">
                            {formData.state && (
                              <p className="mt-2"><span className="font-semibold">Price:</span> ${priceTableForAnnualCompanyStateFiling[formData.state]?.normal ?? "—"}</p>
                            )}
                            </ul> */}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </SelectItem>
                 <SelectItem value="express">
                  <div className="flex items-center justify-between gap-3">
                    <span>Express</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" aria-label="Express package details" className="text-gray-500 hover:text-gray-700">
                            <Info className="h-4 w-4 " />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="text-xs text-white p-2">
                            {/* <p className="font-semibold mb-1">Includes:</p> */}
                            <ul className="list-disc ml-4 space-y-1">
                              {PACKAGE_FEATURES.express.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul>
                            {/* <p className="font-semibold mt-3 mb-1">Excluded:</p>
                            <ul className="list-disc ml-4 space-y-1">
                              {PACKAGE_EXCLUDED.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul> */}
                            {/* <ul className="list-disc ml-4 space-y-1">
                            {formData.state && (
                              <p className="mt-2"><span className="font-semibold">Price:</span> ${priceTableForAnnualCompanyStateFiling[formData.state]?.express ?? "—"}</p>
                            )}
                            </ul> */}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </SelectItem>
              </SelectContent>
              </Select>
          </div>


          <div className="space-y-2">
                <Label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">Articles of Formation/Organization/Certificate of Formation</Label>
                <input
                  type="file"
                  id="articlesOfFormation"
                  onChange={(e) => {
                    handleFileUpload(e, "articlesOfFormation");
                  }}
                  
                  placeholder="Scan of your articles of formation/organization/certificate of formation"
                  className="border-gray-300 cursor-pointer shadow-md rounded-md p-2 shadow-black"
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
                  
                  placeholder="Upload your EIN letter"
                  className="border-gray-300 cursor-pointer shadow-md rounded-md p-2 shadow-black"
                />
              </div>

             
            </div>

            <Button type="submit" className="w-full hover:scale-105 transition-all duration-300 hover:shadow-md shadow-black cursor-pointer" disabled={loading}>
              {loading ? "Submitting..." : "Start Company Revival"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}

