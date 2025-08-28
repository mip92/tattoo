import { useCallback, useMemo, useState } from "react";
import { useGetProductsWithPaginationQuery } from "@/generated/graphql";

export type ProductFromQuery = {
  __typename?: "ProductWithBrand";
  id: number;
  name: string;
  brandId: number;
  createdAt: string;
  type: string; // Changed from 'any' to 'string'
  updatedAt: string;
  brand: {
    __typename?: "Brand";
    name: string;
  };
};

export interface PaginationOutResponse<T> {
  rows: T[];
  total: number;
}

const take = 5;

export function useProductsInfinite(searchTerm: string) {
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    loading,
    error,
    data,
    fetchMore,
    refetch,
  } = // Added back error
    useGetProductsWithPaginationQuery({
      variables: {
        query: {
          skip: 0,
          take,
          search: searchTerm || undefined,
        },
      },
      fetchPolicy: "cache-and-network",
    });

  const productsData = useMemo(() => {
    if (data?.productsWithPagination) {
      return {
        rows: data.productsWithPagination.rows.filter(Boolean),
        total: data.productsWithPagination.total || 0,
      };
    }
    return { rows: [], total: 0 };
  }, [data]);

  const loadMore = useCallback(
    async (
      skip: number,
      take: number
    ): Promise<PaginationOutResponse<ProductFromQuery>> => {
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

        if (result.data?.productsWithPagination?.rows) {
          const newProducts =
            result.data.productsWithPagination.rows.filter(Boolean);
          return {
            rows: newProducts,
            total: result.data.productsWithPagination.total || 0,
          };
        }

        return {
          rows: [],
          total: 0,
        };
      } catch (error) {
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
    productsData,
    loadMore,
    loading,
    loadingMore,
    error, // Return the actual error from GraphQL
    refetch,
    take,
  };
}
