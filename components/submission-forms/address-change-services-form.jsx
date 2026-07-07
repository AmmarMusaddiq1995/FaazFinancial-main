"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2 } from "lucide-react";
import {
  DateField,
  FormWizard,
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

const ADDRESS_CHANGE_PRICE = 100;

export function AddressChangeServicesForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "",
    existingBusinessAddress: "",
    newBusinessAddress: "",
    emailId: "",
    contactNumber: "",
    state: "",
    dateOfFormation: "",
    ownerName: "",
    ownerAddress: "",
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
          service_name: "Address Change Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount:100


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
      title: "Details",
      subtitle: "Address change",
      icon: Building2,
      content: (
        <>
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
            <Label htmlFor="existingBusinessAddress">Existing Business Address</Label>
            <Input
              id="existingBusinessAddress"
              value={formData.existingBusinessAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  existingBusinessAddress: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newBusinessAddress">New Business Address</Label>
            <Input
              id="newBusinessAddress"
              value={formData.newBusinessAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newBusinessAddress: e.target.value,
                })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="emailId">Email ID</Label>
              <Input
                id="emailId"
                value={formData.emailId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emailId: e.target.value,
                  })
                }
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contactNumber: e.target.value,
                  })
                }
                className={inputStyles}
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
              <Label htmlFor="ownerName">Owner Full Name</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ownerName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerAddress">Owner Full Address</Label>
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
          </div>

          <PriceSummary
            price={ADDRESS_CHANGE_PRICE}
            rows={[{ label: "Address Change Services", amount: ADDRESS_CHANGE_PRICE }]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your Address Change Services"
      description="Fill out the form below to begin your address change services process"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Address Change Services"
      price={ADDRESS_CHANGE_PRICE}
    />
  );
}
