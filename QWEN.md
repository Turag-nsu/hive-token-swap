# Hive Token Swap

A modern, futuristic cryptocurrency token swap application built for the Hive blockchain ecosystem. Features HiveKeychain integration, real-time price feeds, and advanced UI/UX with GSAP animations.

## 🚀 Features

- **Hive Blockchain Integration**: Native support for HIVE, HBD, and Hive Engine tokens
- **HiveKeychain Wallet**: Secure wallet connection and transaction signing
- **HiveSigner Authentication**: OAuth-based authentication as an alternative to HiveKeychain
- **Real-time Price Feeds**: Live market data and swap rate calculations
- **Advanced UI/UX**: Futuristic design with GSAP animations and smooth transitions
- **Mobile Responsive**: Optimized for all devices with touch-friendly interactions
- **Dark/Light Theme**: Comprehensive theming system with system preference detection
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Modular Architecture**: Clean, scalable codebase with separation of concerns

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 15 (Canary)** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible component library

### State Management & Data
- **React Query** - Server state management and caching
- **Zustand** - Client state management (if needed)
- **React Hook Form** - Form handling and validation
- **Zod** - Schema validation

### Blockchain Integration
- **@hiveio/dhive** - Hive blockchain client
- **HiveKeychain** - Wallet integration
- **HiveSigner** - Alternative wallet authentication
- **Hive Engine API** - Token operations

### Animations & UX
- **GSAP** - High-performance animations
- **Framer Motion** - React animation library
- **View Transitions API** - Native browser transitions
- **Lucide React** - Beautiful icons

### Development Tools
- **ESLint** - Code linting with custom rules
- **Prettier** - Code formatting
- **Jest** - Unit testing
- **React Testing Library** - Component testing

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/           # React components
│   ├── ui/              # Primitive UI components
│   ├── layout/          # Layout components
│   ├── swap/            # Swap-specific components
│   └── wallet/          # Wallet components
├── hooks/               # Custom React hooks
├── lib/                 # Shared libraries and utilities
├── types/               # TypeScript type definitions
├── providers/           # React Context providers
├── constants/           # Application constants
├── utils/               # Utility functions
├── animations/          # GSAP and animation configs
└── styles/              # CSS and styling
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- HiveKeychain extension OR HiveSigner account (for wallet functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hive-token-swap.git
   cd hive-token-swap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_HIVE_RPC_URL=https://anyx.io
   NEXT_PUBLIC_HIVE_ENGINE_API=https://engine-api.rishipanthee.com
   NEXT_PUBLIC_APP_NAME=Hive Token Swap
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

### Code Style

This project uses ESLint and Prettier for code formatting:

```bash
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting errors
npm run format       # Format code with Prettier
```

### Component Development

Create new components using the established patterns:

```tsx
// components/ui/NewComponent.tsx
import React from 'react';
import { cn } from '@/utils';

interface NewComponentProps {
  className?: string;
  children: React.ReactNode;
}

export const NewComponent: React.FC<NewComponentProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn('base-styles', className)}>
      {children}
    </div>
  );
};
```

## 🎨 Design System

### Colors
- **Primary**: Blue shades for main actions
- **Secondary**: Gray shades for neutral elements  
- **Accent**: Green shades for success states
- **Status Colors**: Red (error), Yellow (warning), Blue (info)

### Typography
- **Font Family**: Inter (primary), JetBrains Mono (code)
- **Scale**: 12px to 96px with consistent ratios
- **Weights**: 300, 400, 500, 600, 700

### Spacing
- **Scale**: 4px base unit (0.25rem)
- **Component Spacing**: 8px, 16px, 24px, 32px
- **Layout Spacing**: 48px, 64px, 96px, 128px

### Animations
- **Duration**: 150ms (fast), 300ms (normal), 500ms (slow)
- **Easing**: ease-out (entries), ease-in (exits)
- **GSAP**: Complex sequences and timelines
- **Framer Motion**: Component-level animations

## 🔗 Blockchain Integration

### Hive Blockchain
The app integrates with Hive blockchain for:
- Account authentication via HiveKeychain
- Native HIVE and HBD token operations
- Resource Credits (RC) management
- Transaction broadcasting and monitoring

### Hive Engine
Support for Hive Engine tokens:
- Token metadata and balances
- Market data and trading pairs
- Swap operations and liquidity
- Custom token integration

### Wallet Integration
HiveKeychain provides:
- Secure key management
- Transaction signing
- Account switching
- Broadcast operations

### HiveSigner Integration
HiveSigner provides an alternative authentication method:
- OAuth2-based authentication flow
- Secure token management
- Access to extended Hive operations
- Mobile-friendly authentication

## 📱 Mobile Support

The application is fully responsive with:
- Touch-optimized interactions
- Mobile-first design approach
- Progressive Web App (PWA) capabilities
- Offline functionality (planned)

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Component logic and utilities
- **Integration Tests**: Component interactions
- **HiveSigner Tests**: Authentication and blockchain operations
- **E2E Tests**: Full user workflows (planned)

### Running Tests
```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### Writing Tests
```tsx
// Component.test.tsx
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

// HiveSigner Test Example
import { renderHook, act } from '@testing-library/react';
import { useHiveSignerAuth } from './useHiveSigner';

describe('useHiveSignerAuth', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useHiveSignerAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

## 🚀 Deployment

### Build Process
```bash
npm run build     # Create production build
npm run start     # Start production server
```

### Environment Setup
Configure production environment variables:
- API endpoints
- RPC node URLs
- Analytics keys
- Error reporting

### Performance Optimization
- Code splitting and lazy loading
- Image optimization
- Bundle analysis
- Caching strategies

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests for new functionality**
5. **Run the test suite**
   ```bash
   npm test
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
7. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Code Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Add JSDoc comments for complex functions
- Ensure accessibility compliance
- Write tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hive Blockchain](https://hive.io) - The decentralized blockchain platform
- [HiveKeychain](https://hive-keychain.com) - Secure Hive wallet
- [shadcn/ui](https://ui.shadcn.com) - Beautiful component library
- [GSAP](https://greensock.com/gsap/) - Professional animation library

## 📞 Support

For support, email support@example.com or join our [Discord](https://discord.gg/example).

## 🗺️ Roadmap

- [x] **Phase 1**: Basic swap functionality (Completed)
- [x] **Phase 2**: Implement HiveSigner authentication (Completed)
- [ ] **Phase 3**: Advanced trading features
- [ ] **Phase 4**: Liquidity mining and rewards
- [ ] **Phase 5**: Cross-chain bridge integration
- [ ] **Phase 6**: Mobile app development

---

Built with ❤️ for the Hive community