import React from 'react';
import { motion } from 'framer-motion';
import { Network } from 'lucide-react';

export function HeatmapControlBar({ onBack }) {
  return (
    <>
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        // Positioned in the top right corner
        className="absolute top-8 right-8 z-30 pointer-events-auto flex items-center gap-6"
      >
        {/* Back to Taxonomy Button - 3D Animated Style */}
        <button 
          onClick={onBack}
          className="relative group w-16 h-16 rounded-full flex items-center justify-center bg-indigo-900 shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all hover:scale-110"
        >
          {/* Orbital Rings - Enhanced */}
          <motion.div 
            className="absolute inset-0 border-2 border-indigo-400/70 rounded-full opacity-50 group-hover:opacity-100 shadow-[inset_0_0_15px_rgba(129,140,248,0.5)]"
            style={{ rotateX: '70deg', rotateY: '15deg' }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-[-6px] border border-indigo-300/40 rounded-full opacity-40 group-hover:opacity-90"
            style={{ rotateX: '55deg', rotateY: '-25deg' }}
            animate={{ rotateZ: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-[-12px] border border-indigo-200/20 rounded-full opacity-0 group-hover:opacity-60"
            style={{ rotateX: '80deg', rotateY: '5deg' }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Core Sphere */}
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-indigo-400 to-indigo-900 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)]" />
          
          {/* Icon - Tree/Network */}
          <Network size={26} className="text-white relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] group-hover:scale-110 transition-transform duration-300" />
          
          {/* Hover Text */}
          <motion.div 
            initial={{ x: 0, opacity: 0, scale: 0.8 }}
            whileHover={{ x: -105, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute right-full mr-5 bg-indigo-950/90 backdrop-blur-md border border-indigo-500/30 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none shadow-[0_0_15px_rgba(79,70,229,0.3)]"
          >
            <span className="text-[12px] font-bold text-indigo-100 tracking-wider">返回知识图谱</span>
          </motion.div>
        </button>
      </motion.div>

      {/* Heat Level Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="absolute left-8 bottom-8 z-30 pointer-events-auto bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      >
        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">热度分级图例</h4>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-ping" />
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
            </div>
            <span className="text-xs font-medium text-slate-700">爆火 (Top 10%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full shadow-[0_0_6px_#eab308]" />
            </div>
            <span className="text-xs font-medium text-slate-700">高热 (Top 25%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className="w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_4px_#38bdf8]" />
            </div>
            <span className="text-xs font-medium text-slate-700">温热 (Top 40%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
            </div>
            <span className="text-xs font-medium text-slate-700">常态</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
