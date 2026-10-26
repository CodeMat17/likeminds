import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon, MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { UliBand } from "@/components/ui/Ornaments";
import { Magnetic } from "@/components/motion/Magnetic";
import { WordReveal } from "@/components/motion/Reveal";

const footerLinks = {
  organisation: [
    { href: "/about", label: "Our Story" },
    { href: "/about#objectives", label: "Aims & Objectives" },
    { href: "/works", label: "Community Projects" },
    { href: "/gallery", label: "Photo Gallery" },
  ],
  community: [
    { href: "/members", label: "Our Members" },
    { href: "/join", label: "Membership Form" },
    { href: "/contact", label: "Contact Us" },
  ],
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox='0 0 24 24' fill='currentColor' aria-hidden>
      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='noise relative overflow-hidden bg-green-deep text-white/90'>
      <UliBand className='text-gold/60' height={10} />
      <div className='pattern-nsibidi pointer-events-none absolute inset-0 opacity-60' />
      <div className='pointer-events-none absolute -top-40 right-0 size-[34rem] rounded-full bg-clay/20 blur-[140px]' />

      {/* Closing statement */}
      <div className='relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-14 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-10 border-b border-white/10 pb-16 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <p className='eyebrow mb-5 text-gold'>Our vow, in our tongue</p>
            <h2 className='font-display text-6xl leading-[0.95] font-medium text-white sm:text-7xl lg:text-8xl'>
              <WordReveal
                segments={[
                  { text: "Ofu Obi", br: true },
                  { text: "Umunwanne.", className: "italic font-display-wonk text-gradient-warm" },
                ]}
              />
            </h2>
            <p className='mt-5 max-w-md text-white/55'>
              One heart, one brotherhood — the promise every member of LikeMinds keeps
              to Nomeh Unateze and to one another.
            </p>
          </div>
          <Magnetic>
            <Link
              href='/join'
              className='group grid size-40 place-items-center rounded-full bg-gold text-center text-green-deep transition-colors duration-500 hover:bg-clay hover:text-white sm:size-44'>
              <span className='flex flex-col items-center gap-2 text-sm font-bold'>
                <ArrowUpRightIcon className='size-6 transition-transform duration-500 group-hover:rotate-45' />
                Become
                <br />a Member
              </span>
            </Link>
          </Magnetic>
        </div>

        {/* Columns */}
        <div className='grid grid-cols-1 gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-12'>
          <div className='space-y-5 lg:col-span-5'>
            <div className='flex items-center gap-3'>
              <Image src='/logo.png' alt='LikeMinds logo' width={52} height={52} />
              <div>
                <p className='font-display text-xl font-semibold text-white'>
                  LikeMinds 1980–1986
                </p>
                <p className='mt-0.5 text-[11px] tracking-[0.22em] text-gold uppercase'>
                  Age Grade · Nomeh Unateze
                </p>
              </div>
            </div>
            <p className='max-w-sm text-sm leading-relaxed text-white/60'>
              A non-profit, non-political age grade association committed to
              brotherhood, community development, welfare, and empowerment in
              Nomeh Unateze, Nkanu East LGA, Enugu State, Nigeria.
            </p>
            <p className='text-xs tracking-widest text-white/35'>CAC REG. RN. 7810996</p>
          </div>

          <FooterColumn title='Organisation' links={footerLinks.organisation} className='lg:col-span-2' />
          <FooterColumn title='Community' links={footerLinks.community} className='lg:col-span-2' />

          <div className='lg:col-span-3'>
            <h3 className='eyebrow mb-5 text-white/40'>Reach us</h3>
            <div className='space-y-3 text-sm text-white/70'>
              <a
                href='mailto:info@likemindsofficial.org'
                className='flex items-center gap-2.5 transition-colors hover:text-gold'>
                <MailIcon className='size-4 shrink-0 text-gold' />
                info@likemindsofficial.org
              </a>
              <a
                href='tel:+2348037501282'
                className='flex items-center gap-2.5 transition-colors hover:text-gold'>
                <PhoneIcon className='size-4 shrink-0 text-gold' />
                +234 803 750 1282
              </a>
              <a
                href='https://wa.me/2348060329858'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-2.5 transition-colors hover:text-gold'>
                <WhatsAppIcon className='size-4 shrink-0 text-gold' />
                +234 806 032 9858
              </a>
              <div className='flex items-start gap-2.5'>
                <MapPinIcon className='mt-0.5 size-4 shrink-0 text-gold' />
                <span>Nomeh Unateze, Nkanu East LGA, Enugu State, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='relative z-10 border-t border-white/10'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/45 sm:flex-row sm:px-6 lg:px-8'>
          <p className='text-center'>
            &copy; {currentYear} LikeMinds 1980–1986 Association, Nomeh Unateze. All rights reserved.
          </p>
          <a
            href='https://wa.me/2348063856120'
            target='_blank'
            rel='noopener noreferrer'
            className='flex shrink-0 items-center gap-1.5 transition-colors duration-200 hover:text-gold'>
            <WhatsAppIcon className='size-3.5 shrink-0' />
            Need a website like this? Chat me
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className='eyebrow mb-5 text-white/40'>{title}</h3>
      <ul className='space-y-3'>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className='group inline-flex items-center gap-1 text-sm text-white/70 transition-colors duration-200 hover:text-gold'>
              <span className='bg-linear-to-r from-gold to-gold bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]'>
                {link.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
