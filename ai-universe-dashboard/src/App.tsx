import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo, useRef, useState, useEffect } from 'react';
import { DATA_NODES, CATEGORIES } from './data';
import { NodeLabel } from './components/NodeLabel';
import { DetailPanel } from './components/DetailPanel';

// --- 3D Scene Components ---

function ConnectionLines({ activeNode }) {
  const lineData = useMemo(() => {
    const lines = [];
    
    // We only connect children to their parents to form clusters
    DATA_NODES.forEach(node => {
      if (node.parent) {
        const parentNode = DATA_NODES.find(n => n.id === node.parent);
        if (parentNode && node.pos && parentNode.pos) {
          
          // Determine color and opacity based on active state
          let isActive = false;
          if (activeNode) {
            isActive = (node.id === activeNode.id) || (parentNode.id === activeNode.id);
          }

          // Use the parent category's color for the line
          const baseColor = CATEGORIES[parentNode.type]?.color || '#94a3b8';
          
          lines.push({
            points: [new THREE.Vector3(...node.pos), new THREE.Vector3(...parentNode.pos)],
            color: isActive ? baseColor : '#94a3b8',
            opacity: isActive ? 0.8 : (activeNode ? 0.05 : 0.3),
            lineWidth: isActive ? 2 : 1
          });
        }
      }
    });
    return lines;
  }, [activeNode]);

  return (
    <group>
      {lineData.map((line, i) => (
        <line key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                line.points[0].x, line.points[0].y, line.points[0].z,
                line.points[1].x, line.points[1].y, line.points[1].z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={line.color} 
            transparent 
            opacity={line.opacity} 
            linewidth={line.lineWidth} 
          />
        </line>
      ))}
    </group>
  );
}

function CategoryCloud({ data }) {
  const color = CATEGORIES[data.type]?.color || '#94a3b8';
  
  // A subtle ambient cloud/glow behind the category cluster
  return (
    <mesh position={data.pos}>
      <sphereGeometry args={[55, 32, 32]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.02} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function Node({ data, onClick, activeNode }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const color = CATEGORIES[data.type]?.color || '#94a3b8';
  
  useCursor(hovered);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle float animation
      meshRef.current.position.y = data.pos[1] + Math.sin(state.clock.elapsedTime * 0.5 + data.pos[0]) * (data.isCategory ? 2 : 1);
    }
  });

  // Calculate opacity based on distance to camera or active node
  const opacity = useMemo(() => {
    if (!activeNode) return data.isCategory ? 1 : 0.8;
    if (activeNode.id === data.id) return 1;
    if (data.parent === activeNode.id) return 1;
    if (activeNode.parent === data.id) return 1;
    if (activeNode.parent === data.parent) return 0.6; // siblings
    return 0.1; // others fade out heavily
  }, [activeNode, data]);

  return (
    <group position={data.pos} ref={meshRef}>
      {/* Core Sphere */}
      <mesh 
        onClick={(e) => { e.stopPropagation(); onClick(data); }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
      >
        <sphereGeometry args={[data.isCategory ? 8 : 3, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          transparent
          opacity={opacity}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Halo Ring for Categories */}
      {data.isCategory && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[11, 12, 64]} />
          <meshBasicMaterial color={color} transparent opacity={opacity * 0.6} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* HTML Label */}
      <NodeLabel node={data} onClick={onClick} opacity={opacity} />
    </group>
  );
}

function StarField() {
  const count = 3000;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for(let i=0; i<count; i++) {
      positions[i*3] = (Math.random() - 0.5) * 800;   // x
      positions[i*3+1] = (Math.random() - 0.5) * 800; // y
      positions[i*3+2] = (Math.random() - 0.5) * 800; // z
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} color="#94a3b8" transparent opacity={0.4} sizeAttenuation={true} />
    </points>
  );
}

function Scene({ onNodeClick, activeNode }) {
  const { camera } = useThree();
  const controlsRef = useRef();

  // Handle camera animation when a node is selected
  useEffect(() => {
    if (activeNode && controlsRef.current) {
      const [x, y, z] = activeNode.pos;
      // Define a target position for the camera slightly in front of the node
      const targetPos = new THREE.Vector3(x, y, z + (activeNode.isCategory ? 150 : 80));
      
      // Animate camera position
      let progress = 0;
      const animateCamera = () => {
        progress += 0.05;
        if (progress <= 1) {
          camera.position.lerp(targetPos, 0.08);
          controlsRef.current.target.lerp(new THREE.Vector3(x, y, z), 0.08);
          controlsRef.current.update();
          requestAnimationFrame(animateCamera);
        }
      };
      animateCamera();
    } else if (!activeNode && controlsRef.current) {
        // Return to overview
        const targetPos = new THREE.Vector3(0, 0, 450);
        let progress = 0;
        const animateCamera = () => {
          progress += 0.02;
          if (progress <= 1) {
            camera.position.lerp(targetPos, 0.05);
            controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
            controlsRef.current.update();
            requestAnimationFrame(animateCamera);
          }
        };
        animateCamera();
    }
  }, [activeNode, camera]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[100, 100, 100]} intensity={1} />
      <pointLight position={[-100, -100, -100]} intensity={0.5} />
      
      <group>
        <ConnectionLines activeNode={activeNode} />
        {DATA_NODES.map((node) => (
          <group key={node.id}>
            {node.isCategory && <CategoryCloud data={node} />}
            <Node data={node} onClick={onNodeClick} activeNode={activeNode} />
          </group>
        ))}
      </group>
      
      <OrbitControls 
        ref={controlsRef}
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        minDistance={10}
        maxDistance={800}
      />
    </>
  );
}

function CameraController({ targetNode }) {
  // handled in Scene now
  return null;
}

// --- Main App Component ---

function App() {
  const [activeNode, setActiveNode] = useState(null);

  const handleNodeClick = (node) => {
    setActiveNode(node);
  };

  return (
    <div className="w-full h-screen bg-slate-50 relative overflow-hidden font-sans text-slate-900">
      
      {/* Background Decorators */}
      <div className="absolute inset-0 bg-tech-grid pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-vignette pointer-events-none z-0"></div>
      
      {/* Decorative ambient glows in corners */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-400/5 blur-[120px] pointer-events-none z-0"></div>

      {/* Header Overlay */}
      <header className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-20 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 text-white font-black text-xl">
            M
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">China Mobile AI Universe</h1>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Knowledge Graph v2.0</p>
          </div>
        </div>
        
        <div className="flex gap-2 pointer-events-auto">
          <div className="px-3 py-1 bg-white/50 backdrop-blur-md rounded-full border border-slate-200 text-xs font-medium text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Operational
          </div>
        </div>
      </header>

      {/* Instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-slate-100 flex gap-6 text-xs font-medium text-slate-500 pointer-events-auto">
          <span className="flex items-center gap-2">
            <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-mono">LMB</kbd>
            Rotate
          </span>
          <span className="flex items-center gap-2">
            <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-mono">Scroll</kbd>
            Zoom
          </span>
          <span className="flex items-center gap-2">
            <kbd className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-mono">Click</kbd>
            Details
          </span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 450], fov: 60 }}>
          {/* We remove the background color from canvas to let the CSS background show through */}
          <fog attach="fog" args={['#f8fafc', 300, 1000]} />
          <Scene onNodeClick={handleNodeClick} activeNode={activeNode} />
        </Canvas>
      </div>

      {/* Detail Slide-over Panel */}
      {activeNode && (
        <DetailPanel 
          node={activeNode} 
          onClose={() => setActiveNode(null)} 
        />
      )}
      
    </div>
  );
}

export default App;