import { useCallback, useMemo, useState } from "react";
import { useGetBoxTypesQuery } from "@/generated/graphql";

export type BoxTypeFromQuery = {
  __typename?: "BoxType";
  id: number;
  name: string;
  quantity: number;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export interface PaginationOutResponse<T> {
  rows: T[];
  total: number;
}

const take = 5;

export function useBoxTypesInfinite(searchTerm: string) {
  const [loadingMore, setLoadingMore] = useState(false);

  const { loading, error, data, fetchMore, refetch } = useGetBoxTypesQuery({
    variables: {
      query: {
        skip: 0,
        take,
        search: searchTerm || undefined,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  const boxTypesData = useMemo(() => {
    console.log("Box types data:", data);
    if (data?.boxTypesWithPagination) {
      return {
        rows: data.boxTypesWithPagination.rows.filter(Boolean),
        total: data.boxTypesWithPagination.total || 0,
      };
    }
    return { rows: [], total: 0 };
  }, [data]);

  const loadMore = useCallback(
    async (
      skip: number,
      take: number
    ): Promise<PaginationOutResponse<BoxTypeFromQuery>> => {
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

        if (result.data?.boxTypesWithPagination?.rows) {
          const newBoxTypes =
            result.data.boxTypesWithPagination.rows.filter(Boolean);
          return {
            rows: newBoxTypes,
            total: result.data.boxTypesWithPagination.total || 0,
          };
        }

        return {
          rows: [],
          total: 0,
        };
      } catch {
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
    boxTypesData,
    loadMore,
    loading,
    loadingMore,
    error,
    refetch,
    take,
  };
}
