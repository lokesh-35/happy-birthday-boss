import { motion } from 'motion/react';
import { Calendar, MessageCircle, Heart, Award } from 'lucide-react';
import { TimelineEvent } from '../types';

export default function Timeline() {
  const events: TimelineEvent[] = [
    {
      id: 'first-meeting',
      date: '29 January',
      title: 'Our First Meeting 📍',
      description: 'Our very first meeting. I never imagined that day would become the beginning of our beautiful forever.',
      icon: 'calendar',
    },
    {
      id: 'conversations',
      date: 'Deepening Love',
      title: 'From Close Friends to Soulmates 💞',
      description: 'Slowly learning about each other’s little quirks, sharing dreams, and falling completely in love. Daily chats turned into a beautiful, life-long bond.',
      icon: 'message',
    },
    {
      id: 'best-friends',
      date: 'The Sacred Vow',
      title: 'Our Happily Ever After 💍',
      description: 'The day we became husband and wife. Saying "I do" and officially starting our journey together forever as partners, lovers, and companions.',
      icon: 'heart',
    },
    {
      id: 'celebration',
      date: 'July 16',
      title: 'Celebrating My Best Friend 🎂',
      description: 'Celebrating the incredible woman you are. Happy birthday to the queen of my heart, my soulmate, and my beloved best friend. Here’s to a lifetime of sunsets, laughs, and pure love.',
      icon: 'award',
    },
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case 'calendar':
        return <Calendar className="w-5 h-5 text-pink-500" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-indigo-500" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-100 dark:fill-rose-900/30" />;
      case 'award':
        return <Award className="w-5 h-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-slate-800 dark:text-slate-100">
          Our Story Timeline
        </h2>
        <div className="w-16 h-1 bg-pink-300 dark:bg-pink-700 mx-auto mt-3 rounded-full" />
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
          A collection of milestones, laughter, and memories that defined our wonderful journey.
        </p>
      </div>

      <div className="relative border-l border-pink-200/60 dark:border-pink-900/40 ml-4 md:ml-32">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={event.id} className="mb-12 relative pl-8 md:pl-12">
              {/* Timeline dot / icon */}
              <div className="absolute -left-[18px] top-1.5 w-9 h-9 rounded-full bg-white dark:bg-slate-950 border-2 border-pink-300 dark:border-pink-800 flex items-center justify-center shadow-md z-10">
                {renderIcon(event.icon)}
              </div>

              {/* Date label left side (Only on desktop) */}
              <div className="hidden md:block absolute right-full top-2.5 mr-10 text-right w-24">
                <span className="font-display text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  {event.date}
                </span>
              </div>

              {/* Content card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 max-w-2xl"
              >
                {/* Mobile-only Date badge */}
                <div className="inline-block md:hidden bg-pink-50 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900/30 px-2.5 py-1 rounded-full mb-3">
                  <span className="font-display text-[10px] font-semibold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                    {event.date}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {event.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
