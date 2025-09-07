'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { generateReportPDF, downloadFile, generateReportText } from './pdf-generator';
import { AbstractSection } from './chapter1/components/AbstractSection';
import { TableOfContents } from './chapter1/components/TableOfContents';
import { TestingStrategy } from './chapter1/components/TestingStrategy';
import { TechnicalDebt } from './chapter1/components/TechnicalDebt';
import { DeploymentArchitecture } from './chapter1/components/DeploymentArchitecture';
import { DeploymentPipelineDiagrams } from './chapter1/components/DeploymentPipelineDiagrams';
import { TechnicalDebtDiagrams } from './chapter1/components/TechnicalDebtDiagrams';
import { UserExperience } from './chapter1/components/UserExperience';
import { UserExperienceJourneyMaps } from './chapter1/components/UserExperienceJourneyMaps';
import { IntroductionSection } from './chapter2/components/IntroductionSection';
import { BackgroundSection } from './chapter2/components/BackgroundSection';
import { SystemArchitectureSection } from './chapter3/components/SystemArchitectureSection';
import { SequenceDiagrams } from './chapter3/components/SequenceDiagrams';
import { TechnicalImplementationSection } from './chapter4/components/TechnicalImplementationSection';
import { ClassDiagrams } from './chapter4/components/ClassDiagrams';
import { APIDocumentation } from './chapter4/components/APIDocumentation';
import { BlockchainIntegration } from './chapter4/components/BlockchainIntegration';
import { WalletManagementSystem } from './chapter4/components/WalletManagementSystem';
import { TokenSwapMechanisms } from './chapter4/components/TokenSwapMechanisms';
import { SocialMediaFeatures } from './chapter4/components/SocialMediaFeatures';
import { UserInterfaceDesign } from './chapter4/components/UserInterfaceDesign';
import { MobileResponsiveness } from './chapter4/components/MobileResponsiveness';
import { WalletIntegration } from './chapter4/components/WalletIntegration';
import { FrontendArchitecture } from './chapter4/components/FrontendArchitecture';
import { StateManagement } from './chapter4/components/StateManagement';
import { SecurityConsiderations } from './chapter5/components/SecurityConsiderations';
import { DataPrivacyAndCompliance } from './chapter5/components/DataPrivacyAndCompliance';
import { PerformanceEvaluation } from './chapter6/components/PerformanceEvaluation';
import { ResultsAndDiscussion } from './chapter7/components/ResultsAndDiscussion';
import { CaseStudies } from './chapter7/components/CaseStudies';
import { ErrorHandling } from './chapter7/components/ErrorHandling';
import { ConclusionAndFutureWork } from './chapter8/components/ConclusionAndFutureWork';
import { FutureRoadmap } from './chapter8/components/FutureRoadmap';
import { CommunityGovernance } from './chapter8/components/CommunityGovernance';
import { ReferencesSection } from './chapter9/components/ReferencesSection';
import { TroubleshootingGuide } from './chapter9/components/TroubleshootingGuide';
import { TroubleshootingFlowcharts } from './chapter9/components/TroubleshootingFlowcharts';
import { EconomicModelAndTokenomics } from './chapter10/components/EconomicModelAndTokenomics';
import { TokenomicsEcosystemDiagrams } from './chapter10/components/TokenomicsEcosystemDiagrams';
import { GlossarySection } from './chapter10/components/GlossarySection';
import { GlossaryVisualization } from './chapter10/components/GlossaryVisualization';

const ReportPage = () => {
  const handleDownloadPDF = () => {
    generateReportPDF();
  };

  const handleDownloadText = () => {
    const textContent = generateReportText();
    downloadFile(textContent, 'hive-token-swap-report.txt', 'text/plain');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center py-8 border-b border-gray-700">
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-700">Academic Research Paper</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Hive Token Swap Platform: A Decentralized Social Media and Financial Ecosystem
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A Comprehensive Analysis of Blockchain-Based Social Networking with Integrated Wallet Functionality
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
              onClick={handleDownloadPDF}
            >
              Download PDF
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
              onClick={handleDownloadText}
            >
              Download Text
            </Button>
            <Button 
              variant="outline" 
              className="border-green-500 text-green-400 hover:bg-green-500/10"
              onClick={() => window.open('https://github.com/Turag-nsu/hive-token-swap', '_blank')}
            >
              Project Repository
            </Button>
          </div>
        </header>

        {/* Table of Contents */}
        <TableOfContents />

        {/* Abstract Section */}
        <AbstractSection />
        
        {/* Testing Strategy and Quality Assurance */}
        <TestingStrategy />
        
        {/* Technical Debt and Code Quality Metrics */}
        <TechnicalDebt />
        <TechnicalDebtDiagrams />
        
        {/* Deployment Architecture and CI/CD Pipeline */}
        <DeploymentArchitecture />
        <DeploymentPipelineDiagrams />
        
        {/* User Experience and Accessibility Considerations */}
        <UserExperience />
        <UserExperienceJourneyMaps />
        
        {/* Introduction Section */}
        <IntroductionSection />

        {/* Background and Related Work Section */}
        <BackgroundSection />

        {/* System Architecture Section */}
        <SystemArchitectureSection />

        {/* Technical Implementation Section */}
        <TechnicalImplementationSection />
        <BlockchainIntegration />
        <WalletManagementSystem />
        <TokenSwapMechanisms />
        <SocialMediaFeatures />
        <UserInterfaceDesign />
        <WalletIntegration />
        <FrontendArchitecture />
        <StateManagement />

        {/* Security Considerations Section */}
        <SecurityConsiderations />

        {/* Performance Evaluation Section */}
        <PerformanceEvaluation />

        {/* Results and Discussion Section */}
        <ResultsAndDiscussion />

        {/* Conclusion and Future Work Section */}
        <ConclusionAndFutureWork />

        {/* References Section */}
        <ReferencesSection />

        {/* Troubleshooting Guide */}
        <TroubleshootingGuide />
        <TroubleshootingFlowcharts />

        {/* Economic Model and Tokenomics Section */}
        <EconomicModelAndTokenomics />
        <TokenomicsEcosystemDiagrams />

        {/* Glossary Section */}
        <GlossarySection />
        <GlossaryVisualization />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Hive Token Swap Platform. All rights reserved.</p>
          <p className="mt-2">This research paper is for academic purposes only.</p>
        </footer>
      </div>
    </div>
  );
};

export default ReportPage;