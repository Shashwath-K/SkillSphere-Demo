import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  Settings,
  Hexagon,
  Home,
  Book,
  Layers,
  BarChart2,
  LogIn,
  BrainCircuit,
  LayoutDashboard,
  Dumbbell,
} from "lucide-react";
// import { onAuthStateChanged, signOut, User } from "firebase/auth"; // Firebase removed
// import { auth } from "../firebase"; // Firebase removed
// import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firebase removed
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";

// const db = getFirestore(); // Firebase removed

// --- START: DEMO DATA & STATE ---
// Mock user object. The component only needs a photoURL.
const DEMO_USER = {
  photoURL: "https://avatar.vercel.sh/demo-admin.svg",
};
// --- END: DEMO DATA & STATE ---

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // --- State is now hardcoded for a demo "super-admin" ---
  const [user, setUser] = useState<{ photoURL: string | null } | null>(
    DEMO_USER
  );
  const [firstName, setFirstName] = useState("Demo Admin");
  const [userRole, setUserRole] = useState<string | null>("super-admin");
  // ---

  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- Auth state listener REMOVED ---
  // useEffect(() => { ... onAuthStateChanged ... }, []);

  // --- Click outside to close dropdown (No changes) ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // --- Links (paths changed to "#" for demo) ---
  const baseLinks = [
    { label: "Home", path: "/", icon: Home },
    { label: "About", path: "/about", icon: Hexagon },
    { label: "Courses", path: "/all-courses", icon: Book },
    { label: "Quizzes", path: "/view-quizzes", icon: Layers },
    { label: "Practice", path: "/misc-features", icon: Dumbbell },
    { label: "AI", path: "/aifeatures", icon: BrainCircuit },
  ];

  // Build final links array dynamically (No changes, works with demo state)
  const links = [...baseLinks];
  if (userRole && userRole !== "Student" && userRole !== "student") {
    links.push({
      label: "Admin",
      path: "/admin_dashboard", // Changed to "#" for demo
      icon: LayoutDashboard,
    });
  }
  // ------------------------------------

  const isActive = (path: string) => location.pathname === path;

  const navigateTo = (p: string) => {
    setSidebar(false);
    navigate(p);
  };

  // --- Replaced Firebase logout with demo logout ---
  const logout = () => {
    // Simulate logout by clearing demo state
    console.log("DEMO: Logging out...");
    setUser(null);
    setFirstName("");
    setUserRole(null);
    setDropdown(false);
    // No navigation needed, component will re-render to show "Login" button
  };

  return (
    <>
      {/* TOPBAR */}
      <motion.nav
        className="fixed top-0 left-0 w-full h-[62px] bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm z-50 flex justify-between items-center px-4 sm:px-10 py-3 font-[Montserrat]"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Logo + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-gray-800 hover:scale-110 transition"
            onClick={() => setSidebar(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/">
            <img
              src="/assets/logo/comp_logo.png"
              alt="SkillSphere"
              className="h-8 sm:h-9 select-none"
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <LayoutGroup>
          <div className="hidden md:flex flex-grow justify-center items-center gap-6 text-sm font-medium">
            {links.map(({ path, label }) => (
              <motion.div key={label} className="relative py-2">
                <Link
                  to={path}
                  className={`px-1 transition-colors duration-200 ${
                    isActive(path)
                      ? "font-semibold text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {label}
                </Link>
                {isActive(path) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 bottom-0 w-full h-[2px] rounded-full bg-blue-600"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </LayoutGroup>

        {/* Right Auth/Profile Section */}
        <div className="flex items-center justify-end min-w-[150px] sm:min-w-[200px]">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setDropdown(!dropdown)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 shadow-sm transition-colors"
                aria-expanded={dropdown}
                aria-haspopup="true"
              >
                <img
                  src={user.photoURL || "https://avatar.vercel.sh/avatar.svg"}
                  className="w-7 h-7 object-cover rounded-full border border-blue-500/60"
                  alt="User Avatar"
                />
                <span className="font-semibold text-xs sm:text-sm hidden sm:block truncate max-w-[100px]">
                  {firstName || "User"}
                </span>
              </motion.button>
              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl font-medium z-50"
                  >
                    <Link
                      to="#" // Changed for demo
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-100 transition-all text-sm"
                    >
                      <BarChart2 className="w-4 h-4" /> My Progress
                    </Link>
                    <Link
                      to="#" // Changed for demo
                      onClick={() => setDropdown(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-100 transition-all text-sm"
                    >
                      <Settings className="w-4 h-4" /> Edit Profile
                    </Link>
                    <button
                      onClick={logout} // Calls demo logout function
                      className="flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 w-full text-sm transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login" // Changed for demo
              className="px-5 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-full font-semibold shadow hover:shadow-md hover:shadow-cyan-500/40 transition-all text-sm flex items-center gap-1"
            >
              <LogIn className="w-4 h-4" /> Login
            </Link>
          )}
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-[62px]" />

      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebar && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[51]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebar(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 shadow-2xl z-[52] flex flex-col justify-between"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <img
                  src="/assets/logo/comp_logo.png"
                  alt="SkillSphere"
                  className="h-9"
                />
                <button
                  className="text-gray-500 hover:text-gray-900 transition"
                  onClick={() => setSidebar(false)}
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {/* Use links array directly here */}
              <motion.nav className="flex-1 flex flex-col gap-1.5 px-4 py-6 text-gray-700 font-medium">
                {links.map(({ label, path, icon: Icon }, i) => (
                  <motion.button
                    key={label}
                    onClick={() => navigateTo(path)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-left w-full text-sm transition-all ${
                      isActive(path)
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </motion.button>
                ))}
              </motion.nav>
              <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-200">
                &copy; {new Date().getFullYear()} SkillSphere
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;