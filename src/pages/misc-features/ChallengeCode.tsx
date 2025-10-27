import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { LANGUAGE_VERSIONS } from "./constants"; // Assuming constants exist
import { challenges, Challenge } from './challenge'; // Assuming types/data exist
import { fetchHints } from "./hints"; // Assuming this function exists
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast'; // Import toast
import {
    Languages,
    Play,
    Loader2,
    Zap, // For Challenge Me
    Terminal,
    AlertTriangle,
    Lightbulb,
    BarChart3, // For Difficulty
} from 'lucide-react';
// Removed CSS import, assuming styles are now handled by Tailwind
// --- ADD THIS INTERFACE ---
// (Adjust properties if your API returns something different)
interface ExecutionResult {
    stdout?: string;
    stderr?: string;
    output?: string; // Add this if your API might return 'output'
}
// -------------------------
// --- CODE SNIPPETS (Unchanged) ---
export const CODE_SNIPPETS: { [key: string]: string } = {
    javascript: `
function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("Alex");
`,
    python: `
def greet(name):
  print("Hello, " + name + "!")
greet("Alex")
`,
    cpp: `
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World from C++!" << endl;
  return 0;
}
`,
    java: `
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello World in Java!");
  }
}
`,
   // Add other snippets corresponding to LANGUAGE_VERSIONS
   csharp: `
using System;

public class Program {
  public static void Main() {
    Console.WriteLine("Hello World in C#!");
  }
}
`,
   php: `
<?php
$name = 'Alex';
echo "Hello, " . $name . "!";
?>
`,
   c: `
#include <stdio.h>

int main() {
  printf("Hello, World from C!\\n");
  return 0;
}
`,
   mysql: `
-- Basic SQL query
SELECT "Hello, World from MySQL!" AS greeting;
`,
};
// ---------------------------------

const TWO_MINUTES = 2 * 60 * 1000;
// Assuming LANGUAGE_VERSIONS keys match CODE_SNIPPETS keys
const languageOptions = Object.keys(LANGUAGE_VERSIONS);

function getRandomChallenge(lang: string): Challenge | null {
    const filtered = challenges.filter(ch => ch.language.includes(lang));
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
}

// Animation variant
const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    }),
};

const ChallengeCode = () => {
    const [code, setCode] = useState(CODE_SNIPPETS.javascript);
    const [language, setLanguage] = useState("javascript");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [showError, setShowError] = useState<string | null>(null);
    const editorRef = useRef<any>(null);

    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [hints, setHints] = useState<string[]>([]);
    const [lastFetchTime, setLastFetchTime] = useState<number>(0);
    const [canFetch, setCanFetch] = useState(true);
    const [isFetchingChallenge, setIsFetchingChallenge] = useState(false); // Loading state for challenge button

    const runCode = async () => {
        if (!editorRef.current || isRunning) return;

        setIsRunning(true);
        setOutput(""); // Clear previous output
        setShowError(null); // Clear previous error
        const sourceCode = editorRef.current.getValue();
        // Inside the runCode function:
        try {
            const langKey = language as keyof typeof LANGUAGE_VERSIONS;

            // --- FIX 1: Explicitly type the result ---
            const result = await executeCode(langKey, sourceCode) as ExecutionResult | string;

            // --- FIX 2: Refine the logic to safely check the object properties ---
            if (typeof result === 'object' && result !== null) {
                // Check for standard error first
                if (result.stderr) {
                    setOutput(result.stderr);
                    setShowError("Code executed with errors.");
                } else {
                    // Check for standard output, then 'output', then fallback
                    const executionOutput = result.stdout || result.output || "Execution finished, no output.";
                    setOutput(executionOutput);
                }
            } else {
                // Handle plain string results
                setOutput(result || "Execution finished, no output.");
            }
            // -----------------------------------------------------------------

        } catch (err: any) {
            console.error("Code execution API error:", err);
            const message = err?.message || "An unknown error occurred.";
            setOutput(`Error: ${message}`);
            setShowError(message);
        } finally {
            setIsRunning(false);
        }
    };

    const fetchNewChallenge = async () => {
        const now = Date.now();
        if (now - lastFetchTime < TWO_MINUTES && lastFetchTime !== 0) { // Allow first fetch
            const timeLeft = Math.ceil((TWO_MINUTES - (now - lastFetchTime)) / 1000);
            // --- Replaced alert with toast ---
            toast.error(`Please wait ${timeLeft} seconds before fetching again.`);
            return;
        }

        setIsFetchingChallenge(true); // Set loading for challenge button
        setShowError(null);
        setOutput('');
        try {
            const newChallenge = getRandomChallenge(language);
            if (!newChallenge) {
                toast.error("No challenge available for the selected language.");
                setChallenge(null); // Clear old challenge
                setHints([]);
                return;
            }
            
            setChallenge(newChallenge);
            // Auto-select the first compatible language for the challenge
            const lang = Array.isArray(newChallenge.language) ? newChallenge.language[0] : newChallenge.language;
             if (languageOptions.includes(lang)) { // Check if language is supported
                 setLanguage(lang);
                 setCode(CODE_SNIPPETS[lang] || "");
             } else {
                 console.warn(`Challenge language ${lang} not in snippets, defaulting to current.`);
                 // Keep current language, but code might not match
             }

            const newHints = fetchHints(newChallenge.id); // Assuming this is synchronous
            setHints(newHints);
            setLastFetchTime(Date.now());
            toast.success("New challenge loaded!");

        } catch (e: any) {
            console.error("Failed to fetch challenge:", e);
            toast.error("Failed to fetch challenge: " + e.message);
        } finally {
            setIsFetchingChallenge(false); // Stop loading
            setCanFetch(false); // Start cooldown timer (useEffect handles re-enabling)
        }
    };

     // Cooldown timer effect
     useEffect(() => {
        if (lastFetchTime === 0) { // Don't run on initial load
             setCanFetch(true);
             return;
        }
 
         const interval = setInterval(() => {
             const now = Date.now();
             if (now - lastFetchTime > TWO_MINUTES) {
                 setCanFetch(true);
                 clearInterval(interval);
                 toast.success("Ready for a new challenge!"); // Notify user
             } else {
                 setCanFetch(false); // Ensure it stays false during cooldown
             }
         }, 1000);
 
         return () => clearInterval(interval);
     }, [lastFetchTime]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        setLanguage(lang);
        setCode(CODE_SNIPPETS[lang] || "");
        setChallenge(null); // Clear challenge when language changes
        setHints([]);
        setOutput('');
        setShowError(null);
    };

    return (
        <motion.div
            className="min-h-screen w-full font-[Montserrat] bg-slate-100 p-6 sm:p-10 space-y-6" // Adjusted spacing
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* <Toaster position="top-center" /> */}
            
            {/* --- Header --- */}
            <motion.h1
                className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text mb-6" // Adjusted margin
                variants={fadeIn} initial="hidden" animate="visible" custom={1}
            >
                Challenge Arena
            </motion.h1>

            {/* --- Controls Card --- */}
            <motion.div
                className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
                variants={fadeIn} initial="hidden" animate="visible" custom={2}
            >
                <div className="relative w-full sm:w-auto flex-grow">
                    <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="w-full p-2.5 pl-10 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none text-sm font-medium"
                        aria-label="Select Programming Language"
                    >
                        {languageOptions.map((lang) => (
                            <option key={lang} value={lang} className="capitalize">
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <motion.button
                    onClick={runCode}
                    disabled={isRunning || isFetchingChallenge}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold transition-all shadow-md hover:shadow-lg hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[130px]"
                    whileHover={{ scale: isRunning ? 1 : 1.05 }}
                    whileTap={{ scale: isRunning ? 1 : 0.95 }}
                >
                    {isRunning ? (<><Loader2 className="w-5 h-5 animate-spin" /> Running...</>) : (<><Play size={18} /> Run Code</>)}
                </motion.button>
                
                <motion.button
                    onClick={fetchNewChallenge}
                    disabled={!canFetch || isRunning || isFetchingChallenge}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold transition-all shadow-md hover:shadow-lg hover:shadow-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[170px]"
                    whileHover={{ scale: (!canFetch || isRunning || isFetchingChallenge) ? 1 : 1.05 }}
                    whileTap={{ scale: (!canFetch || isRunning || isFetchingChallenge) ? 1 : 0.95 }}
                    title={canFetch ? "Fetch a new challenge" : "On cooldown..."}
                >
                     {isFetchingChallenge ? (<><Loader2 className="w-5 h-5 animate-spin" /> Loading...</>) : (<><Zap size={18} /> Challenge Me</>)}
                </motion.button>
            </motion.div>

            {/* --- Challenge Details --- */}
            <AnimatePresence>
                {challenge && (
                    <motion.div
                        className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">{challenge.title}</h2>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-4">
                             <span className="flex items-center gap-1">
                                <Languages size={14} className="text-purple-500"/>
                                {Array.isArray(challenge.language) ? challenge.language.join(", ") : challenge.language}
                            </span>
                             <span className="flex items-center gap-1">
                                <BarChart3 size={14} className="text-orange-500"/>
                                {challenge.difficulty}
                            </span>
                        </div>
                        <p className="mb-4 whitespace-pre-wrap text-gray-700 prose prose-sm max-w-none">{challenge.description}</p>
                        
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-1.5 text-gray-700">
                               <Lightbulb size={18} className="text-yellow-500"/> Hints:
                            </h3>
                            {hints.length > 0 ? (
                                <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                                    {hints.map((hint, idx) => (
                                        <li key={idx}>{hint}</li>
                                    ))}
                                </ul>
                            ) : (
                                 <p className="text-gray-500 text-sm italic">No hints available for this challenge.</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- Editor & Output --- */}
            <motion.div
                 className="flex flex-col lg:flex-row gap-6 mt-6"
                 variants={fadeIn} initial="hidden" animate="visible" custom={3}
            >
                {/* Code Editor Card */}
                <motion.div
                    className="w-full lg:w-1/2 h-[450px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col" // Adjusted height
                    variants={fadeIn}
                >
                     <div className="p-2.5 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600">
                        Code Editor
                     </div>
                    <Editor
                        height="100%"
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        onMount={(editor) => (editorRef.current = editor)}
                        theme="vs" // Light theme
                        options={{
                            minimap: { enabled: false }, fontSize: 13, wordWrap: "on",
                            lineNumbers: "on", scrollBeyondLastLine: false, automaticLayout: true, tabSize: 2,
                        }}
                    />
                </motion.div>

                {/* Output Panel Card */}
                <motion.div
                    className="w-full lg:w-1/2 h-[450px] bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col p-4" // Adjusted height & padding
                    variants={fadeIn}
                >
                    <h2 className="text-base font-semibold mb-2.5 flex items-center gap-2 text-gray-700 flex-shrink-0"> {/* Adjusted size/margin */}
                        <Terminal size={18}/> Output
                    </h2>
                    <div className="flex-grow bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <pre className="whitespace-pre-wrap break-words font-mono">
                            {output || <span className="text-gray-400 italic">Output will appear here...</span>}
                        </pre>
                    </div>
                     <AnimatePresence>
                         {showError && (
                             <motion.div
                                 className="mt-2 text-red-600 text-xs flex items-start gap-1.5 p-2 bg-red-50 border border-red-200 rounded"
                                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                             >
                                 <AlertTriangle size={14} className="flex-shrink-0 mt-0.5"/>
                                 <span>{showError}</span>
                             </motion.div>
                         )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default ChallengeCode;