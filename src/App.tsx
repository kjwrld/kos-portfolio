import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { TopNav } from './components/TopNav';
import { Home } from './pages/Home';
import { Canvas } from './pages/Canvas';
import { CV } from './pages/CV';
import { Contact } from './pages/Contact';
import { useState, useEffect, useRef } from 'react';
import { animationSequenceConfig } from './config/ui-defaults';
import { useControls } from 'leva';

type AnimationStage = 'idle' | 'top-nav-morph' | 'zoom' | 'node-details' | 'bottom-nav';

export default function App() {
  const [hasSelectedNode, setHasSelectedNode] = useState(false);
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

  const handleNodeSelectionChange = (hasSelection: boolean) => {
    setHasSelectedNode(hasSelection);
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

  return (
    <BrowserRouter>
      <div className="w-full h-screen">
        {/* TopNav shows on all pages */}
        <TopNav hasSelectedNode={hasSelectedNode} animationStage={animationStage} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/canvas"
            element={
              <Canvas
                onNodeSelectionChange={handleNodeSelectionChange}
                animationStage={animationStage}
              />
            }
          />
          <Route path="/cv" element={<CV />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Custom cursor shows on all pages */}
        <CustomCursor />
      </div>
    </BrowserRouter>
  );
}
