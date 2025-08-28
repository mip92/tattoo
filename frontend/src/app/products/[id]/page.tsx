import type { Metadata } from "next";
import React from "react";
import { ProductDetailClient } from "./ProductDetailClient";
import { pageSEO } from "@/components/SEOMetadata";
import {
  serverQuery,
  GET_PRODUCT_QUERY,
  ServerProductResponse,
} from "@/lib/server-graphql";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// SEO метаданные для страницы продукта
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id: productId } = await params;

  // Загружаем реальные данные продукта для точных метаданных
  try {
    const productData = await serverQuery<ServerProductResponse>(
      GET_PRODUCT_QUERY,
      { id: parseInt(productId) }
    );
    const product = productData.product;

    return {
      ...pageSEO.productDetail(productId),
      title: `${product.name} - Product Details | Tattoo Client`,
      description: `View detailed information about ${product.name}. Product specifications, brand information, and management options.`,
      other: {
        // Структурированные данные для продукта
        "structured-data": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: `Product ${product.name} from ${product.brand.name}`,
          url: `/products/${productId}`,
          identifier: product.id.toString(),
          category: "Tattoo Supplies",
          brand: {
            "@type": "Brand",
            name: product.brand.name,
          },
        }),
      },
    };
  } catch (error) {
    // Если не удалось загрузить данные, используем базовые метаданные
    return {
      ...pageSEO.productDetail(productId),
      other: {
        "structured-data": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: `Product ${productId}`,
          description: "Individual product details and information",
          url: `/products/${productId}`,
          identifier: productId,
          category: "Tattoo Supplies",
        }),
      },
    };
  }
}

// Загружаем данные продукта на сервере для лучшего SEO
async function getProductData(productId: string) {
  try {
    const data = await serverQuery<ServerProductResponse>(GET_PRODUCT_QUERY, {
      id: parseInt(productId),
    });
    return data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: productId } = await params;
  const product = await getProductData(productId);

  return (
    <div className="min-h-screen bg-muted/50">
      <main className="w-full py-6">
        <div className="w-full px-6">
          {/* Клиентский компонент для деталей продукта */}
          <ProductDetailClient productId={productId} productData={product} />
        </div>
      </main>
    </div>
  );
}
