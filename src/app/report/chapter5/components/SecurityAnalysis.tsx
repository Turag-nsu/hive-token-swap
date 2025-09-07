import React from 'react';

export const SecurityAnalysis: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-6">5.5 Security Analysis and Threat Models</h3>
      <p className="text-gray-300 leading-relaxed">
        A comprehensive security analysis is crucial for a platform handling cryptocurrency transactions and personal data. 
        This section presents a detailed threat modeling approach using the STRIDE framework to identify and mitigate 
        potential security risks.
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">5.5.1 STRIDE Threat Model</h4>
      <p className="text-gray-300 leading-relaxed">
        The STRIDE threat modeling framework categorizes threats into six distinct types:
      </p>
      
      <h5 className="text-md text-blue-400 mt-3">Spoofing</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Threat</strong>: Impersonation of legitimate users or services</li>
        <li><strong>Mitigation</strong>: Cryptographic signature verification for all blockchain operations</li>
        <li><strong>Status</strong>: Protected through Hive Keychain/HiveSigner authentication</li>
      </ul>

      <h5 className="text-md text-blue-400 mt-3">Tampering</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Threat</strong>: Unauthorized modification of data or code</li>
        <li><strong>Mitigation</strong>: Content Security Policy (CSP) and Subresource Integrity (SRI)</li>
        <li><strong>Status</strong>: Protected through HTTPS and cryptographic hashing</li>
      </ul>

      <h5 className="text-md text-blue-400 mt-3">Repudiation</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Threat</strong>: Users denying actions they performed</li>
        <li><strong>Mitigation</strong>: Comprehensive transaction logging and blockchain immutability</li>
        <li><strong>Status</strong>: Protected through Hive blockchain transaction records</li>
      </ul>

      <h5 className="text-md text-blue-400 mt-3">Information Disclosure</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Threat</strong>: Unauthorized access to sensitive user data</li>
        <li><strong>Mitigation</strong>: End-to-end encryption and minimal data collection</li>
        <li><strong>Status</strong>: Protected through client-side processing and secure storage</li>
      </ul>

      <h5 className="text-md text-blue-400 mt-3">Denial of Service</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Threat</strong>: Overwhelming the system with requests to make it unavailable</li>
        <li><strong>Mitigation</strong>: Rate limiting, request throttling, and distributed architecture</li>
        <li><strong>Status</strong>: Protected through API rate limiting and caching mechanisms</li>
      </ul>

      <h5 className="text-md text-blue-400 mt-3">Elevation of Privilege</h5>
      <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
        <li><strong>Threat</strong>: Unauthorized access to administrative functions</li>
        <li><strong>Mitigation</strong>: Role-based access control and privilege separation</li>
        <li><strong>Status</strong>: Protected through client-side architecture with no server-side privileges</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">5.5.2 Attack Surface Analysis</h4>
      <p className="text-gray-300 leading-relaxed">
        The platform's attack surface has been minimized through careful design:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Frontend Interface</strong>: Protected by CSP, input validation, and sanitization</li>
        <li><strong>Blockchain API</strong>: Protected by rate limiting and transaction verification</li>
        <li><strong>Wallet Integration</strong>: Protected by zero-knowledge architecture and user confirmation</li>
        <li><strong>Network Communication</strong>: Protected by HTTPS encryption and secure headers</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">5.5.3 Cryptographic Security</h4>
      <p className="text-gray-300 leading-relaxed">
        Cryptographic security measures ensure the integrity and confidentiality of user data:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Key Management</strong>: Private keys never leave user devices or HiveSigner servers</li>
        <li><strong>Transaction Signing</strong>: All transactions signed with strong cryptographic algorithms</li>
        <li><strong>Data Encryption</strong>: Sensitive data encrypted at rest and in transit</li>
        <li><strong>Hash Functions</strong>: Industry-standard hashing for data integrity verification</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">5.5.4 Security Testing and Auditing</h4>
      <p className="text-gray-300 leading-relaxed">
        Regular security testing ensures continued protection against emerging threats:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Static Analysis</strong>: Automated code scanning for security vulnerabilities</li>
        <li><strong>Penetration Testing</strong>: Regular third-party security assessments</li>
        <li><strong>Dependency Scanning</strong>: Continuous monitoring of third-party library vulnerabilities</li>
        <li><strong>Security Audits</strong>: Periodic comprehensive security reviews</li>
      </ul>
    </div>
  );
};