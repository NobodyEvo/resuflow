import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useResumeStore } from '../../store/useResumeStore';
import { StandardTemplate } from '../../templates/StandardTemplate';
import { Printer, ZoomIn, ZoomOut } from 'lucide-react';

export const LivePreview: React.FC = () => {
  const { sections } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [printableArea, setPrintableArea] = useState<HTMLElement | null>(null);

  // A4 dimensions in pixels at 96 DPI (approx)
  // Width: 210mm = ~794px
  const A4_WIDTH_PX = 794;

  useEffect(() => {
    setPrintableArea(document.getElementById('printable-area'));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        // Get the width of the gray container
        const containerWidth = containerRef.current.offsetWidth;
        // Subtract padding (32px * 2 = 64px approx)
        const availableWidth = containerWidth - 64;
        
        // Calculate scale to fit A4 width into available space
        // Max scale limited to 1.1 to prevent it getting too huge on big screens
        const newScale = Math.min(1.1, Math.max(0.3, availableWidth / A4_WIDTH_PX));
        
        setScale(newScale);
      }
    };

    // Initial calc
    calculateScale();

    // Recalculate on window resize
    const observer = new ResizeObserver(calculateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-gray-700 h-full flex flex-col border-l border-gray-600">
      {/* Header / Toolbar */}
      <div className="h-14 bg-gray-800 border-b border-gray-600 flex items-center justify-between px-4 shadow-md z-10 shrink-0">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          Live Preview 
          <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-[10px]">{(scale * 100).toFixed(0)}%</span>
        </span>
        <div className="flex items-center gap-2">
           <button 
             onClick={() => setScale(s => Math.min(1.5, s + 0.1))}
             className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
             title="Zoom In"
           >
             <ZoomIn size={16} />
           </button>
           <button 
             onClick={() => setScale(s => Math.max(0.3, s - 0.1))}
             className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
             title="Zoom Out"
           >
             <ZoomOut size={16} />
           </button>
           <div className="h-4 w-px bg-gray-600 mx-1"></div>
           <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded transition-colors font-medium shadow-sm"
          >
            <Printer size={14} /> Export
          </button>
        </div>
      </div>

      {/* Preview Area (Screen Only) */}
      <div 
        ref={containerRef} 
        className="flex-1 overflow-y-auto custom-scrollbar p-8 flex justify-center bg-gray-700 relative"
      >
        <div className="relative">
          <div 
            style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: 'top center',
              width: '210mm', 
              minHeight: '297mm'
            }}
            className="bg-white shadow-2xl transition-transform duration-150 ease-out"
          >
             <StandardTemplate data={sections} />
          </div>
        </div>
      </div>

      {/* Portal for Print (Rendered outside the main app root) */}
      {printableArea && createPortal(
        <StandardTemplate data={sections} />,
        printableArea
      )}
    </div>
  );
};