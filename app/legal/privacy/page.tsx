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
            content: `This Privacy Policy describes how FAAZ Financial Group LLC. (also referred to as“we,” “FAAZ” or “us”) collects, uses, discloses, transfers, stores, retains or otherwise processes your information when you (whether you are a person interacting with the Services (defined herein) or acting as a sole proprietor or on behalf of another business entity) apply or sign up for a FAAZ account and other Services through FAAZ, websites, mobile applications, services, and other products or programs  (collectively, “Services”).This Privacy Policy applies to information collected in connection with your access to and use of our Services. Please read this Privacy Policy carefully. You may also email us at compliance@faazfinancialgroup.com with any privacy-related questions you have.`
            // content: `This Privacy Policy describes how FAAZ Financial Group LLC ("we", "us", or "FAAZ") collects, uses, and protects your personal information when you use our websites, apps, and services.`,
          },
          {
            title: "Consent",
            content:`When using the Services or interacting with FAAZ, you consent to the collection, transfer, storage, processing, disclosure, and use of your information as described in this Privacy Policy.  


            Marketing communications from us will have instructions on how to “opt-out.” If you do not wish to have your contact information used by FAAZ to promote our own or third parties’ products or Services, you can opt-out by logging into the Services and adjusting your user preferences in your account profile by checking or unchecking the relevant boxes or by sending us an email stating your request to info@faazfinancialgroup.com. If we have sent you a promotional email, you may send us a return email asking to be omitted from future email distributions. This opt out does not apply to information provided to FAAZ as a result of a product purchase, warranty registration, product service experience or other transactions.`
            // content: `By using our services, you consent to the collection, use, and sharing of your data as described in this policy. You may withdraw your consent anytime by contacting compliance@faazfinancialgroup.com.`,
          },
          {
            title: "Information We Collect",
            // content: `We collect personal details such as name, email, phone, government ID, financial info, and transaction details. We may also collect device data, geolocation, and usage analytics to improve user experience.`,
         content:`We collect information about you when you:

Make a request to receive information about FAAZ or our products;
Navigate through a FAAZ website;
Apply or sign up for a FAAZ account or other Services;
Respond to prompts in forms or other interactions
and

Go through our identity or account verification process; authenticate into your account; communicate with us; answer our surveys, upload content; or otherwise interact with the Services.
We call this information that we collect “Account Data”. Specifically, we may collect the following categories of information:

Identification Information, such as:
Name, email address, postal address, signature, and phone number;
Passport number, driver’s license number, Social Security number, Taxpayer Identification number, or other government-issued identification number;
Financial information, such as bank account information and payment card numbers;
Beneficial ownership information
Tax information; 
Transaction Information, such as information about when and where payment transactions occur, the names of the transacting parties, a description of the transactions, the payment or transfer amounts, billing and shipping information, and the devices;  
payment methods used to complete the transactions; 
and

Other Information you provide, such as information that you voluntarily provide to us, including your survey responses; participation in contests, promotions, or other prospective seller marketing forms or devices; suggestions for improvements; referrals; or any other actions you perform on the Services.
          You can review and change your personal information by logging into the Services and visiting your account profile page. You may also send us an email at info@faazfinancialgroup.com. to request access to, correct or delete any personal information that you have provided to us. We cannot delete your personal information except by also deleting your user account. We may not accommodate a request to change information if we believe the change would violate any law or legal requirement or cause the information to be incorrect or prevent our Services from being able to function properly..`
          },


          {
            title: "Information We Collect From Your Use of the Services",
            // content: `Your information helps us provide, personalize, and secure our services. It’s also used for compliance, marketing (with your consent), and improving our platform.`,
          content: `We collect the following information from your use of the Services:

Commercial information, such as information about the products and services you sell (e.g., inventory, pricing and other data) and information about your payment transactions (e.g., when and where the transactions occur, a description of the transactions, the payment or transfer amounts, billing and shipping information, and payment methods used to complete the transactions);
Electronic information, such as web browser and device characteristics;
Geolocation data, which includes the location of your device. For more information and to learn how to disable collection of location information from your mobile device, please see below;
Internet or other electronic network activity information, which includes information about how you use and interact with our Services, including your access time, “log-in” and “log-out” information, browser type and language, the domain name of your internet service provider, other attributes about your browser, any specific page you visit on our platform, content you view, features you use, the date and time of your use of the Services, your search terms, and the website you visited before you visited or used the Services;
Online identifiers (e.g., information you use to log in to your account), IP address, and unique personal identifiers (including device identifier; cookies, beacons, pixel tags, mobile ad identifiers and similar technology; customer number; unique alias, and other identifiers);
Professional or employment-related information, such as information you provide about your business; and
          Inferences drawn from any of the information above to create a profile about you that may reflect, for example, your preferences, characteristics, and behavior, including for account identification and security purposes or to enhance our Services to you.`   
          },

          {
            title: "Disclosure of Information",
            // content: `We may share your data with affiliates, service providers, and legal authorities when necessary. FAAZ does not sell your personal information.`,
          content:`We may disclose aggregated information about our users and information that does not identify any individual, without restriction.

We may disclose personal information that we collect or you provide as described in this Privacy Policy:

With other users of our Services with whom you interact.  This includes your customers when you issue an invoice;
To our subsidiaries and affiliates;
To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information held by us about our Service users is among the assets transferred;
To third parties to market their products or services to you if you have not opted out of these disclosures;
To third parties from which you have opted to apply for, receive quotations, products, or services or otherwise opted to do business with (for example, our business partners), for your convenience and in order to facilitate your use of their products or services. You will know that you have done so by clicking on the prompt or link to such third party business partner (who will be identified as you do so);
When you authorize a third party application or website to access your information;
With service providers that help us run our advertising campaigns;
With our service providers who help us maintain our Services in the areas of fraud detection and identity verification;
With financial institutions, payment networks, payment card associations and other entities that help us provide the Services;
With companies that deliver services on our behalf including the use of cookies;
To fulfill the purpose for which you provide it, including transmitting to your law firm, registered agent and various state or federal agencies; 
With your consent at your direction at the time you choose to share your information;
and

For any other purpose disclosed by us when you provide the information.
          This Privacy Policy does not apply to any third-party web sites, applications or software that integrate with the Services, or any other third-party products, services, or businesses, including submerchants. You are encouraged to review the privacy statements of these other websites before providing them with your personal information. In addition, the use of cookies by our service providers or other third parties is not covered by this Privacy Policy; we do not have access to or control over these cookies or any information gathered or collected by them.`
          },
          {
            title: "Information We May Collect From Other Sources",
            content: `Background check information, including credit report information, identity verification information, and information about any person or corporation with whom you have had, currently have, or may have a financial relationship;
Publicly available information, including public records of criminal convictions and arrest records;
Social media information; 
and
            Credit, compliance and fraud Information about you from third parties for any underwriting purpose such as credit investigation, credit eligibility, identity or account verification process, fraud detection process, or collection procedure, or as may otherwise be required by applicable law. This includes, without limitation, the receipt and exchange of account or credit-related information with any credit reporting agency or credit bureau, where lawful, and any person or corporation with whom you have had, currently have, or may have a financial relationship, including without limitation past, present, and future places of employment, financial institutions, and personal reporting agencies.`
          },

          {
            title: "How We Use Your Information",
            content:`We may collect, use and share, information about you for the following reasons:

To use our Services or to present our Services and their contents to you; to contact you if you start but fail to complete sign up for the Services; delivering the information and support your request, including technical notices, security alerts, and support and administrative messages such as to resolve disputes, collect fees, and help with problems with our Services;
Developing new products, interactive features and services;
Displaying your historical transaction information;
Improving, personalizing, and facilitating your use of our Services;
To complete forms and file documents with the state;
Processing or recording payment transactions or funds transfers;
Providing, maintaining, or improving our Services including our website and mobile apps;
Performing internal research, measuring, tracking, and analyzing usage and performance trends;
Sending you surveys about the Services;
Promoting our products and services to you or your customers;
Conducting investigations and complying with applicable laws, regulations, legal requirements, industry standards;
Responding to lawful requests for information from government agencies;
Contacting to resolve disputes, chargebacks, and collecting fees associated with use of our Services;
To enforce or apply our Terms of Use (www.faazfinancialgroup.com/termsofuse) and other applicable policies and procedures;
Verifying your identity; 
Investigating, preventing, detecting and reporting fraud, security incidents, or other potentially prohibited activities involving your account;
Protecting the rights, property, or safety of our company, our customers, or others if we believe disclosure is necessary or appropriate. This includes exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction;
Marketing our services to you; 
and

For any other reason we may tell you about from time to time.
We may also use your information to contact you about our own and third parties’ goods and services that may be of interest to you. If you do not want us to use your information in this way, you can opt-out by logging into the Services and adjusting your user preferences in your account profile by checking or unchecking the relevant boxes or by sending us an email stating your request to info@faazfinancialgroup.com.

We may use the information we have collected from you to enable us to display advertisements to our advertisers’ target audiences. Even though we do not disclose your personal information for these purposes without your consent, if you click on or otherwise interact with an advertisement, the advertiser may assume that you meet its target criteria.
`
          },

          {
            title: "Cookies & Tracking",
            content: `We use cookies and analytics tools to enhance performance, measure engagement, and provide tailored experiences. You can control cookies through your browser settings.`,
          },
          {
            title: "Children’s Privacy",
            content: `Our services are not directed to individuals under 18. If we become aware of data from a minor, we promptly delete it.`,
          },
          // {
          //   title: "California Privacy Rights",
          //   content: `California residents have the right to access, delete, or restrict the use of their personal data as per the CPRA. Contact compliance@faazfinancialgroup.com for requests.`,
          // },
          {
            title:"ANTI-MONEY LAUNDERING AND COUNTER TERRORISM FINANCING AND SANCTIONS STATEMENT",
            content:`FAAZ is committed to preventing our Services from being used to facilitate money laundering, fraud, and other financial crimes, including terrorist financing.  In addition, to comply with Office of Foreign Asset Control (OFAC) requirements, we screen your account against government watch lists. We therefore may request that you provide us with documentation to help prove your identity or the identity of your business for verification purposes.`
          },

          {
            title:"EXERCISING DATA ACCESS RIGHTS ",
            content:`To exercise any of your data access rights as set out above, please contact us by submitting a request at the FAAZ Data Subject Access Request Portal. Please note that you will need to verify your identity before we can fulfill your request. Your request must: (i) provide sufficient information that allows us to reasonably verify that you are the person about whom we collected personal information or an authorized representative of that person; and (ii) describe the request with sufficient detail that allows us to properly understand, evaluate, and respond to it. We will only use personal information provided in a verifiable consumer request to verify the requestor’s identity or authority to make the request. We will respond to your verifiable request within any prescribed timelines. In some regions, there may be limitations on how often a request relating to personal information may be submitted.`,
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
