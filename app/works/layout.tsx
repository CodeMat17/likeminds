import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Works",
  description:
    "Explore the community development projects and social impact initiatives of LikeMinds 1980–1986 Association in Nomeh Unateze, Nkanu East, Enugu State, Nigeria.",
  keywords: [
    "LikeMinds community projects",
    "Nomeh community development",
    "Enugu community welfare",
    "age grade projects Nigeria",
    "youth empowerment Enugu",
    "social impact Nomeh",
  ],
  alternates: { canonical: "https://likemindsofficial.org/works" },
  openGraph: {
    title: "Community Works | LikeMinds 1980–1986 Nomeh",
    description:
      "Discover the social projects and community development initiatives by LikeMinds 1980–1986 in Nomeh Unateze.",
    url: "https://likemindsofficial.org/works",
  },
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
