import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Building2, FileText, AlertCircle, Plus, Download } from "lucide-react";
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
          .select("service_name, status, created_at, form_data , id , payment_status , amount , payment_id, admin_uploaded_file, admin_uploaded_at")
          .eq("user_id", cUser.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        // ✅ Safely parse form_data (works if already object or JSON string)
        const parsedData =
          data?.map((form) => {
            let parsedFormData = form.form_data;
            if (typeof parsedFormData === "string") {
              try {
                parsedFormData = JSON.parse(parsedFormData);
              } catch (_) {
                // leave as is if not valid JSON
              }
            }

            let parsedAdminUploads = form.admin_uploaded_file;
            if (typeof parsedAdminUploads === "string") {
              try {
                const maybeJson = JSON.parse(parsedAdminUploads);
                parsedAdminUploads = maybeJson;
              } catch (_) {
                // keep legacy single URL string
              }
            }

            return {
              ...form,
              form_data: parsedFormData,
              admin_uploaded_file: parsedAdminUploads,
            };
          }) || [];

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
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "pending":
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

    const renderValueCell = (value) => {
      if (Array.isArray(value)) {
        // If array of primitives
        if (value.every((v) => typeof v !== "object" || v === null)) {
          return <span>{value.join(", ")}</span>;
        }
        // Array of objects (e.g., Members)
        const allKeys = Array.from(
          value.reduce((set, item) => {
            if (item && typeof item === "object") {
              Object.keys(item).forEach((k) => set.add(k));
            }
            return set;
          }, new Set())
        );
        if (allKeys.length === 0) {
          return <span>-</span>;
        }
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border border-gray-200 rounded">
              <thead className="bg-gray-50">
                <tr>
                  {allKeys.map((k) => (
                    <th key={k} className="px-2 py-1 text-left font-medium text-gray-700 border-b capitalize">
                      {k.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {value.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    {allKeys.map((k) => (
                      <td key={k} className="px-2 py-1 text-gray-700 align-top break-words">
                        {row && typeof row[k] === "object"
                          ? JSON.stringify(row[k])
                          : row && row[k] !== undefined && row[k] !== null
                          ? String(row[k])
                          : "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      if (typeof value === "object" && value !== null) {
        return <pre className="text-xs bg-gray-50 rounded p-2 overflow-x-auto">{JSON.stringify(value, null, 2)}</pre>;
      }

      if (typeof value === "string" && value.startsWith("http")) {
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {value.split("/").pop()}
          </a>
        );
      }

      return <span>{String(value)}</span>;
    };

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
                  {renderValueCell(value)}
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
        amount: form.amount,
      });
      console.log(response);
      
      const updatedStatus = await supabase
        .from("form_submissions")
        .update({ status: "in-progress" })
        .eq("id", form.id);
      console.log(updatedStatus);

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
                {(() => {
                  const displayStatus =
                    (form.status || "").toLowerCase() === "completed"
                      ? "completed"
                      : form.payment_status === "paid"
                      ? "in-progress"
                      : "pending";
                  return (
                    <Badge
                      className={`${getStatusColor(displayStatus)} border px-3 py-1`}
                    >
                      {displayStatus.replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Badge>
                  );
                })()}

                <p className="text-sm text-gray-500">
                  Submitted on: {new Date(form.created_at).toLocaleString()}
                </p>

               

                {form.payment_status === "paid" && (
                  <p className="text-sm text-green-500">
                    Payment Status: Paid
                  </p>
                )}

                {/* View Details Modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </DialogTrigger>
                  {form.payment_status === "pending" && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handlePay(form)}
                    >
                      Pay
                    </Button>
                  )}
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

                    {/* Admin Uploaded File Section */}
                    {form.admin_uploaded_file && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                          <FileText className="mr-2 h-5 w-5" />
                          Your Document{Array.isArray(form.admin_uploaded_file) && form.admin_uploaded_file.length > 1 ? "s are" : " is"} Ready!
                        </h3>

                        <div className="p-3 bg-white border border-green-200 rounded-md space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-5 w-5 text-orange-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {Array.isArray(form.admin_uploaded_file) ? "Documents Available" : "Document Available"}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Uploaded on: {new Date(form.admin_uploaded_at).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>

                          {Array.isArray(form.admin_uploaded_file) ? (
                            <div className="space-y-2">
                              {form.admin_uploaded_file.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                                  <div className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4 text-orange-600" />
                                    <span className="text-sm text-gray-700">{file.name || `File ${idx + 1}`}</span>
                                  </div>
                                  <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 transition-colors"
                                  >
                                    <Download className="mr-1 h-3 w-3" />
                                    Download
                                  </a>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                              <div className="flex items-center">
                                <FileText className="mr-2 h-4 w-4 text-orange-600" />
                                <span className="text-sm text-gray-700">Uploaded File</span>
                              </div>
                              <a
                                href={form.admin_uploaded_file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 transition-colors"
                              >
                                <Download className="mr-1 h-3 w-3" />
                                Download
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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
             
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
