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




export function TaxBudgetingServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    
   budgetingRequiredFor: "",
    
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
          service_name: "Tax Budgeting Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:336


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
            Start Your Tax Budgeting Services
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your Tax Budgeting Services process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">
              
              
         

            <div className="space-y-2">
              <Label htmlFor="budgetingRequiredFor">Budgeting required for ?</Label>
                <Select
                  value={formData.budgetingRequiredFor}
                   onValueChange={(value) =>
                   setFormData({ ...formData, budgetingRequiredFor: value })
                 }
                 required
                >
               <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corporationTax">Corporation Tax</SelectItem>
                 <SelectItem value="incomeTax">Income Tax</SelectItem>
                 <SelectItem value="both">Both</SelectItem>
              </SelectContent>
              </Select>
          </div>


             

      

              
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Start Tax Budgeting Services"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
