import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { APIDocumentation } from './APIDocumentation';
import { APIIntegrationDiagrams } from './APIIntegrationDiagrams';
import { ClassDiagrams } from './ClassDiagrams';
import { ComponentHierarchyDiagrams } from './ComponentHierarchyDiagrams';
import { DataFlowDiagrams } from './DataFlowDiagrams';
import { WalletIntegrationDiagrams } from './WalletIntegrationDiagrams';
import { TokenSwapDiagrams } from './TokenSwapDiagrams';
import { BlockchainInteractionDiagrams } from './BlockchainInteractionDiagrams';
import { AuthenticationFlowDiagrams } from './AuthenticationFlowDiagrams';
import { SocialMediaDiagrams } from './SocialMediaDiagrams';
import { StateManagementDiagrams } from './StateManagementDiagrams';
import { FrontendArchitectureDiagrams } from './FrontendArchitectureDiagrams';
import { MobileResponsivenessDiagrams } from './MobileResponsivenessDiagrams';

export const TechnicalImplementationSection: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">4. Technical Implementation</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-4">4.1 Blockchain Integration</h3>
          <p className="text-gray-300 leading-relaxed">
            The platform integrates with the Hive blockchain through several mechanisms:
          </p>
        </CardContent>
      </Card>
      <APIDocumentation />
      <APIIntegrationDiagrams />
      <ClassDiagrams />
      <ComponentHierarchyDiagrams />
      <DataFlowDiagrams />
      <WalletIntegrationDiagrams />
      <TokenSwapDiagrams />
      <BlockchainInteractionDiagrams />
      <AuthenticationFlowDiagrams />
      <SocialMediaDiagrams />
      <StateManagementDiagrams />
      <FrontendArchitectureDiagrams />
      <MobileResponsivenessDiagrams />
    </section>
  );
};