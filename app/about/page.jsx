// import { Header } from "@/components/header";
// import { Footer } from "@/components/footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Users, Award, Shield, Clock } from "lucide-react";

// export default function AboutPage() {
//   const stats = [
//     { number: "200K+", label: "Businesses Formed" },
//     { number: "5+", label: "Years Experience" },
//     { number: "50", label: "States Covered" },
//     { number: "4.8/5", label: "Customer Rating" },
//   ];

//   const values = [
//     {
//       icon: Shield,
//       title: "Trust & Security",
//       description:
//         "Your business information is protected with bank-level security and confidentiality.",
//     },
//     {
//       icon: Users,
//       title: "Expert Support",
//       description:
//         "Our team of business formation experts is here to guide you every step of the way.",
//     },
//     {
//       icon: Clock,
//       title: "Fast & Reliable",
//       description:
//         "Quick turnaround times without compromising on quality or accuracy.",
//     },
//     {
//       icon: Award,
//       title: "Proven Results",
//       description:
//         "Thousands of successful business formations and satisfied customers.",
//     },
//   ];

//   return (
//     <div className="min-h-screen">
//       <Header />
//       <main>
//         {/* Hero Section */}
//         <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto text-center">
//               <Badge className="mb-4 bg-primary text-white font-bold">
//                 About Faaz Financial Group LLC
//               </Badge>
//               <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
//                 Simplifying <span className="text-orange-500">Business Formation</span> Since 2019
//               </h1>
//               <p className="text-xl text-gray-600 mb-8 text-pretty">
//                 We believe starting a business should be simple, affordable, and
//                 stress-free. That's why we've helped over 200,000 entrepreneurs
//                 turn their dreams into reality.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//               {stats.map((stat, index) => (
//                 <div key={index} className="text-center">
//                   <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
//                     {stat.number}
//                   </div>
//                   <div className="text-gray-600">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Story Section */}
//         <section className="py-20">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto">
//               <div className="grid md:grid-cols-2 gap-12 items-center">
//                 <div>
//                   <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                     Our Story
//                   </h2>
//                   <p className="text-gray-600 mb-6">
//                     Founded in 2019, FaazFinancialGroup was born from a simple
//                     idea: business formation should be accessible to everyone,
//                     not just those who can afford expensive lawyers.
//                   </p>
//                   <p className="text-gray-600 mb-6">
//                     What started as a small team helping local entrepreneurs has
//                     grown into a trusted platform serving businesses across all
//                     50 states. We've streamlined the complex process of business
//                     formation, making it simple, affordable, and transparent.
//                   </p>
//                   <p className="text-gray-600">
//                     Today, we're proud to be the go-to choice for entrepreneurs
//                     who want to focus on building their business, not navigating
//                     bureaucracy.
//                   </p>
//                 </div>
//                 <div className="relative">
//                   <img
//                     src="/modern-office-collaboration.png"
//                     alt="FaazFinancialGroup team"
//                     className="rounded-lg shadow-lg"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Values Section */}
//         <section className="py-20 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Our Values
//               </h2>
//               <p className="text-xl text-gray-600">
//                 The principles that guide everything we do
//               </p>
//             </div>
//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {values.map((value, index) => (
//                 <Card key={index} className="text-center">
//                   <CardContent className="pt-6">
//                     <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
//                     <h3 className="text-xl font-semibold mb-3">
//                       {value.title}
//                     </h3>
//                     <p className="text-gray-600">{value.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Team Section */}
//         <section className="py-20">
//           <div className="container mx-auto px-4">
//             <div className="max-w-4xl mx-auto text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Meet Our Leadership Team
//               </h2>
//               <p className="text-xl text-gray-600">
//                 Experienced professionals dedicated to your success
//               </p>
//             </div>
//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 {
//                   name: "Zoaib Aziz",
//                   role: "CEO & Founder",
//                   image: "professional woman executive",
//                 },
//                 {
//                   name: "Zaid Aslam",
//                   role: "CTO",
//                   image: "professional man technology leader",
//                 },
//                 {
//                   name: "Haseeb Aslam",
//                   role: "Head of Customer Success",
//                   image: "professional woman customer service",
//                 },
//               ].map((member, index) => (
//                 <Card key={index} className="text-center">
//                   <CardContent className="pt-6">
//                     <img
//                       src={`/abstract-geometric-shapes.png?height=200&width=200&query=${member.image}`}
//                       alt={member.name}
//                       className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
//                     />
//                     <h3 className="text-xl font-semibold mb-2">
//                       {member.name}
//                     </h3>
//                     <p className="text-primary font-medium">{member.role}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="bg-gray-900 text-white py-20">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               Ready to <span className="text-orange-500">Join Our Success Stories?</span>
//             </h2>
//             <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
//               Let us help you start your business journey with confidence.
//             </p>
//             <Button size="lg" className="bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground px-8 py-4 text-lg">
//               Start Your Business Today
//             </Button>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }


/* ----------- Updated code with new frontend  ----------- */


import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Layers, Target } from "lucide-react";
import { CardBody , CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import WorldMap from "@/components/ui/world-map";
import {motion} from "motion/react";

export default function AboutPage() {
  const stats = [
    { number: "5+", label: "Years of Expertise" },
    { number: "200k+", label: "Clients Served" },
    { number: "2", label: "Countries (USA & UK)" },
    { number: "99%", label: "Client Satisfaction" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity & Trust",
      description:
        "We protect your business and financial data with the highest level of security and confidentiality.",
    },
    {
      icon: Users,
      title: "Client-Centric Approach",
      description:
        "Every entrepreneur we work with is a partner in success. Your goals are our mission.",
    },
    {
      icon: Layers,
      title: "Comprehensive Solutions",
      description:
        "From formation to financial management and tax compliance — we provide everything under one roof.",
    },
    {
      icon: Target,
      title: "Results That Matter",
      description:
        "We focus on precision, efficiency, and long-term success, so you can focus on innovation and growth.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-linear-to-br from-primary/10 to-primary/5 py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-primary text-white font-bold">
              About FAAZ Financial Group LLC
            </Badge>
            {/* <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Your Partner in <span className="text-orange-500">Business Growth & Compliance</span>
            </h1> */}
             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
                 Simplifying <span className="text-orange-500">Business Formation </span>
                 Since 2019
               </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-pretty">
              At <strong>FAAZ Financial Group LLC</strong>, we are more than just a service provider—
              we are the silent architects behind thriving businesses. From company formation and
              bookkeeping to tax, payroll, and compliance, we empower startups and small businesses
              to focus on what truly matters—innovation and growth.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center items-center mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-primary/20 w-40 h-40 rounded-full mx-auto" >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 flex flex-col items-center justify-center h-full">
                    {stat.number}
                    <span className="text-gray-600 font-medium text-sm">{stat.label}</span>
                  </div>
                  {/* <div className="text-gray-600 flex items-center justify-center h-full">{stat.label}</div> */}
                </div>
              ))}
            </div>
          </div>
        </section>

                {/* Team Section */}
         {/* Values Section */}
         {/* <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center w-full">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Leadership Team
              </h2>
              <p className="text-xl text-gray-600">
                Experienced professionals dedicated to your success
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mx-auto -mt-10 ">

            <CardContainer className=" w-full">
      <CardBody className="bg-gray-50 relative group/card border rounded-xl shadow-md hover:shadow-xl shadow-primary transition-all duration-300  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  w-auto sm:w-[30rem] h-auto  p-6   ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Mr. Zohaib Zia
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <strong>CEO</strong> of FAAZ Financial Group LLC
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="/zohaib.png"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:bg-primary hover:text-white"
          >
             Visit LinkedIn →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-primary hover:text-white"
          >
              Facebook
          </CardItem>
        </div>
      </CardBody>
            </CardContainer>

            <CardContainer className=" w-full">
      <CardBody className="bg-gray-50 relative group/card border rounded-xl shadow-md hover:shadow-xl shadow-primary transition-all duration-300 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  w-auto sm:w-[30rem] h-auto p-6   ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Mr. Zohaib Zia
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <strong>CEO</strong> of FAAZ Financial Group LLC
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="/zohaib.png"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:bg-primary hover:text-white"
          >
             Visit LinkedIn →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-primary hover:text-white"
          >
              Facebook
          </CardItem>
        </div>
      </CardBody>
            </CardContainer>


            <CardContainer className=" w-full">
      <CardBody className="bg-gray-50 relative group/card border rounded-xl shadow-md hover:shadow-xl shadow-primary transition-all duration-300  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  w-auto sm:w-[30rem] h-auto p-6   ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Mr. Zohaib Zia
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <strong>CEO</strong> of FAAZ Financial Group LLC
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="/zohaib.png"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:bg-primary hover:text-white"
          >
             Visit LinkedIn →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-primary hover:text-white"
          >
              Facebook
          </CardItem>
        </div>
      </CardBody>
            </CardContainer>


            <CardContainer className=" w-full">
      <CardBody className="bg-gray-50 relative group/card border rounded-xl shadow-md hover:shadow-xl shadow-primary transition-all duration-300  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  w-auto sm:w-[30rem] h-auto p-6   ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Mr. Zohaib Zia
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          <strong>CEO</strong> of FAAZ Financial Group LLC
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="/zohaib.png"
            height="900"
            width="900"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as="a"
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:bg-primary hover:text-white"
          >
             Visit LinkedIn →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold hover:bg-primary hover:text-white"
          >
              Facebook
          </CardItem>
        </div>
      </CardBody>
            </CardContainer>
             
            </div>
          </div>
        </section> */}

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  <span className="text-orange-500">Our Story:</span> From Insight to Innovation
                </h2>
                <p className="text-gray-600 mb-6">
                  With over <strong className="text-orange-500">5 years+ of hands-on experience</strong> in business formations,
                  accounting, bookkeeping, payroll management, and compliance, our founder
                  recognized a recurring problem—entrepreneurs juggling multiple providers for
                  essential services. The result? Wasted time, miscommunications, and lost focus.
                </p>
                <p className="text-gray-600 mb-6">
                  That’s when <strong className="text-orange-500">FAAZ Financial Group LLC</strong> was born—a unified solution
                  that brings everything under one roof. We help founders form, manage, and grow
                  their businesses through our <strong className="text-orange-500">Compliance Concierge Model</strong>, ensuring
                  everything runs smoothly behind the scenes.
                </p>
                <p className="text-gray-600">
                  We’re not just experts—we’re partners in your success story. Let’s simplify your
                  business journey and build something extraordinary together.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/modern-office-collaboration.png"
                  alt="FAAZ Financial Group team"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Us?
              </h2>
              <p className="text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center shadow-md hover:shadow-lg transition">
                  <CardContent className="pt-6">
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Availability Section */}
        <section className="py-20 mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">Our Global Reach</h2>
          <p className="text-gray-600 text-center mb-6">
            We serve our clients across the globe to provide them with the compliance and formation services mainly in USA and UK.
          </p>
          <div className="container mx-auto w-full">
          <WorldMap
        dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            
            }, // Alaska (Fairbanks)
            end: {
              lat: 34.0522,
              lng: -118.2437,
            }, // Los Angeles
            
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
          </div>
        </section>





        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-20 border-b border-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Simplify <span className="text-orange-500">Your Business Journey?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              FAAZ Financial Group LLC is your trusted partner for formation, accounting, payroll,
              and compliance. Let’s handle the details while you build your dream.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary/90 hover:scale-115 transition-all duration-300 cursor-pointer text-primary-foreground px-8 py-4 text-lg hover:text-white"
            >
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

