import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const ReferencesSection: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">9. References</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <ol className="text-gray-300 list-decimal list-inside space-y-2">
            <li>Hive Documentation. https://developers.hive.io/</li>
            <li>Hive Keychain Documentation. https://github.com/stoodkev/hive-keychain</li>
            <li>React Documentation. https://reactjs.org/</li>
            <li>Next.js Documentation. https://nextjs.org/</li>
            <li>dhive Library. https://github.com/openhive-network/dhive</li>
            <li>Blockchain Consensus Mechanisms. https://en.wikipedia.org/wiki/Consensus_(computer_science)</li>
            <li>Decentralized Social Media Platforms. https://en.wikipedia.org/wiki/Decentralized_social_network</li>
            <li>Cryptocurrency Wallets. https://en.wikipedia.org/wiki/Cryptocurrency_wallet</li>
          </ol>
        </CardContent>
      </Card>
    </section>
  );
};