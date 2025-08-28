"use client";

import React, { useMemo } from "react";
import { useSetBreadcrumbs } from "@/hooks/useSetBreadcrumbs";

export function AdminBreadcrumbs() {
  const breadcrumbItems = useMemo(
    () => [{ label: "Admin Panel", href: "/admin", isActive: true }],
    []
  );

  useSetBreadcrumbs(breadcrumbItems);

  return null; // This component only sets breadcrumbs, doesn't render anything
}
