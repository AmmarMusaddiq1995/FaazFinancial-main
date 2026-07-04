"use client";

import { Briefcase } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const CATEGORIES = [
  {
    id: "us-formation",
    label: "US Formation",
    services: [
      { name: "DBA Registration Fee", price: "Starting at $170" },
      { name: "Ein Services", price: "Starting at $40" },
      { name: "BOI Filing", price: "Starting at $25" },
      { name: "Bank Account Opening", price: "Starting at $85" },
      { name: "ITIN Services", price: "Starting at $380" },
      { name: "Annual State Filing", price: "Starting at $140" },
      { name: "Company Dissolution", price: "Starting at $199" },
      { name: "Company Revival", price: "Starting at $190" },
      { name: "EIN Closing Services", price: "Starting at $75" },
      { name: "Registered Agent Services", price: "Starting at $35" },
      { name: "Address Change Services", price: "Starting at $100" },
      { name: "Filing Articles Of Amendments", price: "Starting at $150" },
    ],
  },
  {
    id: "us-tax-payroll",
    label: "US Tax & Payroll",
    services: [
      { name: "Sales & Use Tax Registration", price: "Starting at $75" },
      { name: "Payroll Tax Registration", price: "Starting at $95" },
      { name: "UI Account Registration", price: "Starting at $75" },
      { name: "Payroll Tax Filing", price: "Starting at $60" },
      { name: "W2 & 1099 Filing", price: "Starting at $25" },
      { name: "Payroll Management", price: "Starting at $150" },
      { name: "Bookkeeping Services", price: "Starting at $200" },
    ],
  },
  {
    id: "uk-formation",
    label: "UK Formation",
    services: [
      { name: "UK Ltd Formation", price: "Starting at $240" },
      { name: "Confirmation Statement Filing-UK", price: "Starting at $85" },
      { name: "Dormant Accounts Filing-UK", price: "Starting at $55" },
      { name: "Micro Entity Accounts Filing-UK", price: "Starting at $75" },
      { name: "Abridged Accounts Filing-UK", price: "Starting at $90" },
      { name: "Full Statutory Accounts Filing-UK", price: "Starting at $120" },
    ],
  },
  {
    id: "uk-tax-vat",
    label: "UK Tax & VAT",
    services: [
      { name: "Simple Corporation Tax", price: "Starting at $100" },
      { name: "Advance Corporation Tax CT600-UK", price: "Starting at $160" },
      { name: "Registering For Self Assessment-UK", price: "Starting at $40" },
      { name: "SA100 Filing-Simple", price: "Starting at $80" },
      { name: "SA100 Filing-Advance", price: "Starting at $114" },
      { name: "Simple Corp Tax Account Preparation-UK", price: "Starting at $80" },
      { name: "Advance Corp Tax Account Preparation-UK", price: "Starting at $185" },
      { name: "VAT Registeration-UK", price: "Starting at $55" },
      { name: "VAT Return Filing-UK", price: "Starting at $115" },
    ],
  },
];

export function PricingCategoriesSection() {
  return (
    <section className="py-10 lg:py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-xl lg:text-4xl font-bold mb-4 text-balance">
            Transparent Pricing, No Surprises
          </h2>
          <p className="text-sm lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Browse by service category below, or use our package configurator to build a custom plan.
          </p>
        </div>

        <Tabs defaultValue={CATEGORIES[0].id} className="max-w-6xl mx-auto">
          <TabsList className="w-full h-auto p-1 mb-10 flex flex-nowrap justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-hide bg-muted rounded-lg">
            {CATEGORIES.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="min-h-[44px] shrink-0 whitespace-nowrap px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="h-10 w-10 bg-primary/80 rounded-full flex items-center justify-center shrink-0">
                      <Briefcase className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{service.name}</p>
                      <p className="text-xs lg:text-sm text-orange-500 font-bold">{service.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
