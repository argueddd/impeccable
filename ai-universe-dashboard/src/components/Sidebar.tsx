import { DATA_NODES, CATEGORIES } from '../data';
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  activeNode: any;
  onNodeClick: (node: any) => void;
}

export function Sidebar({ activeNode, onNodeClick }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const categories = DATA_NODES.filter(n => n.isCategory);
  
  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-6 top-32 bottom-20 w-64 bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] rounded-2xl flex flex-col z-30 pointer-events-auto overflow-hidden"
          >
            {/* Tech Edge Highlight */}
            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/50 via-indigo-500/50 to-transparent" />

            <div className="p-4 border-b border-slate-100/50 flex items-center justify-between shrink-0">
              <div>
                <h3 className="font-bold text-slate-800 text-xs flex items-center gap-2 tracking-wide">
                  <Network size={14} className="text-indigo-500" />
                  知识图谱
                </h3>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-full hover:bg-white/50 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
              {categories.map(cat => {
                const children = DATA_NODES.filter(n => n.parent === cat.id);
                const catColor = CATEGORIES[cat.type]?.color || '#94a3b8';
                const isCatActive = activeNode?.id === cat.id || activeNode?.parent === cat.id;
                
                return (
                  <div key={cat.id} className="space-y-2">
                    {/* Category Header */}
                    <div 
                      onClick={() => onNodeClick(cat)}
                      className={`font-bold cursor-pointer transition-all flex items-center gap-2 group`}
                      style={{
                        fontSize: '13px',
                        color: isCatActive ? '#0f172a' : '#475569'
                      }}
                    >
                      <div 
                        className={`w-1.5 h-1.5 rounded-full transition-transform ${isCatActive ? 'scale-125 ring-2 ring-offset-1 ring-offset-transparent' : 'group-hover:scale-125'}`} 
                        style={{ backgroundColor: catColor, ringColor: `${catColor}40` }} 
                      />
                      <span className="group-hover:text-blue-600 transition-colors truncate">{cat.title}</span>
                    </div>
                    
                    {/* Children Word Cloud */}
                    <div className="flex flex-wrap gap-1.5 pl-3.5 border-l border-dashed ml-[3px] transition-colors duration-300" style={{ borderColor: isCatActive ? `${catColor}40` : '#e2e8f0' }}>
                      {children.map(child => {
                        const heatScale = Math.min((child.heat || 0) / 12000, 1);
                        const isHot = heatScale > 0.6;
                        const isChildActive = activeNode?.id === child.id;
                        
                        return (
                          <span 
                            key={child.id}
                            onClick={() => onNodeClick(child)}
                            className={`cursor-pointer transition-all hover:-translate-y-0.5 inline-block px-1.5 py-0.5 rounded text-[10px] ${isChildActive ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'hover:bg-white/50'}`}
                            style={{
                              color: isChildActive ? '#0f172a' : (isHot ? '#ea580c' : '#64748b'),
                              fontWeight: isChildActive || isHot ? 600 : 400,
                              opacity: isChildActive || isHot ? 1 : 0.8
                            }}
                          >
                            {child.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Toggle Button */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            onClick={() => setIsExpanded(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md border border-slate-200 border-r-0 rounded-l-xl p-2 shadow-[-5px_0_15px_rgba(0,0,0,0.05)] z-30 hover:pr-4 hover:bg-slate-50 transition-all group pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-2">
              <ChevronLeft size={20} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
              <span className="writing-vertical-rl text-[10px] font-bold text-slate-400 tracking-widest uppercase group-hover:text-indigo-500 transition-colors">
                Taxonomy
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
