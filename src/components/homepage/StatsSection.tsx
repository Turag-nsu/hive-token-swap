"use client";

import { motion } from 'framer-motion';
import { Users, MessageSquare, Heart, Zap } from 'lucide-react';

// Create properly typed motion components
const MotionDiv = motion.div;

export default function StatsSection() {
    const stats = [
        { icon: Users, value: "500K+", label: "Active Users", color: "futuristic-blue", gradient: "from-futuristic-blue to-futuristic-purple" },
        { icon: MessageSquare, value: "2M+", label: "Posts Created", color: "futuristic-purple", gradient: "from-futuristic-purple to-futuristic-pink" },
        { icon: Heart, value: "10M+", label: "Upvotes Given", color: "futuristic-cyan", gradient: "from-futuristic-cyan to-futuristic-teal" },
        { icon: Zap, value: "$5M+", label: "Rewards Distributed", color: "futuristic-green", gradient: "from-futuristic-green to-futuristic-teal" }
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-futuristic-blue/10 to-futuristic-purple/10">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <MotionDiv
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-center p-6 rounded-2xl backdrop-blur-xl bg-white/90 border border-muted hover:border-futuristic-blue/50 transition-all duration-500 hover:-translate-y-2 transform-gpu hover-scale futuristic-card interactive-card group relative overflow-hidden shadow-lg shadow-futuristic-blue/10">
                                    <div className={`absolute inset-0 bg-gradient-to-r from-${stat.color}/20 to-${stat.color === 'futuristic-blue' ? 'futuristic-purple' : stat.color === 'futuristic-purple' ? 'futuristic-pink' : stat.color === 'futuristic-cyan' ? 'futuristic-teal' : 'futuristic-teal'}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
                                    <div className="flex justify-center mb-4 relative">
                                        <div className={`absolute inset-0 bg-${stat.color}/20 rounded-full blur-xl animate-pulse`}></div>
                                        <stat.icon className={`h-10 w-10 text-${stat.color} relative z-10 drop-shadow-lg`} />
                                    </div>
                                    <div className={`text-4xl font-futuristic-bold text-${stat.color} bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} mb-2 drop-shadow-sm`}>{stat.value}</div>
                                    <div className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</div>
                                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                                </div>
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}