import { useCallback, useEffect, useState, useRef } from 'react';
import ReactFlow, { 
  Background, 
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'motion/react';
import { CentralNode } from './CentralNode';
import { PlaceholderNode } from './PlaceholderNode';
import { mobileZoomConfig, tabletZoomConfig, desktopZoomConfig, breakpoints } from '../config/ui-defaults';
import { nodeToProjectMap, projects } from '../data/projects';
import { useControls } from 'leva';

interface MindMapProps {
  onOpenProject: (projectId: string) => void;
  onNodeSelectionChange?: (hasSelection: boolean, selectedProject?: any) => void;
  animationStage?: 'idle' | 'top-nav-morph' | 'zoom' | 'node-details' | 'bottom-nav';
}

const nodeTypes = {
  central: CentralNode,
  placeholder: PlaceholderNode,
};

const initialNodes: Node[] = [
  {
    id: 'center',
    type: 'central',
    position: { x: 0, y: 0 },
    data: { label: 'Your Insignia' },
    draggable: false,
  },
  {
    id: 'node-1',
    type: 'placeholder',
    position: { x: -200, y: -320 },
    data: {
      label: 'Realtime Cloth Simulation',
      image: 'https://media.giphy.com/media/PDQ6NsLKs4fzP6Wlsr/giphy.gif',
      onOpenProject: null, // Will be set in MindMapContent
    },
    draggable: false,
  },
  {
    id: 'node-2',
    type: 'placeholder',
    position: { x: 280, y: -320 },
    data: {
      label: 'VFX Simulation',
      image:
        'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN29yNW1mdXoxeHRwOThqdHIzcnVxOWxwZTU5eGQyMnI2Y215czlqbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ai5ILWpr0FLtOIbNck/giphy.gif',
      onOpenProject: null,
    },
    draggable: false,
  },
  {
    id: 'node-3',
    type: 'placeholder',
    position: { x: -200, y: 340 },
    data: {
      label: 'Portrait (Photoshop)',
      image: 'https://media.giphy.com/media/slyjIbhzkglAdw1XBS/giphy.gif',
      onOpenProject: null,
    },
    draggable: false,
  },
  {
    id: 'node-4',
    type: 'placeholder',
    position: { x: 280, y: 340 },
    data: {
      label: 'Character Customization',
      image: 'https://media.giphy.com/media/F5ZhmsD5TksSd7KN5z/giphy.gif',
      onOpenProject: null,
    },
    draggable: false,
  },
  {
    id: 'node-5',
    type: 'placeholder',
    position: { x: -480, y: 0 },
    data: {
      label: '2D Aesprite Game',
      image: 'https://media.giphy.com/media/p6WFcuoGbFLxTr3IE4/giphy.gif',
      onOpenProject: null,
    },
    draggable: false,
  },
  {
    id: 'node-6',
    type: 'placeholder',
    position: { x: 560, y: 0 },
    data: {
      label: 'Zero Gravity Gaming Chair',
      image: 'https://media.giphy.com/media/3yrUAHscGZohHZjCxd/giphy.gif',
      onOpenProject: null,
    },
    draggable: false,
  },
];

const initialEdges: Edge[] = [];

function MindMapContent({ onOpenProject, onNodeSelectionChange, animationStage = 'idle' }: MindMapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { setCenter, fitView, setViewport, getViewport } = useReactFlow();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const lastTapRef = useRef(0);
  const previousViewportRef = useRef<{ x: number; y: number; zoom: number } | null>(null);

  // Node Selection Zoom Controls
  const mobileZoom = useControls('Mobile Node Zoom', {
    enabled: { value: mobileZoomConfig.enabled, label: 'Enable Zoom' },
    zoomLevel: { value: 0.9, min: 0.5, max: 3, step: 0.1, label: 'Zoom Level' },
    offsetY: { value: 160, min: -300, max: 500, step: 10, label: 'Offset Y' },
    duration: { value: mobileZoomConfig.duration, min: 100, max: 1000, step: 50, label: 'Duration (ms)' },
  });

  const tabletZoom = useControls('Tablet Node Zoom', {
    enabled: { value: tabletZoomConfig.enabled, label: 'Enable Zoom' },
    zoomLevel: { value: 1.5, min: 0.5, max: 3, step: 0.1, label: 'Zoom Level' },
    offsetY: { value: 180, min: -200, max: 200, step: 10, label: 'Offset Y' },
    duration: { value: tabletZoomConfig.duration, min: 100, max: 1000, step: 50, label: 'Duration (ms)' },
  });

  const desktopZoom = useControls('Desktop Node Zoom', {
    enabled: { value: desktopZoomConfig.enabled, label: 'Enable Zoom' },
    zoomLevel: { value: 1.5, min: 0.5, max: 3, step: 0.1, label: 'Zoom Level' },
    offsetY: { value: 160, min: -200, max: 200, step: 10, label: 'Offset Y' },
    duration: { value: desktopZoomConfig.duration, min: 100, max: 1000, step: 50, label: 'Duration (ms)' },
  });

  // Inject onOpenProject into node data
  useEffect(() => {
    const handleDeselectNode = () => {
      // Deselect all nodes except center
      setNodes((nds) =>
        nds.map((node) => ({
          ...node,
          selected: false,
        }))
      );
    };

    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, onOpenProject, onDeselectNode: handleDeselectNode, animationStage },
      }))
    );
  }, [onOpenProject, setNodes, animationStage]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoints.mobile);
      setIsTablet(window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Notify parent when node selection changes
  useEffect(() => {
    const selectedNode = nodes.find(node => node.selected && node.id !== 'center');
    const hasSelection = !!selectedNode;
    
    // Get the actual project data from projects object using nodeToProjectMap
    let selectedProjectData = null;
    if (selectedNode) {
      const projectId = nodeToProjectMap[selectedNode.id];
      selectedProjectData = projectId ? projects[projectId] : null;
    }
    
    onNodeSelectionChange?.(hasSelection, selectedProjectData);
  }, [nodes, onNodeSelectionChange]);

  // Handle node selection for mobile zoom - only zoom when animation stage is 'zoom' or later
  useEffect(() => {
    if (!mobileZoom.enabled || !isMobile) return;
    if (animationStage !== 'zoom' && animationStage !== 'node-details' && animationStage !== 'bottom-nav') return;

    const selectedNode = nodes.find(node => node.selected);
    
    if (selectedNode) {
      // Zoom to selected node
      const x = selectedNode.position.x + (selectedNode.width || 240) / 2 + mobileZoomConfig.offsetX;
      const y = selectedNode.position.y + (selectedNode.height || 180) / 2 + mobileZoom.offsetY;
      
      setCenter(x, y, { 
        zoom: mobileZoom.zoomLevel, 
        duration: mobileZoom.duration 
      });
    }
  }, [nodes, mobileZoom.enabled, mobileZoom.zoomLevel, mobileZoom.duration, mobileZoom.offsetY, isMobile, setCenter, animationStage]);

  // Handle node selection for tablet zoom - only zoom when animation stage is 'zoom' or later
  useEffect(() => {
    if (!tabletZoom.enabled || !isTablet) return;
    if (animationStage !== 'zoom' && animationStage !== 'node-details' && animationStage !== 'bottom-nav') return;

    const selectedNode = nodes.find(node => node.selected);
    
    if (selectedNode) {
      // Zoom to selected node
      const x = selectedNode.position.x + (selectedNode.width || 240) / 2 + tabletZoomConfig.offsetX;
      const y = selectedNode.position.y + (selectedNode.height || 180) / 2 + tabletZoom.offsetY;
      
      setCenter(x, y, { 
        zoom: tabletZoom.zoomLevel, 
        duration: tabletZoom.duration 
      });
    }
  }, [nodes, tabletZoom.enabled, tabletZoom.zoomLevel, tabletZoom.duration, tabletZoom.offsetY, isTablet, setCenter, animationStage]);

  // Handle node selection for desktop zoom - only zoom when animation stage is 'zoom' or later
  useEffect(() => {
    if (!desktopZoom.enabled || isMobile || isTablet) return;
    if (animationStage !== 'zoom' && animationStage !== 'node-details' && animationStage !== 'bottom-nav') return;

    const selectedNode = nodes.find(node => node.selected);
    
    if (selectedNode) {
      // Save current viewport before zooming
      if (!previousViewportRef.current) {
        const viewport = getViewport();
        previousViewportRef.current = viewport;
      }
      
      // Recenter to selected node with subtle zoom
      const x = selectedNode.position.x + (selectedNode.width || 240) / 2 + desktopZoomConfig.offsetX;
      const y = selectedNode.position.y + (selectedNode.height || 180) / 2 + desktopZoom.offsetY;
      
      setCenter(x, y, { 
        zoom: desktopZoom.zoomLevel, 
        duration: desktopZoom.duration 
      });
    } else if (previousViewportRef.current && animationStage === 'idle') {
      // No node selected - restore previous viewport exactly
      const viewport = previousViewportRef.current;
      setViewport(viewport, { duration: desktopZoom.duration });
      previousViewportRef.current = null;
    }
  }, [nodes, desktopZoom.enabled, desktopZoom.zoomLevel, desktopZoom.duration, desktopZoom.offsetY, isMobile, isTablet, setCenter, setViewport, getViewport, animationStage]);

  // Handle double-tap on empty space to reset view on mobile
  const handlePaneClick = useCallback((event: React.MouseEvent) => {
    if (!isMobile || !mobileZoom.enabled) return;

    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double tap detected - reset to initial view
      event.preventDefault();
      fitView({ 
        padding: 0.2, 
        duration: mobileZoom.duration 
      });
    }
    
    lastTapRef.current = now;
  }, [isMobile, mobileZoom.enabled, mobileZoom.duration, fitView]);

  // Add touch event handler for better mobile detection
  useEffect(() => {
    if (!isMobile || !mobileZoom.enabled) return;

    const handleTouch = (event: TouchEvent) => {
      // Only handle touches on the pane (not on nodes or controls)
      const target = event.target as HTMLElement;
      if (target.closest('.react-flow__node') || target.closest('.react-flow__controls')) {
        return;
      }

      const now = Date.now();
      const timeSinceLastTap = now - lastTapRef.current;
      
      if (timeSinceLastTap < 400 && timeSinceLastTap > 0) {
        // Double tap detected - reset to initial view
        event.preventDefault();
        fitView({ 
          padding: 0.2, 
          duration: mobileZoom.duration 
        });
        lastTapRef.current = 0; // Reset to prevent triple-tap issues
      } else {
        lastTapRef.current = now;
      }
    };

    const reactFlowPane = document.querySelector('.react-flow__pane');
    if (reactFlowPane) {
      reactFlowPane.addEventListener('touchend', handleTouch);
      return () => reactFlowPane.removeEventListener('touchend', handleTouch);
    }
  }, [isMobile, mobileZoom.enabled, mobileZoom.duration, fitView]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Check if any node (except center) is selected
  const hasSelectedNode = nodes.some(node => node.selected && node.id !== 'center');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        style={{ backgroundColor: '#f9fafb' }}
        onPaneClick={handlePaneClick}
        zoomOnDoubleClick={false}
        panOnScroll={!hasSelectedNode}
        panOnDrag={!hasSelectedNode}
        zoomOnScroll={!hasSelectedNode}
        zoomOnPinch={!hasSelectedNode}
      >
        <Controls />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={12} 
          size={1} 
          color="#d1d5db"
        />
        {/* <MiniMap 
          className="!top-6 !right-6 md:!top-4 md:!right-4 shadow-lg !rounded-lg"
          style={{ 
            width: 120, 
            height: 80
          }}
        /> */}
      </ReactFlow>
    </motion.div>
  );
}

export function MindMap({ onOpenProject, onNodeSelectionChange, animationStage }: MindMapProps) {
  return (
    <ReactFlowProvider>
      <MindMapContent 
        onOpenProject={onOpenProject} 
        onNodeSelectionChange={onNodeSelectionChange}
        animationStage={animationStage}
      />
    </ReactFlowProvider>
  );
}