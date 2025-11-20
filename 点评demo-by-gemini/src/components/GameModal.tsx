import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Company, Game } from '../data/mockData_CN';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  company?: Company;
  games: Game[];
  onGameSelect: (game: Game) => void;
}

const GameModal = ({ isOpen, onClose, company, games, onGameSelect }: GameModalProps) => {
  if (!company) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div className="glass-dark rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              {/* Header */}
              <div
                className="px-8 py-6 border-b border-white/10 flex items-center justify-between"
                style={{
                  background: `linear-gradient(135deg, ${company.themeColor}20, transparent)`,
                }}
              >
                <div>
                  <h2 className="text-3xl font-bold text-slate-100">{company.name}</h2>
                  <p className="text-slate-400 mt-1">{company.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-300" />
                </button>
              </div>

              {/* Games Grid */}
              <div className="p-8 overflow-y-auto max-h-[calc(80vh-120px)]">
                <h3 className="text-xl font-bold mb-6 text-slate-200">可玩游戏</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {games.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => {
                        onGameSelect(game);
                        onClose();
                      }}
                      className="glass rounded-2xl overflow-hidden cursor-pointer group relative"
                    >
                      {/* Game Cover */}
                      <div className="aspect-video overflow-hidden bg-black/50">
                        <img
                          src={game.cover}
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Game Info */}
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-slate-100 mb-2">{game.title}</h4>
                        <div className="flex items-center gap-2">
                          <img
                            src={game.aiPersona.avatar}
                            alt={game.aiPersona.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="text-sm">
                            <p className="text-slate-300">AI向导</p>
                            <p className="text-slate-500 text-xs">{game.aiPersona.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                        style={{
                          boxShadow: `0 0 20px ${game.themeColor}60, 0 0 40px ${game.themeColor}30`,
                          border: `2px solid ${game.themeColor}`,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameModal;
