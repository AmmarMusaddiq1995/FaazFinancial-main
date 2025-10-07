import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Shield, Clock } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { number: "500K+", label: "Businesses Formed" },
    { number: "15+", label: "Years Experience" },
    { number: "50", label: "States Covered" },
    { number: "4.8/5", label: "Customer Rating" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Your business information is protected with bank-level security and confidentiality.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description:
        "Our team of business formation experts is here to guide you every step of the way.",
    },
    {
      icon: Clock,
      title: "Fast & Reliable",
      description:
        "Quick turnaround times without compromising on quality or accuracy.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description:
        "Thousands of successful business formations and satisfied customers.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-cyan-100 text-cyan-800">
                About FaazFinancialGroup
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
                Simplifying Business Formation Since 2008
              </h1>
              <p className="text-xl text-gray-600 mb-8 text-pretty">
                We believe starting a business should be simple, affordable, and
                stress-free. That's why we've helped over 500,000 entrepreneurs
                turn their dreams into reality.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Founded in 2008, FaazFinancialGroup was born from a simple
                    idea: business formation should be accessible to everyone,
                    not just those who can afford expensive lawyers.
                  </p>
                  <p className="text-gray-600 mb-6">
                    What started as a small team helping local entrepreneurs has
                    grown into a trusted platform serving businesses across all
                    50 states. We've streamlined the complex process of business
                    formation, making it simple, affordable, and transparent.
                  </p>
                  <p className="text-gray-600">
                    Today, we're proud to be the go-to choice for entrepreneurs
                    who want to focus on building their business, not navigating
                    bureaucracy.
                  </p>
                </div>
                <div className="relative">
                  <img
                    src="/modern-office-collaboration.png"
                    alt="FaazFinancialGroup team"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Values
              </h2>
              <p className="text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <value.icon className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Our Leadership Team
              </h2>
              <p className="text-xl text-gray-600">
                Experienced professionals dedicated to your success
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Zoaib Aziz",
                  role: "CEO & Founder",
                  image: "professional woman executive",
                },
                {
                  name: "Zaid Aslam",
                  role: "CTO",
                  image: "professional man technology leader",
                },
                {
                  name: "Haseeb Aslam",
                  role: "Head of Customer Success",
                  image: "professional woman customer service",
                },
              ].map((member, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <img
                      src={`/abstract-geometric-shapes.png?height=200&width=200&query=${member.image}`}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      {member.name}
                    </h3>
                    <p className="text-cyan-600 font-medium">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let us help you start your business journey with confidence.
            </p>
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
              Start Your Business Today
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
