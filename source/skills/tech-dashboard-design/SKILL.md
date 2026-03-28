---
name: tech-dashboard-design
description: 设计并开发具有极强科技感、3D空间感和流畅动画的复杂数据可视化大屏。在用户需要开发数据仪表盘、3D星系图谱、炫酷大屏或空间级复杂视图转场时调用。
license: MIT
---

# Tech Dashboard Design (科技大屏与3D空间数据可视化设计)

当用户要求构建具有“科技感”、“赛博朋克”、“空间感”、“数据图谱”或“炫酷大屏”的界面时，遵循以下核心设计理念、动画范式与交互细节。这套规范源自 AI Universe Dashboard 的沉淀。

## 1. 核心设计理念 (Core Design Philosophy)

- **深空沉浸感 (Deep Space Immersion)**
  以深色（如 Slate-900, `#0f172a`）或深空蓝/深邃紫作为环境底色。背景可叠加极其微弱的网格线 (`bg-tech-grid`)、暗角 (`vignette`) 或大范围极弱的径向渐变光晕 (`blur-[120px]`)。
- **空间与层级 (Spatial Hierarchy)**
  打破 2D 平面限制，利用 React Three Fiber / Three.js 构建 3D 星系或网络拓扑。通过元素的**大小、Z轴深度、亮度**来直观展现数据的权重与热度。
  - 例如：Top 10% 的爆火节点巨大且带有红色光晕，处于视觉前景；常态节点则缩小并退居背景，呈现空间纵深。
- **生命感与微动效 (Liveness & Micro-interactions)**
  界面中的元素不应该是死板的。所有 3D 节点需具备基础的呼吸/悬浮动画（如利用 `Math.sin(time)` 进行 Y 轴缓动）；UI 控件（如核心按钮）需带有能量流转、光环自转等微动效。

## 2. 关键交互与动画范式 (Key Interactions & Animations)

### 2.1 空间折跃式转场 (Spatial Warp Transitions)
在不同的全局视图（如：知识图谱视图 <-> 热力聚合视图）切换时，绝对避免生硬的 DOM 替换。
- **UI 层的动态模糊 (Dynamic Blur)**：使用 Framer Motion 的 `AnimatePresence`，配置 `filter: 'blur(20px)'` 到 `blur(0px)` 的过渡，同时伴随轻微的 `scale` 缩放，营造“视觉失焦再重新聚焦”的科技感。
- **3D 摄像机飞入 (Camera Fly-in)**：视图挂载时，`camera` 起始位置应设于极高/极远处（如 `[0, -200, 1000]`），利用 `requestAnimationFrame` 和 `camera.position.lerp()` 极速且平滑地俯冲拉入目标机位（如 `[0, 0, 300]`），形成强烈的空间穿梭感和镜头冲击力。

### 2.2 悬浮与聚焦状态 (Hover & Focus States)
- **3D WebGL 层**：
  - **Hover 时**：提高节点材质的自发光强度 (`emissiveIntensity`)。
  - **Click/Active 时**：选中的节点及其关联节点保持 100% 不透明度 (`opacity: 1`)，而将非相关节点大幅暗化退底（如 `opacity: 0.15`），实现极致的视觉聚焦。
- **HTML DOM 层**：
  - **Hover 时**：利用 Tailwind CSS 实现多层阴影叠加。例如 `shadow-[0_0_40px_rgba(...),_inset_0_0_35px_rgba(...)]`，并伴随边框颜色的提亮，模拟能量激活。
  - 辅以弹簧动画 (`type: "spring", stiffness: 400, damping: 25`) 横向滑出提示标签。

### 2.3 能量与轨道表现 (Energy & Orbital Effects)
- **全息轨道环 (Holographic Rings)**：高权重节点周围必须环绕多层半透明圆环（`ringGeometry` + `AdditiveBlending`）。环在 X/Y/Z 轴有轻微的倾斜角，并使用 `useFrame` 进行不同速率的反向旋转。
- **体积光晕 (Volumetric Glow)**：最核心的节点叠加一个稍大、无深度写入 (`depthWrite: false`) 且低透明度的球体，形成内发光的“核聚变”效果。
- **DOM 3D 偏转环**：在 2D HTML 按钮上，通过 `rotateX: '70deg', rotateY: '15deg'` 等配合 CSS `border` 创造出具有伪 3D 景深的环形轨道，并加上持续的 `rotateZ: 360` 线性无缝旋转动画。

## 3. 技术实现基准 (Technical Standards)

- **性能底线 (Performance Baseline)**：
  - 3D 场景中 HTML 标签层（如 `<Html>` 或自定义 DOM 覆盖）数量多时，**严禁在这些标签上使用消耗极大的 CSS 属性**（如大面积的 `box-shadow` 或频繁触发回流的尺寸计算），改用简单的边框和透明度以保持 60fps。
  - WebGL 渲染优化：按需渲染复杂几何体。例如只给 Top 热度或激活节点渲染发光圈和多层轨道，普通节点使用低面数（Segments）几何体。
- **调色板参考 (Color Palette)**：
  - 爆火/核心：`#ef4444` (Red), `#f97316` (Orange)
  - 高热/警告：`#eab308` (Yellow)
  - 常态/数据：`#38bdf8` (Sky), `#64748b` (Slate)
  - 新星/特殊：`#ec4899` (Fuchsia)

## 4. 最佳实践代码结构 (Code Structure Pattern)

- **UI 层与 WebGL 层分离**：在 React 中，利用绝对定位将 UI 悬浮于 `<Canvas>` 之上。UI 层负责点击拦截（`pointer-events-auto`），画布层负责 3D 交互。
- **数据衍生状态**：不要在组件内硬编码状态，通过 `useMemo` 将原始数据映射为 3D 坐标 `[x, y, z]` 和热度缩放比例，便于切换排序/过滤条件时自动触发动画更新。
