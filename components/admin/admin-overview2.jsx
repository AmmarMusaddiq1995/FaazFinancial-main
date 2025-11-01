

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
import { Clock, CheckCircle, Loader2, Upload, FileText, Download } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner";
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

        console.log("data in admin overview 2:", data);

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
    const pending = data.filter((s) => s.status === "pending").length;
    const inProgress = data.filter((s) => s.status === "in-progress").length;
    const completed = data.filter((s) => s.status === "completed").length;
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
          alert(`Failed to upload ${file.name}. Please try again.`);
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
        alert("No files were uploaded successfully.");
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
        alert("Files uploaded but failed to update record. Please refresh and try again.");
        return;
      }

      // Update local state
      setUploadedFiles(prev => ({
        ...prev,
        [formId]: uploadedFileUrls
      }));

      alert(`${uploadedFileUrls.length} file(s) uploaded successfully!`);
      
      // Clear selected files
      setSelectedFiles([]);
      
      // Refresh the data
      fetchFormSubmissions();
      
    } catch (error) {
      console.error("Error in file upload:", error);
      alert("An error occurred while uploading the files.");
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
      filtered = filtered.filter((s) => s.status === statusFilter);
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
  }, [statusFilter, searchQuery, formSubmissionsData]);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "in-progress":
        return "bg-yellow-500 text-white";
      case "pending":
        return "bg-gray-400 text-white";
      case "paid":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  const toTitleCase = (text) =>
    String(text)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const renderHumanReadable = (value, keyName) => {
    // Normalize specific fields like members to arrays of objects for table view
    if (keyName === "members" && value && typeof value === "object" && !Array.isArray(value)) {
      value = [value];
    }
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === "object" && value[0] !== null) {
        const headerKeys = Array.from(new Set(value.flatMap((row) => Object.keys(row || {}))));
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs border border-gray-200 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  {headerKeys.map((h) => (
                    <th key={h} className="px-2 py-1 text-left border-b">
                      {toTitleCase(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {value.map((row, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    {headerKeys.map((h) => (
                      <td key={h} className="px-2 py-1 align-top">
                        {row && typeof row[h] === "object"
                          ? JSON.stringify(row[h])
                          : String(row?.[h] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      return <span>{value.map(String).join(", ")}</span>;
    }

    if (value && typeof value === "object") {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([k, v]) => (
            <div key={k}>
              <span className="font-medium">{toTitleCase(k)}: </span>
              <span>{typeof v === "object" ? JSON.stringify(v) : String(v)}</span>
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "string" && value.startsWith("http")) {
      const fileName = value.split("/").pop();
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          {fileName}
        </a>
      );
    }

    return <span>{String(value)}</span>;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!filteredData.length) {
    return (
      <p className="text-center text-gray-500 py-8">
        No form submissions found.
      </p>
    );
  }


  const handleMarkStatusAsCompleted = async (id) => {
    try {
      const { data, error } = await supabase
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
      console.log("data in handleMarkStatusAsCompleted:", data);
    } catch (error) {
      console.error("Error marking status as completed:", error);
      toast.error("An error occurred while updating status");
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">
        Form Submissions Overview
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-gray-400 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending Orders
            </CardTitle>
            <Clock className="text-gray-500 h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {counts.pending}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-yellow-400 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              In Progress
            </CardTitle>
            <Loader2 className="text-yellow-500 h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {counts.inProgress}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Completed Orders
            </CardTitle>
            <CheckCircle className="text-green-500 h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">
              {counts.completed}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search by ID, User, or Service..."
          className="w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={fetchFormSubmissions} variant="secondary">
          Refresh
        </Button>
      </div>

      {/* Table */}
      <Card className="shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 border-b">Form ID</th>
                <th className="px-4 py-3 border-b">User Name</th>
                <th className="px-4 py-3 border-b">User Email</th>
                <th className="px-4 py-3 border-b">Created At</th>
                <th className="px-4 py-3 border-b">User ID</th>
                <th className="px-4 py-3 border-b">Service Name</th>
                <th className="px-4 py-3 border-b">Form Status</th>
                <th className="px-4 py-3 border-b">Payment Status</th>
                <th className="px-4 py-3 border-b">Payment ID</th>
                <th className="px-4 py-3 border-b">Amount</th>
                <th className="px-4 py-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((submission) => (
                <tr
                  key={submission.id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-3 font-medium text-gray-800 relative group cursor-pointer">
                     {submission.id ? (
                     <>
                      <span>
                         {`${submission.id.slice(0, 3)}***${submission.id.slice(-3)}`}
                       </span>
                      <span
                        onClick={() => navigator.clipboard.writeText(submission.id)}
                         className="absolute bottom-full mb-1 left-3/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap"
                       >
                         {submission.id}
                      <span className="ml-2 text-gray-300">(Click to copy)</span>
                       </span>
                     </>
                     ) : (
                     "N/A"
                       )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {submission.user_data.first_name} {submission.user_data.last_name}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {submission.user_data.email} 
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {new Date(submission.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800 relative group cursor-pointer">
                     {submission.user_id ? (
                     <>
                      <span>
                         {`${submission.user_id.slice(0, 3)}***${submission.user_id.slice(-3)}`}
                       </span>
                      <span
                        onClick={() => navigator.clipboard.writeText(submission.user_id)}
                         className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap"
                       >
                         {submission.user_id}
                      <span className="ml-2 text-gray-300">(Click to copy)</span>
                       </span>
                     </>
                     ) : (
                     "N/A"
                       )}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-700 capitalize">
                    {submission.service_name}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                  <Badge className={getStatusColor(submission.payment_status)}>
                      {submission.payment_status}
                    </Badge>
                   
                  </td>
                  <td className="px-4 py-3">
                    {submission.payment_id}
                  </td>
                  <td className="px-4 py-3 font-bold">
                    ${submission.amount}
                  </td>
                 
                  <td className="px-4 py-3 text-center">
                    <Button
                      size="sm"
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      View Data
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal for JSON data */}
      {selectedSubmission && (
        <Dialog
          open={!!selectedSubmission}
          onOpenChange={setSelectedSubmission}
        >
          <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                {selectedSubmission.service_name}
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Submitted on{" "}
                {new Date(selectedSubmission.created_at).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            {/* File Upload Section for Succeeded Payments */}
            {selectedSubmission.payment_status === "paid" && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Admin File Upload
                </h3>
                
                {/* Drag and Drop File Upload Area */}
                <div className="mb-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      isDragOver
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
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
                          : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
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
                          <div key={index} className="flex items-center justify-between bg-gray-100 rounded-md p-2">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 text-sm"
                              disabled={uploadingFile}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handleFileUpload(selectedSubmission.id, selectedSubmission.user_id, selectedFiles)}
                        disabled={uploadingFile || selectedFiles.length === 0}
                        className={`mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                          uploadingFile || selectedFiles.length === 0
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700 cursor-pointer'
                        } transition-colors`}
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
                      </button>
                    </div>
                  )}
                </div>
                <button onClick={() => handleMarkStatusAsCompleted(selectedSubmission.id)} className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-md text-white px-4 py-2 mb-4">Mark status as completed</button>

                {/* Display uploaded files if exist */}
                {selectedSubmission.admin_uploaded_file && (
                  <div className="p-3 bg-white border border-green-200 rounded-md">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">
                      Uploaded Files
                    </h4>
                    <p className="text-xs text-gray-500 mb-3">
                      Uploaded on: {new Date(selectedSubmission.admin_uploaded_at).toLocaleString()}
                    </p>
                    
                    {(() => {
                      try {
                        // Try to parse as JSON array (new format)
                        const files = JSON.parse(selectedSubmission.admin_uploaded_file);
                        if (Array.isArray(files)) {
                          return (
                            <div className="space-y-2">
                              {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                                  <div className="flex items-center">
                                    <FileText className="mr-2 h-4 w-4 text-orange-600" />
                                    <span className="text-sm text-gray-700">{file.name}</span>
                                  </div>
                                  <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
                                  >
                                    <Download className="mr-1 h-3 w-3" />
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
                          <div className="flex items-center justify-between bg-gray-50 rounded-md p-2">
                            <div className="flex items-center">
                              <FileText className="mr-2 h-4 w-4 text-orange-600" />
                              <span className="text-sm text-gray-700">Uploaded File</span>
                            </div>
                            <a
                              href={selectedSubmission.admin_uploaded_file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
                            >
                              <Download className="mr-1 h-3 w-3" />
                              Download
                            </a>
                          </div>
                        );
                      }
                    })()}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 overflow-y-auto max-h-[40vh] bg-gray-50 p-4 rounded-md">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <tbody>
                  {selectedSubmission.form_data &&
                    Object.entries(selectedSubmission.form_data).map(
                      ([key, value]) => (
                        <tr key={key} className="border-b last:border-0">
                          <td className="py-2 px-3 font-medium text-gray-800 capitalize w-1/3">
                            {key.replace(/_/g, " ")}
                          </td>
                          {/* <td className="py-2 px-3 text-gray-700 break-words w-2/3">
                            {typeof value === "object"
                              ? JSON.stringify(value, null, 2)
                              : String(value)}
                          </td> */}

                          <td className="py-2 px-3 text-gray-700 break-words w-2/3">
                            {renderHumanReadable(value, key)}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
