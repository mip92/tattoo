"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Edit, ArrowLeft, Calendar, Hash } from "lucide-react";
import Link from "next/link";
import { useBoxType } from "@/hooks/useBoxType";
import { useSetBreadcrumbs } from "@/hooks/useSetBreadcrumbs";
import LoadingSpinner from "@/components/LoadingSpinner";

interface BoxTypeDetailClientProps {
  id: number;
}

export function BoxTypeDetailClient({ id }: BoxTypeDetailClientProps) {
  const { boxType, loading, error, refetch } = useBoxType(id);

  const breadcrumbItems = useMemo(
    () => [
      { label: "Box Types", href: "/box-types" },
      {
        label: boxType?.name || `Box Type ${id}`,
        href: `/box-types/${id}`,
        isActive: true,
      },
    ],
    [boxType?.name, id]
  );

  useSetBreadcrumbs(breadcrumbItems);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Error Loading Box Type
        </h2>
        <p className="text-muted-foreground mb-4">{error.message}</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  if (!boxType) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">
          Box Type Not Found
        </h2>
        <p className="text-muted-foreground mb-4">
          The box type you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/box-types">
          <Button>Back to Box Types</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/box-types">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {boxType.name}
          </h1>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p className="text-lg font-semibold">{boxType.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Type
                </label>
                <p className="text-lg font-semibold">{boxType.type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Quantity
                </label>
                <p className="text-lg font-semibold">{boxType.quantity}</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Details */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">ID:</span>
                  <span className="font-medium">{boxType.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Created:
                  </span>
                  <span className="font-medium">
                    {new Date(boxType.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Updated:
                  </span>
                  <span className="font-medium">
                    {new Date(boxType.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Box Type
              </Button>
              <Button className="w-full" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                View Related Items
              </Button>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="font-medium">Box Type</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
