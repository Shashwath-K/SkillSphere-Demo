import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mic,         // Icon for Start Listening
    MicOff,      // Icon for Stop Listening
    Loader2,     // Icon for Loading
    Sparkles,    // Icon for Corrected Text
    List,        // Icon for Suggestions
    AlertTriangle // Icon for Errors
} from "lucide-react";
import toast from 'react-hot-toast'; // For browser support notification

// --- Type Definitions (More specific if possible) ---
// Attempt to get more specific types if SpeechRecognition API types are available
// For now, using 'any' as in the original code
type SpeechRecognitionAPI = any;
type SpeechRecognitionEventAPI = any;
// ---------------------------------------------------

// TextGears API Key (Consider moving to environment variables)
const API_KEY = 'P3oxLtyS8H3xOHvB'; // Replace with your actual key

// Animation variant
const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" }
    }),
};

// --- Main Component ---
const Communication: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [correctedText, setCorrectedText] = useState('');
    const [alternativeSuggestions, setAlternativeSuggestions] = useState<string[]>([]);
    const [loadingCorrection, setLoadingCorrection] = useState(false); // Renamed loading state
    const [error, setError] = useState<string | null>(null); // For API/general errors
    const recognitionRef = useRef<SpeechRecognitionAPI | null>(null);

    // --- Speech Recognition Setup ---
    useEffect(() => {
        // Feature detection
        const SpeechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            toast.error('Speech Recognition is not supported by your browser.');
            console.warn('Speech Recognition not supported.');
            return; // Stop setup if not supported
        }

        try {
            const recognition = new SpeechRecognition();
            recognition.continuous = true; // Keep listening until stopped
            recognition.interimResults = false; // Only final results
            recognition.lang = 'en-US'; // Set language

            // --- Event Handlers ---
            recognition.onresult = (event: SpeechRecognitionEventAPI) => {
                // Get the latest final transcript segment
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }

                if (finalTranscript.trim()) {
                    console.log("Transcript received:", finalTranscript);
                    setTranscript(prev => (prev + ' ' + finalTranscript).trim()); // Append new transcript
                    correctGrammar(finalTranscript); // Send the *new* part for correction
                }
            };

            recognition.onerror = (event: any) => { // Use 'any' type for simplicity
                console.error('Speech recognition error:', event.error);
                let errorMessage = 'Speech recognition error';
                // Provide more specific feedback if possible
                if (event.error === 'no-speech') errorMessage = 'No speech detected. Please try again.';
                else if (event.error === 'audio-capture') errorMessage = 'Microphone error. Check permissions.';
                else if (event.error === 'not-allowed') errorMessage = 'Microphone access denied.';

                toast.error(errorMessage);
                setIsListening(false); // Stop listening on error
            };

            recognition.onend = () => {
                 // Restart listening automatically only if explicitly stopped by user or error
                 // This prevents restarting after short pauses if continuous=true
                 // console.log("Speech recognition ended.");
                 // If you want it to stop after a pause, set recognition.continuous = false
                 // If continuous is true, it might stop automatically after a long pause, handle restart if needed
                 if(isListening) { // Only restart if it was supposed to be listening
                    // console.log("Restarting listening...");
                    // recognition.start(); // Be cautious with auto-restart, might cause issues
                 }
            };

            recognitionRef.current = recognition;

        } catch (err) {
            console.error("Failed to initialize SpeechRecognition:", err);
            toast.error("Failed to initialize speech recognition service.");
        }

        // Cleanup function
        return () => {
            recognitionRef.current?.stop();
        };
        // isListening dependency added to potentially restart onend if needed
    }, [isListening]); // Re-run effect if isListening state changes, relevant for onend logic


    // --- Toggle Listening State ---
    const toggleListening = useCallback(() => {
        if (!recognitionRef.current) {
            toast.error("Speech recognition not available.");
            return;
        }

        if (isListening) {
            try {
                 recognitionRef.current.stop();
                 console.log("Stopped listening.");
                 setIsListening(false);
            } catch (err) {
                 console.error("Error stopping recognition:", err);
            }
        } else {
             // Reset states when starting fresh
            setTranscript('');
            setCorrectedText('');
            setAlternativeSuggestions([]);
            setError(null);
            try {
                 recognitionRef.current.start();
                 console.log("Started listening...");
                 setIsListening(true);
            } catch (err) {
                 console.error("Error starting recognition:", err);
                 toast.error("Could not start listening. Check microphone permissions.");
            }
        }
    }, [isListening]); // Dependency on isListening


    // --- Grammar Correction API Call ---
    const correctGrammar = useCallback(async (text: string) => {
        if (!text.trim()) return; // Don't call API for empty strings

        setLoadingCorrection(true);
        setError(null); // Clear previous API errors
        console.log("Sending for correction:", text);

        try {
            // Use fetch API
            const response = await fetch(
                `https://api.textgears.com/correct?text=${encodeURIComponent(text)}&language=en-GB&key=${API_KEY}`
            );

            if (!response.ok) {
                // Handle non-2xx HTTP responses
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("API Response:", data);

            if (data?.response) {
                // Append correction, handle cases where no correction needed
                 const correction = data.response.corrected || text; // Use original if no correction
                 setCorrectedText(prev => (prev + ' ' + correction).trim());

                // Extract suggestions, handle potential undefined/null errors
                const suggestions = data.response.errors?.flatMap((error: any) => error.better || []) || [];
                // Append suggestions, keeping only unique ones (optional)
                setAlternativeSuggestions(prev => {
                     const combined = [...prev, ...suggestions.slice(0, 5)];
                     // Keep only unique suggestions if desired
                     return Array.from(new Set(combined));
                });

            } else {
                // Handle cases where API response format is unexpected or indicates an error
                console.error("Unexpected API response structure:", data);
                setError(data?.description || "Received invalid data from correction API.");
                // Append original text if correction fails
                 setCorrectedText(prev => (prev + ' ' + text).trim());
            }
        } catch (error: any) {
            console.error('Error correcting grammar:', error);
            setError(`Correction failed: ${error.message || 'Network error'}`);
             // Append original text on error
             setCorrectedText(prev => (prev + ' ' + text).trim());
            setAlternativeSuggestions([]); // Clear suggestions on error
        } finally {
            setLoadingCorrection(false);
        }
    }, [API_KEY]); // API Key dependency

    return (
        <motion.div
            className="min-h-screen w-full font-[Montserrat] bg-slate-100 flex items-center justify-center p-6 py-12"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
            <motion.div
                className="bg-white rounded-2xl shadow-xl w-full max-w-3xl mx-auto p-8" // Adjusted max-width
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            >
                {/* --- Header --- */}
                <motion.h1
                    className="text-3xl font-extrabold text-center text-gray-900 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500" // New gradient
                    variants={fadeIn} initial="hidden" animate="visible" custom={1}
                >
                    Voice Input & Correction
                </motion.h1>

                {/* --- Toggle Button --- */}
                <motion.div
                    className="flex justify-center mb-8"
                    variants={fadeIn} initial="hidden" animate="visible" custom={2}
                >
                    <motion.button
                        onClick={toggleListening}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md flex items-center gap-2 min-w-[180px] justify-center ${
                            isListening
                                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg hover:shadow-pink-500/40'
                                : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/40'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isListening ? (
                            <> <MicOff size={18} /> Stop Listening </>
                        ) : (
                            <> <Mic size={18} /> Start Listening </>
                        )}
                    </motion.button>
                </motion.div>

                {/* --- Sections --- */}
                <motion.div
                    className="space-y-6"
                    initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} custom={3}
                >
                    {/* Original Transcript */}
                    <motion.div variants={fadeIn} className="p-5 bg-slate-50 border border-slate-200 rounded-xl">
                        <h2 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wider">Original Transcript</h2>
                        <div className="min-h-[60px] text-gray-800 text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {transcript || <span className="text-gray-400 italic">Speak something after starting...</span>}
                        </div>
                    </motion.div>

                    {/* Corrected Text */}
                    <motion.div variants={fadeIn} className="p-5 bg-blue-50 border border-blue-200 rounded-xl">
                        <h2 className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles size={16} /> Corrected Text
                        </h2>
                        <div className="min-h-[60px] text-blue-900 text-sm leading-relaxed whitespace-pre-wrap break-words relative">
                            {loadingCorrection && <Loader2 className="w-4 h-4 animate-spin absolute top-0.5 right-0 text-blue-500" />}
                            {correctedText || <span className="text-blue-400 italic">Corrections will appear here...</span>}
                        </div>
                         {/* API Error Display */}
                         <AnimatePresence>
                             {error && (
                                 <motion.p
                                    className="mt-2 text-red-600 text-xs flex items-start gap-1 p-2 bg-red-50 border border-red-200 rounded"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                 >
                                     <AlertTriangle size={14} className="flex-shrink-0 mt-0.5"/>
                                     <span>{error}</span>
                                 </motion.p>
                             )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Alternative Suggestions */}
                    <motion.div variants={fadeIn} className="p-5 bg-green-50 border border-green-200 rounded-xl">
                        <h2 className="text-sm font-semibold text-green-700 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                            <List size={16} /> Alternative Suggestions
                        </h2>
                        <div className="min-h-[40px]">
                            {alternativeSuggestions.length > 0 ? (
                                <ul className="list-disc pl-5 space-y-1 text-green-800 text-xs sm:text-sm">
                                    {alternativeSuggestions.map((suggestion, index) => (
                                        <li key={index}>{suggestion}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-green-600 text-xs sm:text-sm italic">
                                    {transcript && !loadingCorrection ? "No specific suggestions found." : "Suggestions will appear here..."}
                                </p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>

            </motion.div>
        </motion.div>
    );
};

export default Communication;