'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PremiumIndustrialRO() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate stable random values only on the client
    setBubbles([...Array(8)].map((_, i) => ({
      id: i,
      size: Math.random() * 8 + 4,
      left: Math.random() * 80 + 10,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 3,
      xMove: Math.random() * 30 - 15
    })));
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible [perspective:1200px]">
      
      {/* Intense Ambient Glow for Industrial feel */}
      <motion.div 
        className="absolute w-[400px] h-[400px] bg-slate-600 rounded-full mix-blend-screen filter blur-[100px] opacity-30"
        animate={{ 
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The Central Tank - 3D Glass Cylinder */}
      <motion.div 
        className="relative z-10 w-[140px] h-[300px] rounded-full backdrop-blur-md bg-gradient-to-br from-white/30 to-white/5 border border-white/40 shadow-[0_30px_50px_-15px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.4)] overflow-hidden"
        animate={{ 
          y: [-10, 10, -10],
          rotateY: [0, 10, -10, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated Water Level rising and falling */}
        <motion.div 
          className="absolute bottom-0 w-[140px] bg-gradient-to-t from-blue-700 to-cyan-400 opacity-90 shadow-[0_0_30px_rgba(6,182,212,0.8)]"
          animate={{ 
            height: ["30%", "80%", "30%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
             {/* Wave Effect top */}
            <motion.div 
                className="absolute -top-[10px] w-[200px] h-[20px] bg-cyan-300 rounded-[50%] opacity-50 block"
                animate={{ x: [-20, 0, -20] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>

        {/* Specular Highlight (Reflection of glass) */}
        <div className="absolute top-[5%] left-[10%] w-[10px] h-[80%] rounded-full bg-white opacity-40 blur-[2px]"></div>
      </motion.div>

      {/* Surrounding Orbital Pipes/Filters */}
      <motion.div 
        className="absolute w-[300px] h-[300px] border-2 border-slate-700/50 rounded-full"
        animate={{ rotateX: 70, rotateZ: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
          {/* Orbital Filter Node */}
          <div className="absolute top-0 left-1/2 w-8 h-16 bg-gradient-to-b from-slate-400 to-slate-800 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-slate-300 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex items-center justify-center">
             <motion.div 
                className="w-full h-full bg-blue-500/20"
                animate={{ opacity: [0.1, 0.8, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
             />
          </div>
      </motion.div>
      
      {/* Outer Ring */}
      <motion.div 
        className="absolute w-[450px] h-[450px] border border-cyan-500/20 rounded-full border-dashed"
        animate={{ rotateX: 60, rotateY: 20, rotateZ: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute bottom-1/4 right-0 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,1)] translate-x-1/2"></div>
      </motion.div>

      {/* Floating Particles/Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={`bubble-${bubble.id}`}
          className="absolute rounded-full bg-cyan-200 blur-[2px] opacity-60"
          style={{
            width: bubble.size + 'px',
            height: bubble.size + 'px',
            left: bubble.left + '%',
          }}
          animate={{
            y: [150, -250],
            x: [0, bubble.xMove],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "linear",
            delay: bubble.delay
          }}
        />
      ))}

    </div>
  );
}
