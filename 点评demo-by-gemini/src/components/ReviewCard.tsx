import { motion } from 'framer-motion';
import { Heart, MessageCircle, Image as ImageIcon, Video } from 'lucide-react';
import { Review } from '../data/mockData_CN';

interface ReviewCardProps {
  review: Review;
  themeColor: string;
}

const ReviewCard = ({ review, themeColor }: ReviewCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="glass-dark rounded-2xl p-6 relative overflow-hidden"
    >
      {/* User Info */}
      <div className="flex items-start gap-3 mb-4">
        <img
          src={review.userAvatar}
          alt={review.userName}
          className="w-12 h-12 rounded-full border-2 border-white/20"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-slate-100">{review.userName}</h4>
          <p className="text-sm text-slate-500">{review.timestamp}</p>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-slate-200 leading-relaxed">{review.content}</p>
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mb-4">
          {review.images.map((image, index) => (
            <div
              key={index}
              className="aspect-video rounded-lg overflow-hidden bg-black/50"
            >
              <img
                src={image}
                alt={`Review image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Video Tag */}
      {review.hasVideo && (
        <div className="mb-4 glass px-3 py-2 rounded-lg inline-flex items-center gap-2">
          <Video className="w-4 h-4 text-neon-purple" />
          <span className="text-sm text-slate-300">视频评论</span>
        </div>
      )}

      {/* Interaction Stats */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
        <button className="flex items-center gap-2 text-slate-400 hover:text-neon-pink transition-colors">
          <Heart className="w-5 h-5" />
          <span className="text-sm">{review.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-slate-400 hover:text-neon-blue transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">回复</span>
        </button>
        {review.images && (
          <div className="flex items-center gap-1 text-slate-500">
            <ImageIcon className="w-4 h-4" />
            <span className="text-xs">{review.images.length}</span>
          </div>
        )}
      </div>

      {/* AI Reply Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-xl p-4 relative"
        style={{
          background: `linear-gradient(135deg, ${themeColor}15, transparent)`,
          borderLeft: `2px solid ${themeColor}`,
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: themeColor }}
          >
            AI
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-300 mb-1">AI回复</p>
            <p className="text-sm text-slate-400 leading-relaxed">{review.aiReply}</p>
          </div>
        </div>

        {/* Sparkle decoration */}
        <motion.div
          className="absolute top-2 right-2 w-2 h-2 rounded-full"
          style={{ backgroundColor: themeColor }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ReviewCard;
