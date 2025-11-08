"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

export function HeroSection() {

  const services = [
    { name: "DBA Registration Fee", price: "Starting at $170" },
    { name: "Ein Services", price: "Starting at $40" },
    { name: "BOI Filing", price: "Starting at $25" },
    { name: "Bank Account Opening", price: "Starting at $85" },
    { name: "ITIN Services", price: "Starting at $380" },
    { name: "Sales & Use Tax Registration", price: "Starting at $75" },
    { name: "Annual State Filing", price: "Starting at $120" },
    { name: "Company Dissolution", price: "Starting at $199" },
    { name: "Company Revival", price: "Starting at $190" },
    { name: "EIN Closing Services", price: "Starting at $80" },
    { name: "Registered Agent Services", price: "Starting at $35" },
    { name: "Address Change Services", price: "Starting at $100" },
    { name: "Filing Articles Of Amendments", price: "Starting at $125" },
    { name: "Payroll Tax Registration", price: "Starting at $95" },
    { name: "UI Account Registration", price: "Starting at $75" },
    { name: "Payroll Tax Filing", price: "Starting at $60" },
    { name: "W2 & 1099 Filing", price: "Starting at $25" },
    { name: "Payroll Management", price: "Starting at $150" },
    { name: "Bookkeeping Services", price: "Starting at $200" },
    { name: "UK Ltd Formation", price: "Starting at $240" },
    { name: "Simple Corporation Tax", price: "Starting at $100" },
    { name: "Advance Corporation Tax CT600-UK", price: "Starting at $160" },
    { name: "Registering For Self Assessment-UK", price: "Starting at $40" },
    { name: "SA100 Filing-Simple", price: "Starting at $80" },
    { name: "SA100 Filing-Advance", price: "Starting at $114" },
    { name: "Simple Corp Tax Account Preparation-UK", price: "Starting at $80" },
    { name: "Advance Corp Tax Account Preparation-UK", price: "Starting at $185" },
    { name: "Dormant Accounts Filing-UK", price: "Starting at $55" },
    { name: "Micro Entity Accounts Filing-UK", price: "Starting at $75" },
    { name: "Abridged Accounts Filing-UK", price: "Starting at $90" },
    { name: "Full Statutory Accounts Filing-UK", price: "Starting at $120" },
    { name: "Confirmation Statement Filing-UK", price: "Starting at $85" },
    { name: "VAT Registeration-UK", price: "Starting at $55" },
    { name: "VAT Return Filing-UK", price: "Starting at $115" },
    
    // You can add all 35 here...
  ];


  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden -mt-20 pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-100">
        <img
          src="/zero-section.png"
          alt="Entrepreneur working"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative container px-4 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="mb-6">
            <span className="inline-block bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-sm lg:text-md font-medium mb-4">
              ONE HOME FOR ALL YOUR BUSINESS NEEDS.
            </span>
          </div>

          <h1 className="text-3xl lg:text-6xl font-bold mb-6">
            Launch Your <br />
            <span className="text-orange-500 mx-30 lg:mx-60 whitespace-nowrap"><span className="text-white">Dream</span> Business</span>
          </h1>

          <p className="text-xs lg:text-2xl text-gray-300 mb-8 whitespace-nowrap">
            Build Boldly , Protect Wisely , Succeed Easily - <span className="text-orange-500 font-bold">All in One Place</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/start-business">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 cursor-pointer text-primary-foreground px-8 py-4 text-lg"
              >
                Get started
              </Button>
            </Link>
          </div>

          {/* Reviews */}
          {/* <div className="flex items-center space-x-4 text-sm">
            <span className="font-semibold">Excellent</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-orange-500 text-orange-500"
                />
              ))}
            </div>
            <span className="text-gray-300">24,000 reviews</span>
            <span className="text-gray-300">Trustpilot</span>
          </div> */}
        </div>
      </div>

      {/* Feature Icons */}
      <div className="relative bg-primary/10 ">
        <div className="container mx-auto  px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 lg:h-18 lg:w-18 bg-primary/80 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl lg:text-3xl">📋</span>
              </div>
              <span className="text-xs lg:text-md font-medium text-gray-300">
                Formation and Compliance
              </span>
            </div>
            {/* <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xl">🌐</span>
              </div>
              <span className="text-sm text-gray-300">Website and Domain</span>
            </div> */}
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 lg:h-18 lg:w-18 bg-primary/80 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl lg:text-3xl">📊</span>
              </div>
              <span className="text-xs lg:text-md font-medium text-gray-300">
                Banking and Bookkeeping
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 lg:h-18 lg:w-18 bg-primary/80 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl lg:text-3xl">💡</span>
              </div>
              <span className="text-xs lg:text-md font-medium text-gray-300">
                Tax Advice and Filing
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 lg:h-18 lg:w-18 bg-primary/80 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl lg:text-3xl">🎯</span>
              </div>
              <span className="text-xs lg:text-md font-medium text-gray-300">
                Expert Customer Support
              </span>
            </div>
          </div>
        </div>
      </div>

        {/* Scrolling Prices Section */}
        <div className="relative bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/90 py-6 border-t border-primary/30">
          {/* Scroll instruction message */}
          <div className="text-center mb-4 px-4">
            <p className="text-orange-400 text-sm lg:text-base font-medium animate-pulse">
              👆 Scroll for the prices info
            </p>
          </div>
          
          {/* Scrollable container */}
          <div className="overflow-x-auto scrollbar-hide">
            {/* Gradient fade overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950/90 via-slate-950/50 to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-4 whitespace-nowrap px-4 min-w-max">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 hover:scale-105 hover:border-primary/50 shrink-0"
                >
                  <span className="text-xl lg:text-2xl">💼</span>
                  <div className="flex items-center gap-2">
                  {/* <Link href={`/services/${service.name.toLowerCase().replace(/\s+/g, '-')}`}> */}
                    <span className="text-orange-400 text-sm lg:text-base font-semibold">
                      {service.name}
                    </span>
                    <span className="text-primary/60 text-xs lg:text-sm">•</span>
                    <span className="text-white text-sm lg:text-sm font-bold">
                      {service.price}
                    </span>
                    {/* </Link> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}

/* --------------- NEW HERO SECTION --------------- */

// "use client";

// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import Link from "next/link";

// export function HeroSection() {
//   const services = [
//     { name: "EIN Services", price: "$50" },
//     { name: "Bookkeeping Services", price: "$120" },
//     { name: "LLC Formation", price: "$420" },
//     { name: "Tax Filing", price: "$90" },
//     { name: "Business Consultation", price: "$60" },
//     { name: "Trademark Registration", price: "$150" },
//     { name: "Operating Agreement", price: "$75" },
//     { name: "Website & Domain Setup", price: "$110" },
//     { name: "Virtual Address", price: "$80" },
//     { name: "Business Bank Setup", price: "$95" },
//     // You can add all 35 here...
//   ];

//   return (
//     <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden -mt-20 pt-20">
//       {/* Background Image */}
//       <div className="absolute inset-0 opacity-100">
//         <img
//           src="/zero-section.png"
//           alt="Entrepreneur working"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Content */}
//       <div className="relative container px-4 py-20 lg:py-32">
//         <div className="max-w-2xl">
//           <div className="mb-6">
//             <span className="inline-block bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm lg:text-md font-medium mb-4">
//               ONE HOME FOR ALL YOUR BUSINESS NEEDS.
//             </span>
//           </div>

//           <h1 className="text-3xl lg:text-6xl font-bold mb-6">
//             Launch Your <br />
//             <span className="text-orange-500">
//               <span className="text-white">Dream</span> Business
//             </span>
//           </h1>

//           <p className="text-xs lg:text-2xl text-gray-300 mb-8">
//             Build Boldly, Protect Wisely, Succeed Easily —{" "}
//             <span className="text-orange-500 font-bold">All in One Place</span>
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 mb-8">
//             <Link href="/start-business">
//               <Button
//                 size="lg"
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-2xl shadow-lg shadow-orange-500/30"
//               >
//                 Get Started
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Scrolling Prices Section */}
//       <div className="relative bg-slate-950/70 py-4 border-t border-orange-500/40 overflow-hidden">
//         <motion.div
//           className="flex gap-10 whitespace-nowrap text-orange-400 text-sm lg:text-lg font-semibold"
//           animate={{ x: ["0%", "-100%"] }}
//           transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
//         >
//           {[...services, ...services].map((service, i) => (
//             <span key={i} className="flex items-center gap-2">
//               💼 {service.name}:{" "}
//               <span className="text-white">{service.price}</span>
//             </span>
//           ))}
//         </motion.div>
//       </div>

//       {/* Feature Icons */}
//       <div className="relative bg-orange-500/5">
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
//             {[
//               { icon: "📋", label: "Formation and Compliance" },
//               { icon: "📊", label: "Banking and Bookkeeping" },
//               { icon: "💡", label: "Tax Advice and Filing" },
//               { icon: "🎯", label: "Expert Customer Support" },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-300"
//               >
//                 <div className="h-12 w-12 lg:h-16 lg:w-16 bg-orange-500/30 rounded-full flex items-center justify-center">
//                   <span className="text-orange-400 text-2xl lg:text-3xl">
//                     {item.icon}
//                   </span>
//                 </div>
//                 <span className="text-xs lg:text-md font-medium text-gray-300">
//                   {item.label}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

