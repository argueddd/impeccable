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
  
  // Dynamic styles based on category/tag type
  const isCategory = node.isCategory;
  
  // Calculate scale factor based on heat (Word Cloud concept)
  // Quieter design: reduce the maximum scale multipliers to avoid massive text that clutters the screen
  const heatScale = isCategory 
    ? 1 + Math.min((node.heat || 0) / 60000, 0.25) 
    : 0.9 + Math.min((node.heat || 0) / 15000, 0.2);

  if (opacity < 0.1) return null; // Don't render DOM nodes that are invisible
  
  return (
    <Html
      position={[0, isCategory ? 16 : 6, 0]}
      center
      style={{
        pointerEvents: opacity < 0.2 ? 'none' : 'auto',
        opacity: opacity,
        transition: 'all 0.3s ease',
        zIndex: isCategory ? 10 : 1,
      }}
    >
      <div
        onClick={() => onClick(node)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        className={clsx(
          "cursor-pointer select-none border-l-2 bg-white/90 whitespace-nowrap will-change-transform",
          isCategory 
            ? "px-4 py-2 text-sm font-bold border-l-[3px]" 
            : "px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800",
          hovered && "z-50 bg-white"
        )}
        style={{
          borderColor: color,
          color: isCategory ? '#0f172a' : undefined,
          transform: `scale(${hovered ? heatScale * 1.1 : heatScale})`,
          transformOrigin: 'center center',
          // OPTIMIZATION: Removed expensive box-shadow and backdrop-blur
          boxShadow: isCategory ? `0 2px 10px ${color}10` : 'none'
        }}
      >
        {node.title}
        {isCategory && (
          <div 
            className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full"
            style={{ backgroundColor: color }}
          />
        )}
      </div>
    </Html>
  );
}