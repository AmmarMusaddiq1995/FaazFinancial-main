import {
  Client,
  Environment,
  OrdersController,
} from "@paypal/paypal-server-sdk";
import { supabase } from "@/lib/supabaseClient";

export const runtime = "nodejs";

// PayPal credentials are read server-side only — never expose the secret to the client.
const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
  },
  environment:
    process.env.PAYPAL_API_URL &&
    !process.env.PAYPAL_API_URL.includes("sandbox")
      ? Environment.Production
      : Environment.Sandbox,
});

const ordersController = new OrdersController(client);

export async function POST(req) {
  try {
    const { orderID, form_id } = await req.json();

    if (!orderID || !form_id) {
      return Response.json(
        { error: "Missing orderID or form_id." },
        { status: 400 }
      );
    }

    // SECURITY: capture happens on the server. We never trust the client's claim
    // that payment succeeded — only PayPal's own COMPLETED status promotes the row.
    const { result } = await ordersController.captureOrder({
      id: orderID,
      prefer: "return=representation",
    });

    const capture = result?.purchaseUnits?.[0]?.payments?.captures?.[0];
    const completed =
      result?.status === "COMPLETED" && capture?.status === "COMPLETED";

    if (!completed) {
      // Leave the row untouched — payment_status stays "pending".
      return Response.json(
        { error: "Payment not completed.", status: result?.status },
        { status: 402 }
      );
    }

    // Match the Stripe success shape (app/successfully-paid/page.jsx):
    // status "in-progress", payment_status "paid", payment_id set.
    // Do NOT overwrite `amount` — it stays the pre-fee price, exactly like Stripe.
    const { error } = await supabase
      .from("form_submissions")
      .update({
        status: "in-progress",
        payment_status: "paid",
        payment_id: capture.id,
        payment_method: "paypal",
      })
      .eq("id", form_id);

    if (error) {
      console.error("Supabase update error after PayPal capture:", error);
      return Response.json(
        { error: "Payment captured but failed to update the record." },
        { status: 500 }
      );
    }

    return Response.json(
      { status: "COMPLETED", captureId: capture.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("PayPal capture-order error:", error);
    return Response.json(
      { error: "Failed to capture PayPal order." },
      { status: 500 }
    );
  }
}
