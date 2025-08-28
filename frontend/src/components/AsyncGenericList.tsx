"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface PaginationOutResponse<T> {
  rows: T[];
  total: number;
}

interface AsyncGenericListProps<T> {
  items: PaginationOutResponse<T>;
  loadMore: (skip: number, take: number) => Promise<PaginationOutResponse<T>>;
  renderItem: (item: T) => React.ReactNode;
  skeletonComponent: React.ReactNode;
  take?: number;
  loadingText?: string;
  noMoreItemsText?: string;
  isLoading?: boolean;
  gridCols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  spacing?: number;
}

export const AsyncGenericList = <T,>({
  items,
  loadMore,
  renderItem,
  skeletonComponent: SkeletonComponent,
  take = 10,
  loadingText = "Loading more items...",
  noMoreItemsText = "No more items to load",
  isLoading = false, // Состояние загрузки из Apollo
  gridCols = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4,
  },
  spacing = 6,
}: AsyncGenericListProps<T>) => {
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setHasMore(true);
  }, [items.rows.length]);

  const handleLoadMore = useCallback(async () => {
    console.log(
      "handleLoadMore called, isLoading:",
      isLoading,
      "hasMore:",
      hasMore,
      "current items:",
      items.rows.length,
      "total:",
      items.total
    );
    if (isLoading || !hasMore) return;

    if (items.rows.length >= items.total) {
      console.log("Already have all items, setting hasMore to false");
      setHasMore(false);
      return;
    }

    try {
      const currentSkip = items.rows.length;
      console.log("Calling loadMore with skip:", currentSkip, "take:", take);
      const response = await loadMore(currentSkip, take);
      const { rows: newItems, total } = response;
      console.log("LoadMore response:", { newItems: newItems.length, total });

      if (newItems.length === 0 || currentSkip + newItems.length >= total) {
        console.log("No more items to load, setting hasMore to false");
        setHasMore(false);
      } else {
        console.log("More items available, hasMore remains true");
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    }
  }, [items.rows.length, isLoading, hasMore, loadMore, take]);

  useEffect(() => {
    const hiddenDiv = document.querySelector("[data-hidden-loader]");
    if (!hiddenDiv) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !isLoading) {
            handleLoadMore();
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(hiddenDiv);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, handleLoadMore]);

  // Generate responsive grid classes
  const getGridClasses = () => {
    const classes = [];
    if (gridCols.xs) classes.push(`grid-cols-${gridCols.xs}`);
    if (gridCols.sm) classes.push(`sm:grid-cols-${gridCols.sm}`);
    if (gridCols.md) classes.push(`md:grid-cols-${gridCols.md}`);
    if (gridCols.lg) classes.push(`lg:grid-cols-${gridCols.lg}`);
    if (gridCols.xl) classes.push(`xl:grid-cols-${gridCols.xl}`);
    return classes.join(" ");
  };

  const showSkeleton = isLoading;

  return (
    <>
      <div className={`grid gap-${spacing} ${getGridClasses()}`}>
        {items.rows.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}

        {showSkeleton &&
          Array.from({ length: take }).map((_, index) => (
            <div key={`skeleton-${index}`}>{SkeletonComponent}</div>
          ))}

        <div data-hidden-loader className="h-2.5 w-full mt-2.5" />
      </div>

      {showSkeleton && (
        <div className="flex justify-center py-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>
              {loadingText} Loaded: {items.rows.length} of {items.total}
            </span>
          </div>
        </div>
      )}

      {!hasMore && items.rows.length > 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground italic">
            {noMoreItemsText} Total loaded: {items.rows.length} of {items.total}
          </p>
        </div>
      )}
    </>
  );
};
