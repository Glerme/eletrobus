import { useQueryClient } from "@tanstack/react-query";

export const useMultipleQueryRefetch = () => {
  const queryClient = useQueryClient();

  const refetchQueries = (queries: any) => {
    for (const queryKey of queries) {
      queryClient.invalidateQueries(queryKey);
    }
  };

  return refetchQueries;
};
