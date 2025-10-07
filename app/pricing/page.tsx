import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for getting started quickly",
      popular: false,
      features: [
        { name: "LLC Formation", included: true },
        { name: "Registered Agent (1 year)", included: true },
        { name: "Articles of Organization", included: true },
        { name: "Operating Agreement Template", included: true },
        { name: "EIN Application", included: false },
        { name: "Business License Research", included: false },
        { name: "Banking Resolution", included: false },
        { name: "Expedited Filing", included: false },
        { name: "Phone Support", included: false },
      ],
      cta: "Get Started Free",
      note: "+ state filing fees",
    },
    {
      name: "Standard",
      price: "$199",
      description: "Most popular choice for new businesses",
      popular: true,
      features: [
        { name: "LLC Formation", included: true },
        { name: "Registered Agent (1 year)", included: true },
        { name: "Articles of Organization", included: true },
        { name: "Operating Agreement Template", included: true },
        { name: "EIN Application", included: true },
        { name: "Business License Research", included: true },
        { name: "Banking Resolution", included: true },
        { name: "Expedited Filing", included: false },
        { name: "Phone Support", included: true },
      ],
      cta: "Choose Standard",
      note: "+ state filing fees",
    },
    {
      name: "Premium",
      price: "$399",
      description: "Complete package with premium features",
      popular: false,
      features: [
        { name: "LLC Formation", included: true },
        { name: "Registered Agent (1 year)", included: true },
        { name: "Articles of Organization", included: true },
        { name: "Operating Agreement Template", included: true },
        { name: "EIN Application", included: true },
        { name: "Business License Research", included: true },
        { name: "Banking Resolution", included: true },
        { name: "Expedited Filing", included: true },
        { name: "Phone Support", included: true },
      ],
      cta: "Choose Premium",
      note: "+ state filing fees",
    },
  ]

  const addOnServices = [
    {
      name: "Registered Agent Service",
      price: "$199/year",
      description: "Professional business address and document handling",
    },
    { name: "EIN Application", price: "$79", description: "Federal Tax ID number application" },
    { name: "Operating Agreement", price: "$199", description: "Customized operating agreement for your LLC" },
    { name: "Business License Research", price: "$199", description: "Comprehensive license and permit research" },
    { name: "Expedited Filing", price: "$149", description: "Rush processing for faster formation" },
    { name: "Corporate Seal & Book", price: "$99", description: "Professional corporate seal and record book" },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
                Simple, Transparent Pricing
              </h1>
              <p className="text-xl text-gray-600 mb-8 text-pretty">
                Choose the package that's right for your business. No hidden fees, no surprises.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "ring-2 ring-cyan-500 scale-105" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cyan-600">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="text-4xl font-bold text-cyan-600 mt-4">
                      {plan.price}
                      <span className="text-sm font-normal text-gray-500 block">{plan.note}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "text-gray-900" : "text-gray-400"}>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${plan.popular ? "bg-cyan-600 hover:bg-cyan-700" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Add-on Services */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Add-on Services</h2>
              <p className="text-xl text-gray-600">Enhance your package with additional services</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {addOnServices.map((service, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold">{service.name}</h3>
                      <span className="text-cyan-600 font-bold">{service.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      Add to Package
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* State Fees */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">State Filing Fees</h2>
              <p className="text-xl text-gray-600 mb-8">
                Required state fees vary by location. Here are some popular states:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { state: "Delaware", fee: "$90" },
                { state: "Nevada", fee: "$75" },
                { state: "Wyoming", fee: "$100" },
                { state: "Texas", fee: "$300" },
                { state: "California", fee: "$70" },
                { state: "Florida", fee: "$125" },
                { state: "New York", fee: "$200" },
                { state: "Illinois", fee: "$150" },
              ].map((item, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{item.state}</h3>
                    <p className="text-2xl font-bold text-cyan-600">{item.fee}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't see your state?{" "}
                <Button variant="link" className="p-0 h-auto text-cyan-600">
                  View all state fees
                </Button>
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Business?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who chose FaazFinancialGroup for their formation needs.
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
                Compare All Features
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
