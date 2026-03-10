'use client';

import React from 'react';
import {motion} from 'motion/react';
import {MapPin, Navigation} from 'lucide-react';

export function MapBackground() {
  return (
    <div className="absolute inset-0 z-0 bg-zinc-100 dark:bg-zinc-950 overflow-hidden">
      {/* Grid pattern for map feel */}
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-20" 
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Simulated Route */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M100 700 L150 500 L280 450 L320 300 L200 150"
          stroke="rgba(244, 192, 37, 0.2)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M100 700 L150 500 L280 450 L320 300 L200 150"
          stroke="#f4c025"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Markers */}
      <div className="absolute bottom-[100px] left-[80px] -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-white rounded-full border-4 border-yellow-500 shadow-lg" />
      </div>

      <div className="absolute top-[450px] right-[100px] -translate-x-1/2 -translate-y-1/2">
        <div className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-1 rounded-full mb-1 shadow-md">Parada 1</div>
        <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-2 h-2 bg-black rounded-full" />
        </div>
      </div>

      <motion.div 
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute top-[280px] right-[60px] -translate-x-1/2 -translate-y-1/2 text-yellow-500 drop-shadow-xl"
      >
        <MapPin size={40} fill="currentColor" />
      </motion.div>

      <div className="absolute top-[130px] left-[180px] -translate-x-1/2 -translate-y-1/2 opacity-40">
        <MapPin size={32} className="text-zinc-500" fill="currentColor" />
      </div>
    </div>
  );
}
