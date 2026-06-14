export type NodeStatus = "healthy" | "degraded" | "down";

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  status: NodeStatus;
  description?: string;
  cpuLimit: number; // 0-100 slider value
}