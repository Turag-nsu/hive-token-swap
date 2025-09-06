"use client";

import { motion } from 'framer-motion';

export function HeroSVG() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Abstract geometric shapes */}
            <motion.svg
                className="absolute top-1/4 left-1/4 w-64 h-64 opacity-20"
                viewBox="0 0 200"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <path
                    d="M100,20 L140,100 L100,180 L60,100 Z"
                    fill="none"
                    stroke="hsl(var(--futuristic-blue))"
                    strokeWidth="2"
                />
                <path
                    d="M100,40 L130,100 L100,160 L70,100 Z"
                    fill="none"
                    stroke="hsl(var(--futuristic-purple))"
                    strokeWidth="1"
                />
            </motion.svg>

            <motion.svg
                className="absolute bottom-1/4 right-1/4 w-48 h-48 opacity-20"
                viewBox="0 0 200"
                initial={{ rotate: 360 }}
                animate={{ rotate: 0 }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="hsl(var(--futuristic-cyan))"
                    strokeWidth="2"
                    strokeDasharray="10,5"
                />
                <circle
                    cx="100"
                    cy="100"
                    r="60"
                    fill="none"
                    stroke="hsl(var(--futuristic-pink))"
                    strokeWidth="1"
                    strokeDasharray="5,10"
                />
            </motion.svg>

            {/* Particle-like elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            >
                <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-[hsl(var(--futuristic-blue))]"></div>
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 20, 0],
                    x: [0, -15, 0],
                    scale: [1, 1.3, 1]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                }}
            >
                <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-[hsl(var(--futuristic-purple))]"></div>
            </motion.div>

            <motion.div
                animate={{
                    y: [0, -15, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                }}
            >
                <div className="absolute top-2/3 left-2/3 w-2.5 h-2.5 rounded-full bg-[hsl(var(--futuristic-cyan))]"></div>
            </motion.div>
        </div>
    );
}