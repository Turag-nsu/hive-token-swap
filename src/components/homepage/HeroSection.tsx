"use client";

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

// Define motion components with proper typing
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;

export default function oHeroSection() {
    return (
        <section className="container mx-auto px-4 pt-20 pb-16 relative overflow-hidden">
            {/* Enhanced mesh gradient background */}
            <div className="absolute inset-0 mesh-gradient animate-pulse-slow"></div>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 animated-gradient opacity-30"></div>
            {/* Fixed the background gradient to remove yellow - using blue instead */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1)_0%,rgba(37,99,235,0.1)_70%)]"></div>
            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-futuristic-blue/20 to-futuristic-purple/20 backdrop-blur-sm border border-futuristic-blue/30 mb-4 shadow-lg shadow-futuristic-blue/10">
                        <span className="text-sm font-medium text-futuristic-blue flex items-center justify-center">
                            <Star className="h-4 w-4 mr-1 text-futuristic-cyan animate-pulse" />
                            Powered by Blockchain
                        </span>
                    </div>
                </MotionDiv>

                <MotionH1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="text-4xl md:text-7xl font-futuristic-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue via-futuristic-purple to-futuristic-cyan text-gradient relative">
                        <span className="relative inline-block text-neon text-holo">
                            Share Your Voice
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-futuristic-blue/40 to-futuristic-purple/40 rounded-full"></span>
                        </span>
                        <span className="block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-cyan via-futuristic-pink to-futuristic-blue text-gradient text-holo">On The Hive Blockchain</span>
                    </h1>
                </MotionH1>

                <MotionP
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Connect with a global community, share your thoughts, and earn rewards
                        for your content on the decentralized Hive social network.
                    </p>
                </MotionP>

                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild className="text-lg px-8 rounded-xl bg-gradient-to-r from-futuristic-blue to-futuristic-purple hover:from-futuristic-blue/90 hover:to-futuristic-purple/90 text-primary-foreground backdrop-blur-sm border border-futuristic-blue/30 transition-all duration-300 shadow-lg shadow-futuristic-blue/30 svg-neon hover-scale futuristic-button group glow-border">
                            <Link href="/social" className="flex items-center hover-scale">
                                Join the Community
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="text-lg px-8 rounded-xl backdrop-blur-sm border-muted hover:border-futuristic-cyan/50 transition-all duration-300 hover-scale futuristic-button group shadow-lg shadow-futuristic-cyan/10 glow-border">
                            <Link href="/social" className="flex items-center hover-scale">
                                Explore Posts
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </MotionDiv>

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
                >
                    <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-futuristic-blue/20 to-futuristic-purple/20 blur-xl animate-pulse"></div>
                </MotionDiv>

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
                >
                    <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-futuristic-purple/20 to-futuristic-pink/20 blur-xl animate-pulse"></div>
                </MotionDiv>

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
                >
                    <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-gradient-to-r from-futuristic-cyan/20 to-futuristic-teal/20 blur-xl animate-pulse"></div>
                </MotionDiv>

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
                >
                    <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-futuristic-indigo/30 to-futuristic-violet/30 blur-2xl animate-pulse"></div>
                </MotionDiv>

                {/* Changed lime to indigo to avoid yellowish tones */}
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
                >
                    <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-futuristic-orange/30 to-futuristic-indigo/30 blur-2xl animate-pulse"></div>
                </MotionDiv>

                {/* Changed lime to violet to avoid yellowish tones */}
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
                >
                    <div className="absolute top-2/3 left-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-futuristic-violet/30 to-futuristic-green/30 blur-2xl animate-pulse"></div>
                </MotionDiv>
            </div>
        </section>
    );
}