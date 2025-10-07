"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardOverview2 } from "@/components/dashboard/dashboard-overview2";
import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuthContext();
  const [mockUser, setMockUser] = useState(null);
  const [mockProfile, setMockProfile] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/auth/login2");
      return;
    }
    if (isAdmin) {
      router.push("/admin");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setMockUser(user);
        const { data: profileData, error: profileError } = await supabase
          .from("user_data")
          .select("*")
          .eq("auth_user_id", user.id)
          .single();
        if (profileError) {
          console.error("Profile Error:", profileError);
          toast.error("Error fetching profile data");
          return;
        }
        setMockProfile(profileData);
      } catch (e) {
        console.error("Unexpected error fetching profile:", e);
        toast.error("Something went wrong.");
      }
    };

    fetchUserProfile();
  }, [loading, user, isAdmin, router]);

  // const mockUser = {
  //   id: "1",
  //   email: "user@example.com",
  //   name: "John Doe",
  // };

  // const mockProfile = {
  //   first_name: "John",
  //   last_name: "Doe",
  //   company_name: "Example Corp",
  // };

  const mockFormations = [
    {
      id: "1",
      business_name: "My LLC",
      business_type: "LLC",
      state: "Delaware",
      status: "completed",
      created_at: new Date().toISOString(),
    },
  ];

  const mockServices = [
    {
      id: "1",
      service_name: "EIN Application",
      status: "completed",
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <>
      {!mockUser && !mockProfile && <div>Loading...</div>}
      {mockUser && mockProfile && (
        <DashboardLayout user={mockUser} profileData={mockProfile}>
          <DashboardOverview2
            user={mockUser}
            profile={mockProfile}
            formations={mockFormations}
            services={mockServices}
          />
        </DashboardLayout>
      )}
    </>
  );
}
