"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Create properly typed motion components
const MotionDiv = motion.div;

export default function GettingStartedSection() {
    const steps = [
        {
            number: "1",
            title: "Connect Wallet",
            description: "Login with Hive Keychain or HiveSigner to access your account",
            color: "futuristic-blue"
        },
        {
            number: "2",
            title: "Create Content",
            description: "Write posts, share images, and express your thoughts with the community",
            color: "futuristic-purple"
        },
        {
            number: "3",
            title: "Earn Rewards",
            description: "Get upvotes and earn HIVE tokens for quality content and engagement",
            color: "futuristic-cyan"
        }
    ];

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-futuristic-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple text-gradient">Get Started in Minutes</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                Join the Hive community and start earning rewards for your content
                            </p>
                        </div>
                    </MotionDiv>

                    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <MotionDiv
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-center space-y-4 p-6 rounded-2xl backdrop-blur-xl bg-white/90 border border-muted hover:border-futuristic-blue/50 transition-all duration-500 transform-gpu hover-scale futuristic-card interactive-card group relative overflow-hidden shadow-lg shadow-futuristic-blue/10">
                                    {/* Glowing background effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-r from-${step.color}/20 to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : 'futuristic-teal'}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

                                    {/* Step number with enhanced styling */}
                                    <div className={`mx-auto w-20 h-20 bg-gradient-to-r from-${step.color}/20 to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : 'futuristic-teal'}/20 rounded-full flex items-center justify-center backdrop-blur-sm border-${step.color}/30 svg-neon hover-scale relative overflow-hidden shadow-lg shadow-${step.color}/20`}>
                                        <div className={`absolute inset-0 bg-gradient-to-r from-${step.color}/30 to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : 'futuristic-teal'}/30 animate-pulse`}></div>
                                        <span className={`text-3xl font-futuristic-bold text-${step.color} relative z-10 drop-shadow-lg`}>{step.number}</span>
                                    </div>

                                    {/* Title with enhanced gradient */}
                                    <h3 className={`text-2xl font-futuristic-bold bg-clip-text text-transparent bg-gradient-to-r from-${step.color} to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : 'futuristic-teal'} text-gradient drop-shadow-sm`}>
                                        {step.title}
                                    </h3>

                                    {/* Description with better typography */}
                                    <p className="text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Hover effect indicator */}
                                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${step.color} to-${step.color === 'futuristic-blue' ? 'futuristic-purple' : step.color === 'futuristic-purple' ? 'futuristic-pink' : 'futuristic-teal'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>

                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-center mt-12">
                            <Button size="lg" asChild className="hover-scale futuristic-button group">
                                <Link href="/social" className="flex items-center justify-center hover-scale">
                                    Start Creating Content
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </MotionDiv>
                </div>
            </div>
        </section>
    );
}