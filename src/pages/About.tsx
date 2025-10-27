import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Bot,
  Laptop,
  Database,
  Github,
  Linkedin,
  Mail,
} from 'lucide-react'; // Replaced with lucide-react
import LoadingPopup from '../components/LoadingPopup';
// Removed '../styles/About.css' as all styling is now with Tailwind

// New feature data with updated icons and styling info
const featureData = [
  {
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    title: 'Smart Course Management',
    desc: 'Design structured learning paths with media-rich modules and nested sub-modules for better knowledge delivery.',
    bg: 'bg-gradient-to-br from-blue-500 to-cyan-500',
  },
  {
    icon: <Bot className="w-8 h-8 text-white" />,
    title: 'AI-Powered Learning Tools',
    desc: 'Harness the power of Gemini AI to auto-generate quizzes, documents, and entire course modules based on skill goals and subject matter.',
    bg: 'bg-gradient-to-br from-purple-500 to-pink-500',
  },
  {
    icon: <Laptop className="w-8 h-8 text-white" />,
    title: 'Adaptive Skill Builder',
    desc: 'Tailored module recommendations based on user progress ensure personalized and impactful learning.',
    bg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
  },
  {
    icon: <Database className="w-8 h-8 text-white" />,
    title: 'Firebase-Powered Backend',
    desc: 'Seamlessly sync user actions in real-time with Firebase Firestore and scalable deployment with Firebase Hosting.',
    bg: 'bg-gradient-to-br from-amber-500 to-orange-500',
  },
];

const developers = [
  {
    name: 'Shashwath K S',
    role: 'Lead Developer',
    designation: 'AI Integrator + UI/UX',
    image: 'https://ik.imagekit.io/cadncfpqe/user-profile-images/Screenshot_2025-05-27_081406_PToxMIF3S.png?updatedAt=1748313902489',
    github: 'https://github.com/Shashwath-K',
    linkedin: 'https://linkedin.com/in/pingu-pastha',
    email: 'mailto:pingupastha@email.com',
  },
  {
    name: 'Safwan S M',
    role: 'Backend Integrator',
    designation: 'Firebase + API',
    image: 'https://ik.imagekit.io/cadncfpqe/user-profile-images/Screenshot_2025-05-27_080824_8_C_EF8oW.png?updatedAt=1748313579901',
    github: 'https://github.com/therealsafwan',
    linkedin: 'https://linkedin.com/in/safwan-s-m',
    email: 'mailto:kunal@email.com',
  },
];

// Animation Variants
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const gridVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const About: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // Simulate load
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading ? (
        <LoadingPopup key="loader" />
      ) : (
        <motion.div
          key="content"
          className="min-h-screen bg-slate-100 font-[Montserrat] text-gray-800 px-6 py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Header & About Text */}
          <motion.div
            className="max-w-5xl mx-auto mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              About SkillSphere
            </h1>
            <div className="text-justify text-lg text-gray-700 space-y-4  p-8 sm:p-10">
              <p>
                SkillSphere-CAT is a next-gen assessment and personalized
                learning platform that simplifies how institutions deliver
                structured content and quizzes.
              </p>
              <p>
                With role-based dashboards for students, instructors, and admins
                — and a real-time Firebase backend — it's engineered for
                scalability, speed, and interactivity across academic
                environments.
              </p>
              <p>
                Built with React, Tailwind CSS, Framer Motion, and Firebase,
                SkillSphere unites adaptive learning, AI-driven quiz
                generation, and deep student tracking into a seamless,
                immersive experience.
              </p>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-20"
            variants={gridVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {featureData.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6"
                variants={cardVariant}
                whileHover={{
                  y: -8,
                  boxShadow:
                    '0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(59 130 246 / 0.4)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <div
                  className={`p-4 rounded-full inline-block mb-4 shadow-lg ${feature.bg}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Developers */}
          <motion.h2
            className="text-3xl font-extrabold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Meet the Developers
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4"
            variants={gridVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {developers.map((dev, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center"
                variants={cardVariant}
                whileHover={{
                  y: -8,
                  boxShadow:
                    '0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(59 130 246 / 0.4)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-28 h-28 rounded-full border-4 border-blue-500 mb-4 object-cover shadow-md"
                />
                <h4 className="text-xl font-bold text-gray-900">
                  {dev.name}
                </h4>
                <p className="text-sm text-gray-500">{dev.designation}</p>
                <p className="text-sm mb-4 font-semibold text-blue-600">
                  {dev.role}
                </p>
                <div className="flex gap-4">
                  <motion.a
                    href={dev.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.2, color: '#333' }}
                    className="text-gray-700"
                  >
                    <Github className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.2, color: '#0A66C2' }}
                    className="text-blue-600"
                  >
                    <Linkedin className="w-6 h-6" />
                  </motion.a>
                  <motion.a
                    href={dev.email}
                    whileHover={{ scale: 1.2, color: '#EA4335' }}
                    className="text-red-500"
                  >
                    <Mail className="w-6 h-6" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default About;