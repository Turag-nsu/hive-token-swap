import React from 'react';

export const TestingStrategy: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl text-blue-400 mb-4">1.4 Testing Strategy and Quality Assurance</h2>
        <p className="text-gray-300 leading-relaxed">
          A comprehensive testing strategy is essential for ensuring the reliability, security, and performance of the Hive Token Swap Platform. 
          This section outlines the testing methodologies, tools, and quality assurance processes implemented throughout the development lifecycle.
        </p>

        <h3 className="text-xl text-purple-400 mt-6">1.4.1 Testing Methodologies</h3>
        <p className="text-gray-300 leading-relaxed">
          The platform employs a multi-layered testing approach to ensure comprehensive coverage:
        </p>
        
        <h4 className="text-lg text-cyan-400 mt-4">1.4.1.1 Unit Testing</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Test Coverage</strong>: Targeting 85%+ code coverage for critical components</li>
          <li><strong>Framework</strong>: Jest for JavaScript/TypeScript testing with React Testing Library</li>
          <li><strong>Component Testing</strong>: Isolated testing of React components with mocked dependencies</li>
          <li><strong>Hook Testing</strong>: Dedicated tests for custom React hooks using React Hooks Testing Library</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.4.1.2 Integration Testing</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>API Integration</strong>: Testing interactions with Hive blockchain APIs and Hive Engine</li>
          <li><strong>State Management</strong>: Verification of React Query and Zustand integration</li>
          <li><strong>Wallet Integration</strong>: Testing Hive Keychain and HiveSigner interactions</li>
          <li><strong>Database Operations</strong>: Validation of data persistence and retrieval mechanisms</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.4.1.3 End-to-End Testing</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Test Framework</strong>: Cypress for browser-based end-to-end testing</li>
          <li><strong>User Flows</strong>: Critical user journeys including wallet connection, token swaps, and social interactions</li>
          <li><strong>Cross-Browser Testing</strong>: Verification across Chrome, Firefox, and Edge browsers</li>
          <li><strong>Mobile Testing</strong>: Responsive design validation on various device sizes</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.4.2 Quality Assurance Processes</h3>
        <p className="text-gray-300 leading-relaxed">
          Rigorous quality assurance processes ensure consistent delivery of high-quality software:
        </p>
        
        <h4 className="text-lg text-cyan-400 mt-4">1.4.2.1 Code Review Process</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Peer Review</strong>: Mandatory code review by at least one other team member</li>
          <li><strong>Automated Checks</strong>: ESLint and Prettier enforcement through pre-commit hooks</li>
          <li><strong>Security Scanning</strong>: Automated security scanning for dependencies and code patterns</li>
          <li><strong>Documentation Review</strong>: Verification of code comments and documentation updates</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.4.2.2 Continuous Integration</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Automated Testing</strong>: Full test suite execution on every pull request</li>
          <li><strong>Build Verification</strong>: Automated build and deployment validation</li>
          <li><strong>Performance Monitoring</strong>: Automated performance regression detection</li>
          <li><strong>Security Scanning</strong>: Regular dependency vulnerability scanning</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.4.3 Testing Tools and Infrastructure</h3>
        <p className="text-gray-300 leading-relaxed">
          The testing infrastructure leverages industry-standard tools for comprehensive validation:
        </p>
        
        <h4 className="text-lg text-cyan-400 mt-4">1.4.3.1 Development Tools</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Testing Frameworks</strong>: Jest, React Testing Library, Cypress</li>
          <li><strong>Mocking Libraries</strong>: Mock Service Worker (MSW) for API mocking</li>
          <li><strong>Test Data Management</strong>: Factory pattern for consistent test data generation</li>
          <li><strong>Code Coverage</strong>: Istanbul/nyc for detailed coverage reporting</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.4.3.2 Monitoring and Analytics</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Error Tracking</strong>: Sentry integration for real-time error monitoring</li>
          <li><strong>Performance Metrics</strong>: Web Vitals tracking for user experience optimization</li>
          <li><strong>User Behavior</strong>: Analytics for feature usage and user flow optimization</li>
          <li><strong>Automated Alerts</strong>: Notification systems for test failures and performance degradation</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.4.4 Security Testing</h3>
        <p className="text-gray-300 leading-relaxed">
          Specialized security testing ensures protection against common vulnerabilities:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Static Analysis</strong>: ESLint security plugins and SonarQube for code quality</li>
          <li><strong>Dependency Scanning</strong>: Snyk for vulnerability detection in third-party packages</li>
          <li><strong>Penetration Testing</strong>: Regular third-party security assessments</li>
          <li><strong>Blockchain Security</strong>: Smart contract auditing for Hive Engine interactions</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.4.5 Performance Testing</h3>
        <p className="text-gray-300 leading-relaxed">
          Performance testing validates the platform's responsiveness and scalability:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Load Testing</strong>: Artillery for simulating concurrent user scenarios</li>
          <li><strong>Stress Testing</strong>: Evaluation of system behavior under extreme conditions</li>
          <li><strong>Blockchain Performance</strong>: Transaction throughput and confirmation time validation</li>
          <li><strong>Resource Monitoring</strong>: CPU, memory, and network usage analysis</li>
        </ul>
      </div>
    </section>
  );
};