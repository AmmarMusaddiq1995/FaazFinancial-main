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
import { toast } from "react-toastify";
import {
  FormWizard,
  OptionToggle,
  PackageCards,
  PackageDetailsTooltip,
  PriceSummary,
  PricingBadge,
  US_STATES,
  inputStyles,
} from "@/components/submission-forms/form-wizard";
import {
  Building2,
  Users,
  MapPin,
  Settings2,
  Globe,
  Plus,
  Trash2,
  Clock,
  Zap,
} from "lucide-react";

const priceTableForCCorp = {
  Wyoming: { normal:450, express: 520},
  Texas: { normal: 635, express: 705},
  Washington: { normal: 500, express: 570},
  California: { normal: 415, express: 485},
  Colorado: { normal: 380, express: 450},
  Florida: { normal: 430, express: 500},
  Georgia: { normal: 430, express: 500},
  New_York:{ normal: 550, express: 620},
  Alabama: { normal: 550, express: 620},
  Alaska: { normal: 600, express: 670},
  New_Hampshire: { normal: 450, express: 520},
  Hawaii: { normal: 400, express: 470},
  West_Virginia: { normal: 450, express: 520},
  Virginia: { normal: 400, express: 470},
  Arizona: { normal: 400, express: 470},
  Arkansas: { normal: 400, express: 470},
  New_Jersey: { normal: 480, express: 550},
  New_Mexico: { normal: 380, express: 450},
  Connecticut: { normal: 465, express: 535},
  Delaware: { normal: 550, express: 620},
  Vermont: { normal: 415, express: 485},
  Idaho: { normal: 435, express: 505},
  Illinois: { normal: 500, express: 570},
  Indiana: { normal: 450, express: 520},
  Iowa: { normal: 400, express: 470},
  Kansas: { normal: 500, express: 570},
  Kentucky: { normal: 380, express: 450},
  Louisiana: { normal: 450, express: 520},
  Maine: { normal: 525, express: 595},
  Maryland: { normal: 450, express: 520},
  Massachusetts: { normal: 850, express: 920},
  Michigan: { normal: 400, express: 470},
  Minnesota: { normal: 500, express: 570},
  Mississippi: { normal: 400, express: 470},
  Missouri: { normal: 400, express: 470},
  Montana: { normal: 380, express: 450},
  Nebraska: { normal: 450, express: 520},
  Nevada: { normal: 550, express: 620},
  North_Carolina:{ normal: 480, express: 550},
  North_Dakota:{ normal: 465, express: 535},
  Ohio: { normal: 430, express: 500},
  Oklahoma: { normal: 450, express: 520},
  Oregon: { normal: 435, express: 505},
  Pennsylvania: { normal: 480, express: 550},
  Rhode_Island: { normal: 500, express: 570},
  South_Carolina: { normal: 450, express: 520},
  South_Dakota: { normal: 500, express: 570},
  Tennessee: { normal: 650, express: 720},
  Utah: { normal: 500, express: 570},
  Wisconsin: { normal: 480, express: 550},


}

const PACKAGE_FEATURES = {
  normal: [
    "Delivery in 14 business days",
    "Unlimited name searches",
    "1 year of registered agent service",
    "Filing of articles of Organization/Formation/Incorporation",
    "Bylaws/Other company's documents",
    "EIN",
    "BOI filing",
    "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
    "Support services",
  ],
  express: [
    "Delivery in 7 business days",
    "Unlimited name searches",
    "1 year of registered agent service",
    "Filing of articles of Organization/Formation/Incorporation",
    "Bylaws/Other company's documents",
    "EIN",
    "BOI filing",
    "Bank account (Mercury/RelayFinance, Wise, Payoneer, Airwallex anyone of them)",
    "Support services",
  ],
};

const PACKAGE_EXCLUDED = [
  "US Mobile Number",
  "Website/Domains",
];

export function CorporationFormationForm({ pricingData }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    desiredCompanyName: "",
    alternativeCompanyName: "",
    businessName: "",
    businessType: "",
    state: pricingData?.state || "",
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
    doYouWantRegisteredAgent: "",
    doYouNeedUniqueBusinessAddress: "",
    doYouWantToUseYourOwnAddress: "",
    doYouWantAnonymousLLCOrOnMemberName: "",
    description: "",
    businessType: "",
    businessWebsite: "",
    businessEmail: "",
    packageType: pricingData?.packageType || "",
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
  const [price, setPrice] = useState(pricingData?.price ? parseInt(pricingData.price) : 0);

  useEffect(()=>{
    let basePrice = 0;

    // If pricing data is provided from URL, use it directly
    if (pricingData?.price) {
      basePrice = parseInt(pricingData.price);
    } else if(formData.state && formData.packageType){
      // Fallback to calculating price from form data
      const statePrice = priceTableForCCorp[formData.state] || priceTableForCCorp.Default;
      basePrice = statePrice[formData.packageType];
    }

    // Add $65 if user wants unique business address
    const additionalAmount = formData.doYouNeedUniqueBusinessAddress === "Yes" ? 65 : 0;
    setPrice(basePrice + additionalAmount);
  }, [formData.state, formData.packageType, formData.doYouNeedUniqueBusinessAddress, pricingData]);

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
        toast.error("Please login to submit business formation", userError);
        return;
      }

      const submissionData = {
        ...formData,
        members,
        price,
        payment_status: "pending",
        payment_id: "",
        pricingData: pricingData, // Include the original pricing data
      };

      console.log(
        "submissionData inserting into form_submissions",
        submissionData
      );

      const {data: insertedForm ,  error } = await supabase.from("form_submissions").insert([
        {
          user_id: userPersonalId,
          service_name: "C-Corporation Formation",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: price,
          payment_id: "",
        },
      ]).select().single();

      if(error) {
        console.error("Error inserting form_submissions:", error);
      } else {
        console.log("form_submissions inserted successfully");
        console.log("insertedForm id:", insertedForm.id);
        router.push(`/form-submission-success`);
      }


    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Company",
      subtitle: "Name & package",
      icon: Building2,
      heading: "Company details",
      intro: "Tell us what you'd like to call your corporation and where to form it.",
      validate: () => {
        if (!formData.state) return "Please select your state of formation.";
        if (!formData.packageType) return "Please choose a package to continue.";
        return "";
      },
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="desiredCompanyName">Desired Company Name</Label>
              <Input
                id="desiredCompanyName"
                placeholder="e.g. Horizon Ventures Inc."
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
            <Label htmlFor="state">State of Formation</Label>
            <Select
              value={formData.state}
              disabled={!!pricingData?.state}
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
              locked={!!pricingData?.packageType}
              onChange={(value) =>
                setFormData({ ...formData, packageType: value })
              }
              options={[
                {
                  value: "normal",
                  label: "Normal",
                  delivery: "14 business days",
                  icon: Clock,
                  price: formData.state
                    ? priceTableForCCorp[formData.state]?.normal ?? null
                    : null,
                  priceFallback: "Select a state",
                  tooltip: (
                    <PackageDetailsTooltip
                      label="Normal"
                      features={PACKAGE_FEATURES.normal}
                      excluded={PACKAGE_EXCLUDED}
                      price={
                        formData.state
                          ? priceTableForCCorp[formData.state]?.normal ?? "—"
                          : null
                      }
                    />
                  ),
                },
                {
                  value: "express",
                  label: "Express",
                  delivery: "7 business days",
                  icon: Zap,
                  badge: "Fastest",
                  price: formData.state
                    ? priceTableForCCorp[formData.state]?.express ?? null
                    : null,
                  priceFallback: "Select a state",
                  tooltip: (
                    <PackageDetailsTooltip
                      label="Express"
                      features={PACKAGE_FEATURES.express}
                      excluded={PACKAGE_EXCLUDED}
                      price={
                        formData.state
                          ? priceTableForCCorp[formData.state]?.express ?? "—"
                          : null
                      }
                    />
                  ),
                },
              ]}
            />
          </div>
        </>
      ),
    },
    {
      title: "Members",
      subtitle: "Ownership details",
      icon: Users,
      heading: "Members Information",
      intro: "Add every member of the corporation and their ownership share.",
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

              <div className="grid gap-4 md:grid-cols-3">
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
                    className={inputStyles}
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
                    className={inputStyles}
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
                    className={inputStyles}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
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
                    className={inputStyles}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`ownershipPercentage-${index}`}>
                    Ownership %
                  </Label>
                  <Input
                    id={`ownershipPercentage-${index}`}
                    placeholder="e.g. 50"
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
                    className={inputStyles}
                    required
                  />
                </div>
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
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  residentialAddress: "",
                  ownershipPercentage: "",
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
      title: "Contact",
      subtitle: "Address & reach",
      icon: MapPin,
      heading: "Contact Information",
      intro: "How can we reach you during the formation process?",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number-USA Only</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: e.target.value,
                  })
                }
                className={inputStyles}
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

          <div className="grid gap-4 md:grid-cols-2">
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
      title: "Preferences",
      subtitle: "Formation options",
      icon: Settings2,
      heading: "Additional Information",
      intro: "A few choices about how your corporation is set up.",
      validate: () => {
        if (!formData.doYouWantRegisteredAgent)
          return "Please tell us if you want a registered agent.";
        if (!formData.doYouNeedUniqueBusinessAddress)
          return "Please tell us if you need a unique business address.";
        if (!formData.doYouWantToUseYourOwnAddress)
          return "Please tell us if you want to use your own address.";
        if (!formData.doYouWantAnonymousCorporationOrOnMemberName)
          return "Please choose Anonymous LLC or On Member Name.";
        return "";
      },
      content: (
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>Do you want to use a registered agent?</Label>
            <OptionToggle
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
              value={formData.doYouWantRegisteredAgent}
              onChange={(value) =>
                setFormData({ ...formData, doYouWantRegisteredAgent: value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              Do you need Unique business address?
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                (additional cost 65$ yearly)
              </span>
            </Label>
            <OptionToggle
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
              value={formData.doYouNeedUniqueBusinessAddress}
              onChange={(value) =>
                setFormData({ ...formData, doYouNeedUniqueBusinessAddress: value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Do you want to use your own address?</Label>
            <OptionToggle
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
              value={formData.doYouWantToUseYourOwnAddress}
              onChange={(value) =>
                setFormData({ ...formData, doYouWantToUseYourOwnAddress: value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Do you want Anonymous LLC or on Member Name?</Label>
            <OptionToggle
              options={[
                { value: "Anonymous_LLC", label: "Anonymous LLC" },
                { value: "On_Member_Name", label: "On Member Name" },
              ]}
              value={formData.doYouWantAnonymousCorporationOrOnMemberName}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  doYouWantAnonymousCorporationOrOnMemberName: value,
                })
              }
            />
          </div>
        </div>
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

          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Select
              value={formData.businessType}
              onValueChange={(value) =>
                setFormData({ ...formData, businessType: value })
              }
              required
            >
              <SelectTrigger className={inputStyles}>
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
            price={price}
            rows={[
              ...(pricingData?.price && pricingData.price !== "0"
                ? [
                    {
                      label: `Base Package (${pricingData.planName})`,
                      amount: pricingData.price,
                    },
                  ]
                : formData.state && formData.packageType
                ? [
                    {
                      label: `Base Package (${formData.packageType} - ${formData.state})`,
                      amount:
                        priceTableForCCorp[formData.state]?.[formData.packageType] || 0,
                    },
                  ]
                : []),
              ...(formData.doYouNeedUniqueBusinessAddress === "Yes"
                ? [{ label: "Unique Business Address", amount: 65 }]
                : []),
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <FormWizard
      title="Start Your C-Corporation Formation"
      description="5 quick steps — about 5 minutes"
      badge={<PricingBadge pricingData={pricingData} />}
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start C-Corporation Formation"
      price={price}
    />
  );
}
