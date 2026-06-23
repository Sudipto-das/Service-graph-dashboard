import { useQuery } from "@tanstack/react-query";
import { fetchGraphByAppId } from "../api/MockApi";

export function useGraphQuery(appId: string | null) {
  return useQuery({
    queryKey: ["graph", appId],
    queryFn: () => fetchGraphByAppId(appId!),
    enabled: !!appId,        // only fetch when an app is selected
    retry: 2,
    retryDelay: 800,
    staleTime: 60_000,
  });
}
