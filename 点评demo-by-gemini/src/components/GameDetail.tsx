import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Game } from '../data/mockData_CN';
import AIPersona from './AIPersona';
import ReviewInput from './ReviewInput';
import ReviewFeed from './ReviewFeed';

interface GameDetailProps {
  game: Game;
  onBack: () => void;
}

const GameDetail = ({ game, onBack }: GameDetailProps) => {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleReviewSubmit = (content: string) => {
    // Simulate AI thinking
    setIsAiThinking(true);
    
    setTimeout(() => {
      setIsAiThinking(false);
      // Generate a personalized AI response
      const responses = [
        "你对游戏的热情闪耀着光芒！我也有同样的兴奋！",
        "多么不可思议的视角！这款游戏真的将人们联系在一起。",
        "我无法说得更好！你的经历映射了许多冒险。",
        "这正是让我们的世界特别的原因！感谢分享！",
        "你的话完美地捕捉了精髓！让我们继续冒险吧！",
      ];
      setAiResponse(responses[Math.floor(Math.random() * responses.length)]);
      
      // Clear AI response after showing
      setTimeout(() => setAiResponse(null), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative pb-20">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-80 overflow-hidden"
      >
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src={game.cover}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent, ${game.themeColor}20, #0a0e1a)`,
            }}
          />
        </div>

        {/* Back Button */}
        <motion.button
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={onBack}
          className="absolute top-6 left-6 glass w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </motion.button>

        {/* Game Title */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-6 right-6 z-10"
        >
          <h1 className="text-5xl font-bold text-slate-100 mb-2">{game.title}</h1>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: game.themeColor }}
            />
            <span className="text-slate-400">互动评论体验</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - AI Interaction */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            <AIPersona
              persona={game.aiPersona}
              themeColor={game.themeColor}
              aiResponse={aiResponse}
              isThinking={isAiThinking}
            />
            
            <ReviewInput
              onSubmit={handleReviewSubmit}
              themeColor={game.themeColor}
            />
          </motion.div>

          {/* Right Column - Community Reviews */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="lg:col-span-3"
          >
            <ReviewFeed reviews={game.reviews} themeColor={game.themeColor} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
