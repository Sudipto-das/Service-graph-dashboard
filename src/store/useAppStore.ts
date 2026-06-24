import { create } from 'zustand'
import type { ReactFlowInstance } from '@xyflow/react'


interface AppState {
    //state
    selectedAppId: string | null;
    selectedNodeId: string | null;
    isMobilePanelOpen: boolean;
    activeInspectorTab: "config" | "runtime";
    rfInstance: ReactFlowInstance | null;
    theme: "light" | "dark";

    // Actions
    setSelectedAppId: (appId: string | null) => void;
    setSelectedNodeId: (nodeId: string | null) => void;
    setMobilePanelOpen: (open: boolean) => void;
    setActiveInspectorTab: (tab: "config" | "runtime") => void;
    setRfInstance: (instance: ReactFlowInstance | null) => void;
    toggleTheme: () => void;
}


export const useAppStore = create<AppState>((set, get) => ({
    // Initial state
    selectedAppId: null,
    selectedNodeId: null,
    isMobilePanelOpen: false,
    activeInspectorTab: "config",
    rfInstance: null,
    theme: (localStorage.getItem("theme") as "light" | "dark") || "light",

    //Actions 
    setSelectedAppId(appId) {
        set({ selectedAppId: appId, selectedNodeId: null }) 
    },
    setSelectedNodeId(nodeId) {
        set({ selectedNodeId: nodeId })
    },
    setMobilePanelOpen(open) {
        set({ isMobilePanelOpen: open })
    },
    setActiveInspectorTab(tab) {
        set({ activeInspectorTab: tab })
    },
    setRfInstance(instance) {
        set({ rfInstance: instance })
    },
    toggleTheme() {
        const next = get().theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
        set({ theme: next });
    },
}));