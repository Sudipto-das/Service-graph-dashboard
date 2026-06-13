import { Button } from "../ui/button";

export function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 rounded bg-primary" />
        <span className="font-semibold">ServiceGraph</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">Share</Button>
        <Button size="sm">Deploy</Button>
      </div>
    </header>
  );
}
