import React from 'react';
import { motion } from 'motion/react';

export default function SilkRibbon() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Ribbon 1: Upper winding satin drape (Soft Rose-Pink Gradient) */}
      <svg
        className="absolute top-[10%] left-[-10%] w-[120%] h-[50%] opacity-70 dark:opacity-40 filter drop-shadow-[0_12px_24px_rgba(244,63,94,0.15)]"
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="silkRoseGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#fda4af" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#ec4899" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fdf2f8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="silkRoseGradient1Highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#fda4af" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main Ribbon Body with flowing organic path */}
        <motion.path
          d="M -100,150 C 200,50 400,280 720,160 C 1040,40 1200,250 1540,100"
          stroke="url(#silkRoseGradient1)"
          strokeWidth="38"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              "M -100,150 C 200,50 400,280 720,160 C 1040,40 1200,250 1540,100",
              "M -100,130 C 180,90 380,240 700,190 C 1060,80 1220,210 1540,120",
              "M -100,150 C 200,50 400,280 720,160 C 1040,40 1200,250 1540,100"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Silky Highlight overlay */}
        <motion.path
          d="M -100,150 C 200,50 400,280 720,160 C 1040,40 1200,250 1540,100"
          stroke="url(#silkRoseGradient1Highlight)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              "M -100,150 C 200,50 400,280 720,160 C 1040,40 1200,250 1540,100",
              "M -100,130 C 180,90 380,240 700,190 C 1060,80 1220,210 1540,120",
              "M -100,150 C 200,50 400,280 720,160 C 1040,40 1200,250 1540,100"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Ribbon 2: Lower winding satin ribbon (Soft Gold & Peach Gradient) */}
      <svg
        className="absolute bottom-[5%] left-[-10%] w-[120%] h-[55%] opacity-60 dark:opacity-35 filter drop-shadow-[0_15px_30px_rgba(251,191,36,0.12)]"
        viewBox="0 0 1440 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="silkGoldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#fef08a" stopOpacity="0.65" />
            <stop offset="55%" stopColor="#fde047" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fffbeb" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="silkGoldHighlight" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#fef08a" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Golden Ribbon path with offset waves */}
        <motion.path
          d="M -100,250 C 250,350 450,120 750,220 C 1050,320 1250,150 1540,280"
          stroke="url(#silkGoldGradient)"
          strokeWidth="28"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              "M -100,250 C 250,350 450,120 750,220 C 1050,320 1250,150 1540,280",
              "M -100,270 C 270,310 430,160 730,240 C 1070,300 1230,180 1540,260",
              "M -100,250 C 250,350 450,120 750,220 C 1050,320 1250,150 1540,280"
            ]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Highlights */}
        <motion.path
          d="M -100,250 C 250,350 450,120 750,220 C 1050,320 1250,150 1540,280"
          stroke="url(#silkGoldHighlight)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              "M -100,250 C 250,350 450,120 750,220 C 1050,320 1250,150 1540,280",
              "M -100,270 C 270,310 430,160 730,240 C 1070,300 1230,180 1540,260",
              "M -100,250 C 250,350 450,120 750,220 C 1050,320 1250,150 1540,280"
            ]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>

      {/* Ribbon 3: Delicate swirling ribbon behind everything */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-25"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silkPurpleGradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#e879f9" stopOpacity="0" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 100,500 C 400,200 600,500 900,300 C 1200,100 1300,400 1400,200"
          stroke="url(#silkPurpleGradient)"
          strokeWidth="10"
          strokeDasharray="8 6"
          strokeLinecap="round"
          fill="none"
          animate={{
            strokeDashoffset: [0, -50]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
}
