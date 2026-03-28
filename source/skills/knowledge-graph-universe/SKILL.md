---
name: knowledge-graph-universe
description: Generate a highly interactive, 3D spatial knowledge graph and heatmap universe using React Three Fiber. Invoke when a user requests to build a 3D data visualization, starry background, or spatial dashboard.
user-invocable: true
---

# 知识图谱宇宙 (Knowledge Graph Universe)

This skill provides the architectural principles, component structures, and code templates to implement a high-performance, visually stunning 3D knowledge graph and heatmap universe using React Three Fiber, Three.js, and framer-motion.

## 1. 设计原理 (Design Principles)

1. **极简与高性能背景 (High-Performance Background)**
   - 不使用沉重的 WebGL 渲染全屏背景，而是通过纯 CSS3（`@keyframes` + `box-shadow` + 径向渐变 + `mix-blend-multiply`）实现极低延迟（<100ms）的浅色系星空、银河光带与低饱和度星云纹理。
2. **降维展开的三维映射 (Spatial Mapping)**
   - 将树状或扁平的数据结构，通过数学算法（如黄金角螺旋 137.5° 或多层球面分布）散布到 3D 空间中，形成立体的“星云盘”或“多层星系”结构。
3. **数据驱动的视觉层级 (Data-Driven Visual Hierarchy)**
   - 利用数据的热度（Heat Score）动态映射 3D 星球的大小（`scale`）、自转速度、发光强度（`emissiveIntensity`），以及外围全息轨道环（`ringGeometry`）的数量和角度，建立直观的视觉梯队。
4. **平滑的镜头漫游 (Smooth Camera Roaming)**
   - 配合 `OrbitControls`，在节点点击时使用 `camera.position.lerp` 和 `controls.target.lerp` 实现平滑的推拉与聚焦动画。

## 2. 核心组件拆解 (Core Components)

- **`LightUniverseBackground`**: 纯 CSS 实现的宇宙背景。包含基础渐变、银河光带、星云纹理以及基于 DOM 的点阵星光。
- **`Scene / HeatmapScene`**: 3D 画布入口。提供环境光（`ambientLight`）、多色点光源（`pointLight`）以及视角控制器。
- **`Node / HeatmapNode`**: 单个星球节点。包含 `sphereGeometry`（核心球体）、自定义高光材质、基于时间函数的浮动动画以及光晕 Mesh。
- **`HolographicRings`**: 全息轨道环。基于数据热度动态渲染 1~3 层圆环，应用加色混合（`AdditiveBlending`）实现科幻感发光。
- **`ConnectionLines`**: 节点之间的 3D 连线，使用 `bufferGeometry` 和 `lineBasicMaterial` 构建，根据激活状态动态改变透明度和粗细。
- **`NodeLabel`**: HTML 标签层。基于 Drei 的 `Html` 组件，处理文本在 3D 空间的投射与交互（Hover、Click）。

## 3. 示例代码 (Code Templates)

See the scripts in the `./scripts` directory or the reference examples in the `./examples` directory for full implementations.

Below are the core concepts highlighted:

### 3.1 纯 CSS 星空背景 (LightUniverseBackground)
```tsx
import React, { useMemo } from 'react';

export function LightUniverseBackground() {
  const stars = useMemo(() => Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 0.5,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 2}s`
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#f8fafc]">
      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        .star-particle { animation: twinkle infinite ease-in-out; will-change: opacity; }
      `}</style>
      
      {/* 渐变与星云 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/80 via-[#f8fafc] to-slate-100/50"></div>
      <div className="absolute top-0 left-0 w-[60%] h-[60%] rounded-full bg-blue-200/20 blur-[100px] mix-blend-multiply"></div>
      
      {/* 粒子遍历渲染 */}
      {stars.map((star) => (
        <div key={star.id} className="absolute rounded-full star-particle bg-blue-400/80"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay, animationDuration: star.duration }}
        />
      ))}
    </div>
  );
}
```

### 3.2 动态 3D 星球与轨道 (HeatmapNode)
```tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function HeatmapNode({ data, onClick }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const [hovered, setHover] = useState(false);
  
  const heat = data.heatScore || 0;
  const scale = 1.5 * (0.8 + (heat / 100) * 1.5); 
  const color = heat >= 90 ? '#f97316' : '#38bdf8';

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + data.pos[0]) * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * (0.4 + (heat/100) * 0.8);
      ringRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group position={data.pos} ref={meshRef}>
      {/* 核心星球 */}
      <mesh 
        onClick={() => onClick(data)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={[scale, scale, scale]}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2 : 1} />
      </mesh>

      {/* 动态全息轨道环 */}
      {heat > 50 && (
        <group ref={ringRef} scale={[scale, scale, scale]}>
          <mesh rotation={[Math.PI / 2 + 0.2, 0.2, 0]}>
            <ringGeometry args={[2.2, 2.3, 32]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      )}
    </group>
  );
}
```

### 3.3 斐波那契螺旋散布算法 (Spatial Distribution)
```javascript
const generateSpiralNodes = (nodes) => {
  return nodes.map((node, i) => {
    const normalizedHeat = node.heatScore / 100;
    // 越热的节点越靠近中心，较冷的节点被推向外围
    const radius = (1 - normalizedHeat) * 300 + (Math.random() * 80);
    // 黄金角 137.5度
    const angle = i * 137.5 * (Math.PI / 180); 
    // Y轴高度随机偏移，形成扁平的星云盘
    const heightOffset = (Math.random() - 0.5) * (60 - normalizedHeat * 40);
    
    return {
      ...node,
      pos: [Math.cos(angle) * radius, heightOffset, Math.sin(angle) * radius]
    };
  });
};
```