import React from 'react';

export const PlatformComparison: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-6">2.5 Platform Comparison</h3>
      <p className="text-gray-300 leading-relaxed">
        This section provides a comprehensive comparison between the Hive Token Swap Platform and existing decentralized social 
        media platforms, highlighting the unique features and advantages of our implementation.
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">2.5.1 Feature Comparison Matrix</h4>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-gray-800/50 border border-gray-700">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-2 px-4 border-b border-gray-600 text-left">Feature</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Hive Token Swap</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Steemit</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Minds</th>
              <th className="py-2 px-4 border-b border-gray-600 text-left">Mastodon</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">Blockchain Integration</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Hive with Wallet</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Hive (Basic)</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Ethereum-based</td>
              <td className="py-2 px-4 border-b border-gray-700 text-red-400">None</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">Token Swapping</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Native Integration</td>
              <td className="py-2 px-4 border-b border-gray-700 text-red-400">None</td>
              <td className="py-2 px-4 border-b border-gray-700 text-red-400">Limited</td>
              <td className="py-2 px-4 border-b border-gray-700 text-red-400">None</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">Wallet Management</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Integrated Dashboard</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Basic</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">External</td>
              <td className="py-2 px-4 border-b border-gray-700 text-red-400">None</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">Transaction History</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Real-time Tracking</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Basic</td>
              <td className="py-2 px-4 border-b border-gray-700 text-red-400">Limited</td>
              <td className="py-2 px-4 border-b border-gray-700 text-red-400">None</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">Content Monetization</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Multi-token Rewards</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">HIVE Rewards</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Token Rewards</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Boosts/Promotion</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">User Interface</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Modern & Intuitive</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Functional</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Modern</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Customizable</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">Mobile Experience</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Responsive Design</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Mobile App</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Native Apps</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Native Apps</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">Privacy Controls</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Granular Settings</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Basic</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Advanced</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Instance-based</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">Censorship Resistance</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">High (Blockchain)</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">High (Blockchain)</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Medium</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">High (Federated)</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-700">Community Governance</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Integrated Voting</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Hive Governance</td>
              <td className="py-2 px-4 border-b border-gray-700 text-yellow-400">Basic</td>
              <td className="py-2 px-4 border-b border-gray-700 text-green-400">Instance Governance</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="text-lg text-cyan-400 mt-6">2.5.2 Technical Architecture Comparison</h4>
      <p className="text-gray-300 leading-relaxed">
        The Hive Token Swap Platform distinguishes itself through its unique technical architecture:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Hybrid Approach</strong>: Combines social media features with integrated financial tools in a single interface</li>
        <li><strong>Real-time Wallet</strong>: Provides immediate access to blockchain transactions and token management</li>
        <li><strong>Token Swap Engine</strong>: Native integration with Hive Engine for seamless token exchanges</li>
        <li><strong>Multi-Wallet Support</strong>: Compatible with both Hive Keychain and HiveSigner for user flexibility</li>
        <li><strong>Performance Optimization</strong>: Implements advanced caching and state management for responsive user experience</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">2.5.3 User Experience Advantages</h4>
      <p className="text-gray-300 leading-relaxed">
        The platform offers several user experience advantages over existing solutions:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Unified Interface</strong>: Seamlessly integrates social networking with financial management</li>
        <li><strong>Intuitive Design</strong>: Modern UI/UX that abstracts blockchain complexity for mainstream users</li>
        <li><strong>Real-time Feedback</strong>: Instant transaction confirmations and balance updates</li>
        <li><strong>Comprehensive Analytics</strong>: Detailed transaction history and performance metrics</li>
        <li><strong>Flexible Authentication</strong>: Supports multiple wallet solutions for user convenience</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-6">2.5.4 Innovation and Differentiation</h4>
      <p className="text-gray-300 leading-relaxed">
        Key innovations that differentiate the Hive Token Swap Platform:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Native Token Swapping</strong>: First platform to offer integrated token swaps within a social interface</li>
        <li><strong>Multi-Token Economy</strong>: Supports various Hive Engine tokens beyond HIVE and HBD</li>
        <li><strong>Advanced Wallet Features</strong>: Comprehensive transaction history with filtering and export capabilities</li>
        <li><strong>Smart Contract Integration</strong>: Direct interaction with Hive Engine smart contracts</li>
        <li><strong>Economic Incentives</strong>: Reward mechanisms for both content creation and platform engagement</li>
      </ul>
    </div>
  );
};