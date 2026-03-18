import { CATEGORIES } from '../data';
import { X, ExternalLink, Activity, BarChart3, Clock, Zap } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface DetailPanelProps {
  node: any;
  onClose: () => void;
}

export function DetailPanel({ node, onClose }: DetailPanelProps) {
  const color = CATEGORIES[node?.type]?.color || '#94a3b8';
  const desc = node?.desc || CATEGORIES[node?.type]?.desc || 'AI 相关技术节点';

  return (
    <AnimatePresence>
      {node && (
        <motion.div 
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 w-[460px] h-full bg-white/95 backdrop-blur-xl border-l border-slate-100 shadow-[-10px_0_40px_rgba(0,0,0,0.05)] z-50 flex flex-col pointer-events-auto"
        >
          {/* Header */}
          <div className="p-8 border-b border-slate-100 relative">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>
            
            <span 
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase"
              style={{ 
                backgroundColor: `${color}15`, 
                color: color 
              }}
            >
              {node.isCategory ? 'Category' : 'Topic'}
            </span>
            
            <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-2">
              {node.title}
            </h2>
            
            <div className="text-sm text-slate-400 flex items-center gap-2">
              <Clock size={14} />
              <span>最后更新: 2024.03.18</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <p className="text-slate-600 leading-relaxed text-base mb-8">
              {desc}
            </p>

            {/* Mock Stats Visualization */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Activity size={14} />
                实时热度监控
              </h4>

              <div className="space-y-4">
                <StatBar label="全网讨论热度" value="12,450" percent={85} color={color} />
                <StatBar label="相关论文发表" value="342" percent={45} color={color} />
                <StatBar label="落地应用案例" value="89" percent={25} color={color} />
              </div>

              {/* Related Links */}
              <div className="pt-8 border-t border-slate-100 mt-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Zap size={14} />
                  关联资源
                </h4>
                <div className="space-y-3">
                  <ResourceLink title="内部知识库文档" color={color} />
                  <ResourceLink title="最新研究报告 PDF" color={color} />
                  <ResourceLink title="相关数据集下载" color={color} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatBar({ label, value, percent, color }: any) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
        <span>{label}</span>
        <span className="text-slate-900">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function ResourceLink({ title, color }: any) {
  return (
    <a href="#" className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all group">
      <span className="text-sm text-slate-600 font-medium group-hover:text-slate-900">{title}</span>
      <ExternalLink size={14} className="text-slate-300 group-hover:text-slate-900" />
    </a>
  );
}