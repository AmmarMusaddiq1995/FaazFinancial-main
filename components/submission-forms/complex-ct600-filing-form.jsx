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




export function ComplexCorpTaxReturnPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    
    governmentGatewayId: "",
    noGovernmentGatewayId: false,
    cannotProvideGovernmentGatewayId: false,
    corpTaxActivated: "",
    governmentPassword: "",
    averageNumberCompanyHas: "",
    statutoryAnnualAccountsFiled: "",
    
    companyName: "",
    companyRegistrationNumber: "",
    
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
          service_name: "Complex Corporation Tax Return(CT600)",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:161


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
            Start Your Complex Corporation Tax Return (CT600)
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your Complex Corporation Tax Return (CT600) process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">
              
              
         

            <div className="space-y-2">
              <Label htmlFor="corpTaxActivated">Corporation tax activated ?</Label>
                <Select
                  value={formData.corpTaxActivated}
                   onValueChange={(value) =>
                   setFormData({ ...formData, corpTaxActivated: value })
                 }
                 required
                >
               <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                 <SelectItem value="no">No</SelectItem>
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
                  className="border-gray-300"
                />
                <div className="flex items-center space-x-2">
                  <input
                    id="noGovernmentGatewayId"
                    type="checkbox"
                    checked={!!formData.noGovernmentGatewayId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        noGovernmentGatewayId: e.target.checked,
                      })
                    }
                  />
                  <Label htmlFor="noGovernmentGatewayId">I don't have one</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="cannotProvideGovernmentGatewayId"
                    type="checkbox"
                    checked={!!formData.cannotProvideGovernmentGatewayId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cannotProvideGovernmentGatewayId: e.target.checked,
                      })
                    }
                  />
                  <Label htmlFor="cannotProvideGovernmentGatewayId">I can't provide it</Label>
                </div>
              </div>




              <div className="space-y-2">
                <Label htmlFor="taxReliefToClaim">Which specific tax relief you want to claim ?</Label>
                <Input
                  id="taxReliefToClaim"
                  value={formData.taxReliefToClaim}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      taxReliefToClaim: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>



              <div className="space-y-2">
                <Label htmlFor="governmentPassword">Government password</Label>
                <Input
                  id="governmentPassword"
                  value={formData.governmentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      governmentPassword: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>


              <div className="space-y-2">
                <Label htmlFor="averageNumberCompanyHas">Average number your company has ?</Label>
                <Input
                  id="averageNumberCompanyHas"
                  value={formData.averageNumberCompanyHas}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      averageNumberCompanyHas: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>


              <div className="space-y-2">
              <Label htmlFor="statutoryAnnualAccountsFiled">Statutory/Full annual accounts filed ?</Label>
                <Select
                  value={formData.statutoryAnnualAccountsFiled}
                   onValueChange={(value) =>
                   setFormData({ ...formData, statutoryAnnualAccountsFiled: value })
                 }
                 required
                >
               <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                 <SelectItem value="no">No</SelectItem>
              </SelectContent>
              </Select>
          </div>

        


          <div className="space-y-2">
                <Label htmlFor="companyName">Company name ?</Label>
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
                <Label htmlFor="companyRegistrationNumber">Company registration number ?</Label>
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
             

             

      

              
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Start Complex Corporation Tax Return (CT600)"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
