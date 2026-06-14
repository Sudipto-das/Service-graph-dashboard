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

// ─── App → Node mapping ───────────────────────────────────────────────────────
// Defines which canvas nodes belong to each app.
// Selecting an app dims all unrelated nodes on the canvas.

export const appNodeMapping: Record<string, string[]> = {
  "app-1": ["1", "2", "3"], // Monitoring    → all nodes
  "app-2": ["1", "2"],      // Log Aggregator → API Gateway + Auth Service
  "app-3": ["1", "2", "3"], // Alert Manager  → all nodes
  "app-4": ["2"],           // CI/CD Pipeline → Auth Service only
  "app-5": ["2", "3"],      // Secret Vault   → Auth Service + Database
};


const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));



export async function fetchApps(): Promise<AppItem[]> {
  await sleep(1_400);
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

// Graph 
// First call fails so TanStack Query retry behaviour is demonstrated.
// Set SIMULATE_GRAPH_ERROR = false to skip.

export const SIMULATE_GRAPH_ERROR = true;
let _graphAttempts = 0;

export async function fetchGraphData(): Promise<GraphData> {
  await sleep(900);

  if (SIMULATE_GRAPH_ERROR && _graphAttempts === 0) {
    _graphAttempts++;
    throw new Error("Network timeout — retrying…");
  }
  _graphAttempts++;

  return {
    nodes: [
      {
        id: "1",
        position: { x: 0, y: 0 },
        data: { label: "API Gateway", status: "healthy", cpuLimit: 75 },
      },
      {
        id: "2",
        position: { x: -200, y: 150 },
        data: { label: "Auth Service", status: "degraded", cpuLimit: 90 },
      },
      {
        id: "3",
        position: { x: 200, y: 150 },
        data: { label: "Database", status: "down", cpuLimit: 50 },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e1-3", source: "1", target: "3", animated: true },
    ],
  };
}