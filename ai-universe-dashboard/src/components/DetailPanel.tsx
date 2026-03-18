import { CATEGORIES, DATA_NODES } from '../data';
import { X, Activity, Clock, Zap, Flame, Newspaper, ArrowRight, TrendingUp, Users, Cpu, Network, MessageSquare, Share2 } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface DetailPanelProps {
  node: any;
  onClose: () => void;
}

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

  // Determine what to render based on whether it's a main category or a sub-topic
  const isCategory = node?.isCategory;

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
              
              <span 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase border"
                style={{ 
                  backgroundColor: `${color}10`, 
                  color: color,
                  borderColor: `${color}30`
                }}
              >
                {isCategory ? <Network size={12} /> : <Zap size={12} />}
                {isCategory ? '领域枢纽 (Category)' : '技术节点 (Topic)'}
              </span>
              
              <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-3">
                {node.title}
              </h2>
              
              <p className="text-slate-600 leading-relaxed text-sm">
                {desc}
              </p>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/50">
              
              {/* Conditional Rendering: Main Category gets Stats, Sub-nodes get richer News */}
              {isCategory ? (
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
      
      <div className="space-y-5 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {MOCK_NEWS.map((news, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.1, type: "spring", stiffness: 260, damping: 20 }}
            key={news.id}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            {/* Timeline Dot */}
            <div 
              className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-50 bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110"
              style={{ color: color }}
            >
              <Zap size={14} fill={idx === 0 ? color : "none"} />
            </div>
            
            {/* News Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group-hover:border-slate-300">
              {/* Highlight strip on the edge */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-opacity-100 transition-colors" style={{ backgroundColor: idx === 0 ? color : 'transparent' }} />
              
              <div className="flex items-center gap-2 mb-2">
                {news.hot && (
                  <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-500 border border-red-100">
                    HOT
                  </span>
                )}
                <span className="text-xs font-bold text-slate-400">{news.time}</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs font-medium text-slate-500">{news.source}</span>
              </div>
              
              <h3 className="font-bold text-[15px] text-slate-800 leading-snug mb-2 group-hover:text-blue-600 transition-colors">
                {news.title}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-3">
                {news.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {news.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-medium rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <button className="px-6 py-2.5 rounded-full border border-slate-300 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm transition-all inline-flex items-center gap-2">
          加载更多 <ArrowRight size={14} />
        </button>
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