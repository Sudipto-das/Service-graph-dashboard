

import { useQuery } from "@tanstack/react-query";
import { fetchApps } from "../api/MockApi";

export function useApps() {
  return useQuery({
    queryKey: ["apps"],
    queryFn: fetchApps,
    staleTime: 5 * 60 * 1_000, // treat fresh for 5 min
  });
}