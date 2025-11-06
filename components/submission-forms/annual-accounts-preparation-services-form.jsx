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




export function AnnualAccountsPreparationServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    packageType: "",
    doYouUseAnAccountingSoftware: "",

    
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
    if(formData.packageType === "simple"){
      const selectedPrice = 80.50;
      setPrice(selectedPrice);
    } else if(formData.packageType === "complex"){
      const selectedPrice = 188;
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
          service_name: "Annual Accounts Preparation Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:price,
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
    <>
      <Card className="lg:max-w-2xl md:max-w-xl max-w-md mx-auto shadow-2xl shadow-black hover:shadow-2xl hover:shadow-primary transition-all duration-600 border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Start Your Annual Accounts Preparation Services
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your Annual Accounts Preparation Services process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">



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
                <SelectValue placeholder="Select type of annual accounts preparation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">
                  <div className="flex items-center justify-between gap-3">
                    <span>Simple annual accounts preparation</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="complex">
                    <div className="flex items-center justify-between gap-3">
                      <span>Complex annual accounts preparation</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              </div>
              
         

            <div className="space-y-2">
              <Label htmlFor="doYouUseAnAccountingSoftware">Do you use an accounting software ?</Label>
                <Select
                  value={formData.doYouUseAnAccountingSoftware}
                   onValueChange={(value) =>
                   setFormData({ ...formData, doYouUseAnAccountingSoftware: value })
                 }
                 required
                >
               <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                 <SelectItem value="no">No</SelectItem>
              </SelectContent>
              </Select>
          </div>


             

      

              
            </div>

            <Button type="submit" className="w-full hover:scale-105 transition-all duration-300 hover:shadow-md shadow-black cursor-pointer" disabled={loading}>
              {loading ? "Submitting..." : "Start Annual Accounts Preparation Services"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
