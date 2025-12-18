import { Home, LayoutGrid, User, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { topNavConfig } from '../config/ui-defaults';
import { useControls } from 'leva';

interface TopNavProps {
  hasSelectedNode: boolean;
  animationStage?: 'idle' | 'top-nav-morph' | 'zoom' | 'node-details' | 'bottom-nav';
}

export function TopNav({ hasSelectedNode, animationStage = 'idle' }: TopNavProps) {
  const [activeIndex, setActiveIndex] = useState(0); // Start at 0 for Home
  const [view, setView] = useState<'normal' | 'line'>('normal');
  const [variantKey, setVariantKey] = useState('idle');
  const activeStateWrapperRef = useRef<HTMLDivElement>(null);
  
  // Morph when animation stage is 'top-nav-morph' or later (but node must be selected)
  const shouldMorph = hasSelectedNode && animationStage !== 'idle';

  // All styling values - can be extracted to config if needed
  const clipPath = {
    horizontalRadius: 15,
    verticalRadius: 85,
    xOffset: 12.5,
    yPosition: 50,
    itemWidth: 25,
  };

  const positioning = {
    topOffset: topNavConfig.topOffset,
    maxWidth: 352,
    maxHeight: 40,
    horizontalPadding: 16,
  };

  // Morph Animation Config with Leva controls
  const morphConfig = useControls('Top Nav Morph', {
    enabled: { value: true, label: 'Enable Morph' },
    lineHeight: { value: 8, min: 2, max: 40, step: 1, label: 'Line Height (px)' },
    lineWidth: { value: 320, min: 100, max: 500, step: 10, label: 'Line Width (px)' },
    lineColor: { value: '#000000', label: 'Line Color' },
  });

  const normalToLineAnim = useControls('Normal → Line Anim', {
    enterDelay: { value: 0.00, min: 0, max: 1, step: 0.05, label: 'Enter Delay (s)' },
    enterScale: { value: 0.95, min: 0.5, max: 1.5, step: 0.05, label: 'Enter Scale' },
    enterOpacity: { value: 0.0, min: 0, max: 1, step: 0.1, label: 'Enter Opacity' },
    enterBlur: { value: 4, min: 0, max: 20, step: 1, label: 'Enter Blur (px)' },
    exitScale: { value: 1.00, min: 0.5, max: 2, step: 0.05, label: 'Exit Scale Y' },
    exitY: { value: 0.0, min: -20, max: 20, step: 0.5, label: 'Exit Y (px)' },
    exitBlur: { value: 0, min: 0, max: 20, step: 1, label: 'Exit Blur (px)' },
    bounce: { value: 0.00, min: 0, max: 1, step: 0.05, label: 'Bounce' },
  });

  const lineToNormalAnim = useControls('Line → Normal Anim', {
    enterDelay: { value: 0.05, min: 0, max: 1, step: 0.05, label: 'Enter Delay (s)' },
    enterScale: { value: 0.90, min: 0.5, max: 1.5, step: 0.05, label: 'Enter Scale' },
    enterOpacity: { value: 0.0, min: 0, max: 1, step: 0.1, label: 'Enter Opacity' },
    enterBlur: { value: 4, min: 0, max: 20, step: 1, label: 'Enter Blur (px)' },
    exitScale: { value: 1.40, min: 0.5, max: 2, step: 0.05, label: 'Exit Scale' },
    exitY: { value: 7.5, min: -20, max: 20, step: 0.5, label: 'Exit Y (px)' },
    exitBlur: { value: 4, min: 0, max: 20, step: 1, label: 'Exit Blur (px)' },
    bounce: { value: 0.50, min: 0, max: 1, step: 0.05, label: 'Bounce' },
  });

  const lineFadeOut = useControls('Line Fade Out', {
    enabled: { value: true, label: 'Enable Fade Out' },
    delay: { value: 0.15, min: 0, max: 2, step: 0.05, label: 'Fade Delay (s)' },
    duration: { value: 0.25, min: 0.1, max: 2, step: 0.05, label: 'Fade Duration (s)' },
    targetOpacity: { value: 0.0, min: 0, max: 1, step: 0.1, label: 'Target Opacity' },
  });

  const navItems = [
    { icon: Home, label: 'Home' },
    { icon: LayoutGrid, label: 'Canvas' },
    { icon: User, label: 'Timeline' },
    { icon: Mail, label: 'Contact' },
  ];

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  // Calculate clip path position based on active index
  const clipPathX = (activeIndex * clipPath.itemWidth) + clipPath.xOffset;

  // Update view state when selection changes
  useEffect(() => {
    if (!morphConfig.enabled || !shouldMorph) return;
    
    const newView = hasSelectedNode ? 'line' : 'normal';
    if (newView !== view) {
      // Update variant key for animation
      if (view === 'normal' && newView === 'line') {
        setVariantKey('normal-line');
      } else if (view === 'line' && newView === 'normal') {
        setVariantKey('line-normal');
      }
      setView(newView);
    }
  }, [hasSelectedNode, morphConfig.enabled, view, shouldMorph]);

  // Get current animation config based on transition
  const getCurrentAnimConfig = () => {
    if (variantKey === 'normal-line') {
      return normalToLineAnim;
    } else if (variantKey === 'line-normal') {
      return lineToNormalAnim;
    }
    return normalToLineAnim; // default
  };

  const currentAnim = getCurrentAnimConfig();

  // Exit variants for the duplicate view
  const exitVariants = {
    exit: {
      opacity: [1, 0],
      scaleY: variantKey === 'normal-line' ? currentAnim.exitScale : 1, // Only scale Y for normal-to-line
      scaleX: variantKey === 'normal-line' ? 1 : currentAnim.exitScaleX, // Don't scale X for normal-to-line
      scale: variantKey === 'line-normal' ? currentAnim.exitScale : undefined, // Use regular scale for line-to-normal
      y: currentAnim.exitY,
      filter: `blur(${currentAnim.exitBlur}px)`,
    },
  };

  // Render the normal pill nav
  const renderNormalNav = (isExiting = false) => {
    // Determine if icons should fade out (when normal is exiting to line)
    const shouldFadeIcons = isExiting && variantKey === 'normal-line';
    
    return (
      <div 
        className="relative bg-black rounded-full shadow-2xl border-2 border-gray-800 overflow-hidden"
        style={{ 
          height: `${positioning.maxHeight}px`,
          width: '100%',
        }}
      >
        <motion.div 
          className="flex items-center justify-around h-full px-2"
          animate={shouldFadeIcons ? { opacity: [1, 0] } : { opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleItemClick(index)}
                className="flex items-center justify-center flex-1 h-full transition-transform hover:scale-110"
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 text-white" />
              </button>
            );
          })}
        </motion.div>

        {/* Animated white overlay with clip-path */}
        <motion.div
          className="absolute inset-0 bg-white"
          animate={{
            clipPath: `ellipse(${clipPath.horizontalRadius}% ${clipPath.verticalRadius}% at ${clipPathX}% ${clipPath.yPosition}%)`,
            opacity: shouldFadeIcons ? [1, 0] : 1,
          }}
          transition={{
            clipPath: {
              type: "spring",
              stiffness: 300,
              damping: 30,
            },
            opacity: {
              duration: 0.25,
            }
          }}
        >
          <div className="flex items-center justify-around h-full px-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleItemClick(index)}
                  className="flex items-center justify-center flex-1 h-full pointer-events-none"
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5 text-black" />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  };

  // Render the thick black line
  const renderBlackLine = () => (
    <div 
      className="rounded-full shadow-2xl"
      style={{ 
        height: `${morphConfig.lineHeight}px`,
        width: `${morphConfig.lineWidth}px`,
        backgroundColor: morphConfig.lineColor,
        margin: '0 auto', // Center the line
      }}
    />
  );

  const currentContent = view === 'normal' ? renderNormalNav() : renderBlackLine();
  const exitingContent = view === 'normal' ? renderNormalNav(true) : renderBlackLine();

  if (!morphConfig.enabled || !shouldMorph) {
    // No morph - just show normal nav
    return (
      <div 
        className="fixed left-0 right-0 z-50 flex justify-center" 
        style={{ top: `${positioning.topOffset}px` }}
      >
        <div 
          className="relative w-full mx-4"
          style={{ 
            maxWidth: `${positioning.maxWidth}px`,
            paddingLeft: `${positioning.horizontalPadding}px`,
            paddingRight: `${positioning.horizontalPadding}px`,
          }}
        >
          {renderNormalNav()}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed left-0 right-0 z-50 flex justify-center" 
      style={{ top: `${positioning.topOffset}px` }}
    >
      {/* Main morphing container */}
      <motion.div
        layout
        transition={{
          type: "spring",
          bounce: currentAnim.bounce,
        }}
        style={{ 
          borderRadius: view === 'line' ? morphConfig.lineHeight / 2 : 32,
        }}
        className="relative w-full mx-4 overflow-hidden"
      >
        {/* Active view - always visible with enter animation */}
        <motion.div
          ref={activeStateWrapperRef}
          transition={{
            type: "spring",
            bounce: currentAnim.bounce,
          }}
          initial={{
            scale: currentAnim.enterScale,
            opacity: currentAnim.enterOpacity,
            filter: `blur(${currentAnim.enterBlur}px)`,
          }}
          animate={{
            scale: 1,
            opacity: view === 'line' && lineFadeOut.enabled ? [
              currentAnim.enterOpacity, // Start at enter opacity
              1, // Fade in fully
              lineFadeOut.targetOpacity // Then fade to target
            ] : 1,
            filter: "blur(0px)",
            transition: {
              delay: currentAnim.enterDelay,
              opacity: view === 'line' && lineFadeOut.enabled ? {
                times: [0, 0.5, 1], // First half: fade in, second half: fade out
                duration: currentAnim.enterDelay + 0.3 + lineFadeOut.delay + lineFadeOut.duration,
                ease: "easeInOut",
              } : undefined,
            },
          }}
          key={view}
          style={{
            transformOrigin: '50% 50%',
            maxWidth: view === 'normal' ? `${positioning.maxWidth}px` : `${morphConfig.lineWidth}px`,
            paddingLeft: view === 'normal' ? `${positioning.horizontalPadding}px` : '0px',
            paddingRight: view === 'normal' ? `${positioning.horizontalPadding}px` : '0px',
            margin: '0 auto',
          }}
        >
          {currentContent}
        </motion.div>
      </motion.div>

      {/* Duplicate view - only visible when exiting */}
      <div className="pointer-events-none absolute left-1/2 top-0 flex h-[200px] w-[400px] -translate-x-1/2 items-start justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ opacity: 0 }}
            exit="exit"
            variants={exitVariants}
            transition={{
              type: "spring",
              bounce: currentAnim.bounce,
            }}
            key={view}
            style={{
              transformOrigin: '50% 50%',
              maxWidth: view === 'normal' ? `${positioning.maxWidth}px` : `${morphConfig.lineWidth}px`,
              paddingLeft: view === 'normal' ? `${positioning.horizontalPadding}px` : '0px',
              paddingRight: view === 'normal' ? `${positioning.horizontalPadding}px` : '0px',
            }}
          >
            {exitingContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}