import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "access_denied":
        return "Access was denied. Please try again or contact support."
      case "server_error":
        return "A server error occurred. Please try again later."
      case "temporarily_unavailable":
        return "The service is temporarily unavailable. Please try again later."
      default:
        return "An unexpected error occurred during authentication."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-cyan-600 flex items-center justify-center">
              <span className="text-white font-bold">FFG</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">FaazFinancialGroup</span>
          </Link>
        </div>

        <Card className="shadow-lg text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-red-800">
                {params?.error ? getErrorMessage(params.error) : "An unspecified error occurred."}
              </p>
              {params?.error && <p className="text-xs text-red-600 mt-2">Error code: {params.error}</p>}
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                If this problem persists, please contact our support team for assistance.
              </p>

              <div className="flex flex-col gap-3">
                <Link href="/auth/login">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Try Again</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full bg-transparent">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← Back to FaazFinancialGroup
          </Link>
        </div>
      </div>
    </div>
  )
}
