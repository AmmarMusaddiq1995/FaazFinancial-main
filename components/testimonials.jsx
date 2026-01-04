"use client"; // if using app router

import { useEffect } from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import TrustPilotWidget from "./TrustPilotWidget";
import { Button } from "./ui/button";

export default function TestimonialsSection() {
 


  // return (
  
  // );

  /* ------- Updated Testimonials Section ------- */

  const testimonialsData = [
    {
      name: "Bowi Magilse",
      designation: "",
      quote: "They helped me with LLC setup. Quick, easy, transparant, nice and prompt communication. No feedback whatsoever, perfect service. Thanks guys and keep it going 🤙🏽",
      src: "/zohaibsize.png"
    },
    {
      name: "Johnny May",
      designation: "",
      quote: "Working with Zohaib was an absolute pleasure.The entire process was smooth and efficient, and he was always highly responsive to every question I had. His guidance made everything simple and stress-free.I’m extremely satisfied with the level of service provided and would not hesitate to recommend Zohaib to anyone looking for professional, reliable support.",
      src: "/zohaib.png"
    },
    {
      name: "Mehdi Berrahou",
      designation: "",
      quote: "Working with Zohaib was extremely smooth and efficient. He is highly responsive, helped me through all the process and all the questions I had. Excellent service.",
      src: "/zohaib.png"
    },
    {
      name: "Kevin",
      designation: "",
      quote: "10/10 best one out there. Very good service. If you need someone who can keep up with your pace and you want to move fast then I definitely recommend this party because they always replied fast with very helpful information.",
      src: "/zohaib.png"
    },
    {
      name: "JHJ",
      designation: "",
      quote: "Very quick and good service. Helped me out with all my questions.",
      src: "/zohaib.png"
    },
    {
      name: "Duanthy Tjon",
      designation: "",
      quote: "ZOHAIB is great, quick replies, and great service. Would highly recommend, before anyone else.",
      src: "/zohaib.png"
    },
    {
      name: "Mehdi BJ",
      designation: "",
      quote: "Professional service, I definitely recommend!",
      src: "/zohaib.png"
    },
    {
      name: "Team ANDR",
      designation: "",
      quote: "I was recommended FAAZ by another ecom founder in my network and requested his services immediately. The process was very clear, quick and easy. There was a slight hiccup with a banking partner which was a rare case, but even that got handled swiftly! And all that for a sharp investment. Would defintely reccommend 👍🏼",
      src: "/zohaib.png"
    },
    {
      name: "Rut de Letter",
      designation: "",
      quote: "Good personal help.",
      src: "/zohaib.png"
    },
    {
      name: "Sibe Germis",
      designation: "",
      quote: "I’m really pleased with how quickly the company was set up and with the pricing. So far I haven’t encountered any issues and everything is running smoothly.",
      src: "/zohaib.png"
    },
    {
      name: "Niek Wiegand",
      designation: "",
      quote: "Amazing work, great attention to detail. Always willing to help. Would recommend!",
      src: "/zohaib.png"
    },
    {
      name: "Jan",
      designation: "",
      quote: "Great service, great team. Always supporting don’t leave you behind even months later.",
      src: "/zohaib.png"
    },
    
  ];

  useEffect(() => {
    // Initialize Trustpilot after component mounts
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(
        document.getElementsByClassName("trustpilot-widget")[0],
        true
      );
    }
  }, []);

  return (
    <section className="bg-gray-100 py-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-black text-balance text-center">Testimonials</h2>
        <div className="flex justify-center items-center container mx-auto">
            <AnimatedTestimonials testimonials={testimonialsData} autoplay={true} />
        </div>

        <div className="container mx-auto text-center ">
          <Button className="text-white bg-orange-500 rounded-md px-6 py-6 cursor-pointer hover:scale-115 transition-all duration-300">
      <a
        href="https://www.trustpilot.com/review/faazfinancialgroup.com"
        target="_blank"
        rel="noopener noreferrer"
        
      >
        Give us a review on Trustpilot
      </a>
      </Button>
    </div>

     
    </section>


  )
}