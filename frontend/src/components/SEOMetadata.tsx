import type { Metadata } from "next";

interface SEOMetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
  };
  twitter?: {
    title?: string;
    description?: string;
    image?: string;
  };
  canonical?: string;
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  openGraph,
  twitter,
  canonical,
  noIndex = false,
}: SEOMetadataProps): Metadata {
  const baseKeywords = [
    "tattoo",
    "business",
    "management",
    "inventory",
    "catalog",
    "nextjs",
    "graphql",
  ];

  const allKeywords = [...baseKeywords, ...keywords];

  return {
    title: `${title} | Tattoo Client`,
    description,
    keywords: allKeywords,
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      type: "website",
      locale: "en_US",
      url: canonical || "https://tattoo-client.vercel.app",
      siteName: "Tattoo Client",
      images: openGraph?.image
        ? [
            {
              url: openGraph.image,
              width: 1200,
              height: 630,
              alt: `${title} - Tattoo Client`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: twitter?.title || title,
      description: twitter?.description || description,
      images: twitter?.image ? [twitter.image] : undefined,
      creator: "@tattooclient",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: canonical ? { canonical } : undefined,
  };
}

// Предустановленные SEO конфигурации для разных страниц
export const pageSEO = {
  home: () =>
    generateSEOMetadata({
      title: "Tattoo Client - Modern Tattoo Business Management Platform",
      description:
        "Transform your tattoo business with our comprehensive management platform. Features include product catalog, inventory management, role-based access control, and modern authentication.",
      keywords: [
        "tattoo business",
        "inventory management",
        "product catalog",
        "business management",
        "tattoo studio",
      ],
      canonical: "/",
    }),

  products: () =>
    generateSEOMetadata({
      title: "Products - Product Catalog & Inventory Management",
      description:
        "Manage your product catalog and inventory with our comprehensive product management system. Search, filter, and organize your products efficiently.",
      keywords: ["products", "inventory", "catalog", "management"],
      canonical: "/products",
    }),

  brands: () =>
    generateSEOMetadata({
      title: "Brands - Brand Catalog & Management",
      description:
        "Manage your brand catalog and information with our comprehensive brand management system. Search, filter, and organize your brands efficiently.",
      keywords: [
        "brands",
        "brand catalog",
        "brand management",
        "tattoo brands",
      ],
      canonical: "/brands",
    }),

  boxTypes: () =>
    generateSEOMetadata({
      title: "Box Types - Box Type Catalog & Management",
      description:
        "Manage your box type catalog and information with our comprehensive box type management system. Search, filter, and organize your box types efficiently.",
      keywords: [
        "box types",
        "box type catalog",
        "box type management",
        "tattoo supplies",
      ],
      canonical: "/box-types",
    }),

  dashboard: () =>
    generateSEOMetadata({
      title: "Dashboard - Business Overview & Analytics",
      description:
        "Get a comprehensive overview of your tattoo business with our dashboard. Monitor key metrics, track performance, and make data-driven decisions.",
      keywords: [
        "dashboard",
        "analytics",
        "business metrics",
        "performance tracking",
      ],
      canonical: "/dashboard",
    }),

  admin: () =>
    generateSEOMetadata({
      title: "Admin Panel - Business Administration",
      description:
        "Administrative tools for managing your tattoo business. User management, system settings, and advanced business controls.",
      keywords: [
        "admin",
        "administration",
        "user management",
        "system settings",
      ],
      canonical: "/admin",
    }),

  auth: () =>
    generateSEOMetadata({
      title: "Authentication - Sign In & Registration",
      description:
        "Secure authentication for your tattoo business management platform. Sign in, register, and manage your account securely.",
      keywords: ["authentication", "login", "registration", "security"],
      canonical: "/auth",
    }),

  productDetail: (productId: string) =>
    generateSEOMetadata({
      title: `Product ${productId} - Product Details`,
      description: `View detailed information about product ${productId}. Product specifications, brand information, and management options.`,
      keywords: [
        "product details",
        "product information",
        "product management",
        "tattoo supplies",
      ],
      canonical: `/products/${productId}`,
    }),

  brandDetail: (brandId: string) =>
    generateSEOMetadata({
      title: `Brand ${brandId} - Brand Details`,
      description: `View detailed information about brand ${brandId}. Brand specifications and management options.`,
      keywords: ["brand details", "brand information", "brand management"],
      canonical: `/brands/${brandId}`,
    }),

  boxType: () =>
    generateSEOMetadata({
      title: "Box Type - Box Type Details",
      description:
        "View detailed information about box type. Box type specifications and management options.",
      keywords: [
        "box type details",
        "box type information",
        "box type management",
      ],
      canonical: "/box-types",
    }),
};
