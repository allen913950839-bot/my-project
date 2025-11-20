import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AIPersona as AIPersonaType } from '../data/mockData_CN';

interface AIPersonaProps {
  persona: AIPersonaType;
  themeColor: string;
  aiResponse: string | null;
  isThinking: boolean;
}

const AIPersona = ({ persona, themeColor, aiResponse, isThinking }: AIPersonaProps) => {
  return (
    <div className="glass-dark rounded-2xl p-6 relative overflow-hidden">
      {/* Decorative glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ backgroundColor: themeColor }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* AI Avatar */}
      <div className="flex items-start gap-4 mb-4">
        <motion.div
          className="relative"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
            <img
              src={persona.avatar}
              alt={persona.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Breathing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: `0 0 20px ${themeColor}80`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-bold text-slate-100">{persona.name}</h3>
            <Sparkles className="w-4 h-4" style={{ color: themeColor }} />
          </div>
          <p className="text-sm text-slate-400">{persona.personality}</p>
        </div>
      </div>

      {/* Speech Bubble - Greeting or AI Response */}
      <AnimatePresence mode="wait">
        {isThinking ? (
          <motion.div
            key="thinking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass rounded-2xl rounded-tl-none p-4 relative"
            style={{
              borderLeft: `3px solid ${themeColor}`,
            }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className="flex gap-1"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <div className="w-2 h-2 rounded-full bg-slate-400" />
                <div className="w-2 h-2 rounded-full bg-slate-400" />
              </motion.div>
              <span className="text-sm text-slate-400">AI正在分析你的情绪...</span>
            </div>
          </motion.div>
        ) : aiResponse ? (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="glass rounded-2xl rounded-tl-none p-4 relative"
            style={{
              background: `linear-gradient(135deg, ${themeColor}20, transparent)`,
              borderLeft: `3px solid ${themeColor}`,
            }}
          >
            <motion.p
              className="text-slate-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {aiResponse}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl rounded-tl-none p-4 relative"
            style={{
              borderLeft: `3px solid ${themeColor}`,
            }}
          >
            <p className="text-slate-200">{persona.greeting}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIPersona;
