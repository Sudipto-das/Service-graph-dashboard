import { useEffect } from "react";
import { cn } from "../../lib/utils";

import { useApps } from "../../hooks/useApps";
import { useAppStore } from "../../store/useAppStore";
import type { AppItem } from "../../api/MockApi";
import { LoadingOverlay } from "../ui/Loading";
import { ErrorOverlay } from "../ui/Error";


const dotClass: Record<AppItem["status"], string> = {
  active: "bg-emerald-500",
  inactive: "bg-slate-400",
  error: "bg-red-500 animate-pulse",
};
export function AppsList() {
  const { data: apps, isPending, isError, error, refetch } = useApps();
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const setSelectedAppId = useAppStore((s) => s.setSelectedAppId);

  // Auto-select first app on mount
  useEffect(() => {
    if (apps && apps.length > 0 && !selectedAppId) {
      setSelectedAppId(apps[0].id);
    }
  }, [apps, selectedAppId, setSelectedAppId]);

  if (isPending) return <LoadingOverlay />;
  if (isError) return <ErrorOverlay message={error?.message} onRetry={refetch} />;

  // Toggle selection: same app again → deselect
  const handleAppClick = (appId: string) => {
    setSelectedAppId(selectedAppId === appId ? null : appId);
  };

  return (
    <ul className="mt-2 space-y-0.5">
      {apps?.map((app) => (
        <li
          key={app.id}
          onClick={() => handleAppClick(app.id)}
          className={cn(
            "flex cursor-pointer items-start gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors select-none",
            selectedAppId === app.id
              ? "bg-primary/10 ring-1 ring-primary/20"
              : "hover:bg-muted/60"
          )}
        >
          {/* Status dot */}
          <span
            className={cn(
              "mt-[5px] h-2 w-2 shrink-0 rounded-full",
              dotClass[app.status]
            )}
          />

          {/* Text */}
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium leading-tight">{app.name}</p>
            <p className="truncate text-xs leading-tight text-muted-foreground">
              {app.description}
            </p>
          </div>

          {/* Category badge */}
          <span className="ml-auto shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            {app.category}
          </span>
        </li>
      ))}
    </ul>
  );
}