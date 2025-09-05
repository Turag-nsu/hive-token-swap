# Animations Directory

This directory contains animation configurations, GSAP utilities, Framer Motion presets, and custom animation systems for creating engaging user experiences.

## Overview

The animations system provides:
- **GSAP Integration**: High-performance timeline animations
- **Framer Motion**: React-friendly declarative animations
- **CSS Transitions**: Lightweight hover and state transitions
- **View Transitions API**: Experimental native browser transitions
- **Performance Optimization**: Hardware acceleration and smooth 60fps animations

## Animation Architecture

```
animations/
├── gsap/             # GSAP timeline and utility functions
├── framer/           # Framer Motion variants and configurations
├── css/              # CSS animation classes and utilities
├── transitions/      # View Transitions API integration
├── presets/          # Pre-built animation combinations
├── hooks/            # Animation-related React hooks
└── README.md         # This file
```

## Animation Systems

### GSAP Integration (`gsap/`)

#### `gsap-config.ts`
GSAP configuration and plugin setup:

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin);
}

// Global GSAP configuration
gsap.config({
  force3D: true,
  nullTargetWarn: false,
});

// Default animation settings
export const gsapDefaults = {
  duration: 0.6,
  ease: 'power2.out',
  force3D: true,
};

// Animation timeline factory
export class TimelineFactory {
  static create(options?: gsap.TimelineVars): gsap.core.Timeline {
    return gsap.timeline({
      defaults: gsapDefaults,
      ...options,
    });
  }

  static createScrollTrigger(
    trigger: string | Element,
    options?: ScrollTrigger.Vars
  ): gsap.core.Timeline {
    return gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...options,
      },
      defaults: gsapDefaults,
    });
  }
}

// Common animation utilities
export const gsapUtils = {
  // Fade animations
  fadeIn: (target: gsap.TweenTarget, duration: number = 0.6) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, ease: 'power2.out' }
    );
  },

  fadeOut: (target: gsap.TweenTarget, duration: number = 0.4) => {
    return gsap.to(target, {
      opacity: 0,
      y: -20,
      duration,
      ease: 'power2.in',
    });
  },

  // Scale animations
  scaleIn: (target: gsap.TweenTarget, duration: number = 0.5) => {
    return gsap.fromTo(
      target,
      { scale: 0, rotation: 180 },
      { 
        scale: 1, 
        rotation: 0, 
        duration, 
        ease: 'back.out(1.7)',
        transformOrigin: 'center center'
      }
    );
  },

  scaleOut: (target: gsap.TweenTarget, duration: number = 0.3) => {
    return gsap.to(target, {
      scale: 0,
      rotation: -180,
      duration,
      ease: 'back.in(1.7)',
      transformOrigin: 'center center'
    });
  },

  // Slide animations
  slideInLeft: (target: gsap.TweenTarget, duration: number = 0.6) => {
    return gsap.fromTo(
      target,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration, ease: 'power2.out' }
    );
  },

  slideInRight: (target: gsap.TweenTarget, duration: number = 0.6) => {
    return gsap.fromTo(
      target,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration, ease: 'power2.out' }
    );
  },

  // Stagger animations
  staggerIn: (targets: gsap.TweenTarget, stagger: number = 0.1) => {
    return gsap.fromTo(
      targets,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: {
          amount: stagger,
          from: 'start',
        },
      }
    );
  },

  // Loading animations
  pulseGlow: (target: gsap.TweenTarget) => {
    return gsap.to(target, {
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
      scale: 1.02,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  },

  // Number counting
  countUp: (
    target: gsap.TweenTarget,
    endValue: number,
    duration: number = 2,
    decimals: number = 0
  ) => {
    const obj = { number: 0 };
    return gsap.to(obj, {
      number: endValue,
      duration,
      ease: 'power2.out',
      onUpdate() {
        const element = gsap.utils.toArray(target)[0] as HTMLElement;
        if (element) {
          element.textContent = obj.number.toFixed(decimals);
        }
      },
    });
  },
};

export { gsap };
```

#### `swap-animations.ts`
Specialized animations for swap interface:

```typescript
import { gsap } from './gsap-config';
import { TimelineFactory } from './gsap-config';

export class SwapAnimations {
  // Token selection animation
  static tokenSelect(tokenElement: Element): gsap.core.Timeline {
    const tl = TimelineFactory.create();
    
    tl.to(tokenElement, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out',
    })
    .to(tokenElement, {
      scale: 1,
      duration: 0.3,
      ease: 'elastic.out(1, 0.5)',
    });

    return tl;
  }

  // Swap direction flip animation
  static flipTokens(
    fromContainer: Element,
    toContainer: Element,
    flipButton: Element
  ): gsap.core.Timeline {
    const tl = TimelineFactory.create();

    // Rotate flip button
    tl.to(flipButton, {
      rotation: 180,
      duration: 0.5,
      ease: 'power2.inOut',
    }, 0);

    // Animate containers
    tl.to([fromContainer, toContainer], {
      scale: 0.95,
      duration: 0.25,
      ease: 'power2.in',
    }, 0)
    .set(fromContainer, { y: 100 })
    .set(toContainer, { y: -100 })
    .to([fromContainer, toContainer], {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.2)',
    });

    return tl;
  }

  // Amount input focus animation
  static amountInputFocus(input: Element): gsap.core.Timeline {
    const tl = TimelineFactory.create();
    
    tl.to(input, {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
    });

    return tl;
  }

  static amountInputBlur(input: Element): gsap.core.Timeline {
    const tl = TimelineFactory.create();
    
    tl.to(input, {
      borderColor: '#e2e8f0',
      boxShadow: 'none',
      scale: 1,
      duration: 0.2,
      ease: 'power2.in',
    });

    return tl;
  }

  // Price update animation
  static priceUpdate(priceElement: Element, isIncrease: boolean): gsap.core.Timeline {
    const tl = TimelineFactory.create();
    const color = isIncrease ? '#10b981' : '#ef4444';

    tl.to(priceElement, {
      color,
      scale: 1.1,
      duration: 0.2,
      ease: 'power2.out',
    })
    .to(priceElement, {
      scale: 1,
      duration: 0.4,
      ease: 'elastic.out(1, 0.3)',
    })
    .to(priceElement, {
      color: 'inherit',
      duration: 1,
      ease: 'power2.out',
    });

    return tl;
  }

  // Transaction success animation
  static transactionSuccess(container: Element): gsap.core.Timeline {
    const tl = TimelineFactory.create();

    // Create success particles
    const particles = this.createParticles(container);
    
    tl.set(particles, {
      scale: 0,
      opacity: 1,
    })
    .to(particles, {
      scale: 1,
      rotation: 360,
      duration: 0.8,
      ease: 'power2.out',
      stagger: {
        amount: 0.3,
        from: 'center',
      },
    }, 0)
    .to(particles, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
      stagger: {
        amount: 0.2,
        from: 'center',
      },
    }, 0.3)
    .call(() => {
      particles.forEach(p => p.remove());
    });

    return tl;
  }

  private static createParticles(container: Element): Element[] {
    const particles: Element[] = [];
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-3 h-3 rounded-full pointer-events-none';
      particle.style.backgroundColor = colors[i % colors.length];
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';
      
      // Random positioning
      const angle = (360 / 8) * i;
      const radius = 30 + Math.random() * 20;
      const x = Math.cos(angle * Math.PI / 180) * radius;
      const y = Math.sin(angle * Math.PI / 180) * radius;
      
      gsap.set(particle, { x, y });
      
      container.appendChild(particle);
      particles.push(particle);
    }

    return particles;
  }

  // Loading state animation
  static loadingPulse(elements: Element[]): gsap.core.Timeline {
    const tl = TimelineFactory.create({ repeat: -1 });

    tl.to(elements, {
      opacity: 0.5,
      duration: 0.8,
      ease: 'sine.inOut',
      stagger: 0.2,
    })
    .to(elements, {
      opacity: 1,
      duration: 0.8,
      ease: 'sine.inOut',
      stagger: 0.2,
    });

    return tl;
  }
}
```

### Framer Motion Integration (`framer/`)

#### `motion-variants.ts`
Predefined motion variants for consistent animations:

```typescript
import { Variants } from 'framer-motion';

// Page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Modal animations
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

// List item stagger
export const listVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Button interactions
export const buttonVariants: Variants = {
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

// Card hover effects
export const cardVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Loading spinner
export const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Notification slide
export const notificationVariants: Variants = {
  initial: {
    x: '100%',
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Swap direction flip
export const swapFlipVariants: Variants = {
  initial: {
    rotateY: 0,
  },
  flip: {
    rotateY: 180,
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
    },
  },
};
```

#### `motion-components.ts`
Pre-built motion components:

```typescript
import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';
import {
  pageVariants,
  modalVariants,
  buttonVariants,
  cardVariants,
  listVariants,
  listItemVariants,
} from './motion-variants';

// Animated page wrapper
export const AnimatedPage = motion.div;
AnimatedPage.defaultProps = {
  variants: pageVariants,
  initial: 'initial',
  animate: 'in',
  exit: 'out',
};

// Animated modal
export const AnimatedModal = motion.div;
AnimatedModal.defaultProps = {
  variants: modalVariants,
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
};

// Animated button
interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

// Animated card
interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

// Animated list
export const AnimatedList = motion.ul;
AnimatedList.defaultProps = {
  variants: listVariants,
  initial: 'hidden',
  animate: 'visible',
};

export const AnimatedListItem = motion.li;
AnimatedListItem.defaultProps = {
  variants: listItemVariants,
};

// Animated form
export const AnimatedForm = motion.form;
export const AnimatedInput = motion.input;
export const AnimatedTextarea = motion.textarea;
export const AnimatedSelect = motion.select;
```

### CSS Animations (`css/`)

#### `animations.css`
CSS animation utilities and classes:

```css
/* Utility animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Animation utility classes */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-fade-out {
  animation: fadeOut 0.3s ease-in forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.3s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 0.3s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.2s ease-out forwards;
}

.animate-bounce {
  animation: bounce 1s infinite;
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hover animations */
.hover-lift {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.hover-scale {
  transition: transform 0.2s ease-out;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-glow {
  transition: box-shadow 0.2s ease-out;
}

.hover-glow:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}

/* Loading states */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.dark .loading-skeleton {
  background: linear-gradient(90deg, #2a2a2a 25%, #1a1a1a 50%, #2a2a2a 75%);
  background-size: 200% 100%;
}

/* Transition utilities */
.transition-all {
  transition: all 0.2s ease-out;
}

.transition-colors {
  transition: color 0.2s ease-out, background-color 0.2s ease-out, border-color 0.2s ease-out;
}

.transition-transform {
  transition: transform 0.2s ease-out;
}

/* Animation delays */
.delay-75 { animation-delay: 75ms; }
.delay-100 { animation-delay: 100ms; }
.delay-150 { animation-delay: 150ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-500 { animation-delay: 500ms; }
.delay-700 { animation-delay: 700ms; }
.delay-1000 { animation-delay: 1000ms; }

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Animation Hooks (`hooks/`)

#### `useGsapAnimation.ts`
React hook for GSAP integration:

```typescript
import { useEffect, useRef, RefObject } from 'react';
import { gsap } from '../gsap/gsap-config';

interface UseGsapAnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number;
  yoyo?: boolean;
  onComplete?: () => void;
  dependencies?: any[];
}

export const useGsapAnimation = (
  animationFn: (target: RefObject<HTMLElement>) => gsap.core.Timeline | gsap.core.Tween,
  options: UseGsapAnimationOptions = {}
) => {
  const ref = useRef<HTMLElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Kill previous animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Create new animation
    animationRef.current = animationFn(ref);

    // Apply options
    if (animationRef.current && 'duration' in options) {
      if (options.duration !== undefined) animationRef.current.duration(options.duration);
      if (options.delay !== undefined) animationRef.current.delay(options.delay);
      if (options.ease !== undefined) animationRef.current.ease(options.ease);
      if (options.repeat !== undefined) animationRef.current.repeat(options.repeat);
      if (options.yoyo !== undefined) animationRef.current.yoyo(options.yoyo);
      if (options.onComplete) animationRef.current.eventCallback('onComplete', options.onComplete);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, options.dependencies || []);

  return ref;
};
```

#### `useIntersectionAnimation.ts`
Trigger animations on scroll/intersection:

```typescript
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../gsap/gsap-config';

interface UseIntersectionAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationFn?: (element: Element) => gsap.core.Timeline | gsap.core.Tween;
}

export const useIntersectionAnimation = (
  options: UseIntersectionAnimationOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    animationFn,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true);
          setHasTriggered(true);

          // Trigger custom animation
          if (animationFn) {
            animationFn(element);
          }
        } else if (!triggerOnce && !isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered, animationFn]);

  return { ref, isVisible };
};
```

## Performance Guidelines

### Animation Performance
- Use `transform` and `opacity` for smooth animations
- Enable GPU acceleration with `transform3d` or `will-change`
- Avoid animating layout properties (`width`, `height`, `top`, `left`)
- Use `requestAnimationFrame` for custom animations
- Implement proper cleanup to prevent memory leaks

### Mobile Optimization
- Reduce animation complexity on mobile devices
- Use media queries to disable animations on low-end devices
- Implement touch-friendly interactions
- Consider battery usage and performance impact

### Accessibility
- Respect `prefers-reduced-motion` settings
- Provide alternative feedback for users who disable animations
- Ensure animations don't cause seizures or vestibular disorders
- Maintain focus management during transitions

## Testing Animations

### Animation Testing Strategy
```typescript
// Animation test utilities
export const animationTestUtils = {
  // Wait for GSAP animation to complete
  waitForGsapAnimation: async (animation: gsap.core.Timeline | gsap.core.Tween) => {
    return new Promise<void>((resolve) => {
      animation.eventCallback('onComplete', () => resolve());
    });
  },

  // Fast-forward animations for testing
  fastForwardAnimations: () => {
    gsap.globalTimeline.progress(1);
  },

  // Mock animation functions
  mockGsap: () => {
    jest.mock('gsap', () => ({
      to: jest.fn(() => ({ kill: jest.fn() })),
      from: jest.fn(() => ({ kill: jest.fn() })),
      fromTo: jest.fn(() => ({ kill: jest.fn() })),
      timeline: jest.fn(() => ({
        to: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        kill: jest.fn(),
      })),
    }));
  },
};
```

## Future Enhancements

Planned improvements:
- WebGL-based particle systems
- Physics-based animations with matter.js
- Advanced SVG morphing animations
- 3D transforms and perspective effects
- Gesture-based interactions
- Voice-controlled animations
- AR/VR animation support