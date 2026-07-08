"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, UserCheck, Clock, Zap } from "lucide-react";
import {
  DateField,
  FormWizard,
  OptionToggle,
  PackageCards,
  PriceSummary,
  inputStyles,
  withTimeout,
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
      } = await withTimeout(supabase.auth.getUser());

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

  const steps = [
    {
      title: "Business",
      subtitle: "Company details",
      icon: Building2,
      heading: "Business details",
      intro: "Tell us about the company that needs a registered agent.",
      validate: () => {
        if (!formData.state) return "Please select your state of formation.";
        return "";
      },
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    businessName: e.target.value,
                  })
                }
                className={inputStyles}
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
              <Label htmlFor="ownerFullLegalName">Owner Full Legal Name</Label>
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
                className={inputStyles}
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
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Agent",
      subtitle: "Review & submit",
      icon: UserCheck,
      heading: "Registered agent details",
      intro: "A few choices about your registered agent, then review and submit.",
      validate: () => {
        if (!formData.registeredAgentAddress)
          return "Please tell us if you want to use our registered agent address.";
        if (!formData.changingRegisteredAgent)
          return "Please tell us if you are changing your registered agent.";
        if (!formData.packageType) return "Please choose a package to continue.";
        return "";
      },
      content: (
        <>
          <div className="space-y-2">
            <Label>Do you want to use our registered agent address?</Label>
            <OptionToggle
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={formData.registeredAgentAddress}
              onChange={(value) =>
                setFormData({ ...formData, registeredAgentAddress: value })
              }
            />
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
              className={inputStyles}
              placeholder="Provide your business address"
            />
          </div>

          <div className="space-y-2">
            <Label>Are you changing your registered agent?</Label>
            <OptionToggle
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              value={formData.changingRegisteredAgent}
              onChange={(value) =>
                setFormData({ ...formData, changingRegisteredAgent: value })
              }
            />
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
              className={inputStyles}
              placeholder="Provide the name of the existing registered agent and its address"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Package Type</Label>
            <PackageCards
              value={formData.packageType}
              onChange={(value) =>
                setFormData({ ...formData, packageType: value })
              }
              options={[
                { value: "normal", label: "Normal", icon: Clock, price: 25 },
                { value: "express", label: "Express", icon: Zap, badge: "Fastest", price: 35 },
              ]}
            />
          </div>

          <PriceSummary
            price={price}
            rows={[
              {
                label: `Registered Agent Services (${formData.packageType || ""})`,
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
      title="Start Your Registered Agent Services"
      description="2 quick steps — about 3 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Registered Agent Services"
      price={price}
    />
  );
}
