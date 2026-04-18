import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | LikeMinds 1980–1986 Nomeh",
  description:
    "Browse photos from LikeMinds 1980–1986 community outings, projects, events, and welfare activities in Nomeh Unateze, Enugu State.",
  alternates: { canonical: "https://likeminds-nomeh.org/gallery" },
  openGraph: {
    title: "Photo Gallery – LikeMinds 1980–1986",
    description:
      "Memories of togetherness — outings, projects, and milestones captured in pictures.",
    url: "https://likeminds-nomeh.org/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
