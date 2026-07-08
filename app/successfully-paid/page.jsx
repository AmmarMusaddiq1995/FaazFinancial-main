"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  CARD_FEE_LABEL,
  CARD_FEE_RATE,
} from "@/components/submission-forms/form-wizard";

const usd = (n) => `$${Number(n).toFixed(2)}`;

/* The receipt must show the same numbers as the form's price breakdown:
   Order Amount = the pre-fee price stored in form_submissions.amount,
   Card Fee = what Stripe actually charged minus that base,
   Total = Stripe's amount_total. Recomputing the fee from the total
   (total × 4.5%) taxes the fee itself and drifts from the form. */

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const run = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) {
        setErrorText("Missing session. If you completed payment, it may still be processing.");
        setLoading(false);
        return;
      }

      try {
        // Verify with the server (talks to Stripe securely)
        const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await res.json();

        if (res.ok && data?.form_id) {
          const paid =
            data.payment_status === "paid" || data.payment_status === "succeeded";

          // Pre-fee price + service name, straight from the submission row
          const { data: submission } = await supabase
            .from("form_submissions")
            .select("amount, service_name")
            .eq("id", data.form_id)
            .maybeSingle();

          // `amount` stays the pre-fee price (see README "Card processing fee") —
          // never overwrite it with the charged total, or the fee breakdown and
          // any future re-charge would be computed from the wrong base.
          await supabase
            .from("form_submissions")
            .update({
              payment_status: data.payment_status,
              payment_id: data.payment_intent_id || null,
              ...(paid ? { status: "in-progress" } : {}),
            })
            .eq("id", data.form_id);

          const total = (data.amount_total ?? 0) / 100;
          let baseAmount = Number(submission?.amount);
          if (!baseAmount || baseAmount >= total) {
            // Legacy rows had `amount` overwritten with the charged total —
            // reverse the whole-dollar round-up used at charge time instead.
            baseAmount = Math.floor(total / (1 + CARD_FEE_RATE) + 1e-9);
          }

          setDetails({
            ...data,
            paid,
            total,
            baseAmount,
            cardFee: total - baseAmount,
            serviceName: submission?.service_name,
          });
        } else {
          setErrorText(data?.error || "Unable to verify payment.");
        }
      } catch (e) {
        setErrorText("Failed to verify payment.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Verifying your payment...</p>
      </div>
    );
  }

  const failed = errorText || !details?.paid;

  return (
    <div>
      <Header />
      <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">
        <div className="w-full max-w-lg rounded-3xl border border-green-100 bg-white p-6 sm:p-10 text-center shadow-2xl shadow-green-900/5">
          <div className="flex justify-center mb-6">
            <div
              className={`rounded-full p-4 ${failed ? "bg-rose-50" : "bg-green-50"}`}
            >
              {failed ? (
                <XCircle className="h-14 w-14 text-rose-500" />
              ) : (
                <CheckCircle className="h-14 w-14 text-green-600" />
              )}
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {failed ? "Payment Not Confirmed" : "Payment Successful 🎉"}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-8">
            {errorText ||
              (failed
                ? "Your payment hasn't been confirmed yet. If you completed checkout, refresh this page in a minute."
                : "Your payment has been processed successfully. Thank you for choosing Faaz Financial Group.")}
          </p>

          {details && (
            <div className="mb-8 rounded-2xl border bg-gray-50/70 p-5 text-left">
              {details.serviceName && (
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-semibold text-gray-800">
                    {details.serviceName}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      details.paid
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {details.payment_status.charAt(0).toUpperCase() +
                      details.payment_status.slice(1)}
                  </span>
                </div>
              )}

              <div className="space-y-1.5 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span>Order Amount:</span>
                  <span>{usd(details.baseAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Card Processing Fee ({CARD_FEE_LABEL}):</span>
                  <span>{usd(details.cardFee)}</span>
                </div>
                <hr className="my-2 border-gray-200" />
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total Paid:</span>
                  <span className="font-bold text-primary">{usd(details.total)}</span>
                </div>
              </div>

              <div className="mt-4 space-y-1.5 border-t border-dashed border-gray-200 pt-3 text-xs text-muted-foreground">
                <div className="flex items-center justify-between gap-4">
                  <span className="shrink-0">Order Reference</span>
                  <span className="truncate font-mono" title={details.form_id}>
                    {details.form_id}
                  </span>
                </div>
                {details.payment_intent_id && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="shrink-0">Payment ID</span>
                    <span
                      className="truncate font-mono"
                      title={details.payment_intent_id}
                    >
                      {details.payment_intent_id}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <Button
            className="h-11 w-full sm:w-auto cursor-pointer rounded-full px-8 text-base shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-10 text-gray-500">Loading...</div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}

// ✅ Disable pre-rendering (fix for Vercel)
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
