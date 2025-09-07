import React from 'react';
import { HiveAPIIntegration } from './HiveAPIIntegration';

export const BlockchainIntegration: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-4">4.1 Blockchain Integration</h3>
      <p className="text-gray-300 leading-relaxed">
        The platform integrates with the Hive blockchain through several mechanisms:
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">4.1.1 Hive Keychain Integration</h4>
      <p className="text-gray-300 leading-relaxed">
        Hive Keychain is a browser extension that provides secure key management for Hive accounts. The platform implements:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li>Wallet connection functionality</li>
        <li>Transaction signing capabilities</li>
        <li>User authentication through cryptographic signatures</li>
        <li>Follow/unfollow operations</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">4.1.2 Hive API Services</h4>
      <p className="text-gray-300 leading-relaxed">
        The platform implements several API service classes:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>HiveAccountAPI</strong>: Handles account-related operations</li>
        <li><strong>HiveTransactionAPI</strong>: Manages transaction history</li>
        <li><strong>HiveMarketAPI</strong>: Provides market data</li>
        <li><strong>HiveSocialAPI</strong>: Manages social features</li>
      </ul>
      
      <HiveAPIIntegration />
    </div>
  );
};