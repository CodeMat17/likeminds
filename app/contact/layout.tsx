import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the LikeMinds 1980–1986 Association. Reach out via email, phone, or WhatsApp for enquiries about membership, community projects, or general information.",
  keywords: [
    "contact LikeMinds",
    "Nomeh Unateze contact",
    "LikeMinds email",
    "LikeMinds phone",
    "age grade association contact Nigeria",
  ],
  alternates: { canonical: "https://likemindsofficial.org/contact" },
  openGraph: {
    title: "Contact LikeMinds 1980–1986 | Nomeh Unateze",
    description:
      "Reach out to the LikeMinds 1980–1986 Association for membership enquiries and general information.",
    url: "https://likemindsofficial.org/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
