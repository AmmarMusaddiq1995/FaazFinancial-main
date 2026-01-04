

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import WhatsappButton from "@/components/WhatsappButton";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { useAuthContext } from "@/context/AppContext";
import WhatsappWrapper from "@/components/whatsappWrapper";

export const metadata = {
  title: "Faaz Financial Group",
  description: "Created with Next.js",
  icons: {
    icon: "/favicon.png",
  },
  generator: "Next",
};


export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <head>
        
        <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>


      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Script
          src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
          strategy="lazyOnload"
        />
        <AppContextProvider>
          {children}
          <WhatsappWrapper />
        </AppContextProvider>
        <Toaster position="top-right" />
        
        <Analytics />
      </body>
    </html>
  );
}
