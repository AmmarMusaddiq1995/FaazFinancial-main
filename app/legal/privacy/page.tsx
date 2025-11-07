"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-gray-800">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-orange-500 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 opacity-90"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg opacity-90"
          >
            Your privacy matters to us. This page explains how Faaz Financial Group collects, uses, and protects your information.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-5xl mx-auto py-16 px-6 space-y-10"
      >
        {/* Section Template */}
        {[
          {
            title: "Our Commitment to Privacy",
            content: `This Privacy Policy describes how FAAZ Financial Group LLC ("we", "us", or "FAAZ") collects, uses, and protects your personal information when you use our websites, apps, and services.`,
          },
          {
            title: "Consent",
            content: `By using our services, you consent to the collection, use, and sharing of your data as described in this policy. You may withdraw your consent anytime by contacting compliance@faazfinancialgroup.com.`,
          },
          {
            title: "Information We Collect",
            content: `We collect personal details such as name, email, phone, government ID, financial info, and transaction details. We may also collect device data, geolocation, and usage analytics to improve user experience.`,
          },
          {
            title: "How We Use Your Information",
            content: `Your information helps us provide, personalize, and secure our services. It’s also used for compliance, marketing (with your consent), and improving our platform.`,
          },
          {
            title: "Disclosure of Information",
            content: `We may share your data with affiliates, service providers, and legal authorities when necessary. FAAZ does not sell your personal information.`,
          },
          {
            title: "Cookies & Tracking",
            content: `We use cookies and analytics tools to enhance performance, measure engagement, and provide tailored experiences. You can control cookies through your browser settings.`,
          },
          {
            title: "Children’s Privacy",
            content: `Our services are not directed to individuals under 18. If we become aware of data from a minor, we promptly delete it.`,
          },
          {
            title: "California Privacy Rights",
            content: `California residents have the right to access, delete, or restrict the use of their personal data as per the CPRA. Contact compliance@faazfinancialgroup.com for requests.`,
          },
          {
            title: "Changes to This Policy",
            content: `We may update this Privacy Policy periodically. Continued use of our services after updates means you agree to the revised terms.`,
          },
          {
            title: "Contact Us",
            content: `If you have questions or concerns regarding this policy, reach us at compliance@faazfinancialgroup.com or call +1 307 400 1963.`,
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-orange-600 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
