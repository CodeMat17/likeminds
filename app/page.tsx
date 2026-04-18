import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { MissionSection } from "@/components/home/MissionSection";
import { WorksPreview } from "@/components/home/WorksPreview";
import { MembersPreview } from "@/components/home/MembersPreview";
import { CTASection } from "@/components/home/CTASection";

const BASE_URL = "https://likemindsofficial.org";

export const metadata: Metadata = {
  title: "LikeMinds 1980–1986 | Nomeh Unateze Community Development Association",
  description:
    "Official website of LikeMinds 1980–1986 — the Nomeh Unateze Age Grade Association in Enugu, Nigeria. Committed to social development, youth empowerment, community welfare, and brotherhood.",
  alternates: { canonical: BASE_URL },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "LikeMinds 1980–1986 Association",
  alternateName: [
    "Nomeh Unateze Community Development LikeMinds 1980–1986",
    "LikeMinds Nomeh",
  ],
  description:
    "A non-profit age grade association for indigenes of Nomeh born between 1980 and 1986, dedicated to community development, welfare and empowerment in Enugu, Nigeria.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo.png`,
  foundingDate: "1980",
  areaServed: { "@type": "Place", name: "Nomeh, Enugu State, Nigeria" },
  slogan: "Ofu Obi Umunwanne",
  email: "info@likemindsofficial.org",
  telephone: "+2348060329858",
  sameAs: [],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nomeh",
    addressRegion: "Enugu State",
    addressCountry: "NG",
  },
  memberOf: {
    "@type": "Organization",
    name: "Nomeh Unateze Community, Nkanu East LGA",
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
      <StatsSection />
      <MissionSection />
      <WorksPreview />
      <MembersPreview />
      <CTASection />
    </>
  );
}
