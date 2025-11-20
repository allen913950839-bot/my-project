import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, User } from 'lucide-react';
import { companies, games, Game } from '../data/mockData_CN';
import CompanyCard from './CompanyCard';
import GameModal from './GameModal';

interface LandingPageProps {
  onGameSelect: (game: Game) => void;
}

const LandingPage = ({ onGameSelect }: LandingPageProps) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);
  const companyGames = games.filter(g => g.companyId === selectedCompanyId);

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-6 py-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-neon-purple" />
          <h1 className="text-3xl font-bold text-gradient">GameEcho</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索游戏..."
              className="bg-transparent outline-none text-sm w-40 text-slate-200 placeholder-slate-400"
            />
          </div>
          <div className="glass w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:border-neon-purple transition-colors">
            <User className="w-5 h-5 text-slate-300" />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 text-center px-6 py-16"
      >
        <motion.h2
          className="text-6xl md:text-7xl font-bold mb-4"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: 'linear-gradient(90deg, #a855f7, #3b82f6, #ec4899, #a855f7)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          探索游戏世界
        </motion.h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          将你的评论转化为与AI游戏角色的互动对话
        </p>
      </motion.div>

      {/* Company Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10 px-6 pb-20 max-w-7xl mx-auto"
      >
        <h3 className="text-2xl font-bold mb-8 text-slate-200">精选发行商</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <CompanyCard
                company={company}
                onClick={() => setSelectedCompanyId(company.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 glass-dark px-6 py-8 mt-20"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400 text-sm">
            GameEcho - AI与游戏文化的交汇点。前所未有的评论体验。
          </p>
        </div>
      </motion.footer>

      {/* Game Modal */}
      <GameModal
        isOpen={!!selectedCompanyId}
        onClose={() => setSelectedCompanyId(null)}
        company={selectedCompany}
        games={companyGames}
        onGameSelect={onGameSelect}
      />
    </div>
  );
};

export default LandingPage;
