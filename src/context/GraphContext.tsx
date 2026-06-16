import { createContext, useContext, useCallback, useState, type ReactNode, useEffect } from "react";
import type { Node, Edge } from "@xyflow/react";
import type { ServiceNodeData } from "../types/index";
import { useGraphQuery } from "../hooks/useGraphQuery";



interface GraphContextType {
    nodes: Node<ServiceNodeData>[];
    edges: Edge[];
    setNodes: React.Dispatch<React.SetStateAction<Node<ServiceNodeData>[]>>;
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
    updateNodeData: (nodeId: string, data: Partial<ServiceNodeData>) => void;
    addNode: () => string;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () => void;
}

const GraphContext = createContext<GraphContextType | null>(null);

export function GraphProvider({ children }: { children: ReactNode }) {

    const { data, isPending, isError, error, refetch } = useGraphQuery()
    const [nodes, setNodes] = useState<Node<ServiceNodeData>[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);


    useEffect(() => {
        if (data && nodes.length === 0) {
            setNodes(data.nodes);
            setEdges(data.edges);
        }
    }, [data]);
    const updateNodeData = useCallback((nodeId: string, newData: Partial<ServiceNodeData>) => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
            )
        );
    }, []);

    const addNode = useCallback(() => {
        const id = crypto.randomUUID();
        const newNode: Node<ServiceNodeData> = {
            id,
            position: { x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 },
            data: { label: "New Service", status: "healthy", cpuLimit: 50 },
        };
        setNodes((nds) => [...nds, newNode]);
        return id;
    }, []);

    return (
        <GraphContext.Provider value={{
            nodes,
            edges,
            setNodes,
            setEdges,
            updateNodeData,
            addNode,
            isLoading: isPending,
            isError,
            error: error as Error | null,
            refetch,
        }}>
            {children}
        </GraphContext.Provider>
    );
}

export function useGraph() {
    const context = useContext(GraphContext);
    if (!context) throw new Error("useGraph must be used within GraphProvider");
    return context;
}
