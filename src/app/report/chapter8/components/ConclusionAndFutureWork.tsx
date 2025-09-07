import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CommunityGovernance } from './CommunityGovernance';
import { FutureRoadmap } from './FutureRoadmap';

export const ConclusionAndFutureWork: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">8. Conclusion and Future Work</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-4">8.1 Summary</h3>
          <p className="text-gray-300 leading-relaxed">
            This paper has presented the design and implementation of a decentralized social media platform with integrated wallet functionality. 
            The platform successfully combines the benefits of blockchain technology with user-friendly interfaces, providing users with true ownership 
            of their content and digital assets.
          </p>

          <h3 className="text-xl text-purple-400 mt-6">8.2 Contributions</h3>
          <p className="text-gray-300 leading-relaxed">
            The key contributions of this work include:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>A comprehensive implementation of a blockchain-based social platform</li>
            <li>Integration of wallet functionality with social features</li>
            <li>Real-time transaction history tracking</li>
            <li>User-friendly interface design</li>
            <li>Documentation of best practices for decentralized application development</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">8.3 Future Work</h3>
          <p className="text-gray-300 leading-relaxed">
            Future enhancements could include:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Advanced token swap functionality</li>
            <li>Mobile application development</li>
            <li>Enhanced analytics and reporting</li>
            <li>Integration with additional blockchain networks</li>
            <li>Machine learning-based content recommendation</li>
            <li>Enhanced privacy features through zero-knowledge proofs</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">8.4 Impact</h3>
          <p className="text-gray-300 leading-relaxed">
            This platform demonstrates the viability of decentralized social media and provides a foundation for future development in this space. 
            The integration of social features with financial tools creates a unique ecosystem that benefits both content creators and consumers.
          </p>
        </CardContent>
      </Card>
      <CommunityGovernance />
      <FutureRoadmap />
    </section>
  );
};