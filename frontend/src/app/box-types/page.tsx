import type { Metadata } from "next";
import React from "react";
import { BoxTypesClient } from "./BoxTypesClient";
import { pageSEO } from "@/components/SEOMetadata";

// SEO метаданные для страницы box types
export const metadata: Metadata = {
  ...pageSEO.boxTypes(),
  other: {
    // Структурированные данные для box types
    "structured-data": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Box Types",
      description: "Box types catalog and management page",
      url: "/box-types",
      mainEntity: {
        "@type": "ItemList",
        name: "Box Types Catalog",
        description: "Collection of box types available for management",
      },
    }),
  },
};

export default function BoxTypesPage() {
  return (
    <div className="min-h-screen bg-muted/50">
      <main className="w-full py-6">
        <div className="w-full px-6">
          {/* Клиентский компонент для интерактивности */}
          <BoxTypesClient />
        </div>
      </main>
    </div>
  );
}
