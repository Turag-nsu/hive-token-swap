import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const CommunityGovernance: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">8.5 Community Governance and Decentralized Decision Making</h3>
          <p className="text-gray-300 leading-relaxed">
            The Hive Token Swap Platform recognizes the importance of community governance in decentralized ecosystems. 
            This section explores the principles, mechanisms, and future implementations of community-driven decision making within the platform.
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">8.5.1 Governance Principles</h4>
          <p className="text-gray-300 leading-relaxed">
            The platform's governance model is built on several core principles:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Transparency</strong>: All governance processes and decisions are publicly visible and auditable</li>
            <li><strong>Inclusivity</strong>: Every stakeholder has the opportunity to participate in decision-making</li>
            <li><strong>Merit-based</strong>: Voting power is proportional to contribution and stake in the ecosystem</li>
            <li><strong>Decentralization</strong>: No single entity has controlling authority over the platform</li>
            <li><strong>Adaptability</strong>: Governance mechanisms can evolve based on community feedback and needs</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">8.5.2 Current Governance Mechanisms</h4>
          <p className="text-gray-300 leading-relaxed">
            The platform leverages existing Hive blockchain governance mechanisms while introducing platform-specific features:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Witness Voting</strong>: Users can vote for witnesses who secure the Hive blockchain network</li>
            <li><strong>Proposal System</strong>: Participation in the Hive blockchain's decentralized funding proposal system</li>
            <li><strong>Community Moderation</strong>: Decentralized content moderation through community voting</li>
            <li><strong>Token-weighted Voting</strong>: Voting power proportional to token holdings and staking</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">8.5.3 Platform-Specific Governance Features</h4>
          <p className="text-gray-300 leading-relaxed">
            The Hive Token Swap Platform introduces additional governance mechanisms:
          </p>

          <h5 className="text-md text-blue-400 mt-3">8.5.3.1 Feature Proposal System</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Community Submissions</strong>: Any user can submit proposals for new features or improvements</li>
            <li><strong>Discussion Period</strong>: Dedicated time for community discussion and feedback on proposals</li>
            <li><strong>Multi-stage Voting</strong>: Proposals go through multiple voting stages with increasing requirements</li>
            <li><strong>Implementation Tracking</strong>: Transparent tracking of approved proposal implementation progress</li>
          </ul>

          <h5 className="text-md text-blue-400 mt-3">8.5.3.2 Decentralized Moderation</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Reputation-based Moderation</strong>: Users with higher reputation scores have greater moderation privileges</li>
            <li><strong>Community Appeals</strong>: Decentralized appeals process for content moderation decisions</li>
            <li><strong>Transparent Logging</strong>: All moderation actions are logged and publicly auditable</li>
            <li><strong>Stake-weighted Decisions</strong>: Moderation decisions weighted by user stake in the platform</li>
          </ul>

          <h5 className="text-md text-blue-400 mt-3">8.5.3.3 Token Governance</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>SWAP Token Voting</strong>: Governance rights proportional to SWAP token holdings</li>
            <li><strong>Staking Incentives</strong>: Additional voting power for users who stake tokens for governance</li>
            <li><strong>Delegation System</strong>: Ability to delegate voting power to trusted community members</li>
            <li><strong>Quadratic Voting</strong>: Experimental quadratic voting mechanisms for certain decisions</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">8.5.4 Governance Process</h4>
          <p className="text-gray-300 leading-relaxed">
            The governance process follows a structured approach to ensure fair and effective decision-making:
          </p>

          <h5 className="text-md text-blue-400 mt-3">8.5.4.1 Proposal Lifecycle</h5>
          <ol className="text-gray-300 list-decimal list-inside mt-1 space-y-1">
            <li><strong>Submission</strong>: Community members submit proposals with detailed specifications</li>
            <li><strong>Discussion</strong>: 14-day discussion period for community feedback and refinement</li>
            <li><strong>Review</strong>: Technical review by core development team for feasibility</li>
            <li><strong>First Vote</strong>: Initial vote requiring 10% participation threshold</li>
            <li><strong>Refinement</strong>: Addressing feedback and making necessary adjustments</li>
            <li><strong>Final Vote</strong>: Final vote requiring 25% participation threshold</li>
            <li><strong>Implementation</strong>: Approved proposals enter development pipeline</li>
            <li><strong>Review</strong>: Post-implementation review and impact assessment</li>
          </ol>

          <h5 className="text-md text-blue-400 mt-3">8.5.4.2 Voting Mechanisms</h5>
          <ul className="text-gray-300 list-disc list-inside mt-1 space-y-1">
            <li><strong>Direct Voting</strong>: Users vote directly on proposals using their voting power</li>
            <li><strong>Delegated Voting</strong>: Users can delegate their voting power to representatives</li>
            <li><strong>Time-weighted Voting</strong>: Voting power increases with continuous platform participation</li>
            <li><strong>Reputation-weighted Voting</strong>: Voting influence adjusted by community reputation scores</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">8.5.5 Challenges and Considerations</h4>
          <p className="text-gray-300 leading-relaxed">
            Several challenges must be addressed in implementing effective community governance:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Voter Apathy</strong>: Ensuring active participation in governance processes</li>
            <li><strong>Whale Influence</strong>: Preventing excessive influence by large token holders</li>
            <li><strong>Technical Barriers</strong>: Making governance accessible to non-technical users</li>
            <li><strong>Decision Paralysis</strong>: Avoiding endless debates without reaching consensus</li>
            <li><strong>Implementation Gaps</strong>: Ensuring approved proposals are effectively implemented</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">8.5.6 Future Governance Developments</h4>
          <p className="text-gray-300 leading-relaxed">
            Planned enhancements to the governance system include:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>DAO Integration</strong>: Full Decentralized Autonomous Organization capabilities</li>
            <li><strong>Cross-chain Governance</strong>: Governance mechanisms spanning multiple blockchain networks</li>
            <li><strong>Liquid Democracy</strong>: Advanced delegation systems with revocable mandates</li>
            <li><strong>Predictive Governance</strong>: AI-assisted analysis of proposal outcomes and impacts</li>
            <li><strong>Constitutional Framework</strong>: Formalized governance constitution and dispute resolution</li>
          </ul>

          <h4 className="text-lg text-cyan-400 mt-4">8.5.7 Conclusion</h4>
          <p className="text-gray-300 leading-relaxed">
            Community governance and decentralized decision-making are fundamental to the long-term success and sustainability of the Hive Token Swap Platform. 
            By implementing transparent, inclusive, and adaptive governance mechanisms, the platform ensures that all stakeholders have a voice in its evolution. 
            As the platform matures, governance will play an increasingly important role in maintaining the decentralized ethos while enabling continued innovation and growth.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};