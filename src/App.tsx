import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, ArrowDown, ChevronRight, Sparkles, Heart } from 'lucide-react';

import BackgroundWave from './components/BackgroundWave';
import FloatingEffects from './components/FloatingEffects';
import ConfettiAndFireworks from './components/ConfettiAndFireworks';
import Timeline from './components/Timeline';
import FavoritesGrid from './components/FavoritesGrid';
import MemoryPhoto from './components/MemoryPhoto';
import BirthdayCake from './components/BirthdayCake';
import BirthdayLetter from './components/BirthdayLetter';
import AestheticCupcake from './components/AestheticCupcake';
import SilkRibbon from './components/SilkRibbon';
import BirthdayMusic from './components/BirthdayMusic';
import { ThemeMode } from './types';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('bindu_theme');
    return (saved as ThemeMode) || 'light';
  });

  const [scrolled, setScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('bindu_theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerManualFireworks = () => {
    const event = new CustomEvent('trigger-fireworks');
    window.dispatchEvent(event);
  };

  // Quick navigation anchors
  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Our Story', target: 'story' },
    { label: 'Favorites', target: 'favorites' },
    { label: 'Our Photo', target: 'memory' },
    { label: 'Cake', target: 'cake' },
    { label: 'Letter', target: 'letter' },
  ];

  return (
    <div className={theme}>
      <div className="min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden font-sans selection:bg-pink-200/50 selection:text-pink-900">
        
        {/* Continuous Wave and Sky Canvas Background */}
        <BackgroundWave theme={theme} />

        {/* Falling Petals, Floating Hearts, and Mouse Sparkles Canvas Overlay */}
        <FloatingEffects />

        {/* Confetti (On Load) and Fireworks (Interactive) Canvas Engine */}
        <ConfettiAndFireworks />

        {/* Header / Nav Panel */}
        <header
          className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
            scrolled
              ? 'bg-white/45 dark:bg-black/35 backdrop-blur-md border-b border-white/20 dark:border-white/5 py-3 shadow-sm'
              : 'py-5 bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            {/* Branding Signature */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <Heart size={16} className="text-pink-500 fill-pink-500 animate-pulse" />
              <span className="font-serif text-lg font-bold tracking-tight text-slate-800 dark:text-white">
                For Bindu ✨
              </span>
            </motion.div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 bg-white/20 dark:bg-black/10 backdrop-blur-sm border border-white/30 dark:border-white/5 rounded-full px-5 py-1.5 shadow-sm">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  onMouseEnter={() => setHoveredTab(item.target)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className="relative text-xs font-display font-medium text-slate-600 dark:text-slate-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors cursor-pointer py-1 px-1.5"
                >
                  <span className="relative z-10">{item.label}</span>
                  {hoveredTab === item.target && (
                    <motion.div
                      layoutId="navHoverUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 to-rose-400 dark:from-pink-400 dark:to-rose-300 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Control buttons (Theme switch, Music, & Firework button) */}
            <div className="flex items-center gap-3">
              {/* Interactive Birthday Music */}
              <BirthdayMusic />

              {/* Quick Firework Launcher */}
              <button
                onClick={triggerManualFireworks}
                className="p-2 rounded-full bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 border border-white/40 dark:border-white/10 text-pink-500 hover:scale-105 transition-all cursor-pointer"
                title="Launch Wishes Fireworks! 🎆"
              >
                <Sparkles size={16} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 border border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:scale-105 transition-all cursor-pointer"
                title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
          </div>
        </header>

        {/* 1. HERO SECTION */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-24 pb-16 z-10"
        >
          {/* Subtle floating silk ribbon winding gently behind the hero card */}
          <SilkRibbon />

          <div className="max-w-6xl w-full mx-auto relative z-10">
            
            {/* Ambient glowing card with refined lightweight cream background & soft shadow aura */}
            <motion.div
              initial={{ y: 50, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 70, damping: 14, mass: 1, duration: 1.2 }}
              className="w-full max-w-3xl mx-auto bg-[#FAF7F2]/95 dark:bg-slate-900/85 backdrop-blur-2xl border border-pink-200/40 dark:border-white/10 rounded-[40px] p-8 sm:p-14 shadow-[0_32px_64px_rgba(244,63,94,0.06)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.45)] relative overflow-hidden"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-300/15 dark:bg-pink-700/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-300/15 dark:bg-cyan-700/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col items-center justify-center space-y-6 text-center">
                
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-50/80 dark:bg-pink-950/40 border border-pink-200/40 dark:border-pink-900/30 text-[10px] font-display font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 shadow-sm"
                >
                  <Sparkles size={11} className="animate-spin text-pink-500" style={{ animationDuration: '4s' }} />
                  Wife Special ✨
                </motion.span>

                {/* Title Header with clean gradient text & Cormorant styling */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 80 }}
                  className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-slate-800 dark:text-white"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 dark:from-pink-300 dark:via-purple-300 dark:to-sky-300 pr-1">
                    Happy Birthday,
                  </span>{' '}
                  <br className="sm:hidden" />
                  <span className="font-handwritten text-pink-600 dark:text-pink-400 text-6xl sm:text-7xl md:text-8xl inline-block mt-1 filter drop-shadow-[0_2px_8px_rgba(244,63,94,0.15)] leading-tight">
                    Bindu!
                  </span>
                </motion.h1>

                {/* High-fidelity, Interactive reference Cupcake Design */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="w-full flex justify-center py-1"
                >
                  <AestheticCupcake />
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="font-display text-base sm:text-lg font-light text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed"
                >
                  To the beautiful person who fills every single day with endless warmth, affection, and beautiful memories. May your wishes bloom beautifully today!
                </motion.p>

                {/* Journey button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-2 w-full flex justify-center"
                >
                  <button
                    onClick={() => scrollToSection('story')}
                    className="group px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-display font-semibold text-xs tracking-widest uppercase hover:bg-pink-500 dark:hover:bg-pink-500 hover:text-white dark:hover:text-white shadow-lg hover:shadow-pink-500/20 dark:hover:shadow-pink-400/20 border border-slate-800/20 dark:border-white/20 transition-all hover:scale-[1.03] flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    Start the Journey
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

              </div>

            </motion.div>
          </div>

          {/* Elegant Scroll Indicator Arrow */}
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
            onClick={() => scrollToSection('story')}
            className="absolute bottom-10 flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-500 cursor-pointer hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
          >
            <span className="text-[10px] uppercase font-display tracking-widest font-semibold">Scroll down</span>
            <ArrowDown size={14} />
          </motion.div>
        </section>

        {/* 2. OUR STORY TIMELINE */}
        <section id="story" className="relative py-20 z-10 bg-gradient-to-b from-transparent via-white/5 to-transparent">
          <Timeline />
        </section>

        {/* 4. FAVORITE THINGS */}
        <section id="favorites" className="relative py-20 z-10">
          <FavoritesGrid />
        </section>

        {/* 5. OUR PRECIOUS MEMORY */}
        <section id="memory" className="relative py-20 z-10 bg-gradient-to-b from-transparent via-white/5 to-transparent">
          <MemoryPhoto />
        </section>

        {/* 6. BIRTHDAY CAKE */}
        <section id="cake" className="relative py-20 z-10">
          <BirthdayCake />
        </section>

        {/* 7. HANDWRITTEN LETTER */}
        <section id="letter" className="relative py-20 z-10 bg-gradient-to-b from-transparent via-white/5 to-transparent">
          <BirthdayLetter />
        </section>

        {/* FOOTER */}
        <footer className="relative py-12 z-10 bg-white/10 dark:bg-black/20 backdrop-blur-md border-t border-white/20 dark:border-white/5 text-center">
          <div className="max-w-xl mx-auto px-6 space-y-3">
            <Heart size={20} className="text-pink-500 fill-pink-500 mx-auto animate-pulse" />
            
            <p className="font-display text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              Made with lots of love and appreciation for my beautiful wife Bindu ❤️
            </p>
            
            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Happy Birthday Bindu • July 16, 2026
            </p>
          </div>
        </footer>

        {/* Mobile Navigation Panel - Compact Floating Capsule at the bottom */}
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <div className="bg-white/45 dark:bg-black/45 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-2xl p-1 shadow-lg">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-display font-bold text-slate-600 dark:text-slate-300 hover:text-pink-500 hover:bg-white/40 dark:hover:bg-white/10 transition-all cursor-pointer"
                  title={item.label}
                >
                  {item.label[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
