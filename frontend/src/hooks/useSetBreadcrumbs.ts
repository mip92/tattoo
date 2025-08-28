"use client";

import { useEffect, useRef, useCallback } from "react";
import { useBreadcrumbs } from "@/contexts/BreadcrumbsContext";
import type { BreadcrumbItem } from "@/contexts/BreadcrumbsContext";

export function useSetBreadcrumbs(items: BreadcrumbItem[]) {
  const { setBreadcrumbs } = useBreadcrumbs();
  const prevItemsRef = useRef<BreadcrumbItem[]>([]);

  const setBreadcrumbsStable = useCallback(
    (newItems: BreadcrumbItem[]) => {
      setBreadcrumbs(newItems);
    },
    [setBreadcrumbs]
  );

  useEffect(() => {
    // Only update if items actually changed
    const currentItemsStr = JSON.stringify(items);
    const prevItemsStr = JSON.stringify(prevItemsRef.current);

    if (currentItemsStr !== prevItemsStr) {
      setBreadcrumbsStable(items);
      prevItemsRef.current = items;
    }
  }, [items, setBreadcrumbsStable]);
}

// Alternative hook that accepts a function to generate breadcrumbs
export function useSetBreadcrumbsFn(breadcrumbsFn: () => BreadcrumbItem[]) {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    const items = breadcrumbsFn();
    setBreadcrumbs(items);
  }, [breadcrumbsFn, setBreadcrumbs]);
}
