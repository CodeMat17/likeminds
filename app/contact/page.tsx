"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRightIcon,
  CheckIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { UliBand } from "@/components/ui/Ornaments";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const contactDetails = [
  {
    icon: MailIcon,
    label: "Email",
    value: "info@likemindsofficial.org",
    href: "mailto:info@likemindsofficial.org",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+234 803 750 1282",
    href: "tel:+2348037501282",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+234 806 032 9858",
    href: "https://wa.me/2348060329858",
  },
  {
    icon: MapPinIcon,
    label: "Address",
    value: "Nomeh Unateze, Nkanu East LGA, Enugu State, Nigeria",
    href: null,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Failed to send message");
      }
      setSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow='Contact Us'
        title="Let's"
        accent='talk.'
        watermark='Kedu?'
        description="Have a question, suggestion, or want to collaborate? We'd love to hear from you. Reach out and a member of our team will respond promptly."
      />

      <section className='bg-background py-20 sm:py-28'>
        <div className='mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8'>
          {/* Info */}
          <div className='space-y-8 lg:col-span-5'>
            <Reveal>
              <p className='eyebrow text-clay'>Get in touch</p>
              <h2 className='font-display mt-3 text-4xl leading-tight font-medium text-foreground'>
                Every conversation <em className='font-display-wonk text-primary'>begins with hello.</em>
              </h2>
              <p className='mt-4 leading-relaxed text-muted-foreground'>
                LikeMinds 1980–1986 is an age-grade association rooted in brotherhood and
                community service. We welcome dialogue with indigenes, well-wishers, partners,
                and the public.
              </p>
            </Reveal>

            <div className='space-y-3'>
              {contactDetails.map(({ icon: Icon, label, value, href }, i) => {
                const body = (
                  <>
                    <span className='grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground'>
                      <Icon className='size-5' />
                    </span>
                    <span className='min-w-0 flex-1'>
                      <span className='eyebrow block text-[0.62rem] text-muted-foreground'>{label}</span>
                      <span className='mt-1 block font-semibold text-foreground'>{value}</span>
                    </span>
                    {href && (
                      <ArrowUpRightIcon className='size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:rotate-45 group-hover:text-primary' />
                    )}
                  </>
                );
                const cls =
                  "group flex items-center gap-4 rounded-3xl border border-border bg-card p-4 transition-colors duration-300 hover:border-primary/40";
                return (
                  <Reveal key={label} delay={i * 0.06}>
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={cls}>
                        {body}
                      </a>
                    ) : (
                      <div className={cls}>{body}</div>
                    )}
                  </Reveal>
                );
              })}
            </div>

            <Reveal className='noise relative overflow-hidden rounded-3xl bg-green-deep p-7'>
              <div className='pattern-nsibidi absolute inset-0 opacity-60' />
              <div className='relative'>
                <p className='eyebrow text-gold'>Our motto</p>
                <p className='font-display mt-3 text-3xl text-white italic'>
                  &ldquo;Ofu Obi Umunwanne&rdquo;
                </p>
                <p className='mt-2 text-sm text-white/60'>
                  One heart, one family — the spirit behind everything we do.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className='lg:col-span-7'>
            <div className='overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_40px_80px_-50px_oklch(0.22_0.05_155/45%)]'>
              <UliBand className='text-clay/50' height={8} />
              <div className='p-7 sm:p-10'>
                <AnimatePresence mode='wait'>
                  {submitted ? (
                    <motion.div
                      key='done'
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className='flex flex-col items-center justify-center gap-4 py-16 text-center'>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
                        className='grid size-20 place-items-center rounded-full bg-primary text-primary-foreground'>
                        <CheckIcon className='size-9' />
                      </motion.span>
                      <h3 className='font-display text-3xl font-medium text-foreground'>
                        Message received.
                      </h3>
                      <p className='max-w-xs text-muted-foreground'>
                        Thank you for reaching out. We&apos;ll get back to you within 2–3 business days.
                      </p>
                      <button
                        className='mt-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted'
                        onClick={() => {
                          setSubmitted(false);
                          setForm(EMPTY_FORM);
                        }}>
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key='form'
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleSubmit}
                      className='space-y-6'>
                      <div>
                        <h3 className='font-display text-3xl font-medium text-foreground'>
                          Send a message
                        </h3>
                        <p className='mt-1 text-sm text-muted-foreground'>
                          Fill in the form below and we&apos;ll be in touch.
                        </p>
                      </div>

                      <div className='grid gap-5 sm:grid-cols-2'>
                        <div className='space-y-2'>
                          <Label htmlFor='name'>Full Name *</Label>
                          <Input id='name' name='name' placeholder='Your full name' value={form.name} onChange={handleChange} required />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='email'>Email Address *</Label>
                          <Input id='email' name='email' type='email' placeholder='you@example.com' value={form.email} onChange={handleChange} required />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='subject'>Subject *</Label>
                        <Input id='subject' name='subject' placeholder='What is this about?' value={form.subject} onChange={handleChange} required />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='message'>Message *</Label>
                        <Textarea id='message' name='message' placeholder='Write your message here...' rows={6} value={form.message} onChange={handleChange} required />
                      </div>

                      <button
                        type='submit'
                        disabled={loading}
                        className='group inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary font-bold text-primary-foreground transition-colors duration-300 hover:bg-clay disabled:opacity-60 sm:w-auto sm:pr-2 sm:pl-8'>
                        {loading ? (
                          <>
                            <span className='size-4 animate-spin rounded-full border-2 border-white/30 border-t-white' />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send message
                            <span className='hidden size-10 place-items-center rounded-full bg-primary-foreground/15 transition-transform duration-500 group-hover:translate-x-1 sm:grid'>
                              <SendIcon className='size-4' />
                            </span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
