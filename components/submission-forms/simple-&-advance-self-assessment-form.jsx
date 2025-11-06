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




export function SimpleAndAdvanceSelfAssessmentForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    packageType: "",
    governmentGatewayId: "",
    governmentGatewayPassword: "",
    incomes: [],
    
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
    } else if(formData.packageType === "advance"){
      const selectedPrice = 147.50;
      setPrice(selectedPrice);
    }
  }, [formData.packageType]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.packageType) {
        alert("Please select a package type");
        setLoading(false);
        return;
      }

      if (!formData.governmentGatewayId || !formData.governmentGatewayPassword) {
        alert("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (!userPersonalId) {
        alert("User data is still loading. Please wait a moment and try again.");
        setLoading(false);
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("userPersonalId :", userPersonalId);
      console.log("user :", user);

      if (!user || userError) {
        alert("Please login to submit the form");
        setLoading(false);
        return;
      }

      const submissionData = {
        ...formData,
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const { data: insertedForm, error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "Simple and Advance Self Assessment",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: Math.round(price), 
          payment_id: "",
        },
      ]).select().single();

      if (error) {
        console.error("Error inserting form_submissions:", error);
        alert(`Failed to save form data: ${error.message}`);
        setLoading(false);
        return;
      }

      console.log("form_submissions inserted successfully");
      console.log("insertedForm id:", insertedForm?.id);

      router.push("/form-submission-success");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const toggleIncome = (income) => {
    setFormData((prev) => {
      const exists = prev.incomes.includes(income);
      return {
        ...prev,
        incomes: exists
          ? prev.incomes.filter((i) => i !== income)
          : [...prev.incomes, income],
      };
    });
  };

  return (
    <>
      <Card className="lg:max-w-2xl md:max-w-xl max-w-md mx-auto shadow-2xl shadow-black hover:shadow-2xl hover:shadow-primary transition-all duration-600 border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-center">
            Start Self Assessment Tax Return
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your Self Assessment Tax Return process
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
                <SelectValue placeholder="Select type of self assessment tax return" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">
                  <div className="flex items-center justify-between gap-3">
                    <span>Simple self assessment tax return</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="advance">
                    <div className="flex items-center justify-between gap-3">
                      <span>Advance self assessment tax return</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              </div>
              
         

              <div className="space-y-2">
                <Label htmlFor="governmentGatewayId">Government gateway ID</Label>
                <Input
                  id="governmentGatewayId"
                  value={formData.governmentGatewayId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      governmentGatewayId: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                />
               
              </div>


              <div className="space-y-2">
                <Label htmlFor="governmentGatewayPassword">Government gateway password</Label>
                <Input
                  id="governmentGatewayPassword"
                  value={formData.governmentGatewayPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      governmentGatewayPassword: e.target.value,
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label>Select the incomes you earn</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.incomes.includes("Employment income")}
                      onChange={() => toggleIncome("Employment income")}
                    />
                    <span>Employment income</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.incomes.includes("Trading income")}
                      onChange={() => toggleIncome("Trading income")}
                    />
                    <span>Trading income</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.incomes.includes("Interest income")}
                      onChange={() => toggleIncome("Interest income")}
                    />
                    <span>Interest income</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.incomes.includes("Pension income")}
                      onChange={() => toggleIncome("Pension income")}
                    />
                    <span>Pension income</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.incomes.includes("Property income")}
                      onChange={() => toggleIncome("Property income")}
                    />
                    <span>Property income</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.incomes.includes("Dividend income")}
                      onChange={() => toggleIncome("Dividend income")}
                    />
                    <span>Dividend income</span>
                  </label>
                </div>
              </div>


             

      

              
            </div>

            <Button type="submit" className="w-full hover:scale-105 transition-all duration-300 hover:shadow-md shadow-black cursor-pointer" disabled={loading}>
              {loading ? "Submitting..." : "Start Self Assessment Tax Return"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
