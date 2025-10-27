import React, { useEffect, useState } from "react";
// import { collection, getDocs } from 'firebase/firestore'; // Firebase removed
import { useNavigate } from "react-router-dom";
// import { db } from '../../firebase'; // Firebase removed
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  User,
  Bot,
  Search,
  Filter,
  X,
  SearchX,
  PlayCircle,
} from "lucide-react";

// --- IMPORT YOUR REUSABLE LOADING POPUP ---
// Adjust this path based on your file structure
import LoadingPopup from "../../components/LoadingPopup";

const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

type CreatorDetails = {
  first: string;
  last: string;
  position: string;
};

type Quiz = {
  id: string;
  quizTitle: string;
  description: string;
  imageUrl?: string;
  category: string;
  createdBy: CreatorDetails;
  createdByAI?: boolean;
};

// --- START: DEMO DATA ---
const DEMO_QUIZZES: Quiz[] = [
  {
    id: "quiz-1",
    quizTitle: "Demo Quiz: React Hooks",
    description: "Test your knowledge of React Hooks.",
    imageUrl: "https://via.placeholder.com/600x400/3b82f6/ffffff?text=React",
    category: "React",
    createdBy: { first: "Demo", last: "User", position: "Instructor" },
    createdByAI: false,
  },
  {
    id: "quiz-2",
    quizTitle: "AI Quiz: Python Fundamentals",
    description: "An AI-generated quiz on Python basics.",
    imageUrl: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=AI+Python",
    category: "Python",
    createdBy: { first: "AI", last: "Bot", position: "Assistant" },
    createdByAI: true,
  },
  {
    id: "quiz-3",
    quizTitle: "Demo Quiz: CSS Flexbox",
    description: "Challenge your CSS Flexbox skills.",
    imageUrl: "https://via.placeholder.com/600x400/ec4899/ffffff?text=CSS",
    category: "CSS",
    createdBy: { first: "Jane", last: "Doe", position: "Designer" },
    createdByAI: false,
  },
  {
    id: "quiz-4",
    quizTitle: "AI Quiz: TypeScript Types",
    description: "An AI-generated quiz on advanced types.",
    category: "TypeScript",
    createdBy: { first: "AI", last: "Bot", position: "Assistant" },
    createdByAI: true,
  }, // This one will use the placeholder image
];
// --- END: DEMO DATA ---

// --- Animation Variants ---

// Variant for staggering filter elements
const filterItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// Variant for staggering card elements
const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

const ViewQuizzes: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showCreatedByAI, setShowCreatedByAI] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // --- Replaced Firebase fetch with demo data + simulated delay ---
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setQuizzes(DEMO_QUIZZES);
      setFilteredQuizzes(DEMO_QUIZZES);
      setLoading(false);
    }, 800); // 0.8 second delay

    return () => clearTimeout(timer); // Cleanup
  }, []);

  // --- This filter logic remains the same, it works on the state ---
  useEffect(() => {
    let result = quizzes;

    if (searchTerm.trim()) {
      result = result.filter((q) =>
        q.quizTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter((q) => q.category === categoryFilter);
    }

    if (showCreatedByAI) {
      result = result.filter((q) => q.createdByAI);
    }

    setFilteredQuizzes(result);
  }, [searchTerm, categoryFilter, showCreatedByAI, quizzes]);

  const uniqueCategories = Array.from(new Set(quizzes.map((q) => q.category)));
  const isFilterActive = searchTerm || categoryFilter || showCreatedByAI;

  const handleStartQuiz = () => {
    // Navigate to "#" for demo purposes
    navigate("#");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setShowCreatedByAI(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8 font-[Montserrat]">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Available Quizzes
      </motion.h1>

      {/* --- Filters --- */}
      <motion.div
        layout
        className="flex flex-wrap gap-4 justify-center mb-12 items-center"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <motion.div className="relative" variants={filterItemVariant}>
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title..."
            className="p-3 pl-12 rounded-full border border-gray-300 min-w-[240px] bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        <motion.div className="relative" variants={filterItemVariant}>
          <Filter className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <select
            className="p-3 pl-12 rounded-full border border-gray-300 min-w-[240px] bg-white shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </motion.div>

        {/* --- AI FILTER BUTTON --- */}
        <motion.button
          onClick={() => setShowCreatedByAI(!showCreatedByAI)}
          className={`p-3 px-5 rounded-full font-medium min-w-[220px] shadow-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            showCreatedByAI
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white ring-2 ring-blue-300"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
          variants={filterItemVariant}
        >
          <Bot
            className={`w-5 h-5 ${
              showCreatedByAI ? "text-white" : "text-purple-600"
            }`}
          />
          {showCreatedByAI ? "Showing AI Quizzes" : "Show AI Quizzes Only"}
        </motion.button>
        {/* --- */}

        <AnimatePresence>
          {isFilterActive && (
            <motion.button
              onClick={clearFilters}
              className="p-3 px-5 rounded-full font-medium text-red-600 bg-red-100 hover:bg-red-200 transition-all flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <X className="w-5 h-5" />
              Clear Filters
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* --- Quizzes Grid / No Results --- */}
      <div className="relative max-w-7xl mx-auto">
        <AnimatePresence>
          {!loading && filteredQuizzes.length === 0 && (
            <motion.div
              className="flex flex-col items-center justify-center text-center text-lg text-gray-500 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SearchX className="w-20 h-20 text-gray-400 mb-4" />
              <p className="text-2xl font-semibold">No Quizzes Found</p>
              <p>Try adjusting your search or filter settings.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout // Animates the grid container itself
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          <AnimatePresence>
            {!loading &&
              filteredQuizzes.map((quiz) => (
                <motion.div
                  layout="position" // KEY for smooth re-sorting/filtering
                  key={quiz.id}
                  variants={cardVariant}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full cursor-pointer group"
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(59 130 246 / 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onClick={handleStartQuiz} // Updated to demo handler
                >
                  <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
                    {quiz.createdByAI && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md z-10">
                        <Bot className="w-4 h-4" /> Created by AI
                      </span>
                    )}
                    <img
                      src={quiz.imageUrl || placeholderImage}
                      alt={quiz.quizTitle}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {quiz.quizTitle}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-purple-500" />
                      {quiz.category}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-blue-500" />
                      {quiz.createdBy.first} {quiz.createdBy.last} —{" "}
                      {quiz.createdBy.position}
                    </p>
                  </div>
                  <div className="p-5 pt-0 mt-auto">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click from firing twice
                        handleStartQuiz(); // Updated to demo handler
                      }}
                      className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        boxShadow:
                          "0 10px 20px -5px rgb(59 130 246 / 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlayCircle className="w-5 h-5" />
                      Start Quiz
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- Loading Popup Overlay --- */}
      <AnimatePresence>{loading && <LoadingPopup />}</AnimatePresence>
    </main>
  );
};

export default ViewQuizzes;