import { DATA_NODES, CATEGORIES } from '../data';

interface SidebarProps {
  activeNode: any;
  onNodeClick: (node: any) => void;
}

export function Sidebar({ activeNode, onNodeClick }: SidebarProps) {
  const categories = DATA_NODES.filter(n => n.isCategory);
  
  return (
    <div className="fixed left-8 top-32 bottom-20 w-72 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-2xl flex flex-col z-30 pointer-events-auto overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 tracking-wide">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          全网热力知识图谱
        </h3>
        <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-mono">Taxonomy Hierarchy</p>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
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
                  className={`w-1.5 h-1.5 rounded-full transition-transform ${isCatActive ? 'scale-150' : 'group-hover:scale-150'}`} 
                  style={{ backgroundColor: catColor, boxShadow: isCatActive ? `0 0 8px ${catColor}` : 'none' }} 
                />
                <span className="group-hover:text-blue-600 transition-colors">{cat.title}</span>
              </div>
              
              {/* Children Word Cloud */}
              <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 pl-3 border-l-2 ml-0.5 transition-colors duration-300" style={{ borderColor: isCatActive ? `${catColor}40` : '#f1f5f9' }}>
                {children.map(child => {
                  const heatScale = Math.min((child.heat || 0) / 12000, 1);
                  const isHot = heatScale > 0.6;
                  const isChildActive = activeNode?.id === child.id;
                  
                  return (
                    <span 
                      key={child.id}
                      onClick={() => onNodeClick(child)}
                      className={`cursor-pointer transition-all hover:scale-110 inline-block ${isChildActive ? 'bg-slate-100 px-1.5 py-0.5 rounded shadow-sm' : ''}`}
                      style={{
                        fontSize: `${11 + heatScale * 5}px`,
                        color: isChildActive ? '#2563eb' : (isHot ? '#f97316' : '#64748b'),
                        opacity: isChildActive ? 1 : (0.6 + heatScale * 0.4),
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
    </div>
  );
}
