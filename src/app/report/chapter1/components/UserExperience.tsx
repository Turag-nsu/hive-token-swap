import React from 'react';

export const UserExperience: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl text-blue-400 mb-4">1.6 User Experience and Accessibility Considerations</h2>
        <p className="text-gray-300 leading-relaxed">
          Creating an inclusive and intuitive user experience is paramount for the success of the Hive Token Swap Platform. 
          This section details the user experience design principles, accessibility features, and usability considerations 
          that guide the development of the platform.
        </p>

        <h3 className="text-xl text-purple-400 mt-6">1.6.1 User Experience Design Principles</h3>
        <p className="text-gray-300 leading-relaxed">
          The platform adheres to established UX design principles to ensure an intuitive and engaging user experience:
        </p>
        
        <h4 className="text-lg text-cyan-400 mt-4">1.6.1.1 User-Centered Design</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>User Research</strong>: Regular user feedback collection through surveys and usability testing</li>
          <li><strong>Personas and Journey Maps</strong>: Defined user personas and journey maps to guide design decisions</li>
          <li><strong>Iterative Design</strong>: Continuous refinement based on user feedback and analytics</li>
          <li><strong>Task Analysis</strong>: Breakdown of user tasks to optimize workflow efficiency</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.6.1.2 Intuitive Navigation</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Consistent Layout</strong>: Standardized layout patterns across all pages and sections</li>
          <li><strong>Clear Information Architecture</strong>: Logical grouping and categorization of features</li>
          <li><strong>Breadcrumb Navigation</strong>: Contextual navigation aids for complex workflows</li>
          <li><strong>Search Functionality</strong>: Powerful search with filtering and autocomplete capabilities</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.6.1.3 Feedback and Communication</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Real-time Feedback</strong>: Immediate visual and textual feedback for user actions</li>
          <li><strong>Progress Indicators</strong>: Clear indication of loading states and process completion</li>
          <li><strong>Error Prevention</strong>: Proactive validation and guidance to prevent user errors</li>
          <li><strong>Success Confirmation</strong>: Clear confirmation of successful actions and transactions</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.6.2 Accessibility Implementation</h3>
        <p className="text-gray-300 leading-relaxed">
          The platform is designed and developed with accessibility as a core principle to ensure inclusivity for all users:
        </p>
        
        <h4 className="text-lg text-cyan-400 mt-4">1.6.2.1 WCAG Compliance</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Level AA Conformance</strong>: Adherence to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
          <li><strong>Color Contrast</strong>: Minimum 4.5:1 contrast ratio for all text elements</li>
          <li><strong>Alternative Text</strong>: Comprehensive alt text for all informative images</li>
          <li><strong>Keyboard Navigation</strong>: Full functionality available through keyboard interactions</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.6.2.2 Screen Reader Support</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Semantic HTML</strong>: Proper use of HTML elements for meaningful structure</li>
          <li><strong>ARIA Attributes</strong>: Implementation of ARIA roles and properties for dynamic content</li>
          <li><strong>Landmark Regions</strong>: Clear identification of page regions for navigation</li>
          <li><strong>Focus Management</strong>: Logical focus order and visible focus indicators</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.6.2.3 Assistive Technology Compatibility</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Screen Magnification</strong>: Support for zoom levels up to 200%</li>
          <li><strong>Voice Control</strong>: Compatibility with voice recognition software</li>
          <li><strong>Custom Styling</strong>: Support for user-defined stylesheets</li>
          <li><strong>Reduced Motion</strong>: Respect for user preferences for reduced motion</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.6.3 Usability Features</h3>
        <p className="text-gray-300 leading-relaxed">
          The platform incorporates numerous usability features to enhance the user experience:
        </p>
        
        <h4 className="text-lg text-cyan-400 mt-4">1.6.3.1 Responsive Design</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Mobile Optimization</strong>: Touch-friendly interface optimized for mobile devices</li>
          <li><strong>Adaptive Layouts</strong>: Flexible layouts that adapt to different screen sizes</li>
          <li><strong>Progressive Enhancement</strong>: Core functionality available on all devices</li>
          <li><strong>Performance Optimization</strong>: Fast loading times across all device types</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.6.3.2 Personalization</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Theme Preferences</strong>: Dark/light theme options with system preference detection</li>
          <li><strong>Notification Settings</strong>: Granular control over notification preferences</li>
          <li><strong>Layout Customization</strong>: Ability to customize dashboard layouts and content</li>
          <li><strong>Language Support</strong>: Multi-language support with localization capabilities</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.6.3.3 Help and Support</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Contextual Help</strong>: Inline help and tooltips for complex features</li>
          <li><strong>Documentation</strong>: Comprehensive user guides and API documentation</li>
          <li><strong>Tutorials</strong>: Interactive walkthroughs for new users</li>
          <li><strong>Support Channels</strong>: Multiple channels for user support and feedback</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.6.4 User Testing and Feedback</h3>
        <p className="text-gray-300 leading-relaxed">
          Continuous user testing and feedback collection ensure the platform meets user needs:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Usability Testing</strong>: Regular usability testing sessions with diverse user groups</li>
          <li><strong>A/B Testing</strong>: Controlled experiments to optimize user interface elements</li>
          <li><strong>Analytics Integration</strong>: User behavior analytics to identify pain points</li>
          <li><strong>Feedback Loops</strong>: Mechanisms for continuous user feedback collection</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.6.5 Inclusive Design</h3>
        <p className="text-gray-300 leading-relaxed">
          The platform embraces inclusive design principles to serve a diverse user base:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Cognitive Accessibility</strong>: Clear language and simplified interfaces for cognitive accessibility</li>
          <li><strong>Motor Impairment Support</strong>: Support for various input methods and assistive devices</li>
          <li><strong>Cultural Sensitivity</strong>: Culturally appropriate design and content presentation</li>
          <li><strong>Age Inclusivity</strong>: Design considerations for users of all age groups</li>
        </ul>
      </div>
    </section>
  );
};