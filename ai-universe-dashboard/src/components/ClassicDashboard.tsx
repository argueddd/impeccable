// @ts-nocheck
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, User, Search, ChevronDown, Download, ExternalLink, Filter, Check, Crown, ChevronRight, Zap, X } from 'lucide-react';

// Brand colors
const BRAND_BLUE = '#0066cc';

const MOCK_CATEGORIES = [
  {
    id: 'c1',
    name: '模型演进',
    sub: ['自然语言处理', '计算机视觉', '强化学习', '推荐算法', '搜索与推荐', '大模型']
  },
  {
    id: 'c2',
    name: '智能体与自动化',
    sub: ['MCP', 'A2A', 'Skill', '开发框架', '知识库', '智能体组件']
  },
  {
    id: 'c3',
    name: '硬件终端与具身智能',
    sub: ['智能穿戴设备', '智能驾驶', '人形机器人', '工业机器人']
  },
  {
    id: 'c4',
    name: '行业应用解决方案',
    sub: ['智慧城市', '智慧交通', '数字政府', '智慧文旅', '智慧园区', '智慧医疗', '智慧金融', '自智网络']
  },
  {
    id: 'c5',
    name: 'AI安全',
    sub: ['法律法规', '版权保护', '数据安全', '伦理安全', '大模型幻觉']
  },
  {
    id: 'c6',
    name: '数据要素',
    sub: ['可信空间', '数联网', '高质量数据集', '数据治理', '数据挖掘', 'ETL', '数据库']
  },
  {
    id: 'c7',
    name: '自智网络',
    sub: ['移动内部', '移动外宣']
  },
  {
    id: 'c8',
    name: '智算资源',
    sub: ['NPU', 'GPU', 'CPU', '算力集群', '云计算', '边缘计算', '算力调度', '分布式训练']
  }
];

const mockAgents = [
  { 
    id: 1, 
    name: '合规智能体', 
    creator: '张三', 
    org: '大同智能科技...', 
    desc: '应用于企业法务、合同审查、内控合规风险排查等核心场景。', 
    rank: 1, 
    medalColor: '#ef4444',
    details: {
      scenario: '企业法务、合同审查、内控合规风险排查等场景。',
      landing: '已在多个省级分公司落地，累计审查合同超过10万份，风险识别准确率98%。',
      team: '由数智化部AI研发中心合规团队倾力打造，团队成员包含AI算法工程师及资深法务专家。'
    }
  },
  { 
    id: 2, 
    name: '网络优化智能体', 
    creator: '李四', 
    org: '网络运营中心', 
    desc: '基于大模型意图识别的基站告警根因分析与自动排障。', 
    rank: 2, 
    medalColor: '#f97316',
    details: {
      scenario: '5G基站告警分析、光缆中断自动路由切换、日常巡检报告生成。',
      landing: '在三个地市试点运行，工单处理效率提升40%，一线运维人力节省30%。',
      team: '联合网络部与设备厂商共同研发，拥有多项核心专利。'
    }
  },
  { 
    id: 3, 
    name: '政企营销助手', 
    creator: '王五', 
    org: '政企客户部', 
    desc: '自动生成客户画像与个性化营销方案，辅助一线人员拓客。', 
    rank: 3, 
    medalColor: '#eab308',
    details: {
      scenario: '招投标书智能撰写、客户需求意图洞察、竞品动态分析。',
      landing: '全省推广使用中，月均生成方案超5000份，中标率同比提升15%。',
      team: '政企支撑中心数据挖掘组负责模型微调与数据迭代。'
    }
  },
  { 
    id: 4, 
    name: '智能客服助手', 
    creator: '赵六', 
    org: '客服中心', 
    desc: '全渠道智能应答与多轮复杂对话处理，提升用户服务体验。', 
    rank: 4, 
    medalColor: 'transparent',
    details: {
      scenario: '话费查询、业务办理指引、投诉初步安抚。',
      landing: '已全面接入APP与微信公众号，客服拦截率达到65%。',
      team: '客服中心联合AI研发部共同打造，支持方言识别。'
    }
  },
  { 
    id: 5, 
    name: '数据分析专家', 
    creator: '钱七', 
    org: '数智化部', 
    desc: '基于自然语言的数据查询与可视化图表自动生成，降低数据消费门槛。', 
    rank: 5, 
    medalColor: 'transparent',
    details: {
      scenario: '经营日报生成、异常指标归因分析、自助提数。',
      landing: '在多个业务部门推广使用，报表开发需求下降30%。',
      team: '由数智化部数据中台团队主导研发。'
    }
  },
];

const mockDynamics = [
  { 
    title: '全省首个 5G-A 智慧工厂落地西安高新区', 
    date: '2026.02.16', 
    category: '工业智造',
    content: '近日，陕西移动联合生态合作伙伴在西安高新区成功落地全省首个 5G-A 智慧工厂项目。该项目引入了最新的大模型调度系统，实现了产线设备的毫秒级协同与预测性维护。预计年产能提升20%，不良品率下降15%。'
  },
  { 
    title: '客服中心引入大模型，工单处理效率提升40%', 
    date: '2026.02.14', 
    category: '服务升级',
    content: '通过引入自研的行业大模型，陕西移动客服中心成功上线了智能工单分发与自动回复辅助系统。试运行一个月以来，一线客服人员的单均处理时长下降了40%，客户满意度显著提升，标志着服务体系全面迈入智能化时代。'
  },
  { 
    title: '算力网络调度平台 V2.0 成功上线运行', 
    date: '2026.02.10', 
    category: '基础设施',
    content: '算力网络调度平台 V2.0 正式上线。新版本全面融合了多模态预测模型，支持异构算力的分钟级智能调度，为即将到来的大规模AI推理任务提供了坚实的底层算网支撑。目前已接入超过500P的智算算力。'
  }
];

const mockNews = [
  {
    id: 1,
    title: '深度解析：通用大模型如何重塑自然语言处理前沿边界',
    summary: '随着模型参数量呈指数级增长，自然语言处理领域迎来了范式转换。本文详细探讨了最新大语言模型在零样本学习、多语言泛化及复杂推理任务上的突破性进展，揭示了其在未来智能交互场景中的应用潜力与技术局限。',
    source: '前沿探索',
    time: '2026.02.15 09:30',
    level1: '模型演进',
    level2: '自然语言处理'
  },
  {
    id: 2,
    title: '智慧城市中枢神经：多模态AI驱动的下一代城市治理',
    summary: '构建现代化智慧城市已成为城市发展的新趋势。本文剖析了多模态大模型如何融合视觉、传感数据与城市运行日志，实现从交通调度、公共安全到能源管理的全局最优化，为数字政府建设提供了强有力的技术底座支持。',
    source: '行业洞察',
    time: '2026.02.12 14:20',
    level1: '行业应用解决方案',
    level2: '智慧城市'
  },
  {
    id: 3,
    title: '构建可信空间：数据要素流通的安全挑战与合规路径',
    summary: '数据作为新型生产要素，其价值释放依赖于安全可信的流通环境。本文梳理了当前数据安全法规、隐私计算技术及数据溯源机制的最新进展，探讨了在保障数据隐私前提下，如何构建高效、合规的数据要素市场体系。',
    source: '政策与技术',
    time: '2026.02.10 16:45',
    level1: '数据要素',
    level2: '数据安全'
  }
];

const MOCK_NEWS_ALL = [
  ...mockNews,
  {
    id: 4,
    title: '智能体网络(A2A)协议标准发布：开启机器间自主协作新纪元',
    summary: '业界首个针对Agent-to-Agent协作的通信协议标准正式发布。该标准定义了智能体之间的握手、意图理解与任务分发规范，将大幅降低多智能体系统的开发门槛，为复杂自动化场景提供基础设施。',
    source: '技术动态',
    time: '2026.02.08 10:15',
    level1: '智能体与自动化',
    level2: 'A2A'
  },
  {
    id: 5,
    title: '边缘计算架构演进：如何解决大模型端侧推理的算力瓶颈',
    summary: '随着大模型向端侧迁移，算力与功耗成为核心痛点。本文分析了最新 NPU 架构优化、模型量化压缩技术以及端云协同推理框架，展示了在移动设备上实现高效 AI 运算的最新工程实践。',
    source: '工程实践',
    time: '2026.02.05 14:30',
    level1: '智算资源',
    level2: '边缘计算'
  },
  {
    id: 6,
    title: '大模型幻觉评测基准更新：从发现问题到主动干预',
    summary: '幻觉问题严重制约了生成式AI在严肃场景的落地。最新的评测基准不仅提升了多轮对话中隐蔽幻觉的召回率，还引入了基于知识图谱的实时干预机制，为金融、医疗等领域的AI应用系上“安全带”。',
    source: 'AI安全研究',
    time: '2026.02.02 09:45',
    level1: 'AI安全',
    level2: '大模型幻觉'
  },
  {
    id: 7,
    title: '人形机器人技术突进：强化学习驱动的复杂环境步态控制',
    summary: '波士顿动力与国内外顶尖实验室近期在人形机器人运动控制上取得突破。通过在大规模仿真环境中使用深度强化学习，机器人现已能应对不规则地形和意外冲击，向具身智能的终极目标迈出坚实一步。',
    source: '前沿探索',
    time: '2026.01.28 16:10',
    level1: '硬件终端与具身智能',
    level2: '人形机器人'
  },
  {
    id: 8,
    title: '高质量数据集构建指南：数据飞轮引擎的核心动力',
    summary: '模型性能的上限由数据决定。本文总结了行业头部公司在数据清洗、自动标注、多模态对齐以及去重去毒方面的最佳实践，提出了一套可复用的高质量数据集生产流水线。',
    source: '数据工程',
    time: '2026.01.25 11:20',
    level1: '数据要素',
    level2: '高质量数据集'
  },
  {
    id: 9,
    title: '自智网络 L4 演进：意图驱动的 5G/6G 网络自动化运维',
    summary: '运营商网络正加速向高阶自智网络迈进。通过引入大语言模型解析运维人员意图，并结合知识图谱进行故障根因分析，网络自动化闭环系统在多个省份试点中实现了排障效率的数量级提升。',
    source: '行业洞察',
    time: '2026.01.20 15:55',
    level1: '自智网络',
    level2: '移动内部'
  },
  {
    id: 10,
    title: '多模态推荐算法重构：电商场景下的超个性化体验',
    summary: '传统基于ID的协同过滤已触及天花板。新一代推荐系统通过图文音视多模态融合，深入理解商品内容与用户实时情绪，在某主流电商平台的 A/B 测试中，点击转化率和停留时长均获得显著增长。',
    source: '技术动态',
    time: '2026.01.15 13:40',
    level1: '模型演进',
    level2: '推荐算法'
  }
];

export function ClassicDashboard({ onNavigateTo3D }) {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(5);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedDynamic, setSelectedDynamic] = useState(null);
  const [isWordCloudPaused, setIsWordCloudPaused] = useState(false);
  const [hoveredWord, setHoveredWord] = useState(null);
  const [selectedCity, setSelectedCity] = useState('省端');
  const [selectedRegionTab, setSelectedRegionTab] = useState('省端');
  const filterRef = useRef(null);

  const cities = ['西安', '咸阳', '宝鸡', '渭南', '汉中', '延安', '榆林', '安康', '商洛', '铜川'];

  const getCityData = (tab, city) => {
    // Generate mock data variations based on the selection
    const multiplier = tab === '省端' ? 1 : Math.random() * 0.4 + 0.1; // Cities have 10-50% of provincial traffic
    
    return [
      { name: '数智化部', calls: (45.2 * multiplier).toFixed(1) + 'k', agentCount: Math.floor(124 * multiplier), progress: tab === '省端' ? 100 : Math.random() * 80 + 20 },
      { name: '工程建设部', calls: (32.1 * multiplier).toFixed(1) + 'k', agentCount: Math.floor(98 * multiplier), progress: tab === '省端' ? 71 : Math.random() * 80 + 10 },
      { name: '内审部', calls: (28.5 * multiplier).toFixed(1) + 'k', agentCount: Math.floor(86 * multiplier), progress: tab === '省端' ? 63 : Math.random() * 80 + 10 },
      { name: '网络部', calls: (19.8 * multiplier).toFixed(1) + 'k', agentCount: Math.floor(65 * multiplier), progress: tab === '省端' ? 44 : Math.random() * 80 + 10 },
      { name: '品质管理部', calls: (12.4 * multiplier).toFixed(1) + 'k', agentCount: Math.floor(42 * multiplier), progress: tab === '省端' ? 27 : Math.random() * 80 + 10 },
      { name: '政企客户部', calls: (9.2 * multiplier).toFixed(1) + 'k', agentCount: Math.floor(38 * multiplier), progress: tab === '省端' ? 20 : Math.random() * 80 + 10 },
      { name: '市场经营部', calls: (5.6 * multiplier).toFixed(1) + 'k', agentCount: Math.floor(24 * multiplier), progress: tab === '省端' ? 12 : Math.random() * 80 + 10 },
    ].sort((a, b) => b.progress - a.progress); // Ensure it's always sorted by progress
  };

  const currentCityData = useMemo(() => getCityData(selectedRegionTab, selectedCity), [selectedRegionTab, selectedCity]);

  // Close filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterRef]);

  const toggleFilter = (categoryName) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName];
      setDisplayCount(5); // Reset count when filter changes
      return newFilters;
    });
  };

  const filteredNews = MOCK_NEWS_ALL.filter(news => {
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(news.level1);
  });

  const displayedNews = filteredNews.slice(0, displayCount);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedArticle) setSelectedArticle(null);
        if (selectedAgent) setSelectedAgent(null);
        if (selectedDynamic) setSelectedDynamic(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle, selectedAgent, selectedDynamic]);

  return (
    <div className="h-screen bg-[#f3f4f6] text-slate-800 font-sans flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10 relative">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-blue-600 font-bold text-lg tracking-wide">中国移动 China Mobile</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="w-8 h-8 text-blue-500 bg-blue-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
            <Settings size={18} />
          </div>
          <div className="w-8 h-8 bg-slate-400 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-500 transition-colors">
            <User size={18} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-hidden min-h-0">
        
        {/* Left Column (3 cols) */}
        <div className="col-span-3 flex flex-col gap-6 overflow-hidden h-full">
          {/* Active Agents Ranking */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 border border-slate-100 flex-1 flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 min-h-0 shrink-0 h-[40%]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-600 shadow-sm">
                  <Crown size={16} />
                </div>
                <h2 className="font-bold text-slate-800 text-lg tracking-tight">活跃智能体排行榜</h2>
              </div>
              <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">本周 Top 5</span>
            </div>
            
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
              {mockAgents.map((agent, index) => (
                <div 
                  key={agent.id} 
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100"
                  onClick={() => setSelectedAgent(agent)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-5 text-center font-bold text-slate-400 group-hover:text-blue-500 transition-colors">
                      {agent.rank}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{agent.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span>{agent.creator}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="truncate">{agent.org}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0 ml-2">
                    {agent.rank === 1 && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-white shadow-sm" title="金牌">
                        <Crown size={12} />
                      </div>
                    )}
                    {agent.rank === 2 && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white shadow-sm" title="银牌">
                        <Crown size={12} />
                      </div>
                    )}
                    {agent.rank === 3 && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-sm" title="铜牌">
                        <Crown size={12} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 pt-3 border-t border-slate-100 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1 w-full">
              查看完整榜单 <ChevronRight size={14} />
            </button>
          </div>

          {/* Department Data Bar Chart */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 border border-slate-100 flex-1 flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 min-h-0 h-[60%]">
            <div className="flex flex-col gap-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M18 20V10M12 20V4M6 20v-6"></path>
                  </svg>
                </div>
                <h2 className="font-bold text-slate-800 text-lg tracking-tight">各部门智能体数据一览</h2>
              </div>
              
              {/* Region Tabs */}
              <div className="flex items-center gap-4 border-b border-slate-100 pb-2">
                {['省端', '地市'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => {
                      setSelectedRegionTab(tab);
                      if (tab === '地市' && selectedCity === '省端') {
                        setSelectedCity('西安'); // Default to first city when switching to 地市
                      }
                    }}
                    className={`text-sm font-bold pb-2 relative transition-colors ${
                      selectedRegionTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab}
                    {selectedRegionTab === tab && (
                      <motion.div 
                        layoutId="regionTabIndicator"
                        className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
              
              {/* City Sub-tabs (Only show when 地市 is selected) */}
              <AnimatePresence>
                {selectedRegionTab === '地市' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1 overflow-x-auto pb-1 mt-3 custom-scrollbar hide-scrollbar"
                  >
                    {cities.map(city => (
                      <button
                        key={city}
                        onClick={() => setSelectedCity(city)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                          selectedCity === city 
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex-1 flex flex-col justify-start overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar">
              <div className="flex items-center gap-3 mb-2 text-[10px] font-medium text-slate-400 px-2 sticky top-0 bg-white z-10 py-1">
                <div className="w-[72px] shrink-0 text-right">部门名称</div>
                <div className="flex-1 flex justify-between">
                  <span>调用量及占比</span>
                  <span className="w-12 text-right">智能体数量</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-2">
                {currentCityData.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-[72px] shrink-0 text-right">
                      <span className="text-xs font-medium text-slate-600 truncate block">{item.name}</span>
                    </div>
                    <div className="flex-1 h-6 bg-slate-50 rounded-r-md relative flex items-center group-hover:bg-slate-100 transition-colors">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-r-md transition-all duration-1000 ease-out group-hover:from-blue-400 group-hover:to-blue-300"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                      <span className="absolute text-[10px] font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] transition-all duration-500 z-10 whitespace-nowrap"
                      style={{ 
                        left: item.progress < 25 ? `max(${item.progress}%, 28px)` : 'auto',
                        right: item.progress >= 25 ? `calc(100% - ${item.progress}%)` : 'auto',
                        paddingRight: item.progress >= 25 ? '8px' : '0',
                        paddingLeft: item.progress < 25 ? '8px' : '0',
                        color: item.progress < 25 ? '#2563eb' : 'white',
                        textShadow: item.progress < 25 ? 'none' : '0 1px 2px rgba(0,0,0,0.5)'
                      }}
                      >
                        {item.calls}
                      </span>
                    </div>
                    <div className="w-12 shrink-0 flex justify-end">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                        {item.agentCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols) */}
        <div className="col-span-6 flex flex-col gap-6 overflow-hidden h-full">
          {/* Main Feed */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100 flex-1 flex flex-col overflow-hidden">
            <div className="p-6 shrink-0 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <h2 className="font-bold text-slate-800 text-xl tracking-tight">AI 前沿资讯与分析</h2>
                  
                  <button 
                    onClick={onNavigateTo3D}
                    className="group relative flex items-center justify-center h-8 ml-3 rounded-full bg-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-blue-500/30 hover:border-blue-400/80 overflow-hidden cursor-pointer w-[68px] hover:w-[130px] shrink-0"
                    title="查看AI资讯宇宙"
                    style={{ willChange: 'width, transform' }}
                  >
                    {/* 呼吸发光背景 - 简化为不使用无限动画，仅使用透明度 */}
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* 核心星球及轨道包装 (居中保持) */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center shrink-0">
                      {/* 核心星球 */}
                      <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                      
                      {/* 轨道环 - 移除无限旋转动画以优化性能 */}
                      <svg className="absolute w-6 h-6 text-blue-400/40 group-hover:text-blue-300/60 transition-colors duration-300 group-hover:rotate-12" viewBox="0 0 100 100">
                        <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-30 50 50)" />
                        <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(30 50 50)" />
                      </svg>
                      
                      {/* 卫星点 - 移除无限跳动动画 */}
                      <div className="absolute w-[2px] h-[2px] bg-blue-200 rounded-full group-hover:bg-white transition-all duration-300 group-hover:translate-x-1" style={{ top: '8px', left: '22px' }}></div>
                    </div>

                    {/* 文字内容 */}
                    <div className="relative z-10 flex items-center justify-start pl-6 pr-1 whitespace-nowrap w-full">
                      <span className="text-[11px] font-bold text-blue-100 tracking-wider flex items-center group-hover:text-white transition-colors duration-300">
                        <span className="absolute left-7 group-hover:opacity-0 group-hover:-translate-y-2 transition-all duration-300">宇宙</span>
                        <span className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 flex items-center">
                          查看AI资讯宇宙
                          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300 ml-0.5" />
                        </span>
                      </span>
                    </div>
                  </button>
                </div>
                
                <div className="flex items-center gap-3 relative" ref={filterRef}>
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
                      selectedFilters.length > 0 
                        ? 'bg-blue-50 border-blue-200 text-blue-600' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Filter size={14} />
                    高级筛选
                    {selectedFilters.length > 0 && (
                      <span className="flex items-center justify-center bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full ml-1">
                        {selectedFilters.length}
                      </span>
                    )}
                  </button>

                  {/* Filter Popover */}
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20"
                      >
                        <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                          <span className="text-sm font-bold text-slate-700">选择分类</span>
                          {selectedFilters.length > 0 && (
                            <button 
                              onClick={() => setSelectedFilters([])}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              清空
                            </button>
                          )}
                        </div>
                        <div className="max-h-64 overflow-y-auto p-2 custom-scrollbar">
                          {MOCK_CATEGORIES.map(category => {
                            const isSelected = selectedFilters.includes(category.name);
                            return (
                              <label 
                                key={category.id} 
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors group"
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                  isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'
                                }`}>
                                  {isSelected && <Check size={12} className="text-white" />}
                                </div>
                                <span className={`text-sm ${isSelected ? 'font-semibold text-blue-700' : 'text-slate-600'}`}>
                                  {category.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* News List Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/30">
              <div className="flex flex-col gap-6">
                <AnimatePresence mode="popLayout">
                  {displayedNews.length > 0 ? displayedNews.map((news) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={news.id} 
                      className="group p-5 rounded-xl border border-slate-100 bg-white hover:border-blue-100 hover:shadow-[0_4px_12px_rgba(0,102,204,0.08)] transition-all duration-300 cursor-pointer shrink-0"
                      onClick={() => setSelectedArticle(news)}
                    >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#0066cc] transition-colors leading-snug">
                        {news.title}
                      </h3>
                      <div className="shrink-0 flex gap-2">
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-md border border-blue-100/50">
                          {news.level1}
                        </span>
                        <span className="px-2.5 py-1 bg-slate-50 text-slate-500 text-[11px] font-medium rounded-md border border-slate-100">
                          {news.level2}
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative pl-4 mb-4">
                      <div className="absolute left-0 top-1 bottom-1 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-70"></div>
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {news.summary}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-50 mt-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 font-medium text-slate-500">
                          <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">📰</div>
                          {news.source}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                          {news.time}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                          onClick={(e) => { e.stopPropagation(); console.log('Download PDF'); }}
                          className="flex items-center gap-1.5 text-[#0066cc] font-medium hover:bg-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Download size={14} />
                          快筛PDF
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); console.log('External Link'); }}
                          className="flex items-center gap-1.5 text-slate-500 font-medium hover:text-slate-700 hover:bg-slate-100 bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <ExternalLink size={14} />
                          原文链接
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  )) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-16 text-slate-400"
                    >
                      <Filter size={48} className="mb-4 text-slate-200" strokeWidth={1} />
                      <p>没有找到相关资讯，请尝试更换筛选条件</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {filteredNews.length > displayCount && (
                <button 
                  onClick={() => setDisplayCount(prev => Math.min(prev + 5, 10))}
                  className="mt-6 py-3 w-full border border-dashed border-slate-200 rounded-xl text-sm font-medium text-slate-500 hover:text-[#0066cc] hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 shrink-0"
                >
                  加载更多资讯
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (3 cols) */}
        <div className="col-span-3 flex flex-col gap-6 overflow-hidden h-full">
          {/* Word Cloud */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 border border-slate-100 shrink-0 flex flex-col relative overflow-hidden h-[60%]">
            {/* Background gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0066cc]/5 to-transparent pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
              <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-[#0066cc]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path d="M4 11a9 9 0 0 1 9 9"></path>
                  <path d="M4 4a16 16 0 0 1 16 16"></path>
                  <circle cx="5" cy="19" r="1"></circle>
                </svg>
              </div>
              <h2 className="font-bold text-slate-800 text-lg">近七日资讯热词云</h2>
            </div>
            
            <div 
              className="flex-1 relative py-4 px-2 mt-2 overflow-hidden"
              onMouseEnter={() => setIsWordCloudPaused(true)}
              onMouseLeave={() => {
                setIsWordCloudPaused(false);
                setHoveredWord(null);
              }}
            >
              <div className={`absolute inset-4 flex flex-wrap content-center justify-center gap-x-5 gap-y-4 transition-transform duration-1000 ${isWordCloudPaused ? 'scale-100' : 'animate-spin-slow scale-[0.85]'} origin-center`} style={{ animationDuration: '30s' }}>
                {[
                  { text: "智能体", heatScore: 100, changeRate: 18.2, color: "#ef4444" }, 
                  { text: "OpenClaw", heatScore: 96, changeRate: 24.5, color: "#f97316" }, 
                  { text: "具身智能", heatScore: 92, changeRate: 16.8, color: "#eab308" }, 
                  { text: "人形机器人", heatScore: 89, changeRate: 14.3, color: "#3b82f6" }, 
                  { text: "AI落地", heatScore: 86, changeRate: 11.7, color: "#8b5cf6" }, 
                  { text: "智能经济", heatScore: 82, changeRate: 10.5, color: "#ec4899" }, 
                  { text: "机器人", heatScore: 80, changeRate: 8.9, color: "#14b8a6" }, 
                  { text: "企业AI", heatScore: 73, changeRate: 8.4, color: "#06b6d4" }, 
                  { text: "落地", heatScore: 71, changeRate: 6.1, color: "#10b981" }, 
                  { text: "执行", heatScore: 69, changeRate: 7.4, color: "#84cc16" }, 
                  { text: "数字员工", heatScore: 67, changeRate: 15.2, color: "#6366f1" }, 
                  { text: "世界模型", heatScore: 66, changeRate: 11.9, color: "#d946ef" }, 
                  { text: "端侧AI", heatScore: 64, changeRate: 10.8, color: "#f43f5e" }, 
                  { text: "AI硬件", heatScore: 63, changeRate: 9.2, color: "#0ea5e9" }, 
                  { text: "大模型", heatScore: 62, changeRate: 5.6, color: "#3b82f6" }, 
                  { text: "国产模型", heatScore: 60, changeRate: 7.1, color: "#8b5cf6" }, 
                  { text: "算力", heatScore: 59, changeRate: 6.8, color: "#64748b" }
                ].map((word, i) => {
                  // Adjust font size range slightly to make them fit while maintaining visibility
                  const fontSize = 14 + ((word.heatScore - 59) / (100 - 59)) * (24 - 14);
                  const isHovered = hoveredWord === word.text;
                  const isFaded = hoveredWord && !isHovered;
                  
                  return (
                    <div 
                      key={i} 
                      className={`relative transition-all duration-300 cursor-pointer ${isWordCloudPaused ? '' : 'animate-spin-reverse-slow'}`}
                      style={{ animationDuration: '30s' }}
                      onMouseEnter={() => setHoveredWord(word.text)}
                    >
                      <span 
                        className={`font-bold transition-all duration-300 inline-block px-1
                          ${isHovered ? 'scale-125 drop-shadow-md z-20' : ''} 
                          ${isFaded ? 'opacity-20 blur-[2px]' : 'opacity-90'}
                        `}
                        style={{ 
                          fontSize: `${fontSize}px`,
                          color: word.color,
                          willChange: 'transform, opacity',
                          textShadow: isHovered ? `0 0 12px ${word.color}80` : 'none'
                        }}
                      >
                        {word.text}
                      </span>
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none flex flex-col gap-1 border border-slate-700"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-slate-400">热度得分:</span>
                              <span className="font-bold text-amber-400">{word.heatScore}</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-slate-400">环比增长:</span>
                              <span className="font-bold text-emerald-400">+{word.changeRate}%</span>
                            </div>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Shaanxi AI Dynamics */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-100 flex-1 flex flex-col min-h-0 h-[40%]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                <Zap size={14} className="fill-blue-500/20" />
              </div>
              <h2 className="font-bold text-slate-800 text-lg tracking-tight">陕西公司AI动态先知</h2>
            </div>
            
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
              {mockDynamics.map((item, i) => (
                <div 
                  key={i} 
                  className="flex gap-3 p-2.5 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedDynamic(item)}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center shrink-0 border border-slate-200/50 group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-500">{item.date.split('.')[1]}/{item.date.split('.')[2]}</span>
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="text-[9px] font-bold text-blue-500 mb-0.5 tracking-wider uppercase">{item.category}</span>
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* Footer Signature */}
      <footer className="w-full shrink-0 flex flex-col items-center justify-center py-4 bg-white/50 backdrop-blur-sm border-t border-[#e5e5e5] relative z-10">
        <span className="text-[#333333] text-sm font-sans tracking-wide">陕西移动数智化部</span>
      </footer>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={() => setSelectedArticle(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden border border-slate-100"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-blue-100 text-[#0066cc] text-[11px] font-bold rounded-md">
                      {selectedArticle.level1}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      {selectedArticle.source}
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight mb-4">
                    {selectedArticle.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 pb-6 border-b border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {selectedArticle.time}
                    </span>
                  </div>
                  
                  {/* Mock Rich Text Content */}
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6 p-4 bg-blue-50/50 rounded-xl border-l-4 border-[#0066cc]">
                      {selectedArticle.summary}
                    </p>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      人工智能技术的发展正在深刻改变着各行各业的运作方式。从最初的规则引擎，到机器学习，再到如今风靡全球的通用大语言模型（LLM）和多模态模型，AI 的理解与生成能力实现了质的飞跃。
                    </p>
                    <div className="my-8 w-full h-64 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 font-medium">相关数据图表占位</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">技术落地的核心挑战</h3>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      尽管前景广阔，但在实际落地过程中，企业仍面临着诸多挑战。首先是算力成本的居高不下，其次是数据安全与隐私保护的合规要求，最后是如何将通用模型的能力与行业特定场景深度结合（即 Domain-Specific Fine-tuning）。
                    </p>
                    <p className="text-slate-700 leading-relaxed mb-4">
                      在本次更新的框架中，研究人员引入了一套全新的评估指标，能够更准确地衡量模型在极端边缘情况下的鲁棒性。
                    </p>
                  </div>
                </div>
                
                <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    关闭
                  </button>
                  <button className="px-5 py-2 rounded-lg text-sm font-medium bg-[#0066cc] text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-colors flex items-center gap-2">
                    <ExternalLink size={16} />
                    查看原文
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Agent Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={() => setSelectedAgent(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden border border-slate-100"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm" style={{ background: selectedAgent.medalColor }}>
                      <Crown size={16} />
                    </div>
                    <span className="font-bold text-slate-800 text-lg">智能体详情</span>
                  </div>
                  <button 
                    onClick={() => setSelectedAgent(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">
                      {selectedAgent.name}
                    </h1>
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-md">
                      Top {selectedAgent.rank}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1">创建人</div>
                      <div className="font-medium text-slate-800 flex items-center gap-2">
                        <User size={14} className="text-blue-500" />
                        {selectedAgent.creator}
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1">所属组织</div>
                      <div className="font-medium text-slate-800 truncate" title={selectedAgent.org}>
                        {selectedAgent.org}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        核心功能与简介
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed bg-blue-50/50 p-4 rounded-xl">
                        {selectedAgent.desc}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        应用场景
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {selectedAgent.details.scenario}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        落地情况
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {selectedAgent.details.landing}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        研发团队
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {selectedAgent.details.team}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                  <button 
                    onClick={() => setSelectedAgent(null)}
                    className="px-5 py-2 rounded-lg text-sm font-medium bg-[#0066cc] text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-colors"
                  >
                    确定
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Dynamic Modal */}
      <AnimatePresence>
        {selectedDynamic && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={() => setSelectedDynamic(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden border border-slate-100"
              >
                <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 bg-blue-100 text-[#0066cc] text-[11px] font-bold rounded-md">
                      {selectedDynamic.category}
                    </span>
                    <span className="text-sm font-medium text-slate-500">
                      动态先知
                    </span>
                  </div>
                  <button 
                    onClick={() => setSelectedDynamic(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
                  <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-4">
                    {selectedDynamic.title}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-8 pb-6 border-b border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {selectedDynamic.date}
                    </span>
                  </div>
                  
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-600 leading-relaxed font-medium mb-6 p-4 bg-slate-50 rounded-xl border-l-4 border-blue-400">
                      {selectedDynamic.content}
                    </p>
                    <div className="my-8 w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex items-center justify-center relative overflow-hidden">
                      <Zap size={48} className="text-blue-200 absolute opacity-50 transform -rotate-12 scale-150" />
                      <span className="text-blue-600/70 font-medium relative z-10 flex items-center gap-2">
                        现场图文资料归档中 <Zap size={16} />
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                  <button 
                    onClick={() => setSelectedDynamic(null)}
                    className="px-5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    关闭
                  </button>
                  <button className="px-5 py-2 rounded-lg text-sm font-medium bg-[#0066cc] text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-colors flex items-center gap-2">
                    <ExternalLink size={16} />
                    查看详情报告
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}