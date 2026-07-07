"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronDown, ChevronUp, Menu, X, Search, Phone } from "lucide-react";
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
import { accountingCategories, accountingServices } from "@/lib/accounting-services-data";
import { CALENDLY_URL } from "@/components/accounting-service-template";

// Helper component for menu items
const MenuItem = ({ href, children, truncate = false }) => (
  <li>
    {/* <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg px-2.5 py-1.5 block transition-all duration-200 ${
            truncate ? "truncate max-w-[180px]" : ""
          }`}
        >
          {children}
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{children}</p>
      </TooltipContent>
    </Tooltip> */}


      <Link
          href={href}
          className={`text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg px-2.5 py-1.5 block transition-all duration-200 ${
            truncate ? "truncate max-w-[180px]" : ""
          }`}
        >
          {children}
        </Link>
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
    <header className="sticky top-0 z-50 w-full h-20">
      {/* Glass background lives on a child layer: backdrop-filter on the header
          itself would turn it into the containing block for the fixed-position
          dropdown panels, overlay, and mobile sheet below. */}
      <div
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl border-b border-white/[0.08]"
        aria-hidden="true"
      />
      <div className="relative container flex h-20 items-center justify-between px-4 gap-4 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex space-x-2 min-w-0">
         
          <Image src="/logo-new-2.png" alt="Faaz Financial Group" width={125} height={20} />
         
        </Link>

        <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2 min-w-0 whitespace-nowrap">
          {/* Compliance Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("products")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                activeDropdown === "products"
                  ? "text-white bg-white/10"
                  : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <span className="whitespace-nowrap">Formation & Compliance</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === "products" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "products" && (
              <div className="fixed z-50 top-[84px] left-1/2 -translate-x-1/2 w-[96vw] max-w-[1240px] bg-white border border-gray-200/80 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden animate-slideDown">
                {/* Scroll lives on this inner wrapper so the scrollbar doesn't
                    paint over the panel's rounded corners */}
                <div className="max-h-[80vh] overflow-y-auto px-8 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 whitespace-normal">
          
                {/* Column 1: FORMATION SERVICES */}
                <div className="min-w-0">

                  <h3 className="text-sm  font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                    USA FORMATIONS
                  </h3>

                  <ul className="space-y-1">
                    <MenuItem href="/services/llc-formation-2">
                      LLC Formation
                    </MenuItem>                   
                    <MenuItem href="/services/corp-formation-2">
                      Corporation Formation
                    </MenuItem>
                    <MenuItem href="/services/registered-agent">
                      Registered Agent Services
                    </MenuItem>
                    
                    <MenuItem href="/services/dba-trademark-registration">
                      DBA/Trademark Registeration
                    </MenuItem>
                     <MenuItem href="/services/filing-articles-of-amendments" >
                      Filing Articles Of Amendments(State fee excluded)
                    </MenuItem>
                     <MenuItem href="/services/company-dissolution">
                      Company Dissolution
                    </MenuItem>
                      <MenuItem href="/services/company-revival">
                      Company Revival 
                    </MenuItem>
                    <MenuItem href="/services/address-change-services">
                      Address Change Services
                    </MenuItem>               
                  </ul>
                </div>

                  {/* Column 2: US TAX & COMPLIANCE */}

                <div className="min-w-0">

                  <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                    USA TAX & COMPLIANCES
                  </h3>

                  <ul className="space-y-1"> 
                     <MenuItem href="/services/annual-company-state-filing">
                      Annual Company State Filing
                    </MenuItem>
                    <MenuItem href="/contact">
                      1120 Proforma + 5472 Form Filing
                    </MenuItem>  
                    <MenuItem href="/contact">
                      Partnership Tax  Filing (1065 + K1 Schedule)
                    </MenuItem>  
                     <MenuItem href="/contact">
                      Corporation Tax  Filing (1120 & 1120S)
                    </MenuItem>  
                     <MenuItem href="/services/sales-and-usetax-registration">
                      Sales & Use Tax Registeration
                    </MenuItem>
                    <MenuItem href="/contact">
                      UI Account Registration
                    </MenuItem>
                    <MenuItem href="/services/payroll-withholding-services">
                      Payroll Withholding Tax Registeration
                    </MenuItem>
                    <MenuItem href="/contact">
                      Payroll Tax Filing
                    </MenuItem>
                    <MenuItem href="/contact">
                      W2 & 1099 Filing
                    </MenuItem>
                    <MenuItem href="/services/ein-services">
                      EIN Services
                    </MenuItem>
                      <MenuItem href="/services/itin-services">
                      ITIN Services
                    </MenuItem>
                    <MenuItem href="/services/boi-filing-services">
                      BOI Filing Services
                    </MenuItem>
                     <MenuItem href="/contact">
                      Bank Account Opening
                    </MenuItem>      
                    
                 </ul>
                </div>

                {/* Column 3: UK FORMATION */}
                <div className="min-w-0">

                  <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                    UK FORMATIONS
                  </h3>

                  <ul className="space-y-1">

                    <MenuItem href="/services/uk-ltd-formation">
                      UK LTD Formation
                    </MenuItem>
                    <MenuItem href="/services/registering-client-for-selfassessment">
                      Registering Client For Selfassessment
                    </MenuItem>
                     <MenuItem href="/services/confirmation-statement-filing-services">
                      Confirmation Statement Filing
                    </MenuItem>
           
                  </ul>
                </div>

                {/* Column 4: UK TAX & VAT */}
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                    UK TAX & COMPLIANCES
                  </h3>
                  <ul className="space-y-1">
                  
                    <MenuItem href="/services/simple-corp-tax-return-ct600">
                      Simple Corporation Tax 
                    </MenuItem>
                    <MenuItem href="/services/complex-corp-tax-return-ct600">
                      Advance Corporation Tax (CT600)
                    </MenuItem>
                    <MenuItem href="/services/simple-self-assessment-filing" >
                      Simple Self Assessment (SA100) Filing
                    </MenuItem>
                    <MenuItem href="/services/advance-self-assessment-filing" >
                      Advance Self Assessment (SA100) Filing
                    </MenuItem>
                    <MenuItem href="/services/vat-registration-services">
                      VAT Registeration
                    </MenuItem>
                    <MenuItem href="/services/vat-return-filing-services">
                      VAT Return Filing
                    </MenuItem>
                    <MenuItem href="/contact">
                      Dormant Accounts Filing
                    </MenuItem>
                    <MenuItem href="/contact">
                      Micro Entity Accounts Filing
                    </MenuItem>
                    <MenuItem href="/contact">
                      Abridged Accounts Filing
                    </MenuItem>
                    <MenuItem href="/contact">
                      Full Statutory Accounts Filing
                    </MenuItem>
                    
                    
                    {/* <MenuItem href="/services/confirmation-statement-filing-services">
                      Confirmation Statement Filing
                    </MenuItem> */}
                    {/* <MenuItem href="/services/annual-accounts-preparation" >
                      Annual Corporation Tax Accounts Preparation
                    </MenuItem> */}
                    {/* <MenuItem href="/services/logo-kit">
                      Tax Planning & Consulation On Zoom
                    </MenuItem> */}
                    {/* <MenuItem href="/services/tax-budgeting-services" >
                      Tax Budgeting & Taxation In Investment Appraisal
                    </MenuItem>
                    <MenuItem href="/services/initial-compliance-after-formation">
                      Initial Compliance After Formation
                    </MenuItem> */}
                  </ul>
                </div>
                </div>
              </div>
            )}
          </div>

          {/* Accounting Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("accountingServices")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                activeDropdown === "accountingServices"
                  ? "text-white bg-white/10"
                  : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <span className="whitespace-nowrap">Accounting & Bookkeeping</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === "accountingServices" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "accountingServices" && (
              <div className="fixed z-50 top-[84px] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1100px] bg-white border border-gray-200/80 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden animate-slideDown">
                <div className="max-h-[80vh] overflow-y-auto px-8 py-7 whitespace-normal">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Accounting Services
                  </h3>
                  <Link
                    href="/services/accounting-services"
                    className="text-xs lg:text-sm text-orange-600 hover:text-orange-700 font-medium"
                    onClick={() => setActiveDropdown(null)}
                  >
                    View all Accounting Services &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {accountingCategories.map((category) => (
                    <div key={category.id} className="min-w-0">
                      <h4 className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                        {category.title}
                      </h4>
                      <ul className="space-y-1">
                        {accountingServices
                          .filter((service) => service.category === category.id)
                          .map((service) => (
                            <MenuItem key={service.slug} href={`/services/${service.slug}`}>
                              {service.name}
                            </MenuItem>
                          ))}
                      </ul>
                      {category.id === "operational-support" && (
                        <Link
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                            Book a free consultation
                          </Button>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                </div>
              </div>
            )}
          </div>

          {/* Pricing Dropdown */}
          {/* <div className="relative">
          <button
              onClick={() => handleDropdownToggle("pricing")}
              className={`flex items-center space-x-1 text-foreground hover:text-orange-600 transition-colors whitespace-nowrap ${
                activeDropdown === "pricing"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : ""
              }`}
            >
              <span className="whitespace-nowrap text-white font-bold hover:bg-primary p-2 rounded-full hover:shadow-md shadow-white cursor-pointer transition-all duration-300">Bookkeeping Services</span>
              {activeDropdown === "pricing" ? (
                <ChevronUp className="h-4 w-4 text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white" />
              )}
            </button>
          </div> */}

           {/* IT Services Link */}
          <div className="relative">
            <button
              onClick={() => router.push("/it-services")}
              className="flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors duration-200"
            >
              <span className="whitespace-nowrap">IT Services</span>
            </button>
          </div>

          {/* Learning Center Dropdown */}
          <div className="relative">
            <button
               onClick={() => router.push("/learning-center")}
              className="flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors duration-200"
           >
              <span className="whitespace-nowrap">Learning Center</span>
            </button>
           
          </div>

         

          {/* About Us Dropdown */}
          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("about")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                activeDropdown === "about"
                  ? "text-white bg-white/10"
                  : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <span className="whitespace-nowrap">Get To Know Us</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  activeDropdown === "about" ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeDropdown === "about" && (
              <div
                className="absolute top-full right-0 mt-3 w-64 bg-white border border-gray-200/80 rounded-2xl shadow-2xl shadow-black/20 p-3 z-50 animate-slideDown"
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
                  <li className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-md px-2 py-1 flex items-center gap-1.5 transition-all duration-200 font-medium"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Book a discovery call
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden xl:flex items-center space-x-2 min-w-0">
          {/* <button className="p-2 text-gray-600 hover:text-orange-600 transition-colors hidden xl:inline-flex">
            <Search className="h-5 w-5" />
          </button> */}
          <span className="text-sm text-white hidden items-center space-x-1 whitespace-nowrap">
            <Phone className="h-4 w-4 text-white" />
            <span>+1 307-400-1963</span>
          </span>

          <div className="flex items-center gap-2">
            {session ? (
              <>
                <span className="text-sm text-gray-300 max-w-[140px] truncate hidden 2xl:inline">
                  {session.user?.email || "User"}
                </span>
                <Button
                  size="sm"
                  onClick={handleLogout}
                  variant="ghost"
                  className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-200"
                >
                  Log Out
                </Button>
                <Button
                  onClick={() =>
                    userRole === "user"
                      ? router.push("/dashboard")
                      : router.push("/admin")
                  }
                  size="sm"
                  className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 cursor-pointer transition-all duration-300"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer transition-colors duration-200"
                  onClick={() => router.push("/auth/login2")}
                >
                  Log In
                </Button>
                <Link href="/start-business" className="hidden min-[1400px]:block">
                  <Button
                    size="sm"
                    className="rounded-full bg-primary text-primary-foreground px-4 shadow-lg shadow-primary/25 hover:bg-primary/90 hover:shadow-primary/40 hover:-translate-y-px cursor-pointer transition-all duration-300"
                  >
                    Start Your Business →
                  </Button>
                </Link>
              </>
            )}
          </div>

        
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="xl:hidden text-white hover:text-white hover:bg-white/10 min-h-[44px] min-w-[44px] rounded-xl transition-colors duration-200"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
        <div className="xl:hidden fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-slate-950/95 backdrop-blur-xl border-t border-white/10 animate-slideDown">
          <div className="container px-4 py-6 space-y-4 mx-auto">
            <Accordion type="single" collapsible className="w-full ">
              <AccordionItem value="services" className="border-white/10">
                <AccordionTrigger className="text-[15px] font-medium text-gray-100 hover:text-orange-400 hover:no-underline min-h-[44px]">
                  Formation & Compliance
                </AccordionTrigger>
                <AccordionContent className="space-y-4 overflow-y-auto max-h-[50vh]">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-orange-400/90 text-xs uppercase tracking-wider">
                      USA Formations
                    </h4>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/services/llc-formation-2"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        LLC Formation
                      </Link>
                      <Link
                        href="/services/corporation-formation"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Corp. Formation
                      </Link>
                      
                       <Link
                        href="/services/registered-agent"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Registered Agent Services
                      </Link>
                      <Link
                        href="/services/dba-trademark-registration"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        DBA/Trademark Registration
                      </Link>
                       <Link
                        href="/services/filing-articles-of-amendments"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Filing Articles Of Amendments(State fee excluded)
                      </Link>
                      <Link
                        href="/services/company-dissolution"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Company Dissolution
                      </Link>
                      <Link
                        href="/services/company-revival"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Company Revival 
                      </Link>
                      <Link
                        href="/services/address-change-services"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Address Change Services
                      </Link>


                      
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-orange-400/90 text-xs uppercase tracking-wider">
                      USA Tax & Compliance
                    </h4>
                    <div className="pl-4 space-y-2">

                      <Link
                        href="/services/annual-company-state-filing"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Annual Company State Filing
                      </Link>

                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        1120 Proforma + 5472 Form Filing
                      </Link>

                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Partnership Tax Filing (1065 + K1 Schedule)
                      </Link>

                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Corporation Tax Filing (1120 & 1120S)
                      </Link>

                       <Link
                        href="/services/sales-and-usetax-registration"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Sales & Use Tax Registration
                      </Link>

                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        UI Account Registration
                      </Link>

                      <Link
                        href="/services/payroll-withholding-services"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Payroll Withholding Tax Registration
                      </Link>

                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Payroll Tax Filing
                      </Link>

                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        W2 & 1099 Filing
                      </Link>

                      <Link
                        href="/services/ein-services"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        EIN Services
                      </Link>

                      <Link
                        href="/services/itin-services"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        ITIN Services
                      </Link>

                      <Link
                        href="/services/boi-filing-services"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        BOI Filing Services
                      </Link>

                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Bank Account Opening
                      </Link>
                     
                      
                      {/* <Link
                        href="/services/ein-closing-services"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        EIN Closing Services
                      </Link> */}
                      
                      {/* <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        UI(Unemployment Insurance)
                      </Link>
                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Payroll Management (Gusto, Adp, QBO, Paychecks, Paycom,
                        Rippling) monthly
                      </Link>
                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Payroll Account Setup (Reach out for pricing)
                      </Link> */}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-orange-400/90 text-xs uppercase tracking-wider">
                      UK Formations
                    </h4>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/services/uk-ltd-formation"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        UK LTD Formation
                      </Link>

                      <Link
                        href="/services/registering-client-for-selfassessment"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Registering Client For Selfassessment
                      </Link>

                       <Link
                        href="/services/confirmation-statement-filing-services"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Confirmation Statement Filing
                      </Link>
                      </div>
                      </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-orange-400/90 text-xs uppercase tracking-wider">
                      UK Tax & Compliances
                    </h4>

                    <div className="pl-4 space-y-2">

                      <Link
                        href="/services/simple-corp-tax-return-ct600"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Simple Corporation Tax Return Filing (CT600)
                      </Link>
                      <Link
                        href="/services/complex-corp-tax-return-ct600"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Advance Corporation Tax Return Filing (CT600)
                      </Link>
                      
                      <Link
                        href="/services/simple-self-assessment-filing"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Simple Self Assessment (SA100) Filing
                      </Link>
                      <Link
                        href="/services/advance-self-assessment-filing"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Advance Self Assessment (SA100) Filing
                      </Link>
                       <Link
                        href="/services/vat-registration-services"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        VAT Registeration
                      </Link>
                      <Link
                        href="/services/vat-return-filing-services"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        VAT Return Filing
                      </Link>
                      {/* <Link
                        href="/services/annual-accounts-preparation"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Annual Corporation Tax Accounts Preparation
                      </Link> */}
                     
                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Dormant Accounts Filing
                      </Link>
                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Micro-Entity Accounts Filiing
                      </Link>
                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Abridged Accounts Filing
                      </Link>
                      <Link
                        href="/contact"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Full Statutory Accounts Filing
                      </Link>
                     
                     
                      {/* <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Tax Planning & Consulation On Zoom
                      </Link>
                      <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Tax Budgeting & Taxation In Investment Appraisal
                      </Link>
                      <Link
                        href="/services/logo-kit"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Company Registration
                      </Link>
                      <Link
                        href="/services/initial-compliance-after-formation"
                        className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                      >
                        Initial Compliance After Formation
                      </Link> */}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* <AccordionItem value="bookkeeping" className="border-white/10">
                <AccordionTrigger className="text-[15px] font-medium text-gray-100 hover:text-orange-400 hover:no-underline min-h-[44px]">
                  Accounting & Bookkeeping
                </AccordionTrigger>
                <AccordionContent className="space-y-4 overflow-y-auto max-h-[50vh]">
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/services/pro-bookkeeping-services(small-business)"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Pro-BookKeeping Services (Small Business)
                    </Link>
                    <Link
                      href="/services/pro-bookkeeping-services(medium-business)"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Pro-BookKeeping Services (Medium Business)
                    </Link>
                    <Link
                      href="/services/pro-bookkeeping-services(large-business)"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Pro-Bookkeeping Services (Large Business)
                    </Link>
                    <Link
                      href="/services/full-year-reconciliation-services"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Full-Year Reconciliation Services
                    </Link>
                    <Link
                      href="/services/setting-up-new-books-in-QBO"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Setting Up New Books In QBO/Xero Or Any ERP
                    </Link> */}
                    {/* <Link
                      href="/services/tax-filing"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Financial Reporting - Reach Out For Pricing
                    </Link>
                    <Link
                      href="/services/tax-filing"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Virtual CFO Services-Reach Out For Pricing
                    </Link>
                    <Link
                      href="/services/tax-filing"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Payroll Taxes
                    </Link>
                    <Link
                      href="/services/tax-filing"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Payroll Withholding Tax Filing
                    </Link>
                    <Link
                      href="/services/tax-filing"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      W2 & 1099 Filing
                    </Link>
                    <Link
                      href="/services/tax-filing"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Tax Filing Services
                    </Link>
                    <Link
                      href="/services/tax-filing"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Tax Filing Individual ( Non Resident) With ITIN
                    </Link>
                    <Link
                      href="/services/tax-filing"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Company Tax Filing Vary Based On The Volume Of Business
                    </Link> */}
                  {/* </div>
                </AccordionContent>
              </AccordionItem> */}

              <AccordionItem value="accounting-services" className="border-white/10">
                <AccordionTrigger className="text-[15px] font-medium text-gray-100 hover:text-orange-400 hover:no-underline min-h-[44px]">
                  Accounting & Bookkeeping
                </AccordionTrigger>
                <AccordionContent className="space-y-4 overflow-y-auto max-h-[50vh]">
                  <div className="pl-4">
                    <Link
                      href="/services/accounting-services"
                      className="block text-sm font-semibold text-orange-600 hover:text-orange-700 mb-2"
                    >
                      View all Accounting Services &rarr;
                    </Link>
                  </div>
                  {accountingCategories.map((category) => (
                    <div key={category.id} className="space-y-2">
                      <h4 className="font-semibold text-orange-400/90 text-xs uppercase tracking-wider pl-4">
                        {category.title}
                      </h4>
                      <div className="pl-4 space-y-2">
                        {accountingServices
                          .filter((service) => service.category === category.id)
                          .map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                            >
                              {service.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  ))}
                  <div className="pl-4">
                    <Link href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer">
                        Book a free consultation
                      </Button>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="learning" className="border-white/10">
                <AccordionTrigger className="text-[15px] font-medium text-gray-100 hover:text-orange-400 hover:no-underline min-h-[44px]">
                  Learning Center
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/learning-center"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Learning Topics
                    </Link>
                    <Link
                      href="/blog"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Business Blog
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="it-services" className="border-white/10">
                <AccordionTrigger className="text-[15px] font-medium text-gray-100 hover:text-orange-400 hover:no-underline min-h-[44px]">
                  IT Services
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/it-services"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Web Development & AI Automation
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="about" className="border-white/10">
                <AccordionTrigger className="text-[15px] font-medium text-gray-100 hover:text-orange-400 hover:no-underline min-h-[44px]">
                  Get To Know Us
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-4 space-y-2">
                    <Link
                      href="/about"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      About Us
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-sm text-gray-300 hover:text-orange-400 py-1.5 transition-colors duration-200"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1.5"
                    >
                      <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
                      Book a discovery call
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-4 border-t border-white/10 space-y-3">
              {session ? (
                <>
                  <div className="text-gray-300 text-sm truncate">
                    {session.user?.email || "User"}
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="w-full min-h-[44px] rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300"
                  >
                    Log Out
                  </Button>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    variant="outline"
                    className="w-full min-h-[44px] rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white transition-colors duration-200"
                  >
                    Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login2">
                    <Button
                      variant="outline"
                      className="w-full justify-center min-h-[44px] rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white transition-colors duration-200"
                    >
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
          className="fixed inset-x-0 top-20 bottom-0 z-30 bg-slate-950/30 backdrop-blur-[2px]"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  );
}
