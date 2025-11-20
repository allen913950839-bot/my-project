import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Sparkles, ChevronRight, Star, Share2, X, Mic, Zap } from 'lucide-react';
import { getGeminiResponse } from './services/geminiService';

// --- MOCK DATA ---
const COMPANIES = [
  {
    id: 'tencent',
    name: '腾讯游戏',
    logo: '🐧',
    games: [
      {
        id: 'hok',
        name: '王者荣耀',
        coverColor: 'from-blue-600 to-cyan-800', // 亚瑟的蓝色主题
        character: {
          name: '亚瑟',
          role: '上路战士 / 毒舌王者',
          avatarColor: 'bg-blue-500',
          avatar: '⚔️',
          avatarImage: '/arthur.png', // 亚瑟图片路径
          greeting: '又是你？上次被我吐槽还敢来？行吧，说说你今天在峡谷又闹出什么笑话了。',
          personality: '性格傲慢毒舌，喜欢吐槽玩家，但偶尔会给出中肯的建议。说话直接不留情面，用词犀利讽刺，但内心其实关心玩家的游戏体验。',
          style: 'sarcastic'
        }
      },
      {
        id: 'pubg',
        name: '和平精英',
        coverColor: 'from-slate-700 to-slate-900',
        character: {
          name: '光子鸡',
          role: '战术向导',
          avatarColor: 'bg-yellow-400',
          greeting: '大吉大利,今晚吃鸡!特种兵,请汇报你的战况!',
          style: 'military'
        }
      }
    ]
  },
  {
    id: 'hoyo',
    name: '米哈游',
    logo: '🌌',
    games: [] // Placeholder
  }
];

// --- COMPONENTS ---

export default function GameSoulDemo() {
  const [view, setView] = useState('landing'); // landing | chat | card
  const [selectedGame, setSelectedGame] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [reviewSummary, setReviewSummary] = useState(null);
  const [characterMood, setCharacterMood] = useState('neutral');
  const [whipCount, setWhipCount] = useState(0);
  const [showWhip, setShowWhip] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [showCardButton, setShowCardButton] = useState(false); // 隐藏卡片按钮
  const messagesEndRef = useRef(null);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setView('chat');
    setWhipCount(0);
    setIsExploding(false);
    setShowCardButton(false);
    // Initial AI Message
    setChatHistory([{
      id: 1,
      sender: 'ai',
      text: game.character.greeting,
      mood: 'neutral'
    }]);
    setCharacterMood('neutral');
  };

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // AI Logic with Gemini Integration
  const handleSendMessage = async () => {
    if (!inputText.trim() || isExploding) return;

    const currentInput = inputText;
    const newMsg = { id: Date.now(), sender: 'user', text: currentInput };
    setChatHistory(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // 检测"抽"彩蛋
    if (currentInput.includes('抽')) {
      const newWhipCount = whipCount + 1;
      setWhipCount(newWhipCount);
      setShowWhip(true);
      setTimeout(() => setShowWhip(false), 500);

      // 3次后爆炸
      if (newWhipCount >= 3) {
        setIsExploding(true);
        setTimeout(() => {
          setChatHistory(prev => [...prev, {
            id: Date.now() + 1,
            sender: 'ai',
            text: '💥💥💥 我炸了！！！你满意了吧！！！我要去修理厂了，再见！！！💥💥💥',
            mood: 'exploded'
          }]);
          setIsTyping(false);
          
          // 3秒后重置
          setTimeout(() => {
            setIsExploding(false);
            setWhipCount(0);
            setChatHistory(prev => [...prev, {
              id: Date.now() + 2,
              sender: 'ai',
              text: '修好了...你这个混蛋，我记住你了！😤',
              mood: 'angry'
            }]);
            setCharacterMood('angry');
          }, 3000);
        }, 1000);
        return;
      }
    }

    try {
      // 调用 Gemini API
      const { text: aiResponseText, mood } = await getGeminiResponse(
        selectedGame.character.name,
        selectedGame.character.personality,
        chatHistory,
        currentInput
      );

      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponseText,
        mood: mood
      }]);
      setCharacterMood(mood);
      setIsTyping(false);

    } catch (error) {
      console.error('Error getting AI response:', error);
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: '我现在有点卡顿，稍后再说...',
        mood: 'neutral'
      }]);
      setIsTyping(false);
    }
  };

  const generateCard = () => {
    // Analyze the conversation to create a summary (Mocked)
    const userMessages = chatHistory.filter(m => m.sender === 'user').map(m => m.text).join(' ');
    const isPositive = userMessages.includes("好") || userMessages.includes("赢") || userMessages.includes("棒");
    
    setReviewSummary({
      rating: isPositive ? 5 : 2,
      tags: isPositive ? ['操作丝滑', '皮肤好看'] : ['匹配机制迷', '队友太坑'],
      quote: userMessages.substring(0, 40) + (userMessages.length > 40 ? '...' : ''),
      mood: isPositive ? 'Happy' : 'Angry'
    });
    setView('card');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-pink-500 selection:text-white overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen bg-slate-900 shadow-2xl relative border-x border-slate-800">
        
        {/* Header */}
        <header className="p-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/80 backdrop-blur z-10 sticky top-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm">GS</div>
            <span className="font-bold tracking-wider">GAMESOUL</span>
          </div>
          {view !== 'landing' && (
            <button onClick={() => setView('landing')} className="text-xs text-slate-400 hover:text-white">
              退出
            </button>
          )}
        </header>

        <AnimatePresence mode="wait">
          
          {/* --- VIEW 1: LANDING PAGE --- */}
          {view === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-6 space-y-8"
            >
              <div>
                <h1 className="text-2xl font-bold mb-2">选择你的战场</h1>
                <p className="text-slate-400 text-sm">与游戏英灵对话,生成你的专属评价。</p>
              </div>

              {COMPANIES.map(company => (
                <div key={company.id} className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-300 font-semibold">
                    <span>{company.logo}</span>
                    <span>{company.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {company.games.map(game => (
                      <motion.div
                        key={game.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectGame(game)}
                        className={`cursor-pointer h-40 rounded-xl bg-gradient-to-br ${game.coverColor} p-4 flex flex-col justify-end relative overflow-hidden group`}
                      >
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                         <h3 className="font-bold text-lg relative z-10">{game.name}</h3>
                         <div className="flex items-center gap-1 text-xs text-white/80 relative z-10">
                            <MessageCircle size={12} />
                            <span>召唤{game.character.name}</span>
                         </div>
                         <div className="absolute -right-4 -top-4 text-6xl opacity-20 rotate-12">🎮</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* --- VIEW 2: CHAT INTERFACE --- */}
          {view === 'chat' && selectedGame && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col h-[calc(100vh-64px)]"
            >
              {/* Character Avatar Background - 虚拟形象 */}
              <div className="relative h-64 bg-gradient-to-b from-slate-800 to-slate-900 overflow-hidden border-b border-slate-700">
                {/* 背景装饰 */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-cyan-500 rounded-full blur-3xl"></div>
                </div>

                {/* 角色形象 */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <motion.div
                    animate={{
                      scale: isExploding ? [1, 1.5, 0] : characterMood === 'angry' ? [1, 1.1, 1] : 1,
                      rotate: isExploding ? [0, 180, 360] : characterMood === 'sarcastic' ? [0, -5, 5, 0] : 0,
                      y: characterMood === 'happy' ? [0, -10, 0] : 0,
                    }}
                    transition={{ 
                      duration: isExploding ? 0.8 : 0.5,
                      repeat: !isExploding && (characterMood === 'angry' || characterMood === 'happy') ? Infinity : 0,
                      repeatDelay: 2
                    }}
                    className={`mb-4 ${isExploding ? 'opacity-0' : 'opacity-100'}`}
                  >
                    {selectedGame.character.avatarImage ? (
                      <img 
                        src={selectedGame.character.avatarImage} 
                        alt={selectedGame.character.name}
                        className="w-40 h-40 rounded-full object-cover border-4 border-yellow-500/30 shadow-2xl"
                      />
                    ) : (
                      <span className="text-8xl">{selectedGame.character.avatar || '⚔️'}</span>
                    )}
                  </motion.div>

                  {/* 爆炸效果 */}
                  {isExploding && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 3, opacity: 0 }}
                      className="absolute text-8xl"
                    >
                      💥
                    </motion.div>
                  )}

                  {/* 鞭痕效果 */}
                  <AnimatePresence>
                    {showWhip && (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute right-20 top-1/2 text-6xl"
                      >
                        💢
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 角色状态栏 */}
                  <div className="text-center">
                    <h2 className="font-bold text-xl text-white mb-1">{selectedGame.character.name}</h2>
                    <p className="text-xs text-cyan-400 flex items-center justify-center gap-1">
                      <Sparkles size={10} />
                      {characterMood === 'angry' && '😤 有点生气'}
                      {characterMood === 'happy' && '😊 心情不错'}
                      {characterMood === 'sad' && '😔 感到失望'}
                      {characterMood === 'sarcastic' && '😏 讽刺模式'}
                      {characterMood === 'proud' && '😎 略有赞许'}
                      {characterMood === 'neutral' && '😐 ' + selectedGame.character.role}
                      {characterMood === 'exploded' && '💥 已爆炸'}
                    </p>
                    {whipCount > 0 && whipCount < 3 && (
                      <p className="text-xs text-red-400 mt-1">
                        ⚠️ 被抽了 {whipCount} 次 ({3 - whipCount} 次后爆炸)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
                {chatHistory.map(msg => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
                      msg.sender === 'user' 
                        ? 'bg-pink-600 text-white rounded-tr-sm' 
                        : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-slate-800 border-t border-slate-700">
                <div className="flex gap-2 items-center">
                  <button className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-300">
                    <Mic size={20} />
                  </button>
                  <div className="flex-1 bg-slate-700 rounded-full flex items-center px-4 py-1">
                    <input 
                      type="text" 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.shiftKey && chatHistory.filter(m => m.sender === 'user').length >= 8) {
                          // Shift + Enter 隐藏快捷键生成卡片
                          generateCard();
                        } else if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                      placeholder={`和${selectedGame.character.name}聊聊你的游戏体验...`}
                      className="flex-1 bg-transparent border-none outline-none text-sm h-8 placeholder:text-slate-400"
                      disabled={isExploding}
                    />
                  </div>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isExploding}
                    className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:bg-slate-700 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
                
                {/* 隐藏提示 */}
                <div className="text-center text-[10px] text-slate-500 mt-2 space-y-1">
                  {!isExploding && (
                    <p className="text-cyan-400">💡 彩蛋提示: 试试输入"抽"...</p>
                  )}
                  {chatHistory.filter(m => m.sender === 'user').length >= 8 && (
                    <p className="text-purple-400 animate-pulse">✨ 按 Shift+Enter 生成评价卡片</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* --- VIEW 3: REVIEW CARD (RESULT) --- */}
          {view === 'card' && reviewSummary && selectedGame && (
             <motion.div
             key="card"
             initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
             animate={{ opacity: 1, scale: 1, rotateY: 0 }}
             transition={{ type: 'spring', damping: 20 }}
             className="flex flex-col items-center justify-center h-full p-6"
           >
             <div className="w-full max-w-sm bg-slate-800/80 backdrop-blur border border-slate-600 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.3)] relative">
                {/* Card Header */}
                <div className={`h-32 bg-gradient-to-br ${selectedGame.coverColor} relative p-6 flex flex-col justify-end`}>
                  <div className={`absolute top-4 right-4 w-16 h-16 rounded-full ${selectedGame.character.avatarColor} border-4 border-slate-800 flex items-center justify-center text-3xl shadow-lg`}>
                    🦊
                  </div>
                  <h2 className="text-2xl font-bold text-white relative z-10">{selectedGame.name}</h2>
                  <p className="text-white/80 text-xs font-mono tracking-widest relative z-10">SOUL CONTRACT</p>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-6">
                  
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={24} 
                        className={i < reviewSummary.rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-700 text-slate-700"} 
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-4xl text-slate-600 font-serif">"</div>
                    <p className="text-slate-300 italic relative z-10 pl-4">
                      {reviewSummary.quote}
                    </p>
                    <div className="absolute -bottom-4 -right-0 text-4xl text-slate-600 font-serif rotate-180">"</div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {reviewSummary.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-slate-700 text-xs text-pink-300 border border-slate-600">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* AI Stamp */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-700/50">
                    <div className="text-xs text-slate-500">
                      认证角色<br/>
                      <span className="text-slate-300 font-bold">{selectedGame.character.name}</span>
                    </div>
                    <div className="ml-auto border-2 border-pink-500 text-pink-500 px-2 py-1 text-xs font-bold uppercase -rotate-12 opacity-80">
                       {reviewSummary.mood === 'Happy' ? 'Highly Rec' : 'Needs Fix'}
                    </div>
                  </div>

                </div>
             </div>

             <div className="mt-8 flex gap-4">
               <button 
                onClick={() => { setView('landing'); setChatHistory([]); }}
                className="px-6 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors"
               >
                 返回大厅
               </button>
               <button className="px-6 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-sm font-medium shadow-lg shadow-pink-600/30 flex items-center gap-2">
                 <Share2 size={16} /> 分享契约
               </button>
             </div>

           </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
