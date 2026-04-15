import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, addEdge, useReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NODE_TYPES } from './constants';
import { getLayoutedElements, transformGraphData } from './adapters';
import { GraphContainer } from './styles';

const GraphLayout = ({ scanId, testPathMode = false, selectedPath = [], onNodeToggle }) => {
    const { fitView } = useReactFlow();
    const [baseNodes, setBaseNodes] = useState([]);
    const [baseEdges, setBaseEdges] = useState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fittedRef = useRef(false);

    // Load graph data
    useEffect(() => {
        fittedRef.current = false;
        if (!scanId) {
            setBaseNodes([]);
            setBaseEdges([]);
            return;
        }

        const loadGraph = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/scans/${scanId}/actions`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
                const data = await res.json();

                const { nodes: n, edges: e } = transformGraphData(data);
                const { nodes: ln, edges: le } = getLayoutedElements(n, e);
                setBaseNodes(ln);
                setBaseEdges(le);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadGraph();
    }, [scanId]);

    // Map: nodeId → [parentId, ...] (direct predecessors)
    const predecessorMap = useMemo(() => {
        const map = {};
        baseEdges.forEach(e => {
            if (!map[e.target]) map[e.target] = [];
            map[e.target].push(e.source);
        });
        return map;
    }, [baseEdges]);

    // Compute which nodes can be checked next
    const selectableSet = useMemo(() => {
        if (!testPathMode || baseNodes.length === 0) return new Set();
        const selectedSet = new Set(selectedPath);
        const result = new Set();

        baseNodes.forEach(n => {
            if (selectedSet.has(n.id)) return; // already selected

            const type = n.data?.action?.type;

            // Rule 1: URL node when nothing is selected yet
            if (selectedPath.length === 0) {
                if (type === 'URL') result.add(n.id);
                return;
            }

            // Rule 2: any ancestor is selected (BFS backwards)
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
                (predecessorMap[curr] || []).forEach(p => queue.push(p));
            }
        });

        return result;
    }, [testPathMode, selectedPath, baseNodes, predecessorMap]);

    // Merge testPath data into display nodes
    useEffect(() => {
        if (baseNodes.length === 0) {
            setNodes([]);
            setEdges([]);
            return;
        }

        const selectedSet = new Set(selectedPath);
        setNodes(baseNodes.map(n => ({
            ...n,
            data: {
                ...n.data,
                testPathMode,
                isSelected: selectedSet.has(n.id),
                isSelectable: selectableSet.has(n.id),
                onToggle: () => onNodeToggle?.(n.id),
            }
        })));
        setEdges(baseEdges);

        if (!fittedRef.current) {
            fittedRef.current = true;
            window.requestAnimationFrame(() => fitView());
        }
    }, [baseNodes, baseEdges, testPathMode, selectedPath, selectableSet, onNodeToggle, setNodes, setEdges, fitView]);

    const onConnect = useCallback(
        (params) => setEdges(eds => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <GraphContainer>
            {loading && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.8)', zIndex: 10, borderRadius: '8px',
                }}>
                    <span style={{ fontSize: '1rem', color: '#555' }}>Loading graph…</span>
                </div>
            )}
            {error && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.9)', zIndex: 10, borderRadius: '8px',
                }}>
                    <span style={{ color: '#c0392b', fontSize: '0.9rem' }}>⚠ {error}</span>
                </div>
            )}
            {!scanId && !loading && (
                <div style={{
                    position: 'absolute', inset: 0, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 5,
                }}>
                    <span style={{ color: '#aaa', fontSize: '1rem' }}>
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
                fitView
                nodeTypes={NODE_TYPES}
            >
                <Controls position='top-right' />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </GraphContainer>
    );
};

export default function GraphViewer({ scanId, testPathMode, selectedPath, onNodeToggle }) {
    return (
        <ReactFlowProvider>
            <GraphLayout
                scanId={scanId}
                testPathMode={testPathMode}
                selectedPath={selectedPath}
                onNodeToggle={onNodeToggle}
            />
        </ReactFlowProvider>
    );
}
