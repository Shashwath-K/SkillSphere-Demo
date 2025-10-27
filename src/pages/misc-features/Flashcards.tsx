import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoadingPopup from "../../components/LoadingPopup"; // Adjust path as needed
import {
  Plus,
  Search,
  Filter as FilterIcon,
  Trash2,
  Eye,
  Layers, // Icon for empty state
  AlertTriangle, // Icon for modal
  Inbox, // Icon for card
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; // For notifications

// --- Type Definition (Timestamp changed to string) ---
interface FlashCard {
  id: string;
  title: string;
  category: string;
  userId: string; // Still useful for demo structure
  createdAt: string; // Changed from Timestamp
  cardCount: number;
}

// --- START: DEMO DATA ---
const DEMO_FLASHCARDS: FlashCard[] = [
  {
    id: "demo-set-1",
    title: "React Hooks",
    category: "React",
    userId: "demo-user",
    createdAt: new Date(2025, 9, 26).toISOString(),
    cardCount: 10,
  },
  {
    id: "demo-set-2",
    title: "TypeScript Basics",
    category: "TypeScript",
    userId: "demo-user",
    createdAt: new Date(2025, 9, 25).toISOString(),
    cardCount: 15,
  },
  {
    id: "demo-set-3",
    title: "CSS Grid vs. Flexbox",
    category: "CSS",
    userId: "demo-user",
    createdAt: new Date(2025, 9, 24).toISOString(),
    cardCount: 8,
  },
];

const DEMO_CATEGORIES = ["All", "React", "TypeScript", "CSS"];
// --- END: DEMO DATA ---

// --- Animation Variants (Unchanged) ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2 } },
};

const containerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const MotionLink = motion(Link);

const FlashCards: React.FC = () => {
  const [allCards, setAllCards] = useState<FlashCard[]>([]);
  const [loading, setLoading] = useState(true);
  // const [currentUser, setCurrentUser] = useState<User | null>(null); // Firebase removed
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  // const navigate = useNavigate(); // Not currently used, but safe to keep

  // --- Auth listener REMOVED ---
  // useEffect(() => { ... onAuthStateChanged ... }, [navigate]);

  // --- Replaced Firebase fetch with demo data ---
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setAllCards(
        DEMO_FLASHCARDS.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
      setCategories(DEMO_CATEGORIES);
      setLoading(false);
    }, 800); // 0.8s delay

    return () => clearTimeout(timer);
  }, []);

  // 3. Filtering (Memoized - Unchanged)
  const filteredCards = useMemo(() => {
    return allCards.filter((card) => {
      const searchMatch = card.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const categoryMatch =
        selectedCategory === "All" || card.category === selectedCategory;
      return searchMatch && categoryMatch;
    });
  }, [allCards, searchQuery, selectedCategory]);

  // 4. Deletion Logic (Firebase removed)
  const handleDelete = async (id: string) => {
    if (!id) return;
    const toastId = toast.loading("Deleting set...");

    // Simulate network delay
    setTimeout(() => {
      try {
        setAllCards((prev) => prev.filter((card) => card.id !== id));
        toast.success("Flashcard set deleted.", { id: toastId });
      } catch (err) {
        console.error("Demo delete error:", err);
        toast.error("Failed to delete set.", { id: toastId });
      } finally {
        setShowDeleteConfirm(null); // Close modal
      }
    }, 800);
  };
  const openDeleteConfirm = (id: string) => setShowDeleteConfirm(id);
  const closeDeleteConfirm = () => setShowDeleteConfirm(null);

  // 5. Render
  return (
    <>
      {/* <Toaster position="top-center" /> */}
      <AnimatePresence> {loading && <LoadingPopup />} </AnimatePresence>

      <motion.div
        className="min-h-screen w-full font-[Montserrat] bg-slate-100 p-6 sm:p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h1
            className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            My Flashcards
          </motion.h1>

          {/* --- Filter Card --- */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div className="relative w-full md:w-auto md:min-w-[200px]">
              <FilterIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none"
              >
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <MotionLink
              to="#" // Changed for demo
              className="w-full md:w-auto flex-shrink-0 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={18} /> Create New Set
            </MotionLink>
          </motion.div>

          {/* --- Content Area --- */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!loading && filteredCards.length === 0 ? (
                <motion.div
                  key="no-cards"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg text-center p-6"
                >
                  <Layers className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700">
                    No Flashcard Sets Found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery || selectedCategory !== "All"
                      ? "Try adjusting your filters."
                      : "Get started by creating a new set."}
                  </p>
                  {!(searchQuery || selectedCategory !== "All") && (
                    <MotionLink
                      to="#" // Changed for demo
                      className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus size={18} /> Create First Set
                    </MotionLink>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="cards-grid"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" // 3-column grid
                  variants={containerVariant}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                >
                  <AnimatePresence>
                    {filteredCards.map((card) => (
                      <motion.div
                        key={card.id}
                        layout
                        variants={cardVariant}
                        exit="exit"
                        className="bg-white rounded-2xl shadow-lg flex flex-col h-full group"
                        whileHover={{
                          y: -8,
                          boxShadow:
                            "0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(59 130 246 / 0.3)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        }}
                      >
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start mb-3">
                            <Inbox className="w-10 h-10 text-blue-500 bg-blue-100 p-2 rounded-lg" />
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
                              {card.category}
                            </span>
                          </div>
                          <h3
                            className="text-xl font-bold text-gray-800 mb-2 truncate"
                            title={card.title}
                          >
                            {card.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            {card.cardCount} Cards
                          </p>
                        </div>
                        <div className="flex gap-3 mt-auto p-4 border-t border-gray-100">
                          <Link
                            to="#" // Changed for demo
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:shadow-cyan-500/40 flex items-center justify-center gap-1.5"
                          >
                            <Eye size={16} /> View
                          </Link>
                          <button
                            onClick={() => openDeleteConfirm(card.id)}
                            className="flex-1 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* --- Delete Confirmation Modal --- */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center font-[Montserrat]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Are you sure you want to delete this flashcard set? This action
                cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={closeDeleteConfirm}
                  className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm as string)} // Cast as string since it won't be null here
                  className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FlashCards;