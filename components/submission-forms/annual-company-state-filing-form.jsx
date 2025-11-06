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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";


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
    NewHampshire: { normal: 170, express: 200},
    NewJersey: { normal: 145, express: 175},
    NewMexico: { normal: 70, express: 100},
    NewYork:{ normal: 79, express: 109},
    NorthCarolina:{ normal: 273, express: 303},
    NorthDakota:{ normal: 120, express: 150},
    Ohio: { normal: 70, express: 100},
    Oklahoma: { normal: 95, express: 125},
    Oregon: { normal: 170, express: 200},
    Pennsylvania: { normal: 77, express: 107},
    RhodeIsland: { normal: 120, express: 150},
    SouthCarolina: { normal: 70, express: 100},
    SouthDakota: { normal: 125, express: 155},
    Tennessee: { normal: 370, express: 400},
    Texas: { normal: 70, express: 100},
    Utah: { normal: 88, express: 118},
    Vermont: { normal: 115, express: 145},
    Virginia: { normal: 120, express: 150},
    Washington: { normal: 140, express: 170},
    WestVirginia: { normal: 95, express: 125},
    Wisconsin: { normal: 95, express: 125},
    Wyoming: { normal: 130, express: 160},
    
  }
  
  const PACKAGE_FEATURES = {
    normal: [
      "Delivery in 14 business days",
      "State fee is included",
    //   "Unlimited name searches",
    //   "1 year of registered agent service",
    //   "Filing of articles of Organization/Formation/Incorporation",
    //   "Operating aggrement",
    //   "EIN",
    //   "BOI filing",
    //   "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
    //   "Support services"
    ],
    express: [
      "Delivery in 7 business days",
      "State fee is included",
    //   "Unlimited name searches",
    //   "1 year of registered agent service",
    //   "Filing of articles of Organization/Formation/Incorporation",
    //   "Operating aggrement",
    //   "EIN",
    //   "BOI filing",
    //   "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
    //   "Support services"
    ],
  };
  
  const PACKAGE_EXCLUDED = [
    "US Mobile Number",
    "Website/Domains",
  ];
  




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

  return (
    <>
      <Card className="lg:max-w-2xl md:max-w-xl max-w-md mx-auto shadow-2xl shadow-black hover:shadow-2xl hover:shadow-primary transition-all duration-600 border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Start Your Annual Company State Filing
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your annual company state filing process
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
                            <ul className="list-disc ml-4 space-y-1">
                            {formData.state && (
                              <p className="mt-2"><span className="font-semibold">Price:</span> ${priceTableForAnnualCompanyStateFiling[formData.state]?.normal ?? "—"}</p>
                            )}
                            </ul>
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
                            <ul className="list-disc ml-4 space-y-1">
                            {formData.state && (
                              <p className="mt-2"><span className="font-semibold">Price:</span> ${priceTableForAnnualCompanyStateFiling[formData.state]?.express ?? "—"}</p>
                            )}
                            </ul>
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
              <Label htmlFor="dateOfFormation">Date of formation</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                  className="justify-start text-left font-normal border-gray-300 shadow-md shadow-black"
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
                <Label htmlFor="ownerFullLegalName">
                  Owner Full Legal Name
                </Label>
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
                  className="border-gray-300 shadow-md shadow-black"
                  required
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
                  className="border-gray-300 shadow-md shadow-black"
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
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
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
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="file">
                  Balance Sheet
                </Label>
                <input
                  type="file"
                  id="balanceSheet"
                  onChange={(e) => {
                    handleFileUpload(e, "balanceSheet");
                  }}
                  required
                  className="border-gray-300 cursor-pointer shadow-md shadow-black"
                />
              </div>


        

             

             

            
              
            </div>

            <Button type="submit" className="w-full hover:scale-105 transition-all duration-300 hover:shadow-md shadow-black cursor-pointer" disabled={loading}>
              {loading ? "Submitting..." : "Start Annual Company State Filing"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
