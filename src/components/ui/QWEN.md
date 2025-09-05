# UI Components Directory

This directory contains primitive, reusable UI components that form the foundation of our design system. These components are built with accessibility, consistency, and flexibility in mind.

## Overview

UI components are the building blocks of the application interface. They are:
- **Primitive**: Basic, single-purpose components
- **Reusable**: Used throughout the application
- **Consistent**: Follow design system guidelines
- **Accessible**: WCAG 2.1 AA compliant
- **Typed**: Full TypeScript support

## Component List

### Form Components
- `Button` - Primary action buttons with variants
- `Input` - Text input fields with validation
- `Select` - Dropdown selection component
- `Checkbox` - Checkbox input with custom styling
- `Switch` - Toggle switch component
- `Label` - Form field labels
- `FormError` - Error message display

### Layout Components
- `Card` - Content containers with elevation
- `Modal` - Overlay dialogs and modals
- `Drawer` - Side panel component
- `Separator` - Visual content dividers
- `Stack` - Vertical/horizontal layout container
- `Grid` - CSS Grid layout wrapper

### Feedback Components
- `Toast` - Notification messages
- `AlertDialog` - Confirmation dialogs
- `Progress` - Progress indicators
- `Skeleton` - Loading placeholders
- `Spinner` - Loading spinner
- `Badge` - Status indicators

### Data Display
- `Table` - Data table component
- `Avatar` - User profile images
- `Tooltip` - Contextual information
- `Popover` - Floating content panels
- `Accordion` - Collapsible content sections

## Implementation Standards

### Component Structure
```tsx
// ComponentName.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

// Variant definitions
const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'primary-classes',
        secondary: 'secondary-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
        lg: 'large-classes',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Props interface
interface ComponentNameProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  children: React.ReactNode;
  disabled?: boolean;
}

// Component implementation
export const ComponentName = React.forwardRef<
  HTMLElement,
  ComponentNameProps
>(({ className, variant, size, children, disabled, ...props }, ref) => {
  return (
    <element
      ref={ref}
      className={cn(componentVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </element>
  );
});

ComponentName.displayName = 'ComponentName';

export { componentVariants };
export type { ComponentNameProps };
```

### Variant System
Using `class-variance-authority` for consistent component variants:

```tsx
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### Accessibility Requirements

All UI components must:
- Support keyboard navigation
- Have proper ARIA attributes
- Provide screen reader support
- Meet color contrast requirements
- Support high contrast mode
- Work with assistive technologies

### Animation Integration

Components should support smooth animations:
```tsx
// Using Framer Motion
import { motion } from 'framer-motion';

const AnimatedButton = motion(Button);

// Usage
<AnimatedButton
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</AnimatedButton>
```

### Dark Mode Support

Components should support both light and dark themes:
```css
/* Use CSS variables for theming */
.component {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  border-color: hsl(var(--border));
}
```

## Testing Standards

### Unit Tests
```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Accessibility Tests
```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('should not have any accessibility violations', async () => {
  const { container } = render(<Button>Accessible button</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Documentation Standards

Each component should include:
- JSDoc comments for props
- Usage examples
- Accessibility notes
- Performance considerations

```tsx
/**
 * Button component with multiple variants and sizes
 * 
 * @example
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Primary Action
 * </Button>
 * 
 * @accessibility
 * - Supports keyboard navigation with Enter and Space keys
 * - Provides proper focus indicators
 * - Screen reader compatible
 */
```

## Performance Guidelines

- Use `React.memo()` for components that receive stable props
- Implement `useCallback()` for event handlers passed as props
- Use `useMemo()` for expensive calculations
- Avoid inline object/function creation in render

## Future Enhancements

Planned improvements:
- Storybook integration for visual testing
- Chromatic for visual regression testing
- Additional animation presets
- Enhanced theming system
- Component composition utilities