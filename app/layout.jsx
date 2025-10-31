import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import WhatsappButton from "@/components/WhatsappButton";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Faaz Financial Group",
  description: "Created with Next.js",
  generator: "Next",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
        <Toaster position="top-right" />
        <WhatsappButton />
        <Analytics />
      </body>
    </html>
  );
}
