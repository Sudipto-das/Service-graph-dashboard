// src/api/mockApi.ts

import type { Node, Edge } from "@xyflow/react";
import type { ServiceNodeData } from "../types";

export interface AppItem {
  id: string;
  name: string;
  status: "active" | "inactive" | "error";
  description: string;
  category: string;
}

export interface GraphData {
  nodes: Node<ServiceNodeData>[];
  edges: Edge[];
}

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

// ─── Error simulation toggle ──────────────────────────────────────────────────
// Flip to true to make every graph fetch fail (demonstrates ErrorOverlay + retry).
// When false, there's still a ~15 % random chance per call.
export let SIMULATE_GRAPH_ERROR = false;

export function toggleGraphError() {
  SIMULATE_GRAPH_ERROR = !SIMULATE_GRAPH_ERROR;
}

// ─── Apps ─────────────────────────────────────────────────────────────────────

export async function fetchApps(): Promise<AppItem[]> {
  await sleep(1_200);
  return [
    {
      id: "app-1",
      name: "Monitoring",
      status: "active",
      description: "Real-time service metrics & dashboards",
      category: "Observability",
    },
    {
      id: "app-2",
      name: "Log Aggregator",
      status: "active",
      description: "Centralized log collection & search",
      category: "Observability",
    },
    {
      id: "app-3",
      name: "Alert Manager",
      status: "error",
      description: "Alert routing, grouping & silencing",
      category: "Ops",
    },
    {
      id: "app-4",
      name: "CI / CD Pipeline",
      status: "inactive",
      description: "Build & deploy automation",
      category: "DevOps",
    },
    {
      id: "app-5",
      name: "Secret Vault",
      status: "active",
      description: "Secrets & credential management",
      category: "Security",
    },
  ];
}

// ─── Per-app graph data ──────────────────────────────────────────────────────
// Each app has its own unique set of nodes and edges.
// Selecting an app now fetches THAT app's service graph.

const graphByApp: Record<string, GraphData> = {
  "app-1": {
    // Monitoring — full observability stack
    nodes: [
      {
        id: "mon-1",
        position: { x: 0, y: 0 },
        data: { label: "API Gateway", status: "healthy", cpuLimit: 75 },
      },
      {
        id: "mon-2",
        position: { x: -200, y: 150 },
        data: { label: "Auth Service", status: "degraded", cpuLimit: 90 },
      },
      {
        id: "mon-3",
        position: { x: 200, y: 150 },
        data: { label: "Database", status: "down", cpuLimit: 50 },
      },
    ],
    edges: [
      { id: "me1-2", source: "mon-1", target: "mon-2", animated: true },
      { id: "me1-3", source: "mon-1", target: "mon-3", animated: true },
    ],
  },

  "app-2": {
    // Log Aggregator — log pipeline
    nodes: [
      {
        id: "log-1",
        position: { x: 0, y: 0 },
        data: { label: "Log Collector", status: "healthy", cpuLimit: 40 },
      },
      {
        id: "log-2",
        position: { x: -180, y: 140 },
        data: { label: "Search Engine", status: "healthy", cpuLimit: 65 },
      },
      {
        id: "log-3",
        position: { x: 180, y: 140 },
        data: { label: "Storage Layer", status: "degraded", cpuLimit: 80 },
      },
    ],
    edges: [
      { id: "le1-2", source: "log-1", target: "log-2", animated: true },
      { id: "le1-3", source: "log-1", target: "log-3", animated: true },
    ],
  },

  "app-3": {
    // Alert Manager — alerting pipeline
    nodes: [
      {
        id: "alt-1",
        position: { x: 0, y: 0 },
        data: { label: "Alert Router", status: "healthy", cpuLimit: 55 },
      },
      {
        id: "alt-2",
        position: { x: -200, y: 150 },
        data: { label: "Notification Svc", status: "down", cpuLimit: 30 },
      },
      {
        id: "alt-3",
        position: { x: 200, y: 150 },
        data: { label: "Silence Manager", status: "healthy", cpuLimit: 20 },
      },
    ],
    edges: [
      { id: "ae1-2", source: "alt-1", target: "alt-2", animated: true },
      { id: "ae1-3", source: "alt-1", target: "alt-3", animated: true },
    ],
  },

  "app-4": {
    // CI/CD Pipeline — build & deploy
    nodes: [
      {
        id: "ci-1",
        position: { x: 0, y: 0 },
        data: { label: "Build Service", status: "healthy", cpuLimit: 70 },
      },
      {
        id: "ci-2",
        position: { x: -180, y: 140 },
        data: { label: "Deploy Agent", status: "degraded", cpuLimit: 10 },
      },
      {
        id: "ci-3",
        position: { x: 180, y: 140 },
        data: { label: "Artifact Registry", status: "healthy", cpuLimit: 45 },
      },
    ],
    edges: [
      { id: "ce1-2", source: "ci-1", target: "ci-2", animated: true },
      { id: "ce1-3", source: "ci-1", target: "ci-3", animated: true },
    ],
  },

  "app-5": {
    // Secret Vault — secrets management
    nodes: [
      {
        id: "vault-1",
        position: { x: 0, y: 0 },
        data: { label: "Vault Core", status: "healthy", cpuLimit: 35 },
      },
      {
        id: "vault-2",
        position: { x: -200, y: 150 },
        data: { label: "Key Manager", status: "healthy", cpuLimit: 25 },
      },
      {
        id: "vault-3",
        position: { x: 200, y: 150 },
        data: { label: "Access Proxy", status: "degraded", cpuLimit: 60 },
      },
    ],
    edges: [
      { id: "ve1-2", source: "vault-1", target: "vault-2", animated: true },
      { id: "ve1-3", source: "vault-1", target: "vault-3", animated: true },
    ],
  },
};

// ─── fetchGraphByAppId ───────────────────────────────────────────────────────
// Replaces the old fetchGraphData(). Returns app-specific nodes + edges.

export async function fetchGraphByAppId(appId: string): Promise<GraphData> {
  await sleep(900);

  // Error simulation: forced toggle OR ~15 % random chance
  if (SIMULATE_GRAPH_ERROR || Math.random() < 0.15) {
    throw new Error(`Graph fetch failed for "${appId}" — retrying…`);
  }

  const graph = graphByApp[appId];
  if (!graph) {
    throw new Error(`Unknown app: ${appId}`);
  }
  return graph;
}
