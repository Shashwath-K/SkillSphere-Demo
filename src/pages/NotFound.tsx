import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Mail, Twitter, Home } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen w-full font-[Montserrat] bg-slate-100 flex items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto p-8 sm:p-10 text-center"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      >
        <AlertTriangle className="w-20 h-20 text-yellow-500 mx-auto mb-6" />

        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Demo Version
        </h1>

        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          This feature or page is not included in the public demo.
          <br />
          Please contact the developer for access to the full version.
        </p>

        {/* --- Contact Buttons --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-lg">
          <span className="text-gray-500">Reach out via</span>
          <div className="flex items-center gap-3">
            <a
              href="mailto:shashwathkukkunoor@outlook.com"
              className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
            <span className="text-gray-400">or</span>
            <a
              href="https://twitter.com/@Shashwath_k15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full font-semibold bg-sky-100 text-sky-700 hover:bg-sky-200 transition-all"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </a>
          </div>
        </div>

        {/* --- Go Home Button --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold shadow-lg hover:shadow-cyan-500/40 transition-all"
          >
            <Home className="w-5 h-5" />
            Go to Homepage
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;