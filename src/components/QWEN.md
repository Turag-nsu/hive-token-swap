# Components Directory

This directory contains all React components organized by functionality and complexity level.

## Structure

```
components/
├── ui/           # Primitive UI components (buttons, inputs, etc.)
├── layout/       # Layout components (headers, footers, sidebars)
├── swap/         # Swap-specific components
├── wallet/       # Wallet connection and management components
└── README.md     # This file
```

## Component Architecture

### Design Principles
- **Atomic Design**: Components are organized from atoms (basic UI) to organisms (complex features)
- **Single Responsibility**: Each component has one clear purpose
- **Composition over Inheritance**: Components are built by composing smaller components
- **Props Interface**: All components have well-defined TypeScript interfaces
- **Accessibility**: All components follow WCAG guidelines

### Naming Conventions
- Component files use PascalCase (e.g., `TokenSelector.tsx`)
- Component directories use kebab-case (e.g., `token-selector/`)
- Hook files start with "use" (e.g., `useTokenBalance.ts`)

### File Structure for Complex Components
```
component-name/
├── index.tsx              # Main component export
├── ComponentName.tsx      # Component implementation
├── ComponentName.test.tsx # Unit tests
├── ComponentName.stories.tsx # Storybook stories (if applicable)
├── hooks/                 # Component-specific hooks
├── utils/                 # Component-specific utilities
└── types.ts              # Component-specific types
```

## Component Categories

### UI Components (`ui/`)
Primitive, reusable components that form the foundation of the design system:
- Buttons, Inputs, Cards, Modals
- Form elements, Loading states, Icons
- Layout primitives (Grid, Stack, Spacer)

### Layout Components (`layout/`)
High-level layout and navigation components:
- Header with wallet connection
- Navigation sidebar/menu
- Footer with links and info
- Page wrappers and containers

### Swap Components (`swap/`)
Features specific to token swapping:
- Token selection interface
- Amount input with validation
- Swap preview and confirmation
- Price display and charts
- Slippage settings

### Wallet Components (`wallet/`)
Wallet connection and management:
- Connection button and modal
- Account information display
- Balance overview
- Transaction history
- Disconnect functionality

## Development Guidelines

### Props and TypeScript
```tsx
interface ComponentProps {
  // Required props first
  title: string;
  onAction: () => void;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  
  // Children and render props
  children?: React.ReactNode;
  renderCustom?: (data: SomeType) => React.ReactNode;
}
```

### State Management
- Use `useState` for local component state
- Use `useReducer` for complex state logic
- Use React Query for server state
- Use Context for shared application state

### Error Handling
- All components should handle error states gracefully
- Use Error Boundaries for component-level error handling
- Provide fallback UI for failed states

### Performance
- Use `React.memo()` for expensive re-renders
- Implement proper `useMemo()` and `useCallback()` optimization
- Lazy load heavy components with `React.lazy()`

### Testing
- Unit tests for all components using Jest + React Testing Library
- Integration tests for component interactions
- Visual regression tests with Storybook (if applicable)

### Accessibility
- Semantic HTML elements
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Import Guidelines

```tsx
// External imports first
import React from 'react';
import { motion } from 'framer-motion';

// Internal imports by category
import { Button } from '@/components/ui';
import { useWallet } from '@/hooks';
import { formatTokenAmount } from '@/utils';
import type { TokenSwapProps } from '@/types';

// Relative imports last
import './ComponentName.styles.css';
```

## Animation Standards

All animations should use:
- Framer Motion for complex animations
- CSS transitions for simple hover states
- GSAP for advanced timeline animations
- Consistent duration and easing values from theme

## Responsive Design

Components should be mobile-first and responsive:
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on multiple screen sizes
- Ensure touch-friendly interactions on mobile

## Common Patterns

### Loading States
```tsx
if (isLoading) {
  return <LoadingSkeleton />;
}

if (error) {
  return <ErrorMessage error={error} onRetry={refetch} />;
}

return <ActualComponent data={data} />;
```

### Conditional Rendering
```tsx
return (
  <div>
    {showHeader && <Header />}
    {items.map(item => (
      <ItemComponent key={item.id} item={item} />
    ))}
    {items.length === 0 && <EmptyState />}
  </div>
);
```

### Event Handling
```tsx
const handleSubmit = useCallback((event: React.FormEvent) => {
  event.preventDefault();
  // Handle submission
}, [dependencies]);
```

## Style Guidelines

- Use Tailwind CSS classes primarily
- Custom CSS modules for component-specific styles
- CSS variables for dynamic theming
- Consistent spacing using Tailwind scale
- Follow the design system color palette