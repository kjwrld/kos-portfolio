import { MindMap } from './components/MindMap';
import { CustomCursor } from './components/CustomCursor';
import { ProjectPage } from './components/ProjectPage';
import { TopNav } from './components/TopNav';
import { BottomNav } from './components/BottomNav';
import { projects } from './data/projects';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { animationSequenceConfig } from './config/ui-defaults';
import { useControls } from 'leva';

type AnimationStage = 'idle' | 'top-nav-morph' | 'zoom' | 'node-details' | 'bottom-nav';

export default function App() {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [hasSelectedNode, setHasSelectedNode] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [animationStage, setAnimationStage] = useState<AnimationStage>('idle');
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Animation Sequence Controls
  const sequenceConfig = useControls('Animation Sequence', {
    stage1Delay: { 
      value: animationSequenceConfig.stage1Delay, 
      min: 0, 
      max: 1000, 
      step: 50, 
      label: 'Stage 1: Nav Morph Delay (ms)' 
    },
    stage2Delay: { 
      value: animationSequenceConfig.stage2Delay, 
      min: 0, 
      max: 2000, 
      step: 50, 
      label: 'Stage 2: Zoom Delay (ms)' 
    },
    stage3Delay: { 
      value: animationSequenceConfig.stage3Delay, 
      min: 0, 
      max: 3000, 
      step: 50, 
      label: 'Stage 3: Node Details Delay (ms)' 
    },
    stage4Delay: { 
      value: animationSequenceConfig.stage4Delay, 
      min: 0, 
      max: 4000, 
      step: 50, 
      label: 'Stage 4: Bottom Nav Delay (ms)' 
    },
  }, { collapsed: true });

  const handleOpenProject = (projectId: string) => {
    setCurrentProjectId(projectId);
  };

  const handleCloseProject = () => {
    setCurrentProjectId(null);
  };

  const handleNodeSelectionChange = (hasSelection: boolean, projectData?: any) => {
    setHasSelectedNode(hasSelection);
    setSelectedProject(projectData);
  };

  // Animation sequence orchestrator
  useEffect(() => {
    // Clear any existing timeouts
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];

    if (hasSelectedNode) {
      // Stage 1: Top Nav Morph (immediate)
      setAnimationStage('top-nav-morph');
      
      // Stage 2: Zoom
      const stage2Timeout = setTimeout(() => {
        setAnimationStage('zoom');
      }, sequenceConfig.stage2Delay);
      timeoutRefs.current.push(stage2Timeout);
      
      // Stage 3: Node Details (radial buttons + inspiration images)
      const stage3Timeout = setTimeout(() => {
        setAnimationStage('node-details');
      }, sequenceConfig.stage3Delay);
      timeoutRefs.current.push(stage3Timeout);
      
      // Stage 4: Bottom Nav
      const stage4Timeout = setTimeout(() => {
        setAnimationStage('bottom-nav');
      }, sequenceConfig.stage4Delay);
      timeoutRefs.current.push(stage4Timeout);
    } else {
      // Reset to idle when node is deselected
      setAnimationStage('idle');
    }

    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      timeoutRefs.current = [];
    };
  }, [hasSelectedNode, sequenceConfig.stage2Delay, sequenceConfig.stage3Delay, sequenceConfig.stage4Delay]);

  const currentProject = currentProjectId ? projects[currentProjectId] : null;

  return (
    <div className="w-full h-screen">
      <AnimatePresence mode="wait">
        {currentProject ? (
          <ProjectPage
            key="project"
            project={currentProject}
            onClose={handleCloseProject}
          />
        ) : (
          <>
            <MindMap 
              key="mindmap" 
              onOpenProject={handleOpenProject} 
              onNodeSelectionChange={handleNodeSelectionChange}
              animationStage={animationStage}
            />
            <TopNav hasSelectedNode={hasSelectedNode} animationStage={animationStage} />
            <BottomNav 
              hasSelectedNode={hasSelectedNode} 
              selectedProject={selectedProject}
              animationStage={animationStage}
            />
          </>
        )}
      </AnimatePresence>
      <CustomCursor />
    </div>
  );
}