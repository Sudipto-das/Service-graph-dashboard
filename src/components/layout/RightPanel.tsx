import { useAppStore } from "../../store/useAppStore";

export function RightPanel() {

  const selectedNodeId = useAppStore((state)=>state.selectedNodeId)
  return (
    <aside className="hidden w-80 flex-col border-l bg-background md:flex">
      <div className="border-b p-4">
        <h2 className="text-sm font-semibold">Apps</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Apps list yahan aayegi (Step 6)
        </p>
      </div>
      {/* Node Inspector Section */}
      <div className="flex-1 overflow-auto p-4">
        <h2 className="text-sm font-semibold">Node Inspector</h2>

        {selectedNodeId ? (
          <div className="mt-4 rounded-lg border bg-muted/50 p-4">
            <p className="text-sm">
              Selected Node: <strong>{selectedNodeId}</strong>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Full inspector Step 5 mein banayenge
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Koi node select karo canvas pe
          </p>
        )}
      </div>
    </aside>
  );
}
