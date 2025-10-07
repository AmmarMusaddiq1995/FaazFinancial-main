import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Building2, FileText, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/context/AppContext";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function DashboardOverview2({ user, profile }) {
  const [userForms, setUserForms] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    const fetchUserForms = async () => {
      try {
        // Step 1: Get internal user_data.id
        const { data: cUser, error: userError } = await supabase
          .from("user_data")
          .select("id")
          .eq("auth_user_id", user.id)
          .single();

        if (userError) throw userError;
        if (!cUser?.id) return;

        // Step 2: Fetch forms for that user
        const { data, error } = await supabase
          .from("form_submissions")
          .select("service_name, status, created_at, form_data , id")
          .eq("user_id", cUser.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        // ✅ Safely parse form_data (works if already object or JSON string)
        const parsedData =
          data?.map((form) => ({
            ...form,
            form_data:
              typeof form.form_data === "string"
                ? JSON.parse(form.form_data)
                : form.form_data,
          })) || [];

        setUserForms(parsedData);
      } catch (err) {
        console.error("Error fetching user forms:", err.message);
      }
    };

    fetchUserForms();
  }, [user]);

  // Helper for badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  // ✅ Render form_data as a table
  const renderFormDataTable = (formData) => {
    if (!formData || typeof formData !== "object") {
      return (
        <p className="text-gray-500 text-sm">No detailed data available.</p>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-200 rounded-lg">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="py-2 px-3 font-medium text-gray-700 border-b">
                Field
              </th>
              <th className="py-2 px-3 font-medium text-gray-700 border-b">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(formData).map(([key, value], index) => (
              <tr
                key={index}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                <td className="py-2 px-3 font-medium text-gray-800 capitalize">
                  {/* {key.replace(/_/g, " ")} */}
                  {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </td>
                <td className="py-2 px-3 text-gray-700 break-words">
                  {typeof value === "object"
                    ? JSON.stringify(value, null, 2)
                    : String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const handlePay = async (form) => {
    console.log(form);
    try {
      const response = await axios.post("/api/get-payment-url", {
        form_id: form.id,
        amount: 25,
      });
      console.log(response);
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {profile?.first_name || user.email}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your business formations and services.
        </p>
      </div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {userForms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userForms.map((form, index) => (
            <Card
              key={index}
              className="shadow-md hover:shadow-lg transition-all"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {form.service_name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge
                  className={`${getStatusColor(form.status)} border px-3 py-1`}
                >
                  {form.status || "Pending"}
                </Badge>

                <p className="text-sm text-gray-500">
                  Submitted on: {new Date(form.created_at).toLocaleString()}
                </p>

                {/* View Details Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handlePay(form)}
                  >
                    Pay
                  </Button>
                  <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{form.service_name}</DialogTitle>
                      <DialogDescription>
                        Submitted on{" "}
                        {new Date(form.created_at).toLocaleString()}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4">
                      {renderFormDataTable(form.form_data)}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No forms found for this user.</p>
      )}

      <div className="w-full p-6 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to help you manage your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/start-business">
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                >
                  <Plus className="h-6 w-6" />
                  <span>Start New Business</span>
                </Button>
              </Link>
              <Link href="/dashboard/documents">
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                >
                  <FileText className="h-6 w-6" />
                  <span>View Documents</span>
                </Button>
              </Link>
              <Link href="/dashboard/support">
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                >
                  <AlertCircle className="h-6 w-6" />
                  <span>Get Support</span>
                </Button>
              </Link>
              {/* <Link href="/dashboard/settings">
                <Button
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                >
                  <Building2 className="h-6 w-6" />
                  <span>Account Settings</span>
                </Button>
              </Link> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
