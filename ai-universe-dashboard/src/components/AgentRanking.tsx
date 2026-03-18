import { Trophy, Activity, Network } from 'lucide-react';

const RANKINGS = [
  { dept: "研究院", active: 124, total: 350, calls: "2.4M", trend: "+12%" },
  { dept: "政企事业部", active: 98, total: 210, calls: "1.8M", trend: "+8%" },
  { dept: "客服中心", active: 85, total: 120, calls: "5.2M", trend: "+24%" },
  { dept: "网络部", active: 64, total: 150, calls: "1.1M", trend: "+5%" },
  { dept: "信息技术中心", active: 42, total: 90, calls: "800K", trend: "+2%" },
];

export function AgentRanking() {
  return (
    <div className="fixed right-8 top-32 w-[340px] bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl p-5 z-30 pointer-events-auto">
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Trophy size={16} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-sm">自建智能体风云榜</h3>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-mono mt-0.5">Top Agents Ranking</p>
          </div>
        </div>
      </div>
      
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-400 mb-3 px-2 uppercase tracking-wider">
        <div className="col-span-5">部门</div>
        <div className="col-span-4 text-center">活跃 / 总数</div>
        <div className="col-span-3 text-right">调用量</div>
      </div>
      
      <div className="space-y-2">
        {RANKINGS.map((r, i) => (
          <div key={i} className="group grid grid-cols-12 gap-2 items-center text-xs p-2.5 rounded-xl hover:bg-white transition-all border border-transparent hover:border-slate-100 hover:shadow-sm relative overflow-hidden">
            {/* Rank Number */}
            <div className="col-span-5 font-bold text-slate-700 flex items-center gap-2.5 z-10">
              <span className={`w-5 h-5 flex items-center justify-center rounded-md text-[10px] ${
                i === 0 ? 'bg-yellow-100 text-yellow-600' : 
                i === 1 ? 'bg-slate-200 text-slate-600' : 
                i === 2 ? 'bg-orange-100 text-orange-700' : 
                'bg-slate-50 text-slate-400'
              }`}>
                {i + 1}
              </span>
              <span className="truncate" title={r.dept}>{r.dept}</span>
            </div>
            
            {/* Active / Total */}
            <div className="col-span-4 flex items-center justify-center gap-1 font-mono z-10">
              <span className="text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">{r.active}</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">{r.total}</span>
            </div>
            
            {/* Calls */}
            <div className="col-span-3 text-right font-mono font-black text-slate-800 flex flex-col items-end z-10">
              <span>{r.calls}</span>
              <span className="text-[9px] text-emerald-500 font-medium">{r.trend}</span>
            </div>
            
            {/* Subtle background bar based on calls - just a visual touch */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity -z-0"
              style={{ width: `${(1 - i*0.15) * 100}%` }}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-100 text-center">
        <button className="text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 w-full">
          <Network size={12} /> 查看全网智能体大盘
        </button>
      </div>
    </div>
  );
}
