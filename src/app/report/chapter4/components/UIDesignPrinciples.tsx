import React from 'react';

export const UIDesignPrinciples: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-6">4.10 User Interface Design Principles and Mockups</h3>
      <p className="text-gray-300 leading-relaxed">
        The user interface of the Hive Token Swap Platform is designed with a focus on usability, aesthetics, and functionality. 
        This section outlines the design principles that guide the interface development and presents detailed mockups of key 
        components to illustrate the user experience.
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">4.10.1 Design Principles</h4>
      <p className="text-gray-300 leading-relaxed">
        The interface design follows several core principles to ensure an optimal user experience:
      </p>
      
      <h5 className="text-md text-blue-400 mt-3">4.10.1.1 Simplicity and Clarity</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Minimalist Approach</strong>: Clean layouts with ample whitespace to reduce cognitive load</li>
        <li><strong>Clear Hierarchy</strong>: Visual hierarchy that guides users through tasks intuitively</li>
        <li><strong>Consistent Patterns</strong>: Reusable components and interaction patterns throughout the platform</li>
      </ul>

      <h5 className="text-md text-blue-400 mt-3">4.10.1.2 Accessibility</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>WCAG Compliance</strong>: Adherence to Web Content Accessibility Guidelines (WCAG) 2.1 AA standards</li>
        <li><strong>Keyboard Navigation</strong>: Full functionality available through keyboard interactions</li>
        <li><strong>Screen Reader Support</strong>: Semantic HTML and ARIA attributes for assistive technologies</li>
      </ul>

      <h5 className="text-md text-blue-400 mt-3">4.10.1.3 Responsive Design</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Mobile-First Approach</strong>: Design starting from mobile constraints and scaling up</li>
        <li><strong>Flexible Grid System</strong>: CSS Grid and Flexbox for adaptive layouts</li>
        <li><strong>Touch-Friendly Interactions</strong>: Adequate touch targets and gesture support</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">4.10.2 Color System and Typography</h4>
      <p className="text-gray-300 leading-relaxed">
        The visual design system establishes a cohesive aesthetic while maintaining readability and brand identity:
      </p>
      
      <h5 className="text-md text-blue-400 mt-3">4.10.2.1 Color Palette</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Primary Colors</strong>: Hive orange (#ff6600) and complementary blues for trust and professionalism</li>
        <li><strong>Neutral Palette</strong>: Dark theme with grays (#1a1a1a to #2d2d2d) for reduced eye strain</li>
        <li><strong>Status Colors</strong>: Semantic colors for success, warning, error, and informational states</li>
        <li><strong>Accessibility Contrast</strong>: Minimum 4.5:1 contrast ratio for all text elements</li>
      </ul>

      <h5 className="text-md text-blue-400 mt-3">4.10.2.2 Typography System</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Font Choices</strong>: Inter for body text (high readability) and Space Grotesk for headings (modern aesthetic)</li>
        <li><strong>Type Scale</strong>: Consistent 1.25 modular scale for hierarchical typography</li>
        <li><strong>Line Length</strong>: Optimal 45-75 characters per line for readability</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">4.10.3 Key Component Mockups</h4>
      <p className="text-gray-300 leading-relaxed">
        Detailed mockups illustrate the implementation of design principles in key interface components:
      </p>
      
      <h5 className="text-md text-blue-400 mt-3">4.10.3.1 Wallet Dashboard</h5>
      <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm mt-2">
{`┌─────────────────────────────────────────────────────────────────────┐
│  Wallet Dashboard                                          [⚙] [🔔] │
├─────────────────────────────────────────────────────────────────────┤
│  HIVE Balance: 1,250.50 HIVE         │  HBD Balance: 85.25 HBD      │
│  Hive Power: 5,000.00 HP             │  Savings: 250.00 HIVE        │
├─────────────────────────────────────────────────────────────────────┤
│  [Send] [Receive] [Swap] [Stake]                                    │
├─────────────────────────────────────────────────────────────────────┤
│  Recent Transactions                                                │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │  Transfer to @user1         +25.00 HIVE        2 hours ago     │ │
│  │  Market Sell                -100.00 HIVE       1 day ago       │ │
│  │  Author Reward              +1.25 HBD          2 days ago      │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘`}
      </pre>

      <h5 className="text-md text-blue-400 mt-3">4.10.3.2 Token Swap Interface</h5>
      <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm mt-2">
{`┌─────────────────────────────────────────────────────────────────────┐
│  Token Swap                                                         │
├─────────────────────────────────────────────────────────────────────┤
│  From: [HIVE         ▼] [100.00      ] [MAX]                        │
│        Balance: 1,250.50 HIVE                                       │
│                                                                     │
│         ↕️  Slippage: 0.5%                                         │
│                                                                     │
│  To:   [SWAP.HIVE    ▼] [98.75       ]                              │
│        Balance: 500.25 SWAP.HIVE                                    │
│                                                                     │
│  Rate: 1 HIVE = 0.9875 SWAP.HIVE     Estimated Output               │
│  Fee:  0.25 HIVE (0.25%)             Network Fee                    │
├─────────────────────────────────────────────────────────────────────┤
│  [Connect Wallet]  or  [Swap Tokens]                                │
└─────────────────────────────────────────────────────────────────────┘`}
      </pre>

      <h5 className="text-md text-blue-400 mt-3">4.10.3.3 Social Feed</h5>
      <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm mt-2">
{`┌─────────────────────────────────────────────────────────────────────┐
│  Social Feed                                              [🔍] [+]  │
├─────────────────────────────────────────────────────────────────────┤
│  [For You] [Trending] [Following] [Communities]                     │
├─────────────────────────────────────────────────────────────────────┤
│  @user1 • 3 hours ago                                    [⋯]       │
│  Just completed my first token swap on the new platform! 🚀        │
│  The interface is so intuitive.                                     │
│  [❤ 24] [💬 5] [🔄 3] [🔖]                                          │
│                                                                     │
│  ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│  @user2 • 1 day ago                                      [⋯]       │
│  [Image]                                                            │
│  Our community has grown by 50% this month! Thank you all for       │
│  your support and engagement.                                       │
│  [❤ 142] [💬 27] [🔄 18] [🔖]                                        │
└─────────────────────────────────────────────────────────────────────┘`}
      </pre>

      <h4 className="text-lg text-cyan-400 mt-6">4.10.4 Interaction Design</h4>
      <p className="text-gray-300 leading-relaxed">
        Thoughtful interaction design enhances usability and provides clear feedback:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Microinteractions</strong>: Subtle animations for button states, loading indicators, and success feedback</li>
        <li><strong>Loading States</strong>: Skeleton screens and progress indicators for perceived performance</li>
        <li><strong>Error Handling</strong>: Contextual error messages with actionable solutions</li>
        <li><strong>Form Validation</strong>: Real-time validation with clear guidance for corrections</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">4.10.5 Design System Implementation</h4>
      <p className="text-gray-300 leading-relaxed">
        The design system ensures consistency and scalability across the platform:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Component Library</strong>: Reusable React components with consistent styling and behavior</li>
        <li><strong>Design Tokens</strong>: Centralized values for colors, spacing, typography, and breakpoints</li>
        <li><strong>Documentation</strong>: Comprehensive style guide and component documentation</li>
        <li><strong>Version Control</strong>: Semantic versioning for design system releases</li>
      </ul>
    </div>
  );
};