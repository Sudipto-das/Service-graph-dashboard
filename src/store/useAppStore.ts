import { create } from 'zustand'
import type { ReactFlowInstance } from '@xyflow/react'


interface AppState {
    //state
    selectedAppId: string | null;
    selectedNodeId: string | null;
    isMobilePanelOpen: boolean;
    activeInspectorTab: "config" | "runtime";
    rfInstance: ReactFlowInstance | null;

    // Actions
    setSelectedAppId: (appId: string | null) => void;
    setSelectedNodeId: (nodeId: string | null) => void;
    setMobilePanelOpen: (open: boolean) => void;
    setActiveInspectorTab: (tab: "config" | "runtime") => void;
    setRfInstance: (instance: ReactFlowInstance | null) => void;
}


export const useAppStore = create<AppState>((set) => ({
    // Initial state
    selectedAppId: null,
    selectedNodeId: null,
    isMobilePanelOpen: false,
    activeInspectorTab: "config",
    rfInstance: null,

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
}));