import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the LikeMinds 1980–1986 Association — our origin story, aims, objectives, and the spirit of Ofu Obi Umunwanne that drives our brotherhood in Nomeh Unateze, Enugu State.",
  keywords: [
    "about LikeMinds",
    "Nomeh Unateze history",
    "age grade association Enugu",
    "Ofu Obi Umunwanne",
    "community development Nomeh",
    "Igbo age grade Nigeria",
  ],
  alternates: { canonical: "https://likemindsofficial.org/about" },
  openGraph: {
    title: "About LikeMinds 1980–1986 | Nomeh Unateze",
    description:
      "The story of a brotherhood built on purpose, united in love for Nomeh Unateze.",
    url: "https://likemindsofficial.org/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
