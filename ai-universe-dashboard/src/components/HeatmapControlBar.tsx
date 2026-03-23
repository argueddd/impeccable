import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Flame } from 'lucide-react';

export function HeatmapControlBar({ onBack, timeRange, setTimeRange, sortType, setSortType }) {
  return (
    <>
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        // Positioned exactly in the center, top
        className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-6"
      >
        {/* Back to Taxonomy Button - Light Theme */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-white hover:border-indigo-200 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.05)] group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[13px] font-bold tracking-wider">返回知识图谱</span>
        </button>

        {/* Control Panel - Light Theme */}
        <div className="flex items-center bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-full p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          
          {/* Time Range Selector */}
          <div className="flex items-center bg-slate-100/80 rounded-full p-1 mr-3">
            {['week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                  timeRange === range 
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/50' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                {range === 'week' ? '本周' : range === 'month' ? '本月' : '全年'}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-[1px] h-5 bg-slate-200 mx-1" />

          {/* Sort Type Selector */}
          <div className="flex items-center gap-1.5 px-2">
            <button
              onClick={() => setSortType('heat')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                sortType === 'heat'
                  ? 'text-orange-600 bg-orange-50 border border-orange-100'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Flame size={14} className={sortType === 'heat' ? 'text-orange-500' : 'text-slate-400'} />
              热度榜
            </button>
            <button
              onClick={() => setSortType('speed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                sortType === 'speed'
                  ? 'text-sky-600 bg-sky-50 border border-sky-100'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <TrendingUp size={14} className={sortType === 'speed' ? 'text-sky-500' : 'text-slate-400'} />
              飙升榜
            </button>
          </div>
        </div>
      </motion.div>

      {/* Heat Level Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute left-8 bottom-8 z-30 pointer-events-auto bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      >
        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">热度分级图例</h4>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className="absolute inset-0 bg-orange-500 rounded-full opacity-20 animate-ping" />
              <div className="w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]" />
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
          <div className="w-full h-[1px] bg-slate-100 my-1" />
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className="w-2.5 h-2.5 bg-fuchsia-500 rounded-full shadow-[0_0_6px_#ec4899]" />
            </div>
            <span className="text-xs font-medium text-slate-700">新晋上榜</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
