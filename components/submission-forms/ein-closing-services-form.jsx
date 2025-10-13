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
import { handleSubmit } from "react-hook-form";
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

export function EinClosingServicesForm() {

  


  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    BusinessLegalName: "",
    OwnerFullLegalName: "",
    AddressOfBusiness: "",
    AddressOfOwner: "",
    EmailAddress: "",
    ContactNumber: "",
    DateOfEINClosing: "",
    BusinessDissolutionDate: "",
    
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
        payment_status: "pending",
        price: 80 ,
        payment_id: "",
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const { error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "EIN Closing Services",
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
          Start Your EIN Closing Services
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to begin your EIN closing services process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="BusinessLegalName">Business Legal Name</Label>
              <Input
                id="BusinessLegalName"
                value={formData.BusinessLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    BusinessLegalName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="OwnerFullLegalName">Owner Full Legal Name</Label>
              <Input
                id="OwnerFullLegalName"
                value={formData.OwnerFullLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    OwnerFullLegalName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="AddressOfBusiness">Address of business</Label>
              <Input
                id="AddressOfBusiness"
                value={formData.AddressOfBusiness}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    AddressOfBusiness: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="AddressOfOwner">Address of owner</Label>
              <Input
                id="AddressOfOwner"
                value={formData.AddressOfOwner}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    AddressOfOwner: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="EmailAddress">Email address</Label>
              <Input
                id="EmailAddress"
                value={formData.EmailAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    EmailAddress: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="ContactNumber">Contact number</Label>
              <Input
                id="ContactNumber"
                value={formData.ContactNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ContactNumber: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


           

            

           

            <div className="space-y-2">
              <Label htmlFor="DateOfEINClosing">Date of EIN closing</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className=" justify-start text-left font-normal border-gray-300"
                    id="DateOfEINClosing"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.DateOfEINClosing
                      ? new Date(
                          formData.DateOfEINClosing
                        ).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.DateOfEINClosing
                        ? new Date(formData.DateOfEINClosing)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        DateOfEINClosing: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.DateOfEINClosing}
                required
                readOnly
              />
            </div>

           

            <div className="space-y-2">
              <Label htmlFor="BusinessDissolutionDate">
                Business dissolution date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal border-gray-300"
                    id="BusinessDissolutionDate"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.BusinessDissolutionDate
                      ? new Date(formData.BusinessDissolutionDate).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.BusinessDissolutionDate
                        ? new Date(formData.BusinessDissolutionDate)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        BusinessDissolutionDate: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.BusinessDissolutionDate}
                required
                readOnly
              />
            </div>

          
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Start EIN Closing Services"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
