import { create } from 'zustand'


interface AppState {
    //state
    selectedAppId: string | null;
    selectedNodeId: string | null;
    isMobilePanelOpen: boolean;
    activeInspectorTab: "config" | "runtime";

    // Actions
    setSelectedAppId: (appId: string | null) => void;
    setSelectedNodeId: (nodeId: string | null) => void;
    setMobilePanelOpen: (open: boolean) => void;
    setActiveInspectorTab: (tab: "config" | "runtime") => void;
}


export const useAppStore = create<AppState>((set) => ({
    // Initial state
    selectedAppId: null,
    selectedNodeId: null,
    isMobilePanelOpen: false,
    activeInspectorTab: "config",

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
}));