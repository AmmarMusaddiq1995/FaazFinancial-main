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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";


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
      const selectedPrice = 60;
      setPrice(selectedPrice);
    } else if(formData.packageType === "express"){
      const selectedPrice = 80;
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

  return (
    <Card className="lg:max-w-2xl md:max-w-xl max-w-md mx-auto shadow-2xl shadow-black hover:shadow-2xl hover:shadow-primary transition-all duration-600 border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-center">
          Start Your Payroll Withholding Services
        </CardTitle>
        <CardDescription className="text-center">
          Fill out the form below to begin your Payroll Withholding services process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

        <div className="space-y-2">
              <h2 className="text-lg font-bold text-center">
                Employee Information
              </h2>
        </div>
        
          <div className="space-y-4 border rounded-md p-4">
          
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
                className="border-gray-300 shadow-md shadow-black"
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
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phoneNumber: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title (Within Company)</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeSsnItinVisaNumber">SSN/ITIN/VISA Number</Label>
              <Input
                id="employeeSsnItinVisaNumber"
                value={formData.employeeSsnItinVisaNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employeeSsnItinVisaNumber: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
              />
            </div>

            </div>

            <hr style={{ border: "1px solid #e0e0e0" }} />

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-center">
                Company Information
              </h2>
        </div>

        <div className="space-y-4 border rounded-md p-4">
          
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
              className="border-gray-300 shadow-md shadow-black"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fein">Federal Employer Identification Number (FEIN)</Label>
            <Input
              id="fein"
              value={formData.fein}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fein: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tradeOrDbaName">Trade or DBA Name</Label>
            <Input
              id="tradeOrDbaName"
              value={formData.tradeOrDbaName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tradeOrDbaName: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
              optional
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription">Business Description</Label>
            <Input
              id="businessDescription"
              value={formData.businessDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  businessDescription: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industryNaicsCode">Industry NAICS Code</Label>
            <Input
              id="industryNaicsCode"
              value={formData.industryNaicsCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  industryNaicsCode: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
              required
              placeholder="To find the NAICS code, visit https://www.census.gov/naics"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companySsnItinVisaNumber">SSN/ITIN/VISA Number</Label>
            <Input
              id="companySsnItinVisaNumber"
              value={formData.companySsnItinVisaNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  companySsnItinVisaNumber: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
              required
            />
          </div>

          <div className="space-y-2">
              <Label htmlFor="incorporationState">Incorporation State 
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs text-balance">This is the state where you originally incorporated your business. For many businesses, this is often Delaware.<br />
                       If you’re not sure, check your Articles of Incorporation. For sole proprietorships or partnerships, enter the state you primarily operate in.</p>  
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select
                value={formData.incorporationState}
                onValueChange={(value) =>
                  setFormData({ ...formData, incorporationState: value })
                }
                required
              >
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
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
                    className="justify-start text-left font-normal border-gray-300 shadow-md shadow-black"
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


            <div className="space-y-2">
            <Label htmlFor="primaryBusinessAddress"> 
              Primary Business Address
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-balance">Specify street address, city, state, and zip code.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="primaryBusinessAddress"
              value={formData.primaryBusinessAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  primaryBusinessAddress: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
              required
              placeholder="This is the main address where business operates."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mailingAddress"> 
              Mailing Address
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-balance">Specify street address, city, state, and zip code.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="mailingAddress"
              value={formData.mailingAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mailingAddress: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
              optional
              placeholder="If different from primary business address, document will be mailed by IRS"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountingRecordsLocation"> 
              Accounting Records Location
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-balance">Specify street address, city, state, and zip code.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="accountingRecordsLocation"
              value={formData.accountingRecordsLocation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  accountingRecordsLocation: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
              optional
              placeholder="If different from primary business address, enter the location here."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fiscalYearEndDate">In What Month Does Your Fiscal Year End?</Label>
            <Input
              id="fiscalYearEndDate"
              value={formData.fiscalYearEndDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fiscalYearEndDate: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
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
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
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
                optional
              >
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
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
                optional
              >
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="border-gray-300">
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="accrual">Accrual</SelectItem>     
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hasYour501c3ElectedToBeASUIReimburser">Has your 501(c)(3) elected to be a SUI reimburser?
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-balance">Instead of paying state unemployment insurance (SUI) taxes quarterly,<br />
                     some businesses (such as non-profits and government organizations)<br />
                      may be allowed to reimburse the state if one of their employees collects unemployment benefits.<br /><br />
                      <span className="font-semibold text-gray-700">(Fill out this section only if your business entity is a registered 501(c)(3) non-profit organization.)</span></p>
                  </TooltipContent>
                </Tooltip>
                </TooltipProvider>
              </Label>
              <Select
                value={formData.hasYour501c3ElectedToBeASUIReimburser}
                onValueChange={(value) =>
                  setFormData({ ...formData, hasYour501c3ElectedToBeASUIReimburser: value })
                }
                optional
              >
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent className="border-gray-300">
                  <SelectItem value="cash">We cannot reimburse the state - we pay SUI taxes quarterly</SelectItem>
                  <SelectItem value="accrual">We can reimburse the state if an employee collect SUI benefits -<br /> we don't have to pay SUI taxes quarterly</SelectItem>   
                </SelectContent>
              </Select>
            </div>

          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />

      <div className="space-y-2">
          <h2 className="text-lg font-bold text-center">
              State Info - Texas
         </h2>
      </div>

      <div className="space-y-4 border rounded-md p-4">


      <div className="space-y-2">
            <Label htmlFor="businessAddressForStateRegistration"> 
              Enter The Business Address For The State You Wish To Register
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs text-balance">Specify street address, city, county, state, and zip code.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input
              id="businessAddressForStateRegistration"
              value={formData.businessAddressForStateRegistration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  businessAddressForStateRegistration: e.target.value,
                })
              }
              className="border-gray-300 shadow-md shadow-black"
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
                optional
              >
                <SelectTrigger className="border-gray-300 shadow-md shadow-black">
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

            <div className="space-y-2">
              <Label htmlFor="firstDayEmployeesStartedWorkingInThisState">What Is The First Day Your Employees Started Working In This State?</Label>
              <Input
                id="firstDayEmployeesStartedWorkingInThisState"
                value={formData.firstDayEmployeesStartedWorkingInThisState}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstDayEmployeesStartedWorkingInThisState: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
                placeholder="Please enter the date in the format MM/DD/YYYY"
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="firstPayDateForEmployeesInThisState">What Is The First Pay Date For Your Employees In This State?
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs text-balance">This is the date that appears on the paycheck itself.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="firstPayDateForEmployeesInThisState"
                value={formData.firstPayDateForEmployeesInThisState}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstPayDateForEmployeesInThisState: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
                placeholder="Please enter the date in the format MM/DD/YYYY"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateToReach1500InCumulativeWages">On What Date Did You Or Do You Expect To Reach $1,500 In Cummulative Wages Paid To Employees In This State?</Label>
              <Input
                id="dateToReach1500InCumulativeWages"
                value={formData.dateToReach1500InCumulativeWages}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dateToReach1500InCumulativeWages: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
                placeholder="Please enter the date in the format MM/DD/YYYY"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstPayrollAmountInThisState">What Was The Amount Of Your First Payroll In This State?</Label>
              <Input
                id="firstPayrollAmountInThisState"
                value={formData.firstPayrollAmountInThisState}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    firstPayrollAmountInThisState: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
                placeholder="This can be an estimate, but please enter the amount."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfEmployeesInThisState">How Many Employees Do You Have In This State?</Label>
              <Input
                id="numberOfEmployeesInThisState"
                value={formData.numberOfEmployeesInThisState}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfEmployeesInThisState: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
                
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="isTheEmployeeBeingCompensatedAnOfficerOrHasOwnershipWithinTheCompany">Is The Employee Being Compensated An Officer Or Has Ownership Within The Company?</Label>
              <Input
                id="isTheEmployeeBeingCompensatedAnOfficerOrHasOwnershipWithinTheCompany"
                value={formData.isTheEmployeeBeingCompensatedAnOfficerOrHasOwnershipWithinTheCompany}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isTheEmployeeBeingCompensatedAnOfficerOrHasOwnershipWithinTheCompany: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
                
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="requestingHawaiiProvideNameAndSSN">If Requesting Hawaii, Please Include Your Employee's Name & SSN As It Is Required On The State Application</Label>
              <Input
                id="requestingHawaiiProvideNameAndSSN"
                value={formData.requestingHawaiiProvideNameAndSSN}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    requestingHawaiiProvideNameAndSSN: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
                
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="doYouHave4OrMoreEmployees">(For Non-Profits Only): Do You Have 4 Or More Employees?</Label>
              <Input
                id="doYouHave4OrMoreEmployees"
                value={formData.doYouHave4OrMoreEmployees}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    doYouHave4OrMoreEmployees: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                required
                
              />
            </div>


            <div className="space-y-2">
              <Label htmlFor="stateCorporateID">State Corporate ID?</Label>
              <Input
                id="stateCorporateID"
                value={formData.stateCorporateID}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stateCorporateID: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                optional
                placeholder="If you have a state corporate ID, please enter it here."           
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stateTaxIDNumber">State Tax ID Number?</Label>
              <Input
                id="stateTaxIDNumber"
                value={formData.stateTaxIDNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stateTaxIDNumber: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                optional
                placeholder="If you have a state tax ID number, please enter it here."           
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stateWithholdingTaxID">State Withholding Tax ID Number?</Label>
              <Input
                id="stateWithholdingTaxID"
                value={formData.stateWithholdingTaxID}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stateWithholdingTaxID: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                optional
                placeholder="If you have a state withholding tax ID number, please enter it here."           
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stateSellersPermit">State Sellers Permit?</Label>
              <Input
                id="stateSellersPermit"
                value={formData.stateSellersPermit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stateSellersPermit: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                optional
                placeholder="If you have a state sellers permit, please enter it here."           
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stateUnemploymentInsuranceTaxID">State Unemployment Insurance Tax ID Number?</Label>
              <Input
                id="stateUnemploymentInsuranceTaxID"
                value={formData.stateUnemploymentInsuranceTaxID}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stateUnemploymentInsuranceTaxID: e.target.value,
                  })
                }
                className="border-gray-300 shadow-md shadow-black"
                optional
                placeholder="If you have a state unemployment insurance tax ID number, please enter it here."           
              />
            </div>

      </div>


      <hr style={{ border: "1px solid #e0e0e0" }} />

<div className="space-y-2">
    <h2 className="text-lg font-bold text-center">
        Responsible Party 
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 ml-2" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs text-balance">The responsible party is the point of contact within the organization for tax purposes, who is held held accountable for the company’s good standing.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
   </h2>
</div>

<div className="space-y-4 border rounded-md p-4">
  <h3 className="text-md font-bold text-center">
    Option 1: <span className="text-sm font-normal">Fill Out This Section If You Have Individual Officers As Your Responsible Party.(Upto 3 Persons)</span>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Info className="w-4 h-4 ml-2" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs text-balance">An individual officer is an owner or employee inside the company (such as a CEO, president, or treasurer).</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  </h3>


{responsiblePartyMembers.map((member, index) => (
            <div key={index} className="space-y-4 border rounded-md p-4">
              <div className="text-sm font-semibold">Member {index + 1}</div>

              <div className="space-y-2">
                <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                <Input
                  id={`jobTitle-${index}`}
                  value={member.jobTitle}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        jobTitle: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`firstName-${index}`}>First Name</Label>
                <Input
                  id={`firstName-${index}`}
                  value={member.firstName}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        firstName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`middleName-${index}`}>Middle Name</Label>
                <Input
                  id={`middleName-${index}`}
                  value={member.middleName}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        middleName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                <Input
                  id={`lastName-${index}`}
                  value={member.lastName}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        lastName: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`suffix-${index}`}>Suffix</Label>
                <Input
                  id={`suffix-${index}`}
                  value={member.suffix}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        suffix: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  id={`email-${index}`}
                  value={member.email}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        email: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phoneNumber-${index}`}>Phone Number</Label>
                <Input
                  id={`phoneNumber-${index}`}
                  value={member.phoneNumber}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        phoneNumber: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`dob-${index}`}>Date of Birth</Label>
                <Input
                  id={`dob-${index}`}
                  value={member.dob}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        dob: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
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
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        ownershipPercentage: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`idType-${index}`}>
                  ID Type
                </Label>
                <Input
                  id={`idType-${index}`}
                  value={member.idType}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        idType: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
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
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        ssnItinVisaNumber: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
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
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        addressOfIndividualOfficer: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                  placeholder="Specify the street address, city, state, and zip code"
                />
              </div>


            </div>
          ))}

<div>
            <Button
              type="button"
              variant="secondary"
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
              Add A Responsible Party
            </Button>
          </div>

          </div>

          <div className="space-y-4 border rounded-md p-4">
  <h3 className="text-md font-bold text-center">
    Option 2: <span className="text-sm font-normal">Fill Out This Section If You Have Commercial Owners As Your Responsible Party.(Upto 3 Owners)</span>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Info className="w-4 h-4 ml-2" />
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs text-balance"> A commercial owner is another corporation or LLC that owns this company.</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  </h3>


{responsiblePartyMembers.map((owner, index) => (
            <div key={index} className="space-y-4 border rounded-md p-4">
              <div className="text-sm font-semibold">Owner {index + 1}</div>

              <div className="space-y-2">
                <Label htmlFor={`title-${index}`}>Title</Label>
                <Input
                  id={`title-${index}`}
                  value={owner.title}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        title: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`legalNameOfCommercialOwner-${index}`}>Legal Name Of Commercial Owner</Label>
                <Input
                  id={`legalNameOfCommercialOwner-${index}`}
                  value={owner.legalNameOfCommercialOwner}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        legalNameOfCommercialOwner: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`commercialOwnerFederalEin-${index}`}>Commercial Owner's Federal EIN</Label>
                <Input
                  id={`commercialOwnerFederalEin-${index}`}
                  value={owner.commercialOwnerFederalEin}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        commercialOwnerFederalEin: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

            

             

              <div className="space-y-2">
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  id={`email-${index}`}
                  value={owner.email}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        email: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`phoneNumber-${index}`}>Phone Number</Label>
                <Input
                  id={`phoneNumber-${index}`}
                  value={owner.phoneNumber}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        phoneNumber: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
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
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        ownershipPercentage: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`addressOfCommercialOwner-${index}`}>
                  Address of Commercial Owner
                </Label>
                <Input
                  id={`addressOfCommercialOwner-${index}`}
                  value={owner.addressOfCommercialOwner}
                  onChange={(e) =>
                    setResponsiblePartyMembers((prev) => {
                      const next = [...prev];
                      next[index] = {
                        ...next[index],
                        addressOfCommercialOwner: e.target.value,
                      };
                      return next;
                    })
                  }
                  className="border-gray-300 shadow-md shadow-black"
                  optional
                  placeholder="Specify the street address, city, state, and zip code"
                />
              </div>

            
            </div>
          ))}

<div>
            <Button
              type="button"
              variant="secondary"
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
              Add A Responsible Party
            </Button>
          </div>

          <hr style={{ border: "1px solid #e0e0e0" }} />
          <div className="space-y-4 border rounded-md p-4">
          <div className="space-y-2">
              <Label htmlFor="packageType">Select Package Type</Label>
                <Select
                  value={formData.packageType}
                   onValueChange={(value) =>
                   setFormData({ ...formData, packageType: value })
                 }
                 required
                >
               <SelectTrigger className="border-gray-300 shadow-md shadow-black">
                <SelectValue placeholder="Select package type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                 <SelectItem value="express">Express</SelectItem>
              </SelectContent>
              </Select>
          </div>
          </div>

          </div>

   

          
          

          <Button type="submit" className="w-full hover:scale-105 transition-all duration-300 hover:shadow-md shadow-black cursor-pointer" disabled={loading}>
            {loading ? "Submitting..." : "Start Payroll Withholding Services"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
