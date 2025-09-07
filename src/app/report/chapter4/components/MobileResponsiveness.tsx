import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const MobileResponsiveness: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.11 Mobile Responsiveness and Cross-Platform Compatibility</h3>
          <p className="text-gray-300 leading-relaxed">
            The Hive Token Swap Platform is designed with a mobile-first approach to ensure optimal performance and user experience across all devices and platforms. 
            This section details the responsive design strategies, cross-platform compatibility measures, and mobile-specific optimizations implemented in the platform.
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">4.11.1 Responsive Design Principles</h4>
          <p className="text-gray-300 leading-relaxed">
            The platform implements a comprehensive responsive design system based on modern web standards:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Mobile-First Approach</strong>: Design and development starting from mobile constraints and scaling up to desktop</li>
            <li><strong>Flexible Grid System</strong>: CSS Grid and Flexbox for adaptive layouts that respond to screen size changes</li>
            <li><strong>Breakpoint Strategy</strong>: Strategic breakpoints at 640px, 768px, 1024px, and 1280px for optimal device targeting</li>
            <li><strong>Scalable Typography</strong>: Responsive font sizing using relative units (rem) and CSS clamp() for fluid scaling</li>
            <li><strong>Adaptive Images</strong>: Next.js Image component with automatic format selection and responsive sizing</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">4.11.2 Touch Interface Optimization</h4>
          <p className="text-gray-300 leading-relaxed">
            Special attention is given to touch-based interactions to ensure a seamless mobile experience:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Touch Target Sizes</strong>: Minimum 44px touch targets for all interactive elements as recommended by accessibility guidelines</li>
            <li><strong>Gesture Support</strong>: Swipe gestures for navigation and content interaction where appropriate</li>
            <li><strong>Touch Feedback</strong>: Visual and haptic feedback for touch interactions to enhance user confidence</li>
            <li><strong>Prevent Accidental Actions</strong>: Confirmation dialogs for critical operations and proper spacing between action buttons</li>
            <li><strong>Keyboard Accessibility</strong>: Full keyboard navigation support for hybrid devices and accessibility requirements</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">4.11.3 Cross-Platform Compatibility</h4>
          <p className="text-gray-300 leading-relaxed">
            The platform is designed to work consistently across different operating systems and browsers:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Browser Support</strong>: Compatible with modern versions of Chrome, Firefox, Safari, and Edge</li>
            <li><strong>Operating Systems</strong>: Fully functional on Windows, macOS, Linux, iOS, and Android</li>
            <li><strong>Progressive Enhancement</strong>: Core functionality available even in less capable environments</li>
            <li><strong>Feature Detection</strong>: Graceful degradation when advanced features are not supported</li>
            <li><strong>Performance Consistency</strong>: Optimized performance across different hardware capabilities</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">4.11.4 Mobile-Specific Features</h4>
          <p className="text-gray-300 leading-relaxed">
            The platform includes several mobile-specific enhancements to improve the user experience:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Orientation Handling</strong>: Responsive layouts that adapt to both portrait and landscape orientations</li>
            <li><strong>Network Awareness</strong>: Adaptive behavior based on network conditions (online/offline detection)</li>
            <li><strong>Device API Integration</strong>: Utilization of device features like camera for QR code scanning when available</li>
            <li><strong>Installable PWA</strong>: Progressive Web App capabilities for app-like experience on mobile devices</li>
            <li><strong>Push Notifications</strong>: Support for push notifications to keep users informed of important events</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">4.11.5 Performance Optimization for Mobile</h4>
          <p className="text-gray-300 leading-relaxed">
            Special performance considerations are implemented to ensure smooth operation on mobile devices:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Bundle Optimization</strong>: Code splitting and lazy loading to reduce initial load times</li>
            <li><strong>Resource Prioritization</strong>: Critical resources loaded first with non-critical assets deferred</li>
            <li><strong>Image Optimization</strong>: Automatic image compression and format selection based on device capabilities</li>
            <li><strong>Caching Strategies</strong>: Efficient caching to minimize data usage and improve load times</li>
            <li><strong>Battery Efficiency</strong>: Minimized CPU and GPU usage to preserve battery life</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">4.11.6 Testing and Quality Assurance</h4>
          <p className="text-gray-300 leading-relaxed">
            Comprehensive testing ensures consistent performance across all platforms:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Device Testing</strong>: Regular testing on actual devices including various iPhone and Android models</li>
            <li><strong>Browser Testing</strong>: Cross-browser testing using tools like BrowserStack for comprehensive coverage</li>
            <li><strong>Performance Monitoring</strong>: Real user monitoring (RUM) to track performance metrics across devices</li>
            <li><strong>Accessibility Testing</strong>: Regular accessibility audits to ensure compliance with WCAG guidelines</li>
            <li><strong>Automated Testing</strong>: Automated responsive design tests to catch regressions</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">4.11.7 Future Enhancements</h4>
          <p className="text-gray-300 leading-relaxed">
            Planned improvements to further enhance mobile and cross-platform compatibility:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Native Mobile Apps</strong>: Development of dedicated iOS and Android applications for enhanced performance</li>
            <li><strong>Advanced Gesture Support</strong>: Implementation of more complex touch gestures for power users</li>
            <li><strong>Offline Functionality</strong>: Expanded offline capabilities for continued use without network connectivity</li>
            <li><strong>Biometric Authentication</strong>: Integration with device biometric authentication systems</li>
            <li><strong>Dark Mode Synchronization</strong>: Automatic synchronization with system dark mode preferences</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};