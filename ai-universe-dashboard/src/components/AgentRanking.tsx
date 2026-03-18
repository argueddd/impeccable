import { Trophy, Bot, LayoutDashboard, ChevronRight, Activity } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RANKINGS = [
  { id: 1, name: "合同智能体", creator: "张三", org: "大同智能体科技", desc: "合同智能体简介...", color: "bg-red-500", glow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]" },
  { id: 2, name: "财务报销智能体", creator: "李四", org: "政企事业部", desc: "一键完成发票查验...", color: "bg-orange-500", glow: "shadow-[0_0_15px_rgba(249,115,22,0.5)]" },
  { id: 3, name: "网络巡检专家", creator: "王五", org: "网络维护中心", desc: "每日自动生成报告...", color: "bg-yellow-400", glow: "shadow-[0_0_15px_rgba(250,204,21,0.5)]" },
  { id: 4, name: "文案生成助手", creator: "赵六", org: "市场营销部", desc: "自动生成营销文案...", color: "bg-slate-400", glow: "" },
  { id: 5, name: "代码审查专家", creator: "钱七", org: "研发中心", desc: "自动化代码规范审查...", color: "bg-slate-400", glow: "" },
];

const DEPT_STATS = [
  { dept: "研究院", agents: 350, calls: 240, color: "from-blue-500 to-cyan-400" },
  { dept: "政企事业部", agents: 210, calls: 180, color: "from-indigo-500 to-blue-400" },
  { dept: "客服中心", agents: 120, calls: 520, color: "from-purple-500 to-indigo-400" },
  { dept: "网络部", agents: 150, calls: 110, color: "from-sky-500 to-teal-400" },
  { dept: "信息技术", agents: 90, calls: 80, color: "from-teal-500 to-emerald-400" },
];

export function AgentRanking() {
  const [activeTab, setActiveTab] = useState<'ranking' | 'stats'>('ranking');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="fixed left-6 top-32 z-30 pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic Container */}
      <motion.div 
        animate={{ 
          width: isHovered ? 340 : 220,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.4)',
          backdropFilter: isHovered ? 'blur(24px)' : 'blur(12px)',
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden relative"
      >
        {/* Tech Edge Highlight */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-500" />

        {/* Minimal Tabs Header */}
        <div className="flex border-b border-slate-200/50 relative">
          <button 
            onClick={() => setActiveTab('ranking')}
            className={`flex-1 py-3 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors z-10 ${activeTab === 'ranking' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Trophy size={14} className={activeTab === 'ranking' ? 'text-orange-500' : ''} />
            活跃排行
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors z-10 ${activeTab === 'stats' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Activity size={14} className={activeTab === 'stats' ? 'text-blue-500' : ''} />
            部门建设
          </button>
          
          {/* Active Tab Indicator (Holographic line) */}
          <motion.div 
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
            initial={false}
            animate={{ 
              left: activeTab === 'ranking' ? '0%' : '50%',
              width: '50%'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Content Area */}
        <div className="p-4 relative">
          <AnimatePresence mode="wait">
            {activeTab === 'ranking' ? (
              <motion.div 
                key="ranking"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {RANKINGS.map((agent, i) => (
                  <div key={agent.id} className="flex items-center gap-3 group">
                    {/* Number Node */}
                    <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black text-white ${agent.color} ${agent.glow} transition-transform group-hover:scale-110`}>
                      {agent.id}
                    </div>
                    
                    {/* Compact Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-800 text-[12px] truncate group-hover:text-blue-600 transition-colors">
                          {agent.name}
                        </h4>
                        {/* Only show creator when hovered */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.span 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-[9px] text-slate-400 font-mono shrink-0 ml-2"
                            >
                              by {agent.creator}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      {/* Subtitle / HUD Bar */}
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            className={`h-full ${agent.color}`} 
                            initial={{ width: 0 }}
                            animate={{ width: `${100 - (i * 15)}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                        <AnimatePresence>
                          {isHovered && (
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-[9px] text-slate-400 truncate max-w-[120px]"
                            >
                              {agent.org}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="stats"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.2 }}
                className="space-y-4 pt-1"
              >
                {DEPT_STATS.map((stat, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[11px] font-bold text-slate-700">{stat.dept}</span>
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 text-[9px] font-mono"
                          >
                            <span className="text-blue-500">{stat.agents} 个</span>
                            <span className="text-indigo-400">{stat.calls}w 次</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    
                    {/* Holographic Dual Data Bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex relative">
                      <motion.div 
                        className={`h-full bg-gradient-to-r ${stat.color} absolute left-0 top-0`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.agents / 400) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                        style={{ zIndex: 2 }}
                      />
                      {/* Secondary metric as a highly transparent background bar */}
                      <motion.div 
                        className="h-full bg-slate-300 absolute left-0 top-0"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.calls / 600) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                        style={{ zIndex: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
