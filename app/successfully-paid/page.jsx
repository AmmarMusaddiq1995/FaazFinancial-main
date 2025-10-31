"use client";


// import { useRouter } from "next/navigation";
// export default function SuccessfullyPaid() {
//   const router = useRouter();
//   return (
//   <div>
    
//     Successfully Paid
//     <div>

//     <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer" onClick={() => router.push("/dashboard")}>Go to Dashboard</button>
//     </div>
  

//     </div>
//   )
// }

// "use client";

// import { Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";



//   function PaymentSuccessContent() {

//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const paymentId = searchParams.get("payment_intent");


//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
//       <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border border-green-100">
//         <div className="flex justify-center mb-6">
//           <div className="bg-orange-100 p-4 rounded-full">
//             <CheckCircle className="h-16 w-16 text-orange-600" />
//           </div>
//         </div>

//         <h1 className="text-3xl font-bold text-green-700 mb-2">
//           Payment Successful 🎉
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Your payment has been processed successfully.  
//           Thank you for choosing our service.
//         </p>

//         <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6">
//           <div className="flex justify-between text-gray-700 mb-2">
//             <span className="font-medium">Payment ID:</span>
//             <span className="text-gray-600 truncate max-w-[200px]">
//               {paymentId || "pi_3JXh7ZabcXYZ"}
//             </span>
//           </div>
//           <div className="flex justify-between text-gray-700 mb-2">
//             <span className="font-medium">Amount:</span>
//             <span className="text-orange-600 font-semibold">$299.00</span>
//           </div>
//           <div className="flex justify-between text-gray-700">
//             <span className="font-medium">Status:</span>
//             <span className="text-orange-600 font-semibold">Paid</span>
//           </div>
//         </div>

//         <Button
//           className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg transition-all shadow-md hover:shadow-lg"
//           onClick={() => router.push("/dashboard")}
//         >
//           Go to Dashboard
//         </Button>

//         <p className="text-sm text-gray-500 mt-6">
//           Having trouble?{" "}
//           <a href="/contact" className="text-orange-600 hover:underline">
//             Contact Support
//           </a>
//         </p>
//       </div>
//       </div>)}

// export default function PaymentSuccess() {
//   return (
//     <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading...</div>}>
//       <PaymentSuccessContent />
//     </Suspense>
//   );

// }

// "use client";

// import { Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";

// function PaymentSuccessContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const paymentId = searchParams.get("payment_intent");

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
//       <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border border-green-100">
//         <div className="flex justify-center mb-6">
//           <div className="bg-orange-100 p-4 rounded-full">
//             <CheckCircle className="h-16 w-16 text-orange-600" />
//           </div>
//         </div>

//         <h1 className="text-3xl font-bold text-green-700 mb-2">
//           Payment Successful 🎉
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Your payment has been processed successfully.  
//           Thank you for choosing our service.
//         </p>

//         <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6">
//           <div className="flex justify-between text-gray-700 mb-2">
//             <span className="font-medium">Payment ID:</span>
//             <span className="text-gray-600 truncate max-w-[200px]">
//               {paymentId || "pi_3JXh7ZabcXYZ"}
//             </span>
//           </div>
//           <div className="flex justify-between text-gray-700 mb-2">
//             <span className="font-medium">Amount:</span>
//             <span className="text-orange-600 font-semibold">$299.00</span>
//           </div>
//           <div className="flex justify-between text-gray-700">
//             <span className="font-medium">Status:</span>
//             <span className="text-orange-600 font-semibold">Paid</span>
//           </div>
//         </div>

//         <Button
//           className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg transition-all shadow-md hover:shadow-lg"
//           onClick={() => router.push("/dashboard")}
//         >
//           Go to Dashboard
//         </Button>

//         <p className="text-sm text-gray-500 mt-6">
//           Having trouble?{" "}
//           <a href="/contact" className="text-orange-600 hover:underline">
//             Contact Support
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function PaymentSuccess() {
//   return (
//     <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading...</div>}>
//       <PaymentSuccessContent />
//     </Suspense>
//   );
// }
/------------------------------------------/



import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

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
        // Verify with server (talks to Stripe securely)
        const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await res.json();
        console.log("data coming from stripe api session",data);
        if (res.ok && data?.form_id) {
          // Update Supabase row
          console.log("data coming from supabase",data);
          await supabase
            .from("form_submissions")
            .update({
              payment_status: data.payment_status,
              payment_id: data.payment_intent_id || null,
              amount: data.amount_total ? data.amount_total / 100 : null,
              status: data.payment_status === "paid" || data.payment_status === "succeeded" ? "in-progress" : undefined,
            })
            .eq("id", data.form_id);

          setDetails(data);
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
        <Loader2 className="h-10 w-10 text-orange-600 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl text-center border border-green-100">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full">
            <CheckCircle className="h-16 w-16 text-orange-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-2">
          {errorText ? "Payment Verification" : "Payment Successful 🎉"}
        </h1>
        <p className="text-gray-600 mb-6">
          {errorText || "Your payment has been processed successfully. Thank you for choosing our service."}
        </p>

        {details && (
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6 text-left">
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="font-medium">Order Amount:</span>
              <span className="text-orange-600 font-semibold">${Math.round((details.amount_total / 100)-(details.amount_total / 100) * 0.03).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="font-medium">Card Fee (3%):</span>
              <span className="text-orange-600 font-semibold">${Math.round((details.amount_total / 100) * 0.03).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="font-medium">Total Amount:</span>
              <span className="text-orange-600 font-semibold">${Math.round(details.amount_total / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="font-medium">Status:</span>
              <span className="text-orange-600 font-semibold">{details.payment_status.charAt(0).toUpperCase() + details.payment_status.slice(1)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="font-medium">Form ID:</span>
              <span className="text-orange-600 font-semibold">{details.form_id}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span className="font-medium">Payment ID:</span>
              <span className="text-orange-600 font-semibold">{details.payment_intent_id}</span>
            </div>
          </div>
        )}

        <Button
          className="bg-primary hover:bg-primary/80 cursor-pointer text-white rounded-full px-8 py-3 text-lg transition-all shadow-md hover:shadow-lg"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

// ✅ Disable pre-rendering (fix for Vercel)
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/* -------- Latest code with backend logic -------- */


// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { CheckCircle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/lib/supabaseClient";

// function PaymentSuccessContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [paymentId, setPaymentId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [paymentData, setPaymentData] = useState(null);

//   useEffect(() => {
//     const fetchAndUpdatePayment = async () => {
//       const paymentIntentId = searchParams.get("payment_intent");
//       if (!paymentIntentId){
//        setLoading(false);
//         return;
//       }  

//       setPaymentId(paymentIntentId);

//       try {
//         // 1️⃣ Fetch record that matches payment_id (if your webhook hasn’t filled it yet)
//         const { data: existingRecord, error: fetchError } = await supabase
//           .from("form_submissions")
//           .select("*")
//           .eq("payment_id", paymentIntentId)
//           .maybeSingle();

//         if (fetchError) console.error("Fetch error:", fetchError);

//         let updatedData = existingRecord;

//         // 2️⃣ If record exists, mark payment as successful
//         if (existingRecord) {
//           const { error: updateError } = await supabase
//             .from("form_submissions")
//             .update({
//               payment_status: "paid",
//               status: "completed",
//             })
//             .eq("id", existingRecord.id);

//           if (updateError) console.error("Update error:", updateError);

//           setPaymentData({
//             ...existingRecord,
//             payment_status: "paid",
//             status: "completed",
//           });
//         } else {
//           // 3️⃣ If no record found (fallback)
//           console.warn("No matching form_submissions found for:", paymentIntentId);
//         }
//       } catch (err) {
//         console.error("Error in payment success logic:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAndUpdatePayment();
//   }, [searchParams]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
//         Verifying your payment...
//       </div>
//     );
//   }

  
//   // ⚠️ If no payment data found
//   if (!paymentData) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
//         <h1 className="text-2xl font-semibold text-gray-800 mb-2">
//           Payment Verified
//         </h1>
//         <p className="text-gray-600 mb-4">
//           We couldn’t find your payment details, but your transaction may still be processing.
//         </p>
//         <Button onClick={() => router.push("/contact")} className="bg-green-600 hover:bg-green-700 text-white">
//           Contact Support
//         </Button>
//       </div>
//     );
//   }


//     // ✅ Main Success Screen

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
//       <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border border-green-100">
//         <div className="flex justify-center mb-6">
//           <div className="bg-orange-100 p-4 rounded-full">
//             <CheckCircle className="h-16 w-16 text-orange-600" />
//           </div>
//         </div>

//         <h1 className="text-3xl font-bold text-green-700 mb-2">
//           Payment Successful 🎉
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Your payment has been processed successfully.  
//           Thank you for choosing our service.
//         </p>

//         <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6 text-left">
//           <div className="flex justify-between text-gray-700 mb-2">
//             <span className="font-medium">Payment ID:</span>
//             <span className="text-gray-600 truncate max-w-[200px]">
//               {paymentId || "N/A"}
//             </span>
//           </div>
//           <div className="flex justify-between text-gray-700 mb-2">
//             <span className="font-medium">Amount:</span>
//             <span className="text-orange-600 font-semibold">
//               ${paymentData?.amount || "299.00"}
//             </span>
//           </div>
//           <div className="flex justify-between text-gray-700 mb-2">
//             <span className="font-medium">Service:</span>
//             <span>{paymentData?.service_name || "Business Formation"}</span>
//           </div>
//           <div className="flex justify-between text-gray-700">
//             <span className="font-medium">Status:</span>
//             <span className="text-orange-600 font-semibold">
//               {paymentData?.payment_status || "Paid"}
//             </span>
//           </div>
//         </div>

//         <Button
//           className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg transition-all shadow-md hover:shadow-lg"
//           onClick={() => router.push("/dashboard")}
//         >
//           Go to Dashboard
//         </Button>

//         <p className="text-sm text-gray-500 mt-6">
//           Having trouble?{" "}
//           <a href="/contact" className="text-orange-600 hover:underline">
//             Contact Support
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function PaymentSuccess() {
//   return (
//     <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading...</div>}>
//       <PaymentSuccessContent />
//     </Suspense>
//   );
// }

// // ✅ Prevent static rendering on Vercel
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";


/* -------- More enhanced Code -------- */




// import { useEffect, useState, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { CheckCircle, Loader2, XCircle } from "lucide-react";
// import { supabase } from "@/lib/supabaseClient";
// import { Button } from "@/components/ui/button";

// function PaymentSuccessContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const paymentId = searchParams.get("payment_intent");
//   const [status, setStatus] = useState("loading");
//   const [paymentData, setPaymentData] = useState(null);

//   useEffect(() => {
//     const verifyPayment = async () => {
//       if (!paymentId) return;

//       // 🔍 Try to find the record using the payment_id stored from webhook
//       const { data, error } = await supabase
//         .from("form_submissions")
//         .select("*")
//         .eq("payment_id", paymentId)
//         .single();

//       if (error || !data) {
//         console.error("Payment not found:", error);
//         setStatus("notfound");
//         return;
//       }

//       // ✅ Update payment_status if needed
//       if (data.payment_status !== "paid") {
//         await supabase
//           .from("form_submissions")
//           .update({ payment_status: "paid" })
//           .eq("payment_id", paymentId);
//       }

//       setPaymentData(data);
//       setStatus("success");
//     };

//     verifyPayment();
//   }, [paymentId]);

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50">
//         <Loader2 className="h-10 w-10 text-orange-600 animate-spin mb-4" />
//         <p className="text-gray-600 text-lg">Verifying your payment...</p>
//       </div>
//     );
//   }

//   if (status === "notfound") {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-white to-rose-50">
//         <XCircle className="h-16 w-16 text-red-500 mb-4" />
//         <h1 className="text-2xl font-semibold text-red-600 mb-2">Payment Verification</h1>
//         <p className="text-gray-600 max-w-md text-center">
//           We couldn’t find your payment details, but your transaction may still be processing.
//           Please refresh after a minute or contact support if the issue persists.
//         </p>
//         <Button className="mt-6" onClick={() => router.push("/")}>
//           Go Home
//         </Button>
//       </div>
//     );
//   }

//   if (status === "success" && paymentData) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
//         <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border border-green-100">
//           <div className="flex justify-center mb-6">
//             <div className="bg-orange-100 p-4 rounded-full">
//               <CheckCircle className="h-16 w-16 text-orange-600" />
//             </div>
//           </div>

//           <h1 className="text-3xl font-bold text-green-700 mb-2">
//             Payment Successful 🎉
//           </h1>
//           <p className="text-gray-600 mb-6">
//             Your payment has been processed successfully. Thank you for choosing our service.
//           </p>

//           <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6">
//             <div className="flex justify-between text-gray-700 mb-2">
//               <span className="font-medium">Payment ID:</span>
//               <span className="text-gray-600 truncate max-w-[200px]">
//                 {paymentId}
//               </span>
//             </div>
//             <div className="flex justify-between text-gray-700 mb-2">
//               <span className="font-medium">Amount:</span>
//               <span className="text-orange-600 font-semibold">
//                 ${paymentData.amount || "0.00"}
//               </span>
//             </div>
//             <div className="flex justify-between text-gray-700">
//               <span className="font-medium">Status:</span>
//               <span className="text-orange-600 font-semibold">
//                 {paymentData.payment_status || "Paid"}
//               </span>
//             </div>
//           </div>

//           <Button
//             className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg transition-all shadow-md hover:shadow-lg"
//             onClick={() => router.push("/dashboard")}
//           >
//             Go to Dashboard
//           </Button>

//           <p className="text-sm text-gray-500 mt-6">
//             Having trouble?{" "}
//             <a href="/contact" className="text-orange-600 hover:underline">
//               Contact Support
//             </a>
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }

// export default function PaymentSuccessPage() {
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       <PaymentSuccessContent />
//     </Suspense>
//   );
// }


/* ------- Latest code with updated ffrontend and backend logic -------- */



// import { useEffect, useState, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";

// function PaymentSuccessContent() {
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id");

//   const [status, setStatus] = useState("Verifying your payment...");
//   const [details, setDetails] = useState(null);

//   useEffect(() => {
//     if (!sessionId) {
//       setStatus("No session found. Please try again.");
//       return;
//     }

//     const verifyPayment = async () => {
//       try {
//         // 1️⃣ Fetch payment session from backend (which calls Stripe)
//         const res = await fetch(`/api/verify-payment?session_id=${sessionId}`);
//         const data = await res.json();

//         if (data?.payment_status === "paid" && data?.form_id) {
//           // 2️⃣ Update Supabase with confirmed payment
//           const { error } = await supabase
//             .from("form_submissions")
//             .update({
//               payment_status: "paid",
//               amount: data.amount_total / 100,
//             })
//             .eq("form_id", data.form_id);

//           if (error) throw error;

//           // 3️⃣ Show success message
//           setDetails(data);
//           setStatus("Payment successful! 🎉 Thank you for your purchase.");
//         } else {
//           setStatus(
//             "Payment Verified, but we couldn’t find your form details. Your transaction may still be processing."
//           );
//         }
//       } catch (err) {
//         console.error(err);
//         setStatus("An error occurred while verifying payment.");
//       }
//     };

//     verifyPayment();
//   }, [sessionId]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-6">
//       <div className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
//         <h1 className="text-2xl font-semibold mb-3 text-gray-800">
//           {status}
//         </h1>

//         {details && (
//           <div className="mt-4 text-gray-700">
//             <p><strong>Payment ID:</strong> {details.id}</p>
//             <p><strong>Amount Paid:</strong> ${(details.amount_total / 100).toFixed(2)}</p>
//             <p><strong>Status:</strong> {details.payment_status}</p>
//             <p><strong>Form ID:</strong> {details.form_id}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function Page() {
//   return (
//     <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
//       <PaymentSuccessContent />
//     </Suspense>
//   );
// }






