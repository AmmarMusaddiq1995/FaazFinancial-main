"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { createBrowserClient } from "@/lib/supabase/client"
import { Search, Building2, Calendar, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Business {
  id: string
  business_name: string
  business_type: string
  state: string
  status: string
  created_at: string
  user_id: string
  profiles: {
    full_name: string | null
    email: string
  }
}

export function BusinessesManagement() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const { data, error } = await supabase
          .from("business_formations")
          .select(`
            *,
            profiles (
              full_name,
              email
            )
          `)
          .order("created_at", { ascending: false })

        if (error) throw error
        setBusinesses(data || [])
      } catch (error) {
        console.error("Error fetching businesses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBusinesses()
  }, [supabase])

  const filteredBusinesses = businesses.filter(
    (business) =>
      business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.business_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.state.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const updateBusinessStatus = async (businessId: string, newStatus: string) => {
    try {
      const { error } = await supabase.from("business_formations").update({ status: newStatus }).eq("id", businessId)

      if (error) throw error

      setBusinesses(
        businesses.map((business) => (business.id === businessId ? { ...business, status: newStatus } : business)),
      )
    } catch (error) {
      console.error("Error updating business status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in_progress":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Management</h1>
          <p className="text-gray-600">Manage business formations and applications</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Business Management</h1>
        <p className="text-gray-600">Manage business formations and applications</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Businesses ({businesses.length})</CardTitle>
          <CardDescription>View and manage business formation applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search businesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredBusinesses.map((business) => (
              <div key={business.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">{business.business_name}</p>
                      <Badge variant={getStatusColor(business.status)}>{business.status.replace("_", " ")}</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      {business.business_type} • {business.state}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Filed {new Date(business.created_at).toLocaleDateString()}
                      </span>
                      <span>Owner: {business.profiles.full_name || business.profiles.email}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updateBusinessStatus(business.id, "completed")}>
                      Mark Complete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateBusinessStatus(business.id, "in_progress")}>
                      Mark In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateBusinessStatus(business.id, "pending")}>
                      Mark Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No businesses found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
