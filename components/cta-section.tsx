"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CTASection() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/services/llc-formation-2");
  };
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-balance">
          LLC Formation in 3 Simple Steps
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="space-y-4">
            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold">Choose Your State</h3>
            <p className="text-gray-300">
              Select the state where you want to form your LLC and we'll handle
              the rest.
            </p>
          </div>

          <div className="space-y-4">
            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold">Provide Your Information</h3>
            <p className="text-gray-300">
              Fill out our simple form with your business details and contact
              information.
            </p>
          </div>

          <div className="space-y-4">
            <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold">We File Your LLC</h3>
            <p className="text-gray-300">
              We prepare and file your Articles of Organization with the state.
            </p>
          </div>
        </div>

        <Button
          onClick={handleClick}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
        >
          Start Your LLC Today
        </Button>
      </div>
    </section>
  );
}
