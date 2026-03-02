import Link from "next/link";
import { MailIcon, PhoneIcon, MapPinIcon, HeartIcon } from "lucide-react";
import { Emblem } from "@/components/ui/Emblem";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const footerLinks = {
  organisation: [
    { href: "/about", label: "About Us" },
    { href: "/about#constitution", label: "Our Constitution" },
    { href: "/about#objectives", label: "Aims & Objectives" },
    { href: "/about#leadership", label: "Executive Council" },
  ],
  community: [
    { href: "/members", label: "Our Members" },
    { href: "/works", label: "Community Works" },
    { href: "/works#projects", label: "Ongoing Projects" },
    { href: "/join", label: "Membership Form" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-deep text-white/90">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.webp" alt="logo" width={56} height={56} className="object-cover" />
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                LikeMinds 1980–1986
              </h3>
              <p className="text-xs text-white/60 tracking-widest uppercase mt-0.5">
                Age grade, Nomeh Unateze
              </p>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed max-w-sm">
            A non-profit, non-political age grade association committed to brotherhood,
            community development, welfare, and empowerment in Nomeh Unateze, Enugu State, Nigeria.
          </p>
          <div className="inline-flex items-center gap-2 border border-gold/40 rounded-full px-4 py-1.5">
            <span className="text-gold italic text-sm tracking-wide">
              &quot;Ofu Obi Umunwanne&quot;
            </span>
          </div>
          <div className="space-y-2 text-sm text-white/70">
            <a href="mailto:info@likeminds-nomeh.org" className="flex items-center gap-2 hover:text-gold transition-colors">
              <MailIcon className="size-3.5 shrink-0" />
              info@likeminds-nomeh.org
            </a>
            <a href="tel:+2348000000000" className="flex items-center gap-2 hover:text-gold transition-colors">
              <PhoneIcon className="size-3.5 shrink-0" />
              +234 800 000 0000
            </a>
            <div className="flex items-start gap-2">
              <MapPinIcon className="size-3.5 shrink-0 mt-0.5" />
              <span>Nomeh Unateze, Nkanu East LGA, Enugu State, Nigeria</span>
            </div>
          </div>
        </div>

        {/* Organisation links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Organisation
          </h4>
          <ul className="space-y-2.5">
            {footerLinks.organisation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Community links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">
            Community
          </h4>
          <ul className="space-y-2.5">
            {footerLinks.community.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/65 hover:text-gold transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <p className="text-center">
          &copy; {currentYear} LikeMinds 1980–1986 Association, Nomeh Unateze. All rights reserved.
        </p>
      
      </div>
    </footer>
  );
}
