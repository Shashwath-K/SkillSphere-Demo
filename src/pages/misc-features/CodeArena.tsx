import React, { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { executeCode } from "./api"; // Assuming API call exists
import { LANGUAGE_VERSIONS } from "./constants"; // Assuming constants exist
import { motion, AnimatePresence } from 'framer-motion';
import {
    Languages, // Icon for language select
    Play,      // Icon for Run button
    Loader2,   // Icon for running state
    Terminal,  // Icon for Output panel
    AlertTriangle // Icon for error message
} from 'lucide-react';
// Removed CSS import if styles are now handled by Tailwind
// import "./css/CodeArena.css";

// Code snippets (keep as is)
export const CODE_SNIPPETS: { [key: string]: string } = {
    javascript: `
function greet(name) {
  console.log("Hello, " + name + "!");
}
greet("Alex");
`,
    typescript: `
type Params = {
  name: string;
};

function greet(data: Params) {
  console.log("Hello, " + data.name + "!");
}
greet({ name: "Alex" });
`,
    python: `
def greet(name):
  print("Hello, " + name + "!")
greet("Alex")
`,
    java: `
public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello World in Java!");
  }
}
`,
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
    cpp: `
#include <iostream>
using namespace std;

int main() {
  cout << "Hello, World from C++!" << endl;
  return 0;
}
`,
    mysql: `
-- Basic SQL query
SELECT "Hello, World from MySQL!" AS greeting;
`,
};
// --- ADD THIS INTERFACE ---
// (Adjust properties if your API returns something different)
interface ExecutionResult {
    stdout?: string;
    stderr?: string;
    output?: string; // Add this if your API might return 'output'
}
// -------------------------
// Animation variant
const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    }),
};


const CodeArena = () => {
    const [code, setCode] = useState(CODE_SNIPPETS.javascript);
    const [language, setLanguage] = useState("javascript");
    const [output, setOutput] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [showError, setShowError] = useState<string | null>(null);
    const [runError, setRunError] = useState<string | null>(null); // Renamed showError
    const editorRef = useRef<any>(null); // Consider using Monaco editor types if available

    const runCode = async () => {
        if (!editorRef.current || isRunning) return;

        setIsRunning(true);
        setOutput(""); // Clear previous output
        setRunError(null); // Clear previous error
        const sourceCode = editorRef.current.getValue();

        // Basic check for empty code
        if (!sourceCode.trim()) {
            setOutput("No code to run.");
            setIsRunning(false);
            return;
        }
          try {
              const langKey = language as keyof typeof LANGUAGE_VERSIONS;
              const result = await executeCode(langKey, sourceCode) as ExecutionResult | string;
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

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lang = e.target.value;
        setLanguage(lang);
        setCode(CODE_SNIPPETS[lang] || "// Snippet not found"); // Set code snippet or default
        setOutput(""); // Clear output on language change
        setRunError(null); // Clear error on language change
    };

    return (
        <motion.div
            className="min-h-screen w-full font-[Montserrat] bg-slate-100 p-6 sm:p-10 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* --- Header --- */}
            <motion.h1
                className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text mb-8"
                variants={fadeIn} initial="hidden" animate="visible" custom={1}
            >
                Code Arena
            </motion.h1>

            {/* --- Controls Card --- */}
            <motion.div
                className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
                variants={fadeIn} initial="hidden" animate="visible" custom={2}
            >
                {/* Language Selector */}
                <div className="relative w-full sm:w-auto flex-grow sm:flex-grow-0">
                    <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="w-full p-2.5 pl-10 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all appearance-none text-sm font-medium"
                        aria-label="Select Programming Language"
                    >
                        {Object.keys(LANGUAGE_VERSIONS).map((lang) => ( // Use LANGUAGE_VERSIONS keys if they match snippets
                            <option key={lang} value={lang} className="capitalize">
                                {/* Simple capitalization */}
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Run Button */}
                <motion.button
                    onClick={runCode}
                    disabled={isRunning}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold transition-all shadow-md hover:shadow-lg hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[130px]"
                    whileHover={{ scale: isRunning ? 1 : 1.05 }}
                    whileTap={{ scale: isRunning ? 1 : 0.95 }}
                >
                    {isRunning ? (
                        <> <Loader2 className="w-5 h-5 animate-spin" /> Running... </>
                    ) : (
                        <> <Play size={18} /> Run Code </>
                    )}
                </motion.button>
            </motion.div>

            {/* --- Editor & Output --- */}
            <motion.div
                 className="flex flex-col lg:flex-row gap-6 lg:gap-8"
                 initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 }}}} custom={3} // Stagger children
            >
                {/* Code Editor Card */}
                <motion.div
                    className="w-full lg:w-1/2 h-[500px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 flex flex-col" // Added flex-col
                    variants={fadeIn} // Use fadeIn for individual card animation
                >
                    {/* Optional: Add a small header here if needed */}
                     {/* <div className="p-2 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500">Code Editor</div> */}
                    <Editor
                        height="100%" // Take full height of parent flex item
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        onMount={(editor) => (editorRef.current = editor)}
                        theme="vs" // Light theme
                        options={{
                            minimap: { enabled: false },
                            fontSize: 13, // Slightly smaller font
                            wordWrap: "on",
                            lineNumbers: "on",
                            scrollBeyondLastLine: false,
                            automaticLayout: true, // Helps with resizing
                            tabSize: 2, // Common tab size
                        }}
                        // Wrapper to ensure layout is recalculated if needed
                        // wrapperProps={{ style: { flexGrow: 1 } }}
                    />
                </motion.div>

                {/* Output Panel Card */}
                <motion.div
                    className="w-full lg:w-1/2 h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col p-5" // Added flex-col and padding
                    variants={fadeIn} // Use fadeIn for individual card animation
                >
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700 flex-shrink-0">
                        <Terminal size={20}/> Output
                    </h2>
                    <div className="flex-grow bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {/* Use pre-wrap to preserve whitespace and wrap lines */}
                        <pre className="whitespace-pre-wrap break-words font-mono">
                            {output || <span className="text-gray-400 italic">Output will appear here...</span>}
                        </pre>
                    </div>
                     <AnimatePresence>
                         {runError && (
                             <motion.div
                                 className="mt-3 text-red-600 text-xs flex items-start gap-1.5 p-2 bg-red-50 border border-red-200 rounded" // Adjusted styling
                                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                             >
                                 <AlertTriangle size={14} className="flex-shrink-0 mt-0.5"/>
                                 <span>{runError}</span>
                             </motion.div>
                         )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
}
export default CodeArena;
