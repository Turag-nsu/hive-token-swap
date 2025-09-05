"use client";

import { motion } from 'framer-motion';

const MotionDiv = motion.div;

export function HeroFloatingElements() {
    return (
        <>
            {/* Floating elements */}
            <MotionDiv
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-futuristic-blue/20 to-futuristic-purple/20 blur-xl animate-pulse"
            ></MotionDiv>

            <MotionDiv
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                }}
                className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-futuristic-purple/20 to-futuristic-pink/20 blur-xl animate-pulse"
            ></MotionDiv>

            <MotionDiv
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                }}
                className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-futuristic-cyan/20 to-futuristic-teal/20 blur-xl animate-pulse"
            ></MotionDiv>

            {/* Additional floating elements for more dynamic effect */}
            <MotionDiv
                animate={{
                    x: [0, 20, 0, -20, 0],
                    y: [0, -20, 0, 20, 0],
                    scale: [1, 1.2, 1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3, 0.5, 0.3]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-futuristic-indigo/30 to-futuristic-violet/30 blur-2xl animate-pulse"
            ></MotionDiv>

            <MotionDiv
                animate={{
                    x: [0, -15, 0, 15, 0],
                    y: [0, 25, 0, -25, 0],
                    scale: [1, 1.3, 1, 1.2, 1],
                    opacity: [0.2, 0.5, 0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1.5
                }}
                className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-futuristic-orange/30 to-futuristic-lime/30 blur-2xl animate-pulse"
            ></MotionDiv>

            <MotionDiv
                animate={{
                    x: [0, 25, 0, -25, 0],
                    y: [0, -15, 0, 15, 0],
                    scale: [1, 1.1, 1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4, 0.6, 0.4]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.8
                }}
                className="absolute top-2/3 left-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-futuristic-lime/30 to-futuristic-green/30 blur-2xl animate-pulse"
            ></MotionDiv>
        </>
    );
}