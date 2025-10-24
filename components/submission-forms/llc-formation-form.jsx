"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

const priceTableForLLC = {
  Wyoming: { normal:380, express: 450},
  Texas: { normal: 585, express: 655},
  Alabama: { normal: 500, express: 570},
  Alaska: { normal: 550, express: 620},
  Arizona: { normal: 350, express: 420},
  Arkansas: { normal: 350, express: 420},
  California: { normal: 365, express: 435},
  Colorado: { normal: 330, express: 400},
  Connecticut: { normal: 415, express: 485},
  Delaware: { normal: 500, express: 570},
  Florida: { normal: 380, express: 450},
  Georgia: { normal: 380, express: 450},
  Hawaii: { normal: 350, express: 420},
  Idaho: { normal: 385, express: 455},
  Illinois: { normal: 450, express: 520},
  Indiana: { normal: 400, express: 470},
  Iowa: { normal: 350, express: 420},
  Kansas: { normal: 450, express: 520},
  Kentucky: { normal: 330, express: 400},
  Louisiana: { normal: 400, express: 470},
  Maine: { normal: 475, express: 545},
  Maryland: { normal: 400, express: 470},
  Massachusetts: { normal: 800, express: 870},
  Michigan: { normal: 350, express: 420},
  Minnesota: { normal: 450, express: 520},
  Mississippi: { normal: 350, express: 420},
  Missouri: { normal: 350, express: 420},
  Montana: { normal: 330, express: 400},
  Nebraska: { normal: 400, express: 470},
  Nevada: { normal: 500, express: 570},
  NewHampshire: { normal: 400, express: 470},
  NewJersey: { normal: 430, express: 500},
  NewMexico: { normal: 330, express: 400},
  NewYork:{ normal: 500, express: 570},
  NorthCarolina:{ normal: 430, express: 500},
  NorthDakota:{ normal: 415, express: 485},
  Ohio: { normal: 380, express: 450},
  Oklahoma: { normal: 400, express: 470},
  Oregon: { normal: 385, express: 455},
  Pennsylvania: { normal: 430, express: 500},
  RhodeIsland: { normal: 450, express: 520},
  SouthCarolina: { normal: 400, express: 470},
  SouthDakota: { normal: 450, express: 520},
  Tennessee: { normal: 600, express: 670},
  Texas: { normal: 585, express: 655},
  Utah: { normal: 450, express: 520},
  Vermont: { normal: 415, express: 485},
  Virginia: { normal: 400, express: 470},
  Washington: { normal: 500, express: 570},
  WestVirginia: { normal: 450, express: 520},
  Wisconsin: { normal: 430, express: 500},
  Wyoming: { normal: 380, express: 450},
  
}

const PACKAGE_FEATURES = {
  normal: [
    "Delivery in 14 business days",
    "Unlimited name searches",
    "1 year of registered agent service",
    "Filing of articles of Organization/Formation/Incorporation",
    "Operating aggrement",
    "EIN",
    "BOI filing",
    "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
    "Support services"
  ],
  express: [
    "Delivery in 7 business days",
    "Unlimited name searches",
    "1 year of registered agent service",
    "Filing of articles of Organization/Formation/Incorporation",
    "Operating aggrement",
    "EIN",
    "BOI filing",
    "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
    "Support services"
  ],
};

const PACKAGE_EXCLUDED = [
  "US Mobile Number",
  "Website/Domains",
];

export function BusinessFormationForm({ pricingData }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    desiredCompanyName: "",
    alternativeCompanyName: "",
    businessName: "",
    businessType: "",
    state: pricingData?.state || "",
    address: "",
    ownerInfo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    residentialAddress: "",
    ownershipPercentage: "",
    phoneNumber: "",
    email: "",
    faxNumber: "",
    country: "",
    addressLocal: "",
    city: "",
    zipCode: "",
    doYouWantRegisteredAgent: "",
    doYouNeedUniqueBusinessAddress: "",
    doYouWantToUseYourOwnAddress: "",
    doYouWantAnonymousLLCOrOnMemberName: "",
    description: "",
    businessType: "",
    businessWebsite: "",
    businessEmail: "",
    packageType: pricingData?.packageType || "",
  });
  const [members, setMembers] = useState([
    {
      firstName: "",
      middleName: "",
      lastName: "",
      residentialAddress: "",
      ownershipPercentage: "",
    },
  ]);

  const router = useRouter();

  const { user } = useAuthContext();
  const [userPersonalId, setUserPersonalId] = useState(null);
  const [price, setPrice] = useState(pricingData?.price ? parseInt(pricingData.price) : 0);

  useEffect(()=>{
    let basePrice = 0;
    
    // If pricing data is provided from URL, use it directly
    if (pricingData?.price) {
      basePrice = parseInt(pricingData.price);
    } else if(formData.state && formData.packageType){
      // Fallback to calculating price from form data
      const statePrice = priceTableForLLC[formData.state] || priceTableForLLC.Default;
      basePrice = statePrice[formData.packageType];
    }
    
    // Add $65 if user wants unique business address
    const additionalAmount = formData.doYouNeedUniqueBusinessAddress === "Yes" ? 65 : 0;
    setPrice(basePrice + additionalAmount);
  }, [formData.state, formData.packageType, formData.doYouNeedUniqueBusinessAddress, pricingData]);

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
        members,
        price,
        payment_status: "pending",
        payment_id: "",
        pricingData: pricingData, // Include the original pricing data
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const {data: insertedForm ,  error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "LLC Formation",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: price,
          payment_id: "",
        },
      ]).select().single();

      if(error) {
        console.error("Error inserting form_submissions:", error);  
      } else {
        console.log("form_submissions inserted successfully");
        console.log("insertedForm id:", insertedForm.id);
        router.push(`/form-submission-success`);
      }

      
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
          Start Your LLC Formation
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to begin your LLC formation process
        </CardDescription>

        {pricingData?.price && (
          <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-center">
              <span className="font-semibold">Selected Package:</span> {pricingData.planName} - ${pricingData.price}
              <br />
              <span className="text-xs text-muted-foreground">
                {pricingData.packageType === 'normal' ? 'Normal (14 business days)' : 'Express (7 business days)'} • {pricingData.state}
              </span>
            </p>
          </div>
        )}
        
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="desiredCompanyName">Desired Company Name</Label>
              <Input
                id="desiredCompanyName"
                value={formData.desiredCompanyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    desiredCompanyName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alternativeCompanyName">
                Alternative Company Name
              </Label>
              <Input
                id="alternativeCompanyName"
                value={formData.alternativeCompanyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    alternativeCompanyName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>
          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Members Information
            </h2>
          </div>

          {members.map((member, index) => (
            <div key={index} className="space-y-4 border rounded-md p-4">
              <div className="text-sm font-semibold">Member {index + 1}</div>

              <div className="space-y-2">
                <Label htmlFor={`firstName-${index}`}>First Name</Label>
                <Input
                  id={`firstName-${index}`}
                  value={member.firstName}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        firstName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`middleName-${index}`}>Middle Name</Label>
                <Input
                  id={`middleName-${index}`}
                  value={member.middleName}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        middleName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                <Input
                  id={`lastName-${index}`}
                  value={member.lastName}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        lastName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`residentialAddress-${index}`}>
                  Residential Address
                </Label>
                <Input
                  id={`residentialAddress-${index}`}
                  value={member.residentialAddress}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        residentialAddress: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`ownershipPercentage-${index}`}>
                  Ownership Percentage
                </Label>
                <Input
                  id={`ownershipPercentage-${index}`}
                  value={member.ownershipPercentage}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        ownershipPercentage: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>
            </div>
          ))}

          <div>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setMembers((prev) => [
                  ...prev,
                  {
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    residentialAddress: "",
                    ownershipPercentage: "",
                  },
                ])
              }
            >
              Add A Member
            </Button>
          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Contact Information
            </h2>
          </div>

          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number-USA Only</Label>
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
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faxNumber">Fax Number</Label>
              <Input
                id="faxNumber"
                value={formData.faxNumber}
                onChange={(e) =>
                  setFormData({ ...formData, faxNumber: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLocal">Enter Local Address</Label>
              <Input
                id="addressLocal"
                value={formData.addressLocal}
                onChange={(e) =>
                  setFormData({ ...formData, addressLocal: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="border-gray-300"
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
                <SelectTrigger className="border-gray-300">
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
                          <div className="text-xs text-gray-800">
                            <p className="font-semibold mb-1">Includes:</p>
                            <ul className="list-disc ml-4 space-y-1">
                              {PACKAGE_FEATURES.normal.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul>
                            <p className="font-semibold mt-3 mb-1">Excluded:</p>
                            <ul className="list-disc ml-4 space-y-1">
                              {PACKAGE_EXCLUDED.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul>
                            <ul className="list-disc ml-4 space-y-1">
                            {formData.state && (
                              <p className="mt-2"><span className="font-semibold">Price:</span> ${priceTableForLLC[formData.state]?.normal ?? "—"}</p>
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
                            <Info className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="text-xs text-gray-800">
                            <p className="font-semibold mb-1">Includes:</p>
                            <ul className="list-disc ml-4 space-y-1">
                              {PACKAGE_FEATURES.express.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul>
                            <p className="font-semibold mt-3 mb-1">Excluded:</p>
                            <ul className="list-disc ml-4 space-y-1">
                              {PACKAGE_EXCLUDED.map((f) => (
                                <li key={f}>{f}</li>
                              ))}
                            </ul>
                            {formData.state && (
                              <p className="mt-2"><span className="font-semibold">Price:</span> ${priceTableForLLC[formData.state]?.express ?? "—"}</p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </SelectItem>
              </SelectContent>
              </Select>
          </div>

          {price > 0 && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">Service Price Breakdown</p>
                <div className="space-y-1 text-sm">
                  {pricingData?.price ? (
                    <div className="flex justify-between">
                      <span>Base Package ({pricingData.planName}):</span>
                      <span>${pricingData.price}</span>
                    </div>
                  ) : formData.state && formData.packageType ? (
                    <div className="flex justify-between">
                      <span>Base Package ({formData.packageType} - {formData.state}):</span>
                      <span>${priceTableForLLC[formData.state]?.[formData.packageType] || 0}</span>
                    </div>
                  ) : null}
                  {formData.doYouNeedUniqueBusinessAddress === "Yes" && (
                    <div className="flex justify-between">
                      <span>Unique Business Address:</span>
                      <span>$65</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Card Processing Fee (3%):</span>
                    <span>${(price * 0.03).toFixed(2)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-blue-600">${(price * 1.03).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>
          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Additional Information
            </h2>
          </div>

          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="doYouWantRegisteredAgent">Do you want to use a registered agent?</Label>
              <Select
                value={formData.doYouWantRegisteredAgent}
                onValueChange={(value) =>
                  setFormData({ ...formData, doYouWantRegisteredAgent: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes"> Yes </SelectItem>
                  <SelectItem value="No"> No </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doYouNeedUniqueBusinessAddress">
                Do you need Unique business address?(additional cost 65$ yearly)
              </Label>
              <Select
                value={formData.doYouNeedUniqueBusinessAddress}
                onValueChange={(value) =>
                  setFormData({ ...formData, doYouNeedUniqueBusinessAddress: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes"> Yes </SelectItem>
                  <SelectItem value="No"> No </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doYouWantToUseYourOwnAddress">Do you want to use your own address?</Label>
              <Select
                value={formData.doYouWantToUseYourOwnAddress}
                onValueChange={(value) =>
                  setFormData({ ...formData, doYouWantToUseYourOwnAddress: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes"> Yes </SelectItem>
                  <SelectItem value="No"> No </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doYouWantAnonymousLLCOrOnMemberName">
                Do you want Anonymous LLC or on Member Name?
              </Label>
              <Select
                value={formData.doYouWantAnonymousLLCOrOnMemberName}
                onValueChange={(value) =>
                  setFormData({ ...formData, doYouWantAnonymousLLCOrOnMemberName: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anonymous_LLC"> Anonymous LLC </SelectItem>
                  <SelectItem value="On_Member_Name">
                    {" "}
                    On Member Name{" "}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Product Information & Business Website
            </h2>
          </div>

          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="description">Brief Description Of Business</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessType: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OnlineBusiness">
                    Online Business
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
              <Label htmlFor="businessWebsite">Business Website</Label>
              <Input
                id="businessWebsite"
                value={formData.businessWebsite}
                onChange={(e) =>
                  setFormData({ ...formData, businessWebsite: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                value={formData.businessEmail}
                onChange={(e) =>
                  setFormData({ ...formData, businessEmail: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Start LLC Formation"}
          </Button>
        </form>

        {/* <Button onClick={() => submitForm()}>submitForm</Button> */}
      </CardContent>
    </Card>
  );
}
