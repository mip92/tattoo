import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { pageSEO } from "@/components/SEOMetadata";

// SEO метаданные для главной страницы
export const metadata: Metadata = {
  ...pageSEO.home(),
  other: {
    // Структурированные данные для главной страницы
    "structured-data": JSON.stringify({
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
      offers: {
        "@type": "Offer",
        description: "Tattoo business management software",
        category: "Business Software",
      },
    }),
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Главный заголовок страницы */}
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Welcome to{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Tattoo Client
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A modern Next.js application with GraphQL authentication and
            role-based access control.
          </p>
        </header>

        {/* Клиентский компонент для интерактивности */}
        <HomeClient />
      </div>
    </div>
  );
}
