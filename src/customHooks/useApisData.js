import { useQuery } from "@tanstack/react-query";

const useApiData = (
  queryFunction,
  queryKey,
  dependencyIds = "",
  dependency = true
) => {
  const query = useQuery({
    queryKey: [queryKey, dependencyIds],
    queryFn: () => queryFunction(dependencyIds),
    enabled: !!dependency,
  });

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    isSuccess: query.isSuccess,
    refetch: query.refetch,
    isFetching: query.isFetching,
    isPending: query.isPending,
    error: query.error,
    data: query.data?.data,
  };
};

export default useApiData;
