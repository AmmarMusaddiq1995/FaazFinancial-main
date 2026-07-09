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
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import {
  FormWizard,
  PriceSummary,
  inputStyles,
  withTimeout,
} from "@/components/submission-forms/form-wizard";
import {
  Building2,
  Users,
  MapPin,
  Globe,
  KeyRound,
  Plus,
  Trash2,
} from "lucide-react";

const UK_LTD_PRICE = 240;

export function UKLTDFormationForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    desiredCompanyName: "",
    alternativeCompanyName: "",
    businessEntityType: "",
    firstName: "",
    lastName: "",
    phoneNumberBusiness: "",
    emailBusiness: "",
    faxNumber: "",
    country: "",
    addressLocal: "",
    city: "",
    state: "",
    zipCode: "",
    fThreeLetterOfMotherName: "",
    fThreeLetterOfFatherName: "",
    fThreeLetterOfTownOfBirth: "",
  });
  const [members, setMembers] = useState([
    {
     firstName: "",
     lastName: "",
     surName: "",
     title: "",
     ownershipPercentage: "",
     nationality: "",
     occupation: "",
     residentialAddress: "",
     serviceAddress: "",
     emailAddress: "",
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
      } = await withTimeout(supabase.auth.getUser());

      console.log("userPersonalId :", userPersonalId);
      console.log("user :", user);

      if (!user || userError) {
        alert("Please login to submit business formation", userError);
        return;
      }

      const submissionData = {
        ...formData,
        members,
        price: 240,
        payment_status: "pending",
        payment_id: "",
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const {data: insertedForm ,  error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "UK LTD Formation",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: 240,
          payment_id: "",
        },
      ]).select().single();

      if(error) {
        console.error("Error inserting form_submissions:", error);
        alert(`Failed to save form data: ${error.message}`);
      } else {
        console.log("form_submissions inserted successfully");
        console.log("insertedForm id:", insertedForm.id);
        router.push(`/form-submission-success`);
      }


    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const memberField = (index, key, value) =>
    setMembers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });

  const steps = [
    {
      title: "Company",
      subtitle: "Name & entity type",
      icon: Building2,
      heading: "Company details",
      intro: "Tell us what you'd like to call your UK LTD.",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="desiredCompanyName">Desired Company Name</Label>
              <Input
                id="desiredCompanyName"
                placeholder="e.g. Horizon Ventures LTD"
                value={formData.desiredCompanyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    desiredCompanyName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alternativeCompanyName">
                Alternative Company Name
              </Label>
              <Input
                id="alternativeCompanyName"
                placeholder="Backup name if the first is taken"
                value={formData.alternativeCompanyName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    alternativeCompanyName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessEntityType">Business Entity Type</Label>
            <Select
              value={formData.businessEntityType}
              onValueChange={(value) =>
                setFormData({ ...formData, businessEntityType: value })
              }
              required
            >
              <SelectTrigger className={inputStyles}>
                <SelectValue placeholder="Select business entity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LLC">
                  LLC
                </SelectItem>
                <SelectItem value="Sole Proprietorship">
                  Sole Proprietorship
                </SelectItem>
                <SelectItem value="Partnership">
                  Partnership
                </SelectItem>
                <SelectItem value="Non-Profit">
                  Non-Profit
                </SelectItem>
                <SelectItem value="Marketing Agency">
                  Marketing Agency
                </SelectItem>
                <SelectItem value="Shopify Store">
                  Shopify Store
                </SelectItem>
                <SelectItem value="Other">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      ),
    },
    {
      title: "Members",
      subtitle: "Management details",
      icon: Users,
      heading: "Management Information",
      intro: "Add every member and their details.",
      content: (
        <>
          {members.map((member, index) => (
            <div
              key={index}
              className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/60 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    Member {index + 1}
                  </span>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    aria-label={`Remove member ${index + 1}`}
                    onClick={() =>
                      setMembers((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`title-${index}`}>Title</Label>
                  <Input
                    id={`title-${index}`}
                    placeholder="e.g. Mr / Mrs / Dr"
                    value={member.title}
                    onChange={(e) => memberField(index, "title", e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`firstName-${index}`}>First Name</Label>
                  <Input
                    id={`firstName-${index}`}
                    value={member.firstName}
                    onChange={(e) => memberField(index, "firstName", e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`surName-${index}`}>Surname</Label>
                  <Input
                    id={`surName-${index}`}
                    value={member.surName}
                    onChange={(e) => memberField(index, "surName", e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                  <Input
                    id={`lastName-${index}`}
                    value={member.lastName}
                    onChange={(e) => memberField(index, "lastName", e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`ownershipPercentage-${index}`}>
                    Ownership Percentage
                  </Label>
                  <Input
                    id={`ownershipPercentage-${index}`}
                    placeholder="e.g. 50"
                    value={member.ownershipPercentage}
                    onChange={(e) =>
                      memberField(index, "ownershipPercentage", e.target.value)
                    }
                    className={inputStyles}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`nationality-${index}`}>Nationality</Label>
                  <Input
                    id={`nationality-${index}`}
                    value={member.nationality}
                    onChange={(e) => memberField(index, "nationality", e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`occupation-${index}`}>Occupation</Label>
                <Input
                  id={`occupation-${index}`}
                  value={member.occupation}
                  onChange={(e) => memberField(index, "occupation", e.target.value)}
                  className={inputStyles}
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
                    memberField(index, "residentialAddress", e.target.value)
                  }
                  className={inputStyles}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`serviceAddress-${index}`}>
                  Service/Correspondence Address (Public)
                </Label>
                <Input
                  id={`serviceAddress-${index}`}
                  value={member.serviceAddress}
                  onChange={(e) => memberField(index, "serviceAddress", e.target.value)}
                  className={inputStyles}
                  required
                  placeholder="If you want to keep your personal address hidden, you can purchase our service address for 39£ + VAT."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`emailAddress-${index}`}>Email Address</Label>
                <Input
                  id={`emailAddress-${index}`}
                  value={member.emailAddress}
                  onChange={(e) => memberField(index, "emailAddress", e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full border-dashed border-primary/40 text-primary hover:bg-primary/5 hover:text-primary"
            onClick={() =>
              setMembers((prev) => [
                ...prev,
                {
                 title: "",
                 firstName: "",
                 surName: "",
                 lastName: "",
                 ownershipPercentage: "",
                 nationality: "",
                 occupation: "",
                 residentialAddress: "",
                 serviceAddress: "",
                 emailAddress: "",
                },
              ])
            }
          >
            <Plus className="h-4 w-4 mr-1" /> Add A Member
          </Button>
        </>
      ),
    },
    {
      title: "Security",
      subtitle: "Identity questions",
      icon: KeyRound,
      heading: "Security Questions",
      intro: "Companies House requires these three identity checks.",
      content: (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="fThreeLetterOfMotherName">
              First 3 letters of mother's maiden name
            </Label>
            <Input
              id="fThreeLetterOfMotherName"
              value={formData.fThreeLetterOfMotherName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fThreeLetterOfMotherName: e.target.value,
                })
              }
              maxLength={3}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fThreeLetterOfFatherName">
              First 3 letters of father's first name
            </Label>
            <Input
              id="fThreeLetterOfFatherName"
              value={formData.fThreeLetterOfFatherName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fThreeLetterOfFatherName: e.target.value,
                })
              }
              maxLength={3}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fThreeLetterOfTownOfBirth">
              First 3 letters of town of birth
            </Label>
            <Input
              id="fThreeLetterOfTownOfBirth"
              value={formData.fThreeLetterOfTownOfBirth}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fThreeLetterOfTownOfBirth: e.target.value,
                })
              }
              maxLength={3}
              className={inputStyles}
              required
            />
          </div>
        </div>
      ),
    },
    {
      title: "Contact",
      subtitle: "Address & reach",
      icon: MapPin,
      heading: "Contact Information",
      intro: "How can we reach you during the formation process?",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lastName: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumberBusiness">Phone Number-Business</Label>
              <Input
                id="phoneNumberBusiness"
                type="tel"
                value={formData.phoneNumberBusiness}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumberBusiness: e.target.value,
                  })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emailBusiness">Email Address-Business</Label>
              <Input
                id="emailBusiness"
                value={formData.emailBusiness}
                onChange={(e) =>
                  setFormData({ ...formData, emailBusiness: e.target.value })
                }
                className={inputStyles}
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
                className={inputStyles}
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
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressLocal">Enter Local Address</Label>
            <Input
              id="addressLocal"
              value={formData.addressLocal}
              onChange={(e) =>
                setFormData({ ...formData, addressLocal: e.target.value })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                className={inputStyles}
                required
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Business",
      subtitle: "Review & submit",
      icon: Globe,
      heading: "Product Information & Business Website",
      intro: "Last step — tell us about your business, review the price, and submit.",
      content: (
        <>
          <div className="space-y-2">
            <Label htmlFor="typeOfProduct">
              Type of product you are or willing to sell
            </Label>
            <Input
              id="typeOfProduct"
              value={formData.typeOfProduct}
              onChange={(e) =>
                setFormData({ ...formData, typeOfProduct: e.target.value })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="typeOfBusiness">Type of Business</Label>
            <Select
              value={formData.typeOfBusiness}
              onValueChange={(value) =>
                setFormData({ ...formData, typeOfBusiness: value })
              }
              required
            >
              <SelectTrigger className={inputStyles}>
                <SelectValue placeholder="Select type of business" />
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
                <SelectItem value="MarketingAgency">
                  Marketing Agency
                </SelectItem>
                <SelectItem value="ShopifyStore">
                  Shopify Store
                </SelectItem>
                <SelectItem value="Other">
                  Other
                </SelectItem>
                <SelectItem value="Non-Profit">
                  Non-Profit
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Brief Description Of Business</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className={inputStyles}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessWebsite">Business Website</Label>
              <Input
                id="businessWebsite"
                value={formData.businessWebsite}
                onChange={(e) =>
                  setFormData({ ...formData, businessWebsite: e.target.value })
                }
                className={inputStyles}
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
                className={inputStyles}
                required
              />
            </div>
          </div>

          <PriceSummary
            price={UK_LTD_PRICE}
            rows={[{ label: "UK LTD Formation", amount: UK_LTD_PRICE }]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your UK LTD Formation"
      description="5 quick steps — about 5 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start UK LTD Formation"
      price={UK_LTD_PRICE}
    />
  );
}
