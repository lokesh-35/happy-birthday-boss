import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Sparkles } from 'lucide-react';

export default function BirthdayLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = () => {
    setIsOpen(!isOpen);
    // Also trigger some soft confetti nearby when opening
    if (!isOpen) {
      const event = new CustomEvent('trigger-confetti', {
        detail: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="py-16 max-w-2xl mx-auto px-4 text-center">
      <div className="mb-8">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-800 dark:text-slate-100">
          A Message for You
        </h2>
        <div className="w-16 h-1 bg-pink-300 dark:bg-pink-700 mx-auto mt-3 rounded-full" />
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          Click the envelope below to open your birthday letter.
        </p>
      </div>

      <div className="relative flex justify-center items-center min-h-[380px] sm:min-h-[440px] perspective-1000">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Envelope State */
            <motion.div
              key="envelope"
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -15 }}
              transition={{ type: 'spring', stiffness: 100 }}
              onClick={toggleLetter}
              className="w-full max-w-sm bg-amber-50/70 dark:bg-slate-900/80 backdrop-blur-md border border-amber-200/50 dark:border-slate-800 rounded-3xl p-8 shadow-xl cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 relative group flex flex-col items-center justify-center"
            >
              <div className="absolute top-4 right-4 text-amber-500 dark:text-amber-400 opacity-60">
                <Sparkles size={16} />
              </div>

              {/* Glowing Wax Seal Button */}
              <div className="w-20 h-20 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 border border-rose-300 dark:border-rose-800 group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20">
                  <Mail size={24} className="group-hover:rotate-6 transition-transform" />
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-slate-700 dark:text-slate-200">
                To: Bindu ❤️
              </h3>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-sans">
                A special handwritten letter. Click to read.
              </p>

              {/* Small stamp decoration */}
              <div className="absolute top-6 left-6 w-10 h-12 border-2 border-dashed border-amber-300 dark:border-slate-700 rounded p-1 flex items-center justify-center opacity-40">
                <div className="text-[8px] font-bold text-amber-500 select-none">JUL-16</div>
              </div>
            </motion.div>
          ) : (
            /* Opened Letter State */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="w-full max-w-xl bg-amber-50 dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 rounded-3xl shadow-2xl relative text-left p-6 sm:p-10 select-text overflow-hidden"
            >
              {/* Coffee Stained Paper lines background texture */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Close / Return Envelope Button */}
              <button
                onClick={toggleLetter}
                className="absolute top-4 right-4 p-2 text-amber-600/60 hover:text-amber-700 dark:text-slate-400 dark:hover:text-white hover:bg-amber-100/50 dark:hover:bg-slate-800 rounded-full transition-all cursor-pointer font-sans"
                title="Put back in Envelope"
              >
                <MailOpen size={16} />
              </button>

              {/* Letter content in Caveat / handwritten font */}
              <div className="font-handwritten text-xl sm:text-2xl text-amber-950 dark:text-amber-100/90 space-y-4 sm:space-y-6 leading-relaxed">
                <p className="font-bold text-2xl sm:text-3xl text-rose-600 dark:text-rose-400">
                  Dear Bindu,
                </p>

                <p>Happy Birthday!</p>

                <p>Thank you for being such an amazing person in my life.</p>

                <p>
                  From the day we met on January 29, life has become brighter with your love and presence as my beautiful best friend.
                  I hope your birthday is filled with happiness, laughter, peace, and countless beautiful memories.
                </p>

                <p>May every dream you have come true.</p>

                <p>
                  No matter where life takes us, you'll always have my heart as my beloved best friend, partner, and forever companion.
                </p>

                <div className="pt-4 text-right">
                  <p className="italic">Happy Birthday once again! ❤️</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
