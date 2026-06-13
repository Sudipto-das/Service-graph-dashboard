import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useAppStore } from "../../store/useAppStore";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "API Gateway" },
  },
  {
    id: "2",
    position: { x: -200, y: 150 },
    data: { label: "Auth Service" },
  },
  {
    id: "3",
    position: { x: 200, y: 150 },
    data: { label: "Database" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
];

export function FlowCanvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const setSelectedNodeId = useAppStore((state) => state.setSelectedNodeId)

  // Bonus: nodes ke handles ko drag karke naye edges bana sakte ho
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Node click → store mein save
  const onNodeClick: NodeMouseHandler = useCallback(
    (_, node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  // Canvas click (empty area) → deselect
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      fitView
      deleteKeyCode={["Delete", "Backspace"]}

    >
      <Background variant={BackgroundVariant.Dots} gap={16} size={1.5} />
      <Controls />
    </ReactFlow>
  );
}
