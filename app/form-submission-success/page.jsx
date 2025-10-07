"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function FormSubmissionSuccessPage() {
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
  }, []);

  return (
    <div>
      <Header />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-green-600">
          🎉 Form Submitted Successfully!
        </h1>

        {latestSubmission ? (
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">
              Latest Submission Details
            </h2>

            <pre className="bg-white p-3 rounded border overflow-x-auto text-sm">
              {JSON.stringify(latestSubmission.form_data, null, 2)}
            </pre>
          </div>
        ) : (
          <p>No submissions found for your account.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
