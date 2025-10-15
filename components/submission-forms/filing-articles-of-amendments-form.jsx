"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";



const PACKAGE_FEATURES = {
    normal: [
      "Delivery in 14 business days",
      "State fee is not included",
      "Our service fee is 125$"
    ],
    express: [
      "Delivery in 7 business days",
      "State fee is not included",
      "Our service fee is 125$"
    ],
  };

export function FilingArticlesOfAmendmentsForm() {

  


  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
   businessName: "",
   reasonForFilingAmendments: "",
   provideNewBusinessName: "",
   ownerFullLegalName: "",
   emailAddress: "",
   ownerAddress: "",
   contactNumber: "",
   businessAddress: "",
   packageType: "",
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
      const selectedPrice = 125;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = 125;
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
      } = await supabase.auth.getUser();

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
          service_name: "Filing Articles of Amendments",
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

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-center">
          Start Your Filing Articles of Amendments
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to begin your Filing Articles of Amendments process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 border rounded-md p-4">


            <div className="space-y-2">
              <Label htmlFor="businessName">Business name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


        

            <div className="space-y-2">
              <Label htmlFor="reasonForFilingAmendments">Reason for filing amendments</Label>
              <Input
                type="text"
                id="reasonForFilingAmendments"
                value={formData.reasonForFilingAmendments}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reasonForFilingAmendments: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="provideNewBusinessName">Provide new business name</Label>
              <Input
                type="text"
                id="provideNewBusinessName"
                value={formData.provideNewBusinessName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    provideNewBusinessName: e.target.value,
                  })
                }
                className="border-gray-300"
                optional
                placeholder="If business name is changing, provide new business name (optional)"
              />
            </div>



            <div className="space-y-2">
              <Label htmlFor="ownerFullLegalName">Owner full legal name</Label>
              <Input
                type="text"
                id="ownerFullLegalName"
                value={formData.ownerFullLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ownerFullLegalName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email address</Label>
              <Input
                type="text"
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
              <Label htmlFor="ownerAddress">Owner address</Label>
              <Input
                type="text"
                id="ownerAddress"
                value={formData.ownerAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ownerAddress: e.target.value,
                  })
                }
                className="border-gray-300"
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
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business address</Label>
              <Input
                type="text"
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessAddress: e.target.value,
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
          
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Start Filing Articles of Amendments"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
