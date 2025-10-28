

"use client";


import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
export default function FormSubmissionSuccess() {
 
const router = useRouter();

  return (

    <div className="flex flex-col min-h-screen">
      <Header />

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl border border-green-100 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full">
            <CheckCircle2 className="h-16 w-16 text-orange-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-3">
          Form Submitted Successfully 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for providing your details. 
        </p>

        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg shadow-md hover:shadow-lg transition-all"
        >
          Proceed To Payment
        </Button>

        <p className="text-sm text-gray-500 mt-6">
          Need help?{" "}
          <a href="/contact" className="text-orange-600 hover:underline">
            Contact Support
          </a>
        </p>
      </motion.div>
    </div>
    <Footer />
    </div>
  );
}

