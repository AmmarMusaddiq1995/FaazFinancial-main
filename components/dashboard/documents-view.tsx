import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Download,
  Search,
  Calendar,
  Building2,
  Shield,
  CreditCard,
  FileCheck,
  Eye,
  Filter,
} from "lucide-react"

interface DocumentsViewProps {
  formations: any[]
}

export function DocumentsView({ formations }: DocumentsViewProps) {
  // Mock documents data - in a real app, this would come from the database
  const documents = [
    {
      id: 1,
      name: "Articles of Organization",
      type: "Formation Document",
      businessName: "Tech Startup LLC",
      date: "2024-03-15",
      status: "completed",
      size: "2.4 MB",
      icon: FileText,
    },
    {
      id: 2,
      name: "Operating Agreement",
      type: "Legal Document",
      businessName: "Tech Startup LLC",
      date: "2024-03-16",
      status: "completed",
      size: "1.8 MB",
      icon: Shield,
    },
    {
      id: 3,
      name: "EIN Confirmation Letter",
      type: "Tax Document",
      businessName: "Tech Startup LLC",
      date: "2024-03-18",
      status: "completed",
      size: "0.5 MB",
      icon: FileCheck,
    },
    {
      id: 4,
      name: "State Filing Receipt",
      type: "Receipt",
      businessName: "Tech Startup LLC",
      date: "2024-03-15",
      status: "completed",
      size: "0.3 MB",
      icon: CreditCard,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Formation Document":
        return "bg-cyan-100 text-cyan-800"
      case "Legal Document":
        return "bg-purple-100 text-purple-800"
      case "Tax Document":
        return "bg-orange-100 text-orange-800"
      case "Receipt":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
        <p className="text-gray-600 mt-2">Access and download all your business formation documents</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            <Button variant="outline" className="bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      {formations.length > 0 ? (
        <div className="space-y-6">
          {/* Documents by Business */}
          {formations.map((formation) => (
            <Card key={formation.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-6 w-6 text-cyan-600" />
                    <div>
                      <CardTitle className="text-lg">{formation.business_name}</CardTitle>
                      <CardDescription>
                        {formation.business_type} • {formation.state} • Formed{" "}
                        {new Date(formation.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(formation.status)}>
                    <span className="capitalize">{formation.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {formation.status === "completed" ? (
                  <div className="grid gap-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <doc.icon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.name}</h4>
                            <div className="flex items-center space-x-4 mt-1">
                              <Badge variant="secondary" className={getTypeColor(doc.type)}>
                                {doc.type}
                              </Badge>
                              <span className="text-sm text-gray-500 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(doc.date).toLocaleDateString()}
                              </span>
                              <span className="text-sm text-gray-500">{doc.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Documents Not Ready</h3>
                    <p className="text-gray-600 mb-4">
                      Your documents will be available once your business formation is completed.
                    </p>
                    <Badge className={getStatusColor(formation.status)}>
                      <span className="capitalize">Current Status: {formation.status}</span>
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You don't have any business formations yet. Start your first business to access formation documents.
            </p>
            <Button className="bg-cyan-600 hover:bg-cyan-700">Start Your First Business</Button>
          </CardContent>
        </Card>
      )}

      {/* Document Types Info */}
      <Card>
        <CardHeader>
          <CardTitle>Document Types</CardTitle>
          <CardDescription>Understanding the documents you'll receive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <FileText className="h-8 w-8 text-cyan-600 mb-3" />
              <h4 className="font-semibold mb-2">Formation Documents</h4>
              <p className="text-sm text-gray-600">
                Official state-filed documents that establish your business entity
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <Shield className="h-8 w-8 text-purple-600 mb-3" />
              <h4 className="font-semibold mb-2">Legal Documents</h4>
              <p className="text-sm text-gray-600">Operating agreements and other legal documents for your business</p>
            </div>
            <div className="p-4 border rounded-lg">
              <FileCheck className="h-8 w-8 text-orange-600 mb-3" />
              <h4 className="font-semibold mb-2">Tax Documents</h4>
              <p className="text-sm text-gray-600">EIN confirmation letters and tax-related documentation</p>
            </div>
            <div className="p-4 border rounded-lg">
              <CreditCard className="h-8 w-8 text-gray-600 mb-3" />
              <h4 className="font-semibold mb-2">Receipts</h4>
              <p className="text-sm text-gray-600">Payment receipts and filing confirmations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
