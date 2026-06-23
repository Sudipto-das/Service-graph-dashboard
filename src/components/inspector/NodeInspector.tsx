
import { useAppStore } from "../../store/useAppStore";
import type { ServiceNodeData, NodeStatus } from "../../types";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { cn } from "../../lib/utils";
import { Textarea } from "../ui/textarea";

interface NodeInspectorProps {
  nodeId: string;
  data: ServiceNodeData;
  onDataChange: (nodeId: string, newData: Partial<ServiceNodeData>) => void;
}

const statusConfig: Record<NodeStatus, { label: string; variant: "default" | "secondary" | "destructive" }> = {
  healthy: { label: "Healthy", variant: "default" },
  degraded: { label: "Degraded", variant: "secondary" },
  down: { label: "Down", variant: "destructive" },
};

export function NodeInspector({ nodeId, data, onDataChange }: NodeInspectorProps) {
  const activeTab = useAppStore((state) => state.activeInspectorTab);
  const setActiveTab = useAppStore((state) => state.setActiveInspectorTab);

  const { label, variant } = statusConfig[data.status];

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Service Node
          </p>
          <h3 className="text-sm font-medium leading-tight">{data.label}</h3>
        </div>
        <Badge variant={variant} className="text-[11px] px-2 py-0.5">
          {label}
        </Badge>
      </div>

      {/* Underline Tabs */}
      <div className="flex gap-4 border-b">
        {(["config", "runtime"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-2 text-xs font-medium capitalize -mb-px border-b-2 transition-colors",
              activeTab === tab
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Config */}
      {activeTab === "config" && (
        <div className="space-y-3 pt-1">
          <div className="space-y-1">
            <Label htmlFor="node-name" className="text-xs text-muted-foreground">
              Name
            </Label>
            <Input
              id="node-name"
              value={data.label}
              onChange={(e) => onDataChange(nodeId, { label: e.target.value })}
              placeholder="Node name"
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="node-desc" className="text-xs text-muted-foreground">
              Description
            </Label>
            <Textarea
              id="node-desc"
              value={data.description || ""}
              onChange={(e) => onDataChange(nodeId, { description: e.target.value })}
              placeholder="Optional description"
              rows={3}
              className="text-sm resize-none"
            />
          </div>
        </div>
      )}

      {/* Runtime */}
      {activeTab === "runtime" && (
        <div className="space-y-4 pt-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">CPU Limit</Label>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={data.cpuLimit}
                  onChange={(e) => {
                    const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                    const status: NodeStatus = val > 80 ? "down" : val > 60 ? "degraded" : "healthy";
                    onDataChange(nodeId, { cpuLimit: val, status });
                  }}
                  className="h-7 w-14 px-2 text-right text-xs"
                />
                <span className="text-xs text-muted-foreground">%</span>
              </div>
            </div>
            <Slider
              value={[data.cpuLimit]}
              onValueChange={([val]) => {
                const status: NodeStatus = val > 80 ? "down" : val > 60 ? "degraded" : "healthy";
                onDataChange(nodeId, { cpuLimit: val, status });
              }}
              min={0}
              max={100}
              step={1}
            />
          </div>

          <div className="space-y-0.5 border-t pt-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Node ID
            </p>
            <p className="truncate font-mono text-xs text-muted-foreground">{nodeId}</p>
          </div>
        </div>
      )}
    </div>
  );
}