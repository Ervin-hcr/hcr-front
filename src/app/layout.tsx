import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "../../components/CookieBanner";
import ThirdPartyScripts from "../../components/ThirdPartyScripts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HCR Amnéville – Rénovation et travaux TCE à Metz, Nancy et Luxembourg",
  description:
    "HCR Amnéville réalise vos travaux de rénovation et aménagement intérieur/extérieur à Amnéville, Metz, Nancy et Luxembourg : maçonnerie, plomberie, peinture, menuiserie.",
  keywords: [
    "HCR Amnéville",
    "rénovation",
    "rénovation Amnéville",
    "aménagement intérieur",
    "aménagement extérieur",
    "salle de bain",
    "menuiserie",
    "plomberie",
    "peinture",
    "isolation",
    "travaux Amnéville",
    "travaux Metz",
    "travaux Luxembourg",
    "revêtements de sols",
    "rénovation TCE Amnéville",
  ],
  openGraph: {
    title: "HCR Amnéville – Rénovation et travaux TCE à Metz, Nancy et Luxembourg",
    description:
      "HCR Amnéville réalise vos travaux de rénovation et aménagement intérieur/extérieur à Amnéville, Metz, Nancy et Luxembourg : maçonnerie, plomberie, peinture, menuiserie.",
    url: "https://www.hcr-amneville.fr",
    siteName: "HCR Amnéville",
    images: [
      {
        url: "https://www.hcr-amneville.fr/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "HCR Amnéville - Rénovation et aménagement intérieur et extérieur à Amnéville",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.hcr-amneville.fr",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* JSON-LD pour Organisation locale */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HCR Amnéville",
              url: "https://www.hcr-amneville.fr",
              logo: "https://www.hcr-amneville.fr/favicon.ico",
              description:
                "HCR Amnéville réalise vos travaux de rénovation et aménagement intérieur/extérieur à Amnéville, Metz, Nancy et Luxembourg : maçonnerie, plomberie, peinture, menuiserie.",
              telephone: "+33 6 68 85 62 93",
              email: "hcr-amneville@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "9B rue Saint-Charles",
                addressLocality: "Amnéville",
                postalCode: "57360",
                addressCountry: "FR",
              },
              sameAs: [
                "https://www.facebook.com/100063894768191/about/?_rdr",
                "https://www.instagram.com/h.c.r_sasu/",
              ],
            }),
          }}
        />

        {/* JSON-LD pour Services + FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Service",
                  serviceType: "Rénovation complète TCE",
                  provider: { "@type": "Organization", name: "HCR Amnéville" },
                  areaServed: "Amnéville, Metz, Nancy, Luxembourg",
                },
                {
                  "@type": "Service",
                  serviceType: "Plomberie et sanitaires",
                  provider: { "@type": "Organization", name: "HCR Amnéville" },
                  areaServed: "Amnéville, Metz, Nancy, Luxembourg",
                },
                {
                  "@type": "Service",
                  serviceType: "Peinture et revêtements muraux",
                  provider: { "@type": "Organization", name: "HCR Amnéville" },
                  areaServed: "Amnéville, Metz, Nancy, Luxembourg",
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "Quels services propose HCR Amnéville ?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Maçonnerie, plomberie, peinture, menuiserie, rénovation complète TCE, aménagement intérieur et extérieur.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Quels sont les secteurs desservis ?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Amnéville, Metz, Nancy et Luxembourg.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <CookieBanner />
<ThirdPartyScripts />

      </body>
    </html>
  );
}
