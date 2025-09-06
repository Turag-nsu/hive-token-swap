"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils';
import { useTheme } from '@/providers/ThemeProvider';

interface FuturisticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const FuturisticButton = React.forwardRef<HTMLButtonElement, FuturisticButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    fullWidth = false,
    children, 
    ...props 
  }, ref) => {
    const { computedTheme } = useTheme();
    
    const baseClasses = "relative overflow-hidden rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none futuristic-button";
    
    const variantClasses = {
      primary: computedTheme === 'dark' 
        ? "bg-gradient-to-r from-blue-600 to-purple-700 text-white hover:from-blue-700 hover:to-purple-800 focus:ring-blue-500/50 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40" 
        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500/50 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40",
      secondary: computedTheme === 'dark' 
        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 focus:ring-cyan-500/50 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40" 
        : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-500/50 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40",
      outline: computedTheme === 'dark' 
        ? "border border-blue-500/50 bg-background/60 backdrop-blur-sm text-foreground hover:bg-blue-500/20 focus:ring-blue-500/30" 
        : "border border-blue-500/50 bg-background/60 backdrop-blur-sm text-foreground hover:bg-blue-500/10 focus:ring-blue-500/30",
      ghost: computedTheme === 'dark' 
        ? "bg-transparent text-foreground hover:bg-muted/50 focus:ring-blue-500/30" 
        : "bg-transparent text-foreground hover:bg-muted focus:ring-blue-500/30",
    };
    
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };
    
    const widthClass = fullWidth ? "w-full" : "";
    
    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClass,
      className
    );
    
    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <span className={isLoading ? "opacity-0" : "opacity-100"}>
          {children}
        </span>
      </motion.button>
    );
  }
);

FuturisticButton.displayName = "FuturisticButton";