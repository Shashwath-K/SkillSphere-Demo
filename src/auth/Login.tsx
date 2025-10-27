import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase removed
// import { auth } from "../firebase"; // Firebase removed
import logo from "../../assets/logo/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (loading) return;

    setLoading(true);
    setError("");

    // --- START: DEMO LOGIN LOGIC ---
    // Simulate a 1.5 second network delay
    console.log("Attempting demo login with:", { email, password });

    setTimeout(() => {
      if (email === "demo@example.com" && password === "demo123") {
        console.log("Demo login successful!");
        navigate("/"); // redirect after "login"
      } else {
        console.log("Demo login failed.");
        setError(
          "Invalid credentials. Use 'demo@example.com' and 'demo123' for the demo."
        );
      }
      setLoading(false);
    }, 1500);
    // --- END: DEMO LOGIN LOGIC ---
  };

  return (
    <div className="min-h-screen w-full font-[Montserrat] bg-slate-100 flex items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-8 sm:p-10"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }} // A nice springy ease
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src={logo}
            alt="SkillSphere Logo"
            className="mx-auto h-16 w-auto mb-6"
          />
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
            Sign In to SkillSphere
          </h2>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="Email (e.g., demo@example.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              className="w-full p-4 pl-12 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              placeholder="Password (e.g., demo123)"
              value={password}
              onChange={(e) => setPassword(e.g.target.value)}
              required
            />
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.p
                className="text-red-600 text-sm text-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Login Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.button
              type="submit"
              className="w-full p-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold transition-all shadow-lg hover:shadow-cyan-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              disabled={loading}
            >
              {loading ? (
                <motion.div
                  className="flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                >
                  <Loader2 className="w-6 h-6" />
                </motion.div>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </motion.div>
        </form>

        {/* Toggle to Register */}
        <motion.p
          className="text-center text-sm text-gray-600 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-500 transition-colors"
          >
            Register
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;