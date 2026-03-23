import { Html } from '@react-three/drei';
import { CATEGORIES } from '../data';
import clsx from 'clsx';
import { useState } from 'react';

interface NodeLabelProps {
  node: any;
  onClick: (node: any) => void;
  opacity?: number;
}

export function NodeLabel({ node, onClick, opacity = 1 }: NodeLabelProps) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORIES[node.type]?.color || '#94a3b8';
  
  // Custom scale logic: Heatmap nodes (which have keyword property) vs Taxonomy nodes
  const isHeatmapNode = node.hasOwnProperty('heatScore') || node.hasOwnProperty('keyword');
  const isCategory = node.isCategory;
  
  let heatScale;
  if (isHeatmapNode) {
    // For Heatmap mode: 100-point scale
    const heatScore = node.heat || node.heatScore || 0;
    heatScale = 0.7 + (heatScore / 100) * 0.4; // Scale from 0.7 to 1.1 based on heat - gentler scaling
  } else {
    // For Taxonomy mode
    heatScale = isCategory 
      ? 1 + Math.min((node.heat || 0) / 60000, 0.25)
      : 0.9 + Math.min((node.heat || 0) / 15000, 0.2);
  }

  // Determine text color based on heat for Heatmap mode
  let heatmapTextColor = undefined;
  if (isHeatmapNode) {
    const heatScore = node.heat || node.heatScore || 0;
    if (heatScore >= 90) heatmapTextColor = '#f97316'; // Orange
    else if (heatScore >= 75) heatmapTextColor = '#eab308'; // Yellow
    else if (heatScore >= 60) heatmapTextColor = '#38bdf8'; // Sky blue
    else heatmapTextColor = '#94a3b8'; // Slate
  }

  if (opacity < 0.1) return null; // Don't render DOM nodes that are invisible
  
  return (
    <Html
      position={[0, isHeatmapNode ? 8 : (isCategory ? 16 : 6), 0]}
      center
      style={{
        pointerEvents: opacity < 0.2 ? 'none' : 'auto',
        opacity: opacity,
        transition: 'all 0.3s ease',
        zIndex: isHeatmapNode ? 5 : (isCategory ? 10 : 1),
      }}
    >
      <div
        onClick={() => onClick(node)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className={clsx(
          "cursor-pointer select-none whitespace-nowrap",
          "border-l-2 bg-white/90 px-2 py-0.5 text-[11px] font-medium text-slate-500 hover:text-slate-800", // Simplified for performance
          isCategory && !isHeatmapNode ? "px-4 py-2 text-sm font-bold border-l-[3px]" : "",
          hovered && "z-50 bg-white shadow-md"
        )}
        style={{
          borderColor: isHeatmapNode ? heatmapTextColor : color,
          color: '#0f172a',
          transform: `scale(${hovered ? heatScale * 1.15 : heatScale})`,
          transformOrigin: 'center left',
          // Only use boxShadow on hover or for specific categories to save rendering performance
          boxShadow: (isCategory && !isHeatmapNode) ? `0 2px 10px ${(isHeatmapNode ? heatmapTextColor : color)}10` : 'none'
        }}
      >
        {node.title || node.keyword}
        {(isCategory || isHeatmapNode) && (
          <div 
            className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: isHeatmapNode ? heatmapTextColor : color }}
          />
        )}
      </div>
    </Html>
  );
}