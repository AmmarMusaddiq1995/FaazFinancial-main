

/* ---------------- Updated Tabular Format  Modal view and filters --------- */

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  CheckCircle2,
  Loader2,
  Upload,
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCw,
  Copy,
  Building2,
  CalendarDays,
  Inbox,
  FolderCheck,
  X,
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";
import { FormDetails } from "@/components/form-details";
import { getEffectiveStatus } from "@/lib/submission-status";
import { toast } from "react-hot-toast";

export function AdminOverview2() {
  const [formSubmissionsData, setFormSubmissionsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [counts, setCounts] = useState({
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const fetchFormSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("form_submissions")
        .select(`
          id,
          created_at,
          user_id,
          service_name,
          form_data,
          status,
          payment_status,
          payment_id,
          amount,
          admin_uploaded_file,
          admin_uploaded_at,
          user_data (
          first_name,
          last_name,
          email
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setFormSubmissionsData(data);
      setFilteredData(data);
      calculateCounts(data);
    } catch (error) {
      console.error("Error fetching form submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCounts = (data) => {
    const pending = data.filter(
      (s) => getEffectiveStatus(s) === "pending"
    ).length;
    const inProgress = data.filter(
      (s) => getEffectiveStatus(s) === "in-progress"
    ).length;
    const completed = data.filter(
      (s) => getEffectiveStatus(s) === "completed"
    ).length;
    setCounts({ pending, inProgress, completed });
  };

  const handleFileUpload = async (formId, userId, files) => {
    if (!files || files.length === 0) return;

    setUploadingFile(true);
    try {
      const uploadedFileUrls = [];

      // Upload each file
      for (const file of files) {
        // Create a unique filename with form_id and timestamp
        const fileName = `admin-uploads/${formId}/${Date.now()}-${file.name}`;

        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          toast.error(`Failed to upload ${file.name}. Please try again.`);
          continue;
        }

        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from("uploads")
          .getPublicUrl(fileName);

        uploadedFileUrls.push({
          url: publicUrlData.publicUrl,
          name: file.name,
          uploadedAt: new Date().toISOString()
        });
      }

      if (uploadedFileUrls.length === 0) {
        toast.error("No files were uploaded successfully.");
        return;
      }

      // Update form_submissions table with the uploaded file URLs (store as JSON array)
      const { error: updateError } = await supabase
        .from("form_submissions")
        .update({
          admin_uploaded_file: JSON.stringify(uploadedFileUrls),
          admin_uploaded_at: new Date().toISOString()
        })
        .eq("id", formId);

      if (updateError) {
        console.error("Error updating form submission:", updateError);
        toast.error("Files uploaded but failed to update record. Please refresh and try again.");
        return;
      }

      // Update local state
      setUploadedFiles(prev => ({
        ...prev,
        [formId]: uploadedFileUrls
      }));

      toast.success(`${uploadedFileUrls.length} file(s) uploaded successfully!`);

      // Clear selected files
      setSelectedFiles([]);

      // Refresh the data
      fetchFormSubmissions();

    } catch (error) {
      console.error("Error in file upload:", error);
      toast.error("An error occurred while uploading the files.");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    fetchFormSubmissions();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = formSubmissionsData;

    if (statusFilter !== "all") {
      filtered = filtered.filter((s) => getEffectiveStatus(s) === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.user_id?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [statusFilter, searchQuery, formSubmissionsData]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "paid":
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
    switch (status) {
      case "completed":
      case "paid":
        return "bg-green-500";
      case "in-progress":
        return "bg-amber-500";
      case "pending":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const copyToClipboard = (value, label) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied to clipboard`);
  };

  // Truncated ID with a copy button — replaces the old hover-only tooltip
  const IdCell = ({ value, label }) => {
    if (!value) return <span className="text-gray-400">N/A</span>;
    return (
      <button
        type="button"
        onClick={() => copyToClipboard(value, label)}
        title={`${value} — click to copy`}
        className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-xs text-gray-700 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 transition-colors"
      >
        {`${value.slice(0, 3)}***${value.slice(-3)}`}
        <Copy className="h-3 w-3" aria-hidden="true" />
      </button>
    );
  };

  const StatusBadge = ({ status }) => (
    <Badge
      className={`${getStatusColor(status)} border gap-1.5 px-2.5 py-1 font-medium capitalize`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${getStatusDotColor(status)}`}
        aria-hidden="true"
      />
      {status}
    </Badge>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleMarkStatusAsCompleted = async (id) => {
    try {
      const { error } = await supabase
        .from("form_submissions")
        .update({ status: "completed" })
        .eq("id", id);

      if (error) {
        console.error("Error updating status:", error);
        toast.error("Failed to update status");
        return;
      }
      // Refresh the data to show updated status
      await fetchFormSubmissions();
      toast.success("Status marked as completed");
      setSelectedSubmission((prev) =>
        prev ? { ...prev, status: "completed" } : prev
      );
    } catch (error) {
      console.error("Error marking status as completed:", error);
      toast.error("An error occurred while updating status");
    }
  }

  const statCards = [
    {
      label: "Total Submissions",
      value: formSubmissionsData.length,
      icon: FileText,
      iconClasses: "bg-orange-50 text-orange-600",
    },
    {
      label: "Pending",
      value: counts.pending,
      icon: Clock,
      iconClasses: "bg-red-50 text-red-600",
    },
    {
      label: "In Progress",
      value: counts.inProgress,
      icon: Loader2,
      iconClasses: "bg-amber-50 text-amber-600",
    },
    {
      label: "Completed",
      value: counts.completed,
      icon: CheckCircle2,
      iconClasses: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen space-y-8">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Form Submissions
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            Review client submissions, manage payments, and deliver documents.
          </p>
        </div>
        <Button onClick={fetchFormSubmissions} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
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
                    {stat.value}
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

      {/* Submissions table with filters */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <Input
                placeholder="Search by ID, User, or Service..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select onValueChange={setStatusFilter} defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <span className="ml-auto text-sm text-gray-500">
              {filteredData.length} result{filteredData.length !== 1 ? "s" : ""}
            </span>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3 border-b font-semibold">Form ID</th>
                <th className="px-4 py-3 border-b font-semibold">Client</th>
                <th className="px-4 py-3 border-b font-semibold">User ID</th>
                <th className="px-4 py-3 border-b font-semibold">Submitted</th>
                <th className="px-4 py-3 border-b font-semibold">Service</th>
                <th className="px-4 py-3 border-b font-semibold">Status</th>
                <th className="px-4 py-3 border-b font-semibold">Payment</th>
                <th className="px-4 py-3 border-b font-semibold">Payment ID</th>
                <th className="px-4 py-3 border-b font-semibold text-right">Amount</th>
                <th className="px-4 py-3 border-b font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-14">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-3">
                        <Inbox className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="font-medium text-gray-900">
                        No submissions found
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {searchQuery || statusFilter !== "all"
                          ? "Try adjusting your search or status filter."
                          : "New client submissions will appear here."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((submission) => (
                  <tr
                    key={submission.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <IdCell value={submission.id} label="Form ID" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">
                        {submission.user_data?.first_name}{" "}
                        {submission.user_data?.last_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {submission.user_data?.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <IdCell value={submission.user_id} label="User ID" />
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                      <div>
                        {new Date(submission.created_at).toLocaleDateString(
                          undefined,
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(submission.created_at).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 capitalize">
                      {submission.service_name}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={getEffectiveStatus(submission)} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={submission.payment_status} />
                    </td>
                    <td className="px-4 py-3">
                      {submission.payment_id ? (
                        <IdCell
                          value={submission.payment_id}
                          label="Payment ID"
                        />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900 tabular-nums whitespace-nowrap">
                      ${submission.amount + Math.ceil(submission.amount * 0.045)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedFiles([]);
                          setSelectedSubmission(submission);
                        }}
                      >
                        View Data
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination Controls */}
      {filteredData.length > itemsPerPage && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={`min-w-[2.5rem] ${
                        currentPage === page
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : ""
                      }`}
                    >
                      {page}
                    </Button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} className="px-2 text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Submission details modal */}
      {selectedSubmission && (
        <Dialog
          open={!!selectedSubmission}
          onOpenChange={(open) => !open && setSelectedSubmission(null)}
        >
          <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <DialogHeader className="space-y-3 pr-8 text-left">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <Building2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <DialogTitle className="text-lg font-semibold text-gray-900 leading-snug">
                    {selectedSubmission.service_name}
                  </DialogTitle>
                  <DialogDescription className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      Submitted on{" "}
                      {new Date(selectedSubmission.created_at).toLocaleString()}
                    </span>
                    {selectedSubmission.user_data && (
                      <span>
                        by {selectedSubmission.user_data.first_name}{" "}
                        {selectedSubmission.user_data.last_name} (
                        {selectedSubmission.user_data.email})
                      </span>
                    )}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={getEffectiveStatus(selectedSubmission)} />
                <StatusBadge status={selectedSubmission.payment_status} />
                {selectedSubmission.amount && (
                  <Badge className="bg-gray-100 text-gray-700 border border-gray-200 px-2.5 py-1 font-medium tabular-nums">
                    Amount: ${selectedSubmission.amount + Math.ceil(selectedSubmission.amount * 0.045)}
                  </Badge>
                )}
              </div>
            </DialogHeader>

            {/* Submitted form data */}
            <div className="mt-2">
              <FormDetails data={selectedSubmission.form_data} />
            </div>

            {/* File Upload Section for Succeeded Payments */}
            {selectedSubmission.payment_status === "paid" && (
              <div className="mt-4 rounded-lg border border-gray-200 p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Upload
                    className="h-5 w-5 text-orange-600 shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="text-base font-semibold text-gray-900">
                    Deliver Documents
                  </h3>
                </div>

                {/* Drag and Drop File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragOver
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 hover:border-orange-300'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload
                    className="mx-auto h-10 w-10 text-gray-400 mb-3"
                    aria-hidden="true"
                  />
                  <p className="font-medium text-gray-700 mb-1">
                    Drag and drop files here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    You can upload multiple files at once
                  </p>

                  <input
                    type="file"
                    id={`file-upload-${selectedSubmission.id}`}
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                    disabled={uploadingFile}
                  />
                  <label
                    htmlFor={`file-upload-${selectedSubmission.id}`}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                      uploadingFile
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600 cursor-pointer'
                    } transition-colors`}
                  >
                    {uploadingFile ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Select Files
                      </>
                    )}
                  </label>
                </div>

                {/* Selected Files Preview */}
                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Selected Files ({selectedFiles.length}):
                    </h4>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 p-2.5"
                        >
                          <div className="flex items-center min-w-0">
                            <FileText className="mr-2 h-4 w-4 shrink-0 text-gray-500" />
                            <span className="text-sm text-gray-700 truncate">
                              {file.name}
                            </span>
                            <span className="text-xs text-gray-500 ml-2 shrink-0">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            disabled={uploadingFile}
                            aria-label={`Remove ${file.name}`}
                          >
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleFileUpload(selectedSubmission.id, selectedSubmission.user_id, selectedFiles)}
                      disabled={uploadingFile || selectedFiles.length === 0}
                      className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      {uploadingFile ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading {selectedFiles.length} file(s)...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload {selectedFiles.length} file(s)
                        </>
                      )}
                    </Button>
                  </div>
                )}

                {/* Display uploaded files if exist */}
                {selectedSubmission.admin_uploaded_file && (
                  <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center gap-2">
                      <FolderCheck
                        className="h-5 w-5 text-green-600 shrink-0"
                        aria-hidden="true"
                      />
                      <h4 className="text-sm font-semibold text-green-800">
                        Delivered Files
                      </h4>
                    </div>
                    {selectedSubmission.admin_uploaded_at && (
                      <p className="mt-1 text-xs text-green-700">
                        Uploaded on{" "}
                        {new Date(
                          selectedSubmission.admin_uploaded_at
                        ).toLocaleString()}
                      </p>
                    )}

                    <div className="mt-3">
                      {(() => {
                        try {
                          // Try to parse as JSON array (new format)
                          const files = JSON.parse(selectedSubmission.admin_uploaded_file);
                          if (Array.isArray(files)) {
                            return (
                              <div className="space-y-2">
                                {files.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between gap-3 rounded-md border border-green-200 bg-white p-3"
                                  >
                                    <div className="flex items-center min-w-0">
                                      <FileText className="mr-2 h-4 w-4 shrink-0 text-orange-600" />
                                      <span className="text-sm text-gray-700 truncate">
                                        {file.name}
                                      </span>
                                    </div>
                                    <a
                                      href={file.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex shrink-0 items-center rounded-md bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 transition-colors"
                                    >
                                      <Download className="mr-1.5 h-3.5 w-3.5" />
                                      Download
                                    </a>
                                  </div>
                                ))}
                              </div>
                            );
                          }
                        } catch (e) {
                          // Fallback for old single file format
                          return (
                            <div className="flex items-center justify-between gap-3 rounded-md border border-green-200 bg-white p-3">
                              <div className="flex items-center min-w-0">
                                <FileText className="mr-2 h-4 w-4 shrink-0 text-orange-600" />
                                <span className="text-sm text-gray-700">Uploaded File</span>
                              </div>
                              <a
                                href={selectedSubmission.admin_uploaded_file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex shrink-0 items-center rounded-md bg-green-600 px-3 py-2 text-xs font-medium text-white hover:bg-green-700 transition-colors"
                              >
                                <Download className="mr-1.5 h-3.5 w-3.5" />
                                Download
                              </a>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mark as completed once the client has paid */}
            {selectedSubmission.payment_status === "paid" &&
              selectedSubmission.status !== "completed" && (
                <div className="mt-4 flex justify-end border-t border-gray-100 pt-4">
                  <Button
                    onClick={() =>
                      handleMarkStatusAsCompleted(selectedSubmission.id)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle2
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    Mark as Completed
                  </Button>
                </div>
              )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
