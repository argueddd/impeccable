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
            className="fixed right-8 top-32 bottom-20 w-80 bg-white/85 backdrop-blur-2xl border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl flex flex-col z-30 pointer-events-auto overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 tracking-wide">
                  <Network size={16} className="text-indigo-500" />
                  全网热力知识图谱
                </h3>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-mono">Taxonomy Hierarchy</p>
              </div>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8 bg-slate-50/30">
              {categories.map(cat => {
                const children = DATA_NODES.filter(n => n.parent === cat.id);
                const catColor = CATEGORIES[cat.type]?.color || '#94a3b8';
                const isCatActive = activeNode?.id === cat.id || activeNode?.parent === cat.id;
                
                return (
                  <div key={cat.id} className="space-y-3">
                    {/* Category Header */}
                    <div 
                      onClick={() => onNodeClick(cat)}
                      className={`font-bold cursor-pointer transition-all flex items-center gap-2 group`}
                      style={{
                        fontSize: `${Math.min(14 + (cat.heat || 0)/15000, 18)}px`,
                        color: isCatActive ? '#0f172a' : '#334155'
                      }}
                    >
                      <div 
                        className={`w-2 h-2 rounded-sm transition-transform ${isCatActive ? 'scale-125' : 'group-hover:scale-125'}`} 
                        style={{ backgroundColor: catColor, boxShadow: isCatActive ? `0 0 8px ${catColor}` : 'none' }} 
                      />
                      <span className="group-hover:text-blue-600 transition-colors">{cat.title}</span>
                    </div>
                    
                    {/* Children Word Cloud */}
                    <div className="flex flex-wrap gap-2 pl-4 border-l-2 ml-1 transition-colors duration-300" style={{ borderColor: isCatActive ? `${catColor}40` : '#e2e8f0' }}>
                      {children.map(child => {
                        const heatScale = Math.min((child.heat || 0) / 12000, 1);
                        const isHot = heatScale > 0.6;
                        const isChildActive = activeNode?.id === child.id;
                        
                        return (
                          <span 
                            key={child.id}
                            onClick={() => onNodeClick(child)}
                            className={`cursor-pointer transition-all hover:-translate-y-0.5 inline-block px-2 py-1 rounded-md border ${isChildActive ? 'bg-white shadow-sm' : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-200'}`}
                            style={{
                              borderColor: isChildActive ? `${catColor}30` : undefined,
                              fontSize: `${11 + heatScale * 3}px`,
                              color: isChildActive ? '#0f172a' : (isHot ? '#ea580c' : '#64748b'),
                              fontWeight: isChildActive || isHot ? 700 : 500
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
