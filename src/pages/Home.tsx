import React, { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ClipboardList,
  BookOpen,
  BrainCircuit,
  CalendarDays, // Note: This is no longer used, but I'll leave it
  Clock, // Note: This is no longer used, but I'll leave it
  Award,
  Star,
  Quote,
  Zap,
  LayoutGrid,
} from "lucide-react";
import { Link } from "react-router-dom";
import certificateImage from "../../assets/certificate/images/certificate_dummy.png";
// import { collection, getDocs } from "firebase/firestore"; // Firebase removed
// import { db, auth } from "../firebase"; // Firebase removed
// import { onAuthStateChanged, User } from "firebase/auth"; // Firebase removed
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";

// --- Re-usable MotionLink ---
const MotionLink = motion(Link);

// --- Page-level Animation Variants ---
const sectionGridVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

// --- New Features Section Content (Already Demo-Ready) ---
const features = [
  {
    icon: LayoutGrid,
    title: "Structured Learning Paths",
    description:
      "Explore courses designed with clear modules and sub-modules for a step-by-step learning experience.",
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  {
    icon: ClipboardList,
    title: "Interactive Quizzes",
    description:
      "Test your knowledge with dynamic quizzes that provide immediate feedback and track your progress.",
    color: "text-purple-500",
    bg: "bg-purple-100",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Tools",
    description:
      "Leverage our AI suite to generate quizzes, summarize content, and get personalized assistance.",
    color: "text-pink-500",
    bg: "bg-pink-100",
  },
];

// --- New Testimonials Section Content (Already Demo-Ready) ---
const testimonials = [
  {
    name: "Alex Johnson",
    role: "Student",
    quote:
      "SkillSphere's AI tools are a game-changer. I can instantly generate practice quizzes for any topic I'm studying.",
    stars: 5,
  },
  {
    name: "Maria Garcia",
    role: "Instructor",
    quote:
      "The course management system is so intuitive. Building and organizing my curriculum has never been easier.",
    stars: 5,
  },
  {
    name: "David Lee",
    role: "Developer",
    quote:
      "A clean, fast, and modern platform. The adaptive learning recommendations are surprisingly accurate.",
    stars: 4,
  },
];

// --- Static Demo Data (Replaces Firebase) ---
const DEMO_COURSES = [
  {
    id: "demo-course-1",
    title: "Demo Course: React Basics",
    category: "Web Development",
  },
  {
    id: "demo-course-2",
    title: "Demo Course: Intro to TypeScript",
    category: "Programming",
  },
  {
    id: "demo-course-3",
    title: "Demo Course: UI/UX Fundamentals",
    category: "Design",
  },
];

const DEMO_QUIZZES = [
  {
    id: "demo-quiz-1",
    quizTitle: "Demo Quiz: HTML & CSS",
    category: "Web Development",
  },
  {
    id: "demo-quiz-2",
    quizTitle: "Demo Quiz: JavaScript Essentials",
    category: "Programming",
  },
  {
    id: "demo-quiz-3",
    quizTitle: "Demo Quiz: Python Fundamentals",
    category: "Data Science",
  },
];

const Home: React.FC = () => {
  // --- State now uses static demo data ---
  const [courses, setCourses] = useState<any[]>(DEMO_COURSES);
  const [quizzes, setQuizzes] = useState<any[]>(DEMO_QUIZZES);
  // const [user, setUser] = useState<User | null>(null); // Auth removed
  // const [dateTime, setDateTime] = useState(new Date()); // Clock removed
  const [activeTab, setActiveTab] = useState<"courses" | "quizzes">("courses");

  // --- Auth Listener Removed ---
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // --- Live Clock Removed ---
  // useEffect(() => {
  //   if (user) {
  //     const timer = setInterval(() => {
  //       setDateTime(new Date());
  //     }, 1000);
  //     return () => clearInterval(timer);
  //   }
  // }, [user]);

  // --- Data Fetching Removed ---
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const cDocs = await getDocs(collection(db, "courses"));
  //       setCourses(cDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  //       const qDocs = await getDocs(collection(db, "quizzes"));
  //       setQuizzes(qDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  //     } catch (error) {
  //       console.error("Error fetching homepage data: ", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // --- Data processing simplified ---
  // const pick = (arr: any[]) => arr.sort(() => 0.5 - Math.random()).slice(0, 3);
  const showCourses = courses; // Already sized to 3
  const showQuizzes = quizzes; // Already sized to 3
  return (
    <div className="min-h-screen w-full font-[Montserrat] bg-slate-100 text-gray-900">
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-6 pt-20 pb-12">
        {/* Background Gradient Mesh */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(at 20% 20%, hsla(212,90%,80%,0.3) 0px, transparent 50%), radial-gradient(at 80% 20%, hsla(280,90%,80%,0.3) 0px, transparent 50%), radial-gradient(at 20% 80%, hsla(180,90%,80%,0.3) 0px, transparent 50%), radial-gradient(at 80% 80%, hsla(340,90%,80%,0.3) 0px, transparent 50%)",
            backgroundColor: "#ffffff",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Zap className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
        >
          Master New Skills with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            SKILLSPHERE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 leading-relaxed mb-10"
        >
          Your personalized platform for learning, skill mastery, and AI-powered
          guidance to thrive in your educational journey.
        </motion.p>

        {/* --- Auth-Aware Content --- */}
        {/* Simplified to only show the "Logged-Out" state for the demo */}
        <div className="h-20 z-10">
          {" "}
          {/* Container to prevent layout shift */}
          <motion.div
            key="guest-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MotionLink
              to="/all-courses" // Kept as-is, assuming this page exists
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-white font-semibold shadow-lg transition-all"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 20px -5px rgb(56 189 248 / 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </MotionLink>
            <MotionLink
              to="/login" // Kept as-is, assuming this page exists
              className="px-8 py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </MotionLink>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-extrabold mb-16 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why SkillSphere?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={sectionGridVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={cardVariant}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-left"
              >
                <div
                  className={`p-3 rounded-full inline-block mb-5 ${feature.bg}`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= EXPLORE (COURSES & QUIZZES) ================= */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            className="text-4xl font-extrabold mb-8 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Explore Our Content
          </motion.h2>

          {/* --- Tab Switcher --- */}
          <motion.div
            className="flex justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "courses"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-200 text-gray-700 hover:bg-slate-300"
              }`}
            >
              Trending Courses
            </button>
            <button
              onClick={() => setActiveTab("quizzes")}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === "quizzes"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-slate-200 text-gray-700 hover:bg-slate-300"
              }`}
            >
              Latest Quizzes
            </button>
          </motion.div>

          {/* --- Tab Content Grid --- */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {activeTab === "courses" && (
                <motion.div
                  key="courses"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {showCourses.map((c) => (
                    <motion.div
                      key={c.id}
                      layout
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
                      className="bg-white rounded-2xl shadow-lg p-6 text-left"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {c.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {c.category}
                      </p>
                      <MotionLink
                        to="#" // Changed to "#" for demo
                        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full text-sm transition-all font-semibold shadow-md"
                        whileHover={{
                          scale: 1.05,
                          boxShadow:
                            "0 10px 20px -5px rgb(59 130 246 / 0.5)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore
                      </MotionLink>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "quizzes" && (
                <motion.div
                  key="quizzes"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {showQuizzes.map((q) => (
                    <motion.div
                      key={q.id}
                      layout
                      whileHover={{
                        y: -8,
                        boxShadow:
                          "0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(168 85 247 / 0.3)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                      className="bg-white rounded-2xl shadow-lg p-6 text-left"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {q.quizTitle}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {q.category}
                      </p>
                      <MotionLink
                        to="#" // Changed to "#" for demo
                        className="px-5 py-2 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-full text-sm transition-all font-semibold shadow-md"
                        whileHover={{
                          scale: 1.05,
                          boxShadow:
                            "0 10px 20px -5px rgb(168 85 247 / 0.5)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Start Quiz
                      </MotionLink>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATION ================= */}
      {/* This section is already demo-ready */}
      <section className="py-24 px-6 bg-slate-100 text-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Award className="h-12 w-12 text-yellow-600 mb-4" />
            <h2 className="text-4xl font-extrabold text-yellow-700 mb-6">
              Earn Certificates that Showcase Your Skills
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Each SkillSphere course completion grants verified certifications
              you can display on LinkedIn and resumes to amplify your career.
            </p>
            <MotionLink
              to="/certifications"
              className="px-8 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full font-semibold transition-all shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Certificates
            </MotionLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="p-3 rounded-2xl shadow-2xl bg-white"
            >
              <img
                src={certificateImage}
                alt="Certificate"
                className="rounded-xl w-full max-w-md"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-extrabold mb-16 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Our Users Say
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={sectionGridVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={cardVariant}
                className="bg-slate-50 p-8 rounded  -2xl shadow-lg border border-gray-100 text-left"
              >
                <Quote className="h-6 w-6 text-gray-400 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">
                      {testimonial.name}
                    </h4>   
                    <p className="text-sm text-gray-500 mb-2">
                      {testimonial.role}
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.stars
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
export default Home;