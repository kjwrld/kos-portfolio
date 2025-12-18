/**
 * Centralized UI Configuration
 * All default values for UI components, animations, and positioning
 */

// Responsive Breakpoints - SINGLE SOURCE OF TRUTH
export const breakpoints = {
  mobile: 768,  // 0-767px = mobile
  tablet: 1024, // 768-1023px = tablet
  desktop: 1024, // 1024px+ = desktop
};

// Top Navigation Configuration
export const topNavConfig = {
  topOffset: 48, // px from top of viewport
};

// Bottom Navigation Configuration (informational island)
export const bottomNavConfig = {
  bottomOffset: 60, // px from bottom of viewport
  height: 40, // height of the bottom nav bar
};

// Mobile Zoom Configuration
export const mobileZoomConfig = {
  enabled: true,
  zoomLevel: 0.8,
  duration: 550, // ms
  offsetX: 0, // px
  offsetY: 240, // px
};

// Tablet Zoom Configuration
export const tabletZoomConfig = {
  enabled: true,
  zoomLevel: 1.5,
  duration: 575, // ms
  offsetX: 0, // px
  offsetY: 130, // px
};

// Desktop Zoom Configuration
export const desktopZoomConfig = {
  enabled: true,
  zoomLevel: 1.5,
  duration: 600, // ms
  offsetX: 0, // px
  offsetY: 160, // px - accounts for bottom info bar
};

// Corner Brackets Configuration
export const cornerBracketsConfig = {
  thickness: 9.0, // px
  length: 24, // px
  offset: 12, // px from node edges
  color: '#000000', // black
  animationDuration: 0.4, // seconds
  springStiffness: 200,
  springDamping: 20,
};

// Inspiration Images Configuration
export const inspirationImagesConfig = {
  enabled: true,
  count: 3,
  spacing: 12, // px between images
  rotation: 8, // degrees
  offsetX: -120, // px
  offsetY: 80, // px
  springStiffness: 180,
  springDamping: 18,
  hoverOffsetX: -18, // px
  hoverOffsetY: -31, // px
};

// Radial Menu Configuration
export const radialMenuConfig = {
  // Arc animation settings
  arcAnimation: {
    useSpring: false,
    duration: 0.5, // seconds
    stagger: 0.08, // seconds between each button
    stiffness: 200,
    damping: 20,
  },
  // Button positions (relative to node)
  buttons: {
    lightbulb: { top: -72, right: -16 },
    link: { top: -32, right: -64 },
    github: { top: 32, right: -64 },
  },
  // Arc waypoints for smooth curved animations
  waypoints: {
    link: { top: -80, right: -48 },
    github: { top: -24, right: -80 },
  },
};

// Custom Cursor Configuration
export const customCursorConfig = {
  backgroundColor: '#067cff',
  offsetX: 24, // px from cursor
  offsetY: -4, // px from cursor
};

// Node Selection Configuration
export const nodeSelectionConfig = {
  borderColor: 'rgb(147, 51, 234)', // purple
  borderWidth: 4, // px
  transitionDuration: 0.3, // seconds
};

// Central Node Configuration
export const centralNodeConfig = {
  width: 384,
  height: 256,
  position: { x: 0, y: 0 }, // Center of canvas
};

// Project Node Configuration
export const projectNodeConfig = {
  width: 240,
  height: 180,
};

// Background Configuration (Day mode only)
export const backgroundConfig = {
  backgroundColor: '#f3f4f6', // light gray
  dotColor: '#d1d5db', // light gray dots
  dotSize: 1,
  dotGap: 20,
};

// Animation Sequence Configuration
// Controls the timing of animations when a node is selected
export const animationSequenceConfig = {
  // Stage 1: Top nav morph (happens immediately)
  stage1Delay: 0, // ms
  stage1Duration: 300, // ms - top nav morph duration
  
  // Stage 2: Camera zoom (starts after top nav finishes)
  stage2Delay: 350, // ms - wait for top nav to finish + small buffer
  stage2Duration: 600, // ms - camera zoom duration
  
  // Stage 3: Node buttons + Inspiration images (starts after zoom completes)
  stage3Delay: 1000, // ms - wait for zoom to complete + small buffer
  stage3Duration: 500, // ms - radial menu animation duration
  
  // Stage 4: Bottom nav appears (starts after everything settles)
  stage4Delay: 1350, // ms - wait for node details to appear before showing bottom nav
  stage4Duration: 500, // ms - bottom nav slide-up duration
};