// @ts-nocheck
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { getDerivedHeatmapData, getKeywordDetails } from '../data';
import { NodeLabel } from './NodeLabel';

// Custom component for the discrete glowing planets in heatmap mode
function HeatmapNode({ data, onClick, activeNode, rank }) {
  const meshRef = useRef();
  const ringRef = useRef();
  const [hovered, setHover] = useState(false);
  
  useCursor(hovered);

  // Normalize heat to determine size and brightness based on 100-point scale
  const heat = data.heatScore || 0;
  const normalizedHeat = heat / 100;
  
  // Calculate visual properties based on heat and rank
  const isTop3 = rank < 3;
  const isTop10 = rank < 10;
  
  // Make top planets significantly larger to establish hierarchy
  const baseScale = isTop3 ? 4 : (isTop10 ? 2.5 : 1.5);
  // Exaggerate scale differences based on heat
  const scale = baseScale * (0.8 + normalizedHeat * 1.5); 
  
  // Determine color based on status and heat
  const color = useMemo(() => {
    if (data.isNew) return '#ec4899'; // Fuchsia for new
    if (heat >= 90) return '#f97316'; // Orange for very hot
    if (heat >= 75) return '#eab308'; // Yellow for warm
    if (heat >= 60) return '#38bdf8'; // Sky blue for average
    return '#64748b'; // Slate for cool
  }, [heat, data.isNew]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating animation, faster for top ones
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * (isTop3 ? 1.5 : 0.5) + data.pos[0]) * (isTop3 ? 0.05 : 0.02);
      
      // Top planets rotate themselves
      if (isTop10) {
        meshRef.current.rotation.y += delta * (0.5 + normalizedHeat);
      }
    }
    
    // Animate rings - faster for hot planets
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * (0.4 + normalizedHeat * 0.8);
      ringRef.current.rotation.y -= delta * (0.2 + normalizedHeat * 0.5);
    }
  });

  // Calculate opacity
  const isActive = activeNode && activeNode.id === data.id;
  const opacity = useMemo(() => {
    if (!activeNode) return 0.9;
    if (isActive) return 1;
    // Dim others significantly when one is selected
    return 0.15;
  }, [activeNode, data, isActive]);

  // Show all labels, rely on CSS optimization in NodeLabel to prevent lag
  const showLabel = true;
  
  return (
    <group position={data.pos} ref={meshRef}>
      {/* Core Planet Sphere */}
      <mesh 
        onClick={(e) => { 
          e.stopPropagation(); 
          // Get full details when clicked
          const fullDetails = getKeywordDetails(data);
          onClick(fullDetails); 
        }}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
        scale={[scale, scale, scale]}
      >
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={hovered ? 2 : (0.6 + normalizedHeat * 1.5)}
          transparent
          opacity={opacity}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Intense Volumetric Glow for top planets */}
      {isTop3 && (
        <mesh scale={[scale * 2.2, scale * 2.2, scale * 2.2]}>
          <sphereGeometry args={[1.5, 24, 24]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.15 * opacity} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Volumetric Glow for hot planets */}
      {heat > 60 && (
        <mesh scale={[scale * 1.8, scale * 1.8, scale * 1.8]}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={Math.min(0.15 * normalizedHeat * opacity, 0.4)} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Orbital Rings */}
      {(heat > 50 || data.isNew) && (
        <group ref={ringRef} scale={[scale, scale, scale]}>
          {/* Ring 1 */}
          <mesh rotation={[Math.PI / 2 + 0.2, 0.2, 0]}>
            <ringGeometry args={[2.2, isTop10 ? 2.35 : 2.3, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.6 * opacity} 
              side={THREE.DoubleSide} 
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          {/* Ring 2 (for hotter nodes) */}
          {heat > 75 && (
            <mesh rotation={[Math.PI / 2 - 0.4, -0.2, 0]}>
              <ringGeometry args={[2.8, isTop3 ? 3.0 : 2.85, 32]} />
              <meshBasicMaterial 
                color={color} 
                transparent 
                opacity={0.5 * opacity} 
                side={THREE.DoubleSide} 
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          )}
          {/* Ring 3 (for top 3 nodes only) */}
          {isTop3 && (
            <mesh rotation={[Math.PI / 2 + 0.5, 0.5, 0.5]}>
              <ringGeometry args={[3.4, 3.45, 64]} />
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={0.3 * opacity} 
                side={THREE.DoubleSide} 
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          )}
        </group>
      )}

      {/* HTML Label - Optimized to only show for important/active nodes */}
      {showLabel && opacity > 0.1 && (
        <NodeLabel 
          node={{ ...data, title: data.keyword, type: data.category, heat: data.heatScore }} 
          onClick={() => onClick(getKeywordDetails(data))} 
          opacity={opacity} 
        />
      )}
    </group>
  );
}

export function HeatmapScene({ onNodeClick, activeNode, timeRange, sortType }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  
  // Scatter nodes differently for heatmap view to look more like a nebula
  // Calculate positions when data or filters change
  const scatteredNodes = useMemo(() => {
    // Get the top 25 derived data based on filters
    const derivedData = getDerivedHeatmapData(timeRange, sortType);
    const sorted = [...derivedData.keywords].slice(0, 25);
    
    return sorted.map((node, i) => {
      const heat = node.heatScore;
      const normalizedHeat = heat / 100; // 0 to 1
      
      // Hotter nodes are closer to center, cooler nodes are pushed out
      // Increase radius for better spread
      const radius = (1 - normalizedHeat) * 300 + (Math.random() * 80);
      
      // Spiral/nebula distribution
      const angle = i * 137.5 * (Math.PI / 180); // Golden angle
      // Flatter nebula
      const heightOffset = (Math.random() - 0.5) * (60 - normalizedHeat * 40);
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = heightOffset;

      return {
        ...node,
        pos: [x, y, z]
      };
    });
  }, []);

  // Handle camera animation when a node is selected and on mount
  useEffect(() => {
    let animationFrameId;

    if (activeNode && controlsRef.current) {
      const activeScatteredNode = scatteredNodes.find(n => n.id === activeNode.id);
      if (!activeScatteredNode) return;

      const [x, y, z] = activeScatteredNode.pos;
      // Closer view for heatmap nodes
      const targetPos = new THREE.Vector3(x, y, z + 60);
      
      let progress = 0;
      const animateCamera = () => {
        progress += 0.05;
        if (progress <= 1) {
          camera.position.lerp(targetPos, 0.08);
          controlsRef.current.target.lerp(new THREE.Vector3(x, y, z), 0.08);
          controlsRef.current.update();
          animationFrameId = requestAnimationFrame(animateCamera);
        }
      };
      animateCamera();
    } else if (!activeNode && controlsRef.current) {
        // Return to overview - flat on perspective to match taxonomy
        const targetPos = new THREE.Vector3(0, 0, 300); 
        let progress = 0;
        const animateCamera = () => {
          progress += 0.02;
          if (progress <= 1) {
            camera.position.lerp(targetPos, 0.05);
            controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
            controlsRef.current.update();
            animationFrameId = requestAnimationFrame(animateCamera);
          }
        };
        animateCamera();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeNode, camera, scatteredNodes]);

  // Set initial camera position on mount for heatmap view
  useEffect(() => {
    // Initial camera position matches the exact view user requested
    // Start significantly further back and lower to fly in and up
    camera.position.set(0, -200, 1000);
    camera.lookAt(0, 0, 0);
    
    // Fly in animation on mount
    const targetPos = new THREE.Vector3(0, 0, 300);
    let progress = 0;
    let animationFrameId;
    
    const animateCamera = () => {
      progress += 0.015;
      if (progress <= 1) {
        // Use a faster lerp for a more dynamic "snap" into place
        camera.position.lerp(targetPos, 0.06);
        if (controlsRef.current) {
          controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.06);
          controlsRef.current.update();
        }
        animationFrameId = requestAnimationFrame(animateCamera);
      }
    };
    animationFrameId = requestAnimationFrame(animateCamera);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[100, 100, 100]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-100, -100, -100]} intensity={0.8} color="#f97316" />
      <pointLight position={[0, 50, 0]} intensity={2} color="#38bdf8" />
      
      <group>
        {scatteredNodes.map((node, index) => (
          <HeatmapNode key={node.id} data={node} onClick={onNodeClick} activeNode={activeNode} rank={index} />
        ))}
      </group>
      
      <OrbitControls 
        ref={controlsRef}
        enablePan={true} 
        enableZoom={true} 
        enableRotate={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        minDistance={20}
        maxDistance={600}
      />
    </>
  );
}
