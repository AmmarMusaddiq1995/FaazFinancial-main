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
import { Calendar as CalendarIcon } from "lucide-react";
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
  





export function AddressChangeServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    existingBusinessAddress: "",
    newBusinessAddress: "",
    emailId: "",
    contactNumber: "",
    state: "",
    dateOfFormation: "",
    ownerName: "",
    ownerAddress: "",
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
          service_name: "Address Change Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:1


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
                Start Your Address Change Services
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your address change services process
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
                <Label htmlFor="existingBusinessAddress">Existing Business Address</Label>
                <Input
                  id="existingBusinessAddress"
                  value={formData.existingBusinessAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      existingBusinessAddress: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newBusinessAddress">New Business Address</Label>
                <Input
                  id="newBusinessAddress"
                  value={formData.newBusinessAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newBusinessAddress: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailId">Email ID</Label>
                <Input
                  id="emailId"
                  value={formData.emailId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emailId: e.target.value,
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
                <Label htmlFor="ownerName">Owner Full Name</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ownerName: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>


            <div className="space-y-2">
                <Label htmlFor="ownerAddress">Owner Full Address</Label>
                <Input
                  id="ownerAddress"
                  value={formData.ownerAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ownerAddress: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>

             
            </div>

            <Button type="submit" className="w-full hover:scale-105 transition-all duration-300 hover:shadow-md shadow-black cursor-pointer" disabled={loading}>
              {loading ? "Submitting..." : "Start Address Change Services"}
            </Button>
          </form>
        </CardContent>
      </Card>

    

      
    </>
  );
}

