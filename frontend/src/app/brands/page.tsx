import type { Metadata } from "next";
import React from "react";
import { BrandsClient } from "./BrandsClient";
import { pageSEO } from "@/components/SEOMetadata";

// SEO метаданные для страницы брендов
export const metadata: Metadata = {
  ...pageSEO.brands(),
  other: {
    // Структурированные данные для брендов
    "structured-data": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Brands",
      description: "Brand catalog and management page",
      url: "/brands",
      mainEntity: {
        "@type": "ItemList",
        name: "Brand Catalog",
        description: "Collection of brands available for management",
      },
    }),
  },
};

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-muted/50">
      <main className="w-full py-6">
        <div className="w-full px-6">
          {/* Клиентский компонент для интерактивности */}
          <BrandsClient />
        </div>
      </main>
    </div>
  );
}
