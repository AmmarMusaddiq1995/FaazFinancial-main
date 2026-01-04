"use client";

import { useEffect } from "react";

export default function TrustPilotWidget() {
  useEffect(() => {
    if (window.Trustpilot) {
      window.Trustpilot.loadFromElement(
        document.querySelector(".trustpilot-widget"),
        true
      );
    }
  }, []);

  return (
    <div
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="690a5208a3d8694b128bda0"
      data-style-height="52px"
      data-style-width="100%"
      data-token="d26828ba-9536-4994-bfd8-fd05ed061ee"
    >
      <a
        href="https://www.trustpilot.com/review/faazfinancialgroup.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-black"
      >
        Trustpilot
      </a>
    </div>
  );
}
