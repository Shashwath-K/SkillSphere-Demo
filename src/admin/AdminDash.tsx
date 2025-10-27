import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use Link for internal routes
// import { getAuth, onAuthStateChanged, User } from "firebase/auth"; // Firebase removed
// import { doc, getDoc } from "firebase/firestore"; // Firebase removed
// import { db } from "../firebase"; // Firebase removed
import LoadingPopup from "../components/LoadingPopup";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Edit,
  Users,
  // ShieldCheck, // No longer used
  Landmark,
  BadgeCheck,
  ClipboardList,
  Bot,
  // LogIn, // No longer used
  FileText,
  // AlertTriangle, // No longer used
} from "lucide-react";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const MotionLink = motion(Link); // Create a motion component for Link

const AdminDash = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate(); // Removed
  // const auth = getAuth(); // Removed

  // --- Replaced Firebase Auth with Demo Logic ---
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Set to "super-admin" to show all controls for the demo
      setUserRole("super-admin");
      setLoading(false);
    }, 800); // Simulate a 0.8s load

    return () => clearTimeout(timer);
  }, []); // Empty dependency array, runs once on mount

  // --- Updated Controls with demo links ---
  const adminControls = [
    {
      title: "Create Course",
      icon: BookOpen,
      link: "/create-course", // Changed for demo
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Edit Course",
      icon: Edit,
      link: "/edit-course", // Changed for demo
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Create Quiz",
      icon: ClipboardList,
      link: "/create-quiz", // Changed for demo
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Edit Quiz",
      icon: Edit,
      link: "/edit-quiz", // Changed for demo
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Generate Certificate",
      icon: BadgeCheck,
      link: "/admin/generate-certificate", // Changed for demo
      color: "bg-teal-100 text-teal-600",
    },
    {
      title: "AI Course Creator",
      icon: Bot,
      link: "/admin/ai-course-creator", // Changed for demo
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "AI Quiz Creator",
      icon: Bot,
      link: "/admin/ai-quiz-creator", // Changed for demo
      color: "bg-pink-100 text-pink-600",
    },
    {
      title: "AI PDF Creator",
      icon: FileText,
      link: "/admin/ai-pdf-creator", // Changed for demo
      color: "bg-red-100 text-red-600",
    },
  ];

  const superAdminControls = [
    {
      title: "User Management",
      icon: Users,
      link: "/admin/user-management", // Changed for demo
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Institution Details",
      icon: Landmark,
      link: "/admin/institution-details", // Changed for demo
      color: "bg-cyan-100 text-cyan-600",
    },
  ];
  // --- End of Controls ---

  if (loading) {
    return <LoadingPopup />;
  }

  // Render null if userRole isn't set (handles the brief moment before state is set)
  if (!userRole) {
    return null;
  }

  return (
    <motion.div
      className="min-h-screen w-full font-[Montserrat] bg-slate-100 p-6 sm:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* --- Admin Controls --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {adminControls.map((control) => (
            <MotionLink
              key={control.title}
              to={control.link}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center group hover:shadow-blue-300/30 transition-shadow duration-300"
              whileHover={{
                y: -8,
                boxShadow:
                  "0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(59 130 246 / 0.3)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div
                className={`p-4 rounded-full ${control.color} mb-5 transition-transform duration-300 group-hover:scale-110`}
              >
                <control.icon size={36} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {control.title}
              </h2>
            </MotionLink>
          ))}
        </motion.div>

        {/* --- Super-Admin Section --- */}
        {userRole === "super-admin" && (
          <>
            <motion.h2
              className="text-3xl font-extrabold text-center mt-16 mb-10 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Super-Admin Tools
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible" // Animate when scrolled into view
              viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% visible
            >
              {superAdminControls.map((control) => (
                <MotionLink
                  key={control.title}
                  to={control.link}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center group hover:shadow-indigo-300/30 transition-shadow duration-300"
                  whileHover={{
                    y: -8,
                    boxShadow:
                      "0 25px 50px -12px rgb(0 0 0 / 0.1), 0 10px 20px -10px rgb(99 102 241 / 0.3)", // Indigo shadow
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div
                    className={`p-4 rounded-full ${control.color} mb-5 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <control.icon size={36} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {control.title}
                  </h2>
                </MotionLink>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AdminDash;