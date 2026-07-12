import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function MemoryPhoto() {
  // Retrieve the photo they uploaded on their device, or fallback to the gorgeous default couple photo
  const [photo] = useState<string | null>(() => {
    return localStorage.getItem('bindu_birthday_memory') || null;
  });

  const defaultPhoto = '/bb.jpeg';
  const displayPhoto = photo || defaultPhoto;

  return (
    <div className="max-w-2xl mx-auto px-6 text-center animate-fade-in">
      {/* Decorative Badge */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-1.5 font-display text-[10px] tracking-widest text-pink-600 dark:text-pink-400 uppercase font-bold bg-pink-50 dark:bg-pink-950/30 px-3.5 py-1 rounded-full border border-pink-200/30 select-none">
          <Sparkles size={11} className="text-pink-500 animate-pulse" />
          Our Sacred Memory
        </span>
      </div>

      {/* Elegant Polaroid Container */}
      <div className="flex flex-col items-center justify-center">
        <motion.div
          initial={{ rotate: -2, scale: 0.95, opacity: 0 }}
          whileInView={{ rotate: -1, scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ rotate: 1, scale: 1.015, y: -4 }}
          transition={{ type: 'spring', stiffness: 100, damping: 12 }}
          className="relative bg-amber-50/40 dark:bg-slate-900/40 backdrop-blur-md p-4 pb-6 sm:p-5 sm:pb-8 rounded-[4px] shadow-[0_20px_50px_rgba(244,63,94,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-pink-100/50 dark:border-slate-800/80 w-full max-w-[320px] aspect-[4/5] select-none group/polaroid"
        >
          {/* Polaroid Pin / Decorative Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-200/20 dark:bg-pink-900/10 backdrop-blur-xs border border-white/20 -rotate-1 shadow-xs pointer-events-none" />

          {/* Picture Area */}
          <div className="relative w-full aspect-square overflow-hidden rounded-xs bg-slate-100 dark:bg-slate-950 border border-pink-100/30 dark:border-slate-800 flex items-center justify-center">
            <img
              src={displayPhoto}
              alt="Bindu & Lokesh Memory"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover/polaroid:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Quote Section inside Polaroid */}
          <div className="pt-5 text-center px-2">
            <p className="font-handwritten text-xl font-semibold text-pink-600 dark:text-pink-400 drop-shadow-xs leading-relaxed">
              "Every single day spent with you is my favorite day. Happy Birthday, my love! 💖"
            </p>
            <p className="text-[9px] font-sans text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-2 font-medium">
              Bindu & Lokesh
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
