import { useGetBrandQuery } from "@/generated/graphql";

export type BrandFromQuery = {
  __typename?: "Brand";
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export function useBrand(id: number) {
  const { data, loading, error, refetch } = useGetBrandQuery({
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const brand = data?.brand;

  return {
    brand,
    loading,
    error,
    refetch,
  };
}
