"use client";

import Link from 'next/link';
import { ArrowRight, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

// Create properly typed motion components
const MotionDiv = motion.div;

export default function CallToActionSection() {
    return (
        <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-futuristic-blue/5 to-futuristic-purple/5 rounded-3xl my-8">
            <div className="max-w-3xl mx-auto text-center space-y-8 relative">
                {/* Background glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-futuristic-blue/10 to-futuristic-purple/10 blur-2xl -z-10"></div>

                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div>
                        <h2 className="text-3xl font-futuristic-bold bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple text-gradient drop-shadow-sm">Ready to Join the Revolution?</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed mt-4">
                            Be part of the future of social media where your content has real value
                        </p>
                    </div>
                </MotionDiv>

                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div>
                            <Button size="lg" asChild className="text-lg px-8 rounded-xl bg-gradient-to-r from-futuristic-blue to-futuristic-purple hover:from-futuristic-blue/90 hover:to-futuristic-purple/90 text-primary-foreground backdrop-blur-sm border border-futuristic-blue/30 transition-all duration-300 shadow-lg shadow-futuristic-blue/30 svg-neon mx-auto hover-scale futuristic-button group">
                                <Link href="/social" className="flex items-center hover-scale">
                                    Get Started Now
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                        <div>
                            <Button size="lg" variant="outline" asChild className="text-lg px-8 rounded-xl backdrop-blur-sm border-muted hover:border-futuristic-cyan/50 transition-all duration-300 hover-scale futuristic-button group shadow-lg shadow-futuristic-cyan/20">
                                <Link href="/docs" className="flex items-center hover-scale">
                                    <Rocket className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    View Documentation
                                </Link>
                            </Button>
                        </div>
                    </div>
                </MotionDiv>
            </div>
        </section>
    );
}