import { useState } from 'react';
import { motion } from 'framer-motion';
import { Review } from '../data/mockData_CN';
import ReviewCard from './ReviewCard';

interface ReviewFeedProps {
  reviews: Review[];
  themeColor: string;
}

const ReviewFeed = ({ reviews, themeColor }: ReviewFeedProps) => {
  const [filter, setFilter] = useState<'all' | 'text' | 'image' | 'video'>('all');

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'all') return true;
    if (filter === 'image') return review.images && review.images.length > 0;
    if (filter === 'video') return review.hasVideo;
    if (filter === 'text') return !review.images && !review.hasVideo;
    return true;
  });

  const filters: Array<{ id: typeof filter; label: string }> = [
    { id: 'all', label: '全部评论' },
    { id: 'text', label: '文字' },
    { id: 'image', label: '图片' },
    { id: 'video', label: '视频' },
  ];

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {filters.map((filterOption) => (
          <motion.button
            key={filterOption.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(filterOption.id)}
            className={`glass px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === filterOption.id
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            style={{
              background:
                filter === filterOption.id
                  ? `linear-gradient(135deg, ${themeColor}, ${themeColor}cc)`
                  : undefined,
            }}
          >
            {filterOption.label}
          </motion.button>
        ))}
      </div>

      {/* Reviews Grid */}
      <motion.div
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <ReviewCard review={review} themeColor={themeColor} />
          </motion.div>
        ))}
      </motion.div>

      {/* No results message */}
      {filteredReviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-slate-400"
        >
          <p>没有找到符合此筛选条件的评论。</p>
        </motion.div>
      )}
    </div>
  );
};

export default ReviewFeed;
