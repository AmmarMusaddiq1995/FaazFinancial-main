"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen">
    <Header />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service & Legal Disclaimer</h1>
          <p className="mt-2 text-gray-600">
            Please read this Legal Disclaimer and Terms of Service carefully before accessing our website or using our services.
          </p>
          <div className="mt-4">
            <span className="inline-block rounded bg-primary px-3 py-1 text-sm font-medium text-white">
              FAAZ Financial Group LLC — Registered in Wyoming
            </span>
          </div>
        </header>

        {/* Table of contents */}
        <nav className="mb-8 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Contents</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li><a href="#scope" className="text-sm text-gray-700 hover:text-primary">• Scope & Acceptance</a></li>
            <li><a href="#informational" className="text-sm text-gray-700 hover:text-primary">• Informational Purposes</a></li>
            <li><a href="#as-is" className="text-sm text-gray-700 hover:text-primary">• Information Provided “As-Is”</a></li>
            <li><a href="#content" className="text-sm text-gray-700 hover:text-primary">• Content & License</a></li>
            <li><a href="#privacy" className="text-sm text-gray-700 hover:text-primary">• Privacy</a></li>
            <li><a href="#cancellation" className="text-sm text-gray-700 hover:text-primary">• Cancellation & Refunds</a></li>
            <li><a href="#lawful" className="text-sm text-gray-700 hover:text-primary">• Lawful Use & Indemnification</a></li>
            <li><a href="#arbitration" className="text-sm text-gray-700 hover:text-primary">• Arbitration & Governing Law</a></li>
            <li><a href="#general" className="text-sm text-gray-700 hover:text-primary">• General Provisions</a></li>
          </ul>
        </nav>

        <article className="prose prose-lg max-w-none">
          <section id="scope">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Scope & Acceptance</h3>
            <p>
              A visitor to the Website, current Customer, or prospective Customer is subject to these Legal Disclaimer and Terms of Service (“Terms”). By accessing or using FAAZ services (including the website at <a className="text-cyan-600" href="https://www.faazfinancialgroup.com">www.faazfinancialgroup.com</a>), you agree to be bound by these Terms as if signed in ink.
            </p>
            <p>
              <strong>FAAZ (“FAAZ”, “the Company”, “we”, “us”, “our”)</strong> is FAAZ Financial Group LLC, registered in Wyoming. We provide services online and via email and other communications. The information on the Website is part of the Services.
            </p>
            <p>
              The terms “User”, “you”, “Customer” or “Visitor” mean any past, current or prospective customer or visitor. There will be no fees to use the Services unless explicitly stated.
            </p>
          </section>

          <section id="informational" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Informational Purposes Only</h3>
            <p>
              FAAZ provides general information and advertisement for services; the Website does not constitute legal advice. Nothing on the Website creates an attorney-client, business, legal, or professional relationship. Do not act on the Website’s information without consulting counsel.
            </p>
          </section>

          <section id="as-is" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Information Provided “As-Is”</h3>
            <p>
              All content from FAAZ is provided “as-is”, without guarantee of accuracy, completeness or timeliness. FAAZ disclaims all warranties and liability for loss, claim, liability, or damage resulting from errors or omissions.
            </p>
          </section>

          <section id="content" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Content, Customer Content & License</h3>
            <p>
              “Content” means any information, text, graphics, photos or other materials uploaded, downloaded, or appearing in connection with the Services. “Customer Content” is content you provide. You warrant you have the rights to provide your Content.
            </p>
            <p>
              FAAZ owns the FAAZ Content and associated intellectual property. You may use FAAZ and Third Party Content for personal use only. Except for Customer Content, you may not reproduce or distribute any Content without prior written permission.
            </p>
            <p>
              By providing Customer Content you grant FAAZ a nonexclusive, perpetual, irrevocable, worldwide, sublicensable, royalty-free license to copy, process, analyze, improve, distribute, and commercialize Customer Content (the “Content License”). You retain ownership of your Content but should keep a copy for your records.
            </p>
            <p>
              You are responsible for your Content and its consequences. By giving any contact information you consent to FAAZ contacting you (including by text) for communications and marketing.
            </p>
          </section>

          <section id="minimum-age" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Minimum Age</h3>
            <p>
              You must be at least 18 years old to register and use the Services. If a Young Person (under 18) provides Content, a parent or guardian may request deletion and FAAZ will remove such Content upon request.
            </p>
          </section>

          <section id="privacy" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Privacy</h3>
            <p>
              Personal Data collected through the Services may include sensitive categories. By using our Services you consent to collection, storage, processing, and transfer of your Personal Data as further described in our Privacy Policy. Third-party partners’ privacy practices apply where they process data.
            </p>
            <p>
              FAAZ may access, preserve, and disclose Content and Personal Data as reasonably necessary to comply with law, enforce these Terms, address fraud or security issues, respond to support requests, or protect FAAZ’s rights.
            </p>
          </section>

          <section id="third-party" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Sites</h3>
            <p>
              The Website may link to third parties. FAAZ is not responsible for third-party content or charges applied by third parties (for example registered agent services). All third-party information is provided without warranty and at your own risk.
            </p>
          </section>

          <section id="disclaimer" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer of Warranties</h3>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, FAAZ DISCLAIMS ALL IMPLIED WARRANTIES (including merchantability, fitness for a particular purpose, title, and noninfringement). FAAZ does not guarantee results, uninterrupted service, or error-free operation. FAAZ is not liable for damages caused by interruptions, internet outages, or third-party service problems.
            </p>
          </section>

          <section id="cancellation" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Cancellation Policy & Termination</h3>
            <p>
              FAAZ may refuse or cancel Services at its discretion, including misuse of promotions. An order is generally refundable until payment is forwarded to a government entity (typically within six hours after an order is placed), less expenses already paid or incurred. Once payment is forwarded to a government entity or third party, cancellations are not accepted.
            </p>
            <p>
              For certain filings (e.g., trademark searches or filings), FAAZ cannot accept cancellations once searches or payments are made. Cancellation requests must be made per instructions provided; telephone or email cancellations will not be accepted unless otherwise stated.
            </p>
            <p>
              FAAZ may terminate Services anytime; termination may result in loss of access. Prior fees remain due and refunds are not guaranteed. FAAZ may restrict or suspend access for misuse, including fraud, spam, or infringement.
            </p>
          </section>

          <section id="auto-renew" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Auto-Renewal Services & Price Changes</h3>
            <p>
              Certain Services (for example Registered Agent services) may auto-renew to maintain compliance. Auto-renewal charges may be applied by FAAZ’s registered agent partner and cannot be reversed after application. Prices are subject to change without notice.
            </p>
          </section>

          <section id="lawful" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Lawful Use, Waiver & Release</h3>
            <p>
              You agree not to use the Services to commit fraud, misrepresent identity or falsify legal documents. You accept liability for costs and legal fees resulting from misuse. You grant FAAZ authority to sign documents on your behalf to complete orders as required.
            </p>
            <p>
              You waive, release and discharge FAAZ and its affiliates from any claims, losses, or liability in connection with the Services or third-party fulfillment fees once charged.
            </p>
          </section>

          <section id="indemnification" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4"  >Indemnification</h3>
            <p>
              You agree to indemnify, defend, and hold FAAZ and its affiliates harmless from any claims, losses, damages, or costs (including attorneys’ fees) arising from: (i) your Content or use of Services; (ii) breach of these Terms; (iii) infringement of third-party rights; or (iv) violation of laws or regulations.
            </p>
          </section>

          <section id="arbitration" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Choice of Law & Binding Arbitration</h3>
            <p>
              If a dispute arises regarding these Terms or Services, you should first contact FAAZ customer service. All disputes will be resolved by final and binding arbitration under AAA Commercial Rules before a single arbitrator with relevant expertise. Arbitration will be conducted in Houston, Texas (or another mutually agreed location) or online. The arbitration will be limited (no more than three days) and discovery is narrowly restricted. The arbitrator’s decision is final.
            </p>
            <p>
              These Terms are governed by the laws of the State of Texas and U.S. federal law. If arbitration is not available, parties submit to the exclusive jurisdiction of Sheridan, Wyoming courts as an alternative venue. FAAZ reserves the right, in its discretion, not to arbitrate and to pursue claims in Wyoming courts.
            </p>
          </section>

          <section id="general" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">General Provisions</h3>
            <p>
              <strong>Severability.</strong> If a provision is found illegal or unenforceable, it will be modified to be enforceable to the greatest extent possible without affecting the remainder of the Terms.
            </p>
            <p>
              <strong>Entire Agreement.</strong> These Terms (and the Privacy Policy) constitute the entire agreement between you and FAAZ regarding the Services.
            </p>
            <p>
              <strong>No Informal Waivers.</strong> Failure to act with respect to a breach does not waive the right to act later.
            </p>
            <p>
              <strong>Assignment.</strong> You may not assign your rights or obligations without FAAZ’s consent. FAAZ may assign or delegate freely with notice.
            </p>
          </section>

          <section id="acceptance" className="mt-4">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance</h3>
            <p>
              BY USING THE WEBSITE OR SERVICES, YOU AGREE THAT YOU HAVE READ, UNDERSTOOD AND AGREE TO THESE TERMS IN THEIR ENTIRETY.
            </p>
          </section>

          <footer className="mt-8 border-t pt-6 text-sm text-gray-600">
            <p>
              <strong>Contact:</strong> For questions about these Terms, please contact FAAZ Financial Group LLC at{" "}
              <a className="text-cyan-600" href="mailto:info@faazfinancialgroup.com">info@faazfinancialgroup.com</a>.
            </p>
            <p className="mt-2">Last updated: <strong>{new Date().toLocaleDateString()}</strong></p>
          </footer>
        </article>
      </div>
    </div>
    <Footer />
    </div>
  );
}
