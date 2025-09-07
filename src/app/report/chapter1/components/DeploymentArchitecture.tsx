import React from 'react';

export const DeploymentArchitecture: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl text-blue-400 mb-4">1.5 Deployment Architecture and CI/CD Pipeline</h2>
        <p className="text-gray-300 leading-relaxed">
          The deployment architecture and continuous integration/continuous deployment (CI/CD) pipeline are critical components 
          for ensuring reliable, scalable, and secure delivery of the Hive Token Swap Platform. This section details the 
          infrastructure design, deployment processes, and automation strategies.
        </p>

        <h3 className="text-xl text-purple-400 mt-6">1.5.1 Deployment Architecture</h3>
        <p className="text-gray-300 leading-relaxed">
          The platform follows a modern cloud-native deployment architecture designed for scalability and resilience:
        </p>
        
        <h4 className="text-lg text-cyan-400 mt-4">1.5.1.1 Infrastructure Components</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Frontend Hosting</strong>: Vercel for optimized Next.js deployment with global CDN</li>
          <li><strong>Domain Management</strong>: Custom domain with SSL certificate provisioning</li>
          <li><strong>Static Assets</strong>: Optimized asset delivery through CDN with caching strategies</li>
          <li><strong>Edge Functions</strong>: Serverless functions for API endpoints and data processing</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.5.1.2 Security Architecture</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>DDoS Protection</strong>: Cloudflare integration for distributed denial-of-service protection</li>
          <li><strong>Web Application Firewall</strong>: Automated protection against common web vulnerabilities</li>
          <li><strong>Rate Limiting</strong>: API rate limiting to prevent abuse and ensure fair usage</li>
          <li><strong>Security Headers</strong>: Implementation of security-focused HTTP headers</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.5.1.3 Monitoring and Observability</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Application Performance</strong>: Real-time monitoring of frontend and API performance</li>
          <li><strong>Error Tracking</strong>: Comprehensive error reporting and alerting systems</li>
          <li><strong>User Analytics</strong>: Anonymous usage analytics for feature improvement</li>
          <li><strong>Infrastructure Metrics</strong>: System-level monitoring for resource utilization</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.5.2 CI/CD Pipeline</h3>
        <p className="text-gray-300 leading-relaxed">
          The CI/CD pipeline automates testing, building, and deployment processes to ensure rapid and reliable delivery:
        </p>
        
        <h4 className="text-lg text-cyan-400 mt-4">1.5.2.1 Continuous Integration</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Version Control</strong>: GitHub for source code management with branch protection rules</li>
          <li><strong>Automated Testing</strong>: Full test suite execution on every pull request</li>
          <li><strong>Code Quality</strong>: ESLint and Prettier enforcement with automated formatting</li>
          <li><strong>Security Scanning</strong>: Dependency vulnerability scanning and code analysis</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.5.2.2 Continuous Deployment</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Preview Deployments</strong>: Automatic deployment of pull requests for review</li>
          <li><strong>Staging Environment</strong>: Pre-production environment for final validation</li>
          <li><strong>Production Deployment</strong>: Automated deployment to production with rollback capabilities</li>
          <li><strong>Release Management</strong>: Semantic versioning and changelog generation</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.5.3 Deployment Process</h3>
        <p className="text-gray-300 leading-relaxed">
          The deployment process follows a structured approach to minimize risk and ensure quality:
        </p>
        
        <h4 className="text-lg text-cyan-400 mt-4">1.5.3.1 Pre-Deployment</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Code Review</strong>: Mandatory peer review for all changes</li>
          <li><strong>Automated Testing</strong>: Full suite of unit, integration, and end-to-end tests</li>
          <li><strong>Security Audit</strong>: Vulnerability scanning and security assessment</li>
          <li><strong>Performance Testing</strong>: Load and stress testing for critical features</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.5.3.2 Deployment Execution</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Blue-Green Deployment</strong>: Zero-downtime deployment strategy</li>
          <li><strong>Gradual Rollout</strong>: Percentage-based rollout for risk mitigation</li>
          <li><strong>Health Checks</strong>: Automated validation of deployment success</li>
          <li><strong>Rollback Procedures</strong>: Automated rollback on deployment failure</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">1.5.3.3 Post-Deployment</h4>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Monitoring</strong>: Real-time monitoring of application performance and errors</li>
          <li><strong>User Feedback</strong>: Collection and analysis of user-reported issues</li>
          <li><strong>Performance Analysis</strong>: Evaluation of deployment impact on user experience</li>
          <li><strong>Documentation Updates</strong>: Release notes and documentation synchronization</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.5.4 Scalability and Performance</h3>
        <p className="text-gray-300 leading-relaxed">
          The deployment architecture is designed to handle varying loads and ensure optimal performance:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Auto-scaling</strong>: Automatic scaling based on traffic and resource utilization</li>
          <li><strong>Global Distribution</strong>: CDN-based content delivery for worldwide users</li>
          <li><strong>Caching Strategy</strong>: Multi-layer caching for optimal response times</li>
          <li><strong>Database Optimization</strong>: Efficient database queries and indexing strategies</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">1.5.5 Disaster Recovery</h3>
        <p className="text-gray-300 leading-relaxed">
          Comprehensive disaster recovery planning ensures business continuity:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Backup Strategy</strong>: Regular automated backups of critical data</li>
          <li><strong>Recovery Procedures</strong>: Documented recovery processes for various failure scenarios</li>
          <li><strong>Redundancy</strong>: Geographic redundancy for critical infrastructure components</li>
          <li><strong>Incident Response</strong>: Defined incident response procedures and escalation paths</li>
        </ul>
      </div>
    </section>
  );
};