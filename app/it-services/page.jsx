import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  Code2,
  Sparkles,
  Bot,
  Workflow,
  Globe,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Custom Web Development",
    description:
      "Responsive, fast-loading websites and web apps built with modern frameworks like Next.js and React, tailored to your brand and business goals.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce & Business Sites",
    description:
      "From landing pages to full storefronts, designed to convert visitors into customers with clean UX and built-in SEO foundations.",
  },
  {
    icon: Bot,
    title: "AI Chatbots & Assistants",
    description:
      "Custom AI-powered chat assistants for customer support, lead capture, and internal tooling, connected to your own data and workflows.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Automate repetitive business processes - form intake, data entry, notifications, and reporting - using AI and no-code/low-code integrations.",
  },
];

// Placeholder projects - replace with real portfolio details (name, description, links, images)
const portfolioProjects = [
  {
    title: "Nayl Luxury Rentals",
    category: "Web Development",
    description:
      "A custom-built website for a luxury car rental company in UAE, featuring a modern design and seamless booking functionality.",
    tags: ["Next.js", "Tailwind CSS", "Strapi CMS"],
    image: "/placeholder.svg",
    link: "https://naylrentalcardxb.com",
  },
  {
    title: "AI-Powered Lead Capture",
    category: "AI Automation",
    description:
      "An AI-powered lead capture system that integrates with your CRM and email marketing tools to automatically qualify and nurture leads.",
    tags: ["OpenAI API", "Google Sheets", "N8N" , "Gmail API"],
    image: "/placeholder.svg",
    link: "#",
  },
  {
    title: "Future Cell & Gadgets",
    category: "Web Development",
    description:
      "A sleek e-commerce site for a mobile phone retailer, built with Next.js and PostgreSQL for inventory management.",
    tags: ["React", "Tailwind CSS", "Supabase", "PostgreSQL"],
    image: "/placeholder.svg",
    link: "https://futurecellandgadgets.vercel.app",
  },
];

export default function ITServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-28">
        <div className="container px-4 mx-auto text-center max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Web Development & AI Automation
          </span>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-balance">
            Websites and <span className="text-orange-500">AI Automation</span> Built for Your Business
          </h1>
          <p className="text-sm lg:text-xl text-gray-300 mb-8 text-pretty">
            Alongside compliance and bookkeeping, we design, build, and automate the technology
            that helps your business run smarter and look professional online.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 cursor-pointer text-primary-foreground px-8 py-4 text-lg">
              Start a Project
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl lg:text-4xl font-bold mb-4 text-balance">
              What We <span className="text-orange-500">Offer</span>
            </h2>
            <p className="text-sm lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              From a single landing page to a fully automated back office, we cover the full stack.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <service.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-base lg:text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xl lg:text-4xl font-bold mb-4 text-balance">
              Portfolio <span className="text-orange-500">Projects</span>
            </h2>
            <p className="text-sm lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              A sample of recent work. Reach out for a full case study walkthrough.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 pt-0">
                <div className="h-48 bg-muted overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {project.category}
                  </Badge>
                  <CardTitle className="text-base lg:text-lg flex items-center justify-between gap-2">
                    {project.title}
                    {project.link !== "#" && (
                      <Link href={project.link} target="_blank" className="text-muted-foreground hover:text-primary">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="container px-4 mx-auto text-center max-w-2xl">
          <Code2 className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-balance">
            Have a Web or Automation Project in Mind?
          </h2>
          <p className="text-sm lg:text-lg text-gray-300 mb-8">
            Tell us what you're trying to build or automate, and we'll get back to you with next steps.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 cursor-pointer text-primary-foreground px-8 py-4 text-lg">
              Get In Touch
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
