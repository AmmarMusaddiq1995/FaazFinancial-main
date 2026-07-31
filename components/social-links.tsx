import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";

// Placeholder hrefs — swap in the real profile URLs when the client provides them.
const socials = [
  { name: "Facebook", href: "https://www.facebook.com/faazfinancialgroup", Icon: IconBrandFacebook },
  { name: "Instagram", href: "https://www.instagram.com/faaz_financial_group_llc", Icon: IconBrandInstagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/faaz-financial-group-llc", Icon: IconBrandLinkedin },
];

// Designed for dark (slate-950) surfaces: Footer and FooterCTASection.
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          aria-label={`Follow FAAZ Financial Group on ${name}`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.06] border border-white/10 text-gray-400 transition-all duration-200 hover:text-white hover:bg-primary/20 hover:border-primary/40 hover:-translate-y-0.5"
        >
          <Icon className="h-5 w-5" stroke={1.75} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
