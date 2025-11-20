import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import GameDetail from './components/GameDetail';
import { Game } from './data/mockData';

function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <div className="min-h-screen bg-cyber-dark overflow-hidden">
      {/* Animated grid background */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {!selectedGame ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onGameSelect={setSelectedGame} />
          </motion.div>
        ) : (
          <motion.div
            key="game-detail"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <GameDetail game={selectedGame} onBack={() => setSelectedGame(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
