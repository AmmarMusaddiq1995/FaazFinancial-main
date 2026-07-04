import AuthGate from "@/components/auth-gate";

// Every service submission form under /submission-forms/* requires an account.
// The gate shows a sign-up modal to unauthenticated visitors and returns them
// to the exact form they wanted after logging in.
export default function SubmissionFormsLayout({ children }) {
  return <AuthGate>{children}</AuthGate>;
}
