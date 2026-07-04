"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, FileCheck2, LineChart, Lock, Mail, ShieldCheck, X } from "lucide-react";
import { useAuthContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const BENEFITS = [
  { icon: FileCheck2, text: "Save your progress" },
  { icon: ShieldCheck, text: "Secure document uploads" },
  { icon: LineChart, text: "Track your application" },
];

/**
 * Reusable authentication gate for service-form routes.
 *
 * Wrap any page (or subtree) that renders a service form. Authenticated users
 * see the content exactly as before. Unauthenticated users see the content
 * blurred and inert behind a fullscreen sign-up modal; after logging in they
 * are returned to this exact URL (query params included) automatically.
 */
export default function AuthGate({ children }) {
  const { user, loading } = useAuthContext();
  // While auth is resolving, keep the form blurred and inert but don't flash
  // the modal — logged-in users go straight to the crisp form.
  const hidden = loading || !user;
  const gated = !loading && !user;

  return (
    <>
      <div
        inert={hidden || undefined}
        aria-hidden={hidden}
        className={`transition-[filter,opacity] duration-500 ${
          hidden ? "pointer-events-none select-none opacity-60 blur-md" : ""
        }`}
      >
        {children}
      </div>
      <AnimatePresence>{gated && <AuthGateModal />}</AnimatePresence>
    </>
  );
}

function AuthGateModal() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const primaryRef = useRef(null);

  // Send the user to an auth page, remembering where they wanted to go.
  const goToAuth = (path) => {
    const target = encodeURIComponent(window.location.pathname + window.location.search);
    router.push(`${path}?redirect=${target}`);
  };

  const leave = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    primaryRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") leave();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Blurred backdrop — clicking it leaves the gated page */}
      <div
        className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
        onClick={leave}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-gate-title"
        aria-describedby="auth-gate-description"
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
      >
        {/* Soft brand glow behind the illustration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />

        <button
          type="button"
          onClick={leave}
          aria-label="Close and go back"
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="px-8 pb-8 pt-10 text-center">
          {/* Floating illustration */}
          <motion.div
            className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-orange-400 shadow-lg shadow-primary/30"
            animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
          >
            <Lock className="h-9 w-9 text-white" aria-hidden="true" />
          </motion.div>

          <h2 id="auth-gate-title" className="mb-3 text-2xl font-bold text-gray-900">
            Create Your Account First
          </h2>
          <p id="auth-gate-description" className="mb-6 text-sm leading-relaxed text-gray-600">
            Sign in to securely save your application, upload documents, track your progress,
            and continue anytime.
          </p>

          <ul className="mb-7 space-y-3 text-left">
            {BENEFITS.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                <Check className="ml-auto h-4 w-4 text-green-600" aria-hidden="true" />
              </li>
            ))}
          </ul>

          <Button
            ref={primaryRef}
            onClick={() => goToAuth("/auth/sign-up2")}
            className="w-full cursor-pointer rounded-full bg-primary px-8 py-6 text-base text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90"
          >
            <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
            Continue with Email
          </Button>

          <p className="mt-5 text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => goToAuth("/auth/login2")}
              className="cursor-pointer font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
            >
              Log In
            </button>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
