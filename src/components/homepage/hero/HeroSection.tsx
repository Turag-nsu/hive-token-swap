"use client";

import { HeroBadge } from '@/components/homepage/hero/HeroBadge';
import { HeroTitle } from '@/components/homepage/hero/HeroTitle';
import { HeroDescription } from '@/components/homepage/hero/HeroDescription';
import { HeroActions } from '@/components/homepage/hero/HeroActions';
import { HeroFloatingElements } from '@/components/homepage/hero/HeroFloatingElements';
import { HeroSVG } from '@/components/homepage/hero/HeroSVG';

interface HeroSectionProps {
    badgeText?: string;
    title: string;
    subtitle: string;
    description: string;
    actions: {
        label: string;
        href: string;
        variant?: "default" | "outline" | "secondary" | "ghost" | "link";
        icon?: React.ReactNode;
    }[];
    className?: string;
}

export function HeroSection({
    badgeText = "Powered by Blockchain",
    title,
    subtitle,
    description,
    actions,
    className = ""
}: HeroSectionProps) {
    return (
        <section className={`container mx-auto px-4 pt-20 pb-16 relative overflow-hidden ${className}`}>
            {/* Background elements */}
            <div className="absolute inset-0 mesh-gradient animate-pulse-slow"></div>
            <div className="absolute inset-0 animated-gradient opacity-30"></div>
            {/* Fixed the background gradient to remove yellow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1)_0%,rgba(37,99,235,0.1)_70%)]"></div>

            {/* SVG Elements */}
            <HeroSVG />

            {/* Content */}
            <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                <HeroBadge text={badgeText} />

                <HeroTitle
                    title={title}
                    subtitle={subtitle}
                />

                <HeroDescription>
                    {description}
                </HeroDescription>

                <HeroActions actions={actions} />

                {/* Floating elements */}
                <HeroFloatingElements />
            </div>
        </section>
    );
}