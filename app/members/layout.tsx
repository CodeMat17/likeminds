import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Members",
  description:
    "Meet the members of LikeMinds 1980–1986 Association — indigenes of Nomeh Unateze born between 1980 and 1986, united in brotherhood and committed to community development in Enugu, Nigeria.",
  keywords: [
    "LikeMinds members",
    "Nomeh Unateze members",
    "age grade members Enugu",
    "1980 1986 Nomeh",
    "Igbo community association members",
  ],
  alternates: { canonical: "https://likemindsofficial.org/members" },
  openGraph: {
    title: "Our Members | LikeMinds 1980–1986 Nomeh Unateze",
    description:
      "Meet the men of LikeMinds — indigenes of Nomeh born 1980–1986, united by brotherhood and purpose.",
    url: "https://likemindsofficial.org/members",
  },
};

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
