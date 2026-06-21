import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NODE_TYPES } from "./constants";
import { getLayoutedElements, transformGraphData } from "./adapters";
import { GraphContainer } from "./styles";
import { useGetScanActionsQuery } from "../../../api";

const EMPTY_PATH = [];
const EMPTY_SET = new Set();

const GraphLayout = ({
  scanId,
  status,
  testPathMode = false,
  selectedPath = EMPTY_PATH,
  onNodeToggle,
}) => {
  const isRunning = status === "running" || status === "pending";
  const { fitView } = useReactFlow();
  const [baseNodes, setBaseNodes] = useNodesState([]);
  const [baseEdges, setBaseEdges] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const fittedRef = useRef(false);

  const { data, isLoading, isError, error } = useGetScanActionsQuery(scanId, {
    skip: !scanId,
  });

  // Layout graph whenever actions data changes
  useEffect(() => {
    fittedRef.current = false;
    if (!scanId || !data) {
      setBaseNodes([]);
      setBaseEdges([]);
      return;
    }
    const { nodes: n, edges: e } = transformGraphData(data);
    const { nodes: ln, edges: le } = getLayoutedElements(n, e);
    setBaseNodes(ln);
    setBaseEdges(le);
  }, [scanId, data]);

  // Map: nodeId → [parentId, ...] (direct predecessors)
  const predecessorMap = useMemo(() => {
    const map = {};
    baseEdges.forEach((e) => {
      if (!map[e.target]) map[e.target] = [];
      map[e.target].push(e.source);
    });
    return map;
  }, [baseEdges]);

  // Compute which nodes can be checked next in test-path mode
  const selectableSet = useMemo(() => {
    if (!testPathMode || baseNodes.length === 0) return EMPTY_SET;
    const selectedSet = new Set(selectedPath);
    const result = new Set();

    baseNodes.forEach((n) => {
      if (selectedSet.has(n.id)) return;

      const type = n.data?.action?.type;

      if (selectedPath.length === 0) {
        if (type === "URL") result.add(n.id);
        return;
      }

      const visited = new Set();
      const queue = [...(predecessorMap[n.id] || [])];
      while (queue.length > 0) {
        const curr = queue.shift();
        if (visited.has(curr)) continue;
        visited.add(curr);
        if (selectedSet.has(curr)) {
          result.add(n.id);
          break;
        }
        (predecessorMap[curr] || []).forEach((p) => queue.push(p));
      }
    });

    return result;
  }, [testPathMode, selectedPath, baseNodes, predecessorMap]);

  // Merge testPath overlay data into display nodes
  useEffect(() => {
    if (baseNodes.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const selectedSet = new Set(selectedPath);
    setNodes(
      baseNodes.map((n) => ({
        ...n,
        data: {
          ...n.data,
          testPathMode,
          isSelected: selectedSet.has(n.id),
          isSelectable: selectableSet.has(n.id),
          onToggle: () => onNodeToggle?.(n.id),
        },
      })),
    );
    setEdges(baseEdges);

    if (!fittedRef.current) {
      fittedRef.current = true;
      window.requestAnimationFrame(() => fitView());
    }
  }, [
    baseNodes,
    baseEdges,
    testPathMode,
    selectedPath,
    selectableSet,
    onNodeToggle,
  ]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <GraphContainer>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.8)",
            zIndex: 10,
            borderRadius: "8px",
          }}
        >
          <span style={{ fontSize: "1rem", color: "#555" }}>
            Loading graph…
          </span>
        </div>
      )}
      {isError && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.9)",
            zIndex: 10,
            borderRadius: "8px",
          }}
        >
          <span style={{ color: "#c0392b", fontSize: "0.9rem" }}>
            ⚠ {error?.error ?? `Error ${error?.status}`}
          </span>
        </div>
      )}
      {isRunning && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            zIndex: 5,
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              border: "3px solid #d1d5db",
              borderTopColor: "#555",
              borderRadius: "50%",
              animation: "graph-spin 0.8s linear infinite",
            }}
          />
          <span style={{ color: "#555", fontSize: "1rem" }}>
            Scan running… the graph will appear when it finishes
          </span>
          <style>{`@keyframes graph-spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
      {!scanId && !isRunning && !isLoading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 5,
          }}
        >
          <span style={{ color: "#aaa", fontSize: "1rem" }}>
            Select or start a scan to view the graph
          </span>
        </div>
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView={true}
        nodeTypes={NODE_TYPES}
        minZoom={0.1}
        zoomOnScroll={false}
        zoomOnPinch={true}
        panOnScroll={false}
        preventScrolling={false}
      >
        <Controls position="top-right" />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </GraphContainer>
  );
};

export default function GraphViewer({
  scanId,
  status,
  testPathMode,
  selectedPath,
  onNodeToggle,
}) {
  return (
    <ReactFlowProvider>
      <GraphLayout
        scanId={scanId}
        status={status}
        testPathMode={testPathMode}
        selectedPath={selectedPath}
        onNodeToggle={onNodeToggle}
      />
    </ReactFlowProvider>
  );
}
