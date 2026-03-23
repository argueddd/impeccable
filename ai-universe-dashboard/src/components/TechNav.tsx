import { motion } from 'framer-motion';
import { ExternalLink, Flame, Globe2, Zap } from 'lucide-react';

/**
 * PlatformButton - 智能体开发平台
 * 设计理念：深空能源核心。Hover 时激发出多重星轨与核心能量爆发。
 */
export function PlatformButton() {
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
      <motion.a
        href="https://agent.shaanxi.mobile"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover="hover"
        className="group relative flex flex-col items-center justify-center w-20 h-20 cursor-pointer"
      >
        {/* 核心球体 - 深蓝色基调 */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-blue-900/40 border border-blue-400/40 shadow-[inset_0_0_25px_rgba(59,130,246,0.5)] z-10 overflow-hidden backdrop-blur-md"
          variants={{
            hover: { 
              scale: 1.1,
              borderColor: "rgba(96,165,250,0.8)",
              backgroundColor: "rgba(30,58,138,0.6)",
              boxShadow: "0 0 40px rgba(59,130,246,0.6), inset 0 0 35px rgba(96,165,250,0.6)"
            }
          }}
        >
          {/* 球体内部流光 - 深邃蓝光 */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,0.5)_0%,transparent_75%)]"
            animate={{ 
              opacity: [0.5, 0.9, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Globe2 size={28} className="text-blue-300 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
          </div>
        </motion.div>

        {/* 外部星轨系统 - 更亮的蓝色系，增强不透明度和光晕 */}
        <div className="absolute inset-[-40px] pointer-events-none">
          {/* 轨道 1: 垂直偏转环 - 亮蓝色 */}
          <motion.div 
            className="absolute inset-0 border-[1.5px] border-blue-400/60 rounded-full opacity-0 group-hover:opacity-100 shadow-[inset_0_0_10px_rgba(96,165,250,0.3)]"
            style={{ rotateX: '70deg', rotateY: '10deg' }}
            animate={{ rotateZ: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-300 rounded-full shadow-[0_0_20px_rgba(96,165,250,1),0_0_10px_rgba(255,255,255,0.8)]" />
          </motion.div>

          {/* 轨道 2: 水平偏转环 - 青蓝色 */}
          <motion.div 
            className="absolute inset-4 border-[1.5px] border-cyan-400/50 rounded-full opacity-0 group-hover:opacity-100 shadow-[inset_0_0_10px_rgba(34,211,238,0.3)]"
            style={{ rotateX: '20deg', rotateY: '60deg' }}
            animate={{ rotateZ: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(34,211,238,1),0_0_8px_rgba(255,255,255,0.8)]" />
          </motion.div>
        </div>

        {/* 悬浮文字 - 隐藏默认，Hover时横向滑出显示 */}
        <motion.div 
          className="absolute left-full ml-4 pointer-events-none"
          initial={{ x: 0, opacity: 0 }}
          variants={{
            hover: { x: 15, opacity: 1 }
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25
          }}
        >
          <div className="relative">
            {/* 深蓝色半透明背景框 */}
            <div className="px-4 py-2 bg-slate-900/90 backdrop-blur-md border border-blue-500/40 rounded-xl shadow-[0_8px_30px_rgba(30,58,138,0.4)]">
              <span className="text-[13px] font-black text-blue-100 tracking-[0.2em] whitespace-nowrap flex items-center gap-2">
                智能体开发平台
                <ExternalLink size={12} className="text-blue-400" />
              </span>
            </div>
            {/* 文字背后的能量条 (改为底部水平扫描) */}
            <motion.div 
              className="absolute -bottom-[2px] left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"
              animate={{ width: ['0%', '100%', '0%'], left: ['50%', '0%', '50%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* 入口提示 - 移除，因为已经移到文字旁边了 */}
      </motion.a>
    </div>
  );
}

/**
 * HeatmapButton - 热词聚合模式
 * 设计理念：燃烧的恒星。Hover 时产生强烈的热力扩散与引力环。
 */
export function HeatmapButton() {
  return (
    <motion.button
      whileHover="hover"
      className="group relative flex items-center justify-center w-14 h-14 cursor-pointer pointer-events-auto"
    >
      {/* 核心球体 - 太阳感，颜色变浅变亮 */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-orange-400/10 border border-orange-400/40 z-10 overflow-hidden backdrop-blur-sm"
        variants={{
          hover: { 
            scale: 1.15,
            borderColor: "rgba(249,115,22,0.8)",
            backgroundColor: "rgba(249,115,22,0.2)",
            boxShadow: "0 0 45px rgba(249,115,22,0.6), inset 0 0 25px rgba(249,115,22,0.5)"
          }
        }}
      >
        {/* 内部熔岩流动效果 */}
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.7)_0%,transparent_75%)]"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <Flame size={24} className="text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,1)]" />
        </div>
      </motion.div>

      {/* 引力环 - 扩张动画，颜色加深加亮 */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-[1.5px] border-red-500/60 rounded-full pointer-events-none shadow-[inset_0_0_10px_rgba(239,68,68,0.3)]"
          variants={{
            hover: {
              scale: [1, 1.8 + i * 0.4],
              opacity: [0.9, 0],
            }
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut"
          }}
        />
      ))}

      {/* 侧边悬浮标签 - Hover时显示，并带弹簧滑出效果 */}
      <motion.div
        className="absolute right-full mr-4 pointer-events-none"
        initial={{ x: 0, opacity: 0 }}
        variants={{
          hover: { x: -15, opacity: 1 }
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25
        }}
      >
        <div className="relative">
          {/* 增加半透明深色背景框 */}
          <div className="px-4 py-2 bg-slate-900/90 backdrop-blur-md border border-orange-500/40 rounded-xl shadow-[0_8px_30px_rgba(153,27,27,0.4)]">
            <span className="text-[13px] font-black text-orange-100 tracking-[0.2em] whitespace-nowrap flex items-center gap-2">
              热词聚合模式
              <Zap size={12} className="text-orange-400 animate-pulse" />
            </span>
          </div>
          {/* 文字背后的能量条 */}
          <motion.div 
            className="absolute -bottom-[2px] left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full"
            animate={{ width: ['0%', '100%', '0%'], left: ['50%', '0%', '50%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.button>
  );
}

