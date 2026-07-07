"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, FileText, Clock, Zap } from "lucide-react";
import {
  DateField,
  FormWizard,
  PackageCards,
  PriceSummary,
  inputStyles,
} from "@/components/submission-forms/form-wizard";

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

export function SalesAndUsetaxRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessLegalName: "",
    dateOfFormation: "",
    businessEntityType: "",
    ownerFullLegalName: "",
    dateOfBirth: "",
    businessActivityNature: "",
    ownerAddress: "",
    businessAddress: "",
    ssn: "",
    nicsCode: "",
    estimatedSalesValue: "",
    state: "",
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
      const selectedPrice = 75;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = 100;
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
          service_name: "Sales and Usetax Registration",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:price


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

  const steps = [
    {
      title: "Business",
      subtitle: "Company & owner",
      icon: Building2,
      heading: "Business & owner details",
      intro: "Tell us about the business registering for sales and use tax.",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessLegalName">Business Legal Name</Label>
              <Input
                id="businessLegalName"
                value={formData.businessLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessLegalName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfFormation">Date of formation</Label>
              <DateField
                id="dateOfFormation"
                value={formData.dateOfFormation}
                onChange={(value) =>
                  setFormData({ ...formData, dateOfFormation: value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Entity Type</Label>
              <Select
                value={formData.businessEntityType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessEntityType: value })
                }
              >
                <SelectTrigger className={inputStyles}>
                  <SelectValue placeholder="Select business entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LLC">
                    LLC
                  </SelectItem>
                  <SelectItem value="ECommerceBusiness">
                    E-Commerce Business
                  </SelectItem>
                  <SelectItem value="WholesaleBusiness">
                    Wholesale Business
                  </SelectItem>
                  <SelectItem value="RetailBusiness">
                    Retail Business
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerFullLegalName">
                Owner/Partner Full Legal Name
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
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of birth</Label>
              <DateField
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(value) =>
                  setFormData({ ...formData, dateOfBirth: value })
                }
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
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerAddress">Owner Address</Label>
            <Input
              id="ownerAddress"
              value={formData.ownerAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ownerAddress: e.target.value,
                })
              }
              className={inputStyles}
              required
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
              className={inputStyles}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="ssn">SSN/ITIN Number (if applicable)</Label>
              <Input
                id="ssn"
                value={formData.ssn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ssn: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nicsCode">NICS Code</Label>
              <Input
                id="nicsCode"
                value={formData.nicsCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nicsCode: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedSalesValue">Estimated Sales Value</Label>
              <Input
                id="estimatedSalesValue"
                value={formData.estimatedSalesValue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedSalesValue: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Registration",
      subtitle: "State & package",
      icon: FileText,
      heading: "State & package",
      intro: "Pick the state and processing speed, review the price, and submit.",
      validate: () => {
        if (!formData.state) return "Please select your state of formation.";
        if (!formData.packageType) return "Please choose a package to continue.";
        return "";
      },
      content: (
        <>
          <div className="space-y-2">
            <Label htmlFor="state">State of Formation</Label>
            <Select
              value={formData.state}
              onValueChange={(value) =>
                setFormData({ ...formData, state: value })
              }
              required
            >
              <SelectTrigger className={inputStyles}>
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
            <Label>Select Package Type</Label>
            <PackageCards
              value={formData.packageType}
              onChange={(value) =>
                setFormData({ ...formData, packageType: value })
              }
              options={[
                { value: "normal", label: "Normal", icon: Clock, price: 75 },
                { value: "express", label: "Express", icon: Zap, badge: "Fastest", price: 100 },
              ]}
            />
          </div>

          <PriceSummary
            price={price}
            rows={[
              {
                label: `Sales & Usetax Registration (${formData.packageType || ""})`,
                amount: price,
              },
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your Sales and Usetax Registration"
      description="2 quick steps — about 3 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Sales and Usetax Registration"
      price={price}
    />
  );
}
