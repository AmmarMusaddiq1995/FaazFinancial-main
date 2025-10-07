import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, MessageCircle, Phone } from "lucide-react"

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is an LLC and why should I form one?",
          answer:
            "A Limited Liability Company (LLC) is a business structure that combines the limited liability protection of a corporation with the tax advantages and operational flexibility of a partnership. It protects your personal assets from business debts and liabilities while offering tax flexibility and easier management requirements than corporations.",
        },
        {
          question: "How long does it take to form my LLC?",
          answer:
            "Formation time varies by state, but most LLCs are approved within 5-15 business days. Some states like Delaware can process in 1-2 business days, while others may take 2-3 weeks. We offer expedited filing services for faster processing in most states.",
        },
        {
          question: "Do I need a registered agent?",
          answer:
            "Yes, every LLC must have a registered agent in the state where it's formed. The registered agent receives important legal documents and state correspondence on behalf of your business. We provide registered agent service free for the first year with our formation packages.",
        },
        {
          question: "Can I form an LLC in any state?",
          answer:
            "Yes, you can form your LLC in any state regardless of where you live or plan to do business. Popular states like Delaware, Nevada, and Wyoming offer business-friendly laws and tax advantages. However, you may need to register as a foreign LLC in states where you conduct business.",
        },
      ],
    },
    {
      category: "Pricing & Fees",
      questions: [
        {
          question: "What are state filing fees?",
          answer:
            "State filing fees are mandatory fees charged by each state to process your LLC formation documents. These fees vary by state, ranging from $50 in Kentucky to $500 in Massachusetts. Our service fees are separate from and in addition to these required state fees.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No, we believe in transparent pricing. All fees are clearly disclosed upfront. The only additional costs would be optional add-on services you choose or expedited processing fees if you need faster filing.",
        },
        {
          question: "Do you offer refunds?",
          answer:
            "We offer a satisfaction guarantee. If we cannot successfully file your LLC formation documents, we'll provide a full refund of our service fees. State filing fees are non-refundable as they're paid directly to the state.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers. Payment is processed securely through encrypted connections.",
        },
      ],
    },
    {
      category: "After Formation",
      questions: [
        {
          question: "What do I need to do after my LLC is formed?",
          answer:
            "After formation, you should obtain an EIN from the IRS, open a business bank account, create an operating agreement, obtain necessary business licenses, and set up your accounting system. We provide guidance and services for all these post-formation steps.",
        },
        {
          question: "Do I need an operating agreement?",
          answer:
            "While not required in all states, an operating agreement is highly recommended for all LLCs. It defines ownership structure, management responsibilities, profit distribution, and procedures for major decisions. This document helps prevent disputes and provides legal protection.",
        },
        {
          question: "How do I get an EIN for my LLC?",
          answer:
            "An Employer Identification Number (EIN) is required for tax purposes and to open a business bank account. You can apply directly with the IRS for free, or we can handle the application process for you for a service fee, ensuring accuracy and faster processing.",
        },
        {
          question: "What ongoing compliance is required?",
          answer:
            "LLCs typically need to file annual reports with the state, maintain good standing, and comply with tax obligations. Requirements vary by state. We offer ongoing compliance services to help you stay current with all requirements and deadlines.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "How can I track my formation progress?",
          answer:
            "Once you place your order, you'll receive access to our client portal where you can track your formation progress in real-time. You'll also receive email updates at each major milestone in the process.",
        },
        {
          question: "What if my business name is not available?",
          answer:
            "We'll check name availability before filing and contact you immediately if your preferred name is taken. We can suggest similar alternatives or help you modify your name to meet state requirements while maintaining your brand identity.",
        },
        {
          question: "Can I make changes after filing?",
          answer:
            "Yes, most changes can be made after formation by filing amendments with the state. Common changes include updating the registered agent, business address, or member information. Some changes may require additional state fees.",
        },
        {
          question: "Do you provide customer support?",
          answer:
            "Yes, we offer comprehensive customer support via phone, email, and live chat. Our business formation specialists are available Monday-Friday, 8am-8pm EST to answer questions and provide guidance throughout the process.",
        },
      ],
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
              <Badge className="mb-4 bg-cyan-100 text-cyan-800">Help Center</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 mb-8 text-pretty">
                Find answers to common questions about business formation, our services, and the LLC process.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Help */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Phone className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-4">Speak with a formation specialist</p>
                  <p className="text-cyan-600 font-semibold">(844) 493-6249</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <MessageCircle className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                  <p className="text-gray-600 mb-4">Get instant help from our team</p>
                  <Button variant="outline">Start Chat</Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Search className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Help Center</h3>
                  <p className="text-gray-600 mb-4">Browse our knowledge base</p>
                  <Button variant="outline">View Articles</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem
                        key={faqIndex}
                        value={`${categoryIndex}-${faqIndex}`}
                        className="bg-white rounded-lg border"
                      >
                        <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                          <span className="font-semibold">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
              <p className="text-xl text-gray-600 mb-8">Our business formation experts are here to help you succeed.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                  Contact Support
                </Button>
                <Button size="lg" variant="outline">
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
