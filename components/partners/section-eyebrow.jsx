// Small pill label that opens each light section on the Partner Program page
// ("THE OFFER", "WHITE LABEL FLOW"). Kept separate so both sections stay identical.
export function SectionEyebrow({ children, className = "" }) {
  return (
    <span
      className={`inline-block rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary ${className}`}
    >
      {children}
    </span>
  );
}
