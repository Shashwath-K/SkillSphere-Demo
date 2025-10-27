import React, { useEffect, useState } from "react";
// import { db, auth } from "../firebase"; // Firebase removed
// import { collection, getDocs, doc, getDoc } from "firebase/firestore"; // Firebase removed
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Clock,
  Globe,
  BarChart,
  ImageIcon,
  Bot,
  // Lock, // No longer used
  Search,
  Filter,
  X,
  SearchX,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// Progress utils no longer needed as progress is hardcoded
// import {
//   calculateTotalSubmodules,
//   getCompletedCount,
//   calculateProgressPercentage,
// } from "../admin/courseattempt/components/utils/progressUtils";
// import { onAuthStateChanged } from "firebase/auth"; // Firebase removed

// --- IMPORT YOUR REUSABLE LOADING POPUP ---
// Adjust this path based on your file structure
import LoadingPopup from "../components/LoadingPopup";

interface CourseWithId {
  id: string;
  title: string;
  category?: string;
  courseImage?: string;
  instructor?: string;
  duration?: string;
  language?: string;
  level?: string;
  createdByAI?: boolean;
  progress?: number;
}

// --- START: DEMO DATA ---
const DEMO_COURSES: CourseWithId[] = [
  {
    id: "demo-1",
    title: "Demo: React + TypeScript Masterclass",
    category: "Web Development",
    courseImage: "https://via.placeholder.com/600x400/3b82f6/ffffff?text=React",
    instructor: "Demo Instructor",
    duration: "10h 30m",
    language: "English",
    level: "Intermediate",
    createdByAI: false,
    progress: 50,
  },
  {
    id: "demo-2",
    title: "AI-Generated: Python for Data Science",
    category: "AI/ML",
    courseImage: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=AI",
    instructor: "AI Bot",
    duration: "8h 15m",
    language: "English",
    level: "Beginner",
    createdByAI: true,
    progress: 0,
  },
  {
    id: "demo-3",
    title: "Figma UI/UX Design Principles",
    category: "Design",
    courseImage: "https://via.placeholder.com/600x400/ec4899/ffffff?text=Design",
    instructor: "Jane Doe",
    duration: "5h 00m",
    language: "Spanish",
    level: "All Levels",
    createdByAI: false,
    progress: 100,
  },
  {
    id: "demo-4",
    title: "Course with No Image (Fallback Test)",
    category: "Web Development",
    courseImage: undefined, // This will trigger the fallback icon
    instructor: "John Smith",
    duration: "2h 45m",
    language: "English",
    level: "Beginner",
    createdByAI: false,
    progress: 25,
  },
];

const DEMO_CATEGORIES: string[] = ["Web Development", "AI/ML", "Design"];
// --- END: DEMO DATA ---

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

const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<CourseWithId[]>([]);
  const [loading, setLoading] = useState(true);
  // const [userId, setUserId] = useState<string | null>(null); // Auth removed
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCreatedByAI, setShowCreatedByAI] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  // Monitor auth state - REMOVED

  // Fetch Courses and Progress if logged in - REMOVED

  // Fetch categories once - REMOVED

  // --- New Effect for Demo Data ---
  useEffect(() => {
    setLoading(true);
    // Simulate a network delay
    const timer = setTimeout(() => {
      setCourses(DEMO_COURSES);
      setCategories(DEMO_CATEGORIES);
      setLoading(false);
    }, 800); // 0.8 second delay

    return () => clearTimeout(timer); // Cleanup
  }, []);

  // Filter courses locally (This logic remains unchanged, it works on state)
  const filtered = courses.filter((c) => {
    if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()))
      return false;
    if (selectedCategory && c.category !== selectedCategory) return false;
    if (showCreatedByAI && !c.createdByAI) return false;
    return true;
  });

  const isFilterActive = searchQuery || selectedCategory || showCreatedByAI;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setShowCreatedByAI(false);
  };

  // --- Logged Out State - REMOVED ---

  // --- Logged In State (Now Default View) ---
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-8 font-[Montserrat]">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        All Courses
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
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 pl-12 rounded-full border border-gray-300 min-w-[240px] bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </motion.div>
        <motion.div className="relative" variants={filterItemVariant}>
          <Filter className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 pl-12 rounded-full border border-gray-300 min-w-[240px] bg-white shadow-sm appearance-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </motion.div>
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
          {showCreatedByAI ? "Showing AI Courses" : "Show AI Courses Only"}
        </motion.button>
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

      {/* --- Courses Grid / No Results --- */}
      <div className="relative">
        <AnimatePresence>
          {!loading && filtered.length === 0 && (
            <motion.div
              className="flex flex-col items-center justify-center text-center text-lg text-gray-500 mt-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SearchX className="w-20 h-20 text-gray-400 mb-4" />
              <p className="text-2xl font-semibold">No Courses Found</p>
              <p>Try adjusting your search or filter settings.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout // <-- This animates the grid container itself
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          <AnimatePresence>
            {!loading &&
              filtered.map((course) => (
                <motion.div
                  layout="position" // <-- THIS IS KEY for smooth re-sorting/filtering
                  key={course.id}
                  variants={cardVariant}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full cursor-pointer group"
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(59 130 246 / 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  onClick={() => navigate("#")} // Changed to "#" for demo
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && navigate("#")} // Changed to "#" for demo
                >
                  <div className="relative h-52 w-full bg-gray-200 overflow-hidden">
                    {course.courseImage ? (
                      <img
                        src={course.courseImage}
                        alt={course.title}
                        className="object-cover w-full h-full rounded-t-2xl transition-transform duration-500 ease-in-out group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/fallback-thumbnail.jpg"; // Assumes this exists in /public
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <ImageIcon className="w-16 h-16" />
                      </div>
                    )}
                    {course.createdByAI && (
                      <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                        <Bot className="w-4 h-4" /> Created by AI
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-600 text-sm mb-4">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4 text-blue-500" />
                        {course.instructor ?? "Unknown"}
                      </div>
                      {course.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-green-500" />
                          {course.duration}
                        </div>
                      )}
                      {course.language && (
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-purple-500" />
                          {course.language}
                        </div>
                      )}
                      {course.level && (
                        <div className="flex items-center gap-1.5">
                          <BarChart className="w-4 h-4 text-red-500" />
                          {course.level}
                        </div>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-5">
                      <div className="flex justify-between text-sm mb-1 text-gray-700">
                        <span>Progress</span>
                        <span className="font-semibold">
                          {course.progress ?? 0}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress ?? 0}%` }}
                          transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                            delay: 0.5,
                          }}
                        />
                      </div>
                    </div>

                    <motion.button
                      className="mt-auto w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold shadow-md transition-all duration-300"
                      whileHover={{
                        scale: 1.05,
                        y: -2,
                        boxShadow:
                          "0 10px 20px -5px rgb(59 130 246 / 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        navigate("#"); // Changed to "#" for demo
                      }}
                    >
                      {(course.progress ?? 0) > 0
                        ? "Continue Course"
                        : "View Course"}
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

export default AllCourses;