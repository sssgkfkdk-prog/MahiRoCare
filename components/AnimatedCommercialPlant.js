'use client';

import { motion } from 'framer-motion';

export default function AnimatedCommercialPlant() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center p-4">
      <svg viewBox="0 0 500 300" className="w-full max-w-xl h-auto drop-shadow-xl overflow-visible">
        
        {/* Base Platform */}
        <motion.rect x="50" y="250" width="400" height="20" rx="5" fill="#334155" 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5 }}
        />

        {/* Storage Tank 1 (Raw Water) */}
        <motion.g 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
        >
          <rect x="70" y="100" width="80" height="150" rx="10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
          <motion.rect x="72" y="120" width="76" height="128" rx="8" fill="#94a3b8" opacity="0.3"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
          />
          <text x="110" y="180" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold" transform="rotate(-90 110,180)">RAW TANK</text>
        </motion.g>

        {/* High Pressure Pump */}
        <motion.g 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
        >
          <circle cx="190" cy="220" r="25" fill="#475569" />
          <motion.circle cx="190" cy="220" r="10" fill="#fbbf24" 
              animate={{ rotate: 360 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              style={{ originX: "190px", originY: "220px" }}
          />
          <path d="M 190 220 L 190 195" stroke="#fbbf24" strokeWidth="4" />
        </motion.g>

        {/* Industrial RO Membranes (Horizontal Vessels) */}
        <motion.g 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Vessel 1 */}
          <rect x="230" y="80" width="160" height="30" rx="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <motion.rect x="230" y="80" width="160" height="30" rx="15" fill="#3b82f6" opacity="0.2"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Vessel 2 */}
          <rect x="230" y="120" width="160" height="30" rx="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <motion.rect x="230" y="120" width="160" height="30" rx="15" fill="#3b82f6" opacity="0.4"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
          />
          
          {/* Vessel 3 */}
          <rect x="230" y="160" width="160" height="30" rx="15" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
          <motion.rect x="230" y="160" width="160" height="30" rx="15" fill="#2563eb" opacity="0.6"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, delay: 1, repeat: Infinity }}
          />
        </motion.g>

        {/* Connecting Pipes with flowing animated water */}
        <g stroke="#64748b" strokeWidth="6" fill="none">
          {/* Tank to Pump */}
          <path d="M 150 220 L 165 220" />
          {/* Pump to Vessels */}
          <path d="M 190 195 L 190 95 L 230 95" />
          <path d="M 190 135 L 230 135" />
          <path d="M 190 175 L 230 175" />
        </g>
        
        {/* Water Flow Animation Dashes */}
        <motion.g stroke="#60a5fa" strokeWidth="2" fill="none" strokeDasharray="4 8"
            animate={{ strokeDashoffset: -24 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
            <path d="M 190 195 L 190 95 L 230 95" />
            <path d="M 190 135 L 230 135" />
            <path d="M 190 175 L 230 175" />
        </motion.g>

        {/* Pure Water Storage Tank */}
        <motion.g 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Pipes to pure tank */}
          <path d="M 390 95 L 440 95 L 440 120" stroke="#3b82f6" strokeWidth="4" fill="none" />
          <path d="M 390 135 L 430 135 L 430 120" stroke="#3b82f6" strokeWidth="4" fill="none" />
          <path d="M 390 175 L 410 175 L 410 120" stroke="#3b82f6" strokeWidth="4" fill="none" />

          {/* Animated purely blue flowing lines */}
          <motion.path d="M 390 95 L 440 95 L 440 120" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="4 4" fill="none"
              animate={{ strokeDashoffset: 16 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />

          <rect x="410" y="120" width="70" height="130" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" />
          <motion.rect x="412" y="140" width="66" height="108" rx="8" fill="#3b82f6" opacity="0.8"
              animate={{ height: [108, 100, 108], y: [140, 148, 140] }}
              transition={{ duration: 3, repeat: Infinity }}
          />
          <text x="445" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" transform="rotate(-90 445,185)">TREATED</text>
        </motion.g>

      </svg>
    </div>
  );
}
