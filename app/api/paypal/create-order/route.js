import {
  Client,
  Environment,
  OrdersController,
} from "@paypal/paypal-server-sdk";

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
    const { form_id, amount } = await req.json();

    if (!form_id || amount == null) {
      return Response.json(
        { error: "Missing form_id or amount." },
        { status: 400 }
      );
    }

    // Charge the SAME total, with the SAME rounding, as the Stripe path in
    // app/api/get-payment-url/route.js. The 4.5% card fee is duplicated in
    // several places by design (see totalWithCardFee in form-wizard.jsx) — if
    // that rate ever changes, update it here AND in get-payment-url in lockstep.
    const totalAmountWithTax = Math.ceil(amount + amount * 0.045);

    const { result } = await ordersController.createOrder({
      body: {
        intent: "CAPTURE",
        purchaseUnits: [
          {
            // Stash form_id so capture-order can tie the payment back to the row.
            customId: String(form_id),
            amount: {
              currencyCode: "USD",
              value: totalAmountWithTax.toFixed(2),
            },
          },
        ],
      },
      prefer: "return=representation",
    });

    return Response.json({ orderID: result.id }, { status: 200 });
  } catch (error) {
    console.error("PayPal create-order error:", error);
    return Response.json(
      { error: "Failed to create PayPal order." },
      { status: 500 }
    );
  }
}
