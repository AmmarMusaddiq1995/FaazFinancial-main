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

const priceTableForCCorp = {
  Wyoming: { normal:430, express: 500},
  Texas: { normal: 635, express: 705},
  Washington: { normal: 500, express: 570},
  California: { normal: 415, express: 485},
  Colorado: { normal: 380, express: 450},
  Florida: { normal: 430, express: 500},
  Georgia: { normal: 430, express: 500},
  NewYork:{ normal: 550, express: 620},
  Alabama: { normal: 550, express: 620},
  Alaska: { normal: 600, express: 670},
  NewHampshire: { normal: 450, express: 520},
  Hawaii: { normal: 400, express: 470},
  WestVirginia: { normal: 450, express: 520},
  Virginia: { normal: 400, express: 470},
  Arizona: { normal: 400, express: 470},
  Arkansas: { normal: 400, express: 470},
  NewJersey: { normal: 480, express: 550},
  NewMexico: { normal: 380, express: 450},
  Connecticut: { normal: 465, express: 535},
  Delaware: { normal: 550, express: 620},
  Vermont: { normal: 415, express: 485},
  Idaho: { normal: 435, express: 505},
  Illinois: { normal: 500, express: 570},
  Indiana: { normal: 450, express: 520},
  Iowa: { normal: 400, express: 470},
  Kansas: { normal: 500, express: 570},
  Kentucky: { normal: 380, express: 450},
  Louisiana: { normal: 450, express: 520},
  Maine: { normal: 525, express: 595},
  Maryland: { normal: 450, express: 520},
  Massachusetts: { normal: 850, express: 920},
  Michigan: { normal: 400, express: 470},
  Minnesota: { normal: 500, express: 570},
  Mississippi: { normal: 400, express: 470},
  Missouri: { normal: 400, express: 470},
  Montana: { normal: 380, express: 450},
  Nebraska: { normal: 450, express: 520},
  Nevada: { normal: 550, express: 620},
  NorthCarolina:{ normal: 480, express: 550},
  NorthDakota:{ normal: 465, express: 535},
  Ohio: { normal: 430, express: 500},
  Oklahoma: { normal: 450, express: 520},
  Oregon: { normal: 435, express: 505},
  Pennsylvania: { normal: 480, express: 550},
  RhodeIsland: { normal: 500, express: 570},
  SouthCarolina: { normal: 450, express: 520},
  SouthDakota: { normal: 500, express: 570},
  Tennessee: { normal: 650, express: 720},
  Texas: { normal: 585, express: 655},
  Utah: { normal: 500, express: 570},
  Wisconsin: { normal: 480, express: 550},
  
  
}

const PACKAGE_FEATURES = {
  normal: [
    "Delivery in 14 business days",
    "Unlimited name searches",
    "1 year of registered agent service",
    "Filing of articles of Organization/Formation/Incorporation",
    "Bylaws/Other company's documents",
    "EIN",
    "BOI filing",
    "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
    "Support services",
  ],
  express: [
    "Delivery in 7 business days",
    "Unlimited name searches",
    "1 year of registered agent service",
    "Filing of articles of Organization/Formation/Incorporation",
    "Bylaws/Other company's documents",
    "EIN",
    "BOI filing",
    "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
    "Support services",
  ],
};

const PACKAGE_EXCLUDED = [
  "US Mobile Number",
  "Website/Domains",
];

export function CorporationFormationForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    desiredCompanyName: "",
    alternativeCompanyName: "",
    businessName: "",
    businessType: "",
    state: "",
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
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    description: "",
    businessType: "",
    businessWebsite: "",
    businessEmail: "",
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
  const [price, setPrice] = useState(0);

  useEffect(()=>{
    if(formData.state && formData.packageType){
      const statePrice = priceTableForCCorp[formData.state] || priceTableForCCorp.Default;
      const selectedPrice = statePrice[formData.packageType];
      setPrice(selectedPrice);
    }
  }, [formData.state, formData.packageType]);

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
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const {data: insertedForm ,  error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "C-Corporation Formation",
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
          Start Your C-Corporation Formation
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to begin your C-Corporation formation process
        </CardDescription>
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
                            {formData.state && (
                              <p className="mt-2"><span className="font-semibold">Price:</span> ${priceTableForCCorp[formData.state]?.normal ?? "—"}</p>
                            )}
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
                              <p className="mt-2"><span className="font-semibold">Price:</span> ${priceTableForCCorp[formData.state]?.express ?? "—"}</p>
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

{/* {price > 0 && (
  <div className="mt-4 text-center">
    <p className="text-lg font-semibold">
      Estimated Service Price: <span className="text-blue-600">${price}</span>
    </p>
  </div>
)} */}

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
              <Label htmlFor="q1">Do you want to use a registered agent?</Label>
              <Select
                value={formData.q1}
                onValueChange={(value) =>
                  setFormData({ ...formData, q1: value })
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
              <Label htmlFor="q2">
                Do you need Unique business address?(additional cost 65$ yearly)
              </Label>
              <Select
                value={formData.q2}
                onValueChange={(value) =>
                  setFormData({ ...formData, q2: value })
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
              <Label htmlFor="q3">Do you want to use your own address?</Label>
              <Select
                value={formData.q3}
                onValueChange={(value) =>
                  setFormData({ ...formData, q3: value })
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
              <Label htmlFor="q4">
                Do you want Anonymous LLC or on Member Name?
              </Label>
              <Select
                value={formData.q4}
                onValueChange={(value) =>
                  setFormData({ ...formData, q4: value })
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
            {loading ? "Submitting..." : "Start C-Corporation Formation"}
          </Button>
        </form>

       
      </CardContent>
    </Card>
  );
}
