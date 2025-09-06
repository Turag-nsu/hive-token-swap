"use client";

import { motion } from 'framer-motion';
import { Globe, Heart, Users, Edit3, MessageSquare, TrendingUp } from 'lucide-react';
import { useState } from 'react';

// Create properly typed motion components
const MotionDiv = motion.div;

export default function FeaturesSection() {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: Globe,
            title: "Decentralized",
            description: "Your content lives on the blockchain, ensuring true ownership and censorship resistance",
            color: "futuristic-blue"
        },
        {
            icon: Heart,
            title: "Earn Rewards",
            description: "Get rewarded in HIVE and HBD tokens for creating quality content and engaging with others",
            color: "futuristic-purple"
        },
        {
            icon: Users,
            title: "Global Community",
            description: "Connect with millions of users worldwide who share your interests and passions",
            color: "futuristic-cyan"
        },
        {
            icon: Edit3,
            title: "Rich Content",
            description: "Create posts with markdown, images, and multimedia content",
            color: "futuristic-pink"
        },
        {
            icon: MessageSquare,
            title: "Engage & Discuss",
            description: "Comment, vote, and share content to build meaningful connections",
            color: "futuristic-teal"
        },
        {
            icon: TrendingUp,
            title: "Trending Topics",
            description: "Discover what's popular and join conversations that matter to you",
            color: "futuristic-indigo"
        }
    ];

    return (
        <section className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-futuristic-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-futuristic-blue to-futuristic-purple text-gradient">Why Choose Hive Social?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Built for creators who value freedom, rewards, and true ownership of their content
                        </p>
                    </div>
                </MotionDiv>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <MotionDiv
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                        >
                            <div
                                className={`relative p-6 rounded-2xl backdrop-blur-xl bg-white/90 border border-muted transition-all duration-500 transform-gpu hover-scale futuristic-card interactive-card group ${activeFeature === index ? 'ring-2 ring-' + feature.color + '/50 shadow-xl shadow-' + feature.color + '/30' : 'shadow-lg shadow-' + feature.color + '/10'}`}
                                onMouseEnter={() => setActiveFeature(index)}
                            >
                                {/* Glowing border effect */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-${feature.color}/30 to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'}/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>

                                {/* Icon container with enhanced glow */}
                                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-${feature.color}/20 to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'}/20 rounded-xl mb-6 backdrop-blur-sm border-${feature.color}/30 svg-neon hover-scale relative overflow-hidden shadow-lg shadow-${feature.color}/20`}>
                                    <div className={`absolute inset-0 bg-gradient-to-r from-${feature.color}/30 to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'}/30 animate-pulse`}></div>
                                    <feature.icon className={`h-8 w-8 text-${feature.color} relative z-10 drop-shadow-lg`} />
                                </div>

                                {/* Title with enhanced gradient */}
                                <h3 className={`font-futuristic-bold mb-3 text-xl bg-clip-text text-transparent bg-gradient-to-r from-${feature.color} to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'} text-gradient drop-shadow-sm`}>
                                    {feature.title}
                                </h3>

                                {/* Description with better typography */}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover effect indicator */}
                                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${feature.color} to-${feature.color === 'futuristic-blue' ? 'futuristic-purple' : feature.color === 'futuristic-purple' ? 'futuristic-pink' : feature.color === 'futuristic-cyan' ? 'futuristic-teal' : feature.color === 'futuristic-pink' ? 'futuristic-blue' : feature.color === 'futuristic-teal' ? 'futuristic-indigo' : 'futuristic-blue'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                            </div>
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </section>
    );
}