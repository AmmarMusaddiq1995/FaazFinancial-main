import Link from "next/link";
import Image from "next/image";

const linkClass =
  "text-sm text-gray-400 hover:text-white inline-block py-1 transition-all duration-200 hover:translate-x-0.5";

const headingClass =
  "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-5";

export function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white border-t border-white/[0.08] overflow-hidden">
      {/* Soft glow accent along the top edge */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 h-40 w-[640px] rounded-full bg-primary/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative container px-4 mx-auto py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center mb-6">
              <Image
                src="/logo-new-2.png"
                alt="FAAZ Financial Group"
                width={140}
                height={20}
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs text-pretty">
              Making business formation simple and affordable for entrepreneurs
              everywhere.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className={headingClass}>Services</h4>
            <ul className="space-y-1.5">
              <li>
                <a href="/services/llc-formation-2" className={linkClass}>
                  LLC Formation
                </a>
              </li>
              <li>
                <a href="/services/corp-formation-2" className={linkClass}>
                  Corporation Formation
                </a>
              </li>
              <li>
                <a href="/services/registered-agent" className={linkClass}>
                  Registered Agent
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className={headingClass}>Resources</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/blog" className={linkClass}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className={linkClass}>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className={linkClass}>
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className={headingClass}>Company</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/about" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className={linkClass}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className={linkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-of-services" className={linkClass}>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            Copyright 2026 © FAAZ Financial Group LLC. All Rights Reserved.
          </p>
          <p className="text-sm text-gray-500">
            Formation · Tax · Compliance — US & UK
          </p>
        </div>
      </div>
    </footer>
  );
}
