
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




export function SettingUpNewBooksForm() {

  


  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
   
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

      // Create email template with form data
      const emailSubject = encodeURIComponent("Setting Up New Books in QBO, Xero, or Any ERP - Service Request");
      const emailBody = encodeURIComponent(`
Dear Faaz Financial Group,

I am interested in your Setting Up New Books in QBO, Xero, or Any ERP. Please find my details below:

Business Information:
• Business Name: ${formData.businessName || 'Not provided'}
• Business Activity/Nature: ${formData.businessActivityNature || 'Not provided'}
• Accounting Software Used: ${formData.accountingSoftware || 'Not provided'}

Financial Information:
• Monthly Volume of Transactions: ${formData.monthlyVolume || 'Not provided'}
• Annual Sales Volume: ${formData.annualSalesVolume || 'Not provided'}

Contact Information:
• Contact Number: ${formData.contactNumber || 'Not provided'}
• Email Address: ${formData.emailAddress || 'Not provided'}

Please contact me to discuss the next steps for setting up bookkeeping services for my business.

Thank you for your time and consideration.

Best regards,
${user?.email || 'User'}
      `);

      // Redirect to Gmail with prefilled email
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@faazfinancialgroup.com&su=${emailSubject}&body=${emailBody}`;
      
      // Open Gmail in a new tab
      window.open(gmailUrl, '_blank');

      // Also save to database for record keeping
      const submissionData = {
        ...formData,
        payment_status: "pending",
        payment_id: "",
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const { error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "Setting Up New Books in QBO, Xero, or Any ERP",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: 0,
          payment_id: "",
        },
      ]);

      console.log("form_submissions inserted successfully");

      // Show success message
      alert("Gmail has been opened with your service request. Please send the email to complete your submission.");
      
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
          Start Your Setting Up New Books in QBO, Xero, or Any ERP
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to begin your Setting Up New Books in QBO, Xero, or Any ERP process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Name of the business</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>

        

           

            <div className="space-y-2">
              <Label htmlFor="accountingSoftware">Which accounting software do you use?</Label>
              <Input
                type="text"
                id="accountingSoftware"
                value={formData.accountingSoftware}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accountingSoftware: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="businessActivityNature">
                Business activity/nature
              </Label>
              <Input
                type="text"
                id="businessActivityNature"
                value={formData.businessActivityNature}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessActivityNature: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="monthlyVolume">Monthly volume of transactions</Label>
              <Input
                type="text"
                id="monthlyVolume"
                value={formData.monthlyVolume}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    monthlyVolume: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="annualSalesVolume">Annual sales volume</Label>
              <Input
                type="text"
                id="annualSalesVolume"
                value={formData.annualSalesVolume}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    annualSalesVolume: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>

           

            <div className="space-y-2">
              <Label htmlFor="contactNumber">US contact number</Label>
              <Input
                type="text"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactNumber: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email address</Label>
              <Input
                type="text"
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

          

          
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Get Quotation For Setting Up New Books in QBO, Xero, or Any ERP"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
