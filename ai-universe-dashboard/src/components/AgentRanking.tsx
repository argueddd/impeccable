import { Trophy, Activity, Network, Bot, Users, LayoutDashboard, BarChart2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RANKINGS = [
  { 
    id: 1,
    name: "合同智能体", 
    creator: "张三",
    org: "大同智能体科技有限合伙人公司...",
    desc: "合同智能体简介合同智能体简介合同智能...",
    color: "bg-red-500",
    shadow: "shadow-red-500/30"
  },
  { 
    id: 2,
    name: "财务报销智能体", 
    creator: "李四",
    org: "政企事业部财务中心...",
    desc: "一键完成发票查验、报销单填报与流程审批...",
    color: "bg-orange-500",
    shadow: "shadow-orange-500/30"
  },
  { 
    id: 3,
    name: "网络巡检专家", 
    creator: "王五",
    org: "网络维护中心核心网室...",
    desc: "每日自动生成全网设备巡检报告，预警隐患...",
    color: "bg-yellow-400",
    shadow: "shadow-yellow-400/30"
  },
  { 
    id: 4,
    name: "文案生成助手", 
    creator: "赵六",
    org: "市场营销部策划组...",
    desc: "根据产品特性自动生成多平台营销文案素材...",
    color: "bg-slate-300",
    shadow: "shadow-slate-300/30"
  },
];

const DEPT_STATS = [
  { dept: "研究院", agents: 350, calls: 240 },
  { dept: "政企事业部", agents: 210, calls: 180 },
  { dept: "客服中心", agents: 120, calls: 520 },
  { dept: "网络部", agents: 150, calls: 110 },
  { dept: "信息技术", agents: 90, calls: 80 },
];

export function AgentRanking() {
  const [activeTab, setActiveTab] = useState<'ranking' | 'stats'>('ranking');

  return (
    <div className="fixed left-8 top-32 w-[380px] bg-white/90 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.06)] rounded-2xl flex flex-col z-30 pointer-events-auto overflow-hidden">
      
      {/* Tabs Header */}
      <div className="flex border-b border-slate-100 bg-slate-50/50">
        <button 
          onClick={() => setActiveTab('ranking')}
          className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'ranking' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Bot size={18} />
          活跃智能体排行榜
          {activeTab === 'ranking' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'stats' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <BarChart2 size={18} />
          标杆智能体发布
          {activeTab === 'stats' && (
            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
          )}
        </button>
      </div>
      
      {/* Content Area */}
      <div className="p-5 overflow-y-auto custom-scrollbar h-[450px]">
        <AnimatePresence mode="wait">
          {activeTab === 'ranking' ? (
            <motion.div 
              key="ranking"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {RANKINGS.map((agent, i) => (
                <div key={agent.id} className="flex gap-4 group cursor-pointer border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                  {/* Left Column: Medal & Icon */}
                  <div className="flex flex-col items-center gap-2 w-16 shrink-0">
                    <div className="relative">
                      {/* CSS-drawn Medal */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs shadow-lg ${agent.color} ${agent.shadow} relative z-10`}>
                        {agent.id}
                      </div>
                      {/* Ribbon tails for top 3 */}
                      {i < 3 && (
                        <>
                          <div className={`absolute -bottom-2 -left-1 w-3 h-4 ${agent.color} brightness-75 -skew-y-12 rounded-bl-sm z-0`} />
                          <div className={`absolute -bottom-2 -right-1 w-3 h-4 ${agent.color} brightness-75 skew-y-12 rounded-br-sm z-0`} />
                        </>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium text-center mt-1 group-hover:text-slate-600 transition-colors">
                      智能体图标
                    </div>
                  </div>

                  {/* Right Column: Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 text-[13px] truncate mb-1.5 group-hover:text-blue-600 transition-colors">
                      {agent.name}
                    </h4>
                    <div className="space-y-1">
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <span className="text-slate-400">创建人:</span>
                        {agent.creator}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                        <span className="text-slate-400">组织:</span>
                        <span className="truncate">{agent.org}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-1">
                        {agent.desc}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="stats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                  <LayoutDashboard size={14} className="text-blue-500" />
                  部门智能体建设与调用分析
                </h4>
              </div>

              {/* Custom Bar Chart */}
              <div className="flex-1 flex items-end gap-3 pb-6 border-b border-slate-100 relative">
                {/* Y-axis guidelines */}
                <div className="absolute left-0 w-full h-full flex flex-col justify-between pointer-events-none z-0">
                  <div className="border-t border-slate-100/50 w-full"></div>
                  <div className="border-t border-slate-100/50 w-full"></div>
                  <div className="border-t border-slate-100/50 w-full"></div>
                  <div className="border-t border-slate-100/50 w-full"></div>
                  <div className="border-t border-slate-200 w-full"></div>
                </div>

                {DEPT_STATS.map((stat, i) => {
                  const maxAgents = 400;
                  const maxCalls = 600;
                  const agentHeight = (stat.agents / maxAgents) * 100;
                  const callHeight = (stat.calls / maxCalls) * 100;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group z-10">
                      <div className="flex items-end gap-1 h-40 w-full justify-center">
                        {/* Agents Bar */}
                        <div className="relative w-4 group-hover:w-5 transition-all duration-300 flex items-end justify-center">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${agentHeight}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
                            className="w-full bg-blue-500 rounded-t-sm shadow-sm"
                          />
                          {/* Tooltip on hover */}
                          <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {stat.agents} 个
                          </div>
                        </div>
                        {/* Calls Bar */}
                        <div className="relative w-4 group-hover:w-5 transition-all duration-300 flex items-end justify-center">
                          <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${callHeight}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 + 0.2, type: "spring" }}
                            className="w-full bg-indigo-300 rounded-t-sm shadow-sm"
                          />
                           {/* Tooltip on hover */}
                           <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {stat.calls} 万次
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 text-center w-full truncate px-1" title={stat.dept}>
                        {stat.dept.replace('事业部','').replace('中心','')}
                      </span>
                    </div>
                  )
                })}
              </div>
              
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="w-3 h-3 rounded-sm bg-blue-500" /> 智能体总数
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span className="w-3 h-3 rounded-sm bg-indigo-300" /> 调用量 (万次)
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
}
