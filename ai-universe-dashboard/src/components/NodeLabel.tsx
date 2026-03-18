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
          "cursor-pointer select-none transition-all duration-300 backdrop-blur-md border-l-2 bg-white/90 shadow-sm whitespace-nowrap",
          isCategory 
            ? "px-5 py-2.5 text-base font-bold border-l-4 shadow-xl" 
            : "px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:scale-110",
          hovered && "scale-105 z-50 bg-white"
        )}
        style={{
          borderColor: color,
          color: isCategory ? '#0f172a' : undefined,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: isCategory ? `0 8px 30px ${color}20` : 'none'
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