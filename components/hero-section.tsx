import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden -mt-20 pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-100">
        <img
          src="/zero-section.png"
          alt="Entrepreneur working"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative container px-4 py-20 lg:py-32">
        <div className="max-w-2xl">
          <div className="mb-6">
            <span className="inline-block bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
              EVERYTHING YOU NEED. ALL IN ONE PLACE.
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">
            Launch Your Dream Business
          </h1>

          <p className="text-xl lg:text-2xl text-gray-300 mb-8 text-pretty">
            Start and protect your business with worry-free services and expert
            support. Starting at $0 + state fees.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/start-business">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
              >
                Get started
              </Button>
            </Link>
          </div>

          {/* Reviews */}
          {/* <div className="flex items-center space-x-4 text-sm">
            <span className="font-semibold">Excellent</span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-green-500 text-green-500"
                />
              ))}
            </div>
            <span className="text-gray-300">24,000 reviews</span>
            <span className="text-gray-300">Trustpilot</span>
          </div> */}
        </div>
      </div>

      {/* Feature Icons */}
      <div className="relative bg-slate-800/50 border-t border-slate-700">
        <div className="container px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xl">📋</span>
              </div>
              <span className="text-sm text-gray-300">
                Formation and Compliance
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xl">🌐</span>
              </div>
              <span className="text-sm text-gray-300">Website and Domain</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xl">📊</span>
              </div>
              <span className="text-sm text-gray-300">
                Banking and Bookkeeping
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xl">💡</span>
              </div>
              <span className="text-sm text-gray-300">
                Tax Advice and Filing
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-xl">🎯</span>
              </div>
              <span className="text-sm text-gray-300">
                Expert Customer Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
