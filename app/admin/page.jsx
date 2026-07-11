

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminOverview2 } from "@/components/admin/admin-overview2";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthContext } from "@/context/AppContext";

export default function AdminPage() {
  const router = useRouter();
  const { isAdmin, loading, user } = useAuthContext();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/auth/login2");
      return;
    }
    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }
  }, [loading, user, isAdmin, router]);

  if (loading) return <LoadingSpinner />;
  if (!user || !isAdmin) return null;

  return (
    <AdminLayout>
      <AdminOverview2 />
    </AdminLayout>
  );
}
