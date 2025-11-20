import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GameUniverse from './components/GameUniverse'
import SoulLink from './components/SoulLink'
import MemoryCard from './components/MemoryCard'

function App() {
  const [currentView, setCurrentView] = useState('universe') // 'universe', 'soullink', 'memory'
  const [selectedGame, setSelectedGame] = useState(null)
  const [reviewData, setReviewData] = useState(null)

  const handleGameSelect = (game) => {
    setSelectedGame(game)
    setCurrentView('soullink')
  }

  const handleReviewComplete = (data) => {
    setReviewData(data)
    setCurrentView('memory')
  }

  const handleBackToUniverse = () => {
    setCurrentView('universe')
    setSelectedGame(null)
    setReviewData(null)
  }

  return (
    <div className="min-h-screen bg-dark-bg overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/20 via-dark-bg to-cyber-blue/20"></div>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'universe' && (
            <GameUniverse key="universe" onGameSelect={handleGameSelect} />
          )}
          {currentView === 'soullink' && selectedGame && (
            <SoulLink
              key="soullink"
              game={selectedGame}
              onReviewComplete={handleReviewComplete}
              onBack={handleBackToUniverse}
            />
          )}
          {currentView === 'memory' && reviewData && (
            <MemoryCard
              key="memory"
              data={reviewData}
              game={selectedGame}
              onBack={handleBackToUniverse}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
