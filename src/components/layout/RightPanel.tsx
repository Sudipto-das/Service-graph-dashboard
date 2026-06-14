

import { useAppStore } from "../../store/useAppStore";
import { useGraph } from "../../context/GraphContext";
import { NodeInspector } from "../inspector/NodeInspector";
import { AppsList } from "./AppList";



export function RightPanel() {
  const selectedNodeId = useAppStore((s) => s.selectedNodeId);
  const { nodes, updateNodeData } = useGraph();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <aside className="hidden w-80 flex-col border-l bg-background md:flex">
      {/* ── Apps section ── */}
      <div className="border-b p-4">
        <h2 className="text-sm font-semibold">Apps</h2>
        <AppsList />
      </div>

      {/* ── Node inspector section ── */}
      <div className="flex-1 overflow-auto p-4">
        {selectedNode ? (
          <NodeInspector
            nodeId={selectedNode.id}
            data={selectedNode.data}
            onDataChange={updateNodeData}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">
              Click on canvas
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}