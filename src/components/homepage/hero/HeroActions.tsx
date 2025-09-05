"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

interface HeroAction {
    label: string;
    href: string;
    variant?: "default" | "outline" | "secondary" | "ghost" | "link";
    icon?: React.ReactNode;
}

interface HeroActionsProps {
    actions: HeroAction[];
    className?: string;
}

export function HeroActions({
    actions,
    className = ""
}: HeroActionsProps) {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
        >
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${className}`}>
                {actions.map((action, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                        whileHover={{
                            y: -5,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            size="lg"
                            variant={action.variant || "default"}
                            asChild
                            className={action.variant === "default"
                                ? "text-lg px-8 rounded-xl bg-gradient-to-r from-futuristic-blue to-futuristic-purple hover:from-futuristic-blue/90 hover:to-futuristic-purple/90 text-primary-foreground backdrop-blur-sm border border-futuristic-blue/30 transition-all duration-300 shadow-lg shadow-futuristic-blue/30 svg-neon hover-scale futuristic-button group glow-border"
                                : "text-lg px-8 rounded-xl backdrop-blur-sm border-muted hover:border-futuristic-cyan/50 transition-all duration-300 hover-scale futuristic-button group shadow-lg shadow-futuristic-cyan/10 glow-border"
                            }
                        >
                            <Link href={action.href} className="flex items-center hover-scale">
                                {action.label}
                                {action.icon ? (
                                    <span className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1">
                                        {action.icon}
                                    </span>
                                ) : (
                                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                )}
                            </Link>
                        </Button>
                    </motion.div>
                ))}
            </div>
        </MotionDiv>
    );
}