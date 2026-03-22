'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function PremiumWaterDrop() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Generate stable random values only on the client
    Promise.resolve().then(() => {
      setBubbles([...Array(5)].map((_, i) => ({
        id: i,
        size: Math.random() * 15 + 5,
        left: Math.random() * 60 + 20,
        duration: Math.random() * 2 + 2,
        delay: Math.random() * 2,
        xMove: Math.random() * 20 - 10
      })));
    });
  }, []);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible [perspective:1000px]">
      
      {/* Intense Ambient Glow */}
      <motion.div 
        className="absolute w-[400px] h-[400px] bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-40"
        animate={{ 
          scale: [1, 1.2, 0.9, 1],
          opacity: [0.4, 0.6, 0.3, 0.4]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute w-[250px] h-[250px] bg-cyan-300 rounded-full mix-blend-screen filter blur-[80px] opacity-50"
        animate={{ 
          scale: [0.8, 1.3, 1, 0.8],
          opacity: [0.3, 0.7, 0.4, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* The 3D Glass Morphism Drop */}
      <motion.div 
        className="relative z-10 flex items-center justify-center w-[280px] h-[280px] rounded-full backdrop-blur-md bg-gradient-to-br from-white/40 to-white/5 border border-white/40 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.5)]"
        animate={{ 
          y: [-20, 20, -20],
          rotateX: [0, 10, -5, 0],
          rotateY: [0, -15, 10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Inner Water Core */}
        <motion.div 
          className="absolute w-[180px] h-[180px] rounded-full bg-gradient-to-tr from-blue-600 via-blue-400 to-cyan-300 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2),0_0_40px_rgba(59,130,246,0.8)]"
          animate={{ 
            scale: [1, 1.05, 0.95, 1],
            borderRadius: ["50% 50% 50% 50%", "40% 60% 60% 40%", "60% 40% 40% 60%", "50% 50% 50% 50%"]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Specular Highlight (Reflection) */}
        <div className="absolute top-[10%] left-[15%] w-[60px] h-[30px] rounded-full bg-white opacity-60 blur-[3px] rotate-[-45deg]"></div>
        <div className="absolute top-[20%] left-[25%] w-[20px] h-[20px] rounded-full bg-white opacity-80 blur-[2px]"></div>

        {/* Small rising bubbles */}
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full bg-white/60 blur-[1px]"
            style={{
              width: bubble.size + 'px',
              height: bubble.size + 'px',
              left: bubble.left + '%',
            }}
            animate={{
              y: [100, -100],
              x: [0, bubble.xMove],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "linear",
              delay: bubble.delay
            }}
          />
        ))}

      </motion.div>

      {/* Orbiting Elements to give 3D depth */}
      <motion.div 
        className="absolute w-[400px] h-[400px] border border-white/10 rounded-full"
        animate={{ rotateZ: 360, rotateX: 60 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-0 left-1/2 w-4 h-4 bg-cyan-300 rounded-full shadow-[0_0_15px_rgba(103,232,249,0.8)] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.8)] -translate-x-1/2 translate-y-1/2"></div>
      </motion.div>

      <motion.div 
        className="absolute w-[500px] h-[500px] border border-cyan-500/10 rounded-full"
        animate={{ rotateZ: -360, rotateX: 70, rotateY: 30 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-1/2 right-0 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

    </div>
  );
}
