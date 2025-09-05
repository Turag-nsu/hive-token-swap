# Styles Directory

This directory contains CSS architecture, design tokens, and styling configurations for the Hive token swap application.

## Overview

The styles system provides:
- **Design Tokens**: Colors, typography, spacing, shadows
- **Global Styles**: Base styles, resets, utilities
- **Component Styles**: Modular CSS for components
- **Theme System**: Dark/light mode support
- **Responsive Design**: Mobile-first approach

## Architecture

```
styles/
├── tokens/           # Design tokens (colors, typography, spacing)
├── base/             # Reset, normalize, base styles
├── components/       # Component-specific styles
├── utilities/        # Utility classes
├── themes/           # Theme configurations
├── responsive/       # Breakpoint system
└── README.md
```

## Design Tokens

### Color System
```css
:root {
  /* Primary palette */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-900: #1e3a8a;
  
  /* Semantic colors */
  --color-background: var(--color-white);
  --color-foreground: var(--color-secondary-900);
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
}

[data-theme="dark"] {
  --color-background: var(--color-secondary-950);
  --color-foreground: var(--color-secondary-50);
}
```

### Typography Scale
```css
:root {
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
}
```

### Spacing System
```css
:root {
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-4: 1rem;       /* 16px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
}
```

## Component Architecture

### CSS Modules Pattern
```css
/* TokenCard.module.css */
.container {
  background: var(--color-card);
  border-radius: 0.75rem;
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: all 0.2s ease-out;
}

.container:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-foreground);
}
```

### Utility Classes
```css
/* Layout utilities */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-4 { gap: var(--space-4); }

/* Spacing utilities */
.p-4 { padding: var(--space-4); }
.m-2 { margin: var(--space-2); }
.mb-6 { margin-bottom: var(--space-6); }

/* Typography utilities */
.text-lg { font-size: var(--text-lg); }
.font-semibold { font-weight: var(--font-semibold); }
.text-muted { color: var(--color-muted-foreground); }
```

## Responsive Design

### Breakpoint System
```css
:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
}

.container {
  width: 100%;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    margin: 0 auto;
  }
}
```

### Mobile-First Approach
```css
/* Mobile first */
.swap-interface {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Tablet and up */
@media (min-width: 768px) {
  .swap-interface {
    flex-direction: row;
    gap: var(--space-8);
  }
}
```

## Animation Integration

### CSS Transitions
```css
.animated-element {
  transition: all 0.2s ease-out;
}

.animated-element:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}
```

### CSS Animations
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

## Theme System

### Theme Variables
```css
:root {
  --theme-primary: var(--color-primary-500);
  --theme-background: var(--color-background);
  --theme-text: var(--color-foreground);
}

[data-theme="dark"] {
  --theme-background: var(--color-secondary-950);
  --theme-text: var(--color-secondary-50);
}
```

### Theme Toggle Implementation
```tsx
// Component usage
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <button 
      className="theme-toggle"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
};
```

## Performance Best Practices

### Optimization Strategies
- Use CSS custom properties for dynamic values
- Minimize CSS bundle size with purging
- Implement critical CSS loading
- Use efficient selectors
- Leverage browser caching

### Loading Strategy
```css
/* Critical CSS - inline in HTML */
.above-fold {
  /* Styles for above-the-fold content */
}

/* Non-critical CSS - loaded asynchronously */
@import url('/styles/non-critical.css') print;
```

## Testing Approach

### Visual Regression Testing
- Snapshot testing with Storybook
- Cross-browser compatibility
- Responsive design validation
- Dark/light theme consistency

### Accessibility Testing
- Color contrast validation
- Focus indicator visibility
- Screen reader compatibility
- Keyboard navigation support

## Future Enhancements

- CSS-in-JS integration for dynamic styling
- Advanced theming with color space calculations
- Container queries for component-level responsiveness
- CSS custom properties for runtime theme switching