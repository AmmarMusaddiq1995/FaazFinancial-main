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




export function InitialComplianceAfterFormationServiceForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    
    
    
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

  // const [price, setPrice] = useState(0);
  // useEffect(()=>{
  //   if(formData.packageType === "normal"){
  //     const selectedPrice = 25;
  //     setPrice(selectedPrice);
  //   } else if(formData.packageType === "express"){
  //     const selectedPrice = 35;
  //     setPrice(selectedPrice);
  //   }
  // }, [formData.packageType]);


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
          service_name: "Initial Compliance After Formation Service",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:47


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
            Start Your Initial Compliance After Formation Service
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your Initial Compliance After Formation Service process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">
              
              
         

           



              <div className="space-y-2">
                <Label htmlFor="emailAddress">Email address used regularly</Label>
                <Input
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
                <Label htmlFor="phoneNumber">Phone number used regularly</Label>
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
                <Label htmlFor="company authentication number">Company authentication number with company house</Label>
                <Input
                  id="companyAuthenticationNumber"
                  value={formData.companyAuthenticationNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyAuthenticationNumber: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>


    

        


          <div className="space-y-2">
                <Label htmlFor="companyName">Company name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyName: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="companyRegistrationNumber">Company registration number</Label>
                <Input
                  id="companyRegistrationNumber"
                  value={formData.companyRegistrationNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyRegistrationNumber: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="companyUTRNumber">Company UTR number</Label>
                <Input
                  id="companyUTRNumber"
                  value={formData.companyUTRNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyUTRNumber: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>
             

          </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Start Initial Compliance After Formation Service"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
