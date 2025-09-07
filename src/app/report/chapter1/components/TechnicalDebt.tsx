import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const TechnicalDebt: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">1.5 Technical Debt and Code Quality Metrics</h3>
          <p className="text-gray-300 leading-relaxed">
            Technical debt represents the implied cost of additional rework caused by choosing an easy or quick solution now instead of using a better approach that would take longer. 
            This section examines the technical debt accumulated during the development of the Hive Token Swap Platform and the metrics used to measure code quality.
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">1.5.1 Technical Debt Overview</h4>
          <p className="text-gray-300 leading-relaxed">
            Throughout the development process, several decisions were made that contributed to technical debt:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Rapid Prototyping</strong>: Early development focused on proving concepts rather than implementing optimal solutions</li>
            <li><strong>Third-party Library Dependencies</strong>: Heavy reliance on external libraries that may introduce vulnerabilities or compatibility issues</li>
            <li><strong>Blockchain API Limitations</strong>: Working around constraints in the Hive blockchain API required workarounds</li>
            <li><strong>Time Constraints</strong>: Tight deadlines led to some shortcuts in code organization and documentation</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">1.5.2 Code Quality Metrics</h4>
          <p className="text-gray-300 leading-relaxed">
            Several metrics are used to evaluate and monitor code quality throughout the development lifecycle:
          </p>

          <h5 className="text-md text-blue-400 mt-3">1.5.2.1 Maintainability Metrics</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Code Complexity</strong>: Cyclomatic complexity kept below 10 for most functions</li>
            <li><strong>Code Duplication</strong>: Less than 5% code duplication across the codebase</li>
            <li><strong>Function Length</strong>: Average function length of 25 lines or less</li>
            <li><strong>Module Size</strong>: Modules limited to 500 lines to ensure readability</li>
          </ul>

          <h5 className="text-md text-blue-400 mt-3">1.5.2.2 Reliability Metrics</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Bug Density</strong>: Less than 1 bug per 1000 lines of code</li>
            <li><strong>Test Coverage</strong>: 85%+ coverage for critical business logic</li>
            <li><strong>Error Rate</strong>: Less than 0.1% error rate in production</li>
            <li><strong>Mean Time to Recovery</strong>: Less than 2 hours for critical issues</li>
          </ul>

          <h5 className="text-md text-blue-400 mt-3">1.5.2.3 Performance Metrics</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Load Time</strong>: Page load time under 3 seconds for 95% of users</li>
            <li><strong>API Response Time</strong>: 95th percentile API response time under 500ms</li>
            <li><strong>Memory Usage</strong>: Client-side memory usage under 100MB during normal operation</li>
            <li><strong>Bundle Size</strong>: Total bundle size under 2MB for optimal loading</li>
          </ul>

          <h5 className="text-md text-blue-400 mt-3">1.5.2.4 Security Metrics</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Vulnerability Count</strong>: Zero critical vulnerabilities in dependencies</li>
            <li><strong>Security Scan Results</strong>: Weekly automated security scans with zero high-severity findings</li>
            <li><strong>Authentication Success Rate</strong>: 99.9% successful authentication attempts</li>
            <li><strong>Data Breach Incidents</strong>: Zero data breach incidents since launch</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">1.5.3 Technical Debt Management</h4>
          <p className="text-gray-300 leading-relaxed">
            A structured approach is used to manage and reduce technical debt:
          </p>

          <h5 className="text-md text-blue-400 mt-3">1.5.3.1 Debt Identification</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Code Reviews</strong>: Regular peer reviews to identify potential debt accumulation</li>
            <li><strong>Static Analysis</strong>: Automated tools to detect code smells and anti-patterns</li>
            <li><strong>Performance Monitoring</strong>: Continuous monitoring to identify performance-related debt</li>
            <li><strong>User Feedback</strong>: Analysis of user-reported issues for usability debt</li>
          </ul>

          <h5 className="text-md text-blue-400 mt-3">1.5.3.2 Debt Prioritization</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Impact Assessment</strong>: Evaluation of debt impact on user experience and system stability</li>
            <li><strong>Effort Estimation</strong>: Time and resource requirements for debt resolution</li>
            <li><strong>Risk Analysis</strong>: Potential risks of leaving debt unresolved</li>
            <li><strong>Business Value</strong>: Alignment with business objectives and user needs</li>
          </ul>

          <h5 className="text-md text-blue-400 mt-3">1.5.3.3 Debt Repayment</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Refactoring Sprints</strong>: Dedicated development cycles for debt reduction</li>
            <li><strong>Incremental Improvements</strong>: Continuous small improvements during regular development</li>
            <li><strong>Tool Investment</strong>: Investment in better tools and processes to prevent future debt</li>
            <li><strong>Knowledge Sharing</strong>: Documentation and training to prevent knowledge-related debt</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">1.5.4 Current Technical Debt Status</h4>
          <p className="text-gray-300 leading-relaxed">
            As of the current release, the technical debt assessment shows:
          </p>
          <div className="mt-3 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">Technical Debt Ratio</h5>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Overall Debt Ratio</strong>: 8.5% (considered low for a project of this complexity)</li>
              <li><strong>Frontend Debt</strong>: 6.2% (primarily UI component organization)</li>
              <li><strong>Backend Debt</strong>: 9.8% (mostly related to API integration workarounds)</li>
              <li><strong>Blockchain Integration Debt</strong>: 12.3% (due to Hive API limitations)</li>
            </ul>
            
            <h5 className="text-md font-semibold text-blue-400 mt-4">Debt Categories</h5>
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Code Debt</strong>: 45% (suboptimal code solutions)</li>
              <li><strong>Design Debt</strong>: 25% (architectural shortcuts)</li>
              <li><strong>Documentation Debt</strong>: 15% (incomplete or outdated documentation)</li>
              <li><strong>Test Debt</strong>: 10% (insufficient test coverage in some areas)</li>
              <li><strong>Platform Debt</strong>: 5% (dependency on specific platform features)</li>
            </ul>
          </div>

          <h4 className="text-lg text-cyan-400 mt-4">1.5.5 Tools for Technical Debt Measurement</h4>
          <p className="text-gray-300 leading-relaxed">
            Several tools are employed to measure and track technical debt:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>SonarQube</strong>: Static analysis for code quality and debt identification</li>
            <li><strong>ESLint</strong>: JavaScript/TypeScript linting with custom rules for best practices</li>
            <li><strong>Webpack Bundle Analyzer</strong>: Bundle size analysis and optimization</li>
            <li><strong>Lighthouse</strong>: Web performance and accessibility auditing</li>
            <li><strong>Snyk</strong>: Dependency vulnerability scanning and license compliance</li>
            <li><strong>CodeScene</strong>: Behavioral code analysis for identifying complex areas</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">1.5.6 Future Technical Debt Reduction Plan</h4>
          <p className="text-gray-300 leading-relaxed">
            The roadmap includes specific initiatives to reduce technical debt:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Q1 2026</strong>: Refactor blockchain integration layer for better maintainability</li>
            <li><strong>Q2 2026</strong>: Implement comprehensive documentation for all components</li>
            <li><strong>Q3 2026</strong>: Address test coverage gaps in critical modules</li>
            <li><strong>Q4 2026</strong>: Modernize legacy components and reduce dependency on deprecated libraries</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">1.5.7 Conclusion</h4>
          <p className="text-gray-300 leading-relaxed">
            Technical debt management is an ongoing process that requires continuous attention and investment. 
            The current level of technical debt is considered manageable, and the established processes and tools 
            provide a solid foundation for maintaining code quality while delivering new features. Regular assessment 
            and proactive debt reduction efforts will ensure the long-term sustainability and maintainability of the platform.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};