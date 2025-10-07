import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: March 1, 2024</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By accessing and using FaazFinancialGroup services, you accept and agree to be bound by the terms and
                  provision of this agreement. If you do not agree to abide by the above, please do not use this
                  service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description of Service</h2>
                <p className="text-gray-600 mb-4">
                  FaazFinancialGroup provides business formation services, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>LLC and Corporation formation services</li>
                  <li>Registered agent services</li>
                  <li>Business compliance and ongoing support</li>
                  <li>Document preparation and filing services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Responsibilities</h2>
                <p className="text-gray-600 mb-4">You agree to:</p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Pay all fees and charges associated with your use of our services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Fees and Payment</h2>
                <p className="text-gray-600 mb-4">
                  Service fees are clearly disclosed before purchase. State filing fees are separate and required by
                  state agencies. All fees are non-refundable except as specifically stated in our refund policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  FaazFinancialGroup shall not be liable for any indirect, incidental, special, consequential, or
                  punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                  intangible losses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modifications</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                  posting. Your continued use of the service constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-600">For questions about these Terms of Service, contact us at:</p>
                <div className="mt-4 text-gray-600">
                  <p>Email: legal@faazfinancialgroup.com</p>
                  <p>Phone: (844) 493-6249</p>
                  <p>Address: FaazFinancialGroup, Austin, TX</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
