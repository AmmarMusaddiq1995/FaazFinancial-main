"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormSubmissionSuccessPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [latestSubmission, setLatestSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestSubmission = async () => {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user:", userError);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("form_submissions")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching latest submission:", error);
      } else {
        setLatestSubmission(data);
      }
      setLoading(false);
    };

    fetchLatestSubmission();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
  
      <main className="flex-grow p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-green-600">
          🎉 Form Submitted Successfully!
        </h1>
  
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
        </button>
      </main>
  
      <Footer />
    </div>
  );
}
