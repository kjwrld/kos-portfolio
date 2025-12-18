import { MindMap } from '../components/MindMap';
import { BottomNav } from '../components/BottomNav';
import { ProjectPage } from '../components/ProjectPage';
import { projects } from '../data/projects';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { animationSequenceConfig } from '../config/ui-defaults';
import { useControls } from 'leva';

type AnimationStage = 'idle' | 'top-nav-morph' | 'zoom' | 'node-details' | 'bottom-nav';

interface CanvasProps {
  onNodeSelectionChange: (hasSelection: boolean) => void;
  animationStage: AnimationStage;
}

export function Canvas({ onNodeSelectionChange, animationStage }: CanvasProps) {
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleOpenProject = (projectId: string) => {
    setCurrentProjectId(projectId);
  };

  const handleCloseProject = () => {
    setCurrentProjectId(null);
  };

  const handleNodeSelectionChangeInternal = (hasSelection: boolean, projectData?: any) => {
    setSelectedProject(projectData);
    onNodeSelectionChange(hasSelection);
  };

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
              onNodeSelectionChange={handleNodeSelectionChangeInternal}
              animationStage={animationStage}
            />
            <BottomNav
              hasSelectedNode={!!selectedProject}
              selectedProject={selectedProject}
              animationStage={animationStage}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
