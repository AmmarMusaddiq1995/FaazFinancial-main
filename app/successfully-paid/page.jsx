// "use client";


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
//           <div className="bg-green-100 p-4 rounded-full">
//             <CheckCircle className="h-16 w-16 text-green-600" />
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
//             <span className="text-green-600 font-semibold">$299.00</span>
//           </div>
//           <div className="flex justify-between text-gray-700">
//             <span className="font-medium">Status:</span>
//             <span className="text-green-600 font-semibold">Paid</span>
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
//           <a href="/contact" className="text-green-600 hover:underline">
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

"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentId = searchParams.get("payment_intent");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg text-center border border-green-100">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment has been processed successfully.  
          Thank you for choosing our service.
        </p>

        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 mb-6">
          <div className="flex justify-between text-gray-700 mb-2">
            <span className="font-medium">Payment ID:</span>
            <span className="text-gray-600 truncate max-w-[200px]">
              {paymentId || "pi_3JXh7ZabcXYZ"}
            </span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span className="font-medium">Amount:</span>
            <span className="text-green-600 font-semibold">$299.00</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Status:</span>
            <span className="text-green-600 font-semibold">Paid</span>
          </div>
        </div>

        <Button
          className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg transition-all shadow-md hover:shadow-lg"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </Button>

        <p className="text-sm text-gray-500 mt-6">
          Having trouble?{" "}
          <a href="/contact" className="text-green-600 hover:underline">
            Contact Support
          </a>
        </p>
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

