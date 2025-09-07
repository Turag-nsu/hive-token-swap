"use client";

import { motion } from 'framer-motion';

const MotionP = motion.p;

interface HeroDescriptionProps {
    children: React.ReactNode;
    className?: string;
}

export function HeroDescription({
    children,
    className = ""
}: HeroDescriptionProps) {
    return (
        <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 20
            }}
        >
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${className}`}>
                {children}
            </p>
        </MotionP>
    );
}