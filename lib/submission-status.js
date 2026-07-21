// Derives a submission's display status from payment truth rather than the raw
// `status` column, which can go stale when checkout is abandoned.
// Checkout sessions report "paid"; payment_intent webhooks report "succeeded".
export function getEffectiveStatus(s) {
  if ((s?.status || "").toLowerCase() === "completed") return "completed";
  if (s?.payment_status === "paid" || s?.payment_status === "succeeded")
    return "in-progress";
  return "pending";
}
