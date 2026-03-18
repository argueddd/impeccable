// Data Definitions for the AI Universe

export const CATEGORIES = {
  '模型演进': { color: '#0ea5e9', desc: 'AI 核心底层模型的迭代与突破' },       // Blue
  '智能体与自动化': { color: '#8b5cf6', desc: 'Agent 框架与工作流' },             // Purple
  '硬件终端与具身智能': { color: '#f59e0b', desc: 'AI 与物理世界的结合' },         // Amber
  '行业应用解决方案': { color: '#10b981', desc: 'AI 在垂直领域的落地' },           // Emerald
  'AI安全': { color: '#ef4444', desc: '合规与风险防范' },                        // Red
  '数据要素': { color: '#3b82f6', desc: '数据治理与流通' },                      // Light Blue
  '自智网络': { color: '#f43f5e', desc: '通信网络智能化' },                      // Rose
  '智算资源': { color: '#6366f1', desc: '底层算力基础设施' },                    // Indigo
};

// Helper function to distribute nodes spherically around a parent
export function computeGraphPositions() {
  const nodes = [...RAW_DATA];
  
  // 1. Distribute main categories in a large sphere
  const categories = nodes.filter(n => n.isCategory);
  const mainRadius = 140; // Expanded radius for main categories
  
  categories.forEach((cat, i) => {
    // Distribute main categories on a wide sphere
    const phi = Math.acos(-1 + (2 * i) / categories.length);
    const theta = Math.sqrt(categories.length * Math.PI) * phi;
    
    cat.pos = [
      mainRadius * Math.cos(theta) * Math.sin(phi),
      mainRadius * Math.sin(theta) * Math.sin(phi),
      mainRadius * Math.cos(phi)
    ];
  });

  // 2. Distribute children around their parents
  categories.forEach(cat => {
    const children = nodes.filter(n => n.parent === cat.id);
    const childRadius = 35 + (children.length * 2); // Expanded radius for children
    
    // Sum heat for the category
    cat.heat = children.reduce((sum, child) => sum + (child.heat || 0), 0);

    children.forEach((child, i) => {
      // Distribute in a smaller sphere around the parent
      // using a simpler even distribution for small number of items
      const phi = Math.acos(-1 + (2 * i) / children.length);
      const theta = Math.sqrt(children.length * Math.PI) * phi;
      
      child.pos = [
        cat.pos[0] + childRadius * Math.cos(theta) * Math.sin(phi),
        cat.pos[1] + childRadius * Math.sin(theta) * Math.sin(phi),
        cat.pos[2] + childRadius * Math.cos(phi)
      ];
    });
  });

  return nodes;
}

export const RAW_DATA = [
  { id: 'c1', type: '模型演进', title: '模型演进', isCategory: true },
  { id: 'c1-1', type: '模型演进', title: '自然语言处理', desc: 'NLP, 大语言模型相关资讯', parent: 'c1', heat: 8500 },
  { id: 'c1-2', type: '模型演进', title: '计算机视觉', desc: 'CV, 图像生成, 视频生成', parent: 'c1', heat: 6200 },
  { id: 'c1-3', type: '模型演进', title: '强化学习', desc: 'RLHF, 奖励模型', parent: 'c1', heat: 4100 },
  { id: 'c1-4', type: '模型演进', title: '推荐算法', desc: '个性化推荐', parent: 'c1', heat: 3200 },
  { id: 'c1-5', type: '模型演进', title: '大模型', desc: '千亿级参数基座模型', parent: 'c1', heat: 12500 },

  // 2. 智能体与自动化
  { id: 'c2', type: '智能体与自动化', title: '智能体与自动化', isCategory: true },
  { id: 'c2-1', type: '智能体与自动化', title: 'MCP', desc: '模型上下文协议', parent: 'c2', heat: 5600 },
  { id: 'c2-2', type: '智能体与自动化', title: 'A2A', desc: 'Agent to Agent 协同', parent: 'c2', heat: 7800 },
  { id: 'c2-3', type: '智能体与自动化', title: 'Skill', desc: '智能体技能扩展', parent: 'c2', heat: 3400 },
  { id: 'c2-4', type: '智能体与自动化', title: '开发框架', desc: 'LangChain, AutoGen 等', parent: 'c2', heat: 6700 },
  { id: 'c2-5', type: '智能体与自动化', title: '知识库', desc: 'RAG 向量检索', parent: 'c2', heat: 8900 },
  { id: 'c2-6', type: '智能体与自动化', title: '智能体组件', desc: 'Prompt, Memory, Tools', parent: 'c2', heat: 4500 },

  // 3. 硬件终端与具身智能
  { id: 'c3', type: '硬件终端与具身智能', title: '硬件终端与具身智能', isCategory: true },
  { id: 'c3-1', type: '硬件终端与具身智能', title: '智能穿戴设备', desc: 'AI 眼镜, 戒指等', parent: 'c3', heat: 4200 },
  { id: 'c3-2', type: '硬件终端与具身智能', title: '智能驾驶', desc: '自动驾驶系统', parent: 'c3', heat: 9500 },
  { id: 'c3-3', type: '硬件终端与具身智能', title: '人形机器人', desc: '通用双足机器人', parent: 'c3', heat: 11200 },
  { id: 'c3-4', type: '硬件终端与具身智能', title: '工业机器人', desc: '自动化生产线', parent: 'c3', heat: 3800 },

  // 4. 行业应用解决方案
  { id: 'c4', type: '行业应用解决方案', title: '行业应用解决方案', isCategory: true },
  { id: 'c4-1', type: '行业应用解决方案', title: '智慧城市', desc: '城市级 AI 大脑', parent: 'c4', heat: 2500 },
  { id: 'c4-2', type: '行业应用解决方案', title: '智慧医疗', desc: 'AI 辅助诊疗', parent: 'c4', heat: 6800 },
  { id: 'c4-3', type: '行业应用解决方案', title: '智慧金融', desc: '智能风控与投顾', parent: 'c4', heat: 5400 },
  { id: 'c4-4', type: '行业应用解决方案', title: '数字政府', desc: '政务大模型', parent: 'c4', heat: 3100 },
  { id: 'c4-5', type: '行业应用解决方案', title: '智慧交通', desc: '交通流量优化', parent: 'c4', heat: 2800 },
  { id: 'c4-6', type: '行业应用解决方案', title: '智慧文旅', desc: '数字人导游', parent: 'c4', heat: 1900 },
  { id: 'c4-7', type: '行业应用解决方案', title: '智慧园区', desc: '园区安防与能耗', parent: 'c4', heat: 1500 },

  // 5. 智算资源
  { id: 'c5', type: '智算资源', title: '智算资源', isCategory: true },
  { id: 'c5-1', type: '智算资源', title: 'GPU', desc: '图形处理器算力', parent: 'c5', heat: 13500 },
  { id: 'c5-2', type: '智算资源', title: 'NPU', desc: '神经网络处理器', parent: 'c5', heat: 7200 },
  { id: 'c5-3', type: '智算资源', title: '算力集群', desc: '万卡智算中心', parent: 'c5', heat: 5800 },
  { id: 'c5-4', type: '智算资源', title: '边缘计算', desc: '端侧推理', parent: 'c5', heat: 4600 },
  { id: 'c5-5', type: '智算资源', title: 'CPU', desc: '通用计算', parent: 'c5', heat: 2100 },
  { id: 'c5-6', type: '智算资源', title: '云计算', desc: '弹性算力服务', parent: 'c5', heat: 8400 },
  { id: 'c5-7', type: '智算资源', title: '算力调度', desc: '跨域算力编排', parent: 'c5', heat: 3700 },
  { id: 'c5-8', type: '智算资源', title: '分布式训练', desc: '大模型并行训练', parent: 'c5', heat: 6100 },

  // 6. 数据要素
  { id: 'c6', type: '数据要素', title: '数据要素', isCategory: true },
  { id: 'c6-1', type: '数据要素', title: '高质量数据集', desc: '大模型预训练语料', parent: 'c6', heat: 8800 },
  { id: 'c6-2', type: '数据要素', title: '数据治理', desc: '数据清洗与标准化', parent: 'c6', heat: 4200 },
  { id: 'c6-3', type: '数据要素', title: '可信空间', desc: '隐私计算与流通', parent: 'c6', heat: 3500 },
  { id: 'c6-4', type: '数据要素', title: '数联网', desc: '数据基础设施', parent: 'c6', heat: 2100 },
  { id: 'c6-5', type: '数据要素', title: '数据挖掘', desc: '价值发现', parent: 'c6', heat: 5300 },
  { id: 'c6-6', type: '数据要素', title: 'ETL', desc: '数据抽取转换加载', parent: 'c6', heat: 1800 },
  { id: 'c6-7', type: '数据要素', title: '数据库', desc: '向量数据库等', parent: 'c6', heat: 6700 },

  // 7. AI安全
  { id: 'c7', type: 'AI安全', title: 'AI安全', isCategory: true },
  { id: 'c7-1', type: 'AI安全', title: '大模型幻觉', desc: '幻觉评测与抑制', parent: 'c7', heat: 7600 },
  { id: 'c7-2', type: 'AI安全', title: '数据安全', desc: '隐私保护', parent: 'c7', heat: 6200 },
  { id: 'c7-3', type: 'AI安全', title: '法律法规', desc: 'AI 监管政策', parent: 'c7', heat: 4800 },
  { id: 'c7-4', type: 'AI安全', title: '版权保护', desc: '生成内容确权', parent: 'c7', heat: 5100 },
  { id: 'c7-5', type: 'AI安全', title: '伦理安全', desc: 'AI 对齐', parent: 'c7', heat: 3900 },

  // 8. 自智网络
  { id: 'c8', type: '自智网络', title: '自智网络', isCategory: true },
  { id: 'c8-1', type: '自智网络', title: '移动内部', desc: '内网智能运维', parent: 'c8', heat: 4500 },
  { id: 'c8-2', type: '自智网络', title: '移动外宣', desc: '品牌形象传播', parent: 'c8', heat: 2800 }
];

export const DATA_NODES = computeGraphPositions();