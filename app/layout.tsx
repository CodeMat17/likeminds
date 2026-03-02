import type { Metadata, Viewport } from "next";
import { Cinzel, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// Headings & highlights — reuses --font-playfair so all font-serif classes work unchanged
const cinzel = Cinzel({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Body text — reuses --font-geist-sans so --font-sans in @theme inline resolves correctly
const nunito = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const baseUrl = "https://likeminds-nomeh.org";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LikeMinds 1980–1986 | Nomeh Unateze Community Development Association",
    template: "%s | LikeMinds 1980–1986 Nomeh",
  },
  description:
    "LikeMinds is the Nomeh Unateze 1980–1986 Age Grade Association based in Enugu. We are committed to social development, youth empowerment, community welfare, and upholding our motto: Ofu Obi Umunwanne.",
  keywords: [
    "LikeMinds",
    "Nomeh",
    "Unateze",
    "1980",
    "1986",
    "Enugu",
    "age grade association",
    "community development",
    "Igbo",
    "Nigeria",
    "youth empowerment",
    "Ofu Obi Umunwanne",
    "welfare",
    "philanthropy",
    "Nomeh community",
  ],
  authors: [{ name: "LikeMinds 1980–1986 Association" }],
  creator: "LikeMinds 1980–1986 Association, Nomeh Unateze",
  publisher: "LikeMinds 1980–1986 Association",
  category: "Non-profit Organization",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: baseUrl,
    siteName: "LikeMinds 1980–1986 Association",
    title: "LikeMinds 1980–1986 | Nomeh Unateze Community Development",
    description:
      "A non-profit age grade association dedicated to social development, community welfare, and empowerment in Nomeh, Enugu State, Nigeria.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "LikeMinds 1980–1986 Association – Ofu Obi Umunwanne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LikeMinds 1980–1986 | Nomeh Unateze",
    description:
      "Nomeh Unateze 1980–1986 Age Grade – committed to brotherhood, community development and empowerment.",
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: baseUrl },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f5ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${nunito.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
          themes={["light", "dark"]}
        >
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
