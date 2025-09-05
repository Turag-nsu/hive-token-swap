# Layout Components Directory

This directory contains high-level layout components that define the overall structure and navigation of the application.

## Overview

Layout components provide the structural foundation for the application:
- **Page Structure**: Define overall page layouts
- **Navigation**: Handle routing and navigation UI
- **Responsive Design**: Adapt to different screen sizes
- **Global State**: Integrate with application-wide state
- **Accessibility**: Provide navigation landmarks

## Components

### Core Layout Components

#### `AppLayout.tsx`
Main application layout wrapper that provides:
- Global navigation structure
- Responsive breakpoint handling
- Theme provider integration
- Error boundary wrapper
- Loading state management

#### `Header.tsx`
Application header containing:
- Logo and branding
- Navigation menu
- Wallet connection status
- User account dropdown
- Theme toggle
- Mobile menu trigger

#### `Sidebar.tsx`
Side navigation panel with:
- Main navigation links
- Quick actions
- Collapsible sections
- Mobile responsive behavior
- Active route highlighting

#### `Footer.tsx`
Application footer featuring:
- Links to documentation
- Social media links
- Legal information
- Version information
- Network status indicator

#### `PageContainer.tsx`
Individual page wrapper providing:
- Consistent page margins
- Content max-width
- Loading states
- Error boundaries
- SEO meta tags

### Specialized Layouts

#### `SwapLayout.tsx`
Optimized layout for the swap interface:
- Two-column design on desktop
- Stacked layout on mobile
- Chart integration area
- Transaction status panel

#### `WalletLayout.tsx`
Layout for wallet-focused pages:
- Account overview sidebar
- Balance display area
- Transaction history section
- Settings integration

#### `DashboardLayout.tsx`
Dashboard-style layout with:
- Widget grid system
- Customizable sections
- Drag-and-drop support
- Real-time data updates

## Implementation Patterns

### Layout Component Structure
```tsx
// AppLayout.tsx
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { cn } from '@/utils';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showSidebar = true,
  className,
}) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <Header />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className="flex-1 container mx-auto py-6">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};
```

### Responsive Design Patterns
```tsx
// Responsive navigation
const navigation = [
  { name: 'Swap', href: '/swap', icon: ArrowRightLeft },
  { name: 'Portfolio', href: '/portfolio', icon: PieChart },
  { name: 'History', href: '/history', icon: Clock },
];

return (
  <nav className="space-y-1">
    {navigation.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className={cn(
          'flex items-center px-4 py-2 text-sm font-medium rounded-md',
          'hover:bg-accent hover:text-accent-foreground',
          'md:px-6 lg:px-8', // Responsive padding
          isActive(item.href) && 'bg-accent text-accent-foreground'
        )}
      >
        <item.icon className="mr-3 h-5 w-5" />
        <span className="hidden md:block">{item.name}</span>
      </Link>
    ))}
  </nav>
);
```

### Mobile Navigation
```tsx
// Mobile menu implementation
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

return (
  <>
    {/* Mobile menu button */}
    <button
      className="md:hidden p-2 rounded-md"
      onClick={() => setIsMobileMenuOpen(true)}
    >
      <Menu className="h-6 w-6" />
    </button>

    {/* Mobile menu overlay */}
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetContent side="left" className="w-80">
        <nav className="flex flex-col space-y-4">
          {/* Navigation items */}
        </nav>
      </SheetContent>
    </Sheet>
  </>
);
```

## State Management Integration

### Wallet Connection State
```tsx
import { useWallet } from '@/providers/WalletProvider';

export const Header: React.FC = () => {
  const { user, isConnected, connect, disconnect } = useWallet();

  return (
    <header className="border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Logo />
        <nav>
          {/* Navigation items */}
        </nav>
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <UserMenu user={user} onDisconnect={disconnect} />
          ) : (
            <Button onClick={connect}>Connect Wallet</Button>
          )}
        </div>
      </div>
    </header>
  );
};
```

### Theme Integration
```tsx
import { useTheme } from '@/providers/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};
```

## Accessibility Standards

### Semantic Structure
```tsx
return (
  <div className="min-h-screen">
    <header role="banner">
      {/* Header content */}
    </header>
    
    <nav role="navigation" aria-label="Main navigation">
      {/* Navigation content */}
    </nav>
    
    <main role="main" id="main-content">
      {children}
    </main>
    
    <footer role="contentinfo">
      {/* Footer content */}
    </footer>
  </div>
);
```

### Skip Links
```tsx
return (
  <>
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-4 py-2 rounded"
    >
      Skip to main content
    </a>
    {/* Layout content */}
  </>
);
```

### ARIA Landmarks
```tsx
<nav aria-label="Breadcrumb" className="mb-6">
  <ol className="flex items-center space-x-2">
    <li><Link href="/">Home</Link></li>
    <li aria-current="page">Swap</li>
  </ol>
</nav>
```

## Animation Integration

### Page Transitions
```tsx
import { motion, AnimatePresence } from 'framer-motion';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
```

### Sidebar Animations
```tsx
const sidebarVariants = {
  open: {
    width: '16rem',
    transition: { duration: 0.3, ease: 'easeInOut' }
  },
  closed: {
    width: '4rem',
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};
```

## Performance Considerations

### Code Splitting
```tsx
import dynamic from 'next/dynamic';

const DynamicSidebar = dynamic(() => import('./Sidebar'), {
  loading: () => <SidebarSkeleton />,
  ssr: false
});
```

### Memoization
```tsx
const MemoizedHeader = React.memo(Header);
const MemoizedSidebar = React.memo(Sidebar);
```

## Testing Strategies

### Layout Testing
```tsx
describe('AppLayout', () => {
  it('renders all layout components', () => {
    render(
      <AppLayout>
        <div>Test content</div>
      </AppLayout>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
```

### Responsive Testing
```tsx
it('adapts to mobile viewport', () => {
  global.innerWidth = 375;
  global.dispatchEvent(new Event('resize'));
  
  render(<Header />);
  expect(screen.getByTestId('mobile-menu-button')).toBeVisible();
});
```

## SEO Integration

### Meta Tags
```tsx
import Head from 'next/head';

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  children
}) => {
  return (
    <>
      <Head>
        <title>{title} | Hive Token Swap</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className="container mx-auto py-6">
        {children}
      </div>
    </>
  );
};
```

## Future Enhancements

Planned improvements:
- Progressive Web App (PWA) support
- Advanced animation sequences
- Customizable layout preferences
- Enhanced mobile gestures
- Layout analytics integration