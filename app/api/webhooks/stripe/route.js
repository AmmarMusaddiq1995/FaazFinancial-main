/* --------- updated code --------- */


import Stripe from "stripe";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;

  try {
    const body = await req.text();
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;

        const {
          id: payment_id,
          amount,
          currency,
          status,
          metadata,
        } = paymentIntent;

        // ✅ Ensure metadata has form_id (you should set this when creating the session)
        const form_id = metadata?.form_id;

        if (!form_id) {
          console.error("❌ Missing form_id in metadata");
          break;
        }

        console.log(`✅ Payment succeeded for form_id: ${form_id}`);

        // 💾 Update form_submissions table
        const { error } = await supabase
          .from("form_submissions")
          .update({
            status: "in-progress",
            payment_status: status, // e.g. "succeeded"
            payment_id,             // Stripe payment intent ID
            amount: amount / 100,   // convert cents to dollars
                // optional: your business logic
          })
          .eq("id", form_id);

        if (error) {
          console.error("❌ Supabase update error:", error);
        } else {
          console.log(`✅ Form submission ${form_id} updated successfully`);
        }

        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("✅ Checkout completed:", session.id);
        console.log("Session metadata:", session.metadata);
        break;
      }

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    return new NextResponse("OK", { status: 200 });
  } catch (err) {
    console.error("❌ Webhook processing error:", err);
    return new NextResponse("Webhook error", { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

