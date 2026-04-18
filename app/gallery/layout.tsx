import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Browse the photo gallery of LikeMinds 1980–1986 Association — capturing moments of brotherhood, community events, solidarity outings, and development projects in Nomeh Unateze, Enugu.",
  keywords: [
    "LikeMinds gallery",
    "Nomeh community photos",
    "age grade events Nigeria",
    "LikeMinds events",
    "Nomeh Unateze photos",
  ],
  alternates: { canonical: "https://likemindsofficial.org/gallery" },
  openGraph: {
    title: "Photo Gallery | LikeMinds 1980–1986 Nomeh Unateze",
    description:
      "Moments of brotherhood and community captured — LikeMinds 1980–1986 Association photo gallery.",
    url: "https://likemindsofficial.org/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
