import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Photos",
  robots: { index: false, follow: false },
};

export default function GalleryUploadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
