
import { PanelRight, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useAppStore } from "../../store/useAppStore";
import { useGraph } from "../../context/GraphContext";

export function TopBar() {
  const isMobilePanelOpen  = useAppStore((s) => s.isMobilePanelOpen);
  const setMobilePanelOpen = useAppStore((s) => s.setMobilePanelOpen);
  const setSelectedNodeId  = useAppStore((s) => s.setSelectedNodeId);
  const rfInstance = useAppStore((s) => s.rfInstance);
  const { addNode } = useGraph();

  const handleAddNode = () => {
    const id = addNode();
    setSelectedNodeId(id);
    setTimeout(() => {
      rfInstance?.fitView({ duration: 400, padding: 0.3 });
    }, 50);
  };

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-primary" />
        <span className="font-semibold">ServiceGraph</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Panel toggle — only visible on small screens */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle panel"
          onClick={() => setMobilePanelOpen(!isMobilePanelOpen)}
        >
          <PanelRight className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="sm" onClick={handleAddNode}>
          <Plus className="mr-1 h-4 w-4" />
          Add Node
        </Button>
        <Button variant="outline" size="sm">Share</Button>
        <Button size="sm">Deploy</Button>
      </div>
    </header>
  );
}