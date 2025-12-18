import { Handle, Position, NodeProps } from 'reactflow';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X, ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { nodeToProjectMap, projects } from '../data/projects';
import { useControls } from 'leva';

// Arc button component that uses spring physics with progress interpolation
function ArcButton({
  startTop, startRight, waypointTop, waypointRight, endTop, endRight,
  delay, stiffness, damping, children, onClick, ariaLabel
}: {
  startTop: number; startRight: number;
  waypointTop: number; waypointRight: number;
  endTop: number; endRight: number;
  delay: number; stiffness: number; damping: number;
  children: React.ReactNode; onClick: (e: React.MouseEvent) => void;
  ariaLabel: string;
}) {
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { stiffness, damping });

  // Quadratic bezier interpolation for arc path
  const top = useTransform(springProgress, (p) => {
    return (1 - p) * (1 - p) * startTop + 2 * (1 - p) * p * waypointTop + p * p * endTop;
  });

  const right = useTransform(springProgress, (p) => {
    return (1 - p) * (1 - p) * startRight + 2 * (1 - p) * p * waypointRight + p * p * endRight;
  });

  const opacity = useTransform(springProgress, [0, 0.3], [0, 1]);

  return (
    <motion.button
      // Declarative animation that AnimatePresence can track
      initial={{ pathProgress: 0 }}
      animate={{ pathProgress: 1 }}
      exit={{ pathProgress: 0 }}
      transition={{
        pathProgress: {
          delay: delay / 1000,
          type: 'spring',
          stiffness,
          damping,
        }
      }}
      onUpdate={(latest) => {
        // Sync the declarative animation with our spring-based arc motion
        if (typeof latest.pathProgress === 'number') {
          progress.set(latest.pathProgress);
        }
      }}
      style={{ top, right, opacity }}
      className="absolute w-10 h-10 bg-black rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10 group/btn"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export function PlaceholderNode({ data, selected, id }: NodeProps<{ label: string; image?: string; onOpenProject?: (projectId: string) => void; onDeselectNode?: () => void; animationStage?: 'idle' | 'top-nav-morph' | 'zoom' | 'node-details' | 'bottom-nav' }>) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const projectId = nodeToProjectMap[id];
  const project = projectId ? projects[projectId] : null;
  const animationStage = data.animationStage || 'idle';
  
  // Only show node details (buttons + images) when animation reaches stage 3 (node-details)
  const showNodeDetails = selected && (animationStage === 'node-details' || animationStage === 'bottom-nav');

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use final values directly (all Leva controls removed, using defaults)
  const btn1Top = -72, btn1Right = -16;
  const btn2Top = -32, btn2Right = -64;
  const btn3Top = 32, btn3Right = -75;
  
  const arcAnimation = {
    duration: 0.3,
    stagger: 0.00,
    linkArcIntensity: 8,
    githubArcIntensity: 16,
    useSpring: true,
    stiffness: 300,
    damping: 25,
  };
  
  // Title position controls
  const titlePosition = useControls('Project Title', {
    enabled: { value: true, label: 'Show Title' },
    detailsTop: { value: 200, min: -200, max: 400, step: 1, label: 'Top Position (px)' },
    detailsLeft: { value: 72, min: -200, max: 400, step: 1, label: 'Left Position (px)' },
  });

  const inspoImages = {
    enabled: true,
    startLeft: -75,
    startTop: -40,
    spacingLeft: -10,
    spacingTop: 70,
    rotation: -10,
    stagger: 0.08,
    springStiffness: 200,
    springDamping: 20,
  };

  const inspoHover = {
    enabled: true,
    offsetX: -18,
    offsetY: -31,
  };

  // Corner brackets settings
  const cornerBrackets = {
    lineThickness: 9.0,
    color: '#000000', // black corner brackets
  };

  // Calculate curved waypoints for each button
  const calculateArcPath = (startTop: number, startRight: number, endTop: number, endRight: number, arcIntensity: number) => {
    // Midpoint between start and end
    const midTop = (startTop + endTop) / 2;
    const midRight = (startRight + endRight) / 2;
    
    // Calculate perpendicular offset direction
    // Vector from start to end: (dRight, dTop)
    const dRight = endRight - startRight;
    const dTop = endTop - startTop;
    
    // Perpendicular vector (rotated 90 degrees): (-dTop, dRight)
    // Normalize and apply arc intensity
    const length = Math.sqrt(dRight * dRight + dTop * dTop);
    const perpRight = length > 0 ? (-dTop / length) * arcIntensity : 0;
    const perpTop = length > 0 ? (dRight / length) * arcIntensity : 0;
    
    // Waypoint with perpendicular offset
    return {
      waypoint: { top: midTop + perpTop, right: midRight + perpRight }
    };
  };

  const linkPath = calculateArcPath(btn1Top, btn1Right, btn2Top, btn2Right, arcAnimation.linkArcIntensity);
  const githubPath = calculateArcPath(btn1Top, btn1Right, btn3Top, btn3Right, arcAnimation.githubArcIntensity);

  // Use project inspiration images if available
  const inspirationImages = project?.inspirationImages || [
    'https://images.unsplash.com/photo-1601110958586-008f807b4957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBpbnNwaXJhdGlvbiUyMG1vb2R8ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1762780087351-703502cdb85a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHJlZmVyZW5jZSUyMGFydHxlbnwxfHx8fDE3NjQ3MzM2MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1619209629065-e9a2b225b24b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBwb3J0Zm9saW98ZW58MXx8fHwxNzY0NzMzNjI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  ];

  const handleNodeClick = () => {
    if (projectId && data.onOpenProject) {
      data.onOpenProject(projectId);
    }
  };

  const handleLiveDemo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project?.liveUrl) {
      window.open(project.liveUrl, '_blank');
    }
  };

  const handleGithub = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project?.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  };

  const handleDeselect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onDeselectNode) {
      data.onDeselectNode();
    }
  };

  return (
    <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Inspiration images that fan out from behind the node */}
      <AnimatePresence>
        {showNodeDetails && inspoImages.enabled && inspirationImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ 
              left: inspoImages.startLeft, 
              top: inspoImages.startTop,
              scale: 0.8,
              opacity: 0,
              rotate: 0,
            }}
            animate={{ 
              left: inspoImages.startLeft + index * inspoImages.spacingLeft,
              top: inspoImages.startTop + index * inspoImages.spacingTop,
              scale: 1,
              opacity: 1,
              rotate: inspoImages.rotation + index * -8,
            }}
            exit={{ 
              left: inspoImages.startLeft, 
              top: inspoImages.startTop,
              scale: 0.8,
              opacity: 0,
              rotate: 0,
            }}
            whileHover={!isMobile && inspoHover.enabled ? {
              x: inspoHover.offsetX,
              y: inspoHover.offsetY,
            } : undefined}
            transition={{
              type: "spring",
              stiffness: inspoImages.springStiffness,
              damping: inspoImages.springDamping,
              delay: showNodeDetails ? index * inspoImages.stagger : (inspirationImages.length - 1 - index) * inspoImages.stagger,
            }}
            className="absolute w-32 h-32 rounded-lg overflow-hidden shadow-lg cursor-pointer inspo-image border-2 border-transparent hover:border-black transition-colors"
            data-index={index}
            style={{
              zIndex: -1,
            }}
          >
            <ImageWithFallback
              src={img}
              alt={`Inspiration ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      <div className={`rounded-lg bg-white shadow-md hover:shadow-2xl transition-all overflow-hidden ${selected ? 'border-4 border-black' : 'border-2 border-gray-200'}`}>
        {data.image && (
          <div className="w-[240px] h-[180px]">
            <ImageWithFallback
              src={data.image}
              alt={data.label}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={`px-4 text-center transition-all duration-300 overflow-hidden ${
          selected 
            ? 'max-h-0 opacity-0 py-0' 
            : 'max-h-20 opacity-100 py-3 md:max-h-0 md:opacity-0 md:py-0 md:group-hover:max-h-20 md:group-hover:opacity-100 md:group-hover:py-3'
        }`}>
          {data.label}
        </div>
      </div>
      
      {/* Yellow corner brackets on hover (only when not selected) */}
      <AnimatePresence>
        {isHovered && !selected && !isMobile && (
          <>
            {/* Top Left Corner */}
            <motion.div
              key="corner-tl"
              initial={{ x: 20, y: 20, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              exit={{ x: 20, y: 20, opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              className="absolute -top-3 -left-3 pointer-events-none"
              style={{ zIndex: -1 }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M0 10 L0 0 L10 0"
                  stroke={cornerBrackets.color}
                  strokeWidth={cornerBrackets.lineThickness}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Top Right Corner */}
            <motion.div
              key="corner-tr"
              initial={{ x: -20, y: 20, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              exit={{ x: -20, y: 20, opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.05,
              }}
              className="absolute -top-3 -right-3 pointer-events-none"
              style={{ zIndex: -1 }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M28 0 L28 10 M28 0 L18 0"
                  stroke={cornerBrackets.color}
                  strokeWidth={cornerBrackets.lineThickness}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Bottom Left Corner */}
            <motion.div
              key="corner-bl"
              initial={{ x: 20, y: -20, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              exit={{ x: 20, y: -20, opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.1,
              }}
              className="absolute -bottom-3 -left-3 pointer-events-none"
              style={{ zIndex: -1 }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M0 18 L0 28 L10 28"
                  stroke={cornerBrackets.color}
                  strokeWidth={cornerBrackets.lineThickness}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Bottom Right Corner */}
            <motion.div
              key="corner-br"
              initial={{ x: -20, y: -20, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              exit={{ x: -20, y: -20, opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.15,
              }}
              className="absolute -bottom-3 -right-3 pointer-events-none"
              style={{ zIndex: -1 }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M28 28 L28 18 M28 28 L18 28"
                  stroke={cornerBrackets.color}
                  strokeWidth={cornerBrackets.lineThickness}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Radial menu buttons */}
      <AnimatePresence>
        {showNodeDetails && (
          <>
            {/* X Button - stays at origin with fade in */}
            <motion.button 
              key="close"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                duration: arcAnimation.duration * 0.5, 
                ease: "backOut",
                exit: { duration: arcAnimation.duration * 0.3, ease: "backIn" }
              }}
              style={{ top: `${btn1Top}px`, right: `${btn1Right}px` }}
              className="absolute w-10 h-10 bg-black rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors z-10 group/btn"
              aria-label="Close"
              onClick={handleDeselect}
            >
              <X className="w-5 h-5 text-white group-hover/btn:text-black" />
              {/* Button label */}
              <span className="absolute left-12 whitespace-nowrap px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
                Close
              </span>
            </motion.button>
            
            {/* Link - animates along arc from lightbulb position */}
            <ArcButton
              key="link"
              startTop={btn1Top}
              startRight={btn1Right}
              waypointTop={linkPath.waypoint.top}
              waypointRight={linkPath.waypoint.right}
              endTop={btn2Top}
              endRight={btn2Right}
              delay={arcAnimation.stagger * 1000}
              stiffness={arcAnimation.stiffness}
              damping={arcAnimation.damping}
              onClick={handleLiveDemo}
              ariaLabel="Open live demo"
            >
              <ExternalLink className="w-5 h-5 text-white group-hover/btn:text-black" />
              {/* Button label */}
              <span className="absolute left-12 whitespace-nowrap px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
                Live Demo
              </span>
            </ArcButton>
            
            {/* Github - animates along arc from lightbulb position */}
            <ArcButton
              key="github"
              startTop={btn1Top}
              startRight={btn1Right}
              waypointTop={githubPath.waypoint.top}
              waypointRight={githubPath.waypoint.right}
              endTop={btn3Top}
              endRight={btn3Right}
              delay={arcAnimation.stagger * 2 * 1000}
              stiffness={arcAnimation.stiffness}
              damping={arcAnimation.damping}
              onClick={handleGithub}
              ariaLabel="View source code"
            >
              <Github className="w-5 h-5 text-white group-hover/btn:text-black" />
              {/* Button label */}
              <span className="absolute left-12 whitespace-nowrap px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none">
                Source Code
              </span>
            </ArcButton>

            {/* Project Details - Footer notes with chroma sweep */}
            {project && titlePosition.enabled && (
              <motion.div
                key="project-details"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                style={{ 
                  top: `${titlePosition.detailsTop}px`, 
                  left: `${titlePosition.detailsLeft}px` 
                }}
                className="absolute text-xs max-w-xs text-right"
              >
                <motion.div 
                  className="text-gray-600 text-[12px] font-normal uppercase relative"
                  initial={{ backgroundPosition: "-200% 0" }}
                  animate={{ backgroundPosition: "200% 0" }}
                  transition={{
                    duration: 2,
                    delay: 0.5,
                    ease: "easeInOut",
                    repeat: 0,
                  }}
                  style={{
                    background: "linear-gradient(90deg, #4b5563 0%, #6b7280 25%, #9ca3af 50%, #6b7280 75%, #4b5563 100%)",
                    backgroundSize: "200% 100%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  {project.shortDescription}
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}