import { useGetBoxTypeQuery } from "@/generated/graphql";

export function useBoxType(id: number) {
  const { loading, error, data, refetch } = useGetBoxTypeQuery({
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  return {
    boxType: data?.boxType,
    loading,
    error,
    refetch,
  };
}
