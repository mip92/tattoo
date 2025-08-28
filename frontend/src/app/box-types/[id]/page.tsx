import type { Metadata } from "next";
import React from "react";
import { BoxTypeDetailClient } from "./BoxTypeDetailClient";
import { pageSEO } from "@/components/SEOMetadata";

interface BoxTypePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: BoxTypePageProps): Promise<Metadata> {
  return {
    ...pageSEO.boxType(),
    title: `Box Type ${params.id}`,
    description: `Details for box type with ID ${params.id}`,
  };
}

export default function BoxTypePage({ params }: BoxTypePageProps) {
  return (
    <div className="min-h-screen bg-muted/50">
      <main className="w-full py-6">
        <div className="w-full px-6">
          <BoxTypeDetailClient id={parseInt(params.id)} />
        </div>
      </main>
    </div>
  );
}
