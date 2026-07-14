import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

// Frequencies for the requested custom melody (C4 to C5 octave region)
const NOTES = {
  'C4': 261.63,
  'D4': 293.66,
  'E4': 329.63,
  'F4': 349.23,
  'G4': 392.00,
  'A4': 440.00,
  'Bb4': 466.16,
  'C5': 523.25,
};

type NoteName = keyof typeof NOTES;

interface MelodyNode {
  note: NoteName;
  duration: number; // in beats
}

const MELODY: MelodyNode[] = [
  { note: 'C4', duration: 0.75 },
  { note: 'E4', duration: 0.5 },
  { note: 'G4', duration: 0.75 },
  { note: 'A4', duration: 0.75 },
  { note: 'G4', duration: 0.5 },
  { note: 'E4', duration: 0.75 },
  { note: 'D4', duration: 0.5 },
  { note: 'C4', duration: 1.0 },

  { note: 'E4', duration: 0.5 },
  { note: 'G4', duration: 0.75 },
  { note: 'A4', duration: 0.75 },
  { note: 'G4', duration: 0.5 },
  { note: 'E4', duration: 0.75 },
  { note: 'D4', duration: 0.5 },
  { note: 'E4', duration: 1.0 },
  { note: 'C4', duration: 2.0 },

  // Extended verse - Happy Birthday variation
  { note: 'C4', duration: 0.5 },
  { note: 'C4', duration: 0.5 },
  { note: 'D4', duration: 0.75 },
  { note: 'C4', duration: 0.75 },
  { note: 'F4', duration: 0.75 },
  { note: 'E4', duration: 1.5 },
  
  { note: 'C4', duration: 0.5 },
  { note: 'C4', duration: 0.5 },
  { note: 'D4', duration: 0.75 },
  { note: 'C4', duration: 0.75 },
  { note: 'G4', duration: 0.75 },
  { note: 'F4', duration: 1.5 },
  
  { note: 'C4', duration: 0.5 },
  { note: 'C4', duration: 0.5 },
  { note: 'C5', duration: 0.75 },
  { note: 'A4', duration: 0.75 },
  { note: 'F4', duration: 0.75 },
  { note: 'E4', duration: 0.75 },
  { note: 'D4', duration: 1.0 },
  { note: 'Bb4', duration: 0.5 },
  { note: 'Bb4', duration: 0.5 },
  { note: 'A4', duration: 0.75 },
  { note: 'F4', duration: 0.75 },
  { note: 'G4', duration: 0.75 },
  { note: 'F4', duration: 2.0 },
];

export default function BirthdayMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const tempo = 110; // beats per minute (BPM) for a softer, more lyrical tune
  const beatDuration = 60 / tempo; // duration of a single beat in seconds
  const currentTimeoutRef = useRef<number | null>(null);
  const currentPlayTimeRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);

  // Keep ref up to date for async loops
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  const playChime = (freq: number, startTime: number, duration: number, audioCtx: AudioContext) => {
    if (!audioCtx) return;

    // Create primary chime (sweet, soft triangle wave)
    const osc = audioCtx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.value = freq;

    // Create bright high harmonic chime (subtle octave overlay for a real physical music-box bell effect)
    const overtone = audioCtx.createOscillator();
    overtone.type = 'sine';
    overtone.frequency.value = freq * 2;

    // Gain node for primary chime
    const oscGain = audioCtx.createGain();
    // Music box has rapid bell attack, long sweet decay and release
    oscGain.gain.setValueAtTime(0, startTime);
    oscGain.gain.linearRampToValueAtTime(0.18, startTime + 0.01);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05);

    // Gain node for bright overtone (much softer to avoid harshness)
    const overtoneGain = audioCtx.createGain();
    overtoneGain.gain.setValueAtTime(0, startTime);
    overtoneGain.gain.linearRampToValueAtTime(0.05, startTime + 0.015);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration - 0.1);

    // Filter node to make the bells sound warm, woody, and premium
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, startTime);
    filter.frequency.exponentialRampToValueAtTime(600, startTime + duration);

    // Connect them
    osc.connect(oscGain);
    overtone.connect(overtoneGain);
    
    oscGain.connect(filter);
    overtoneGain.connect(filter);
    
    filter.connect(audioCtx.destination);

    // Start & Stop
    osc.start(startTime);
    osc.stop(startTime + duration);
    
    overtone.start(startTime);
    overtone.stop(startTime + duration);
  };

  const playSequence = (index: number) => {
    if (!isPlayingRef.current || !audioCtxRef.current) return;

    const audioCtx = audioCtxRef.current;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const nextIndex = index % MELODY.length;
    setCurrentNoteIndex(nextIndex);

    const noteInfo = MELODY[nextIndex];
    const freq = NOTES[noteInfo.note];
    const noteTime = noteInfo.duration * beatDuration;

    // Play chime instantly using Web Audio schedule
    playChime(freq, audioCtx.currentTime, noteTime, audioCtx);

    // Schedule next note with custom timeout (allows responsive pauses)
    const delayMs = noteTime * 1000;
    currentTimeoutRef.current = window.setTimeout(() => {
      playSequence(nextIndex + 1);
    }, delayMs);
  };

  const startMusic = () => {
    try {
      // Initialize AudioContext if not already created
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      setIsPlaying(true);
      isPlayingRef.current = true;
      
      // Start loop at beginning or resume where paused
      const startIndex = currentNoteIndex === -1 ? 0 : currentNoteIndex;
      playSequence(startIndex);
    } catch (e) {
      console.error("Web Audio API not supported or blocked", e);
    }
  };

  const stopMusic = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (currentTimeoutRef.current) {
      window.clearTimeout(currentTimeoutRef.current);
      currentTimeoutRef.current = null;
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <AnimatePresence>
        {isPlaying && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8, x: 5 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 5 }}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100/60 dark:bg-pink-950/40 border border-pink-200/40 text-[9px] font-bold tracking-widest text-pink-600 dark:text-pink-400 uppercase select-none animate-pulse"
          >
            <Sparkles size={8} className="text-pink-500 animate-spin" style={{ animationDuration: '3s' }} />
            Special Tune Playing
          </motion.span>
        )}
      </AnimatePresence>

      <button
        onClick={togglePlayback}
        className={`relative p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
          isPlaying
            ? 'bg-pink-100/80 border-pink-300 text-pink-600 shadow-[0_0_12px_rgba(244,63,94,0.25)] dark:bg-pink-950/60 dark:border-pink-800 dark:text-pink-400 scale-105'
            : 'bg-white/30 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 border-white/40 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:scale-105'
        }`}
        title={isPlaying ? "Pause Special Tune 🎵" : "Play Special Tune! 🎵"}
      >
        {/* Floating audio wave bars when playing */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
            <motion.div
              animate={{ height: [4, 12, 4] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
              className="w-[2px] bg-current rounded-full"
            />
            <motion.div
              animate={{ height: [6, 16, 6] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0.15 }}
              className="w-[2px] bg-current rounded-full"
            />
            <motion.div
              animate={{ height: [4, 10, 4] }}
              transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut', delay: 0.3 }}
              className="w-[2px] bg-current rounded-full"
            />
          </div>
        ) : (
          <Music size={16} />
        )}

        {/* Small badge dot if playing */}
        {isPlaying && (
          <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
