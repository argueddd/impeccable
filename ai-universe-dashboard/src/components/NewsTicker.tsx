import { Newspaper, BellRing, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NEWS = [
  "中国移动 AI 算力大网调度成功率突破 99.9%",
  "研究院自主研发的百亿级多模态模型正式上线",
  "公司自建智能体平台开发者活跃度创新高",
  "智算中心万卡集群首期建设已顺利交付",
  "全集团首届 AI 开发者大会即将召开",
];

export function NewsTicker() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/60 backdrop-blur-md border-t border-slate-200 z-40 pointer-events-auto h-12 flex items-center overflow-hidden">
      {/* Ticker Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 h-full flex items-center gap-2.5 px-6 shadow-[10px_0_30px_rgba(0,0,0,0.1)] relative z-10 shrink-0">
        <BellRing size={16} className="text-white animate-bounce" />
        <span className="text-white text-xs font-black tracking-widest uppercase">Company News 先知</span>
        <div className="w-px h-6 bg-white/20 ml-2" />
      </div>
      
      {/* Ticker Content */}
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-ticker flex items-center gap-16 px-12 h-full">
          {/* Duplicate for infinite effect */}
          {[...NEWS, ...NEWS].map((news, i) => (
            <div key={i} className="flex items-center gap-4 group cursor-pointer whitespace-nowrap">
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
  );
}
