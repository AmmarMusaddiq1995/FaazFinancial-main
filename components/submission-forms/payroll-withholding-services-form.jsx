"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Calendar as CalendarIcon,
  Info,
  User,
  Building2,
  MapPin,
  UserCheck,
  Package,
  Plus,
  Clock,
  Zap,
} from "lucide-react";
import {
  FormWizard,
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

/* Small helper so labels keep their little info tooltips. */
function LabelInfo({ children }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function PayrollWithholdingServicesForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    packageType: "",

    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    title: "",
    employeeSsnItinVisaNumber: "",


    businessName: "",
    fein: "",
    tradeOrDbaName: "",
    businessDescription: "",
    industryNaicsCode: "",
    companySsnItinVisaNumber: "",
    incorporationState: "",
    dateOfFormation: "",
    primaryBusinessAddress: "",
    mailingAddress: "",
    accountingRecordsLocation: "",
    fiscalYearEndDate: "",
    businessEntityType: "",
    ifAnLLCHowAreYouTaxed: "",
    accountingMethod: "",
    hasYour501c3ElectedToBeASUIReimburser: "",


    businessAddressForStateRegistration: "",
    typeOfBuildingAtThisAddress: "",
    firstDayEmployeesStartedWorkingInThisState: "",
    firstPayDateForEmployeesInThisState: "",
    dateToReach1500InCumulativeWages: "",
    firstPayrollAmountInThisState: "",
    numberOfEmployeesInThisState: "",
    isTheEmployeeBeingCompensatedAnOfficerOrHasOwnershipWithinTheCompany: "",
    requestingHawaiiProvideNameAndSSN: "",
    doYouHave4OrMoreEmployees: "",
    stateCorporateID: "",
    stateTaxIDNumber: "",
    stateWithholdingTaxID: "",
    stateSellersPermit: "",
    stateUnemploymentInsuranceTaxID: "",

  });
  const [responsiblePartyMembers, setResponsiblePartyMembers] = useState([
    {
      jobTitle: "",
      firstName: "",
      middleName: "",
      lastName: "",
      suffix:"",
      email:"",
      phoneNumber:"",
      ownershipPercentage: "",
      dob:"",
      idType:"",
      ssnItinVisaNumber:"",
      addressOfIndividualOfficer:"",
      commercialOwnerFederalEin:"",
      title:"",
      legalNameOfCommercialOwner:"",
      addressOfCommercialOwner:"",
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


  const [price, setPrice] = useState(0);
  useEffect(()=>{
    if(formData.packageType === "normal"){
      const selectedPrice = 95;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = 130;
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
        price,
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
          service_name: "Payroll Withholding Services",
          form_data: submissionData,
          status: "pending",
          payment_status: "pending",
          amount: price,
          payment_id: "",
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

  const setField = (key) => (e) =>
    setFormData({ ...formData, [key]: e.target.value });

  const setPartyField = (index, key, value) =>
    setResponsiblePartyMembers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });

  const steps = [
    {
      title: "Employee",
      subtitle: "Who is being paid",
      icon: User,
      heading: "Employee Information",
      intro: "Details of the employee this service is for.",
      content: (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={setField("firstName")}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={setField("lastName")}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={setField("phoneNumber")}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={setField("email")}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title (Within Company)</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={setField("title")}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeSsnItinVisaNumber">SSN/ITIN/VISA Number</Label>
            <Input
              id="employeeSsnItinVisaNumber"
              value={formData.employeeSsnItinVisaNumber}
              onChange={setField("employeeSsnItinVisaNumber")}
              className={inputStyles}
              required
            />
          </div>
        </div>
      ),
    },
    {
      title: "Company",
      subtitle: "Business details",
      icon: Building2,
      heading: "Company Information",
      intro: "Tell us about the business running payroll.",
      content: (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={setField("businessName")}
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fein">Federal Employer Identification Number (FEIN)</Label>
              <Input
                id="fein"
                value={formData.fein}
                onChange={setField("fein")}
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tradeOrDbaName">Trade or DBA Name</Label>
              <Input
                id="tradeOrDbaName"
                value={formData.tradeOrDbaName}
                onChange={setField("tradeOrDbaName")}
                className={inputStyles}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessDescription">Business Description</Label>
              <Input
                id="businessDescription"
                value={formData.businessDescription}
                onChange={setField("businessDescription")}
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industryNaicsCode">Industry NAICS Code</Label>
              <Input
                id="industryNaicsCode"
                value={formData.industryNaicsCode}
                onChange={setField("industryNaicsCode")}
                className={inputStyles}
                required
                placeholder="To find the NAICS code, visit https://www.census.gov/naics"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companySsnItinVisaNumber">SSN/ITIN/VISA Number</Label>
              <Input
                id="companySsnItinVisaNumber"
                value={formData.companySsnItinVisaNumber}
                onChange={setField("companySsnItinVisaNumber")}
                className={inputStyles}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="incorporationState">Incorporation State
                <LabelInfo>
                  <p className="text-xs text-balance">This is the state where you originally incorporated your business. For many businesses, this is often Delaware.<br />
                   If you're not sure, check your Articles of Incorporation. For sole proprietorships or partnerships, enter the state you primarily operate in.</p>
                </LabelInfo>
              </Label>
              <Select
                value={formData.incorporationState}
                onValueChange={(value) =>
                  setFormData({ ...formData, incorporationState: value })
                }
                required
              >
                <SelectTrigger className={inputStyles}>
                  <SelectValue placeholder="Select incorporation state" />
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
              <Label htmlFor="dateOfFormation">Original Incorporation Or Formation Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${inputStyles} justify-start text-left font-normal`}
                    id="dateOfFormation"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
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
                        dateOfFormation: date.toLocaleDateString("en-CA"),
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryBusinessAddress">
              Primary Business Address
              <LabelInfo>
                <p className="text-xs text-balance">Specify street address, city, state, and zip code.</p>
              </LabelInfo>
            </Label>
            <Input
              id="primaryBusinessAddress"
              value={formData.primaryBusinessAddress}
              onChange={setField("primaryBusinessAddress")}
              className={inputStyles}
              required
              placeholder="This is the main address where business operates."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mailingAddress">
              Mailing Address
              <LabelInfo>
                <p className="text-xs text-balance">Specify street address, city, state, and zip code.</p>
              </LabelInfo>
            </Label>
            <Input
              id="mailingAddress"
              value={formData.mailingAddress}
              onChange={setField("mailingAddress")}
              className={inputStyles}
              placeholder="If different from primary business address, document will be mailed by IRS"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountingRecordsLocation">
              Accounting Records Location
              <LabelInfo>
                <p className="text-xs text-balance">Specify street address, city, state, and zip code.</p>
              </LabelInfo>
            </Label>
            <Input
              id="accountingRecordsLocation"
              value={formData.accountingRecordsLocation}
              onChange={setField("accountingRecordsLocation")}
              className={inputStyles}
              placeholder="If different from primary business address, enter the location here."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fiscalYearEndDate">In What Month Does Your Fiscal Year End?</Label>
              <Input
                id="fiscalYearEndDate"
                value={formData.fiscalYearEndDate}
                onChange={setField("fiscalYearEndDate")}
                className={inputStyles}
                required
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
                <SelectTrigger className={inputStyles}>
                  <SelectValue placeholder="Select business entity type" />
                </SelectTrigger>
                <SelectContent className="border-gray-300">
                  <SelectItem value="LLC">LLC</SelectItem>
                  <SelectItem value="C-Corp">C-Corp</SelectItem>
                  <SelectItem value="S-Corp">S-Corp</SelectItem>
                  <SelectItem value="Member-Managed-LLC">Member Managed LLC</SelectItem>
                  <SelectItem value="Manager-Managed-LLC">Manager Managed LLC</SelectItem>
                  <SelectItem value="General-Partnership">General Partnership</SelectItem>
                  <SelectItem value="Limited-Partnership">Limited Partnership</SelectItem>
                  <SelectItem value="Sole-Proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="Association">Association</SelectItem>
                  <SelectItem value="Non-Profit">Non-Profit</SelectItem>
                  <SelectItem value="TrusteeShip">TrusteeShip</SelectItem>
                  <SelectItem value="Joint-Venture">Joint Venture</SelectItem>
                  <SelectItem value="Co-Ownership">Co-Ownership</SelectItem>
                  <SelectItem value="Marketing-Agency">Marketing Agency</SelectItem>
                  <SelectItem value="Shopify-Store">Shopify Store</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifAnLLCHowAreYouTaxed">If An LLC, How Are You Taxed?</Label>
              <Select
                value={formData.ifAnLLCHowAreYouTaxed}
                onValueChange={(value) =>
                  setFormData({ ...formData, ifAnLLCHowAreYouTaxed: value })
                }
              >
                <SelectTrigger className={inputStyles}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="border-gray-300">
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="C-Corp">C-Corporation</SelectItem>
                  <SelectItem value="S-Corp">S-Corporation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountingMethod">What Is Your Accounting Method?</Label>
              <Select
                value={formData.accountingMethod}
                onValueChange={(value) =>
                  setFormData({ ...formData, accountingMethod: value })
                }
              >
                <SelectTrigger className={inputStyles}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="border-gray-300">
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="accrual">Accrual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hasYour501c3ElectedToBeASUIReimburser">Has your 501(c)(3) elected to be a SUI reimburser?
              <LabelInfo>
                <p className="text-xs text-balance">Instead of paying state unemployment insurance (SUI) taxes quarterly,<br />
                 some businesses (such as non-profits and government organizations)<br />
                  may be allowed to reimburse the state if one of their employees collects unemployment benefits.<br /><br />
                  <span className="font-semibold text-gray-700">(Fill out this section only if your business entity is a registered 501(c)(3) non-profit organization.)</span></p>
              </LabelInfo>
            </Label>
            <Select
              value={formData.hasYour501c3ElectedToBeASUIReimburser}
              onValueChange={(value) =>
                setFormData({ ...formData, hasYour501c3ElectedToBeASUIReimburser: value })
              }
            >
              <SelectTrigger className={inputStyles}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="border-gray-300">
                <SelectItem value="cash">We cannot reimburse the state - we pay SUI taxes quarterly</SelectItem>
                <SelectItem value="accrual">We can reimburse the state if an employee collect SUI benefits -<br /> we don't have to pay SUI taxes quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      ),
    },
    {
      title: "State Info",
      subtitle: "Texas registration",
      icon: MapPin,
      heading: "State Info - Texas",
      intro: "Details for the state you're registering in.",
      content: (
        <>
          <div className="space-y-2">
            <Label htmlFor="businessAddressForStateRegistration">
              Enter The Business Address For The State You Wish To Register
              <LabelInfo>
                <p className="text-xs text-balance">Specify street address, city, county, state, and zip code.</p>
              </LabelInfo>
            </Label>
            <Input
              id="businessAddressForStateRegistration"
              value={formData.businessAddressForStateRegistration}
              onChange={setField("businessAddressForStateRegistration")}
              className={inputStyles}
              required
              placeholder="If you are applying for an employee who works from home, please enter there home address.."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="typeOfBuildingAtThisAddress">Select The Type Of Building That Is At This Address.</Label>
            <Select
              value={formData.typeOfBuildingAtThisAddress}
              onValueChange={(value) =>
                setFormData({ ...formData, typeOfBuildingAtThisAddress: value })
              }
            >
              <SelectTrigger className={inputStyles}>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="border-gray-300">
                <SelectItem value="home-office">Home Office</SelectItem>
                <SelectItem value="business-office">Business Office</SelectItem>
                <SelectItem value="service-center">Service Center</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstDayEmployeesStartedWorkingInThisState">What Is The First Day Your Employees Started Working In This State?</Label>
              <Input
                id="firstDayEmployeesStartedWorkingInThisState"
                value={formData.firstDayEmployeesStartedWorkingInThisState}
                onChange={setField("firstDayEmployeesStartedWorkingInThisState")}
                className={inputStyles}
                required
                placeholder="Please enter the date in the format MM/DD/YYYY"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstPayDateForEmployeesInThisState">What Is The First Pay Date For Your Employees In This State?
                <LabelInfo>
                  <p className="text-xs text-balance">This is the date that appears on the paycheck itself.</p>
                </LabelInfo>
              </Label>
              <Input
                id="firstPayDateForEmployeesInThisState"
                value={formData.firstPayDateForEmployeesInThisState}
                onChange={setField("firstPayDateForEmployeesInThisState")}
                className={inputStyles}
                required
                placeholder="Please enter the date in the format MM/DD/YYYY"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateToReach1500InCumulativeWages">On What Date Did You Or Do You Expect To Reach $1,500 In Cummulative Wages Paid To Employees In This State?</Label>
            <Input
              id="dateToReach1500InCumulativeWages"
              value={formData.dateToReach1500InCumulativeWages}
              onChange={setField("dateToReach1500InCumulativeWages")}
              className={inputStyles}
              required
              placeholder="Please enter the date in the format MM/DD/YYYY"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstPayrollAmountInThisState">What Was The Amount Of Your First Payroll In This State?</Label>
              <Input
                id="firstPayrollAmountInThisState"
                value={formData.firstPayrollAmountInThisState}
                onChange={setField("firstPayrollAmountInThisState")}
                className={inputStyles}
                required
                placeholder="This can be an estimate, but please enter the amount."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfEmployeesInThisState">How Many Employees Do You Have In This State?</Label>
              <Input
                id="numberOfEmployeesInThisState"
                value={formData.numberOfEmployeesInThisState}
                onChange={setField("numberOfEmployeesInThisState")}
                className={inputStyles}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="isTheEmployeeBeingCompensatedAnOfficerOrHasOwnershipWithinTheCompany">Is The Employee Being Compensated An Officer Or Has Ownership Within The Company?</Label>
            <Input
              id="isTheEmployeeBeingCompensatedAnOfficerOrHasOwnershipWithinTheCompany"
              value={formData.isTheEmployeeBeingCompensatedAnOfficerOrHasOwnershipWithinTheCompany}
              onChange={setField("isTheEmployeeBeingCompensatedAnOfficerOrHasOwnershipWithinTheCompany")}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestingHawaiiProvideNameAndSSN">If Requesting Hawaii, Please Include Your Employee's Name & SSN As It Is Required On The State Application</Label>
            <Input
              id="requestingHawaiiProvideNameAndSSN"
              value={formData.requestingHawaiiProvideNameAndSSN}
              onChange={setField("requestingHawaiiProvideNameAndSSN")}
              className={inputStyles}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doYouHave4OrMoreEmployees">(For Non-Profits Only): Do You Have 4 Or More Employees?</Label>
            <Input
              id="doYouHave4OrMoreEmployees"
              value={formData.doYouHave4OrMoreEmployees}
              onChange={setField("doYouHave4OrMoreEmployees")}
              className={inputStyles}
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="stateCorporateID">State Corporate ID?</Label>
              <Input
                id="stateCorporateID"
                value={formData.stateCorporateID}
                onChange={setField("stateCorporateID")}
                className={inputStyles}
                placeholder="If you have a state corporate ID, please enter it here."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stateTaxIDNumber">State Tax ID Number?</Label>
              <Input
                id="stateTaxIDNumber"
                value={formData.stateTaxIDNumber}
                onChange={setField("stateTaxIDNumber")}
                className={inputStyles}
                placeholder="If you have a state tax ID number, please enter it here."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stateWithholdingTaxID">State Withholding Tax ID Number?</Label>
              <Input
                id="stateWithholdingTaxID"
                value={formData.stateWithholdingTaxID}
                onChange={setField("stateWithholdingTaxID")}
                className={inputStyles}
                placeholder="If you have a state withholding tax ID number, please enter it here."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stateSellersPermit">State Sellers Permit?</Label>
              <Input
                id="stateSellersPermit"
                value={formData.stateSellersPermit}
                onChange={setField("stateSellersPermit")}
                className={inputStyles}
                placeholder="If you have a state sellers permit, please enter it here."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stateUnemploymentInsuranceTaxID">State Unemployment Insurance Tax ID Number?</Label>
            <Input
              id="stateUnemploymentInsuranceTaxID"
              value={formData.stateUnemploymentInsuranceTaxID}
              onChange={setField("stateUnemploymentInsuranceTaxID")}
              className={inputStyles}
              placeholder="If you have a state unemployment insurance tax ID number, please enter it here."
            />
          </div>
        </>
      ),
    },
    {
      title: "Responsible",
      subtitle: "Responsible party",
      icon: UserCheck,
      heading: "Responsible Party",
      intro:
        "The responsible party is the point of contact within the organization for tax purposes, who is held accountable for the company's good standing.",
      content: (
        <>
          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
            <h3 className="text-md font-bold text-center">
              Option 1: <span className="text-sm font-normal">Fill Out This Section If You Have Individual Officers As Your Responsible Party.(Upto 3 Persons)</span>
              <LabelInfo>
                <p className="text-xs text-balance">An individual officer is an owner or employee inside the company (such as a CEO, president, or treasurer).</p>
              </LabelInfo>
            </h3>

            {responsiblePartyMembers.map((member, index) => (
              <div key={index} className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    Member {index + 1}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                    <Input
                      id={`jobTitle-${index}`}
                      value={member.jobTitle}
                      onChange={(e) => setPartyField(index, "jobTitle", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`firstName-${index}`}>First Name</Label>
                    <Input
                      id={`firstName-${index}`}
                      value={member.firstName}
                      onChange={(e) => setPartyField(index, "firstName", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`middleName-${index}`}>Middle Name</Label>
                    <Input
                      id={`middleName-${index}`}
                      value={member.middleName}
                      onChange={(e) => setPartyField(index, "middleName", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                    <Input
                      id={`lastName-${index}`}
                      value={member.lastName}
                      onChange={(e) => setPartyField(index, "lastName", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`suffix-${index}`}>Suffix</Label>
                    <Input
                      id={`suffix-${index}`}
                      value={member.suffix}
                      onChange={(e) => setPartyField(index, "suffix", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      value={member.email}
                      onChange={(e) => setPartyField(index, "email", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`phoneNumber-${index}`}>Phone Number</Label>
                    <Input
                      id={`phoneNumber-${index}`}
                      value={member.phoneNumber}
                      onChange={(e) => setPartyField(index, "phoneNumber", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`dob-${index}`}>Date of Birth</Label>
                    <Input
                      id={`dob-${index}`}
                      value={member.dob}
                      onChange={(e) => setPartyField(index, "dob", e.target.value)}
                      className={inputStyles}
                      placeholder="MM/DD/YYYY"
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
                        setPartyField(index, "ownershipPercentage", e.target.value)
                      }
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`idType-${index}`}>ID Type</Label>
                    <Input
                      id={`idType-${index}`}
                      value={member.idType}
                      onChange={(e) => setPartyField(index, "idType", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`ssnItinVisaNumber-${index}`}>
                      SSN/ITIN/Visa Number
                    </Label>
                    <Input
                      id={`ssnItinVisaNumber-${index}`}
                      value={member.ssnItinVisaNumber}
                      onChange={(e) =>
                        setPartyField(index, "ssnItinVisaNumber", e.target.value)
                      }
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`addressOfIndividualOfficer-${index}`}>
                      Address of Individual Officer
                    </Label>
                    <Input
                      id={`addressOfIndividualOfficer-${index}`}
                      value={member.addressOfIndividualOfficer}
                      onChange={(e) =>
                        setPartyField(index, "addressOfIndividualOfficer", e.target.value)
                      }
                      className={inputStyles}
                      placeholder="Specify the street address, city, state, and zip code"
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
                setResponsiblePartyMembers((prev) => [
                  ...prev,
                  {
                    jobTitle: "",
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    suffix:"",
                    email:"",
                    phoneNumber:"",
                    dob:"",
                    ownershipPercentage:"",
                    idType:"",
                    ssnItinVisaNumber:"",
                    addressOfIndividualOfficer:"",
                  },
                ])
              }
            >
              <Plus className="h-4 w-4 mr-1" /> Add A Responsible Party
            </Button>
          </div>

          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50/60 p-4">
            <h3 className="text-md font-bold text-center">
              Option 2: <span className="text-sm font-normal">Fill Out This Section If You Have Commercial Owners As Your Responsible Party.(Upto 3 Owners)</span>
              <LabelInfo>
                <p className="text-xs text-balance"> A commercial owner is another corporation or LLC that owns this company.</p>
              </LabelInfo>
            </h3>

            {responsiblePartyMembers.map((owner, index) => (
              <div key={index} className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    Owner {index + 1}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${index}`}>Title</Label>
                    <Input
                      id={`title-${index}`}
                      value={owner.title}
                      onChange={(e) => setPartyField(index, "title", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`legalNameOfCommercialOwner-${index}`}>Legal Name Of Commercial Owner</Label>
                    <Input
                      id={`legalNameOfCommercialOwner-${index}`}
                      value={owner.legalNameOfCommercialOwner}
                      onChange={(e) =>
                        setPartyField(index, "legalNameOfCommercialOwner", e.target.value)
                      }
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`commercialOwnerFederalEin-${index}`}>Commercial Owner's Federal EIN</Label>
                    <Input
                      id={`commercialOwnerFederalEin-${index}`}
                      value={owner.commercialOwnerFederalEin}
                      onChange={(e) =>
                        setPartyField(index, "commercialOwnerFederalEin", e.target.value)
                      }
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`email-${index}`}>Email</Label>
                    <Input
                      id={`email-${index}`}
                      value={owner.email}
                      onChange={(e) => setPartyField(index, "email", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`phoneNumber-${index}`}>Phone Number</Label>
                    <Input
                      id={`phoneNumber-${index}`}
                      value={owner.phoneNumber}
                      onChange={(e) => setPartyField(index, "phoneNumber", e.target.value)}
                      className={inputStyles}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`ownershipPercentage-${index}`}>
                      Ownership Percentage (%)
                    </Label>
                    <Input
                      id={`ownershipPercentage-${index}`}
                      value={owner.ownershipPercentage}
                      onChange={(e) =>
                        setPartyField(index, "ownershipPercentage", e.target.value)
                      }
                      className={inputStyles}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`addressOfCommercialOwner-${index}`}>
                    Address of Commercial Owner
                  </Label>
                  <Input
                    id={`addressOfCommercialOwner-${index}`}
                    value={owner.addressOfCommercialOwner}
                    onChange={(e) =>
                      setPartyField(index, "addressOfCommercialOwner", e.target.value)
                    }
                    className={inputStyles}
                    placeholder="Specify the street address, city, state, and zip code"
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full border-dashed border-primary/40 text-primary hover:bg-primary/5 hover:text-primary"
              onClick={() =>
                setResponsiblePartyMembers((prev) => [
                  ...prev,
                  {

                    commercialOwnerFederalEin:"",
                    title:"",
                    legalNameOfCommercialOwner:"",
                    email:"",
                    phoneNumber:"",
                    ownershipPercentage:"",
                    addressOfCommercialOwner:"",
                  },
                ])
              }
            >
              <Plus className="h-4 w-4 mr-1" /> Add A Responsible Party
            </Button>
          </div>
        </>
      ),
    },
    {
      title: "Package",
      subtitle: "Review & submit",
      icon: Package,
      heading: "Select Package Type",
      intro: "Choose your processing speed, review the price, and submit.",
      validate: () => {
        if (!formData.packageType) return "Please choose a package to continue.";
        return "";
      },
      content: (
        <>
          <PackageCards
            value={formData.packageType}
            onChange={(value) =>
              setFormData({ ...formData, packageType: value })
            }
            options={[
              { value: "normal", label: "Normal", icon: Clock, price: 95 },
              { value: "express", label: "Express", icon: Zap, badge: "Fastest", price: 130 },
            ]}
          />

          <PriceSummary
            price={price}
            rows={[
              {
                label: `Payroll Withholding (${formData.packageType || ""})`,
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
      title="Start Your Payroll Withholding Services"
      description="5 quick steps — about 5 minutes"
      steps={steps}
      onSubmit={handleSubmit}
      loading={loading}
      submitLabel="Start Payroll Withholding Services"
      price={price}
    />
  );
}
