import Link from "next/link";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Emblem } from "@/components/ui/Emblem";

const footerLinks = {
  organisation: [
    { href: "/about", label: "About Us" },
  
    { href: "/about#objectives", label: "Aims & Objectives" },
  
  ],
  community: [
    { href: "/members", label: "Our Members" },
    { href: "/works", label: "Community Projects" },
    { href: "/gallery", label: "Photo Gallery" },
    { href: "/join", label: "Membership Form" },
    { href: "/contact", label: "Contact Us" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-green-deep text-white/90 relative noise'>
      {/* Uli chevron pattern */}
      <div className='absolute inset-0 pattern-uli pointer-events-none' />
      {/* Emblem watermark — bottom-right */}
      <div className='absolute bottom-0 right-0 pointer-events-none select-none opacity-[0.04]'>
        <Emblem size={220} className='text-white' />
      </div>
      {/* Decorative top gold rule */}
      <div className='absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent' />
      {/* Top section */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        {/* Brand */}
        <div className='lg:col-span-2 space-y-4'>
          <div className='flex items-center gap-3'>
            <Image
              src='/logo.png'
              alt='logo'
              width={56}
              height={56}
              className='object-cover'
            />
            <div>
              <h3 className='font-sans text-xl font-bold text-white'>
                LikeMinds 1980–1986
              </h3>
              <p className='text-xs text-white/60 tracking-widest uppercase mt-0.5'>
                Age grade, Nomeh Unateze
              </p>
            </div>
          </div>
          <p className='text-sm text-white/70 leading-relaxed max-w-sm'>
            A non-profit, non-political age grade association committed to
            brotherhood, community development, welfare, and empowerment in
            Nomeh Unateze, Nkanu East LGA, Enugu State, Nigeria.
          </p>
          <div className='inline-flex items-center gap-2 border border-gold/40 rounded-full px-4 py-1.5 bg-gold/5'>
            <span className='text-gradient-gold animate-shimmer italic text-sm tracking-wide font-semibold'>
              &quot;Ofu Obi Umunwanne&quot;
            </span>
          </div>
          <div className='space-y-2 text-sm text-white/70'>
            <a
              href='mailto:info@likeminds-nomeh.org'
              className='flex items-center gap-2 hover:text-gold transition-colors'>
              <MailIcon className='size-3.5 shrink-0' />
              info@likemindsofficial.org
            </a>
            <a
              href='tel:+2348037501282'
              className='flex items-center gap-2 hover:text-gold transition-colors'>
              <PhoneIcon className='size-3.5 shrink-0' />
              +234 803 750 1282
            </a>
            <a
              href='https://wa.me/2348060329858'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 hover:text-gold transition-colors'>
              <svg
                className='size-3.5 shrink-0'
                viewBox='0 0 24 24'
                fill='currentColor'>
                <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
              </svg>
              +234 806 032 9858
            </a>
            <div className='flex items-start gap-2'>
              <MapPinIcon className='size-3.5 shrink-0 mt-0.5' />
              <span>Nomeh Unateze, Nkanu East LGA, Enugu State, Nigeria</span>
            </div>
          </div>
        </div>

        {/* Organisation links */}
        <div>
          <h4 className='text-white font-semibold text-sm uppercase tracking-widest mb-4'>
            Organisation
          </h4>
          <ul className='space-y-2.5'>
            {footerLinks.organisation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='text-sm text-white/65 hover:text-gold transition-colors duration-200'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Community links */}
        <div>
          <h4 className='text-white font-semibold text-sm uppercase tracking-widest mb-4'>
            Community
          </h4>
          <ul className='space-y-2.5'>
            {footerLinks.community.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='text-sm text-white/65 hover:text-gold transition-colors duration-200'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator className='relative z-10 bg-white/10' />

      {/* Bottom bar */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50'>
        <p className='text-center'>
          &copy; {currentYear} LikeMinds 1980–1986 Association, Nomeh Unateze.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
