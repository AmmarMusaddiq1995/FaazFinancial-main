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




export function RegisteredAgentServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    state: "",
    dateOfFormation: "",
    ownerFullLegalName: "",
    anotherPartnerFullLegalName: "",
    provideBusinessAddress: "",
    registeredAgentAddress: "",
    businessAddress: "",
    changingRegisteredAgent: "",
    nameOfExistingRegisteredAgent: "",
    packageType: "",
    
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
          service_name: "Registered Agent Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:"50"


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
            Start Your Registered Agent Services
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your registered agent services process
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
                <Label htmlFor="anotherPartnerFullLegalName">
                  If Another Partner,Full Legal Name
                </Label>
                <Input
                  id="anotherPartnerFullLegalName"
                  value={formData.anotherPartnerFullLegalName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      anotherPartnerFullLegalName: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  
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
                  
                />
              </div>




              <div className="space-y-2">
              <Label htmlFor="registeredAgentAddress">Do you want to use our registered agent address?</Label>
              <Select
                value={formData.registeredAgentAddress}
                onValueChange={(value) =>
                  setFormData({ ...formData, registeredAgentAddress: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">
                    Yes
                  </SelectItem>
                  <SelectItem value="no">
                    No
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>


            <div className="space-y-2">
                <Label htmlFor="provideBusinessAddress">
                  If you want to provide a business address, please provide it
                </Label>
                <Input
                  id="provideBusinessAddress"
                  value={formData.provideBusinessAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      provideBusinessAddress: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                  placeholder="Provide your business address"
                />
              </div>


              <div className="space-y-2">
              <Label htmlFor="changingRegisteredAgent">Are you changing your registered agent?</Label>
              <Select
                value={formData.changingRegisteredAgent}
                onValueChange={(value) =>
                  setFormData({ ...formData, changingRegisteredAgent: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">
                    Yes
                  </SelectItem>
                  <SelectItem value="no">
                    No
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="nameOfExistingRegisteredAgent">
                  Please provide the name of the existing registered agent
                </Label>
                <Input
                  id="nameOfExistingRegisteredAgent"
                  value={formData.nameOfExistingRegisteredAgent}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nameOfExistingRegisteredAgent: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                  placeholder="Provide the name of the existing registered agent and its address"
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
               <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                 <SelectItem value="express">Express</SelectItem>
              </SelectContent>
              </Select>
          </div>
           
            </div>

            <Button type="submit" className="w-full hover:scale-105 transition-all duration-300 hover:shadow-md shadow-black cursor-pointer" disabled={loading}>
              {loading ? "Submitting..." : "Start Registered Agent Services"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
