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

const mockBenchmarkAgents = [
  { 
    id: 'b1', 
    name: '合同专家', 
    icon: '📝', 
    desc: '政企类型合同智能审核与起草',
    creator: '法务部',
    org: '风险控制中心',
    details: {
      scenario: '政企业务中的标准合同起草、非标合同条款审核、合规风险点提示与修改建议。',
      landing: '已在全省各分公司政企及法务专员中推广使用，合同审批流转效率提升60%。',
      team: '由法务部与AI研发中心联合训练，内置超过5万份政企类标准合同模板。'
    }
  },
  { 
    id: 'b2', 
    name: '秦小助', 
    icon: '🤖', 
    desc: '全能办公与生活小助手',
    creator: '综合部',
    org: '员工服务中心',
    details: {
      scenario: '会议室预定、差旅报销指南、IT故障报修、食堂菜谱查询等日常办公场景。',
      landing: '作为企业内部超级入口集成在协同办公APP中，日均交互量破万。',
      team: '综合部主导，基于企业内部知识库微调的大语言模型。'
    }
  },
  { 
    id: 'b3', 
    name: '话术提炼助手', 
    icon: '🗣️', 
    desc: '一键生成金牌营销话术',
    creator: '市场部',
    org: '营销策划组',
    details: {
      scenario: '针对不同客户群体（如学生、白领、老人）和不同产品套餐自动生成个性化外呼营销话术。',
      landing: '一线客服及外呼团队全面使用，营销成功率环比提升25%。',
      team: '萃取了过往三年省级“金牌客服”的优秀录音数据进行专项训练。'
    }
  },
  { 
    id: 'b4', 
    name: '惠选店', 
    icon: '🏪', 
    desc: '智能评估开店选址点位质量',
    creator: '渠道部',
    org: '实体店运营中心',
    details: {
      scenario: '根据输入的点位，结合周边环境（交通、人流、竞品）和目标用户画像，智能评估开店选址点位质量。',
      landing: '辅助新开营业厅及加盟店的选址决策，使新店首月达标率提升了40%。',
      team: '融合了地理信息系统(GIS)数据与多维度人口统计学特征的模型引擎。'
    }
  }
];

const mockAgents = [
  { 
    id: 1, 
    name: '合规智能体', 
    creator: '张三', 
    org: '数智化部', 
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

  const [activeTab, setActiveTab] = useState('ranking'); // 'ranking' | 'department'
  
  // Word cloud rotating button state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const wordCloudData = useMemo(() => [
    { text: "智能体", heatScore: 100, changeRate: 18.2, color: "#ef4444" }, 
    { text: "OpenClaw", heatScore: 96, changeRate: 24.5, color: "#f97316" }, 
    { text: "具身智能", heatScore: 92, changeRate: 16.8, color: "#eab308" }, 
    { text: "人形机器人", heatScore: 89, changeRate: 14.3, color: "#3b82f6" }, 
    { text: "AI落地", heatScore: 86, changeRate: 11.7, color: "#8b5cf6" }
  ], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % wordCloudData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [wordCloudData.length]);

  const cities = ['西安', '咸阳', '宝鸡', '渭南', '汉中', '延安', '榆林', '安康', '商洛', '铜川'];

  const getCityData = (tab, city) => {
    if (tab === '省端') {
      return [
        { name: '数智化部', calls: '45.2k', agentCount: 124, progress: 100 },
        { name: '工程建设部', calls: '32.1k', agentCount: 98, progress: 71 },
        { name: '内审部', calls: '28.5k', agentCount: 86, progress: 63 },
        { name: '网络部', calls: '19.8k', agentCount: 65, progress: 44 },
        { name: '品质管理部', calls: '12.4k', agentCount: 42, progress: 27 },
        { name: '政企客户部', calls: '9.2k', agentCount: 38, progress: 20 },
        { name: '市场经营部', calls: '5.6k', agentCount: 24, progress: 12 },
      ].sort((a, b) => b.progress - a.progress);
    } else {
      // Return cities directly as "departments" for the 地市 tab
      return cities.map((cityName, index) => {
        const multiplier = Math.max(0.1, 1 - (index * 0.1)); // Just mock data spread
        return {
          name: cityName,
          calls: (45.2 * multiplier).toFixed(1) + 'k',
          agentCount: Math.floor(124 * multiplier),
          progress: Math.floor(100 * multiplier)
        };
      }).sort((a, b) => b.progress - a.progress);
    }
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
          {/* Benchmark Agents */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 border border-slate-100 flex-1 flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 min-h-0 shrink-0 h-[40%] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </div>
                <h2 className="font-bold text-slate-800 text-lg tracking-tight">标杆智能体</h2>
              </div>
              <button className="group relative overflow-hidden rounded-full bg-blue-600 text-white px-3 py-1.5 text-xs font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1">
                <span className="relative z-10">发布</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 relative z-10 group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto pr-1 custom-scrollbar relative z-10">
              {mockBenchmarkAgents.map((agent) => (
                <div 
                  key={agent.id} 
                  className="bg-slate-50 rounded-xl p-3 border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-center text-center relative overflow-hidden"
                  onClick={() => setSelectedAgent({
                    ...agent,
                    rank: '标杆',
                    medalColor: '#4f46e5' // Indigo color for benchmark agents
                  })}
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-white shadow-sm flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition-transform duration-300 border border-slate-100 group-hover:border-indigo-100 relative z-10">
                    {agent.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors relative z-10">
                    {agent.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 line-clamp-2 leading-tight px-1 mb-2 relative z-10">
                    {agent.desc}
                  </p>
                  <div className="mt-auto pt-2 border-t border-slate-200/60 flex items-center justify-center gap-1.5 text-[9px] text-slate-400 group-hover:text-slate-500 transition-colors relative z-10">
                    <span className="truncate">{agent.creator}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-slate-300"></span>
                    <span className="truncate font-medium">{agent.org}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action Button */}
          <button className="w-full shrink-0 group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-[11px] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 3.82-13.02 1 1 0 0 1 1.76.5 22.1 22.1 0 0 1 1.13 11.02"/><path d="M15 12l3 3a22 22 0 0 0 13.02-3.82 1 1 0 0 0-.5-1.76 22.1 22.1 0 0 0-11.02-1.13"/></svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-white font-bold text-sm tracking-wide">开启我的 Agent 开发之旅</span>
                  <span className="text-blue-100 text-[10px] font-medium opacity-80 group-hover:opacity-100 transition-opacity">零代码构建专属智能体平台</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </button>

          {/* Combined Agent Data Module */}
          <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 border border-slate-100 flex-1 flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-shadow duration-300 min-h-0 shrink-0 h-[60%]">
            <div className="flex flex-col gap-4 mb-5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                  {activeTab === 'ranking' ? <Crown size={16} className="text-amber-600" /> : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 20V10M12 20V4M6 20v-6"></path></svg>}
                </div>
                <h2 className="font-bold text-slate-800 text-lg tracking-tight">智能体数据概览</h2>
              </div>
              
              {/* Main Tabs */}
              <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('ranking')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
                    activeTab === 'ranking' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  活跃排行榜
                </button>
                <button
                  onClick={() => setActiveTab('department')}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-300 ${
                    activeTab === 'department' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  各部门分布
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {activeTab === 'ranking' ? (
                  <motion.div
                    key="ranking"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                      {mockAgents.map((agent, index) => (
                        <div 
                          key={agent.id} 
                          className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100"
                          onClick={() => setSelectedAgent(agent)}
                        >
                          <div className="flex items-center gap-3 min-w-0">
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
                            {agent.rank > 3 && (
                              <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs shadow-sm">
                                {agent.rank}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-3 pt-3 border-t border-slate-100 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center gap-1 w-full shrink-0">
                      查看完整榜单 <ChevronRight size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="department"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    {/* Region Tabs */}
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-2 shrink-0">
                      {['省端', '地市'].map(tab => (
                        <button
                          key={tab}
                          onClick={() => {
                            setSelectedRegionTab(tab);
                            if (tab === '地市' && selectedCity === '省端') {
                              setSelectedCity('西安');
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
                    
                    <div className="flex-1 flex flex-col justify-start overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar mt-2">
                      <div className="flex items-center gap-3 mb-2 text-[10px] font-medium text-slate-400 px-2 sticky top-0 bg-white z-10 py-1">
                        <div className="w-[72px] shrink-0 text-right">{selectedRegionTab === '省端' ? '部门名称' : '地市名称'}</div>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Center Column (6 cols) - Product Interaction Area */}
        <div className="col-span-6 flex flex-col gap-6 overflow-hidden h-full">
          {/* Main Feed */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100 flex-1 flex flex-col overflow-hidden relative">
            
            {/* Header Area */}
            <div className="p-6 shrink-0 border-b border-slate-100 bg-gradient-to-b from-blue-50/50 to-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-500/20">
                  🤖
                </div>
                <div>
                  <h2 className="font-bold text-slate-800 text-xl tracking-tight mb-1 flex items-center gap-2">
                    秦小助
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded uppercase tracking-wider">Beta</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">您的全能办公与生活智能助理</p>
                </div>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50/50 flex flex-col">
              {/* Welcome Message */}
              <div className="flex gap-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm shrink-0 mt-1 shadow-sm">
                  🤖
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm text-sm text-slate-700 leading-relaxed max-w-[85%]">
                  <p className="mb-2">您好！我是秦小助，很高兴为您服务。我可以帮您：</p>
                  <ul className="space-y-1.5 text-slate-600 mb-3">
                    <li className="flex items-center gap-2"><Zap size={12} className="text-amber-500" /> 快速预定会议室并发送邀请</li>
                    <li className="flex items-center gap-2"><Zap size={12} className="text-amber-500" /> 解答最新差旅报销标准与流程</li>
                    <li className="flex items-center gap-2"><Zap size={12} className="text-amber-500" /> 协助处理 IT 设备故障报修</li>
                  </ul>
                  <p>今天有什么我可以帮您的吗？</p>
                </div>
              </div>

              {/* Recommended Questions */}
              <div className="mt-auto pt-4">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-slate-400">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">您可以这样问我</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="text-left p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:text-blue-600 transition-all group text-xs text-slate-600">
                    帮我预定明天下午两点的二楼会议室，需要有投影仪。
                  </button>
                  <button className="text-left p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:text-blue-600 transition-all group text-xs text-slate-600">
                    去北京出张，住宿标准和餐补每天是多少？
                  </button>
                  <button className="text-left p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:text-blue-600 transition-all group text-xs text-slate-600">
                    我的电脑连不上公司内网了，怎么办？
                  </button>
                  <button className="text-left p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md hover:text-blue-600 transition-all group text-xs text-slate-600">
                    查询一下今天食堂中午的菜单。
                  </button>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <div className="relative flex items-center">
                <button className="absolute left-3 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </button>
                <input 
                  type="text" 
                  placeholder="输入您的问题或需求，按 Enter 发送..." 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-full pl-12 pr-14 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <button className="absolute right-2 w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 ml-0.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
              <div className="text-center mt-3">
                <span className="text-[10px] text-slate-400">AI 生成的内容可能存在误差，请以实际政策或人工核实为准。</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (3 cols) - Merged News & Word Cloud */}
        <div className="col-span-3 flex flex-col gap-6 overflow-hidden h-full">
          {/* Main Feed */}
          <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-slate-100 flex-1 flex flex-col overflow-hidden">
            <div className="p-4 shrink-0 border-b border-slate-100">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </div>
                    <h2 className="font-bold text-slate-800 text-base tracking-tight">前沿资讯</h2>
                  </div>
                  
                  {/* Filter Icon Button */}
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                      selectedFilters.length > 0 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Filter size={12} />
                  </button>
                </div>

                <div className="flex items-center gap-2 relative z-10 w-full overflow-x-auto hide-scrollbar pb-1">
                  {/* Rotating Word Cloud Button */}
                  <button 
                    onClick={() => {
                      onNavigateTo3D();
                      const event = new CustomEvent('select-wordcloud-node', { detail: { keyword: wordCloudData[currentWordIndex].text } });
                      window.dispatchEvent(event);
                    }}
                    className="group relative flex items-center h-7 px-3 rounded-full bg-white shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 shrink-0"
                    title="点击探索该热词"
                  >
                    <div className="flex items-center gap-1.5 z-10 relative">
                      <span className="text-[9px] font-medium text-slate-400">热词</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentWordIndex}
                          initial={{ y: 8, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -8, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-[11px] font-bold whitespace-nowrap"
                          style={{ color: wordCloudData[currentWordIndex].color }}
                        >
                          {wordCloudData[currentWordIndex].text}
                        </motion.span>
                      </AnimatePresence>
                      <Zap size={10} className="text-amber-400 ml-0.5" />
                    </div>
                  </button>

                  {/* 3D Universe Navigation Button */}
                  <button 
                    onClick={onNavigateTo3D}
                    className="group relative flex items-center justify-center h-7 px-3 rounded-full bg-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-500 border border-blue-500/30 hover:border-blue-400/80 overflow-hidden shrink-0"
                    title="查看AI资讯宇宙"
                  >
                    <div className="absolute inset-0 bg-blue-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                      <span className="text-[10px] font-bold text-blue-100 group-hover:text-white transition-colors duration-300 flex items-center">
                        资讯宇宙
                        <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-300 ml-0.5" />
                      </span>
                    </div>
                  </button>
                </div>
                
                <div className="relative" ref={filterRef}>
                  {/* Filter Popover */}
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20"
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
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 bg-slate-50/30">
              <div className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {displayedNews.length > 0 ? displayedNews.map((news) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={news.id} 
                      className="group p-4 rounded-xl border border-slate-100 bg-white hover:border-blue-100 hover:shadow-[0_4px_12px_rgba(0,102,204,0.08)] transition-all duration-300 cursor-pointer shrink-0"
                      onClick={() => setSelectedArticle(news)}
                    >
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[9px] font-bold rounded-md border border-blue-100/50">
                          {news.level1}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-50 text-slate-500 text-[9px] font-medium rounded-md border border-slate-100">
                          {news.level2}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#0066cc] transition-colors leading-snug line-clamp-2">
                        {news.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-3 pt-3 border-t border-slate-50">
                      <span className="flex items-center gap-1 font-medium text-slate-500 truncate">
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-100 flex items-center justify-center text-[8px]">📰</div>
                        {news.source}
                      </span>
                      <span className="shrink-0">{news.time.split(' ')[0]}</span>
                    </div>
                  </motion.div>
                  )) : (
                    <motion.div 
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-slate-400"
                    >
                      <Filter size={32} className="mb-3 text-slate-200" strokeWidth={1} />
                      <p className="text-xs">没有找到相关资讯</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {filteredNews.length > displayCount && (
                <button 
                  onClick={() => setDisplayCount(prev => Math.min(prev + 5, 10))}
                  className="mt-4 py-2 w-full border border-dashed border-slate-200 rounded-xl text-xs font-medium text-slate-500 hover:text-[#0066cc] hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-200 shrink-0"
                >
                  加载更多
                </button>
              )}
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
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                      selectedAgent.rank === '标杆' 
                        ? 'bg-indigo-100 text-indigo-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {selectedAgent.rank === '标杆' ? '标杆智能体' : `Top ${selectedAgent.rank}`}
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