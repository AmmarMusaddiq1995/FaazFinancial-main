import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import {
  Building2,
  FileText,
  AlertCircle,
  Plus,
  Download,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  FolderCheck,
  Loader2,
  ArrowRight,
  Inbox,
} from "lucide-react";
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
import { FormDetails } from "@/components/form-details";
import axios from "axios";

export function DashboardOverview2({ user, profile }) {
  const [userForms, setUserForms] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [payingFormId, setPayingFormId] = useState(null);

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
      } finally {
        setLoadingForms(false);
      }
    };

    fetchUserForms();
  }, [user]);

  // Derive display status the same way the card badge does
  const getDisplayStatus = (form) =>
    (form.status || "").toLowerCase() === "completed"
      ? "completed"
      : form.payment_status === "paid"
      ? "in-progress"
      : "pending";

  // Helper for badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "in-progress":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "pending":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const getStatusDotColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-amber-500";
      case "pending":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  // Summary stats derived from the fetched forms
  const stats = {
    total: userForms.length,
    inProgress: userForms.filter((f) => getDisplayStatus(f) === "in-progress")
      .length,
    completed: userForms.filter((f) => getDisplayStatus(f) === "completed")
      .length,
    documentsReady: userForms.filter((f) => f.admin_uploaded_file).length,
  };

  const statCards = [
    {
      label: "Total Requests",
      value: stats.total,
      icon: FileText,
      iconClasses: "bg-orange-50 text-orange-600",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      iconClasses: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      iconClasses: "bg-green-50 text-green-600",
    },
    {
      label: "Documents Ready",
      value: stats.documentsReady,
      icon: FolderCheck,
      iconClasses: "bg-blue-50 text-blue-600",
    },
  ];

  const handlePay = async (form) => {
    if (payingFormId) return; // prevent duplicate submissions
    setPayingFormId(form.id);
    try {
      const response = await axios.post("/api/get-payment-url", {
        form_id: form.id,
        amount: form.amount,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
      setPayingFormId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {profile?.first_name || user.email}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here&apos;s what&apos;s happening with your business formations and
          services.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            className="border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg ${stat.iconClasses}`}
                >
                  <stat.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold text-gray-900 tabular-nums">
                    {loadingForms ? "—" : stat.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {stat.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Requests */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            My Service Requests
          </h2>
          {!loadingForms && userForms.length > 0 && (
            <span className="text-sm text-gray-500">
              {userForms.length} request{userForms.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {loadingForms ? (
          /* Skeleton cards while fetching */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-gray-200 shadow-sm">
                <CardContent className="p-6 space-y-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-200" />
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                  </div>
                  <div className="h-5 w-24 rounded-full bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                  <div className="h-9 w-full rounded-md bg-gray-200" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : userForms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userForms.map((form) => {
              const displayStatus = getDisplayStatus(form);
              const isPaying = payingFormId === form.id;
              return (
                <Card
                  key={form.id}
                  className="flex flex-col border-gray-200 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                          <Building2 className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-base font-semibold text-gray-900 leading-snug">
                          {form.service_name}
                        </CardTitle>
                      </div>
                      <Badge
                        className={`${getStatusColor(
                          displayStatus
                        )} border shrink-0 gap-1.5 px-2.5 py-1 font-medium`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${getStatusDotColor(
                            displayStatus
                          )}`}
                          aria-hidden="true"
                        />
                        {displayStatus.replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 gap-4">
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <CalendarDays
                          className="h-4 w-4 text-gray-400 shrink-0"
                          aria-hidden="true"
                        />
                        Submitted {new Date(form.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                      </p>
                      <p className="flex items-center gap-2">
                        <CreditCard
                          className="h-4 w-4 text-gray-400 shrink-0"
                          aria-hidden="true"
                        />
                        Payment:{" "}
                        {form.payment_status === "paid" ? (
                          <span className="font-medium text-green-700">
                            Paid
                          </span>
                        ) : (
                          <span className="font-medium text-red-700">
                            Pending
                          </span>
                        )}
                      </p>
                      {form.admin_uploaded_file && (
                        <p className="flex items-center gap-2 text-green-700">
                          <FolderCheck
                            className="h-4 w-4 shrink-0"
                            aria-hidden="true"
                          />
                          <span className="font-medium">
                            Document{Array.isArray(form.admin_uploaded_file) &&
                            form.admin_uploaded_file.length > 1
                              ? "s"
                              : ""}{" "}
                            ready to download
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Actions pinned to the bottom of the card */}
                    <div className="mt-auto flex flex-col gap-2 pt-2">
                      {/* View Details Modal */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl w-full max-h-[85vh] overflow-y-auto overflow-x-hidden">
                          <DialogHeader className="space-y-3 pr-8 text-left">
                            <div className="flex items-start gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                                <Building2
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="min-w-0">
                                <DialogTitle className="text-lg font-semibold text-gray-900 leading-snug">
                                  {form.service_name}
                                </DialogTitle>
                                <DialogDescription className="mt-1 flex items-center gap-1.5">
                                  <CalendarDays
                                    className="h-3.5 w-3.5 shrink-0"
                                    aria-hidden="true"
                                  />
                                  Submitted on{" "}
                                  {new Date(form.created_at).toLocaleString()}
                                </DialogDescription>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                className={`${getStatusColor(
                                  displayStatus
                                )} border gap-1.5 px-2.5 py-1 font-medium`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${getStatusDotColor(
                                    displayStatus
                                  )}`}
                                  aria-hidden="true"
                                />
                                {displayStatus.replace(/\b\w/g, (c) =>
                                  c.toUpperCase()
                                )}
                              </Badge>
                              <Badge
                                className={`border px-2.5 py-1 font-medium ${
                                  form.payment_status === "paid"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }`}
                              >
                                Payment:{" "}
                                {form.payment_status === "paid"
                                  ? "Paid"
                                  : "Pending"}
                              </Badge>
                              {form.amount && (
                                <Badge className="bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-1 font-medium tabular-nums">
                                  Amount: ${form.amount + Math.ceil(form.amount * 0.045)}
                                </Badge>
                              )}
                            </div>
                          </DialogHeader>

                          <div className="mt-2">
                            <FormDetails data={form.form_data} />
                          </div>

                          {/* Admin Uploaded File Section */}
                          {form.admin_uploaded_file && (
                            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 sm:p-5">
                              <div className="flex items-center gap-2">
                                <FolderCheck
                                  className="h-5 w-5 text-green-600 shrink-0"
                                  aria-hidden="true"
                                />
                                <h3 className="text-base font-semibold text-green-800">
                                  Your Document
                                  {Array.isArray(form.admin_uploaded_file) &&
                                  form.admin_uploaded_file.length > 1
                                    ? "s are"
                                    : " is"}{" "}
                                  Ready
                                </h3>
                              </div>
                              {form.admin_uploaded_at && (
                                <p className="mt-1 text-xs text-green-700">
                                  Uploaded on{" "}
                                  {new Date(
                                    form.admin_uploaded_at
                                  ).toLocaleString()}
                                </p>
                              )}

                              <div className="mt-3 space-y-2">
                                {(Array.isArray(form.admin_uploaded_file)
                                  ? form.admin_uploaded_file
                                  : [
                                      {
                                        name: "Uploaded File",
                                        url: form.admin_uploaded_file,
                                      },
                                    ]
                                ).map((file, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between gap-3 rounded-md border border-green-200 bg-white p-3"
                                  >
                                    <div className="flex items-center min-w-0">
                                      <FileText
                                        className="mr-2 h-4 w-4 shrink-0 text-orange-600"
                                        aria-hidden="true"
                                      />
                                      <span className="text-sm text-gray-700 truncate">
                                        {file.name || `File ${idx + 1}`}
                                      </span>
                                    </div>
                                    <a
                                      href={file.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex shrink-0 items-center rounded-md bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 transition-colors"
                                    >
                                      <Download
                                        className="mr-1.5 h-3.5 w-3.5"
                                        aria-hidden="true"
                                      />
                                      Download
                                    </a>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Pay directly from the modal when payment is pending */}
                          {form.payment_status === "pending" && (
                            <div className="mt-4 flex justify-end border-t border-gray-100 pt-4">
                              <Button
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                                onClick={() => handlePay(form)}
                                disabled={isPaying}
                              >
                                {isPaying ? (
                                  <>
                                    <Loader2
                                      className="mr-2 h-4 w-4 animate-spin"
                                      aria-hidden="true"
                                    />
                                    Redirecting…
                                  </>
                                ) : (
                                  <>
                                    Pay Now
                                    <ArrowRight
                                      className="ml-2 h-4 w-4"
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {form.payment_status === "pending" && (
                        <Button
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={() => handlePay(form)}
                          disabled={isPaying}
                        >
                          {isPaying ? (
                            <>
                              <Loader2
                                className="mr-2 h-4 w-4 animate-spin"
                                aria-hidden="true"
                              />
                              Redirecting…
                            </>
                          ) : (
                            <>
                              Pay Now
                              <ArrowRight
                                className="ml-2 h-4 w-4"
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <Card className="border-dashed border-2 border-gray-200 shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-14 px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500 mb-4">
                <Inbox className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                No service requests yet
              </h3>
              <p className="text-sm text-gray-500 mt-1 max-w-sm">
                Start your first business formation or compliance service and
                track its progress right here.
              </p>
              <Link href="/start-business" className="mt-5">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
                  Start a Business
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>


    </div>
  );
}
