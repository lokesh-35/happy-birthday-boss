import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function AestheticCupcake() {
  const [isLit, setIsLit] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleBlowOut = () => {
    if (!isLit) {
      setIsLit(true);
      return;
    }
    
    setIsLit(false);
    setShowMessage(true);

    // Dispatch custom events to trigger full-screen confetti & fireworks
    const confettiEvent = new CustomEvent('trigger-confetti', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight * 0.4 },
    });
    const fireworksEvent = new CustomEvent('trigger-fireworks');
    
    window.dispatchEvent(confettiEvent);
    window.dispatchEvent(fireworksEvent);

    // Hide message after a few seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center my-6 relative select-none">
      {/* Decorative Sparkle Ring behind the cupcake */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`w-48 h-48 rounded-full bg-gradient-to-tr from-pink-400/10 via-amber-300/5 to-purple-400/10 blur-2xl transition-all duration-1000 ${isLit ? 'scale-110 opacity-100' : 'scale-90 opacity-40'}`} />
      </div>

      {/* Main Cupcake Interactive Container */}
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleBlowOut}
        className="relative cursor-pointer z-10 filter drop-shadow-[0_10px_20px_rgba(244,63,94,0.15)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
      >
        {/* Floating Instruction Banner */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/80 dark:bg-pink-900/60 text-white dark:text-pink-100 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full whitespace-nowrap shadow-md pointer-events-none animate-pulse">
          {isLit ? 'Blow/Click to Wish 🌬️' : 'Click to Relight 🔥'}
        </div>

        {/* Cupcake SVG */}
        <svg
          width="180"
          height="200"
          viewBox="0 0 180 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          {/* DEFINITIONS FOR GRADIENTS AND GLOWS */}
          <defs>
            {/* Candle flame glow */}
            <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
            </radialGradient>

            {/* Candle wax gradient */}
            <linearGradient id="candleWax" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fdf2f8" />
              <stop offset="50%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>

            {/* Frosting Swirl Gradient - Creamy Strawberry (pink-yellow) */}
            <linearGradient id="frostingSwirlPink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fecdd3" />
              <stop offset="40%" stopColor="#fda4af" />
              <stop offset="80%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#be123c" />
            </linearGradient>

            <linearGradient id="frostingSwirlYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="60%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            {/* Liner/Cup base gradient */}
            <linearGradient id="cupLiner" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            
            <linearGradient id="cupLinerHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(251, 191, 36, 0.4)" />
              <stop offset="50%" stopColor="rgba(251, 191, 36, 0.8)" />
              <stop offset="100%" stopColor="rgba(180, 83, 9, 0.4)" />
            </linearGradient>
          </defs>

          {/* CANDLE FLAME (Only visible when lit) */}
          {isLit && (
            <g id="candle-flame">
              {/* Outer soft aura */}
              <circle cx="90" cy="35" r="24" fill="url(#flameGlow)" className="animate-pulse" style={{ animationDuration: '1.5s' }} />
              
              {/* Dynamic flickering flame shapes */}
              <motion.path
                animate={{
                  scaleY: [1, 1.15, 0.95, 1.05, 1],
                  scaleX: [1, 0.9, 1.1, 0.95, 1],
                  skewX: [-2, 3, -1, 2, 0],
                  y: [0, -1.5, 0.5, -0.5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  ease: 'easeInOut'
                }}
                style={{ transformOrigin: '90px 48px' }}
                d="M90 18 C95 28, 97 38, 90 48 C83 38, 85 28, 90 18 Z"
                fill="#f59e0b"
              />
              <motion.path
                animate={{
                  scaleY: [1, 1.2, 0.9, 1.1, 1],
                  scaleX: [1, 0.85, 1.15, 0.9, 1],
                  y: [0, -1, 0.3, -0.3, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.4,
                  ease: 'easeInOut'
                }}
                style={{ transformOrigin: '90px 46px' }}
                d="M90 24 C93 30, 94 38, 90 44 C86 38, 87 30, 90 24 Z"
                fill="#fef08a"
              />
              <circle cx="90" cy="42" r="2.5" fill="#38bdf8" opacity="0.8" /> {/* Blue core of flame */}
            </g>
          )}

          {/* SMOKE PUFF (Triggers on blow out) */}
          {!isLit && (
            <g id="smoke">
              <motion.circle
                initial={{ opacity: 1, cx: 90, cy: 45, r: 3 }}
                animate={{ opacity: 0, cx: 85, cy: 15, r: 12 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                fill="#cbd5e1"
              />
              <motion.circle
                initial={{ opacity: 0.8, cx: 90, cy: 45, r: 2 }}
                animate={{ opacity: 0, cx: 95, cy: 22, r: 10 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                fill="#e2e8f0"
              />
            </g>
          )}

          {/* WICK */}
          <line x1="90" y1="46" x2="90" y2="54" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

          {/* CANDLE BODY */}
          <rect x="86.5" y="54" width="7" height="34" rx="2" fill="url(#candleWax)" />
          {/* Cute spiral lines on candle */}
          <path d="M86.5 58 L93.5 63" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M86.5 68 L93.5 73" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          <path d="M86.5 78 L93.5 83" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

          {/* CUPCAKE FROSTING - Gorgeous aesthetic swirly layering */}
          <g id="frosting">
            {/* Layer 1: Top swirly peak */}
            <path
              d="M90 76 C97 76, 108 81, 108 89 C108 97, 72 97, 72 89 C72 81, 83 76, 90 76 Z"
              fill="url(#frostingSwirlYellow)"
            />
            
            {/* Layer 2: Middle thick swirls */}
            <path
              d="M90 85 C115 85, 126 92, 126 103 C126 114, 54 114, 54 103 C54 92, 65 85, 90 85 Z"
              fill="url(#frostingSwirlPink)"
            />

            {/* Layer 3: Bottom massive cream swirls with beautiful rounded curves */}
            <path
              d="M90 98 C130 98, 144 108, 144 119 C144 130, 36 130, 36 119 C36 108, 50 98, 90 98 Z"
              fill="url(#frostingSwirlYellow)"
            />
            
            {/* Extra creamy frosting dollops */}
            <circle cx="50" cy="116" r="10" fill="#fbcfe8" opacity="0.9" />
            <circle cx="130" cy="116" r="10" fill="#fbcfe8" opacity="0.9" />
            <circle cx="90" cy="122" r="12" fill="#ffe4e6" />
            
            {/* Interactive/shining sprinkles matching the photo */}
            {/* Red star sprinkle */}
            <path d="M72 104 L74 108 L78 108 L75 110 L76 114 L72 111 L68 114 L69 110 L66 108 L70 108 Z" fill="#e11d48" />
            
            {/* Blue spherical sprinkles */}
            <circle cx="110" cy="112" r="2.5" fill="#38bdf8" />
            <circle cx="58" cy="110" r="2.5" fill="#6366f1" />
            <circle cx="122" cy="106" r="3" fill="#a855f7" />
            
            {/* Yellow star sprinkle */}
            <path d="M102 96 L103.5 99 L107 99 L104 101 L105 104.5 L102 102.5 L99 104.5 L100 101 L97 99 L100.5 99 Z" fill="#eab308" />
            
            {/* Cute white sugar pearls */}
            <circle cx="82" cy="94" r="2" fill="#ffffff" />
            <circle cx="98" cy="112" r="2" fill="#ffffff" />
            <circle cx="114" cy="101" r="1.5" fill="#ffffff" />
            <circle cx="68" cy="98" r="2" fill="#ffffff" />
          </g>

          {/* CUPCAKE LINER / RIPPLED BASE */}
          <g id="cup-liner">
            {/* Back dark liner layer */}
            <path
              d="M44 126 L136 126 L122 176 C121 181, 116 185, 110 185 L70 185 C64 185, 59 181, 58 176 Z"
              fill="url(#cupLiner)"
            />

            {/* Ribbed lines (creating 3D ridged texture) */}
            <g stroke="url(#cupLinerHighlight)" strokeWidth="3" strokeLinecap="round">
              <line x1="52" y1="126" x2="62" y2="182" />
              <line x1="64" y1="126" x2="72" y2="185" />
              <line x1="76" y1="126" x2="81" y2="185" />
              <line x1="88" y1="126" x2="89" y2="185" />
              <line x1="100" y1="126" x2="97" y2="185" />
              <line x1="112" y1="126" x2="106" y2="185" />
              <line x1="124" y1="126" x2="116" y2="182" />
            </g>
            
            {/* Inner liner shadows to make ribs pop */}
            <g stroke="#78350f" strokeWidth="1" strokeLinecap="round" opacity="0.5">
              <line x1="53" y1="126" x2="63" y2="182" />
              <line x1="65" y1="126" x2="73" y2="185" />
              <line x1="77" y1="126" x2="82" y2="185" />
              <line x1="89" y1="126" x2="90" y2="185" />
              <line x1="101" y1="126" x2="98" y2="185" />
              <line x1="113" y1="126" x2="107" y2="185" />
              <line x1="125" y1="126" x2="117" y2="182" />
            </g>
          </g>
        </svg>
      </motion.div>

      {/* Interactive Birthday Wish Message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ scale: 0.3, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -10 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-900/95 border-2 border-pink-300 dark:border-pink-800 rounded-2xl px-6 py-4 shadow-xl z-20 flex flex-col items-center gap-1.5 text-center min-w-[240px]"
          >
            <div className="flex items-center gap-1 text-pink-500">
              <Sparkles size={16} className="animate-pulse" />
              <Heart size={16} className="animate-bounce fill-pink-500" />
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <p className="font-serif text-base font-bold text-slate-800 dark:text-pink-200">
              May all your wishes come true!
            </p>
            <p className="text-[10px] text-pink-500 font-sans tracking-widest uppercase font-bold">
              Happy Birthday, Bindu! 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
