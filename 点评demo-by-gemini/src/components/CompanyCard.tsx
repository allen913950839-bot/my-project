import { motion } from 'framer-motion';
import { Company } from '../data/mockData';

interface CompanyCardProps {
  company: Company;
  onClick: () => void;
}

const CompanyCard = ({ company, onClick }: CompanyCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass rounded-2xl overflow-hidden cursor-pointer group relative"
      style={{
        borderColor: `${company.themeColor}00`,
      }}
    >
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `0 0 30px ${company.themeColor}80, 0 0 60px ${company.themeColor}40`,
          border: `2px solid ${company.themeColor}`,
        }}
      />
      
      <div className="relative z-10 p-6">
        {/* Company Logo */}
        <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-black/30">
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Company Info */}
        <h3 className="text-xl font-bold mb-2 text-slate-100">{company.name}</h3>
        <p className="text-sm text-slate-400 line-clamp-2">{company.description}</p>

        {/* Decorative element */}
        <div className="mt-4 flex items-center gap-2">
          <motion.div
            className="h-1 rounded-full"
            style={{ backgroundColor: company.themeColor }}
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Particle effect on hover */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: company.themeColor }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
};

export default CompanyCard;
