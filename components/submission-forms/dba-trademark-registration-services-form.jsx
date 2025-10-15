
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




export function DBATrademarkRegistrationServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessLegalName: "",
    proposedTradeName: "",
    businessFormationDate: "",
    ownerLegalName: "",
    dateOfBirth: "",
    businessAddress: "",
    ownerAddress: "",
    naicsCode: "",
    businessEntityType: "",
    primaryBusinessActivities: "",
    state: "",
    

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
          service_name: "DBA Trademark Registration Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:350


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
            Start Your DBA Trademark Registration Services
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your DBA trademark registration services process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">
              
              
              <div className="space-y-2">
                <Label htmlFor="businessLegalName">
                  Business Legal Name
                </Label>
                <Input
                  id="businessLegalName"
                  value={formData.businessLegalName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessLegalName: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="proposedTradeName">
                  Proposed Trade Name
                </Label>
                <Input
                  id="proposedTradeName"
                  value={formData.proposedTradeName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      proposedTradeName: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>



              <div className="space-y-2">
              <Label htmlFor="businessFormationDate">Business formation date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal border-gray-300"
                    id="businessFormationDate"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.businessFormationDate
                      ? new Date(formData.businessFormationDate).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.businessFormationDate
                        ? new Date(formData.businessFormationDate)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        businessFormationDate: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.businessFormationDate}
                required
                readOnly
              />
            </div>



            <div className="space-y-2">
                <Label htmlFor="ownerLegalName">
                  Owner Full Legal Name
                </Label>
                <Input
                  id="ownerLegalName"
                  value={formData.ownerLegalName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ownerLegalName: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>


              <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal border-gray-300"
                    id="dateOfBirth"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth
                      ? new Date(formData.dateOfBirth).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.dateOfBirth
                        ? new Date(formData.dateOfBirth)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        dateOfBirth: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.dateOfBirth}
                required
                readOnly
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
                  className="border-gray-300"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="ownerAddress">Owner Address</Label>
                <Input
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
                <Label htmlFor="naicsCode">NAICS Code</Label>
                <Input
                  id="naicsCode"
                  value={formData.naicsCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      naicsCode: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
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
                <Label htmlFor="primaryBusinessActivities">Primary Business Activities</Label>
                <Input
                  id="primaryBusinessActivities"
                  value={formData.primaryBusinessActivities}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      primaryBusinessActivities: e.target.value,
                    })
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

              

             
             

             


                
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Start DBA Trademark Registration Services"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
