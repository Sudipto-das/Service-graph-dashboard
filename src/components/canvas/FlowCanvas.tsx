
import { useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useAppStore } from "../../store/useAppStore";
import { useGraph } from "../../context/GraphContext";
import { ServiceNode } from "./ServiceNode";
import { appNodeMapping } from "../../api/MockApi"
import { ErrorOverlay } from "../ui/Error";
import type { Node } from "@xyflow/react";
import type { ServiceNodeData } from "../../types";
import { LoadingOverlay } from "../ui/Loading";
// nodeTypes MUST be defined outside the component
// If defined inside, React creates a new object on every render and ReactFlow
// remounts every node causing a visible flash.
const nodeTypes = { serviceNode: ServiceNode } as const;


export function FlowCanvas() {
  const { nodes, edges, setNodes, setEdges, isLoading, isError, error, refetch } =
    useGraph();

  const setSelectedNodeId = useAppStore((s) => s.setSelectedNodeId);
  const selectedAppId = useAppStore((s) => s.selectedAppId);
  const setRfInstance = useAppStore((s) => s.setRfInstance);
  const rfInstance = useAppStore((s) => s.rfInstance);

  // When app selection changes: clear node selection + re-fit view
  useEffect(() => {
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));

    if (!rfInstance) return;
    const timer = setTimeout(() => {
      rfInstance.fitView({ duration: 400, padding: 0.3 });
    }, 60);
    return () => clearTimeout(timer);
  }, [selectedAppId, rfInstance]); 

  // Derive display nodes: add custom type + apply opacity dimming per app
  const displayNodes = useMemo(() => {
    const relevant = selectedAppId
      ? new Set(appNodeMapping[selectedAppId] ?? [])
      : null;

    return nodes.map((n) => ({
      ...n,
      type: "serviceNode",
      style: {
        ...n.style,
        opacity: relevant ? (relevant.has(n.id) ? 1 : 0.22) : 1,
        transition: "opacity 0.25s ease",
      },
    }));
  }, [nodes, selectedAppId]);

  // Dim edges whose both endpoints are outside the selected app
  const displayEdges = useMemo(() => {
    if (!selectedAppId) return edges;
    const relevant = new Set(appNodeMapping[selectedAppId] ?? []);
    return edges.map((e) => ({
      ...e,
      animated: relevant.has(e.source) && relevant.has(e.target),
      style: {
        ...e.style,
        opacity: relevant.has(e.source) && relevant.has(e.target) ? 1 : 0.08,
      },
    }));
  }, [edges, selectedAppId]);

  // Controlled change handlers — delegate to GraphContext so RightPanel stays synced
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds) as Node<ServiceNodeData>[]);
    },
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => setSelectedNodeId(node.id),
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(
    () => setSelectedNodeId(null),
    [setSelectedNodeId]
  );

  if (isLoading) return <LoadingOverlay />;
  if (isError) return <ErrorOverlay message={error?.message} onRetry={refetch} />;

  return (
    <ReactFlow
      nodes={displayNodes}
      edges={displayEdges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      onInit={setRfInstance}
      fitView
      deleteKeyCode={["Delete", "Backspace"]}
    >
      <Background variant={BackgroundVariant.Dots} gap={14} size={1.5} />
      <Controls />
    </ReactFlow>
  );
}