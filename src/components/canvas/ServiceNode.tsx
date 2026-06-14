// src/components/canvas/ServiceNode.tsx

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "../../lib/utils";
import type { ServiceNodeData } from "../../types";

const statusDot: Record<string, string> = {
  healthy:  "bg-emerald-500",
  degraded: "bg-amber-400",
  down:     "bg-red-500 animate-pulse",
};

const cpuColor = (val: number) =>
  val > 80 ? "bg-red-500" : val > 60 ? "bg-amber-400" : "bg-emerald-500";

export function ServiceNode({ data, selected }: NodeProps) {
  const d = data as ServiceNodeData;

  return (
    <div
      className={cn(
        "min-w-[150px] rounded-xl border bg-background px-3 py-2.5 shadow-md transition-all duration-150",
        selected
          ? "border-primary shadow-lg ring-2 ring-primary/20"
          : "border-border hover:border-primary/40"
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-border" />

      {/* Label + status dot */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "h-2 w-2 shrink-0 rounded-full",
            statusDot[d.status] ?? "bg-slate-400"
          )}
        />
        <span className="text-sm font-medium leading-snug">{d.label}</span>
      </div>

      {/* CPU mini-bar */}
      <div className="mt-2 space-y-0.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">CPU</span>
          <span className="text-[10px] tabular-nums text-muted-foreground">
            {d.cpuLimit}%
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", cpuColor(d.cpuLimit))}
            style={{ width: `${d.cpuLimit}%` }}
          />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-border" />
    </div>
  );
}