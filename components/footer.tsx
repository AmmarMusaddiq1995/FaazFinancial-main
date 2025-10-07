"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="container px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  FFG
                </span>
              </div>
              <span className="font-bold text-xl">FaazFinancialGroup</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Making business formation simple and affordable for entrepreneurs
              everywhere.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="/services/llc-formation"
                  className="hover:text-white transition-colors"
                >
                  LLC Formation
                </a>
              </li>
              <li>
                <a
                  href="/services/corporation-formation"
                  className="hover:text-white transition-colors"
                >
                  Corporation Formation
                </a>
              </li>
              <li>
                <a
                  href="/services/registered-agent"
                  className="hover:text-white transition-colors"
                >
                  Registered Agent
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Business Formation Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  State Requirements
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p> Copyright 2025 © FTSSolution.tech All Right Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
