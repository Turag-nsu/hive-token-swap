"use client";

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

interface HeroBadgeProps {
    text?: string;
    icon?: React.ReactNode;
    className?: string;
}

export function HeroBadge({
    text = "Powered by Blockchain",
    icon = <Star className="h-4 w-4 mr-1 text-futuristic-cyan animate-pulse" />,
    className = ""
}: HeroBadgeProps) {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.6
            }}
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
            }}
        >
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-futuristic-blue/20 to-futuristic-purple/20 backdrop-blur-sm border border-futuristic-blue/30 shadow-lg shadow-futuristic-blue/10 ${className}`}>
                <span className="text-sm font-medium text-futuristic-blue flex items-center justify-center">
                    {icon}
                    {text}
                </span>
            </div>
        </MotionDiv>
    );
}
