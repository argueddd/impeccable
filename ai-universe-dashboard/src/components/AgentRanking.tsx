import { Trophy, Bot, LayoutDashboard, ChevronRight, Activity, Building, Users, Info, X, FileText, Calculator, Network, PenTool, Code } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RANKINGS = [
  { id: 1, name: "合同智能体", creator: "张三", org: "大同智能体科技", desc: "自动提取合同关键条款、风险提示并生成审查意见，支持多版本比对。", color: "bg-red-500 text-red-500", glow: "shadow-[0_0_15px_rgba(239,68,68,0.5)]", activeUsers: "1.2w", totalCalls: "240w", icon: FileText },
  { id: 2, name: "财务报销智能体", creator: "李四", org: "政企事业部", desc: "一键完成发票查验、报销单填报与流程审批，内置合规性校验引擎。", color: "bg-orange-500 text-orange-500", glow: "shadow-[0_0_15px_rgba(249,115,22,0.5)]", activeUsers: "8.5k", totalCalls: "180w", icon: Calculator },
  { id: 3, name: "网络巡检专家", creator: "王五", org: "网络维护中心", desc: "每日自动生成全网设备巡检报告，预警隐患，支持一键派发工单。", color: "bg-yellow-400 text-yellow-500", glow: "shadow-[0_0_15px_rgba(250,204,21,0.5)]", activeUsers: "4.2k", totalCalls: "520w", icon: Network },
  { id: 4, name: "文案生成助手", creator: "赵六", org: "市场营销部", desc: "根据产品特性自动生成多平台营销文案素材，支持配图建议。", color: "bg-slate-400 text-slate-500", glow: "", activeUsers: "1.8w", totalCalls: "110w", icon: PenTool },
  { id: 5, name: "代码审查专家", creator: "钱七", org: "研发中心", desc: "自动化代码规范审查、漏洞扫描，并提供重构优化建议代码片段。", color: "bg-slate-400 text-slate-500", glow: "", activeUsers: "2.1k", totalCalls: "80w", icon: Code },
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
  const [selectedAgent, setSelectedAgent] = useState<typeof RANKINGS[0] | null>(null);

  return (
    <>
      <div 
        // Positioned centrally on the left, narrower when collapsed, taller to fit content
        className="fixed left-6 top-1/2 -translate-y-1/2 z-30 pointer-events-auto flex items-center h-[500px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Holographic Container */}
        <motion.div 
          animate={{ 
            width: isHovered ? 380 : 180,
            backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.4)',
            backdropFilter: isHovered ? 'blur(24px)' : 'blur(12px)',
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden relative h-full flex flex-col"
        >
          {/* Tech Edge Highlight */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-indigo-500 to-purple-500" />

          {/* Minimal Tabs Header */}
          <div className="flex border-b border-slate-200/50 relative shrink-0">
            <button 
              onClick={() => setActiveTab('ranking')}
              className={`flex-1 py-4 text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors z-10 ${activeTab === 'ranking' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Trophy size={14} className={activeTab === 'ranking' ? 'text-orange-500' : ''} />
              <span className={isHovered ? 'opacity-100' : 'opacity-0 absolute'}>活跃排行</span>
              <span className={!isHovered ? 'opacity-100' : 'opacity-0 absolute'}>排行</span>
            </button>
            <button 
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-4 text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors z-10 ${activeTab === 'stats' ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Activity size={14} className={activeTab === 'stats' ? 'text-blue-500' : ''} />
              <span className={isHovered ? 'opacity-100' : 'opacity-0 absolute'}>部门建设</span>
              <span className={!isHovered ? 'opacity-100' : 'opacity-0 absolute'}>统计</span>
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
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative">
            <AnimatePresence mode="wait">
              {activeTab === 'ranking' ? (
                <motion.div 
                  key="ranking"
                  initial={{ opacity: 0, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {RANKINGS.map((agent, i) => (
                    <div 
                      key={agent.id} 
                      className="flex items-start gap-3 group cursor-pointer hover:bg-slate-50/50 p-2 rounded-xl transition-colors border border-transparent hover:border-slate-100"
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <div className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center ${agent.color.replace('bg-', 'bg-').replace('500', '50')} ${agent.glow} transition-transform group-hover:scale-110 mt-1 relative border ${agent.color.replace('bg-', 'border-').replace('500', '100')}`}>
                        {/* Number Badge (Moved to top-right of avatar) */}
                        <div className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white ${agent.color.split(' ')[0]} shadow-sm z-10`}>
                          {agent.id}
                        </div>
                        {/* Icon */}
                        <agent.icon size={16} strokeWidth={2.5} className={agent.color.split(' ')[1]} />
                      </div>
                      
                      {/* Info Container */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-slate-800 text-[14px] truncate group-hover:text-blue-600 transition-colors">
                            {agent.name}
                          </h4>
                          {/* HUD Bar visible only when collapsed */}
                          {!isHovered && (
                             <div className="h-1.5 w-12 bg-slate-100 rounded-full overflow-hidden shrink-0 ml-2">
                               <div className={`h-full ${agent.color.split(' ')[0]}`} style={{ width: `${100 - (i * 15)}%` }} />
                             </div>
                          )}
                        </div>
                        
                        {/* Expanded Info (Department & Activity) */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden mt-1.5 space-y-1.5"
                            >
                              <div className="flex items-center justify-between text-[11px] text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Building size={10} className="text-slate-400" /> {agent.org}
                                </span>
                                <span className="font-mono text-slate-400">by {agent.creator}</span>
                              </div>
                              
                              <div className="flex items-center gap-3 text-[11px] font-medium">
                                <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                  <Users size={10} /> {agent.activeUsers} 活跃
                                </span>
                                <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-mono">
                                  <Activity size={10} /> {agent.totalCalls} 调用
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                  className="space-y-5 pt-2"
                >
                  {DEPT_STATS.map((stat, i) => (
                    <div key={i} className="relative">
                      <div className="flex justify-between items-end mb-1.5">
                        <span className="text-[12px] font-bold text-slate-700 truncate mr-2">
                          {isHovered ? stat.dept : stat.dept.slice(0,2)}
                        </span>
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center gap-3 text-[10px] font-mono shrink-0"
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

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" 
              onClick={() => setSelectedAgent(null)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white w-[500px] max-w-[90vw] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
            >
              {/* Top color bar matching agent rank */}
              <div className={`h-1.5 w-full ${selectedAgent.color.split(' ')[0]}`} />
              
              <div className="p-6 pb-2 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white font-black text-[10px] ${selectedAgent.color.split(' ')[0]} shadow-sm z-10`}>
                      {selectedAgent.id}
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedAgent.color.replace('bg-', 'bg-').replace('500', '50')} border ${selectedAgent.color.replace('bg-', 'border-').replace('500', '100')} shadow-inner`}>
                      <selectedAgent.icon size={24} strokeWidth={2} className={selectedAgent.color.split(' ')[1]} />
                    </div>
                  </div>
                   <div>
                     <h2 className="text-xl font-bold text-slate-900">{selectedAgent.name}</h2>
                     <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-medium">
                       <span className="flex items-center gap-1"><Building size={12}/> {selectedAgent.org}</span>
                       <span>•</span>
                       <span>{selectedAgent.creator}</span>
                     </div>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedAgent(null)} 
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 pt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                  <h4 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <Info size={14} className="text-blue-500" /> 智能体描述
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedAgent.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/50">
                    <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Users size={12} /> 当月活跃用户
                    </div>
                    <div className="text-2xl font-black text-slate-800 font-mono">
                      {selectedAgent.activeUsers}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Activity size={12} /> 累计调用量
                    </div>
                    <div className="text-2xl font-black text-slate-800 font-mono">
                      {selectedAgent.totalCalls}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className={`px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-md hover:shadow-lg transition-all ${selectedAgent.color.split(' ')[0]}`}>
                    立即调用
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
