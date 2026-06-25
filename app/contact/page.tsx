import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+1-307-400-1963",
      description: "Monday - Saturday, 10am - 4pm EST",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "info@faazfinancialgroup.com",
      description: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: "30 N Gould St # 51825 Sheridan, WY 82801 USA",
      description: "Serving all 50 states",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday",
      description: "09:00 AM - 05:00 PM EST",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 mb-8 text-pretty">
                Have questions about starting your business? Our expert team is
                here to help you every step of the way.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <info.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                    <p className="text-primary font-medium mb-1">
                      {info.details}
                    </p>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and we'll get back to you within 24
                    hours. For urgent matters, please call our support line.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Quick Response</h4>
                        <p className="text-sm text-gray-600">
                          Most inquiries answered within 2 hours during business
                          hours
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Expert Guidance</h4>
                        <p className="text-sm text-gray-600">
                          Get advice from business formation specialists
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "How long does it take to form my business?",
                  answer:
                    "7 days under Express Package and 14 businessdays under Normal Package",
                },
                {
                  question: "Do I need a registered agent?",
                  answer:
                    "Yes, all businesses must have a registered agent in their state of formation. We provide this service for free with our packages.",
                },
                {
                  question: "What's included in your formation packages?",
                  answer:
                    "Our packages include state filing, registered agent service, operating agreement templates, and ongoing support.",
                },
                {
                  question: "Can you help with ongoing compliance?",
                  answer:
                    "Yes, we offer ongoing compliance services including annual reports, tax reminders, and document management.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3">{faq.question}</h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
