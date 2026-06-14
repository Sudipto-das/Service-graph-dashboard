import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./button";

export function ErrorOverlay({
  message,
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
      <AlertTriangle className="h-8 w-8 text-destructive" />
      <div>
        <p className="font-medium text-destructive">Something went worng ...</p>
        {message && (
          <p className="mt-1 text-xs text-muted-foreground">{message}</p>
        )}
      </div>
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Retry
      </Button>
    </div>
  );
}