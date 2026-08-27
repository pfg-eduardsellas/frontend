import dagre from 'dagre';
import { NODE_WIDTH, NODE_HEIGHT } from './constants';

export const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = { ...node };
    newNode.targetPosition = direction === 'LR' ? 'left' : 'top';
    newNode.sourcePosition = direction === 'LR' ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    newNode.position = {
      x: nodeWithPosition.x - NODE_WIDTH / 2,
      y: nodeWithPosition.y - NODE_HEIGHT / 2,
    };

    return newNode;
  });

  return { nodes: layoutedNodes, edges };
};

export const transformGraphData = (graphData) => {
  if (!graphData || !graphData.actions) return { nodes: [], edges: [] };
  // 
  const nodes = graphData.actions.map(action => ({
    id: action.id.toString(),
    type: action.type,
    data: {
      label: action.name || action.value || action.selector || `${action.type} ${action.id}`,
      action: action
    },
    position: { x: 0, y: 0 }
  }));
  // 
  const edges = [];
  graphData.actions.forEach(action => {
    if (action.successors) {
      action.successors.forEach(targetId => {
        edges.push({
          id: `e${action.id}-${targetId}`,
          source: action.id.toString(),
          target: targetId.toString(),
          animated: false,
          style: { stroke: '#000000ff' }
        });
      });
    }
  });
  // 
  return { nodes, edges };
};

