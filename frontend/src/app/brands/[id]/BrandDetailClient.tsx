"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Tag, Calendar, Hash, Loader2 } from "lucide-react";
import { useBrand } from "@/hooks/useBrand";
import { useSetBreadcrumbs } from "@/hooks/useSetBreadcrumbs";

export function BrandDetailClient({ brandId }: { brandId: string }) {
  const {
    brand: brandData,
    loading,
    error,
    refetch,
  } = useBrand(parseInt(brandId));

  const breadcrumbItems = useMemo(
    () => [
      { label: "Brands", href: "/brands", isActive: false },
      {
        label: brandData?.name || `Brand ${brandId}`,
        href: undefined,
        isActive: true,
      },
    ],
    [brandData?.name, brandId]
  );

  useSetBreadcrumbs(breadcrumbItems);

  // Обработка ошибки
  if (error) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Brand
          </h2>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Обработка загрузки
  if (loading || !brandData) {
    return (
      <div className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <span className="text-muted-foreground">Loading brand...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Brand Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag className="h-8 w-8 text-blue-600" />
            </div>
            <Button size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Brand
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Hash className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Brand ID
                  </p>
                  <p className="text-lg font-semibold">{brandData.id}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Brand Name
                  </p>
                  <p className="text-lg font-semibold">{brandData.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Created At
                </p>
                <p className="text-sm">
                  {new Date(brandData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Updated At
                </p>
                <p className="text-sm">
                  {new Date(brandData.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Brand
        </Button>
        <Button variant="destructive">Delete Brand</Button>
      </div>
    </div>
  );
}
