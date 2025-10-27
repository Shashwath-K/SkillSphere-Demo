import React from 'react';
import { motion } from 'framer-motion';

const LoadingPopup: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <motion.div
          className="relative rounded-full"
          style={{ width: 80, height: 80 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 right-0 border-8 rounded-full border-t-4 border-blue-500 border-gray-300"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          />
          {/* Inner pulsating circle */}
          <motion.div
            className="absolute inset-4 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.p
          className="text-gray-700 font-semibold select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
        >
          Loading, please wait...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingPopup;
