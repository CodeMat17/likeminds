import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { MissionSection } from "@/components/home/MissionSection";
import { WorksPreview } from "@/components/home/WorksPreview";
import { MembersPreview } from "@/components/home/MembersPreview";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Home – LikeMinds 1980–1986 | Nomeh Unateze Community Development",
  description:
    "Welcome to the official website of LikeMinds 1980–1986 Association — Nomeh Unateze Community Development. Committed to social development, youth empowerment, and community welfare in Enugu, Nigeria.",
  alternates: { canonical: "https://likeminds-nomeh.org" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "LikeMinds 1980–1986 Association",
  alternateName: "Nomeh Unateze Community Development LikeMinds 1980–1986",
  description:
    "A non-profit age grade association for indigenes of Nomeh born between 1980 and 1986, dedicated to community development, welfare and empowerment in Enugu, Nigeria.",
  url: "https://likeminds-nomeh.org",
  foundingDate: "1980",
  areaServed: { "@type": "Place", name: "Nomeh, Enugu State, Nigeria" },
  slogan: "Ofu Obi Umunwanne",
  email: "info@likeminds-nomeh.org",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nomeh",
    addressRegion: "Enugu State",
    addressCountry: "NG",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      {/* <StatsSection /> */}
      <MissionSection />
      <WorksPreview />
      <MembersPreview />
      <CTASection />
    </>
  );
}
