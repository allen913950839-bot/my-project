import React from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, Download, Share2, Sparkles } from 'lucide-react'

const MemoryCard = ({ data, game, onBack }) => {
  const { stars, quote, sentiment } = data

  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive': return 'from-green-400 to-emerald-500'
      case 'negative': return 'from-red-400 to-rose-500'
      default: return 'from-blue-400 to-cyan-500'
    }
  }

  const getSentimentLabel = () => {
    switch (sentiment) {
      case 'positive': return '愉悦体验'
      case 'negative': return '需要改进'
      default: return '中性评价'
    }
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
        className="w-full max-w-4xl mb-8 flex items-center justify-between"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-gaming">返回宇宙</span>
        </button>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-dark-card border border-white/10 rounded-lg text-white hover:border-cyber-purple transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="font-gaming text-sm">下载</span>
          </button>
          <button className="px-4 py-2 bg-dark-card border border-white/10 rounded-lg text-white hover:border-cyber-purple transition-colors flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span className="font-gaming text-sm">分享</span>
          </button>
        </div>
      </motion.div>

      {/* Memory Card */}
      <motion.div
        initial={{ scale: 0.8, rotateY: -90, opacity: 0 }}
        animate={{ scale: 1, rotateY: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.2,
        }}
        className="relative w-full max-w-md"
        style={{ perspective: '1000px' }}
      >
        {/* Glow Effect */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 bg-gradient-to-r ${game.theme} blur-3xl rounded-3xl`}
        />

        {/* Card Content */}
        <div className="relative bg-gradient-to-br from-dark-card via-dark-bg to-dark-card border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Top Section - Game & Character */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${game.theme} p-1 mb-4`}>
                <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center text-6xl">
                  {game.character.avatar}
                </div>
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-gaming font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2"
            >
              {game.name}
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyber-purple" />
              <span className="text-gray-400 font-gaming text-sm">
                灵魂使者：{game.character.name}
              </span>
              <Sparkles className="w-4 h-4 text-cyber-purple" />
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

          {/* Quote Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6"
          >
            <div className="relative">
              <div className="absolute -left-2 -top-2 text-4xl text-cyber-purple/30 font-serif">"</div>
              <p className="text-white text-lg leading-relaxed px-4 py-2 italic">
                {quote}
              </p>
              <div className="absolute -right-2 -bottom-2 text-4xl text-cyber-purple/30 font-serif">"</div>
            </div>
          </motion.div>

          {/* Star Rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-2 mb-6"
          >
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <Star
                  className={`w-8 h-8 ${
                    index < stars
                      ? 'text-cyber-gold fill-cyber-gold'
                      : 'text-gray-600'
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Sentiment Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex justify-center"
          >
            <div className={`px-6 py-2 bg-gradient-to-r ${getSentimentColor()} rounded-full`}>
              <span className="text-white font-gaming font-bold text-sm">
                {getSentimentLabel()}
              </span>
            </div>
          </motion.div>

          {/* Bottom Section - Timestamp */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-8 text-center"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
            <p className="text-gray-500 text-xs font-gaming">
              灵魂记忆 · {new Date().toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyber-purple/30 rounded-tl-2xl" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyber-purple/30 rounded-tr-2xl" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyber-purple/30 rounded-bl-2xl" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyber-purple/30 rounded-br-2xl" />
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-8 text-center max-w-2xl"
      >
        <p className="text-gray-400 text-sm leading-relaxed">
          这是你与 <span className="text-cyber-gold font-gaming">{game.character.name}</span> 的灵魂对话记忆。
          每一次交流都是独特的体验，每一张卡片都承载着你的真实感受。
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        className="mt-8 flex gap-4"
      >
        <button
          onClick={onBack}
          className="px-8 py-3 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-xl text-white font-gaming font-bold hover:scale-105 transition-transform"
        >
          继续探索更多游戏
        </button>
      </motion.div>
    </motion.div>
  )
}

export default MemoryCard
