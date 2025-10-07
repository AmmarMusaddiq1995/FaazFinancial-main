import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Mail } from "lucide-react";

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-cyan-600 flex items-center justify-center">
              <span className="text-white font-bold">FFG</span>
            </div>
            <span className="font-bold text-2xl text-gray-900">
              FaazFinancialGroup
            </span>
          </Link>
        </div>

        <Card className="shadow-lg text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Account Created Successfully!
            </CardTitle>
            {/* <CardDescription>
              We've sent you a confirmation email
            </CardDescription> */}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-cyan-50 p-4 rounded-lg">
              {/* <Mail className="h-8 w-8 text-cyan-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Please check your email and click the confirmation link to
                activate your account. You won't be able to sign in until your
                email is verified.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Didn't receive the email? Check your spam folder or contact our
                support team.
              </p> */}

              <div className="flex flex-col gap-3">
                <Link href="/auth/login2">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                    Go to Sign In
                  </Button>
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
  );
}
