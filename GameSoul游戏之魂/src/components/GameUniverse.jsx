import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2, ChevronRight, Sparkles } from 'lucide-react'

// Mock data for publishers and games
const publishers = [
  {
    id: 'tencent',
    name: '腾讯游戏',
    nameEn: 'Tencent Games',
    color: 'from-cyber-blue to-cyber-purple',
    games: [
      {
        id: 'hok',
        name: '王者荣耀',
        nameEn: 'Honor of Kings',
        description: '5v5公平竞技MOBA手游',
        theme: 'from-cyber-gold to-amber-600',
        character: {
          name: '妲己',
          nameEn: 'Daji',
          avatar: '🦊',
          personality: 'playful',
        }
      }
    ]
  }
]

const GameUniverse = ({ onGameSelect }) => {
  const [expandedPublisher, setExpandedPublisher] = useState(null)

  const handlePublisherClick = (publisherId) => {
    setExpandedPublisher(expandedPublisher === publisherId ? null : publisherId)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-cyber-purple" />
          <h1 className="text-6xl font-gaming font-bold bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-blue bg-clip-text text-transparent">
            GameSoul
          </h1>
          <Sparkles className="w-8 h-8 text-cyber-blue" />
        </div>
        <p className="text-xl text-gray-400 font-gaming">与游戏角色灵魂对话，分享你的游戏体验</p>
      </motion.div>

      {/* Publishers Grid */}
      <div className="w-full max-w-4xl space-y-6">
        {publishers.map((publisher, index) => (
          <motion.div
            key={publisher.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="relative"
          >
            {/* Publisher Card */}
            <motion.div
              layoutId={`publisher-${publisher.id}`}
              onClick={() => handlePublisherClick(publisher.id)}
              className={`
                relative overflow-hidden rounded-2xl cursor-pointer
                bg-gradient-to-r ${publisher.color} p-0.5
                hover:scale-105 transition-transform duration-300
              `}
            >
              <div className="bg-dark-card rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-gaming font-bold text-white">{publisher.name}</h2>
                    <p className="text-sm text-gray-400">{publisher.nameEn}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedPublisher === publisher.id ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-8 h-8 text-white/60" />
                </motion.div>
              </div>
            </motion.div>

            {/* Games List (Expanded) */}
            <motion.div
              initial={false}
              animate={{
                height: expandedPublisher === publisher.id ? 'auto' : 0,
                opacity: expandedPublisher === publisher.id ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="mt-4 ml-8 space-y-4">
                {publisher.games.map((game, gameIndex) => (
                  <motion.div
                    key={game.id}
                    layoutId={`game-${game.id}`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{
                      x: expandedPublisher === publisher.id ? 0 : -50,
                      opacity: expandedPublisher === publisher.id ? 1 : 0,
                    }}
                    transition={{ delay: gameIndex * 0.1 }}
                    onClick={() => onGameSelect(game)}
                    className={`
                      relative overflow-hidden rounded-xl cursor-pointer
                      bg-gradient-to-r ${game.theme} p-0.5
                      hover:scale-105 transition-all duration-300
                      group
                    `}
                  >
                    <div className="bg-dark-card/95 rounded-xl p-5 flex items-center gap-4">
                      {/* Character Avatar */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm"
                      >
                        {game.character.avatar}
                      </motion.div>

                      {/* Game Info */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-gaming font-bold text-white mb-1">
                          {game.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">{game.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 bg-white/10 rounded-full text-white/80">
                            灵魂角色：{game.character.name}
                          </span>
                        </div>
                      </div>

                      {/* Enter Button */}
                      <motion.div
                        className="px-6 py-3 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg font-gaming font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        进入灵魂空间
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center text-gray-500 text-sm"
      >
        <p>✨ 选择游戏，开启与角色的灵魂对话 ✨</p>
      </motion.div>
    </motion.div>
  )
}

export default GameUniverse
