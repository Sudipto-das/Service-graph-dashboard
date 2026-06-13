import { Gem, Database, Leaf, Box, LayoutGrid, Share2 } from "lucide-react";
import { cn } from "../../lib/utils";

type NavItem = {
  icon: React.ElementType;
  label: string;
  iconClass: string;
  shape?: "circle" | "rounded";
};

const navItems: NavItem[] = [
  
  {
    icon: Gem,
    label: "Pipelines",
    iconClass: "bg-violet-600 text-white",
  },
  {
    icon: Database,
    label: "Redis",
    iconClass: "bg-red-600 text-white",
  },
  {
    icon: Leaf,
    label: "MongoDB",
    iconClass: "bg-emerald-950 text-emerald-400",
  },
  {
    icon: Box,
    label: "Containers",
    iconClass: "bg-sky-500 text-white",
  },
  {
    icon: LayoutGrid,
    label: "Dashboard",
    iconClass: "bg-slate-700 text-slate-300",
  },
  {
    icon: Share2,
    label: "Network Graph",
    iconClass: "bg-slate-700 text-slate-300",
  },
];

export function LeftRail() {
  return (
    <nav className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3 rounded-xl border border-border bg-background/90 p-2 shadow-lg backdrop-blur">
      {navItems.map(({ icon: Icon, label, iconClass, shape }) => (
        <button
          key={label}
          title={label}
          className={cn(
            "flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-75 cursor-pointer",
            shape === "circle" ? "rounded-full" : "rounded-lg",
            iconClass
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </nav>
  );
}
