

import { useQuery } from "@tanstack/react-query";
import { fetchGraphData } from "../api/MockApi";

export function useGraphQuery() {
  return useQuery({
    queryKey: ["graph"],
    queryFn: fetchGraphData,
    retry: 2,          // up to 2 retries → 3 total attempts max
    retryDelay: 800,   
    staleTime: 60_000,
  });
}