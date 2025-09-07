import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const EconomicModelAndTokenomics: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">10. Economic Model and Tokenomics</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-4">10.1 Overview of the Economic Model</h3>
          <p className="text-gray-300 leading-relaxed">
            The Hive Token Swap Platform operates within the broader Hive blockchain ecosystem, leveraging its unique economic model while introducing additional tokenomic features through the platform's functionality. 
            This section explores the economic principles underlying the platform and how they contribute to a sustainable and incentivized ecosystem.
          </p>

          <h3 className="text-xl text-purple-400 mt-6">10.2 Hive Blockchain Economic Foundation</h3>
          <p className="text-gray-300 leading-relaxed">
            The platform builds upon the established economic model of the Hive blockchain, which includes several key tokens and mechanisms:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>HIVE</strong>: The core liquid token used for transactions, voting, and staking</li>
            <li><strong>Hive Backed Dollars (HBD)</strong>: A stablecoin pegged to the US dollar</li>
            <li><strong>VESTS</strong>: Illiquid tokens representing staked HIVE and voting power</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">10.2.1 Token Distribution and Inflation</h4>
          <p className="text-gray-300 leading-relaxed">
            The Hive blockchain employs a unique inflation model that rewards various participants in the ecosystem:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Block Rewards</strong>: New HIVE tokens are created with each block (approximately every 3 seconds)</li>
            <li><strong>Content Rewards</strong>: 65% of inflation allocated to content creators and curators</li>
            <li><strong>Liquidity Rewards</strong>: 15% allocated to holders of HIVE and HBD</li>
            <li><strong>Delegated Proof of Stake (DPoS)</strong>: 10% allocated to witnesses who secure the network</li>
            <li><strong>Vesting</strong>: Rewards are converted to VESTS with a 13-week vesting period</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">10.3 Platform-Specific Tokenomics</h3>
          <p className="text-gray-300 leading-relaxed">
            The Hive Token Swap Platform introduces additional tokenomic features that enhance the value proposition for users:
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">10.3.1 Token Swap Mechanisms</h4>
          <p className="text-gray-300 leading-relaxed">
            The platform facilitates seamless swapping between different token types:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>HIVE to HBD</strong>: Conversion between the core token and stablecoin</li>
            <li><strong>HIVE to VESTS</strong>: Staking mechanism for increased voting power and rewards</li>
            <li><strong>Hive Engine Tokens</strong>: Integration with third-party tokens built on Hive Engine</li>
            <li><strong>Swap Fees</strong>: Minimal fees to support platform sustainability and liquidity</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">10.3.2 Reward Distribution</h4>
          <p className="text-gray-300 leading-relaxed">
            The platform enhances the existing reward distribution mechanisms:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Content Creator Rewards</strong>: Direct HBD and HIVE payments for quality content</li>
            <li><strong>Curation Rewards</strong>: Incentives for users who discover and promote quality content</li>
            <li><strong>Community Building</strong>: Token rewards for active community participation</li>
            <li><strong>Referral Program</strong>: Incentives for bringing new users to the platform</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">10.4 Economic Incentives and Sustainability</h3>
          <p className="text-gray-300 leading-relaxed">
            The platform's economic model is designed to create long-term sustainability and growth:
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">10.4.1 User Incentives</h4>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Engagement Rewards</strong>: Token incentives for active platform participation</li>
            <li><strong>Quality Content</strong>: Higher rewards for content that generates meaningful engagement</li>
            <li><strong>Long-term Holding</strong>: Benefits for users who stake tokens and participate in governance</li>
            <li><strong>Ecosystem Growth</strong>: Rewards for activities that contribute to platform expansion</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">10.4.2 Platform Sustainability</h4>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Minimal Fees</strong>: Low transaction fees to encourage usage while supporting development</li>
            <li><strong>Community Governance</strong>: Decentralized decision-making for platform improvements</li>
            <li><strong>Open Source Development</strong>: Community contributions to reduce development costs</li>
            <li><strong>Partnership Revenue</strong>: Potential revenue from strategic partnerships and integrations</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">10.5 Token Valuation and Market Dynamics</h3>
          <p className="text-gray-300 leading-relaxed">
            The value of tokens within the ecosystem is influenced by several factors:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Utility</strong>: Practical applications of tokens within the platform</li>
            <li><strong>Scarcity</strong>: Controlled supply and vesting mechanisms</li>
            <li><strong>Demand</strong>: Active usage and trading volume</li>
            <li><strong>Network Effects</strong>: Growth in user base and content quality</li>
            <li><strong>Market Sentiment</strong>: Broader cryptocurrency market conditions</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">10.6 Economic Impact and Future Projections</h3>
          <p className="text-gray-300 leading-relaxed">
            The platform's economic model is expected to have several positive impacts:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Increased Adoption</strong>: Simplified access to blockchain technology for mainstream users</li>
            <li><strong>Enhanced Liquidity</strong>: Improved token circulation and trading opportunities</li>
            <li><strong>Content Quality</strong>: Economic incentives for high-quality content creation</li>
            <li><strong>Community Growth</strong>: Sustainable reward mechanisms for ecosystem expansion</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">10.6.1 Future Developments</h4>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>DeFi Integration</strong>: Expansion into decentralized finance applications</li>
            <li><strong>NFT Marketplace</strong>: Integration of non-fungible tokens for digital collectibles</li>
            <li><strong>Governance Tokens</strong>: Introduction of platform-specific governance mechanisms</li>
            <li><strong>Cross-Chain Compatibility</strong>: Integration with other blockchain ecosystems</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">10.7 Conclusion</h3>
          <p className="text-gray-300 leading-relaxed">
            The economic model and tokenomics of the Hive Token Swap Platform represent a thoughtful integration of the existing Hive blockchain economy with innovative features that enhance user experience and value creation. 
            By leveraging proven mechanisms while introducing new functionalities, the platform creates a sustainable ecosystem that benefits all participants.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};