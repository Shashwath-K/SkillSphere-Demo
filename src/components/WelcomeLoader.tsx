import React, { useState, useEffect, FC, useMemo } from "react";
import { motion, AnimatePresence, useTime, useTransform } from "framer-motion";
import logo from "../../assets/logo/comp_logo.png"; // Use the appropriate logo

type WelcomeLoaderProps = {
    onAnimationComplete: () => void;
};

// --- Configuration ---
const LOADER_VISIBLE_DURATION_MS = 5500; // Total time before fade starts
const FADE_OUT_DURATION_MS = 600;      // Fade out time

// --- Background Grid Component ---
const AnimatedGridBackground: FC = () => {
    const time = useTime();
    const rotate = useTransform(time, [0, 10000], [0, 360], { clamp: false }); // Slow rotation

    return (
        <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden opacity-30" // Lower opacity
            style={{
                perspective: '1000px', // For 3D effect
            }}
        >
            <motion.div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '150%', // Make grid larger than screen
                    height: '150%',
                    translateX: '-50%',
                    translateY: '-50%',
                    rotateX: '75deg', // Tilt the grid
                    rotateZ: rotate, // Use the time-based rotation
                    backgroundImage: `linear-gradient(to right, rgba(0, 180, 255, 0.1) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(0, 180, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px', // Grid size
                    maskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)', // Fade edges
                    WebkitMaskImage: 'radial-gradient(ellipse at center, white 20%, transparent 70%)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            />
        </motion.div>
    );
};

// --- Background Particle Component ---
const Particle: FC<{ delay: number; xRange: [number, number]; yRange: [number, number]; size: number }> = ({ delay, xRange, yRange, size }) => {
    const time = useTime();
    // Create a slower, cyclical movement using sine/cosine
    const x = useTransform(time, t => xRange[0] + (xRange[1] - xRange[0]) * (0.5 + 0.5 * Math.sin((t / 5000) + delay * Math.PI)));
    const y = useTransform(time, t => yRange[0] + (yRange[1] - yRange[0]) * (0.5 + 0.5 * Math.cos((t / 6000) + delay * Math.PI)));
    const opacity = useTransform(time, t => 0.2 + 0.3 * Math.abs(Math.sin((t / 7000) + delay * 1.5 * Math.PI))); // Fluctuating opacity

    return (
        <motion.div
            style={{
                position: 'absolute',
                left: 0, // Initial position set by transform
                top: 0,
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: 'rgba(100, 200, 255, 0.5)', // Cyan particle
                boxShadow: '0 0 10px rgba(100, 200, 255, 0.6)',
                filter: 'blur(2px)',
                x,
                y,
                opacity,
            }}
        />
    );
};

const ParticlesBackground: FC<{ count: number }> = ({ count }) => {
    const particles = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            delay: Math.random() * 5, // Random delay for variation
            xRange: [Math.random() * 100 + 'vw', Math.random() * 100 + 'vw'] as unknown as [number, number], // Random positions
            yRange: [Math.random() * 100 + 'vh', Math.random() * 100 + 'vh'] as unknown as [number, number],
            size: Math.random() * 4 + 2, // Sizes between 2px and 6px
        }));
    }, [count]);

    return (
        <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden opacity-40" // Adjust overall opacity
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2, delay: 1 }}
        >
            {particles.map(p => <Particle key={p.id} {...p} />)}
        </motion.div>
    );
};


// --- Central Loader Component: Concentric Rings ---
const ConcentricLoader: FC = () => {
    const ringCount = 5;
    const baseSize = 80; // Size of the innermost ring
    const sizeIncrement = 40; // How much larger each subsequent ring is
    const baseDuration = 4; // Slowest rotation duration
    const durationDecrement = 0.5; // How much faster each ring rotates

    return (
        <motion.div
            className="relative flex items-center justify-center"
            style={{ width: baseSize + (ringCount - 1) * sizeIncrement, height: baseSize + (ringCount - 1) * sizeIncrement }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
            {Array.from({ length: ringCount }).map((_, i) => {
                const size = baseSize + i * sizeIncrement;
                const duration = baseDuration + i * durationDecrement; // Outer rings slightly faster
                const rotationDirection = i % 2 === 0 ? 1 : -1; // Alternate rotation

                return (
                    <motion.div
                        key={i}
                        className="absolute top-0 left-0 rounded-full border-2"
                        style={{
                            width: size,
                            height: size,
                            // Gradient border
                            borderImageSlice: 1,
                            borderImageSource: `linear-gradient(${i * 45}deg, rgba(56, 189, 248, 0.8), rgba(168, 85, 247, 0.1), rgba(56, 189, 248, 0.8))`,
                            boxShadow: `0 0 ${8 + i * 4}px rgba(56, 189, 248, ${0.1 + i * 0.05})`, // Subtle glow increases outwards
                        }}
                        animate={{ rotate: 360 * rotationDirection }}
                        transition={{
                            repeat: Infinity,
                            duration: duration,
                            ease: 'linear',
                        }}
                    />
                );
            })}
             {/* Pulsing Core */}
             <motion.div
                 className="absolute w-8 h-8 rounded-full bg-gradient-radial from-white to-blue-200"
                 style={{ boxShadow: '0 0 20px 5px rgba(200, 220, 255, 0.7)'}}
                 initial={{ scale: 0.8, opacity: 0.7 }}
                 animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
        </motion.div>
    );
};

// --- Animated Text Component ---
const FuturisticText: FC<{ text: string; delay: number }> = ({ text, delay }) => {
    const characters = text.split("");
    return (
        <motion.div
            className="flex justify-center overflow-hidden" // Clip characters sliding in
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.04, delayChildren: delay } }
            }}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    className="inline-block" // Needed for transform
                    variants={{
                        hidden: { opacity: 0, y: "100%", filter: "blur(5px)" },
                        visible: { opacity: 1, y: "0%", filter: "blur(0px)" }
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 12 }}
                >
                    {/* Use non-breaking space for actual spaces */}
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.div>
    );
};

// --- Main Loader Component ---
const WelcomeLoader: FC<WelcomeLoaderProps> = ({ onAnimationComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const fadeOutTimer = setTimeout(() => setIsVisible(false), LOADER_VISIBLE_DURATION_MS);
        const completionTimer = setTimeout(onAnimationComplete, LOADER_VISIBLE_DURATION_MS + FADE_OUT_DURATION_MS);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(completionTimer);
        };
    }, [onAnimationComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="futuristic-loader"
                    className="fixed inset-0 w-full h-full flex flex-col items-center justify-center z-[2500] overflow-hidden bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-950 font-[Montserrat]" // Dark futuristic background
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: FADE_OUT_DURATION_MS / 1000, ease: "easeInOut" }}
                >
                    {/* Background Elements */}
                    <AnimatedGridBackground />
                    <ParticlesBackground count={20} /> {/* Add particle effect */}

                    {/* Foreground Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                        {/* Logo */}
                        <motion.img
                            src={logo} // Use the light/comp logo if background is dark
                            alt="Skillsphere Loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="w-[160px] max-w-[40%] mb-10" // Smaller logo
                            style={{ filter: "drop-shadow(0 0 15px rgba(200, 220, 255, 0.5))" }} // Subtle glow
                        />

                        {/* Concentric Loader */}
                        <ConcentricLoader />

                        {/* Animated Tagline */}
                        <div className="mt-10 text-lg sm:text-xl text-gray-300 tracking-wider">
                            <FuturisticText text="Guiding your journey..." delay={1.5} />
                        </div>
                         <div className="mt-2 text-lg sm:text-xl text-gray-300 tracking-wider">
                            <FuturisticText text="in learning & skill mastery" delay={2.0} />
                        </div>
                    </div>

                     {/* Thin Progress/Time Indicator Bar at bottom */}
                     <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
                         <motion.div
                             className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                             initial={{ width: '0%' }}
                             animate={{ width: '100%' }}
                             transition={{
                                 duration: LOADER_VISIBLE_DURATION_MS / 1000,
                                 ease: 'linear',
                                 delay: 0.5,
                             }}
                             style={{ boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'}}
                         />
                     </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WelcomeLoader;