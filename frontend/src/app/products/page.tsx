import type { Metadata } from "next";
import React from "react";
import { ProductsClient } from "./ProductsClient";
import { pageSEO } from "@/components/SEOMetadata";

// SEO метаданные для страницы продуктов
export const metadata: Metadata = {
  ...pageSEO.products(),
  other: {
    // Структурированные данные для продуктов
    "structured-data": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Products",
      description: "Product catalog and inventory management page",
      url: "/products",
      mainEntity: {
        "@type": "ItemList",
        name: "Product Catalog",
        description: "Collection of products available for management",
      },
    }),
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-muted/50">
      <main className="w-full py-6">
        <div className="w-full px-6">
          {/* Клиентский компонент для интерактивности */}
          <ProductsClient />
        </div>
      </main>
    </div>
  );
}
