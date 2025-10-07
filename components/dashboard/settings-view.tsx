"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { User, Mail, Phone, Save, Trash2 } from "lucide-react"

interface SettingsViewProps {
  user: any
  profile: any
}

export function SettingsView({ user, profile }: SettingsViewProps) {
  const [firstName, setFirstName] = useState(profile?.first_name || "")
  const [lastName, setLastName] = useState(profile?.last_name || "")
  const [companyName, setCompanyName] = useState(profile?.company_name || "")
  const [phone, setPhone] = useState(profile?.phone || "")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const userInitials = profile
    ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`
    : user.email?.[0]?.toUpperCase() || "U"

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          phone: phone,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      setMessage("Profile updated successfully!")
      router.refresh()
    } catch (error) {
      setMessage("Error updating profile. Please try again.")
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return
    }

    setIsLoading(true)
    const supabase = createClient()

    try {
      // Note: In a real app, you'd want to handle this server-side
      // This is a simplified example
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      setMessage("Error deleting account. Please contact support.")
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal information and contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-cyan-100 text-cyan-700 text-xl">{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <p className="text-sm text-gray-600">Upload a new profile picture or remove the current one</p>
                <div className="flex space-x-2 mt-2">
                  <Button variant="outline" size="sm" disabled>
                    Upload Photo
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" value={user.email} disabled className="bg-gray-50" />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed. Contact support if needed.</p>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" />
            </div>

            <div>
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company name"
              />
            </div>

            {message && (
              <div
                className={`p-3 rounded-md text-sm ${
                  message.includes("Error")
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-green-50 text-green-600 border border-green-200"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-700">
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Account Security
          </CardTitle>
          <CardDescription>Manage your account security and login preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Password</h4>
              <p className="text-sm text-gray-600">Last updated 30 days ago</p>
            </div>
            <Button variant="outline" disabled>
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline" disabled>
              Enable 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you want to receive updates about your business</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive updates about your business formations</p>
            </div>
            <Button variant="outline" disabled>
              Manage
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">SMS Notifications</h4>
              <p className="text-sm text-gray-600">Get text updates for important milestones</p>
            </div>
            <Button variant="outline" disabled>
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <Trash2 className="mr-2 h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-900">Delete Account</h4>
              <p className="text-sm text-red-700">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" onClick={handleDeleteAccount} disabled={isLoading}>
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
