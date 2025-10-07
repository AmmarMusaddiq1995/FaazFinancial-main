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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function EinServicesForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CompanyName: "",
    dateOfFormation: "",
    businessEntityType: "",
    OwnerFullLegalName: "",
    members: "",
    fiscalYearEndDate: "",
    anyUsEmployee: "",
    registrationDate: "",
    contactNumber: "",
    businessActivityNature: "",
    prevEin: "",
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
          service_name: "EIN Services",
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
          Start Your EIN Services
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to begin your EIN services process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4 border rounded-md p-4">
            <div className="space-y-2">
              <Label htmlFor="CompanyName">Company name</Label>
              <Input
                id="CompanyName"
                value={formData.CompanyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    CompanyName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateOfFormation">Date of formation</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal border-gray-300"
                    id="dateOfFormation"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfFormation
                      ? new Date(formData.dateOfFormation).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.dateOfFormation
                        ? new Date(formData.dateOfFormation)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        dateOfFormation: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.dateOfFormation}
                required
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessEntityType">Business entity type</Label>
              <Select
                value={formData.businessEntityType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessEntityType: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select business entity type" />
                </SelectTrigger>
                <SelectContent className="border-gray-300">
                  <SelectItem value="LLC">LLC</SelectItem>
                  <SelectItem value="C-Corp">C-Corp</SelectItem>
                  <SelectItem value="S-Corp">S-Corp</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="OwnerFullLegalName">Owner full legal name</Label>
              <Input
                type="text"
                id="OwnerFullLegalName"
                value={formData.OwnerFullLegalName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    OwnerFullLegalName: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="members">How many members/partners</Label>
              <Input
                type="text"
                id="members"
                value={formData.members}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    members: e.target.value,
                  })
                }
                className="border-gray-300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiscalYearEndDate">Fiscal year end date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className=" justify-start text-left font-normal border-gray-300"
                    id="fiscalYearEndDate"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.fiscalYearEndDate
                      ? new Date(
                          formData.fiscalYearEndDate
                        ).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.fiscalYearEndDate
                        ? new Date(formData.fiscalYearEndDate)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        fiscalYearEndDate: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.fiscalYearEndDate}
                required
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="anyUsEmployee">
                Do you have any US employees?
              </Label>
              <Select
                value={formData.anyUsEmployee}
                onValueChange={(value) =>
                  setFormData({ ...formData, anyUsEmployee: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationDate">
                Business registeration date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal border-gray-300"
                    id="registrationDate"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.registrationDate
                      ? new Date(formData.registrationDate).toLocaleDateString()
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.registrationDate
                        ? new Date(formData.registrationDate)
                        : undefined
                    }
                    onSelect={(date) =>
                      date &&
                      setFormData({
                        ...formData,
                        registrationDate: date.toISOString().split("T")[0],
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                value={formData.registrationDate}
                required
                readOnly
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
              <Label htmlFor="prevEin">
                Have you previously obtained the EIN if yes provide the number?
              </Label>
              <Input
                className="border-gray-300"
                type="text"
                id="prevEin"
                value={formData.prevEin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prevEin: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
