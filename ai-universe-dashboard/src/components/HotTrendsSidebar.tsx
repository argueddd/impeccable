import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, TrendingUp, Activity, Sparkles, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { getDerivedHeatmapData, getKeywordDetails } from '../data';

export function HotTrendsSidebar({ activeNode, onNodeClick, timeRange, sortType }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Use the new heatmap data for rankings based on filters
  const topNodes = useMemo(() => {
    const data = getDerivedHeatmapData(timeRange, sortType);
    return data.keywords.slice(0, 25); // Top 25
  }, [timeRange, sortType]);

  const getStatusIcon = (status, isNew) => {
    if (isNew) return <Sparkles size={12} className="text-fuchsia-500" />;
    if (status === '上升') return <TrendingUp size={12} className="text-red-500" />;
    return <Minus size={12} className="text-slate-400" />;
  };

  return (
    <>
      {/* Collapsed Toggle Button */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => setIsExpanded(true)}
            className="fixed right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl border border-orange-500/30 border-r-0 rounded-l-xl p-2 shadow-[-5px_0_15px_rgba(249,115,22,0.1)] z-30 hover:pr-4 hover:bg-orange-50 transition-all group pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-2">
              <ChevronLeft size={20} className="text-orange-500 group-hover:text-orange-600 transition-colors" />
              <span className="writing-vertical-rl text-[10px] font-bold text-orange-600 tracking-widest uppercase group-hover:text-orange-700 transition-colors">
                热词榜单
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Sidebar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-32 bottom-20 w-80 bg-white/90 backdrop-blur-xl border border-slate-200/60 border-r-0 rounded-l-2xl shadow-[-10px_0_30px_rgba(0,0,0,0.05)] flex flex-col z-30 pointer-events-auto overflow-hidden"
          >
            {/* Edge Highlight */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 via-red-500 to-transparent opacity-70" />

            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/80">
              <h3 className="font-black text-slate-800 text-sm flex items-center gap-2 tracking-widest uppercase ml-2">
                <Activity size={16} className="text-orange-500" />
                {sortType === 'speed' ? '飙升趋势榜' : '全局热度榜'}
                <span className="text-[10px] font-normal text-slate-400 bg-slate-200/50 px-2 py-0.5 rounded-full ml-1">
                  TOP 25
                </span>
              </h3>
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            
            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
              {topNodes.map((node, index) => {
                const isHot = index < 3;
                const isActive = activeNode?.id === node.id;
                
                return (
                  <motion.div
                    key={`${node.id}-${timeRange}-${sortType}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => onNodeClick(getKeywordDetails(node))}
                    className={`relative p-3 rounded-xl cursor-pointer transition-all border ${
                      isActive 
                        ? 'bg-orange-50 border-orange-200 shadow-sm' 
                        : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank Badge */}
                      <div className={`w-6 h-6 shrink-0 rounded-lg flex items-center justify-center text-xs font-black ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-[0_2px_8px_rgba(249,115,22,0.4)]' :
                        index === 1 ? 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700 shadow-sm' :
                        index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-[0_2px_8px_rgba(217,119,6,0.3)]' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <h4 className={`text-sm font-bold truncate ${isActive ? 'text-orange-700' : 'text-slate-700'}`}>
                              {node.keyword}
                            </h4>
                            {isHot && (
                              <Flame size={12} className="text-orange-500 shrink-0" />
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <span className={`text-[10px] font-mono ${node.changeRate > 10 ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                              +{node.changeRate}%
                            </span>
                            {getStatusIcon(node.status, node.isNew)}
                          </div>
                        </div>
                        
                        {/* Heat Bar */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full ${isHot ? 'bg-gradient-to-r from-orange-400 to-red-500' : 'bg-blue-400/80'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${node.heatScore}%` }}
                              transition={{ duration: 1, delay: 0.1 + index * 0.05 }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono w-6 text-right">
                            {node.heatScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}