import React, { useMemo } from 'react';

export function LightUniverseBackground() {
  // Generate random stars for CSS particle effect (pure CSS to ensure <100ms load performance)
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => {
      const size = Math.random() * 2 + 0.5;
      // Use light blue/purple for stars so they are visible on light background
      const colors = ['rgba(147,197,253,0.8)', 'rgba(196,181,253,0.8)', 'rgba(255,255,255,0.9)'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: Math.random() * 0.6 + 0.3,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        backgroundColor: color
        // Removed box-shadow for better performance on 60+ elements
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#f8fafc]">
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
          .star-particle {
            animation-name: twinkle;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            will-change: opacity;
          }
        `}
      </style>

      {/* 1. Base Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/80 via-[#f8fafc] to-slate-100/50"></div>

      {/* 2. Soft Galaxy Light Bands (Silver/Blue) */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(224,242,254,0)_0%,rgba(186,230,253,0.3)_50%,rgba(224,242,254,0)_100%)] blur-[80px] transform -rotate-45"></div>
        <div className="absolute top-[20%] left-[-20%] w-[140%] h-[60%] bg-gradient-to-r from-transparent via-indigo-100/40 to-transparent blur-[60px] transform rotate-12"></div>
      </div>

      {/* 3. Low Saturation Nebula Textures */}
      <div className="absolute top-0 left-0 w-[60%] h-[60%] rounded-full bg-blue-200/20 blur-[100px] mix-blend-multiply"></div>
      <div className="absolute bottom-0 right-0 w-[70%] h-[70%] rounded-full bg-purple-200/20 blur-[120px] mix-blend-multiply"></div>
      <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-teal-100/20 blur-[90px] mix-blend-multiply"></div>

      {/* 4. Subtle Starlight Particles */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full star-particle"
            style={{
              left: star.left,
              top: star.top,
              width: star.width,
              height: star.height,
              opacity: star.opacity,
              backgroundColor: star.backgroundColor,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration
            }}
          />
        ))}
      </div>
      
      {/* 5. Subtle Tech Grid for structural feel */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #94a3b8 1px, transparent 1px),
            linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
        }}
      ></div>
    </div>
  );
}
