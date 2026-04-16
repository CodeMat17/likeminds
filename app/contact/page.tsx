"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, CheckCircle2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const contactDetails = [
  {
    icon: MailIcon,
    label: "Email",
    value: "info@likeminds-nomeh.org",
    href: "mailto:info@likeminds-nomeh.org",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: MapPinIcon,
    label: "Address",
    value: "Nomeh Unateze, Nkanu East LGA, Enugu State, Nigeria",
    href: null,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Placeholder: integrate with a form backend (e.g. Resend, Formspree) here
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.52_0.1_155)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl sm:text-5xl font-bold text-white"
            >
              Contact Us
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/75 text-lg max-w-2xl">
              Have a question, suggestion, or want to collaborate? We&apos;d love to hear from you.
              Reach out and a member of our team will respond promptly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  LikeMinds 1980–1986 is an age-grade association rooted in brotherhood and community
                  service. We welcome dialogue with indigenes, well-wishers, partners, and the public.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-5">
                {contactDetails.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground font-medium">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Motto callout */}
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl bg-primary/8 border border-primary/20 p-6"
              >
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                  Our Motto
                </p>
                <p className="font-serif text-xl italic text-foreground font-semibold">
                  &ldquo;Ofu Obi Umunwanne&rdquo;
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  One heart, one family — the spirit behind everything we do.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  >
                    <CheckCircle2Icon className="size-14 text-primary" />
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      Message Received!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Thank you for reaching out. We&apos;ll get back to you within 2–3 business days.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                        Send a Message
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Fill in the form below and we&apos;ll be in touch.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What is this about?"
                        value={form.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Write your message here..."
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <SendIcon className="size-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
