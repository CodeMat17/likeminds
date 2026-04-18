import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Us – Membership Application",
  description:
    "Apply to join LikeMinds 1980–1986 Association. Membership is open to male indigenes of Nomeh Unateze born between 1980 and 1986. Complete the online membership application form today.",
  keywords: [
    "join LikeMinds",
    "LikeMinds membership",
    "Nomeh Unateze membership",
    "age grade membership Nigeria",
    "apply Nomeh community association",
    "1980 1986 age grade Enugu",
  ],
  alternates: { canonical: "https://likemindsofficial.org/join" },
  openGraph: {
    title: "Join LikeMinds 1980–1986 | Membership Application",
    description:
      "Apply to become a member of LikeMinds 1980–1986 — open to male indigenes of Nomeh Unateze born 1980–1986.",
    url: "https://likemindsofficial.org/join",
  },
  robots: { index: true, follow: true },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
