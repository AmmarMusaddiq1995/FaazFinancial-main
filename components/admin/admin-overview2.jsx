// "use client";

// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { supabase } from "@/lib/supabaseClient";
// import {
//   Users,
//   Building2,
//   DollarSign,
//   TrendingUp,
//   BarChart3,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export function AdminOverview2() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalBusinesses: 0,
//     monthlyRevenue: 0,
//     growthRate: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [pendingOrders, setPendingOrders] = useState(0);
//   const [completedOrders, setCompletedOrders] = useState(0);
//   const [formSubmissionsData, setFormSubmissionsData] = useState([]);

//   /* ------- functions to fetch statistics ------- */

//   const fetchStatistics = async () => {
//     try {
//       const { data: userCount } = await supabase.from("user_data").select("*");
//       setTotalUsers(userCount.length);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrdersDetails = async () => {
//     try {
//       const { count: pending } = await supabase
//         .from("form_submissions")
//         .select("*", { count: "exact", head: true })
//         .eq("status", "pending");
//       setPendingOrders(pending);

//       const { count: completed } = await supabase
//         .from("form_submissions")
//         .select("*", { count: "exact", head: true })
//         .eq("status", "completed");
//       setCompletedOrders(completed);
//     } catch (error) {
//       console.error("Error fetching pending orders:", error);
//     }
//   };

//   const fetchFormSubmissions = async () => {
//     try {
//       const { data: formSubmissions } = await supabase
//         .from("form_submissions")
//         .select("*");
//       setFormSubmissionsData(formSubmissions);
//       console.log("formSubmissionsData:", formSubmissions);
//     } catch (error) {
//       console.error("Error fetching form submissions:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStatistics();
//     fetchOrdersDetails();
//     fetchFormSubmissions();
//   }, []);

//   useEffect(() => {
//     async function fetchStats() {
//       try {
//         // Fetch total users
//         const { data: userCount } = await supabase
//           .from("user_data")
//           .select("*");

//         // Fetch total businesses
//         // const { count: businessCount } = await supabase
//         //   .from("business_formations")
//         //   .select("*", { count: "exact", head: true });

//         // Calculate monthly revenue (mock data for demo)
//         const monthlyRevenue = (businessCount || 0) * 299; // Average service price

//         // Calculate growth rate (mock data for demo)
//         const growthRate = 12.5;
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchStats();
//   }, []);

//   const statCards = [
//     {
//       title: "Total Users",
//       value: stats.totalUsers.toLocaleString(),
//       description: "Registered users",
//       icon: Users,
//       color: "text-blue-600",
//     },
//     {
//       title: "Total Businesses",
//       value: stats.totalBusinesses.toLocaleString(),
//       description: "Business formations",
//       icon: Building2,
//       color: "text-green-600",
//     },
//     {
//       title: "Monthly Revenue",
//       value: `$${stats.monthlyRevenue.toLocaleString()}`,
//       description: "This month",
//       icon: DollarSign,
//       color: "text-yellow-600",
//     },
//     {
//       title: "Growth Rate",
//       value: `${stats.growthRate}%`,
//       description: "Month over month",
//       icon: TrendingUp,
//       color: "text-purple-600",
//     },
//   ];

//   if (loading) {
//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
//           <p className="text-gray-600">Welcome to the admin dashboard</p>
//         </div>
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {[...Array(4)].map((_, i) => (
//             <Card key={i} className="animate-pulse">
//               <CardHeader className="pb-2">
//                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
//                 <div className="h-3 bg-gray-200 rounded w-2/3"></div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
//         <p className="text-gray-600">Welcome to the admin dashboard</p>
//       </div>

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {statCards.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={stat.title}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600">
//                   {stat.title}
//                 </CardTitle>
//                 <Icon className={cn("h-4 w-4", stat.color)} />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-gray-900">
//                   {stat.value}
//                 </div>
//                 <CardDescription>{stat.description}</CardDescription>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       <div>
//         <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
//         <p> Total Users: {totalUsers} </p>
//         <p> Pending Orders: {pendingOrders} </p>
//         <p> Completed Orders: {completedOrders} </p>
//         <p> Form Submissions: {formSubmissionsData.length} </p>
//       </div>

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Activity</CardTitle>
//             <CardDescription>
//               Latest user registrations and business formations
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center space-x-4">
//                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">New user registration</p>
//                   <p className="text-xs text-gray-500">2 minutes ago</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">LLC formation completed</p>
//                   <p className="text-xs text-gray-500">15 minutes ago</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
//                 <div className="flex-1">
//                   <p className="text-sm font-medium">Payment processed</p>
//                   <p className="text-xs text-gray-500">1 hour ago</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>Common administrative tasks</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               <Button
//                 className="w-full justify-start bg-transparent"
//                 variant="outline"
//               >
//                 <Users className="mr-2 h-4 w-4" />
//                 Manage Users
//               </Button>
//               <Button
//                 className="w-full justify-start bg-transparent"
//                 variant="outline"
//               >
//                 <Building2 className="mr-2 h-4 w-4" />
//                 Review Formations
//               </Button>
//               <Button
//                 className="w-full justify-start bg-transparent"
//                 variant="outline"
//               >
//                 <BarChart3 className="mr-2 h-4 w-4" />
//                 View Analytics
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

/* -------- New Code --------- */

// "use client";

// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { supabase } from "@/lib/supabaseClient";
// import {
//   Users,
//   Building2,
//   DollarSign,
//   TrendingUp,
//   BarChart3,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";
// export function AdminOverview2() {
//   const [loading, setLoading] = useState(true);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [pendingOrders, setPendingOrders] = useState(0);
//   const [completedOrders, setCompletedOrders] = useState(0);
//   const [formSubmissionsData, setFormSubmissionsData] = useState([]);

//   const fetchStatistics = async () => {
//     try {
//       const { data: userCount } = await supabase.from("user_data").select("*");
//       setTotalUsers(userCount.length);
//     } catch (error) {
//       console.error("Error fetching stats:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrdersDetails = async () => {
//     try {
//       const { count: pending } = await supabase
//         .from("form_submissions")
//         .select("*", { count: "exact", head: true })
//         .eq("status", "pending");
//       setPendingOrders(pending);

//       const { count: completed } = await supabase
//         .from("form_submissions")
//         .select("*", { count: "exact", head: true })
//         .eq("status", "completed");
//       setCompletedOrders(completed);
//     } catch (error) {
//       console.error("Error fetching pending orders:", error);
//     }
//   };

//   const fetchFormSubmissions = async () => {
//     try {
//       const { data: formSubmissions } = await supabase
//         .from("form_submissions")
//         .select("*");
//       setFormSubmissionsData(formSubmissions);
//       console.log("formSubmissionsData:", formSubmissions);
//     } catch (error) {
//       console.error("Error fetching form submissions:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStatistics();
//     fetchOrdersDetails();
//     fetchFormSubmissions();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
//       <p> Total Users: {totalUsers} </p>
//       <p> Pending Orders: {pendingOrders} </p>
//       <p> Completed Orders: {completedOrders} </p>
//       <p> Form Submissions: {formSubmissionsData.length} </p>

//       <div className="p-6 bg-gray-50 min-h-screen">
//         <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//           Form Submissions
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {formSubmissionsData.map((submission) => (
//             <Card
//               key={submission.id}
//               className="shadow-sm hover:shadow-md transition-all border border-gray-200"
//             >
//               <CardHeader>
//                 <CardTitle className="text-lg font-semibold text-gray-800 flex justify-between items-center">
//                   {submission.service_name}
//                   <Badge
//                     className={`${
//                       submission.status === "completed"
//                         ? "bg-green-500"
//                         : submission.status === "in-progress"
//                         ? "bg-yellow-500"
//                         : "bg-gray-400"
//                     } text-white`}
//                   >
//                     {submission.status}
//                   </Badge>
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className="text-sm text-gray-700 space-y-2">
//                 <p>
//                   <span className="font-medium text-gray-800">
//                     Submission ID:
//                   </span>{" "}
//                   {submission.id}
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-800">User ID:</span>{" "}
//                   {submission.user_id}
//                 </p>
//                 <p>
//                   <span className="font-medium text-gray-800">Created At:</span>{" "}
//                   {new Date(submission.created_at).toLocaleString()}
//                 </p>

//                 {/* Parse form_data JSON */}
//                 {submission.form_data && (
//                   <div className="bg-gray-100 rounded-md p-3 overflow-x-auto">
//                     <p className="font-medium text-gray-800 mb-2">Form Data:</p>
//                     <ul className="space-y-1 text-gray-600 text-xs">
//                       {Object.entries(submission.form_data).map(
//                         ([key, value]) => (
//                           <li key={key}>
//                             <span className="font-medium capitalize">
//                               {key.replace(/_/g, " ")}:
//                             </span>{" "}
//                             {typeof value === "object"
//                               ? JSON.stringify(value)
//                               : String(value)}
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

/* ---------------- In tabluar form ---------  */

// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";

// export function AdminOverview2() {
//   const [formSubmissionsData, setFormSubmissionsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchFormSubmissions = async () => {
//     try {
//       const { data, error } = await supabase
//         .from("form_submissions")
//         .select("*")
//         .order("created_at", { ascending: false });

//       if (error) throw error;

//       setFormSubmissionsData(data);
//     } catch (error) {
//       console.error("Error fetching form submissions:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFormSubmissions();
//   }, []);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-500 text-white";
//       case "in-progress":
//         return "bg-yellow-500 text-white";
//       default:
//         return "bg-gray-400 text-white";
//     }
//   };

//   if (loading) {
//     return <p className="text-center text-gray-500 py-8">Loading data...</p>;
//   }

//   if (!formSubmissionsData.length) {
//     return (
//       <p className="text-center text-gray-500 py-8">
//         No form submissions found.
//       </p>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">
//         Form Submissions
//       </h2>

//       <Card className="shadow-sm border border-gray-200">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left border-collapse">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-4 py-3 border-b">ID</th>
//                 <th className="px-4 py-3 border-b">Created At</th>
//                 <th className="px-4 py-3 border-b">User ID</th>
//                 <th className="px-4 py-3 border-b">Service Name</th>
//                 <th className="px-4 py-3 border-b">Status</th>
//                 <th className="px-4 py-3 border-b">Form Data</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formSubmissionsData.map((submission, index) => (
//                 <tr
//                   key={submission.id || index}
//                   className="border-b hover:bg-gray-50 transition-all"
//                 >
//                   <td className="px-4 py-3 font-medium text-gray-800">
//                     {submission.id}
//                   </td>
//                   <td className="px-4 py-3 text-gray-600">
//                     {new Date(submission.created_at).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-3 text-gray-600">
//                     {submission.user_id}
//                   </td>
//                   <td className="px-4 py-3 font-medium text-gray-700 capitalize">
//                     {submission.service_name}
//                   </td>
//                   <td className="px-4 py-3">
//                     <Badge className={getStatusColor(submission.status)}>
//                       {submission.status}
//                     </Badge>
//                   </td>
//                   <td className="px-4 py-3">
//                     <details className="cursor-pointer">
//                       <summary className="text-blue-600 hover:underline">
//                         View Data
//                       </summary>
//                       <div className="mt-2 bg-gray-100 rounded-md p-2 text-xs text-gray-700 overflow-x-auto">
//                         <ul className="space-y-1">
//                           {submission.form_data &&
//                             Object.entries(submission.form_data).map(
//                               ([key, value]) => (
//                                 <li key={key}>
//                                   <strong>{key.replace(/_/g, " ")}:</strong>{" "}
//                                   {typeof value === "object"
//                                     ? JSON.stringify(value)
//                                     : String(value)}
//                                 </li>
//                               )
//                             )}
//                         </ul>
//                       </div>
//                     </details>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   );
// }

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

export function AdminOverview2() {
  const [formSubmissionsData, setFormSubmissionsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

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

  const handleFileUpload = async (formId, userId, file) => {
    if (!file) return;
    
    setUploadingFile(true);
    try {
      // Create a unique filename with form_id and timestamp
      const fileName = `admin-uploads/${formId}/${Date.now()}-${file.name}`;
      
      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        alert("Failed to upload file. Please try again.");
        return;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("uploads")
        .getPublicUrl(fileName);

      const fileUrl = publicUrlData.publicUrl;

      // Update form_submissions table with the uploaded file URL
      const { error: updateError } = await supabase
        .from("form_submissions")
        .update({
          admin_uploaded_file: fileUrl,
          admin_uploaded_at: new Date().toISOString()
        })
        .eq("id", formId);

      if (updateError) {
        console.error("Error updating form submission:", updateError);
        alert("File uploaded but failed to update record. Please refresh and try again.");
        return;
      }

      // Update local state
      setUploadedFiles(prev => ({
        ...prev,
        [formId]: {
          url: fileUrl,
          name: file.name,
          uploadedAt: new Date().toISOString()
        }
      }));

      alert("File uploaded successfully!");
      
      // Refresh the data
      fetchFormSubmissions();
      
    } catch (error) {
      console.error("Error in file upload:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setUploadingFile(false);
    }
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
      case "succeeded":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
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

        console.log("data in handleMarkStatusAsCompleted:", data);
    } catch (error) {
      console.error("Error marking status as completed:", error);
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
                    {submission.amount}
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
          <DialogContent className="max-w-3xl w-full max-h-[85vh] overflow-hidden">
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
            {selectedSubmission.payment_status === "succeeded" && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                  <Upload className="mr-2 h-5 w-5" />
                  Admin File Upload
                </h3>
                
                {/* File Upload Input */}
                <div className="mb-4">
                  <input
                    type="file"
                    id={`file-upload-${selectedSubmission.id}`}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleFileUpload(selectedSubmission.id, selectedSubmission.user_id, file);
                      }
                    }}
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
                        Upload File
                      </>
                    )}

                  </label>

                 
                </div>
                <button onClick={() => handleMarkStatusAsCompleted(selectedSubmission.id)} className="bg-blue-600 hover:bg-blue-700 cursor-pointer rounded-md text-white px-4 py-2 mb-4">Mark status as completed</button>

                {/* Display uploaded file if exists */}
                {selectedSubmission.admin_uploaded_file && (
                  <div className="p-3 bg-white border border-green-200 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Uploaded File
                          </p>
                          <p className="text-xs text-gray-500">
                            Uploaded on: {new Date(selectedSubmission.admin_uploaded_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <a
                        href={selectedSubmission.admin_uploaded_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
                      >
                        <Download className="mr-1 h-3 w-3" />
                        Download
                      </a>
                    </div>
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
                            {typeof value === "object" ? (
                              JSON.stringify(value, null, 2)
                            ) : typeof value === "string" &&
                              value.startsWith("http") ? (
                              <a
                                href={value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                              >
                                {value.split("/").pop()}{" "}
                                {/* show file name only */}
                              </a>
                            ) : (
                              String(value)
                            )}
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
