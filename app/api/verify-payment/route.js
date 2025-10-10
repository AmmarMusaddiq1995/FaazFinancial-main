import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId)
    return new Response(JSON.stringify({ error: "Missing session_id" }), {
      status: 400,
    });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    const form_id = session.metadata?.form_id;
    const payment_status = session.payment_status;
    const amount_total = session.amount_total;

    return new Response(
      JSON.stringify({
        id: session.id,
        form_id,
        payment_status,
        amount_total,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Stripe verify error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
