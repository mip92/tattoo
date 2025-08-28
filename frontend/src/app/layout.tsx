import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { ThemeProvider } from "@/contexts/ThemeContext";
import LayoutWrapper from "@/components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tattoo Client - Modern Tattoo Business Management",
    template: "%s | Tattoo Client",
  },
  description:
    "A modern Next.js application for tattoo business management with GraphQL authentication, product catalog, and inventory management.",
  keywords: [
    "tattoo",
    "business",
    "management",
    "inventory",
    "catalog",
    "nextjs",
    "graphql",
  ],
  authors: [{ name: "Tattoo Client Team" }],
  creator: "Tattoo Client",
  publisher: "Tattoo Client",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tattoo-client.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tattoo-client.vercel.app",
    title: "Tattoo Client - Modern Tattoo Business Management",
    description:
      "A modern Next.js application for tattoo business management with GraphQL authentication, product catalog, and inventory management.",
    siteName: "Tattoo Client",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tattoo Client - Modern Tattoo Business Management",
    description:
      "A modern Next.js application for tattoo business management with GraphQL authentication, product catalog, and inventory management.",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "business",
  classification: "Business Software",
  other: {
    "theme-color": "#000000",
    "msapplication-TileColor": "#000000",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Tattoo Client",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* Structured data for the website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Tattoo Client",
              description: "Modern tattoo business management platform",
              url: "https://tattoo-client.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://tattoo-client.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Providers>
            <LayoutWrapper>{children}</LayoutWrapper>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
