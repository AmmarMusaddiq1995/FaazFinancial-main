"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Menu, X, Search, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import Image from "next/image";

// Helper component for menu items
const MenuItem = ({ href, children, truncate = false }) => (
  <li>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md px-2 py-1 block transition-all duration-200 ${
            truncate ? "truncate max-w-[180px]" : ""
          }`}
        >
          {children}
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{children}</p>
      </TooltipContent>
    </Tooltip>
  </li>
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get current session
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);

    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      const { data: user } = await supabase.auth.getUser();

      const { data: userRole } = await supabase
        .from("user_data") // your custom table
        .select("role")
        .eq("auth_user_id", user?.user?.id)
        .single();

      setUserRole(userRole);
    };

    getSession();

    // Listen for auth state changes like user login or logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      console.log("session at logout", session);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60

  return (
    <header className="sticky top-0 z-50 w-full h-20  bg-black ">
      <div className="container flex h-20 items-center justify-between px-4 gap-4">
        {/* Logo */}
        <Link href="/" className="flex space-x-2 min-w-0">
         
          <Image src="/logo-resized2.png" alt="Faaz Financial Group" width={100} height={20} />
         
        </Link>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8 min-w-0 whitespace-nowrap">
          {/* Products & Pricing Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("products")}
              className={`flex items-center space-x-1 text-foreground hover:text-orange-600 transition-colors whitespace-nowrap ${
                activeDropdown === "products"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : ""
              }`}
            >
              <span className="whitespace-nowrap text-white font-bold hover:bg-primary p-2 rounded-full hover:shadow-md shadow-white cursor-pointer transition-all duration-300">Services & Pricing</span>
              {activeDropdown === "products" ? (
                <ChevronUp className="h-4 w-4 text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white" />
              )}
            </button>

            {activeDropdown === "products" && (
              <div className="fixed z-50 top-20 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1100px] max-h-[80vh] bg-white border rounded-lg shadow-lg px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 overflow-y-auto">
                {/* Column 1: FORMATION SERVICES */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-700 mb-8 text-sm uppercase tracking-wide">
                    FORMATION SERVICES
                  </h3>
                  <ul className="space-y-1">
                    <MenuItem href="/services/llc-formation-2">
                      LLC Formation
                    </MenuItem>
                    <MenuItem href="/services/corporation-formation">
                      Corp. Formation
                    </MenuItem>
                    <MenuItem href="/start-business?serviceType=corp">
                      Compare Formation Plans
                    </MenuItem>
                    <MenuItem href="/services/dba-trademark-registration">
                      DBA/Trademark Registration
                    </MenuItem>
                  </ul>
                </div>

                {/* Column 2: COMPLIANCE SERVICES */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-700 mb-8 text-sm uppercase tracking-wide">
                    COMPLIANCE SERVICES
                  </h3>
                  <ul className="space-y-1">
                    <MenuItem href="/services/ein-services">
                      EIN Services
                    </MenuItem>
                    <MenuItem href="/services/boi-filing-services">
                      BOI Filing Services
                    </MenuItem>
                    <MenuItem href="/services/itin-services">
                      ITIN Services
                    </MenuItem>
                    <MenuItem href="/services/sales-and-usetax-registration">
                      Sales & Use Tax Registration
                    </MenuItem>
                    <MenuItem href="/services/annual-company-state-filing">
                      Annual Company State Filing
                    </MenuItem>
                    <MenuItem href="/services/ein-closing-services">
                      EIN Closing Services
                    </MenuItem>
                    <MenuItem href="/services/registered-agent">
                      Registered Agent Services
                    </MenuItem>
                    <MenuItem href="/services/company-dissolution">
                      Company Dissolution(State Fee Vary)
                    </MenuItem>
                    <MenuItem href="/services/company-revival">
                      Company Revival (State Fee vary)
                    </MenuItem>
                    <MenuItem href="/services/address-change-services">
                      Address Change Services
                    </MenuItem>
                    <MenuItem href="/services/filing-articles-of-amendments" truncate>
                      Filing Articles Of Amendments(State fee excluded)
                    </MenuItem>
                    <MenuItem href="/services/templates">
                      Payroll Related Services
                    </MenuItem>
                    <MenuItem href="/services/templates" truncate>
                      Payroll Withholding Account Registration (Some states may
                      have a small fee that is excluded)
                    </MenuItem>
                    <MenuItem href="/services/templates">
                      UI(Unemployment Insurance)
                    </MenuItem>
                    <MenuItem href="/services/templates" truncate>
                      Payroll Management (Gusto, Adp, QBO, Paychecks, Paycom,
                      Rippling) monthly
                    </MenuItem>
                    <MenuItem href="/services/templates" truncate>
                      Payroll Account Setup (Reach out for pricing)
                    </MenuItem>
                  </ul>
                </div>

                {/* Column 3: ACCOUNTING & BOOKKEEPING TAXES */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-700 mb-8 text-sm uppercase tracking-wide">
                    Bookkeeping & Taxes
                  </h3>
                  <ul className="space-y-1">
                    <MenuItem href="/services/pro-bookkeeping-services(small-business)" truncate>
                      SMB Bookkeeping
                    </MenuItem>
                    <MenuItem href="/services/pro-bookkeeping-services(medium-business)" truncate>
                      SME Bookkeeping
                    </MenuItem>
                    <MenuItem href="/services/pro-bookkeeping-services(large-business)" truncate>
                      Full Scale Bookkeeping
                    </MenuItem>
                    <MenuItem href="/services/full-year-reconciliation-services">
                      Full-Year Reconciliation Services
                    </MenuItem>
                    <MenuItem href="/services/setting-up-new-books-in-QBO" truncate>
                      Setting Up New Books In QBO/Xero Or Any ERP (charges
                      varies based on nature of work)
                    </MenuItem>
                    <MenuItem href="/services/tax-filing" truncate>
                      Financial Reporting - Reach Out For Pricing
                    </MenuItem>
                    <MenuItem href="/services/tax-filing" truncate>
                      Virtual CFO Services-Reach Out For Pricing
                    </MenuItem>
                    <MenuItem href="/services/tax-filing">
                      Payroll Taxes
                    </MenuItem>
                    <MenuItem href="/services/tax-filing">
                      Payroll Withholding Tax Filing
                    </MenuItem>
                    <MenuItem href="/services/tax-filing">
                      W2 & 1099 Filing
                    </MenuItem>
                    <MenuItem href="/services/tax-filing">
                      Tax Filing Services
                    </MenuItem>
                    <MenuItem href="/services/tax-filing" truncate>
                      Tax Filing Individual ( Non Resident) With ITIN
                    </MenuItem>
                    <MenuItem href="/services/tax-filing" truncate>
                      Company Tax Filing
                    </MenuItem>
                  </ul>
                </div>

                {/* Column 4: UK FORMATION & COMPLIANCE SERVICES */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-700 mb-8 text-sm uppercase tracking-wide">
                    UK FORMATION SERVICES
                  </h3>
                  <ul className="space-y-1">
                    <MenuItem href="/services/uk-ltd-formation">
                      UK LTD Formation
                    </MenuItem>
                    <MenuItem href="/services/simple-corp-tax-return-ct600" truncate>
                      Simple Corporation Tax 
                    </MenuItem>
                    <MenuItem href="/services/complex-corp-tax-return-ct600" truncate>
                      Advance Corporation Tax 
                    </MenuItem>
                    <MenuItem href="/services/registering-client-for-selfassessment">
                      Registering Client For Selfassessment
                    </MenuItem>
                    <MenuItem href="/services/simple-self-assessment-filing" truncate>
                      Simple Self Assessment (SA100) Filing
                    </MenuItem>
                    <MenuItem href="/services/advance-self-assessment-filing" truncate>
                      Advance Self Assessment (SA100) Filing
                    </MenuItem>
                    <MenuItem href="/services/annual-accounts-preparation" truncate>
                      Annual Corporation Tax Accounts Preparation
                    </MenuItem>
                    
                    <MenuItem href="/services/logo-kit">
                      Dormant Accounts Filing
                    </MenuItem>
                    <MenuItem href="/services/logo-kit">
                      Micro-Entity Accounts Filiing
                    </MenuItem>
                    <MenuItem href="/services/logo-kit">
                      Abridged Accounts Filing
                    </MenuItem>
                    <MenuItem href="/services/logo-kit">
                      Full Statutory Accounts Filing
                    </MenuItem>
                    <MenuItem href="/services/confirmation-statement-filing-services">
                      Confirmation Statement Filing
                    </MenuItem>
                    <MenuItem href="/services/vat-registration-services">
                      VAT Registeration
                    </MenuItem>
                    <MenuItem href="/services/vat-return-filing-services">
                      VAT Return Filing
                    </MenuItem>
                    <MenuItem href="/services/logo-kit">
                      Tax Planning & Consulation On Zoom
                    </MenuItem>
                    <MenuItem href="/services/tax-budgeting-services" truncate>
                      Tax Budgeting & Taxation In Investment Appraisal
                    </MenuItem>
                    <MenuItem href="/services/logo-kit">
                      Company Registration
                    </MenuItem>
                    <MenuItem href="/services/initial-compliance-after-formation">
                      Initial Compliance After Formation
                    </MenuItem>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Guides & Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => router.push("/blog")}
              className={`flex items-center space-x-1 text-foreground hover:text-orange-600 transition-colors whitespace-nowrap ${
                activeDropdown === "guides"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : ""
              }`}
            >
              <span className="whitespace-nowrap text-white font-bold hover:bg-primary p-2 rounded-full hover:shadow-md shadow-white cursor-pointer transition-all duration-300">Learning Center</span>
            </button>
          </div>

          {/* About Us Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("about")}
              className={`flex items-center space-x-1 text-foreground hover:text-orange-600 transition-colors whitespace-nowrap ${
                activeDropdown === "about"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : ""
              }`}
            >
              <span className="whitespace-nowrap text-white font-bold hover:bg-primary p-2 rounded-full hover:shadow-md shadow-white cursor-pointer transition-all duration-300">Get To Know Us</span>
              {activeDropdown === "about" ? (
                <ChevronUp className="h-4 w-4 text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white" />
              )}
            </button>

            {activeDropdown === "about" && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md px-2 py-1 block transition-all duration-200"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md px-2 py-1 block transition-all duration-200"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2.5 lg:space-x-3 xl:space-x-4 min-w-0">
          {/* <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors hidden xl:inline-flex">
            <Search className="h-5 w-5" />
          </button> */}
          <span className="text-sm text-white flex items-center space-x-1 whitespace-nowrap hidden xl:inline-flex">
            <Phone className="h-4 w-4 text-white" />
            <span>+1 307-400-1963</span>
          </span>

          <div className="flex items-center gap-3 lg:gap-4">
            {session ? (
              <>
                <span className="text-white max-w-[160px] lg:max-w-[200px] truncate hidden xl:inline">
                  {session.user?.email || "User"}
                </span>
                <Button size="sm" onClick={handleLogout} className="hover:bg-primary rounded-full hover:shadow-md shadow-white cursor-pointer transition-all duration-300">
                  Log Out
                </Button>
                <Button
                  onClick={() =>
                    userRole === "user"
                      ? router.push("/dashboard")
                      : router.push("/admin")
                  }
                  variant="outline"
                  size="sm"
                  className="text-black hover:bg-primary rounded-full hover:shadow-md shadow-white cursor-pointer transition-all duration-300"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" className="hover:bg-primary rounded-full hover:shadow-md shadow-white cursor-pointer transition-all duration-300" onClick={() => router.push("/auth/login2")}>
                  Log In
                </Button>
              </>
            )}
          </div>

          {/* <Button
            variant="ghost"
            className="text-gray-600 hover:text-orange-600"
            onClick={() => router.push("/auth/login")}
          >
            Log In
          </Button> */}
          {/* <Link href="/start-business">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white"
            >
              Start an LLC
            </Button>
          </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          // onClick={() => setIsMenuOpen(!isMenuOpen)}
          onClick={() => { setIsMenuOpen(!isMenuOpen); 
            if (isMenuOpen) {
              document.body.style.overflow = "hidden";
            } else {
              document.body.style.overflow = "auto";
            }
          }}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-4 ">
            <Accordion type="single" collapsible className="w-full ">
              <AccordionItem value="services">
                <AccordionTrigger className="text-sm ">
                  Services & Pricing
                </AccordionTrigger>
                <AccordionContent className="space-y-4 overflow-y-auto max-h-[50vh]">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      Formation Services
                    </h4>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/services/llc-formation-2"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        LLC Formation
                      </Link>
                      <Link
                        href="/services/corporation-formation"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Corp. Formation
                      </Link>
                      <Link
                        href="/services/corporation-formation"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Compare Formation Plans
                      </Link>
                      <Link
                        href="/services/dba-trademark-registration"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        DBA/Trademark Registration
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      Compliance Services
                    </h4>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/services/ein-services"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        EIN Services
                      </Link>
                      <Link
                        href="/services/boi-filing-services"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        BOI Filing Services
                      </Link>
                      <Link
                        href="/services/itin-services"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        ITIN Services
                      </Link>
                      <Link
                        href="/services/sales-and-usetax-registration"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Sales & Use Tax Registration
                      </Link>
                      <Link
                        href="/services/annual-company-state-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Annual Company State Filing
                      </Link>
                      <Link
                        href="/services/ein-closing-services"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        EIN Closing Services
                      </Link>
                      <Link
                        href="/services/registered-agent"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Registered Agent Services
                      </Link>
                      <Link
                        href="/services/company-dissolution"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Company Dissolution(State Fee Vary)
                      </Link>
                      <Link
                        href="/services/company-revival"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Company Revival (State Fee vary)
                      </Link>
                      <Link
                        href="/services/address-change-services"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Address Change Services
                      </Link>
                      <Link
                        href="/services/filing-articles-of-amendments"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Filing Articles Of Amendments(State fee excluded)
                      </Link>
                      <Link
                        href="/services/templates"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Payroll Related Services
                      </Link>
                      <Link
                        href="/services/templates"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Payroll Withholding Account Registration
                      </Link>
                      <Link
                        href="/services/templates"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        UI(Unemployment Insurance)
                      </Link>
                      <Link
                        href="/services/templates"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Payroll Management (Gusto, Adp, QBO, Paychecks, Paycom,
                        Rippling) monthly
                      </Link>
                      <Link
                        href="/services/templates"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Payroll Account Setup (Reach out for pricing)
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      Accounting & Bookkeeping Taxes
                    </h4>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/services/pro-bookkeeping-services(small-business)"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Pro-BookKeeping Services (Small Business)
                      </Link>
                      <Link
                        href="/services/pro-bookkeeping-services(medium-business)"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Pro-BookKeeping Services (Medium Business)
                      </Link>
                      <Link
                        href="/services/pro-bookkeeping-services(large-business)"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Pro-Bookkeeping Services (Large Business)
                      </Link>
                      <Link
                        href="/services/full-year-reconciliation-services"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Full-Year Reconciliation Services
                      </Link>
                      <Link
                        href="/services/setting-up-new-books-in-QBO"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Setting Up New Books In QBO/Xero Or Any ERP
                      </Link>
                      <Link
                        href="/services/tax-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Financial Reporting - Reach Out For Pricing
                      </Link>
                      <Link
                        href="/services/tax-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Virtual CFO Services-Reach Out For Pricing
                      </Link>
                      <Link
                        href="/services/tax-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Payroll Taxes
                      </Link>
                      <Link
                        href="/services/tax-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Payroll Withholding Tax Filing
                      </Link>
                      <Link
                        href="/services/tax-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        W2 & 1099 Filing
                      </Link>
                      <Link
                        href="/services/tax-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Tax Filing Services
                      </Link>
                      <Link
                        href="/services/tax-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Tax Filing Individual ( Non Resident) With ITIN
                      </Link>
                      <Link
                        href="/services/tax-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Company Tax Filing Vary Based On The Volume Of Business
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      UK Formation & Compliance
                    </h4>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/services/uk-ltd-formation"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        UK LTD Formation
                      </Link>
                      <Link
                        href="/services/simple-corp-tax-return-ct600"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Simple Corporation Tax Return Filing (CT600)
                      </Link>
                      <Link
                        href="/services/complex-corp-tax-return-ct600"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Advance Corporation Tax Return Filing (CT600)
                      </Link>
                      <Link
                        href="/services/registering-client-for-selfassessment"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Registering Client For Selfassessment
                      </Link>
                      <Link
                        href="/services/simple-self-assessment-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Simple Self Assessment (SA100) Filing
                      </Link>
                      <Link
                        href="/services/advance-self-assessment-filing"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Advance Self Assessment (SA100) Filing
                      </Link>
                      <Link
                        href="/services/annual-accounts-preparation"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Annual Corporation Tax Accounts Preparation
                      </Link>
                     
                      <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Dormant Accounts Filing
                      </Link>
                      <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Micro-Entity Accounts Filiing
                      </Link>
                      <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Abridged Accounts Filing
                      </Link>
                      <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Full Statutory Accounts Filing
                      </Link>
                      <Link
                        href="/services/confirmation-statement-filing-services"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Confirmation Statement Filing
                      </Link>
                      <Link
                        href="/services/vat-registration-services"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        VAT Registeration
                      </Link>
                      <Link
                        href="/services/vat-return-filing-services"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        VAT Return Filing
                      </Link>
                      <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Tax Planning & Consulation On Zoom
                      </Link>
                      <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Tax Budgeting & Taxation In Investment Appraisal
                      </Link>
                      <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Company Registration
                      </Link>
                      <Link
                        href="/services/initial-compliance-after-formation"
                        className="block text-sm text-gray-600 hover:text-orange-600"
                      >
                        Initial Compliance After Formation
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="learning">
                <AccordionTrigger className="text-sm">
                  Learning Center
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/blog"
                      className="block text-sm text-gray-600 hover:text-orange-600"
                    >
                      Visit our Blog
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="about">
                <AccordionTrigger className="text-sm">
                  Get To Know Us
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/about"
                      className="block text-sm text-gray-600 hover:text-orange-600"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-sm text-gray-600 hover:text-orange-600"
                    >
                      Contact Us
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-2 border-t space-y-2">
              {session ? (
                <>
                  <div className="text-gray-700 text-sm">
                    {session.user?.email || "User"}
                  </div>
                  <Button onClick={handleLogout} className="w-full">
                    Log Out
                  </Button>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    variant="outline"
                    className="w-full border-black text-black hover:bg-black hover:text-white"
                  >
                    Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login2">
                    <Button variant="ghost" className="w-full justify-center">
                      Log In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  );
}
