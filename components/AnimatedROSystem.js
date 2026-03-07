'use client';

import { motion } from 'framer-motion';

export default function AnimatedROSystem() {
  return (
    <div className="relative w-full h-80 flex items-center justify-center overflow-visible">
      
      {/* Background glow */}
      <motion.div 
        className="absolute w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-30"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <svg viewBox="0 0 400 300" className="w-full max-w-md h-auto z-10 drop-shadow-2xl">
        {/* Main Unit Body */}
        <motion.rect 
          x="100" y="50" width="200" height="220" rx="20" 
          fill="white" stroke="#e2e8f0" strokeWidth="2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Top Header/Brand area */}
        <motion.path 
          d="M 100 80 Q 200 60 300 80 L 300 50 Q 200 30 100 50 Z" 
          fill="#1e3a8a"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
        <text x="200" y="65" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">MAHI RO CARE</text>

        {/* Filter Cylinders */}
        {/* Filter 1 */}
        <motion.g 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <rect x="120" y="100" width="40" height="120" rx="20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <motion.rect 
            x="125" y="105" width="30" height="110" rx="15" fill="#3b82f6" opacity="0.2"
            animate={{ height: [110, 100, 110], y: [105, 115, 105] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Filter 2 */}
        <motion.g 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <rect x="180" y="100" width="40" height="120" rx="20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <motion.rect 
            x="185" y="105" width="30" height="110" rx="15" fill="#3b82f6" opacity="0.5"
            animate={{ height: [100, 110, 100], y: [115, 105, 115] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Filter 3 - Pure Water */}
        <motion.g 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <rect x="240" y="100" width="40" height="120" rx="20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <motion.rect 
            x="245" y="105" width="30" height="110" rx="15" fill="#3b82f6" opacity="0.9"
            animate={{ height: [110, 105, 110], y: [105, 110, 105] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>

        {/* Pure Water Drop Animation */}
        <motion.path
          d="M 260 230 C 260 230 250 245 250 255 C 250 260.5 254.5 265 260 265 C 265.5 265 270 260.5 270 255 C 270 245 260 230 260 230 Z"
          fill="#2563eb"
          initial={{ y: -20, opacity: 0, scale: 0.5 }}
          animate={{ y: 40, opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeIn", delay: 1 }}
        />

        {/* Pipes/Connectors */}
        <path d="M 160 120 L 180 120 M 220 120 L 240 120" stroke="#94a3b8" strokeWidth="4" />
        
        {/* Abstract flow lines */}
        <motion.path 
          d="M 140 150 Q 200 120 260 150" 
          fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4"
          animate={{ strokeDashoffset: -20 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 140 170 Q 200 200 260 170" 
          fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4"
          animate={{ strokeDashoffset: -20 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

      </svg>
    </div>
  );
}
