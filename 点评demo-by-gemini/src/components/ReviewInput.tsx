import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image, Mic, Smile, Send } from 'lucide-react';

interface ReviewInputProps {
  onSubmit: (content: string) => void;
  themeColor: string;
}

const ReviewInput = ({ onSubmit, themeColor }: ReviewInputProps) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content);
    setContent('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="glass-dark rounded-2xl p-4 relative overflow-hidden">
      {/* Focus glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isFocused
            ? `0 0 0 2px ${themeColor}, 0 0 20px ${themeColor}60`
            : '0 0 0 0px transparent',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Input Area */}
      <div className="relative z-10">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={handleKeyPress}
          placeholder="分享你的游戏体验..."
          className="w-full bg-transparent text-slate-200 placeholder-slate-500 outline-none resize-none min-h-[100px] mb-4"
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Image Upload */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              title="上传图片"
            >
              <Image className="w-5 h-5 text-slate-400" />
            </motion.button>

            {/* Voice Input */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              title="语音输入"
            >
              <Mic className="w-5 h-5 text-slate-400" />
            </motion.button>

            {/* GIF/Emoji */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="glass w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              title="添加GIF/表情"
            >
              <Smile className="w-5 h-5 text-slate-400" />
            </motion.button>
          </div>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="rounded-full px-6 py-2.5 flex items-center gap-2 font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            style={{
              background: content.trim()
                ? `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)`
                : 'rgba(100, 100, 100, 0.3)',
            }}
          >
            <span>发送</span>
            <Send className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Character count hint */}
        {content.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-slate-500 mt-2 text-right"
          >
            {content.length} 字符
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReviewInput;
