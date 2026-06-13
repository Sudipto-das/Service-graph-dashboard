import { TopBar } from "./components/layout/TobBar";
import { LeftRail } from "./components/layout/LeftRail";
import { RightPanel } from "./components/layout/RightPanel";
import { FlowCanvas } from "./components/canvas/FlowCanvas";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className=" relative flex flex-1 overflow-hidden">
        <LeftRail />
        <main className="flex-1 bg-muted/30">
          <FlowCanvas />
        </main>
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
