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

// const US_STATES = [
//   "Alabama",
//   "Alaska",
//   "Arizona",
//   "Arkansas",
//   "California",
//   "Colorado",
//   "Connecticut",
//   "Delaware",
//   "Florida",
//   "Georgia",
//   "Hawaii",
//   "Idaho",
//   "Illinois",
//   "Indiana",
//   "Iowa",
//   "Kansas",
//   "Kentucky",
//   "Louisiana",
//   "Maine",
//   "Maryland",
//   "Massachusetts",
//   "Michigan",
//   "Minnesota",
//   "Mississippi",
//   "Missouri",
//   "Montana",
//   "Nebraska",
//   "Nevada",
//   "New Hampshire",
//   "New Jersey",
//   "New Mexico",
//   "New York",
//   "North Carolina",
//   "North Dakota",
//   "Ohio",
//   "Oklahoma",
//   "Oregon",
//   "Pennsylvania",
//   "Rhode Island",
//   "South Carolina",
//   "South Dakota",
//   "Tennessee",
//   "Texas",
//   "Utah",
//   "Vermont",
//   "Virginia",
//   "Washington",
//   "West Virginia",
//   "Wisconsin",
//   "Wyoming",
// ];

// const priceTableForLLC = {
//   Wyoming: { normal:380, express: 450},
//   Texas: { normal: 585, express: 655},
//   Alabama: { normal: 500, express: 570},
//   Alaska: { normal: 550, express: 620},
//   Arizona: { normal: 350, express: 420},
//   Arkansas: { normal: 350, express: 420},
//   California: { normal: 365, express: 435},
//   Colorado: { normal: 330, express: 400},
//   Connecticut: { normal: 415, express: 485},
//   Delaware: { normal: 500, express: 570},
//   Florida: { normal: 380, express: 450},
//   Georgia: { normal: 380, express: 450},
//   Hawaii: { normal: 350, express: 420},
//   Idaho: { normal: 385, express: 455},
//   Illinois: { normal: 450, express: 520},
//   Indiana: { normal: 400, express: 470},
//   Iowa: { normal: 350, express: 420},
//   Kansas: { normal: 450, express: 520},
//   Kentucky: { normal: 330, express: 400},
//   Louisiana: { normal: 400, express: 470},
//   Maine: { normal: 475, express: 545},
//   Maryland: { normal: 400, express: 470},
//   Massachusetts: { normal: 800, express: 870},
//   Michigan: { normal: 350, express: 420},
//   Minnesota: { normal: 450, express: 520},
//   Mississippi: { normal: 350, express: 420},
//   Missouri: { normal: 350, express: 420},
//   Montana: { normal: 330, express: 400},
//   Nebraska: { normal: 400, express: 470},
//   Nevada: { normal: 500, express: 570},
//   NewHampshire: { normal: 400, express: 470},
//   NewJersey: { normal: 430, express: 500},
//   NewMexico: { normal: 330, express: 400},
//   NewYork:{ normal: 500, express: 570},
//   NorthCarolina:{ normal: 430, express: 500},
//   NorthDakota:{ normal: 415, express: 485},
//   Ohio: { normal: 380, express: 450},
//   Oklahoma: { normal: 400, express: 470},
//   Oregon: { normal: 385, express: 455},
//   Pennsylvania: { normal: 430, express: 500},
//   RhodeIsland: { normal: 450, express: 520},
//   SouthCarolina: { normal: 400, express: 470},
//   SouthDakota: { normal: 450, express: 520},
//   Tennessee: { normal: 600, express: 670},
//   Texas: { normal: 585, express: 655},
//   Utah: { normal: 450, express: 520},
//   Vermont: { normal: 415, express: 485},
//   Virginia: { normal: 400, express: 470},
//   Washington: { normal: 500, express: 570},
//   WestVirginia: { normal: 450, express: 520},
//   Wisconsin: { normal: 430, express: 500},
//   Wyoming: { normal: 380, express: 450},
  
// }

// const PACKAGE_FEATURES = {
//   normal: [
//     "Delivery in 14 business days",
//     "Unlimited name searches",
//     "1 year of registered agent service",
//     "Filing of articles of Organization/Formation/Incorporation",
//     "Operating aggrement",
//     "EIN",
//     "BOI filing",
//     "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
//     "Support services"
//   ],
//   express: [
//     "Delivery in 7 business days",
//     "Unlimited name searches",
//     "1 year of registered agent service",
//     "Filing of articles of Organization/Formation/Incorporation",
//     "Operating aggrement",
//     "EIN",
//     "BOI filing",
//     "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
//     "Support services"
//   ],
// };

// const PACKAGE_EXCLUDED = [
//   "US Mobile Number",
//   "Website/Domains",
// ];

export function UKLTDFormationForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    desiredCompanyName: "",
    alternativeCompanyName: "",
    businessEntityType: "",
    firstName: "",
    lastName: "",
    phoneNumberBusiness: "",
    emailBusiness: "",
    faxNumber: "",
    country: "",
    addressLocal: "",
    city: "",
    state: "",
    zipCode: "",
    fThreeLetterOfMotherName: "",
    fThreeLetterOfFatherName: "",
    fThreeLetterOfTownOfBirth: "",
  });
  const [members, setMembers] = useState([
    {
     firstName: "",
     lastName: "",
     surName: "",
     title: "",
     ownershipPercentage: "",
     nationality: "",
     occupation: "",
     residentialAddress: "",
     serviceAddress: "",
     emailAddress: "",
    },
  ]);

  const router = useRouter();

  const { user } = useAuthContext();
  const [userPersonalId, setUserPersonalId] = useState(null);
//   const [price, setPrice] = useState(0);

//   useEffect(()=>{
//     if(formData.state && formData.packageType){
//       const statePrice = priceTableForLLC[formData.state] || priceTableForLLC.Default;
//       const selectedPrice = statePrice[formData.packageType];
//       setPrice(selectedPrice);
//     }
//   }, [formData.state, formData.packageType]);

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
        price: 240,
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
          service_name: "UK LTD Formation",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: 240,
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
    <Card className="lg:max-w-2xl md:max-w-xl max-w-md mx-auto shadow-2xl shadow-black hover:shadow-2xl hover:shadow-primary transition-all duration-600 border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-center">
          Start Your UK LTD Formation
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to begin your UK LTD formation process
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
                className="border-gray-300 shadow-md shadow-black"
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
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEntityType">Business Entity Type</Label>
              <Select
                value={formData.businessEntityType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessEntityType: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                  <SelectValue placeholder="Select business entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LLC">
                    LLC
                  </SelectItem>
                  <SelectItem value="Sole Proprietorship">
                    Sole Proprietorship
                  </SelectItem>
                  <SelectItem value="Partnership">
                    Partnership
                  </SelectItem>
                  <SelectItem value="Non-Profit">
                    Non-Profit
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>


          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Management Information
            </h2>
          </div>

          {members.map((member, index) => (
            <div key={index} className="space-y-4 border rounded-md p-4">
              <div className="text-sm font-semibold">Member {index + 1}</div>

              <div className="space-y-2">
                <Label htmlFor={`title-${index}`}>Title</Label>
                <Input
                  id={`title-${index}`}
                  value={member.title}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        title: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>

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
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`surName-${index}`}>Surname</Label>
                <Input
                  id={`surName-${index}`}
                  value={member.surName}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        surName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
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
                  className="border-gray-300 shadow-md shadow-black"
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
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor={`nationality-${index}`}>
                  Nationality
                </Label>
                <Input
                  id={`nationality-${index}`}
                  value={member.nationality}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        nationality: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor={`occupation-${index}`}>
                  Occupation
                </Label>
                <Input
                  id={`occupation-${index}`}
                  value={member.occupation}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        occupation: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
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
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`serviceAddress-${index}`}>
                  Service/Correspondence Address (Public) 
                </Label>
                <Input
                  id={`serviceAddress-${index}`}
                  value={member.serviceAddress}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        serviceAddress: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  required
                  placeholder="If you want to keep your personal address hidden, you can purchase our service address for 39£ + VAT."
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor={`emailAddress-${index}`}>
                    Email Address
                </Label>
                <Input
                  id={`emailAddress-${index}`}
                  value={member.emailAddress}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        emailAddress: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
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
                   title: "",
                   firstName: "",
                   surName: "",
                   lastName: "",
                   ownershipPercentage: "",
                   nationality: "",
                   occupation: "",
                   residentialAddress: "",
                   serviceAddress: "",
                   emailAddress: "",
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
                     Security Questions
                  </h2>
               </div>

         <div className="space-y-4 border rounded-md p-4">

               <div className="space-y-2">
              <Label htmlFor="fThreeLetterOfMotherName">First 3 letters of mother's maiden name</Label>
              <Input
                id="fThreeLetterOfMotherName"
                value={formData.fThreeLetterOfMotherName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fThreeLetterOfMotherName: e.target.value,
                  })
                }
                maxLength={3}
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="fThreeLetterOfFatherName">First 3 letters of father's first name</Label>
              <Input
                id="fThreeLetterOfFatherName"
                value={formData.fThreeLetterOfFatherName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fThreeLetterOfFatherName: e.target.value,
                  })
                }
                maxLength={3}
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="fThreeLetterOfTownOfBirth">First 3 letters of town of birth</Label>
              <Input
                id="fThreeLetterOfTownOfBirth"
                value={formData.fThreeLetterOfTownOfBirth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fThreeLetterOfTownOfBirth: e.target.value,
                  })
                }
                maxLength={3}
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

        </div>



          <hr style={{ border: "1px solid #e0e0e0" }} />

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Contact Information
            </h2>
          </div>

          <div className="space-y-4 border rounded-md p-4">



          <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="phoneNumberBusiness">Phone Number-Business</Label>
              <Input
                id="phoneNumberBusiness"
                value={formData.phoneNumberBusiness}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumberBusiness: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailBusiness">Email Address-Business</Label>
              <Input
                id="emailBusiness"
                value={formData.emailBusiness}
                onChange={(e) =>
                  setFormData({ ...formData, emailBusiness: e.target.value })
                }
                className="border-gray-300 shadow-md shadow-black"
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
                className="border-gray-300 shadow-md shadow-black"
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
                className="border-gray-300 shadow-md shadow-black"
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
                className="border-gray-300 shadow-md shadow-black"
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
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
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
              <Label htmlFor="typeOfProduct">Type of product you are or willing to sell</Label>
              <Input
                id="typeOfProduct"
                value={formData.typeOfProduct}
                onChange={(e) =>
                  setFormData({ ...formData, typeOfProduct: e.target.value })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="typeOfBusiness">Type of Business</Label>
              <Select
                value={formData.typeOfBusiness}
                onValueChange={(value) =>
                  setFormData({ ...formData, typeOfBusiness: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                  <SelectValue placeholder="Select type of business" />
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
                  <SelectItem value="Non-Profit">
                    Non-Profit
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
                className="border-gray-300 shadow-md shadow-black"
                required
              />
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
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

           

            <div className="space-y-2">
              <Label htmlFor="businessWebsite">Business Website</Label>
              <Input
                id="businessWebsite"
                value={formData.businessWebsite}
                onChange={(e) =>
                  setFormData({ ...formData, businessWebsite: e.target.value })
                }
                className="border-gray-300 shadow-md shadow-black"
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
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full hover:scale-105 transition-all duration-300 hover:shadow-md shadow-black cursor-pointer" disabled={loading}>
            {loading ? "Submitting..." : "Start UK LTD Formation"}
          </Button>
        </form>

        {/* <Button onClick={() => submitForm()}>submitForm</Button> */}
      </CardContent>
    </Card>
  );
}
