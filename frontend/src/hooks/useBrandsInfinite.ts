import { useCallback, useMemo, useState } from "react";
import { useGetBrandsQuery } from "@/generated/graphql";

export type BrandFromQuery = {
  __typename?: "Brand";
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export interface PaginationOutResponse<T> {
  rows: T[];
  total: number;
}

const take = 2;

export function useBrandsInfinite(searchTerm: string) {
  const [loadingMore, setLoadingMore] = useState(false);

  const { loading, error, data, fetchMore, refetch } = useGetBrandsQuery({
    variables: {
      query: {
        skip: 0,
        take,
        search: searchTerm || undefined,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const brandsData = useMemo(() => {
    console.log("Brands data:", data);
    if (data?.brandsWithPagination) {
      return {
        rows: data.brandsWithPagination.rows.filter(Boolean),
        total: data.brandsWithPagination.total || 0,
      };
    }
    return { rows: [], total: 0 };
  }, [data]);

  const loadMore = useCallback(
    async (
      skip: number,
      take: number
    ): Promise<PaginationOutResponse<BrandFromQuery>> => {
      console.log("Loading more brands, skip:", skip, "take:", take);
      setLoadingMore(true);

      try {
        const result = await fetchMore({
          variables: {
            query: {
              skip,
              take,
              search: searchTerm || undefined,
            },
          },
        });

        console.log("FetchMore result:", result);

        if (result.data?.brandsWithPagination?.rows) {
          const newBrands =
            result.data.brandsWithPagination.rows.filter(Boolean);
          console.log("New brands loaded:", newBrands.length);
          return {
            rows: newBrands,
            total: result.data.brandsWithPagination.total || 0,
          };
        }

        return {
          rows: [],
          total: 0,
        };
      } catch (error) {
        console.error("Error loading more brands:", error);
        return {
          rows: [],
          total: 0,
        };
      } finally {
        setLoadingMore(false);
      }
    },
    [fetchMore, searchTerm]
  );

  return {
    brandsData,
    loadMore,
    loading,
    loadingMore,
    error,
    refetch,
    take,
  };
}
