"use client"; // if using app router

import { useEffect } from "react";

export default function TestimonialsSection() {
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
    <div
    className="trustpilot-widget container mx-auto py-10"
    data-locale="en-US"
    data-template-id="56278e9abfbbba0bdcd568bc"
    data-businessunit-id="690a5208a3d83694b128bda0"
    data-style-height="52px"
    data-style-width="100%"
    data-token="570f9ed5-412b-4a40-856e-abfabef3cd7b"
  >
    <a
      href="https://www.trustpilot.com/review/faazfinancialgroup.com"
      target="_blank"
      rel="noopener"
    >
      Read Reviews
    </a>
  </div>
  );
}