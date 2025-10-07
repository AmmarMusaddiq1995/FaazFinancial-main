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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthContext } from "@/context/AppContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    debugger;
    try {
      await login({ email, password });
      toast.success("Login successful!");
      router.push("/");
    } catch (err) {
      console.error("Unexpected error:", err);
      const message = err?.message || "Invalid email or password";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center p-6">
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

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
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your FaazFinancialGroup account to manage your business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} autoComplete="off">
              <div className="flex flex-col gap-6">
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
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </div>
              <div className="mt-6 text-center text-sm">
                <Link
                  href="#"
                  className="text-cyan-600 hover:text-cyan-700 underline underline-offset-4"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/sign-up2"
                  className="text-cyan-600 hover:text-cyan-700 underline underline-offset-4 font-medium"
                >
                  Create one now
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
