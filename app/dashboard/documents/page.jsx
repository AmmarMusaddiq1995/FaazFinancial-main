"use client";

import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DocumentsView } from "@/components/dashboard/documents-view";
import { supabase } from "@/lib/supabaseClient";
import { useAuthContext } from "@/context/AppContext";
import { useEffect } from "react";

export default function DocumentsPage() {
  const { user, isAdmin, loading } = useAuthContext();
 
  useEffect(() => {

    const fetchdDocuments = async () => {

      try {
        const { data, error } = await supabase.auth.getUser();
        if (loading) return;
        if (!user) {
          redirect("/auth/login2");
        }

        const { data: profile } = await supabase
        .from("form_submissions")
        .select("admin_uploaded_file")
        .eq("user_id", data.user.id)
        .order("created_at", { ascending: false })
        .single();

        console.log("profile :", profile);

        if (error || !data?.user) {
          redirect("/auth/login2");
        }

      }
      catch (error) {
        console.error("Error fetching documents:", error);
      }

      fetchdDocuments();  
      
    }
   



  

  }, [loading, user]);
 



  return (
   <div>

<h1> documents will b shown here </h1>
   </div>

      
    
  );
}
