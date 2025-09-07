import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const DataPrivacyAndCompliance: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">5.5 Data Privacy and Compliance Considerations</h3>
          <p className="text-gray-300 leading-relaxed">
            The Hive Token Swap Platform prioritizes user privacy and implements comprehensive data protection measures to comply with global privacy regulations while maintaining the decentralized nature of the platform.
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">5.5.1 Privacy by Design</h4>
          <p className="text-gray-300 leading-relaxed">
            Privacy considerations are integrated into every aspect of the platform's architecture:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Minimal Data Collection:</strong> Only essential data is collected for platform functionality</li>
            <li><strong>Client-Side Processing:</strong> Maximum data processing occurs on the user's device</li>
            <li><strong>End-to-End Encryption:</strong> Sensitive communications are encrypted</li>
            <li><strong>User Control:</strong> Users have complete control over their personal data</li>
            <li><strong>Transparent Practices:</strong> Clear privacy policies and data handling procedures</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">5.5.2 Data Collection and Usage</h4>
          <p className="text-gray-300 leading-relaxed">
            The platform's data collection practices are designed to be minimal and transparent:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Essential Platform Data:</strong> Username, public profile information, and content interactions</li>
            <li><strong>Usage Analytics:</strong> Anonymous usage statistics for platform improvement</li>
            <li><strong>Performance Metrics:</strong> Technical data for optimizing user experience</li>
            <li><strong>No Personal Identification:</strong> No collection of personally identifiable information (PII)</li>
            <li><strong>Optional Data:</strong> Additional data collection only with explicit user consent</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">5.5.3 Data Storage and Security</h4>
          <p className="text-gray-300 leading-relaxed">
            Data storage and security measures ensure user information remains protected:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Decentralized Storage:</strong> Content stored on the Hive blockchain, not centralized servers</li>
            <li><strong>Encrypted Communications:</strong> All data transmission secured with HTTPS/TLS</li>
            <li><strong>Access Controls:</strong> Role-based access to system components</li>
            <li><strong>Regular Security Audits:</strong> Periodic assessment of security measures</li>
            <li><strong>Data Retention Policies:</strong> Clear guidelines for data lifecycle management</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">5.5.4 Regulatory Compliance</h4>
          <p className="text-gray-300 leading-relaxed">
            The platform adheres to major global privacy regulations:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>GDPR Compliance:</strong> Full compliance with EU General Data Protection Regulation</li>
            <li><strong>CCPA Compliance:</strong> Adherence to California Consumer Privacy Act</li>
            <li><strong>Data Portability:</strong> Users can export their data in standard formats</li>
            <li><strong>Right to Erasure:</strong> Mechanisms for users to request data deletion</li>
            <li><strong>Privacy Impact Assessments:</strong> Regular evaluations of privacy risks</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">5.5.5 User Rights and Controls</h4>
          <p className="text-gray-300 leading-relaxed">
            Users have comprehensive control over their data and privacy settings:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Consent Management:</strong> Granular control over data collection and usage</li>
            <li><strong>Privacy Dashboard:</strong> Centralized interface for privacy settings</li>
            <li><strong>Data Access Requests:</strong> Easy mechanisms for accessing personal data</li>
            <li><strong>Third-Party Sharing Controls:</strong> Options to limit data sharing with partners</li>
            <li><strong>Privacy Notifications:</strong> Clear communication about privacy-related changes</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">5.5.6 Blockchain-Specific Considerations</h4>
          <p className="text-gray-300 leading-relaxed">
            Special considerations for blockchain-based data:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Immutable Records:</strong> Understanding that blockchain data cannot be deleted</li>
            <li><strong>Pseudonymity:</strong> User identities protected through cryptographic addresses</li>
            <li><strong>Transparent Transactions:</strong> Balancing transparency with privacy needs</li>
            <li><strong>Smart Contract Audits:</strong> Regular review of contract privacy implications</li>
            <li><strong>Metadata Protection:</strong> Preventing sensitive information in transaction metadata</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};