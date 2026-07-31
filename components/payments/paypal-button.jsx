"use client";

import { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

// Only the public client-id is exposed to the browser — the secret stays server-side
// in the create-order / capture-order routes.
const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

/**
 * PayPal checkout for a single pending submission. Mirrors the Stripe total
 * (the fee is applied server-side in /api/paypal/create-order), captures on the
 * server, and — unlike the Stripe path — never touches /successfully-paid,
 * which is Stripe-session specific.
 */
export function PayPalButton({ formId, amount }) {
  const [processing, setProcessing] = useState(false);

  if (!clientId) {
    // Misconfiguration guard — don't render a broken button.
    return null;
  }

  const createOrder = async () => {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form_id: formId, amount }),
    });
    const data = await res.json();
    if (!res.ok || !data.orderID) {
      throw new Error(data.error || "Could not start PayPal checkout.");
    }
    return data.orderID;
  };

  const onApprove = async (data) => {
    setProcessing(true);
    try {
      const res = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID, form_id: formId }),
      });
      const result = await res.json();

      if (!res.ok || result.status !== "COMPLETED") {
        // Row stays untouched (payment_status "pending") — server only promotes
        // on a confirmed capture.
        throw new Error(result.error || "Payment could not be confirmed.");
      }

      toast.success("Payment successful! Updating your dashboard…");
      // Full navigation so the dashboard re-fetches and reflects the paid status.
      window.location.assign("/dashboard");
    } catch (err) {
      toast.error(err.message || "Something went wrong with your payment.");
      setProcessing(false);
    }
  };

  return (
    <div className="relative w-full">
      {processing && (
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 rounded-md bg-white/70 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Confirming payment…
        </div>
      )}
      <PayPalScriptProvider
        options={{
          clientId,
          currency: "USD",
          intent: "capture",
          // Hide the "Pay Later" funding button — card + PayPal only.
          disableFunding: "paylater",
        }}
      >
        <PayPalButtons
          style={{ layout: "horizontal", height: 40, tagline: false }}
          disabled={processing}
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={() =>
            toast("Payment cancelled — you can try again anytime.")
          }
          onError={() =>
            toast.error("PayPal ran into an error. Please try again.")
          }
        />
      </PayPalScriptProvider>
    </div>
  );
}
