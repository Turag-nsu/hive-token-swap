import React from 'react';

export const FrontendArchitecture: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-6">4.7 React/Next.js Frontend Architecture</h3>
      <p className="text-gray-300 leading-relaxed">
        The frontend architecture of the Hive Token Swap Platform is built using modern React and Next.js technologies, 
        following best practices for performance, maintainability, and scalability. This section details the architectural 
        decisions and implementation patterns used throughout the application.
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">4.7.1 Project Structure and Organization</h4>
      <p className="text-gray-300 leading-relaxed">
        The project follows a feature-based organization structure that promotes modularity and maintainability:
      </p>
      <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm mt-2">
{`src/
├── app/                    # Next.js 15 App Router structure
│   ├── report/            # Academic report pages
│   ├── social/            # Social media features
│   ├── swap/              # Token swap functionality
│   ├── wallet/            # Wallet management features
│   └── layout.tsx         # Root layout component
├── components/            # Reusable UI components
│   ├── layout/            # Layout components (Header, Footer, etc.)
│   ├── social/            # Social media UI components
│   ├── swap/              # Token swap UI components
│   ├── ui/                # Primitive UI components (Button, Card, etc.)
│   └── wallet/            # Wallet UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries and helpers
├── providers/             # React context providers
├── services/              # API service layers
├── stores/                # State management (Zustand stores)
├── styles/                # Global styles and Tailwind configuration
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions`}
      </pre>

      <h4 className="text-lg text-cyan-400 mt-6">4.7.2 Component Architecture</h4>
      <p className="text-gray-300 leading-relaxed">
        The component architecture follows a clear separation of concerns:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Presentational Components</strong>: Pure UI components with no business logic</li>
        <li><strong>Container Components</strong>: Components that manage state and business logic</li>
        <li><strong>Compound Components</strong>: Components that work together to provide complex functionality</li>
        <li><strong>Hooks</strong>: Custom hooks for reusable logic and state management</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">4.7.3 State Management Implementation</h4>
      <p className="text-gray-300 leading-relaxed">
        The platform implements a hybrid state management approach:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>React Query</strong>: For server state management and API caching</li>
        <li><strong>Zustand</strong>: For complex client state management</li>
        <li><strong>React Context</strong>: For global application state (theme, wallet connection)</li>
        <li><strong>Component State</strong>: For local UI state management</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">4.7.4 Routing and Navigation</h4>
      <p className="text-gray-300 leading-relaxed">
        The application leverages Next.js 15 App Router for advanced routing capabilities:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>File-based Routing</strong>: Automatic route generation based on file structure</li>
        <li><strong>Dynamic Routes</strong>: Parameterized URLs for user profiles and content</li>
        <li><strong>Parallel Routes</strong>: Simultaneous loading of multiple route segments</li>
        <li><strong>Route Handlers</strong>: API endpoints defined within the app directory</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">4.7.5 Performance Optimization Techniques</h4>
      <p className="text-gray-300 leading-relaxed">
        Several performance optimization strategies are implemented:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Code Splitting</strong>: Automatic code splitting through Next.js dynamic imports</li>
        <li><strong>Image Optimization</strong>: Next.js Image component for automatic optimization</li>
        <li><strong>Font Optimization</strong>: Next.js Font Optimization for faster loading</li>
        <li><strong>Caching Strategies</strong>: Client-side caching with React Query and browser caching</li>
        <li><strong>Bundle Analysis</strong>: Regular analysis to identify and eliminate unused code</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">4.7.6 Styling and UI Framework</h4>
      <p className="text-gray-300 leading-relaxed">
        The platform uses a combination of modern styling technologies:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Tailwind CSS</strong>: Utility-first CSS framework for rapid UI development</li>
        <li><strong>Radix UI</strong>: Accessible UI primitives for complex components</li>
        <li><strong>Framer Motion</strong>: Animation library for smooth transitions</li>
        <li><strong>Custom Design System</strong>: Consistent design tokens and component library</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">4.7.7 Build and Deployment Process</h4>
      <p className="text-gray-300 leading-relaxed">
        The build and deployment process is optimized for performance:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Next.js Compiler</strong>: Turbopack for fast compilation and hot reloading</li>
        <li><strong>Tree Shaking</strong>: Automatic removal of unused code during build</li>
        <li><strong>Minification</strong>: JavaScript and CSS minification for smaller bundles</li>
        <li><strong>Environment Variables</strong>: Secure handling of configuration values</li>
      </ul>
    </div>
  );
};