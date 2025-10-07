import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { BusinessesManagement } from "@/components/admin/businesses-management"

export default async function AdminBusinessesPage() {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/dashboard")
  }

  return (
    <AdminLayout>
      <BusinessesManagement />
    </AdminLayout>
  )
}
