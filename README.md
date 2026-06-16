# Service Graph Dashboard

An interactive microservice dependency graph visualization built with React, TypeScript, and React Flow.

## Setup

```bash
npm install
npm run dev
```

Build & preview:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## Key Decisions

- **Zustand** for global UI state (selected app/node, panel open/close)
- **React Context** (`GraphContext`) for graph data lifecycle (fetch, mutate, add nodes)
- **TanStack Query** for data fetching with retry/demo error simulation
- **React Flow (`@xyflow/react`)** for canvas rendering with custom `serviceNode` type
- **Tailwind CSS v4** + **shadcn/ui** (Radix) for styling
- Mock API with artificial delays; first graph fetch intentionally fails to demo retry

## Known Limitations

- All data is mocked — no real backend integration
- Node positions are not persisted (refresh resets layout)
- `addNode` places nodes at random positions; no drag-to-add from sidebar
- No undo/redo support
- No edge labels or connection validation
- Mobile panel relies on CSS transitions; no gesture-based swipe dismiss
- `appNodeMapping` is static — apps are hard-coded, not dynamic
- CPU slider and config edits are local-only (not sent anywhere)
