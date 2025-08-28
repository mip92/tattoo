"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Edit, Trash2 } from "lucide-react";
import { useSetBreadcrumbs } from "@/hooks/useSetBreadcrumbs";

interface ProductData {
  id: number;
  name: string;
  brandId: number;
  createdAt: string;
  type: string;
  updatedAt: string;
  brand: {
    name: string;
  };
}

interface ProductDetailClientProps {
  productId: string;
  productData: ProductData | null;
}

// Этот компонент теперь серверный и будет рендериться на сервере
export function ProductDetailClient({
  productId,
  productData,
}: ProductDetailClientProps) {
  const breadcrumbItems = useMemo(
    () => [
      { label: "Products", href: "/products", isActive: false },
      {
        label: productData?.name || `Product ${productId}`,
        href: undefined,
        isActive: true,
      },
    ],
    [productData?.name, productId]
  );

  useSetBreadcrumbs(breadcrumbItems);

  if (!productData) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Product not found
        </h3>
        <p className="text-muted-foreground mb-4">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Image */}
        <Card>
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center rounded-lg">
              <Package className="h-24 w-24 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Product Information */}
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <p className="text-foreground">{productData.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Brand
              </label>
              <p className="text-foreground">{productData.brand.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Type
              </label>
              <p className="text-foreground">{productData.type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Product ID
              </label>
              <p className="text-foreground">{productData.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Created
              </label>
              <p className="text-foreground">
                {new Date(productData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-muted-foreground">Last Updated</label>
              <p className="text-foreground">
                {new Date(productData.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Product
        </Button>
        <Button variant="outline">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Product
        </Button>
      </div>
    </>
  );
}
