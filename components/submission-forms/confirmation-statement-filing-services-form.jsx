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





export function ConfirmationStatementFilingServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    companyRegistrationNumber: "",
    companyHouseAuthenticationCode: "",
    cannotFindCompanyCode: false,
    registeredEmailAddress: "",
    noRegisteredEmailAddress: false,
    passwordOfCompanyWebfilingAccount: "",
    cannotProvidePassword: false,
    
    
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
          service_name: "Confirmation Statement Filing Service",
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
            Start Your Confirmation Statement Filing Service
          </CardTitle>
          <CardDescription className="text-center">
            Fill out the form below to begin your Confirmation Statement Filing Service process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 border rounded-md p-4">
              
              
         
            <div className="space-y-2">
                <Label htmlFor="registeredEmailAddress">Registered Email address with company house webfiling account</Label>
                <Input
                  id="registeredEmailAddress"
                  value={formData.registeredEmailAddress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registeredEmailAddress: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  optional
                />
                <div className="flex items-center space-x-2">
                  <input
                    id="noRegisteredEmailAddress"
                    type="checkbox"
                    checked={!!formData.noRegisteredEmailAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        noRegisteredEmailAddress: e.target.checked,
                      })
                    }
                    optional
                  />
                  <Label htmlFor="noRegisteredEmailAddress">I don't have one</Label>
                </div>
                
              </div>


              <div className="space-y-2">
                <Label htmlFor="passwordOfCompanyWebfilingAccount">Password of company webfiling account</Label>
                <Input
                  id="passwordOfCompanyWebfilingAccount"
                  value={formData.passwordOfCompanyWebfilingAccount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      passwordOfCompanyWebfilingAccount: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  optional
                />
                <div className="flex items-center space-x-2">
                  <input
                    id="cannotProvidePassword"
                    type="checkbox"
                    checked={!!formData.cannotProvidePassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cannotProvidePassword: e.target.checked,

                      })
                    }
                    optional
                  />
                  <Label htmlFor="cannotProvidePassword">I can't provide it</Label>
                </div>
                
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
                <Label htmlFor="companyHouseAuthenticationCode">Company house authentication code</Label>
                <Input
                  id="companyHouseAuthenticationCode"
                  value={formData.companyHouseAuthenticationCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      companyHouseAuthenticationCode: e.target.value,
                    })
                  }
                  className="border-gray-300"
                  optional
                />
                <div className="flex items-center space-x-2">
                  <input
                    id="cannotFindCompanyCode"
                    type="checkbox"
                    checked={!!formData.cannotFindCompanyCode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cannotFindCompanyCode: e.target.checked,
                      })
                    }
                    optional
                  />
                  <Label htmlFor="cannotFindCompanyCode">I can't find it</Label>
                </div>
                
              </div>

           
             

          </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Start Confirmation Statement Filing Service"}
            </Button>
          </form>
        </CardContent>
      </Card>

      
    </>
  );
}
