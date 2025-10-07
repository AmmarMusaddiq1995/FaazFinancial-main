"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthContext } from "@/context/AppContext";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuthContext();
  // const {
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   repeatPassword,
  //   agreeToTerms,
  //   error,
  //   isLoading,
  // } = useAuthContext();

  // console.log(
  //   "data = ",
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   repeatPassword,
  //   agreeToTerms,
  //   error,
  //   isLoading
  // );

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }

    try {
      await signup({ email, password, firstName, lastName });
      router.push("/auth/sign-up-success");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Start Your Business Journey
            </CardTitle>
            <CardDescription>
              Create your FaazFinancialGroup account to begin forming your
              company
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} autoComplete="off">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">
                    Must be at least 8 characters long
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="repeat-password">Confirm Password</Label>
                  <Input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I agree to the{" "}
                    <Link
                      href="/legal/terms"
                      className="text-cyan-600 hover:text-cyan-700 underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/legal/privacy"
                      className="text-cyan-600 hover:text-cyan-700 underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-cyan-600 hover:text-cyan-700 underline underline-offset-4 font-medium"
                >
                  Sign in
                </Link>
              </div>
            </form>
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
