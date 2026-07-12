import { useState, FormEvent } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const [wishText, setWishText] = useState('');
  const [savedWish, setSavedWish] = useState('');

  const handleBlowOut = () => {
    if (!candlesLit) return;
    setCandlesLit(false);

    // Trigger full screen confetti and fireworks!
    const confettiEvent = new CustomEvent('trigger-confetti', {
      detail: { x: window.innerWidth / 2, y: window.innerHeight * 0.6 },
    });
    const fireworksEvent = new CustomEvent('trigger-fireworks');
    
    window.dispatchEvent(confettiEvent);
    window.dispatchEvent(fireworksEvent);

    if (wishText.trim()) {
      setSavedWish(wishText);
      setWishMade(true);
    }
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setWishMade(false);
    setWishText('');
    setSavedWish('');
  };

  const handleWishSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleBlowOut();
  };

  return (
    <div className="py-12 max-w-lg mx-auto px-4 text-center">
      <div className="mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-800 dark:text-slate-100">
          Make a Wish, Bindu!
        </h2>
        <div className="w-16 h-1 bg-pink-300 dark:bg-pink-700 mx-auto mt-3 rounded-full" />
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          Enter your wish below, then blow out the candles to launch the celebration!
        </p>
      </div>

      <div className="bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col items-center">
        
        {/* Interactive SVG Cake Canvas */}
        <div className="relative w-64 h-64 flex flex-col items-center justify-end mb-6">
          
          {/* Sparkles around cake */}
          {candlesLit && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"
                  style={{
                    top: `${10 + Math.random() * 50}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: '1.5s',
                  }}
                />
              ))}
            </div>
          )}

          {/* Floating Balloons nearby */}
          <div className="absolute -left-10 bottom-20 flex flex-col items-center pointer-events-none animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="w-8 h-10 rounded-full bg-pink-400/80 shadow-md relative">
              <div className="w-1 h-12 bg-pink-300/40 absolute top-full left-[15px]" />
            </div>
          </div>
          <div className="absolute -right-12 bottom-32 flex flex-col items-center pointer-events-none animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
            <div className="w-7 h-9 rounded-full bg-cyan-400/80 shadow-md relative">
              <div className="w-1 h-14 bg-cyan-300/40 absolute top-full left-[13px]" />
            </div>
          </div>

          {/* 3 Candles on Cake */}
          <div className="flex gap-6 mb-[-6px] z-10">
            {[1, 2, 3].map((candleId) => (
              <div key={candleId} className="flex flex-col items-center relative">
                {/* Flame */}
                {candlesLit ? (
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      y: [0, -2, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5 + candleId * 0.1,
                      ease: 'easeInOut',
                    }}
                    className="w-3 h-5 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-100 absolute -top-5 shadow-lg shadow-yellow-500/50 cursor-pointer"
                    onClick={handleBlowOut}
                  />
                ) : (
                  /* Smoke puff */
                  <motion.div
                    initial={{ opacity: 1, y: -5, scale: 0.5 }}
                    animate={{ opacity: 0, y: -25, scale: 1.5 }}
                    transition={{ duration: 1 }}
                    className="w-4 h-4 bg-slate-300/40 rounded-full absolute -top-5"
                  />
                )}
                {/* Wax Stick */}
                <div className={`w-2.5 h-12 rounded-t-sm bg-gradient-to-r ${candleId === 1 ? 'from-pink-300 to-pink-400' : candleId === 2 ? 'from-purple-300 to-purple-400' : 'from-cyan-300 to-cyan-400'} border-b-2 border-slate-300`} />
              </div>
            ))}
          </div>

          {/* Cake Body Layers */}
          <div className="w-48 bg-pink-100 dark:bg-pink-900/40 border border-pink-200/50 dark:border-pink-800/30 rounded-t-xl h-20 relative flex flex-col justify-between overflow-hidden shadow-md">
            {/* Top Frosting Drips */}
            <div className="w-full h-4 bg-white/90 dark:bg-pink-800 flex justify-between rounded-t-xl">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-5 h-6 bg-white/95 dark:bg-pink-800 rounded-b-full mt-[-2px] shrink-0" />
              ))}
            </div>

            {/* Sprinkles */}
            <div className="absolute inset-x-2 top-8 bottom-2 flex flex-wrap justify-center gap-4 opacity-70 pointer-events-none">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full rotate-45" />
              <div className="w-2 h-1 bg-cyan-400 rounded-full rotate-12" />
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              <div className="w-2 h-1 bg-rose-400 rounded-full -rotate-45" />
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full rotate-12" />
            </div>

            {/* Frosting Border Bottom */}
            <div className="w-full h-2 bg-pink-300/50 dark:bg-pink-700/50" />
          </div>

          {/* Cake Stand Plate */}
          <div className="w-56 h-3 bg-white/90 dark:bg-slate-800 rounded-full shadow-lg border-b-4 border-slate-200 dark:border-slate-900" />
        </div>

        {/* Wish Form or Congratulatory Text */}
        {candlesLit ? (
          <form onSubmit={handleWishSubmit} className="w-full max-w-sm mt-2">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Type a secret birthday wish..."
                className="w-full px-5 py-3 rounded-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 text-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={handleBlowOut}
                className="px-6 py-3 rounded-full bg-pink-500 text-white font-display font-medium text-sm hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 cursor-pointer w-full"
              >
                <Sparkles size={16} />
                Make Wish & Blow out Candles! 🌬️
              </button>
            </div>
          </form>
        ) : (
          <div className="animate-fade-in">
            <h3 className="font-serif text-2xl font-semibold text-rose-500 dark:text-rose-400 mb-2">
              Poof! Happy Birthday! 🎉💖
            </h3>
            
            {wishMade && (
              <div className="my-3 p-3 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100/30 rounded-2xl max-w-sm inline-block">
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-sans">Your Saved Wish ✨</p>
                <p className="text-sm font-handwritten text-rose-700 dark:text-rose-300 italic mt-1 font-semibold">
                  "{savedWish}"
                </p>
              </div>
            )}

            <button
              onClick={handleRelight}
              className="mt-4 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 font-display font-medium border border-slate-200/50 dark:border-slate-800 flex items-center gap-1.5 mx-auto transition-colors cursor-pointer"
            >
              <RefreshCw size={12} />
              Light Candles Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
