import { Button } from "@/components/ui/button";
import { Code2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ITServicesTeaser() {
  return (
    <section className="py-10 lg:py-20 bg-slate-900 text-white">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Web Development & AI Automation
            </span>
            <h2 className="text-xl lg:text-4xl font-bold mb-4 text-balance">
              Need more than compliance? We <span className="text-orange-500">build</span> your tech, too.
            </h2>
            <p className="text-sm lg:text-lg text-gray-300 mb-8 text-pretty">
              Beyond formation and bookkeeping, we design and build websites and AI-powered
              automation that helps your business run leaner and look sharper online.
            </p>
            <Link href="/it-services">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 cursor-pointer text-primary-foreground"
              >
                Explore IT Services
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Code2 className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Web Development</h3>
              <p className="text-sm text-gray-400">
                Custom business and e-commerce websites built to convert.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-colors">
              <Sparkles className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">AI Automation</h3>
              <p className="text-sm text-gray-400">
                Workflow and chatbot automation that cuts manual busywork.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
