// ─── Overlays ─────────────────────────────────────────────────────────────────

import { Loader2 } from "lucide-react";

export function LoadingOverlay() {
  return (
    <div className="flex h-full items-center justify-center gap-3 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="text-sm">Loading…</span>
    </div>
  );
}