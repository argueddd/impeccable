import { Newspaper, BellRing, ArrowRight, X, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const NEWS = [
  "中国移动 AI 算力大网调度成功率突破 99.9%",
  "研究院自主研发的百亿级多模态模型正式上线",
  "公司自建智能体平台开发者活跃度创新高",
  "智算中心万卡集群首期建设已顺利交付",
  "全集团首届 AI 开发者大会即将召开",
];

export function NewsTicker() {
  const [selectedNews, setSelectedNews] = useState<string | null>(null);

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-white/60 backdrop-blur-md border-t border-slate-200 z-40 pointer-events-auto h-12 flex items-center overflow-hidden">
        {/* Ticker Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 h-full flex items-center gap-2.5 px-6 shadow-[10px_0_30px_rgba(0,0,0,0.1)] relative z-10 shrink-0">
          <BellRing size={16} className="text-white animate-bounce" />
          <span className="text-white text-xs font-black tracking-widest uppercase">Company News 先知</span>
          <div className="w-px h-6 bg-white/20 ml-2" />
        </div>
        
        {/* Ticker Content */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-ticker flex items-center gap-16 px-12 h-full hover:[animation-play-state:paused]">
            {/* Duplicate for infinite effect */}
            {[...NEWS, ...NEWS].map((news, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedNews(news)}
                className="flex items-center gap-4 group cursor-pointer whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                <span className="text-slate-600 text-[13px] font-bold group-hover:text-blue-600 transition-colors">
                  {news}
                </span>
                <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            ))}
          </div>
          
          {/* Faders */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white/60 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/60 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* News Detail Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" 
              onClick={() => setSelectedNews(null)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white w-[600px] max-w-[90vw] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
            >
              {/* Decorative top bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              
              <div className="p-6 pb-4 flex items-start justify-between">
                <div className="flex gap-2 items-center mb-4">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider rounded border border-blue-100">内部通告</span>
                  <span className="text-xs text-slate-400 font-mono">2026.03.18</span>
                </div>
                <button 
                  onClick={() => setSelectedNews(null)} 
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-8 pb-8">
                <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-6">
                  {selectedNews}
                </h2>
                
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  <p>
                    各位同事，随着公司在人工智能领域的持续深耕与布局，我们在核心技术攻关和基础设施建设上再次取得了重大突破。本次发布的最新成果，不仅标志着我们在算力调度、大模型自研及智能体生态建设上迈入了一个新的阶段，更将直接赋能各业务条线的数智化转型。
                  </p>
                  <p>
                    未来几周内，相关技术团队将组织多场内部分享会与操作培训。请各部门负责人积极组织人员参与，确保新能力、新工具能够快速落地并产生实际业务价值。
                  </p>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider flex items-center gap-2">
                    <Calendar size={14} className="text-indigo-500" />
                    相关会议与培训安排
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-center justify-between">
                      <span>大模型接入指南与 API 规范解读</span>
                      <span className="font-mono text-slate-400">周三 14:00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>万卡集群算力申请流程宣贯</span>
                      <span className="font-mono text-slate-400">周四 10:00</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>首届智能体开发大赛启动仪式</span>
                      <span className="font-mono text-slate-400">下周一 09:30</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
