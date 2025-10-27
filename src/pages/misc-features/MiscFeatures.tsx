import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import motion
import {
    Code,          // Replaces FaCode
    Mic,           // Replaces FaMicrophone
    DatabaseZap,   // Replaces FaDatabase (suggesting DSA/AI interaction)
    // FaCalculator doesn't seem used, skipping
    NotebookText,  // Replaces FaClipboardList (suggesting flashcards/notes)
    TerminalSquare // Replaces FaTerminal
} from "lucide-react"; // Import Lucide icons

// Define features with Lucide icons and colors
const features = [
    {
        title: "Code Arena",
        icon: Code,
        link: "/misc/code-arena", // Assuming this is the 'Practice' coding environment
        color: "bg-blue-100 text-blue-600",
        description: "Sharpen your coding skills in an interactive environment." // Added description
    },
    {
        title: "Communicate (Voice)", // Clarified title
        icon: Mic,
        link: "/misc/communicate",
        color: "bg-green-100 text-green-600",
        description: "Practice explaining code or concepts using voice input."
    },
    {
        title: "DSA Solver", // Clarified title
        icon: DatabaseZap,
        link: "/misc/dsa-solver",
        color: "bg-purple-100 text-purple-600",
        description: "Get help understanding and solving data structures problems."
    },
    {
        title: "Flashcards",
        icon: NotebookText,
        link: "/misc/flashcards",
        color: "bg-yellow-100 text-yellow-600",
        description: "Create and review flashcards for quick memorization."
    },
    {
        title: "Code Challenge", // Clarified title
        icon: TerminalSquare,
        link: "/misc/challenge-code",
        color: "bg-red-100 text-red-600",
        description: "Test your abilities with timed coding challenges."
    },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const MotionLink = motion(Link); // Create motion component for Link

const MiscFeatures: React.FC = () => {
    return (
        <motion.div
            className="min-h-screen w-full font-[Montserrat] bg-slate-100 p-6 sm:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text mb-4">
                        Practice & Tools
                    </h1>
                    <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Explore a collection of utilities and practice tools designed to enhance your learning and development workflow.
                    </p>
                </motion.div>

                {/* Feature Cards Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {features.map((feature) => (
                        <MotionLink
                            key={feature.title}
                            to={feature.link}
                            variants={itemVariants}
                            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center group hover:shadow-lg transition-shadow duration-300" // Adjusted padding/group usage
                            whileHover={{
                                y: -8,
                                boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(99 102 241 / 0.2)", // Subtle shadow lift
                            }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                            <div className={`p-4 rounded-full ${feature.color} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                                {/* Render Lucide icon component */}
                                <feature.icon size={32} strokeWidth={2} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h2>
                            <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p> {/* Added description display */}
                        </MotionLink>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default MiscFeatures;