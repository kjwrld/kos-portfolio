import { useControls } from 'leva';
import { bottomNavConfig, breakpoints } from '../config/ui-defaults';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { LayoutGrid, Layers, Image, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

interface BottomNavProps {
  hasSelectedNode?: boolean;
  selectedProject?: any;
  animationStage?: 'idle' | 'top-nav-morph' | 'zoom' | 'node-details' | 'bottom-nav';
}

export function BottomNav({ hasSelectedNode = false, selectedProject, animationStage = 'idle' }: BottomNavProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Only show bottom nav when animation reaches stage 4 (bottom-nav)
  const shouldShowBottomNav = hasSelectedNode && animationStage === 'bottom-nav';

  // Detect mobile/tablet/desktop viewport using centralized breakpoints
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < breakpoints.mobile);
      setIsTablet(window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Reset animation states when node selection changes
  useEffect(() => {
    if (hasSelectedNode) {
      // Reset to overview tab whenever bottom nav opens
      setActiveTab('overview');
      setShowTabs(false);
      setShowContent(false);
      // Card pops in → show tabs
      const tabsTimer = setTimeout(() => setShowTabs(true), 200);
      // Tabs appear → show content
      const contentTimer = setTimeout(() => setShowContent(true), 400);
      return () => {
        clearTimeout(tabsTimer);
        clearTimeout(contentTimer);
      };
    } else {
      setShowTabs(false);
      setShowContent(false);
    }
  }, [hasSelectedNode]);

  // Bottom Nav Configuration
  const config = useControls('Bottom Nav', {
    browserHeightDesktop: { value: 480, min: 200, max: 500, step: 10, label: 'Height Desktop (px)' },
    browserHeightTablet: { value: 420, min: 200, max: 500, step: 10, label: 'Height Tablet (px)' },
    browserHeightMobile: { value: 270, min: 200, max: 500, step: 10, label: 'Height Mobile (px)' },
    borderColor: { value: '#d1d5db', label: 'Border Color' },
    bottomOffset: { 
      value: 12, 
      min: 0, 
      max: 200, 
      step: 1, 
      label: 'Bottom Offset (px)' 
    },
  });

  const animation = useControls('Bottom Nav Animation', {
    bounce: { value: 0.1, min: 0, max: 1, step: 0.05, label: 'Spring Bounce' },
    duration: { value: 0.5, min: 0.1, max: 1, step: 0.05, label: 'Duration (s)' },
    slideDistance: { value: 80, min: 20, max: 200, step: 10, label: 'Slide Distance (px)' },
  });

  // Simplified tab config
  const tabConfig = {
    tabHeight: 48, // Increased height so tabs don't float when hovering
    hoverRise: 6, // How much tabs rise on hover
    edgeCushion: 8, // Cushion from container edges
    gap: 4, // Gap between tabs
    activeColor: '#ffffff',
    inactiveColor: '#e5e7eb',
    activeTextColor: '#000000',
    inactiveTextColor: '#6b7280',
    borderRadius: 8,
    activeOverlap: 2, // How much the active tab overlaps the container to hide the border
    inactiveTuck: 4, // How much inactive tabs tuck behind the container
  };

  // Simplified tab content animation
  const tabContentAnimation = {
    slideDistance: 33,
    duration: 0.30,
    bounce: 0.00,
    initialOpacity: 0.0,
    exitOpacity: 0.0,
  };

  // Tab data with icons
  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'process', label: 'Process', icon: Layers },
    { id: 'assets', label: 'Assets', icon: Image },
    { id: 'research', label: 'Research', icon: FileText },
  ];

  // Handle tab change with direction tracking
  const handleTabChange = (newTabId: string) => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    const newIndex = tabs.findIndex(t => t.id === newTabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setActiveTab(newTabId);
  };

  // Variants for tab content direction-aware animations
  const tabContentVariants = {
    initial: (direction: number) => ({
      x: `${tabContentAnimation.slideDistance * direction}%`,
      opacity: tabContentAnimation.initialOpacity,
    }),
    active: {
      x: '0%',
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: `${-tabContentAnimation.slideDistance * direction}%`,
      opacity: tabContentAnimation.exitOpacity,
    }),
  };

  return (
    <div 
      className="fixed left-0 right-0 z-40 flex justify-center pointer-events-none" 
      style={{ 
        bottom: `${config.bottomOffset}px`,
      }}
    >
      <div className="pointer-events-auto w-full">
        <AnimatePresence mode="wait">
          {shouldShowBottomNav && (
            <motion.div
              key="drawer"
              initial={{ 
                y: animation.slideDistance,
                opacity: 0,
              }}
              animate={{ 
                y: 0,
                opacity: 1,
              }}
              exit={{ 
                y: animation.slideDistance,
                opacity: 0,
              }}
              transition={{ 
                type: 'spring',
                bounce: animation.bounce,
                duration: animation.duration,
              }}
              className="w-full max-w-2xl mx-auto px-4"
            >
              {/* Folder Tabs - Pop up after drawer appears */}
              <motion.div 
                className="relative" 
                style={{ 
                  height: `${tabConfig.tabHeight}px`,
                  marginBottom: `-${tabConfig.activeOverlap}px`, // Allow active tab to overlap container
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: showTabs ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Full-width tab container with edge cushion */}
                <div 
                  className="absolute bottom-0 left-0 right-0 flex"
                  style={{
                    paddingLeft: `${tabConfig.edgeCushion}px`,
                    paddingRight: `${tabConfig.edgeCushion}px`,
                    gap: `${tabConfig.gap}px`,
                  }}
                >
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className="folder-tab flex items-center justify-center gap-2 relative cursor-pointer"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ 
                          y: showTabs ? (isActive ? 0 : tabConfig.inactiveTuck) : 20, 
                          opacity: showTabs ? 1 : 0 
                        }}
                        transition={{ 
                          delay: tabs.findIndex(t => t.id === tab.id) * 0.08, // Increased from 0.05 for more visible stagger
                          duration: 0.4, // Slightly longer for smoother appearance
                          type: 'spring',
                          bounce: 0.3
                        }}
                        style={{
                          flex: 1, // Distribute evenly
                          height: `${tabConfig.tabHeight}px`,
                          backgroundColor: isActive ? tabConfig.activeColor : tabConfig.inactiveColor,
                          color: isActive ? tabConfig.activeTextColor : tabConfig.inactiveTextColor,
                          borderTopLeftRadius: `${tabConfig.borderRadius}px`,
                          borderTopRightRadius: `${tabConfig.borderRadius}px`,
                          border: `1px solid ${config.borderColor}`,
                          borderBottom: isActive ? 'none' : `1px solid ${config.borderColor}`,
                          // Active tab extends down to overlap container border
                          paddingBottom: isActive ? `${tabConfig.activeOverlap}px` : '0px',
                          marginBottom: isActive ? `-${tabConfig.activeOverlap}px` : '0px',
                          zIndex: isActive ? 30 : 10, // Inactive tabs go BEHIND container
                        }}
                        whileHover={!isActive ? { 
                          y: 0, // Rise up from tucked position to flush with container
                          transition: { duration: 0.1, ease: 'easeOut' } // Instant response
                        } : {}}
                      >
                        {/* Desktop: Show icon + text */}
                        <span className="hidden lg:flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{tab.label}</span>
                        </span>
                        {/* Mobile: Show icon only */}
                        <span className="lg:hidden flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Browser Card */}
              <div 
                className="bg-white rounded-2xl shadow-2xl relative"
                style={{ 
                  height: `${isMobile ? config.browserHeightMobile : isTablet ? config.browserHeightTablet : config.browserHeightDesktop}px`,
                  border: `1px solid ${config.borderColor}`,
                  overflow: 'hidden',
                  zIndex: 20, // Container sits above inactive tabs (z-10) but below active tab (z-30)
                }}
              >
                {/* Content - Fades in after card appears */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showContent ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Scroll Container */}
                  <div 
                    className="absolute inset-0 p-6 overflow-y-auto"
                    style={{
                      overflowX: 'hidden',
                    }}
                  >
                    {/* Animation Container */}
                    <div className="relative w-full h-full">
                      <MotionConfig transition={{ duration: tabContentAnimation.duration, type: 'spring', bounce: tabContentAnimation.bounce }}>
                        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                          {activeTab === 'overview' && (
                            <motion.div
                              key="overview"
                              variants={tabContentVariants}
                              initial="initial"
                              animate="active"
                              exit="exit"
                              custom={direction}
                              className="space-y-4 absolute inset-0"
                            >
                              {/* Project Title with Chroma Sweep */}
                              {selectedProject && (
                                <h3 className="text-2xl font-semibold chroma-text chroma-text-animate">
                                  {selectedProject.title}
                                </h3>
                              )}
                              
                              <p className="text-sm text-gray-600">
                                {selectedProject?.longDescription || 'Detailed workflow and methodology behind this project.'}
                              </p>
                              
                              {/* Tech Stack Tags */}
                              {selectedProject?.techStack && (
                                <div className="space-y-2">
                                  <motion.h4 
                                    className="text-xs uppercase tracking-wide font-medium relative inline-block"
                                    initial={{ backgroundPosition: "-200% 0" }}
                                    animate={{ backgroundPosition: "200% 0" }}
                                    transition={{
                                      duration: 2,
                                      delay: 0.5,
                                      ease: "easeInOut",
                                      repeat: 0,
                                    }}
                                    style={{
                                      background: "linear-gradient(90deg, #6b7280 0%, #9ca3af 25%, #d1d5db 50%, #9ca3af 75%, #6b7280 100%)",
                                      backgroundSize: "200% 100%",
                                      backgroundClip: "text",
                                      WebkitBackgroundClip: "text",
                                      WebkitTextFillColor: "transparent",
                                      color: "transparent",
                                    }}
                                  >
                                    Tech Stack
                                  </motion.h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map((tech: string, i: number) => (
                                      <span key={i} className="px-3 py-1 bg-black text-white rounded text-sm">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Project Details */}
                              <div className="grid grid-cols-2 gap-3 mt-4">
                                {selectedProject?.year && (
                                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="text-xs text-gray-500">Year</div>
                                    <div className="text-sm font-medium text-gray-900">{selectedProject.year}</div>
                                  </div>
                                )}
                                {selectedProject?.role && (
                                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="text-xs text-gray-500">Role</div>
                                    <div className="text-sm font-medium text-gray-900">{selectedProject.role}</div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                          
                          {activeTab === 'process' && (
                            <motion.div
                              key="process"
                              variants={tabContentVariants}
                              initial="initial"
                              animate="active"
                              exit="exit"
                              custom={direction}
                              className="space-y-4 absolute inset-0"
                            >
                              <h3 className="text-xl font-semibold chroma-text chroma-text-animate">Process</h3>
                              <p className="text-sm text-gray-600">
                                Detailed steps and procedures involved in the project.
                              </p>
                              <div className="grid grid-cols-2 gap-3 mt-4">
                                {['Planning', 'Execution', 'Testing', 'Deployment'].map((step, i) => (
                                  <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="text-xs text-gray-500">Step {i + 1}</div>
                                    <div className="text-sm font-medium text-gray-900">{step}</div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                          
                          {activeTab === 'assets' && (
                            <motion.div
                              key="assets"
                              variants={tabContentVariants}
                              initial="initial"
                              animate="active"
                              exit="exit"
                              custom={direction}
                              className="space-y-4 absolute inset-0"
                            >
                              <h3 className="text-xl font-semibold chroma-text chroma-text-animate">Assets</h3>
                              <p className="text-sm text-gray-600">
                                Visual resources and design elements used throughout.
                              </p>
                              <div className="grid grid-cols-3 gap-3 mt-4">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                  <div key={i} className="aspect-square bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                    <Image className="w-8 h-8 text-gray-400" />
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                          
                          {activeTab === 'research' && (
                            <motion.div
                              key="research"
                              variants={tabContentVariants}
                              initial="initial"
                              animate="active"
                              exit="exit"
                              custom={direction}
                              className="space-y-4 absolute inset-0"
                            >
                              <h3 className="text-xl font-semibold chroma-text chroma-text-animate">Research</h3>
                              <p className="text-sm text-gray-600">
                                User insights, competitive analysis, and strategic findings.
                              </p>
                              <div className="space-y-3 mt-4">
                                {['User Interviews', 'Market Analysis', 'Competitive Audit', 'Insights Report'].map((item, i) => (
                                  <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-900">{item}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </MotionConfig>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}