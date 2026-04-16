import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | LikeMinds 1980–1986 Nomeh",
  description:
    "Get in touch with LikeMinds 1980–1986 Association — Nomeh Unateze. Reach out for enquiries, partnerships, or membership information.",
  alternates: { canonical: "https://likeminds-nomeh.org/contact" },
  openGraph: {
    title: "Contact Us – LikeMinds 1980–1986",
    description:
      "Have a question or want to collaborate? Contact the LikeMinds 1980–1986 Association, Nomeh Unateze, Enugu State.",
    url: "https://likeminds-nomeh.org/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
