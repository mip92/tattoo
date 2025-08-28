import type { Metadata } from "next";
import React from "react";
import { BrandDetailClient } from "./BrandDetailClient";

// SEO метаданные для страницы деталей бренда
export const metadata: Metadata = {
  title: "Brand Details - Brand Information & Management",
  description:
    "View detailed information about the brand. Brand specifications and management options.",
  keywords: ["brand details", "brand information", "brand management"],
};

interface BrandDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BrandDetailPage({
  params,
}: BrandDetailPageProps) {
  const { id: brandId } = await params;

  return (
    <div className="min-h-screen bg-muted/50">
      <main className="w-full py-6">
        <div className="w-full px-6">
          {/* Семантический заголовок страницы */}
          <header className="mb-4">
            <h1 className="text-3xl font-bold text-foreground">
              Brand Details
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage brand information
            </p>
          </header>

          {/* Клиентский компонент для интерактивности */}
          <BrandDetailClient brandId={brandId} />
        </div>
      </main>
    </div>
  );
}
