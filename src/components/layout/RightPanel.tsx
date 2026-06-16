// src/components/layout/RightPanel.tsx

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import { useGraph } from "../../context/GraphContext";
import { NodeInspector } from "../inspector/NodeInspector";
import { AppsList } from "./AppList";

export function RightPanel() {
  const selectedNodeId     = useAppStore((s) => s.selectedNodeId);
  const isMobilePanelOpen  = useAppStore((s) => s.isMobilePanelOpen);
  const setMobilePanelOpen = useAppStore((s) => s.setMobilePanelOpen);
  const { nodes, updateNodeData } = useGraph();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Auto-open drawer on mobile whenever a node gets selected
  useEffect(() => {
    if (selectedNodeId && window.matchMedia("(max-width: 767px)").matches) {
      setMobilePanelOpen(true);
    }
  }, [selectedNodeId, setMobilePanelOpen]);

  // Shared panel content (used by both desktop aside and mobile drawer)
  const content = (
    <>
      <div className="border-b p-4">
        <h2 className="text-sm font-semibold">Apps</h2>
        <AppsList />
      </div>

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
              Click on a node to inspect
            </p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop: static sidebar*/}
      <aside className="hidden w-80 flex-col border-l bg-background md:flex">
        {content}
      </aside>

      {/* Mobile: slide-over drawer  */}
      <div className="md:hidden">
        
        <div
          aria-hidden="true"
          onClick={() => setMobilePanelOpen(false)}
          className={cn(
            "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300",
            isMobilePanelOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        />

        {/* Drawer */}
        <aside
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex flex-col border-l bg-background shadow-2xl",
            "w-[min(80vw,20rem)]",                          
            "transition-transform duration-300 ease-in-out",
            isMobilePanelOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer header with close button */}
          <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
            <span className="text-sm font-semibold">Panel</span>
            <button
              onClick={() => setMobilePanelOpen(false)}
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {content}
        </aside>
      </div>
    </>
  );
}