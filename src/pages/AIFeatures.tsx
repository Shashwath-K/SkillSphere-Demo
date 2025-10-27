import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageSquareQuoteIcon, FileText } from 'lucide-react'; // Switched to lucide-react
import skillsphereImg from '../../assets/logo/comp_logo.png';
import aiImg from '../../assets/logo/banner_gem.png';
import LoadingPopup from '../components/LoadingPopup';

// Animation variant for the header content
const headerVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  }),
};

// Animation variant for the feature cards
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  }),
};

// Re-usable component for the Link to make it a motion component
const MotionLink = motion(Link);

const AIFeatures: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800); // simulate loading
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <LoadingPopup key="loading" />
      ) : (
        <motion.div
          key="content"
          className="min-h-screen bg-slate-100 font-display" // Use font-display from config
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Section */}
          <div className="relative w-full py-28 px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-[length:200%_200%] animate-gradient-x text-white text-center overflow-hidden">
            <motion.div
              className="flex flex-col items-center justify-center gap-4"
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="flex items-center gap-4"
                custom={0}
                variants={headerVariant}
              >
                <img
                  src={skillsphereImg}
                  alt="Skillsphere"
                  className="w-27 h-24 object-contain"
                />
                <span className="text-3xl font-extrabold">X</span>
                <img
                  src={aiImg}
                  alt="AI"
                  className="w-25 h-24 object-contain"
                />
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl font-bold tracking-tight"
                custom={1}
                variants={headerVariant}
              >
                Explore AI-Powered Tools
              </motion.h1>
              <motion.p
                className="text-lg text-white/80 max-w-2xl"
                custom={2}
                variants={headerVariant}
              >
                Supercharge your learning and teaching experience with
                Skillsphere’s AI suite.
              </motion.p>
            </motion.div>

            {/* Bottom Fade Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-slate-100"></div>
          </div>

          {/* Cards Section */}
          <div className="max-w-7xl mx-auto py-16 px-6 -mt-10 z-10 relative">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
            >
              {/* AI ChatBot */}
              <MotionLink
                to="/ai-chatbot"
                className="rounded-2xl shadow-lg overflow-hidden bg-white group"
                custom={0}
                variants={cardVariant}
                whileHover={{
                  y: -8,
                  boxShadow:
                    '0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(124 58 237 / 0.4)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <div className="p-8">
                  <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full inline-block mb-5 shadow-lg">
                    <Bot className="text-white w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    AI ChatBot
                  </h2>
                  <p className="text-gray-600">
                    Talk with our smart assistant to learn, clarify, and discover
                    insights.
                  </p>
                </div>
              </MotionLink>

              {/* AI Quiz Creator */}
              <MotionLink
                to="/ai-quiz-creator"
                className="rounded-2xl shadow-lg overflow-hidden bg-white group"
                custom={1}
                variants={cardVariant}
                whileHover={{
                  y: -8,
                  boxShadow:
                    '0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(217 70 239 / 0.4)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <div className="p-8">
                  <div className="p-4 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-full inline-block mb-5 shadow-lg">
                    <MessageSquareQuoteIcon className="text-white w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    AI Quiz Creator
                  </h2>
                  <p className="text-gray-600">
                    Generate quizzes instantly using AI for any topic you choose.
                  </p>
                </div>
              </MotionLink>

              {/* AI PDF Diagnosis */}
              <MotionLink
                to="/ai-pdf"
                className="rounded-2xl shadow-lg overflow-hidden bg-white group"
                custom={2}
                variants={cardVariant}
                whileHover={{
                  y: -8,
                  boxShadow:
                    '0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(59 130 246 / 0.4)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <div className="p-8">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full inline-block mb-5 shadow-lg">
                    <FileText className="text-white w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    AI PDF
                  </h2>
                  <p className="text-gray-600">
                    Create PDFs for summaries, questions, and more from your
                    documents.
                  </p>
                </div>
              </MotionLink>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIFeatures;