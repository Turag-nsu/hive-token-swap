"use client";

import { motion } from 'framer-motion';

const MotionDiv = motion.div;

interface HeroTitleProps {
    title: string;
    subtitle: string;
    className?: string;
}

export function HeroTitle({
    title,
    subtitle,
    className = ""
}: HeroTitleProps) {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <div className={`space-y-6 ${className}`}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-futuristic-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue via-futuristic-purple to-futuristic-cyan text-gradient relative">
                    <span className="relative inline-block text-neon text-holo">
                        {title}
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.8,
                                ease: "easeInOut"
                            }}
                            style={{
                                position: 'absolute',
                                bottom: '-0.5rem',
                                left: 0,
                                width: '100%',
                                height: '0.25rem',
                                background: 'linear-gradient(to right, hsl(var(--futuristic-blue) / 0.4), hsl(var(--futuristic-purple) / 0.4))',
                                borderRadius: '0.25rem'
                            }}
                        ></motion.span>
                    </span>
                </h1>
                <h2 className="text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-futuristic-cyan via-futuristic-pink to-futuristic-blue text-gradient text-holo">
                    {subtitle}
                </h2>
            </div>
        </MotionDiv>
    );
}