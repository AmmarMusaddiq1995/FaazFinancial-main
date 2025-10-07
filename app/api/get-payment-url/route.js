import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { amount, form_id } = await req.json();

  console.log(amount, form_id);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Custom Payment",
          },
          unit_amount: amount * 100, // convert $50 → 5000 cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`, // app k siblin folder bny hoga
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
  });

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
