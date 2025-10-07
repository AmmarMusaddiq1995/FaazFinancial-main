import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { BusinessesView } from "@/components/dashboard/businesses-view"

export default async function BusinessesPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  const { data: formations } = await supabase
    .from("business_formations")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })

  return (
    <DashboardLayout user={data.user} profile={profile}>
      <BusinessesView formations={formations || []} />
    </DashboardLayout>
  )
}
