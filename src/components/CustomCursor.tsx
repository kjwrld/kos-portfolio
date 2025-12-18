import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isOverSelectedNode, setIsOverSelectedNode] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isOverNodeMainArea, setIsOverNodeMainArea] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      
      // Check if over a radial menu button - DON'T show cursor description
      const radialButton = target.closest('.react-flow__node.selected button');
      
      if (radialButton) {
        setIsOverSelectedNode(false);
        setCursorText('');
        setIsOverNodeMainArea(false);
        return;
      }
      
      // Check if over other buttons - hide custom cursor
      const isOverButton = target.closest('button') !== null;
      
      if (isOverButton) {
        setIsOverSelectedNode(false);
        setCursorText('');
        setIsOverNodeMainArea(false);
        return;
      }
      
      // Check if over an inspiration image
      const inspoImage = target.closest('.inspo-image');
      
      if (inspoImage) {
        const index = inspoImage.getAttribute('data-index');
        setIsOverSelectedNode(true);
        setCursorText(`Inspiration #${Number(index) + 1}`);
        setIsOverNodeMainArea(false);
        return;
      }
      
      // Check if cursor is over a selected node's main content area
      const nodeElement = target.closest('.react-flow__node');
      
      if (nodeElement) {
        const isSelected = nodeElement.classList.contains('selected');
        setIsOverSelectedNode(isSelected);
        setCursorText(isSelected ? 'Click to view project' : '');
        setIsOverNodeMainArea(isSelected); // Track if over main node area
      } else {
        setIsOverSelectedNode(false);
        setCursorText('');
        setIsOverNodeMainArea(false);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsOverSelectedNode(false);
      setCursorText('');
      setIsOverNodeMainArea(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Custom SVG Cursor - only shows over selected nodes */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          opacity: isVisible && isOverSelectedNode ? 1 : 0,
        }}
      >
        <svg
          className="size-7 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          fill="none"
          style={{
            transform: 'translate(-3px, -3px)',
          }}
        >
          <path
            d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
            fill="white"
            stroke="black"
            strokeWidth="2.5"
          />
        </svg>
        
        {/* Description text to the right of cursor - blue only for main node area */}
        {cursorText && (
          <div 
            className="absolute whitespace-nowrap px-3 py-1.5 text-white text-sm rounded-md shadow-lg"
            style={{
              left: '24px',
              top: '-4px',
              backgroundColor: isOverNodeMainArea ? '#067cff' : '#000000',
            }}
          >
            {cursorText}
          </div>
        )}
      </div>

      {/* Global style to fade out default cursor when custom cursor is visible */}
      <style>{`
        * {
          cursor: ${isOverSelectedNode ? 'none' : 'auto'} !important;
        }
      `}</style>
    </>
  );
}