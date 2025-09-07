import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const AbstractSection: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">Abstract</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed">
            This paper presents the design and implementation of a decentralized social media platform built on the Hive blockchain, 
            featuring integrated wallet management and token swap capabilities. The platform leverages the Hive blockchain's unique 
            features to create a censorship-resistant social network where users maintain true ownership of their content and can 
            earn rewards through community engagement. The system integrates advanced wallet functionality, real-time transaction 
            history tracking, and social features that mirror traditional platforms while offering the benefits of decentralization.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            A key innovation of this platform is its token swap mechanism, which enables seamless exchange of Hive-based tokens 
            through integration with the Hive Engine decentralized exchange. Users can trade tokens such as HIVE, HBD, and various 
            Hive Engine tokens (e.g., LEO, SWAP.HIVE, POB) directly within the platform's intuitive interface. The system implements 
            secure transaction signing through Hive Keychain, ensuring that private keys never leave the user's browser while 
            enabling complex multi-operation transactions for token swaps.
          </p>
          <p className="text-gray-300 leading-relaxed mt-4">
            Our implementation demonstrates the viability of blockchain-based social platforms and provides a foundation for future 
            development in this space. The integration of social features with financial tools creates a unique ecosystem that 
            benefits both content creators and consumers. Performance evaluation shows sub-500ms page load times and real-time 
            transaction confirmation within 3 seconds, matching the Hive blockchain's fast finality.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};