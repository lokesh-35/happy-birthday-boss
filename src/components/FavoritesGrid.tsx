import { motion } from 'motion/react';
import { Palmtree, Sunset, UtensilsCrossed, HeartHandshake } from 'lucide-react';
import { FavoriteThing } from '../types';

export default function FavoritesGrid() {
  const favorites: FavoriteThing[] = [
    {
      id: 'beaches',
      title: 'Loves Beaches',
      description: 'The rhythm of the gentle tide, cool sea breezes, and warm sands underfoot. Finding peace where the ocean meets the sky.',
      iconName: 'beaches',
      gradient: 'from-cyan-100/40 to-blue-200/40 dark:from-cyan-950/20 dark:to-blue-900/30',
    },
    {
      id: 'bonda',
      title: 'Loves Mysore Bonda',
      description: 'Crunchy on the outside, soft, pillowy, and warm on the inside. A comforting dish best enjoyed with dynamic chats and coconut chutney.',
      iconName: 'bonda',
      gradient: 'from-amber-100/40 to-orange-200/40 dark:from-amber-950/20 dark:to-orange-900/30',
    },
    {
      id: 'sunsets',
      title: 'Loves peaceful sunsets',
      description: 'Watching the day gracefully fade in rich layers of gold, pastel pink, and lavender. A serene moment of quiet beauty and reflection.',
      iconName: 'sunsets',
      gradient: 'from-rose-100/40 to-purple-200/40 dark:from-rose-950/20 dark:to-purple-900/30',
    },
    {
      id: 'memories',
      title: 'Loves making memories',
      description: 'Holding onto every dynamic conversation, shared laugh, and silent supportive moment. Building a priceless gallery of our lifelong love.',
      iconName: 'memories',
      gradient: 'from-pink-100/40 to-indigo-200/40 dark:from-pink-950/20 dark:to-indigo-900/30',
    },
  ];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'beaches':
        return <Palmtree className="text-cyan-500 w-8 h-8" />;
      case 'bonda':
        return <UtensilsCrossed className="text-amber-500 w-8 h-8" />;
      case 'sunsets':
        return <Sunset className="text-rose-500 w-8 h-8" />;
      case 'memories':
        return <HeartHandshake className="text-pink-500 w-8 h-8" />;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="py-12 max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-800 dark:text-slate-100">
          Some of Bindu's Favorite Things
        </h2>
        <div className="w-16 h-1 bg-pink-300 dark:bg-pink-700 mx-auto mt-3 rounded-full" />
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
          The little things that bring joy, warmth, and peace to her life.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {favorites.map((fav) => (
          <motion.div
            key={fav.id}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className={`bg-gradient-to-br ${fav.gradient} backdrop-blur-md border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex gap-5 items-start shadow-md hover:shadow-lg transition-all duration-300`}
          >
            <div className="p-3 bg-white/70 dark:bg-black/30 rounded-2xl shadow-sm shrink-0 border border-white/20">
              {renderIcon(fav.iconName)}
            </div>
            
            <div className="flex-1">
              <h3 className="font-display text-lg font-semibold text-slate-800 dark:text-white mb-2">
                {fav.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {fav.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
