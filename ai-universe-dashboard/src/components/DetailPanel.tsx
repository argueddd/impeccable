import { CATEGORIES, DATA_NODES } from '../data';
import { X, Activity, Clock, Zap, Flame, Newspaper, ArrowRight, ArrowLeft, TrendingUp, Users, Cpu, Network, MessageSquare, Share2, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface DetailPanelProps {
  node: any;
  onClose: () => void;
}

// A simple sparkline chart component using SVG for heatmap nodes
const SparklineChart = ({ data, color }: { data: any[], color: string }) => {
  if (!data || data.length === 0) return null;
  
  const min = Math.min(...data.map(d => d.value));
  const max = Math.max(...data.map(d => d.value));
  const range = max - min || 1;
  
  const width = 200;
  const height = 40;
  
  // Create SVG path
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.value - min) / range) * height;
    return `${x},${y}`;
  });
  
  const pathData = `M ${points.join(' L ')}`;
  const areaData = `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;
  
  return (
    <div className="w-full h-16 flex items-end">
      <svg width="100%" height="100%" viewBox={`0 -5 ${width} ${height + 10}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaData} fill={`url(#gradient-${color.replace('#', '')})`} />
        <path d={pathData} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Current Value Dot */}
        {points.length > 0 && (
          <circle 
            cx={width} 
            cy={height - ((data[data.length - 1].value - min) / range) * height} 
            r="3" 
            fill={color} 
          />
        )}
      </svg>
    </div>
  );
};

// Mock news data with richer details for sub-nodes
const MOCK_NEWS = [
  { 
    id: 1, 
    title: 'GPT-5 内部测试指标流出，多模态推理能力大幅跃升', 
    summary: '据内部人员透露，新一代模型在视觉推理、长文本逻辑连贯性上提升显著。尤其在零样本代码生成任务中，通过率突破了85%的大关。',
    time: '10分钟前', 
    source: 'AI前沿', 
    hot: true,
    tags: ['大模型', 'GPT-5', '多模态']
  },
  { 
    id: 2, 
    title: '国产大模型集体降价，API 调用成本逼近零边界', 
    summary: '继上个月的降价潮后，国内多家头部大模型厂商再次下调 API 价格。部分厂商甚至宣布轻量级模型永久免费，此举预计将极大加速 AI 应用落地。',
    time: '2小时前', 
    source: '行业动态', 
    hot: false,
    tags: ['商业化', 'API', '降价']
  },
  { 
    id: 3, 
    title: '最新研究：通过 RAG 架构解决领域幻觉率下降至 2.1%', 
    summary: '斯坦福大学最新论文展示了一种基于动态图谱检索的增强生成架构，在医疗和法律等垂直领域，成功将模型的幻觉率压低至商用安全线以下。',
    time: '昨天', 
    source: '学术论文', 
    hot: false,
    tags: ['RAG', '学术', '安全']
  },
  { 
    id: 4, 
    title: '首个开源的 Agent-to-Agent 协同协议正式发布', 
    summary: '该协议允许不同厂商、不同架构的智能体之间进行无缝对话和任务交接，被业内认为是迈向通用人工智能协同生态的重要一步。',
    time: '3天前', 
    source: '开源社区', 
    hot: true,
    tags: ['A2A', '开源', 'Agent']
  }
];

export function DetailPanel({ node, onClose, onTopicClick }: DetailPanelProps & { onTopicClick: (id: string) => void }) {
  const color = CATEGORIES[node?.type]?.color || '#94a3b8';
  const desc = node?.desc || CATEGORIES[node?.type]?.desc || 'AI 相关技术节点';

  const [commentState, setCommentState] = useState<{isOpen: boolean, topicName: string, topicColor: string}>({
    isOpen: false,
    topicName: '',
    topicColor: ''
  });

  const handleOpenComments = (topicName: string, topicColor: string) => {
    setCommentState({ isOpen: true, topicName, topicColor });
  };

  const handleCloseComments = () => {
    setCommentState(prev => ({ ...prev, isOpen: false }));
  };

  // Determine what to render based on whether it's a main category, a sub-topic, or a heatmap node
  const isCategory = node?.isCategory;
  const isHeatmapNode = node?.hasOwnProperty('heatScore');
  const parentNode = (!isCategory && !isHeatmapNode && node?.parent) ? DATA_NODES.find(n => n.id === node.parent) : null;

  return (
    <>
      <AnimatePresence>
        {node && (
          <motion.div 
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-[500px] h-full bg-white/90 backdrop-blur-2xl border-l border-white/20 shadow-[-20px_0_60px_rgba(0,0,0,0.08)] z-50 flex flex-col pointer-events-auto"
          >
            {/* Top Decorative Line */}
            <div className="h-1 w-full absolute top-0 left-0" style={{ backgroundColor: color }} />

            {/* Header */}
            <div className="p-8 pb-6 relative z-10 border-b border-slate-100/50">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100/50 hover:bg-slate-200 text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={20} />
              </button>
              
              {/* Back to Parent Button for Sub-nodes (Taxonomy only) */}
              {!isCategory && !isHeatmapNode && parentNode && (
                <button 
                  onClick={() => onTopicClick(parentNode.id)}
                  className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft size={14} /> 返回上级: {parentNode.title}
                </button>
              )}

              {/* Tag indicator */}
              {isCategory && !isHeatmapNode && (
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase border"
                  style={{ 
                    backgroundColor: `${color}10`, 
                    color: color,
                    borderColor: `${color}30`
                  }}
                >
                  <Network size={12} />
                  领域枢纽 (Category)
                </span>
              )}
              {!isCategory && !isHeatmapNode && !parentNode && (
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase border"
                  style={{ 
                    backgroundColor: `${color}10`, 
                    color: color,
                    borderColor: `${color}30`
                  }}
                >
                  <Zap size={12} />
                  技术节点 (Topic)
                </span>
              )}
              {isHeatmapNode && (
                <span 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase border"
                  style={{ 
                    backgroundColor: `${color}10`, 
                    color: color,
                    borderColor: `${color}30`
                  }}
                >
                  <Flame size={12} />
                  热词洞察 (Trend Insight)
                </span>
              )}
              
              <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-3">
                {isHeatmapNode ? node.keyword : node.title}
              </h2>
              
              {!isHeatmapNode && (
                <p className="text-slate-600 leading-relaxed text-sm">
                  {desc}
                </p>
              )}
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
              
              {/* Conditional Rendering: Main Category gets Stats, Sub-nodes get richer News, Heatmap nodes get Trends */}
              {isHeatmapNode ? (
                <HeatmapDetailFeed color={color} node={node} />
              ) : isCategory ? (
                <CategoryDashboard color={color} node={node} onTopicClick={onTopicClick} onOpenComments={handleOpenComments} />
              ) : (
                <TopicNewsFeed color={color} node={node} onOpenComments={handleOpenComments} />
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {commentState.isOpen && (
          <CommentModal 
            topicName={commentState.topicName} 
            color={commentState.topicColor} 
            onClose={handleCloseComments} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================================
// COMPONENT: Dashboard for Main Categories (Big Nodes)
// ============================================================================
function CategoryDashboard({ color, node, onTopicClick, onOpenComments }: { color: string, node: any, onTopicClick: (id: string) => void, onOpenComments: (topicName: string, color: string) => void }) {
  // Find top trending sub-topics for this category
  const subTopics = DATA_NODES.filter(n => n.parent === node.id)
    .map(n => ({
      ...n,
      trend: Math.floor(Math.random() * 40) + 5
    }))
    .sort((a, b) => (b.heat || 0) - (a.heat || 0))
    .slice(0, 4); // Top 4
    
  // Calculate total heat for the category
  const totalHeat = DATA_NODES.filter(n => n.parent === node.id).reduce((sum, n) => sum + (n.heat || 0), 0);

  return (
    <div className="p-8 space-y-8">
      {/* Dynamic Heat/Activity Section */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/60 shadow-sm relative overflow-hidden">
        <div className="absolute -right-4 -top-4 text-slate-100">
          <Activity size={120} strokeWidth={1} />
        </div>
        
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
          <Flame size={16} className="text-orange-500 animate-pulse" />
          全网领域热度指数
        </h4>
        
        <div className="flex items-end gap-3 relative z-10">
          <div className="text-5xl font-black tracking-tighter text-slate-900 font-mono">
            <AnimatedCounter value={totalHeat} />
          </div>
          <div className="mb-2 flex items-center text-emerald-500 text-sm font-bold bg-emerald-50 px-2 py-0.5 rounded">
            <TrendingUp size={14} className="mr-1" />
            +24.5%
          </div>
        </div>
        
        {/* Dynamic Soundwave/Equalizer Animation */}
        <div className="mt-8 flex items-end gap-1.5 h-16 relative z-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm opacity-80"
              style={{ backgroundColor: color }}
              animate={{ 
                height: ['20%', `${Math.random() * 80 + 20}%`, '20%']
              }}
              transition={{
                duration: Math.random() * 1.5 + 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* Trending Topics Ranking */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Zap size={16} />
          该领域下最火技术节点
        </h4>
        <div className="space-y-3">
          {subTopics.map((topic, idx) => (
            <div 
              key={topic.id} 
              onClick={() => onTopicClick(topic.id)}
              className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-slate-200 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: `${color}15`, color: color }}
                >
                  #{idx + 1}
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{topic.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onOpenComments(topic.title, color); }}
                      className="flex items-center gap-1 hover:text-blue-500 transition-colors bg-slate-50 px-1.5 py-0.5 rounded"
                    >
                      <MessageSquare size={10} /> {(topic.heat || 0).toLocaleString()} 讨论
                    </button>
                    <span className="flex items-center gap-1 text-orange-500"><Flame size={10} /> +{topic.trend}% 飙升</span>
                  </div>
                </div>
              </div>
              <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Viral Insight / AI Summary */}
      <div>
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Share2 size={16} />
          AI 舆情洞察
        </h4>
        <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />
          <p className="text-sm text-slate-600 leading-relaxed">
            近期关于 <strong style={{ color }}>{node.title}</strong> 的讨论主要集中在商业化落地成本与开源架构的优劣对比上。超过 60% 的新资讯提及了 API 降价带来的开发者生态繁荣，预计下个月该话题热度将继续保持 <strong>高位震荡</strong>。
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: News Feed for Sub Topics (Small Nodes)
// ============================================================================
function TopicNewsFeed({ color, node, onOpenComments }: { color: string, node: any, onOpenComments: (topicName: string, color: string) => void }) {
  // Use the node's real heat if available, otherwise mock it
  const nodeHeat = node.heat || 1240;
  const nodeTrend = Math.floor(Math.random() * 20) + 5;

  return (
    <div className="p-8">
      {/* Node specific heat mini-dashboard */}
      <div className="mb-8 p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 text-slate-50 opacity-50 pointer-events-none">
          <Activity size={100} strokeWidth={2} />
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <MessageSquare size={12} />
            当前话题讨论热度
          </h4>
          <div className="flex items-baseline gap-2">
            <button 
              onClick={() => onOpenComments(node.title, color)}
              className="text-3xl font-black text-slate-800 font-mono tracking-tight hover:text-blue-600 transition-colors flex items-center gap-2 group"
              title="点击查看评论区"
            >
              <AnimatedCounter value={nodeHeat} />
              <MessageSquare size={16} className="text-slate-300 group-hover:text-blue-500" />
            </button>
            <span className="text-xs font-bold text-orange-500 flex items-center bg-orange-50 px-1.5 py-0.5 rounded">
              <Flame size={10} className="mr-0.5" />
              +{nodeTrend}% 飙升中
            </span>
          </div>
        </div>

        {/* Mini soundwave for subtopic */}
        <div className="flex items-end gap-1 h-8 w-24">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm opacity-60"
              style={{ backgroundColor: color }}
              animate={{ height: ['20%', `${Math.random() * 80 + 20}%`, '20%'] }}
              transition={{ duration: Math.random() * 1 + 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Newspaper size={16} />
          最新关联资讯
        </h4>
        <div className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
          自动过滤无效信息
        </div>
      </div>
      
      {/* Cyberpunk Geometry Layout */}
      <div className="space-y-4 pb-12">
        {MOCK_NEWS.map((news, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 200, damping: 20 }}
            key={news.id}
            className="group cursor-pointer relative"
          >
            {/* Cyber Card Background with scanlines and dots */}
            <div className="w-full p-5 bg-white border border-slate-200 shadow-sm transition-all duration-300 relative overflow-hidden clip-path-cyber group-hover:border-slate-300 group-hover:bg-slate-50/50">
              
              {/* Scanline & Dot Pattern Overlays */}
              <div className="absolute inset-0 bg-scanlines opacity-50 pointer-events-none"></div>
              <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none"></div>
              
              {/* Thick Neon Accent Line */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 group-hover:w-2" 
                style={{ 
                  backgroundColor: news.hot ? color : '#cbd5e1',
                  boxShadow: news.hot ? `0 0 10px ${color}80` : 'none'
                }} 
              />
              
              {/* Geometric Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-slate-200 group-hover:border-slate-400 transition-colors pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-3 relative z-10">
                {news.hot && (
                  <span 
                    className="shrink-0 px-2 py-0.5 text-[10px] font-black bg-red-500 text-white tracking-widest clip-path-cyber-tag shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                  >
                    HOT
                  </span>
                )}
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[10px] font-bold text-slate-400 tracking-widest">{news.time}</span>
                  <span className="text-[10px] text-slate-300">//</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{news.source}</span>
                </div>
              </div>
              
              <h3 className="font-bold text-[14px] text-slate-800 leading-snug mb-3 transition-colors relative z-10 pr-4">
                <span className="group-hover:cyber-glitch-text inline-block transition-colors group-hover:text-blue-600">
                  {news.title}
                </span>
              </h3>
              
              <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2 relative z-10 font-medium">
                {news.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4 relative z-10">
                {news.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-0.5 bg-slate-100/80 border border-slate-200 text-slate-500 text-[10px] font-bold rounded-sm uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="px-6 py-2.5 rounded-full border border-slate-300 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all inline-flex items-center gap-2 relative z-50 bg-slate-50/50 backdrop-blur-sm">
          加载更多 <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: Detail Feed for Heatmap Nodes (Trends + News)
// ============================================================================
function HeatmapDetailFeed({ color, node }: { color: string, node: any }) {
  const [trendRange, setTrendRange] = useState('day'); // day, week, month

  // Determine trend color based on status
  const trendColor = node.status === '上升' ? '#ef4444' : node.isNew ? '#d946ef' : '#3b82f6';

  return (
    <div className="p-8 space-y-8">
      {/* Heat Metrics */}
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center">
          <span className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1"><Flame size={12} className="text-orange-500" /> 热度值</span>
          <span className="text-2xl font-black text-slate-800 font-mono">{node.heatScore}</span>
        </div>
        <div className="flex-1 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center">
          <span className="text-xs font-bold text-slate-400 mb-1 flex items-center gap-1"><TrendingUp size={12} style={{ color: trendColor }} /> 较上期</span>
          <span className="text-xl font-bold font-mono" style={{ color: trendColor }}>
            {node.changeRate > 0 ? '+' : ''}{node.changeRate}%
          </span>
        </div>
      </div>

      {/* Trend Chart */}
      {node.trend && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} />
              全网热度趋势
            </h4>
            
            {/* Trend Range Toggle */}
            <div className="flex bg-slate-100 rounded-md p-1 border border-slate-200">
              {['day', 'week', 'month'].map(range => (
                <button
                  key={range}
                  onClick={() => setTrendRange(range)}
                  className={`px-3 py-1 text-[11px] font-bold rounded transition-all ${
                    trendRange === range 
                      ? 'bg-white text-slate-800 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {range === 'day' ? '日' : range === 'week' ? '周' : '月'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative overflow-hidden">
            <SparklineChart 
              data={node.trend[trendRange]} 
              color={node.heatScore > 80 ? '#f97316' : '#38bdf8'} 
            />
            <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-mono font-bold">
              <span>{node.trend[trendRange][0].date}</span>
              <span>{node.trend[trendRange][node.trend[trendRange].length - 1].date}</span>
            </div>
          </div>
        </div>
      )}

      {/* Associated News */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Newspaper size={16} />
            关键资讯溯源
          </h4>
          {node.newsCount && (
            <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              {node.newsCount} 篇关联报道
            </span>
          )}
        </div>
        
        <div className="space-y-3">
          {(node.newsList || []).map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id} 
              className="group cursor-pointer bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-slate-300"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-bold text-slate-800 text-[13px] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 flex-1">
                  {item.title}
                </h4>
                <ExternalLink size={14} className="text-slate-300 group-hover:text-blue-500 shrink-0 mt-0.5" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-3">
                {item.summary}
              </p>
              <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">{item.sourceName}</span>
                <span>{item.publishTime}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Simple Counter Animation Component
function AnimatedCounter({ value }: { value: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-block font-mono"
    >
      {value.toLocaleString()}
    </motion.span>
  );
}

// ============================================================================
// COMPONENT: Comment Modal (评论区弹窗)
// ============================================================================
function CommentModal({ onClose, topicName, color }: { onClose: () => void, topicName: string, color: string }) {
  // Mock comments
  const comments = [
    { user: "AI探索者", time: "10分钟前", content: "这个技术落地成本还是太高了，中小企业玩不起啊。", likes: 128 },
    { user: "架构师老王", time: "1小时前", content: "其实只要做好算力调度，边缘侧也能跑得不错。期待开源社区的进一步优化。", likes: 89 },
    { user: "CyberPunk", time: "2小时前", content: "幻觉问题解决不了，在医疗金融领域就永远只能是辅助工具。", likes: 256 },
    { user: "数据挖掘机", time: "半天前", content: "同意楼上，高质量数据集才是王道，现在的瓶颈根本不在模型本身。", likes: 45 },
    { user: "极客李", time: "昨天", content: "未来必定是多模态的天下，单纯的文本模型很快就会遇到天花板。", likes: 312 },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-auto">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white w-[500px] max-w-[90vw] h-[600px] max-h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare size={18} style={{ color }} />
              {topicName} 讨论区
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <Activity size={10} className="text-emerald-500" />
              全网实时热议内容聚合
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 custom-scrollbar">
          {comments.map((comment, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="flex gap-4 group"
            >
              {/* Avatar */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${color} 0%, #334155 100%)` }}
              >
                {comment.user[0]}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-700">{comment.user}</span>
                  <span className="text-xs text-slate-400">{comment.time}</span>
                </div>
                <div className="bg-white p-3 rounded-xl rounded-tl-none border border-slate-100 shadow-sm mb-2 text-sm text-slate-600 leading-relaxed group-hover:border-slate-200 transition-colors">
                  {comment.content}
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 ml-1">
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <TrendingUp size={12} /> {comment.likes} 赞同
                  </button>
                  <button className="flex items-center gap-1 hover:text-slate-600 transition-colors">
                    回复
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)] relative z-10">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="发布你的见解..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-100 transition-all"
            />
            <button 
              className="absolute right-2 p-2 rounded-full text-white transition-colors hover:scale-105 active:scale-95"
              style={{ backgroundColor: color }}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}