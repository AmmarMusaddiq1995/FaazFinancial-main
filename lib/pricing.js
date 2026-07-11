/* ── Card processing fee (applied on top of the service price) ──
   Single source of truth for the fee shown in the form wizard's price
   breakdown, the dashboard modals, and the amount charged in
   app/api/get-payment-url/route.js. `form_submissions.amount` stores the
   pre-fee price; use totalWithCardFee() whenever displaying what the
   client actually pays. */
export const CARD_FEE_RATE = 0.045;
export const CARD_FEE_LABEL = "4.5%";
export const cardFeeAmount = (price) => Math.ceil(price * CARD_FEE_RATE);
export const totalWithCardFee = (price) => Math.ceil(price * (1 + CARD_FEE_RATE));
