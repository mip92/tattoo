"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Package, Loader2 } from "lucide-react";
import { AsyncGenericList } from "@/components/AsyncGenericList";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import Link from "next/link";
import {
  useBoxTypesInfinite,
  type BoxTypeFromQuery,
} from "@/hooks/useBoxTypesInfinite";
import { useSetBreadcrumbs } from "@/hooks/useSetBreadcrumbs";

export function BoxTypesClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const { boxTypesData, loadMore, loading, loadingMore, error, refetch, take } =
    useBoxTypesInfinite(searchTerm);

  const breadcrumbItems = useMemo(
    () => [{ label: "Box Types", href: "/box-types", isActive: true }],
    []
  );

  useSetBreadcrumbs(breadcrumbItems);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      refetch();
    },
    [refetch]
  );

  const renderBoxType = useCallback(
    (boxType: BoxTypeFromQuery) => (
      <Card key={boxType.id} className="overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 flex items-center justify-center">
          <Package className="h-16 w-16 text-green-400" />
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{boxType.name}</CardTitle>
          <p className="text-sm text-muted-foreground">ID: {boxType.id}</p>
          <p className="text-sm text-muted-foreground">Type: {boxType.type}</p>
          <p className="text-sm text-muted-foreground">
            Quantity: {boxType.quantity}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold text-foreground">
              Box Type
            </span>
            <span className="text-sm text-muted-foreground">Active</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Edit
            </Button>
            <Link href={`/box-types/${boxType.id}`}>
              <Button variant="outline" size="sm" className="flex-1">
                View
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    ),
    []
  );

  if (error) {
    return (
      <section className="min-h-screen bg-muted/50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Box Types
          </h2>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Actions Bar */}
      <section className="mb-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between px-2">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search box types..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              aria-label="Search box types"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Box Type
        </Button>
      </section>

      {/* Loading State */}
      {loading && boxTypesData.rows.length === 0 && (
        <section className="flex items-center justify-center py-12 px-2">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          <span className="ml-2 text-muted-foreground">
            Loading box types...
          </span>
        </section>
      )}

      {/* Box Types List */}
      {boxTypesData.rows.length > 0 && (
        <section className="px-2">
          <p className="text-muted-foreground mb-4">
            Total box types: {boxTypesData.total}
          </p>
          <AsyncGenericList<BoxTypeFromQuery>
            items={boxTypesData}
            loadMore={loadMore}
            renderItem={renderBoxType}
            skeletonComponent={<ProductSkeleton />}
            take={take}
            isLoading={loadingMore}
            gridCols={{
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 4,
            }}
            spacing={6}
          />
        </section>
      )}

      {!loading && boxTypesData.rows.length === 0 && (
        <section className="text-center py-12 px-2">
          <Package className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No box types found
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm
              ? `No box types match "${searchTerm}"`
              : "Get started by adding your first box type"}
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Box Type
          </Button>
        </section>
      )}
    </>
  );
}
