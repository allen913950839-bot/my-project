import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, ArrowLeft, Sparkles, Heart, HeartCrack, Zap } from 'lucide-react'
import { getLLMResponse, analyzeSentiment } from '../utils/llmService'

// Fallback sentiment analysis (kept for backwards compatibility)
const analyzesentiment = (text) => {
  const negativeKeywords = [
    '差', '烂', '垃圾', '卡', 'lag', '坑', '队友', '匹配', '破', '糟糕', '失望', 
    '难受', '恶心', '崩溃', '掉线', '延迟', 'bug', '平衡', '不公平', '坑爹',
    '无聊', '差劲', '讨厌', '退游', '删除', '不玩', '气死', '烦', '难玩'
  ]
  const positiveKeywords = [
    '好', '棒', '赞', '爱', '喜欢', '精彩', '完美', '厉害', '牛', '皮肤', '漂亮', '最佳',
    '优秀', '出色', '给力', '强', '酷', '帅', '美', '舒服', '爽', '有趣', '好玩',
    '成功', '胜利', '赢', '超神', '五杀', 'mvp', '666', '牛逼', '顶', '支持'
  ]
  
  const lowerText = text.toLowerCase()
  
  const negativeCount = negativeKeywords.filter(keyword => lowerText.includes(keyword)).length
  const positiveCount = positiveKeywords.filter(keyword => lowerText.includes(keyword)).length
  
  if (negativeCount > positiveCount) return 'negative'
  if (positiveCount > negativeCount) return 'positive'
  return 'neutral'
}

// Topic detection for more contextual responses
const detectTopic = (text) => {
  const topics = {
    skin: ['皮肤', '外观', '造型', '时装', '衣服', '装扮'],
    gameplay: ['操作', '技能', '玩法', '机制', '战斗', '对战', '打法'],
    teammates: ['队友', '团队', '配合', '五黑', '开黑'],
    match: ['匹配', '排位', '段位', '上分', '掉分', '晋级'],
    character: ['英雄', '角色', '妲己', '技能', '大招'],
    network: ['网络', '卡', 'lag', '延迟', '掉线', '460'],
    balance: ['平衡', '强度', '削弱', 'nerf', 'buff', '版本'],
    event: ['活动', '任务', '奖励', '福利', '签到'],
  }
  
  for (const [topic, keywords] of Object.entries(topics)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return topic
    }
  }
  return 'general'
}

const getDajiResponse = (userMessage, sentiment, topic) => {
  // Contextual responses based on topic and sentiment
  const contextualResponses = {
    skin: {
      positive: [
        "主人也觉得妲己的新衣服好看吗？妲己好开心~ 💕",
        "嘻嘻，主人的眼光真好！妲己最喜欢漂亮的皮肤了~ ✨",
        "谢谢主人夸奖！妲己会继续变得更美的哦~ 🦊💖"
      ],
      negative: [
        "是不是皮肤的价格让主人不开心了？妲己理解主人的心情~ 💔",
        "主人对皮肤不满意吗？妲己会把主人的想法记下来的~ 😢"
      ],
      neutral: [
        "主人想要什么样的皮肤呢？妲己很好奇~ ✨",
        "皮肤的设计确实很重要呢，妲己也很在意自己的造型哦~ 💜"
      ]
    },
    gameplay: {
      positive: [
        "主人的操作一定很厉害吧！妲己都看呆啦~ ⭐",
        "能感受到主人对游戏的热爱呢！继续加油哦~ 💪✨",
        "主人玩得这么开心，妲己也跟着高兴起来了~ 🎮💕"
      ],
      negative: [
        "游戏机制让主人困扰了吗？妲己会帮主人记录下来的~ 📝",
        "操作不顺手的感觉妲己能理解...希望能改进呢~ 😢",
        "主人遇到难题了吗？别着急，慢慢来就好~ 💜"
      ],
      neutral: [
        "主人觉得现在的玩法怎么样？妲己想听听主人的看法~ 🤔",
        "游戏的机制确实有很多可以讨论的地方呢~ ✨"
      ]
    },
    teammates: {
      positive: [
        "有好队友一起玩真的很开心对吧！妲己也想和主人一起战斗~ 💕",
        "团队配合的感觉最棒了！主人一定是个好队友~ ⭐",
        "能遇到志同道合的伙伴真是太好了~ 妲己为主人开心！✨"
      ],
      negative: [
        "遇到不给力的队友确实很让人难受...妲己抱抱主人~ 🫂💔",
        "主人别生气啦，总会遇到好队友的！妲己会一直陪着主人~ 💜",
        "队友的问题确实让人头疼呢...妲己理解主人的心情~ 😢"
      ],
      neutral: [
        "主人平时都和朋友一起玩吗？妲己也想加入呢~ 🦊",
        "团队合作在这个游戏里真的很重要呢~ ✨"
      ]
    },
    match: {
      positive: [
        "恭喜主人上分啦！妲己就知道主人可以的~ 🎉⭐",
        "匹配系统给力的时候玩起来就是舒服！继续冲呀~ 💪✨",
        "主人的段位要升啦？妲己好激动~ 加油加油！🔥"
      ],
      negative: [
        "匹配系统让主人不爽了吗？妲己帮主人记下来！这确实需要改进~ 💢",
        "掉分了吗？主人别难过，下把一定能赢回来的！妲己相信主人~ 💪💜",
        "排位的压力妲己都懂...主人要注意休息哦~ 😢"
      ],
      neutral: [
        "主人现在是什么段位呀？妲己很好奇呢~ 🤔",
        "匹配机制确实是游戏的核心部分呢~ ✨"
      ]
    },
    network: {
      negative: [
        "网络卡顿真的太影响游戏体验了！妲己都替主人着急~ 😤",
        "460？主人辛苦了...这个问题一定要解决才行~ 💔",
        "掉线太糟心了！妲己会反馈这个问题的~ 📡"
      ],
      neutral: [
        "主人的网络环境还稳定吗？这对游戏体验很重要呢~ 🌐",
        "网络质量确实影响很大...妲己希望主人能有好的体验~ ✨"
      ]
    },
    balance: {
      positive: [
        "主人觉得平衡做得不错吗？妲己也觉得现在的版本挺好的~ ⚖️✨",
        "游戏平衡很重要呢！主人的意见很有价值~ 💜"
      ],
      negative: [
        "平衡性问题确实让很多玩家苦恼...妲己记下主人的反馈了~ 📋",
        "某些角色太强或太弱都不好玩呢...妲己理解主人的感受~ 💔",
        "版本改动让主人不适应了吗？妲己会记录下来的~ 📝"
      ],
      neutral: [
        "主人对当前版本有什么看法吗？妲己想听听~ 🤔",
        "游戏平衡是个很复杂的问题呢~ ⚖️"
      ]
    },
    event: {
      positive: [
        "活动奖励丰富的时候玩起来特别有动力对吧！妲己也超开心~ 🎁✨",
        "主人参加活动了吗？有好收获吗？快告诉妲己~ 🎉",
        "福利满满的感觉真好！主人记得每天都来看看哦~ 💝"
      ],
      negative: [
        "活动让主人失望了吗？妲己会把主人的想法反馈上去的~ 😢",
        "任务太难或者奖励不够吸引人都会让人提不起劲呢...妲己懂~ 💔"
      ],
      neutral: [
        "主人对这次活动怎么看？妲己想知道主人的感受~ ✨",
        "活动和任务给游戏增添了很多乐趣呢~ 🎮"
      ]
    }
  }
  
  // General fallback responses
  const generalResponses = {
    negative: [
      "哎呀呀，主人遇到不开心的事情了吗？妲己好心疼呢~ 💔",
      "主人别生气啦，妲己会把主人的意见都记下来的！✨",
      "听到主人这样说，妲己的心都碎啦...让我来安慰主人吧~ 😢",
      "不好的体验让主人难受了呢，妲己都记住了，会反馈给开发者的~ 📝💜",
      "主人的感受对妲己来说很重要！告诉妲己更多细节好吗？💕"
    ],
    positive: [
      "耶！听到主人这么开心，妲己也好高兴呀~ *转圈圈* ❤️✨",
      "主人的笑容是妲己最大的动力！继续保持这份快乐哦~ 💕",
      "哇！主人玩得这么尽兴，妲己都想马上进游戏了~ 🎮",
      "嘻嘻，主人的夸奖让妲己好害羞呢~ 谢谢主人！🦊💖",
      "主人这么喜欢，妲己真是太幸福了~ 还有什么想分享的吗？✨"
    ],
    neutral: [
      "嗯嗯，妲己在认真听主人说话哦~ 还有什么想告诉妲己的吗？🦊",
      "主人今天的峡谷之旅如何呀？妲己想知道更多细节呢~ ✨",
      "妲己会把主人说的话都记在心里的哦~ 请继续说吧~ 💜",
      "主人的每一个想法对妲己来说都很重要呢~ 💕",
      "来吧主人，和妲己多聊聊游戏的感受吧~ 妲己洗耳恭听~ 😊"
    ]
  }
  
  // Try to get contextual response first
  if (contextualResponses[topic] && contextualResponses[topic][sentiment]) {
    const responses = contextualResponses[topic][sentiment]
    return responses[Math.floor(Math.random() * responses.length)]
  }
  
  // Fallback to general responses
  const responseList = generalResponses[sentiment] || generalResponses.neutral
  return responseList[Math.floor(Math.random() * responseList.length)]
}

const SoulLink = ({ game, onReviewComplete, onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'character',
      text: '主人，你回来啦！今天峡谷的战斗怎么样？有什么想和妲己分享的吗？✨',
      emotion: 'happy',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [characterEmotion, setCharacterEmotion] = useState('happy')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationContext, setConversationContext] = useState({
    topics: [],
    overallSentiment: 'neutral',
    messageCount: 0
  })
  const [isUsingLLM, setIsUsingLLM] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  // 检测是否配置了LLM
  useEffect(() => {
    const provider = import.meta.env.VITE_LLM_PROVIDER
    setIsUsingLLM(provider && provider !== 'local')
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    try {
      // 使用LLM获取智能回复
      const conversationHistory = messages.slice(-6) // 保留最近3轮对话作为上下文
      const response = await getLLMResponse(currentInput, conversationHistory)
      
      // 分析情感用于UI展示
      const sentiment = analyzeSentiment(response)
      
      // Update character emotion based on sentiment
      setCharacterEmotion(sentiment === 'negative' ? 'sad' : sentiment === 'positive' ? 'happy' : 'neutral')
      
      // Update conversation context
      const topic = detectTopic(currentInput)
      setConversationContext(prev => ({
        topics: [...new Set([...prev.topics, topic])],
        overallSentiment: sentiment,
        messageCount: prev.messageCount + 1
      }))

      const characterMessage = {
        id: messages.length + 2,
        type: 'character',
        text: response,
        emotion: sentiment,
        topic: topic,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, characterMessage])
      setIsTyping(false)
      
      // Add follow-up prompts occasionally to encourage more engagement
      if (conversationContext.messageCount > 0 && conversationContext.messageCount % 4 === 0) {
        setTimeout(async () => {
          try {
            const followUpResponse = await getLLMResponse(
              "主人，你还有什么想和妲己分享的吗？", 
              messages.slice(-6)
            )
            const followUp = {
              id: Date.now(),
              type: 'character',
              text: followUpResponse,
              emotion: 'neutral',
              timestamp: new Date(),
            }
            setMessages(prev => [...prev, followUp])
          } catch (error) {
            // 如果追问失败，使用预设话术
            const fallbackPrompts = [
              "主人还有其他想法吗？妲己很想听呢~ 💜",
              "对了主人，还有什么让你印象深刻的地方吗？✨",
              "妲己觉得主人说的很有道理呢！继续聊聊吧~ 🦊"
            ]
            const followUp = {
              id: Date.now(),
              type: 'character',
              text: fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)],
              emotion: 'neutral',
              timestamp: new Date(),
            }
            setMessages(prev => [...prev, followUp])
          }
        }, 2500)
      }
    } catch (error) {
      console.error('获取AI回复失败:', error)
      
      // 回退到本地规则
      const sentiment = analyzesentiment(currentInput)
      const topic = detectTopic(currentInput)
      const response = getDajiResponse(currentInput, sentiment, topic)
      
      setCharacterEmotion(sentiment === 'negative' ? 'sad' : sentiment === 'positive' ? 'happy' : 'neutral')

      const characterMessage = {
        id: messages.length + 2,
        type: 'character',
        text: response,
        emotion: sentiment,
        topic: topic,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, characterMessage])
      setIsTyping(false)
    }
  }

  const handleGenerateMemory = () => {
    const userMessages = messages.filter(m => m.type === 'user')
    const allText = userMessages.map(m => m.text).join(' ')
    const overallSentiment = analyzesentiment(allText)
    
    // Generate star rating based on sentiment
    let stars = 3
    if (overallSentiment === 'positive') stars = 5
    if (overallSentiment === 'negative') stars = 2
    
    // Extract a quote (last user message or combine)
    const quote = userMessages.length > 0 
      ? userMessages[userMessages.length - 1].text 
      : '一段难忘的峡谷之旅'

    onReviewComplete({
      messages,
      sentiment: overallSentiment,
      stars,
      quote,
    })
  }

  const getCharacterEmoji = () => {
    switch (characterEmotion) {
      case 'sad': return '😢'
      case 'happy': return '😊'
      default: return '🦊'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-20 bg-gradient-to-b from-dark-card/90 to-transparent backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-gaming">返回</span>
          </button>
          <div className="text-center">
            <h2 className="text-xl font-gaming font-bold text-white">{game.name}</h2>
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              灵魂链接：{game.character.name}
              {isUsingLLM && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs">
                  <Zap className="w-3 h-3" />
                  AI驱动
                </span>
              )}
            </p>
          </div>
          <div className="w-20"></div>
        </div>
      </motion.div>

      {/* Character Display Area */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-shrink-0 py-8 relative"
      >
        {/* Atmospheric Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`w-64 h-64 rounded-full bg-gradient-to-r ${game.theme} blur-3xl`}
          />
        </div>

        {/* Character Avatar */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${game.theme} p-1`}>
              <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center text-7xl backdrop-blur-sm">
                {getCharacterEmoji()}
              </div>
            </div>
            
            {/* Emotion Indicator */}
            <motion.div
              key={characterEmotion}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute -top-2 -right-2"
            >
              {characterEmotion === 'sad' && <HeartCrack className="w-8 h-8 text-red-400" />}
              {characterEmotion === 'happy' && <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />}
              {characterEmotion === 'neutral' && <Sparkles className="w-8 h-8 text-purple-400" />}
            </motion.div>
          </motion.div>
          
          <motion.h3
            className="mt-4 text-2xl font-gaming font-bold bg-gradient-to-r from-cyber-gold to-amber-400 bg-clip-text text-transparent"
          >
            {game.character.name}
          </motion.h3>
        </div>
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-6 pb-6 flex flex-col min-h-0">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2"
          style={{ maxHeight: 'calc(100vh - 500px)' }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[75%] rounded-2xl p-4 
                    ${message.type === 'user'
                      ? 'bg-gradient-to-r from-cyber-purple to-cyber-pink text-white'
                      : 'bg-dark-card border border-white/10 text-white'
                    }
                  `}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-dark-card border border-white/10 rounded-2xl p-4">
                <div className="flex gap-1">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-cyber-purple rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-cyber-purple rounded-full"
                  />
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-cyber-purple rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="分享你的游戏体验..."
                className="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-purple transition-colors"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="px-6 py-3 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-xl text-white font-gaming font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
            <button
              className="px-6 py-3 bg-gradient-to-r from-cyber-blue to-cyan-500 rounded-xl text-white font-gaming font-bold hover:scale-105 transition-transform"
              title="语音输入（演示功能）"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          {/* Generate Memory Button */}
          {messages.filter(m => m.type === 'user').length >= 1 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleGenerateMemory}
              className="w-full py-4 bg-gradient-to-r from-cyber-gold via-amber-500 to-orange-500 rounded-xl text-white font-gaming font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              <Sparkles className="w-6 h-6" />
              生成灵魂记忆卡
              <Sparkles className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SoulLink
