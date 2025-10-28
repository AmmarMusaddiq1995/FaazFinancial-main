"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

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

export function PricingSection() {
  const [formData, setFormData] = useState({
    packageType: "",
    state: "",
    selectService: "",
  });

  // Complete pricing table based on spreadsheet data
  const getPricing = () => {
    const pricingTable = {
      "LLC Formation": {
        "Alabama": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "Alaska": { Starter: { normal: 470, express: 540 }, Pro: { normal: 500, express: 570 }, Premium: { normal: 550, express: 620 } },
        "Arizona": { Starter: { normal: 270, express: 340 }, Pro: { normal: 300, express: 370 }, Premium: { normal: 350, express: 420 } },
        "Arkansas": { Starter: { normal: 270, express: 340 }, Pro: { normal: 300, express: 370 }, Premium: { normal: 350, express: 420 } },
        "California": { Starter: { normal: 285, express: 355 }, Pro: { normal: 315, express: 385 }, Premium: { normal: 365, express: 435 } },
        "Colorado": { Starter: { normal: 250, express: 320 }, Pro: { normal: 280, express: 350 }, Premium: { normal: 330, express: 400 } },
        "Connecticut": { Starter: { normal: 335, express: 405 }, Pro: { normal: 365, express: 435 }, Premium: { normal: 415, express: 485 } },
        "Delaware": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "Florida": { Starter: { normal: 300, express: 370 }, Pro: { normal: 330, express: 400 }, Premium: { normal: 380, express: 450 } },
        "Georgia": { Starter: { normal: 300, express: 370 }, Pro: { normal: 330, express: 400 }, Premium: { normal: 380, express: 450 } },
        "Hawaii": { Starter: { normal: 270, express: 340 }, Pro: { normal: 300, express: 370 }, Premium: { normal: 350, express: 420 } },
        "Idaho": { Starter: { normal: 305, express: 375 }, Pro: { normal: 335, express: 405 }, Premium: { normal: 385, express: 455 } },
        "Illinois": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Indiana": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Iowa": { Starter: { normal: 270, express: 340 }, Pro: { normal: 300, express: 370 }, Premium: { normal: 350, express: 420 } },
        "Kansas": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Kentucky": { Starter: { normal: 250, express: 320 }, Pro: { normal: 280, express: 350 }, Premium: { normal: 330, express: 400 } },
        "Louisiana": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Maine": { Starter: { normal: 395, express: 465 }, Pro: { normal: 425, express: 495 }, Premium: { normal: 475, express: 545 } },
        "Maryland": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Massachusetts": { Starter: { normal: 720, express: 790 }, Pro: { normal: 750, express: 820 }, Premium: { normal: 800, express: 870 } },
        "Michigan": { Starter: { normal: 270, express: 340 }, Pro: { normal: 300, express: 370 }, Premium: { normal: 350, express: 420 } },
        "Minnesota": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Mississippi": { Starter: { normal: 270, express: 340 }, Pro: { normal: 300, express: 370 }, Premium: { normal: 350, express: 420 } },
        "Missouri": { Starter: { normal: 270, express: 340 }, Pro: { normal: 300, express: 370 }, Premium: { normal: 350, express: 420 } },
        "Montana": { Starter: { normal: 250, express: 320 }, Pro: { normal: 280, express: 350 }, Premium: { normal: 330, express: 400 } },
        "Nebraska": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Nevada": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "New Hampshire": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "New Jersey": { Starter: { normal: 350, express: 420 }, Pro: { normal: 380, express: 450 }, Premium: { normal: 430, express: 500 } },
        "New Mexico": { Starter: { normal: 250, express: 320 }, Pro: { normal: 280, express: 350 }, Premium: { normal: 330, express: 400 } },
        "New York": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "North Carolina": { Starter: { normal: 350, express: 420 }, Pro: { normal: 380, express: 450 }, Premium: { normal: 430, express: 500 } },
        "North Dakota": { Starter: { normal: 335, express: 405 }, Pro: { normal: 365, express: 435 }, Premium: { normal: 415, express: 485 } },
        "Ohio": { Starter: { normal: 300, express: 370 }, Pro: { normal: 330, express: 400 }, Premium: { normal: 380, express: 450 } },
        "Oklahoma": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Oregon": { Starter: { normal: 305, express: 375 }, Pro: { normal: 335, express: 405 }, Premium: { normal: 385, express: 455 } },
        "Pennsylvania": { Starter: { normal: 350, express: 420 }, Pro: { normal: 380, express: 450 }, Premium: { normal: 430, express: 500 } },
        "Rhode Island": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "South Carolina": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "South Dakota": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Tennessee": { Starter: { normal: 520, express: 590 }, Pro: { normal: 550, express: 620 }, Premium: { normal: 600, express: 670 } },
        "Texas": { Starter: { normal: 505, express: 575 }, Pro: { normal: 535, express: 605 }, Premium: { normal: 585, express: 655 } },
        "Utah": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Vermont": { Starter: { normal: 335, express: 405 }, Pro: { normal: 365, express: 435 }, Premium: { normal: 415, express: 485 } },
        "Virginia": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Washington": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "West Virginia": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Wisconsin": { Starter: { normal: 350, express: 420 }, Pro: { normal: 380, express: 450 }, Premium: { normal: 430, express: 500 } },
        "Wyoming": { Starter: { normal: 300, express: 370 }, Pro: { normal: 330, express: 400 }, Premium: { normal: 380, express: 450 } }
      },
      "C Corporation Formation": {
        "Alabama": { Starter: { normal: 470, express: 540 }, Pro: { normal: 500, express: 570 }, Premium: { normal: 550, express: 620 } },
        "Alaska": { Starter: { normal: 520, express: 590 }, Pro: { normal: 550, express: 620 }, Premium: { normal: 600, express: 670 } },
        "Arizona": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Arkansas": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "California": { Starter: { normal: 335, express: 405 }, Pro: { normal: 365, express: 435 }, Premium: { normal: 415, express: 485 } },
        "Colorado": { Starter: { normal: 300, express: 370 }, Pro: { normal: 330, express: 400 }, Premium: { normal: 380, express: 450 } },
        "Connecticut": { Starter: { normal: 385, express: 455 }, Pro: { normal: 415, express: 485 }, Premium: { normal: 465, express: 535 } },
        "Delaware": { Starter: { normal: 470, express: 540 }, Pro: { normal: 500, express: 570 }, Premium: { normal: 550, express: 620 } },
        "Florida": { Starter: { normal: 350, express: 420 }, Pro: { normal: 380, express: 450 }, Premium: { normal: 430, express: 500 } },
        "Georgia": { Starter: { normal: 350, express: 420 }, Pro: { normal: 380, express: 450 }, Premium: { normal: 430, express: 500 } },
        "Hawaii": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Idaho": { Starter: { normal: 355, express: 425 }, Pro: { normal: 385, express: 455 }, Premium: { normal: 435, express: 505 } },
        "Illinois": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "Indiana": { Starter: { normal: 370, express: 420 }, Pro: { normal: 400, express: 450 }, Premium: { normal: 450, express: 500 } },
        "Iowa": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Kansas": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "Kentucky": { Starter: { normal: 300, express: 370 }, Pro: { normal: 330, express: 400 }, Premium: { normal: 380, express: 450 } },
        "Louisiana": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Maine": { Starter: { normal: 445, express: 515 }, Pro: { normal: 475, express: 545 }, Premium: { normal: 525, express: 595 } },
        "Maryland": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Massachusetts": { Starter: { normal: 770, express: 840 }, Pro: { normal: 800, express: 870 }, Premium: { normal: 850, express: 920 } },
        "Michigan": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Minnesota": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "Mississippi": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Missouri": { Starter: { normal: 320, express: 390 }, Pro: { normal: 350, express: 420 }, Premium: { normal: 400, express: 470 } },
        "Montana": { Starter: { normal: 300, express: 370 }, Pro: { normal: 330, express: 400 }, Premium: { normal: 380, express: 450 } },
        "Nebraska": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Nevada": { Starter: { normal: 470, express: 540 }, Pro: { normal: 500, express: 570 }, Premium: { normal: 550, express: 620 } },
        "New Hampshire": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "New Jersey": { Starter: { normal: 400, express: 470 }, Pro: { normal: 430, express: 520 }, Premium: { normal: 480, express: 570 } },
        "New Mexico": { Starter: { normal: 300, express: 370 }, Pro: { normal: 330, express: 400 }, Premium: { normal: 380, express: 450 } },
        "New York": { Starter: { normal: 470, express: 540 }, Pro: { normal: 500, express: 570 }, Premium: { normal: 550, express: 620 } },
        "North Carolina": { Starter: { normal: 400, express: 470 }, Pro: { normal: 430, express: 520 }, Premium: { normal: 480, express: 570 } },
        "North Dakota": { Starter: { normal: 385, express: 455 }, Pro: { normal: 415, express: 485 }, Premium: { normal: 465, express: 535 } },
        "Ohio": { Starter: { normal: 350, express: 420 }, Pro: { normal: 380, express: 450 }, Premium: { normal: 430, express: 500 } },
        "Oklahoma": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Oregon": { Starter: { normal: 355, express: 425 }, Pro: { normal: 385, express: 455 }, Premium: { normal: 435, express: 505 } },
        "Pennsylvania": { Starter: { normal: 400, express: 470 }, Pro: { normal: 430, express: 520 }, Premium: { normal: 480, express: 570 } },
        "Rhode Island": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "South Carolina": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "South Dakota": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "Tennessee": { Starter: { normal: 570, express: 640 }, Pro: { normal: 600, express: 670 }, Premium: { normal: 650, express: 720 } },
        "Texas": { Starter: { normal: 555, express: 625 }, Pro: { normal: 585, express: 655 }, Premium: { normal: 635, express: 705 } },
        "Utah": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "Vermont": { Starter: { normal: 385, express: 455 }, Pro: { normal: 415, express: 485 }, Premium: { normal: 465, express: 535 } },
        "Virginia": { Starter: { normal: 370, express: 440 }, Pro: { normal: 400, express: 470 }, Premium: { normal: 450, express: 520 } },
        "Washington": { Starter: { normal: 470, express: 540 }, Pro: { normal: 500, express: 570 }, Premium: { normal: 550, express: 620 } },
        "West Virginia": { Starter: { normal: 420, express: 490 }, Pro: { normal: 450, express: 520 }, Premium: { normal: 500, express: 570 } },
        "Wisconsin": { Starter: { normal: 400, express: 470 }, Pro: { normal: 430, express: 500 }, Premium: { normal: 480, express: 550 } },
        "Wyoming": { Starter: { normal: 350, express: 420 }, Pro: { normal: 380, express: 450 }, Premium: { normal: 430, express: 500 } }
      }
    };

    const service = formData.selectService || "LLC Formation";
    const packageType = formData.packageType || "normal";
    const state = formData.state || "Alabama";
    
    const serviceData = pricingTable[service] || pricingTable["LLC Formation"];
    const stateData = serviceData[state] || serviceData["Alabama"];
    
    return {
      Starter: stateData.Starter[packageType],
      Pro: stateData.Pro[packageType],
      Premium: stateData.Premium[packageType]
    };
  };

  const currentPrices = getPricing();

  const plans = [
    {
      name: "Starter",
      price: `$${currentPrices.Starter}`,
      period: "",
      description: "Get your business started with the basics",
      popular: false,
      features: [
        "Unlimited Name Searches",
        "Article Of Organization/Formation Filing",
        "Operating Agreement",
        "Certificate Of Good Standing (State fee separate if applied)",
        "1 Year Registered Agent Service",
        "Registered Agent Address",
      ],
    },
    {
      name: "Standard",
      price: `$${currentPrices.Pro}`,
      period: "",
      description: "Most popular plan for new businesses",
      popular: true,
      features: [
        "Unlimited Name Searches",
        "Article Of Organization/Formation Filing",
        "Operating Agreement",
        "Certificate Of Good Standing (State fee separate if applied)",
        "1 Year Registered Agent Service",
        "Registered Agent Address",
        "EIN Confirmation (with C147 letter)",
        "Bank Account",
      ],
    },
    {
      name: "Premium",
      price: `$${currentPrices.Premium}`,
      period: "",
      description: "Complete package for serious entrepreneurs",
      popular: false,
      features: [
        "Unlimited Name Searches",
        "Article Of Organization/Formation Filing",
        "Operating Agreement",
        "Certificate Of Good Standing (State fee separate if applied)",
        "1 Year Registered Agent Service",
        "Registered Agent Address",
        "EIN Confirmation (with C147 letter)",
        "Bank Account",
        "BOI Filings",
      ],
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Compare our packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our customized packages meet the compliance, filing speed, and
            support needs of your new business in one place.
          </p>
        </div>

        {/* Pricing Configuration Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Configure Your Package
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



            {/* Package Type Selection */}
            <div className="space-y-3">
              <Label htmlFor="packageType" className="text-base font-semibold text-gray-700">
                Package Type
              </Label>
              <Select
                value={formData.packageType}
                onValueChange={(value) =>
                  setFormData({ ...formData, packageType: value })
                }
                required
              >
                <SelectTrigger className="w-full h-12 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                  <SelectValue placeholder="Select package type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">
                    <div className="flex flex-col">
                      <span className="font-medium">Normal (14 Business Days)</span>
                      
                    </div>
                  </SelectItem>
                  <SelectItem value="express">
                    <div className="flex flex-col">
                      <span className="font-medium">Express (7 Business Days)</span>
                      {/* <span className="text-sm text-gray-500">Faster processing</span> */}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>








            {/* State Selection */}
            <div className="space-y-3">
              <Label htmlFor="state" className="text-base font-semibold text-gray-700">
                State of Formation
              </Label>
              <Select
                value={formData.state}
                onValueChange={(value) =>
                  setFormData({ ...formData, state: value })
                }
                required
              >
                <SelectTrigger className="w-full h-12 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Service Selection */}
            <div className="space-y-3">
              <Label htmlFor="selectService" className="text-base font-semibold text-gray-700">
                Service Type
              </Label>
              <Select
                value={formData.selectService}
                onValueChange={(value) =>
                  setFormData({ ...formData, selectService: value })
                }
                required
              >
                <SelectTrigger className="w-full h-12 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LLC Formation">
                    <div className="flex flex-col">
                      <span className="font-medium">LLC Formation</span>
                      
                    </div>
                  </SelectItem>
                  <SelectItem value="C Corporation Formation">
                    <div className="flex flex-col">
                      <span className="font-medium">C Corporation Formation</span>
                      
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price Preview */}
          {(formData.packageType || formData.state || formData.selectService) && (
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-medium">Current pricing:</span> Starter ${currentPrices.Starter} • Pro ${currentPrices.Pro} • Premium ${currentPrices.Premium}
                {formData.packageType && (
                  <span className="block mt-1 text-xs">
                    {formData.packageType === "normal" && "Normal processing: 14 business days"}
                    {formData.packageType === "express" && "Express processing: 7 business days"}
                  </span>
                )}
                {formData.state && (
                  <span className="block mt-1 text-xs">
                    {formData.state === "California" && "California has higher state fees"}
                    {formData.state === "New York" && "New York has higher state fees"}
                    {formData.state === "Delaware" && "Delaware has moderate state fees"}
                    {formData.state === "Nevada" && "Nevada has slightly higher state fees"}
                    {formData.state === "Texas" && "Texas has higher state fees"}
                    {formData.state === "Alaska" && "Alaska has higher state fees"}
                    {formData.state === "Hawaii" && "Hawaii has higher state fees"}
                    {formData.state === "Illinois" && "Illinois has higher state fees"}
                    {formData.state === "Maryland" && "Maryland has higher state fees"}
                    {formData.state === "Massachusetts" && "Massachusetts has higher state fees"}
                    {formData.state === "New Jersey" && "New Jersey has higher state fees"}
                    {formData.state === "Pennsylvania" && "Pennsylvania has higher state fees"}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.popular ? "border-primary shadow-lg scale-105" : ""
              }`}
              
            >
              {plan.name === "Standard" && (
                <div className="absolute top-4 -right-9 z-10">
                  <span className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold rounded shadow-sm rotate-45 inline-block">
                    RECOMMENDED
                  </span>
                </div>
              )}
              {plan.name === "Premium" && (
                <div className="absolute top-12 -right-6 z-10">
                  <span className="bg-orange-500 text-white px-3 py-1 text-xs font-semibold rounded shadow-sm rotate-45 inline-block origin-top-right">
                    BEST VALUE
                  </span>
                </div>
              )}
              {/* {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    MOST POPULAR
                  </span>
                </div>
              )} */}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start space-x-3"
                    >
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular ? "bg-primary hover:bg-primary/90" : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => {
                    const serviceType = formData.selectService || "LLC Formation";
                    const packageType = formData.packageType || "normal";
                    const state = formData.state || "Alabama";
                    const price = currentPrices[plan.name];
                    
                    // Create URL parameters
                    const params = new URLSearchParams({
                      packageType,
                      state,
                      serviceType,
                      planName: plan.name,
                      price: price.toString()
                    });
                    
                    // Redirect based on service type
                    if (serviceType === "C Corporation Formation") {
                      window.location.href = `/services/corp-formation-2?${params.toString()}`;
                    } else {
                      window.location.href = `/services/llc-formation-2?${params.toString()}`;
                    }
                  }}
                >
                  {plan.name === "Starter"
                    ? "Get Starter"
                    : plan.name === "Pro"
                    ? "Get Pro"
                    : "Get Premium"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            *Promotional terms are based on receiving complete information.
            FaazFinancialGroup processing times do not include Secretary of
            State processing times, which can vary.
          </p>
        </div>
      </div>
    </section>
  );
}

