"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";

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

export function BusinessFormationForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    desiredCompanyName: "",
    alternativeCompanyName: "",
    businessName: "",
    businessType: "",
    state: "",
    address: "",
    ownerInfo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    residentialAddress: "",
    ownershipPercentage: "",
    phoneNumber: "",
    email: "",
    faxNumber: "",
    country: "",
    addressLocal: "",
    city: "",
    zipCode: "",
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    description: "",
    businessType: "",
    businessWebsite: "",
    businessEmail: "",
  });
  const [members, setMembers] = useState([
    {
      firstName: "",
      middleName: "",
      lastName: "",
      residentialAddress: "",
      ownershipPercentage: "",
    },
  ]);

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

      const submissionData = {
        ...formData,
        members,
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const { error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "LLC Formation",
          form_data: submissionData,
          status: "pending",
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
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-center">
          Start Your Business Formation
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to begin your business formation process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="desiredCompanyName">Desired Company Name</Label>
              <Input
                id="desiredCompanyName"
                value={formData.desiredCompanyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    desiredCompanyName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alternativeCompanyName">
                Alternative Company Name
              </Label>
              <Input
                id="alternativeCompanyName"
                value={formData.alternativeCompanyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    alternativeCompanyName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>
          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Members Information
            </h2>
          </div>

          {members.map((member, index) => (
            <div key={index} className="space-y-4 border rounded-md p-4">
              <div className="text-sm font-semibold">Member {index + 1}</div>

              <div className="space-y-2">
                <Label htmlFor={`firstName-${index}`}>First Name</Label>
                <Input
                  id={`firstName-${index}`}
                  value={member.firstName}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        firstName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`middleName-${index}`}>Middle Name</Label>
                <Input
                  id={`middleName-${index}`}
                  value={member.middleName}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        middleName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                <Input
                  id={`lastName-${index}`}
                  value={member.lastName}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        lastName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`residentialAddress-${index}`}>
                  Residential Address
                </Label>
                <Input
                  id={`residentialAddress-${index}`}
                  value={member.residentialAddress}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        residentialAddress: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`ownershipPercentage-${index}`}>
                  Ownership Percentage
                </Label>
                <Input
                  id={`ownershipPercentage-${index}`}
                  value={member.ownershipPercentage}
                  onChange={(e) =>
                    setMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        ownershipPercentage: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300"
                  required
                />
              </div>
            </div>
          ))}

          <div>
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setMembers((prev) => [
                  ...prev,
                  {
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    residentialAddress: "",
                    ownershipPercentage: "",
                  },
                ])
              }
            >
              Add A Member
            </Button>
          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Contact Information
            </h2>
          </div>

          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number-USA Only</Label>
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
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faxNumber">Fax Number</Label>
              <Input
                id="faxNumber"
                value={formData.faxNumber}
                onChange={(e) =>
                  setFormData({ ...formData, faxNumber: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLocal">Enter Local Address</Label>
              <Input
                id="addressLocal"
                value={formData.addressLocal}
                onChange={(e) =>
                  setFormData({ ...formData, addressLocal: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="border-gray-300"
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
                <SelectTrigger className="border-gray-300">
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
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>
          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Additional Information
            </h2>
          </div>

          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="q1">Do you want to use a registered agent?</Label>
              <Select
                value={formData.q1}
                onValueChange={(value) =>
                  setFormData({ ...formData, q1: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes"> Yes </SelectItem>
                  <SelectItem value="No"> No </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="q2">
                Do you need Unique business address?(additional cost 65$ yearly)
              </Label>
              <Select
                value={formData.q2}
                onValueChange={(value) =>
                  setFormData({ ...formData, q2: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes"> Yes </SelectItem>
                  <SelectItem value="No"> No </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="q3">Do you want to use your own address?</Label>
              <Select
                value={formData.q3}
                onValueChange={(value) =>
                  setFormData({ ...formData, q3: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes"> Yes </SelectItem>
                  <SelectItem value="No"> No </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="q4">
                Do you want Anonymous LLC or on Member Name?
              </Label>
              <Select
                value={formData.q4}
                onValueChange={(value) =>
                  setFormData({ ...formData, q4: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Anonymous_LLC"> Anonymous LLC </SelectItem>
                  <SelectItem value="On_Member_Name">
                    {" "}
                    On Member Name{" "}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-center">
              Product Information & Business Website
            </h2>
          </div>

          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="description">Brief Description Of Business</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessType: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OnlineBusiness">
                    Online Business
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
              <Label htmlFor="businessWebsite">Business Website</Label>
              <Input
                id="businessWebsite"
                value={formData.businessWebsite}
                onChange={(e) =>
                  setFormData({ ...formData, businessWebsite: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                value={formData.businessEmail}
                onChange={(e) =>
                  setFormData({ ...formData, businessEmail: e.target.value })
                }
                className="border-gray-300"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Start Business Formation"}
          </Button>
        </form>

        {/* <Button onClick={() => submitForm()}>submitForm</Button> */}
      </CardContent>
    </Card>
  );
}
