import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">Last updated: March 1, 2024</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  We collect information you provide directly to us, such as when you create an account, use our
                  services, or contact us for support. This may include:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Business information (company name, business type, formation details)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Communication preferences and support interactions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Provide and maintain our business formation services</li>
                  <li>Process your business formation documents and filings</li>
                  <li>Communicate with you about your account and services</li>
                  <li>Provide customer support and respond to your inquiries</li>
                  <li>Send you important updates about your business and compliance requirements</li>
                  <li>Improve our services and develop new features</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except as
                  described in this policy. We may share your information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>With state agencies as required for business formation filings</li>
                  <li>With service providers who assist us in operating our business</li>
                  <li>When required by law or to protect our rights and safety</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no method of transmission over the internet
                  is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                <p className="text-gray-600 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-600 mb-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your personal information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="mt-4 text-gray-600">
                  <p>Email: privacy@faazfinancialgroup.com</p>
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
