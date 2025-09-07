import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SecurityAnalysis } from './SecurityAnalysis';
import { SecurityArchitectureDiagrams } from './SecurityArchitectureDiagrams';
import { DataPrivacyAndCompliance } from './DataPrivacyAndCompliance';

export const SecurityConsiderations: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">5. Security Considerations</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-4">5.1 Key Management</h3>
          <p className="text-gray-300 leading-relaxed">
            The platform leverages HiveKeychain for secure key management:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Private keys never leave the user's browser</li>
            <li>Transaction signing occurs within the extension</li>
            <li>No server-side storage of sensitive information</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">5.2 Authentication</h3>
          <p className="text-gray-300 leading-relaxed">
            User authentication is handled through:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Cryptographic signature verification</li>
            <li>Session management</li>
            <li>Role-based access control</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">5.3 Data Privacy</h3>
          <p className="text-gray-300 leading-relaxed">
            The platform ensures data privacy through:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Minimal data collection</li>
            <li>Client-side data processing</li>
            <li>Transparent data handling practices</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">5.4 Transaction Security</h3>
          <p className="text-gray-300 leading-relaxed">
            Transaction security is maintained by:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>User confirmation for all transactions</li>
            <li>Detailed transaction information display</li>
            <li>Error handling and rollback mechanisms</li>
          </ul>
          
          <SecurityAnalysis />
          <SecurityArchitectureDiagrams />
        </CardContent>
      </Card>
      <DataPrivacyAndCompliance />
    </section>
  );
};