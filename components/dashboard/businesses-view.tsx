import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Calendar,
  MapPin,
  DollarSign,
  Plus,
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface BusinessesViewProps {
  formations: any[]
}

export function BusinessesView({ formations }: BusinessesViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getProgressValue = (status: string) => {
    switch (status) {
      case "completed":
        return 100
      case "processing":
        return 75
      case "pending":
        return 25
      default:
        return 0
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Businesses</h1>
          <p className="text-gray-600 mt-2">Manage your business formations and track their progress</p>
        </div>
        <Link href="/pricing">
          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="mr-2 h-4 w-4" />
            Start New Business
          </Button>
        </Link>
      </div>

      {/* Businesses Grid */}
      {formations.length > 0 ? (
        <div className="grid gap-6">
          {formations.map((formation) => (
            <Card key={formation.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-cyan-100 rounded-lg">
                      <Building2 className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{formation.business_name}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center">
                          <Building2 className="h-4 w-4 mr-1" />
                          {formation.business_type}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {formation.state}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(formation.created_at).toLocaleDateString()}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(formation.status)}>
                      {getStatusIcon(formation.status)}
                      <span className="ml-1 capitalize">{formation.status}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Formation Progress</span>
                      <span className="text-sm text-gray-500">{getProgressValue(formation.status)}%</span>
                    </div>
                    <Progress value={getProgressValue(formation.status)} className="h-2" />
                    <p className="text-xs text-gray-600">
                      {formation.status === "completed" && "Your business is fully formed and ready!"}
                      {formation.status === "processing" && "Documents are being processed by the state"}
                      {formation.status === "pending" && "Waiting for document preparation"}
                    </p>
                  </div>

                  {/* Package Details */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Package Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Package:</span>
                        <span className="font-medium capitalize">{formation.package_type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-medium">${formation.total_amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium">{new Date(formation.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      {formation.status === "completed" && (
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Download className="mr-2 h-4 w-4" />
                          Download Documents
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <DollarSign className="mr-2 h-4 w-4" />
                        View Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't started any business formations yet. Get started today and we'll guide you through the entire
              process.
            </p>
            <Link href="/pricing">
              <Button className="bg-cyan-600 hover:bg-cyan-700">
                <Plus className="mr-2 h-4 w-4" />
                Start Your First Business
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
