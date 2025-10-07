import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, FileText, Shield, ArrowRight } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Choose Your Package",
      description: "Select the formation package that best fits your business needs and budget.",
      icon: FileText,
      details: [
        "Compare our Starter, Standard, and Premium packages",
        "All packages include state filing and registered agent service",
        "Add optional services like EIN application and operating agreement",
      ],
    },
    {
      number: "02",
      title: "Provide Business Information",
      description: "Fill out our simple online form with your business details.",
      icon: CheckCircle,
      details: [
        "Business name and type (LLC, Corporation, etc.)",
        "State of formation and business address",
        "Owner/member information and management structure",
      ],
    },
    {
      number: "03",
      title: "We Handle the Filing",
      description: "Our experts prepare and file your formation documents with the state.",
      icon: Clock,
      details: [
        "Professional document preparation and review",
        "Direct filing with state agencies",
        "Real-time status updates throughout the process",
      ],
    },
    {
      number: "04",
      title: "Your Business is Formed",
      description: "Receive your official documents and start operating your business.",
      icon: Shield,
      details: [
        "Official state-stamped formation documents",
        "Access to ongoing compliance support",
        "Resources to help you grow your business",
      ],
    },
  ]

  const benefits = [
    {
      title: "Expert Guidance",
      description: "Our business formation specialists guide you through every step of the process.",
    },
    {
      title: "Fast Processing",
      description: "Most formations completed within 5-15 business days, with expedited options available.",
    },
    {
      title: "Ongoing Support",
      description: "Continued assistance with compliance, annual reports, and business growth.",
    },
    {
      title: "Transparent Pricing",
      description: "No hidden fees - all costs clearly disclosed upfront with no surprises.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-cyan-100 text-cyan-800">How It Works</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
                Business Formation Made Simple
              </h1>
              <p className="text-xl text-gray-600 mb-8 text-pretty">
                From choosing your package to receiving your official documents, we make starting your business
                straightforward and stress-free.
              </p>
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                Start Your Business Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  4 Simple Steps to Start Your Business
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Our streamlined process takes the complexity out of business formation
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {steps.map((step, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
                            <step.icon className="h-8 w-8 text-cyan-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl font-bold text-cyan-600">{step.number}</span>
                            <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-6">{step.description}</p>
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Typical Timeline</h2>
              <p className="text-xl text-gray-600 mb-12">Here's what you can expect during the formation process</p>

              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-cyan-600">1</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Day 1</h3>
                    <p className="text-gray-600">Order placed and documents prepared</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-cyan-600">2-3</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Days 2-3</h3>
                    <p className="text-gray-600">Filed with state agency for processing</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-cyan-600">5-15</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Days 5-15</h3>
                    <p className="text-gray-600">Approved and documents delivered</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-4 bg-cyan-50 rounded-lg">
                <p className="text-cyan-800">
                  <strong>Need it faster?</strong> Expedited processing available for most states - typically 1-3
                  business days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose ZenBusiness?</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  We've helped over 500,000 entrepreneurs start their businesses with confidence
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Included in Every Package</h2>
                <p className="text-xl text-gray-600">Essential services to get your business started right</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Formation Essentials</h3>
                    <ul className="space-y-3">
                      {[
                        "Business name availability check",
                        "Articles of Organization/Incorporation filing",
                        "State filing fee included in some packages",
                        "Official state-stamped documents",
                        "Formation confirmation and tracking",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Ongoing Support</h3>
                    <ul className="space-y-3">
                      {[
                        "Registered agent service (1 year free)",
                        "Compliance calendar and reminders",
                        "Document storage and access",
                        "Customer support and guidance",
                        "Business growth resources",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Business Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who chose ZenBusiness to launch their dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                Start Your LLC Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                Compare Packages
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
