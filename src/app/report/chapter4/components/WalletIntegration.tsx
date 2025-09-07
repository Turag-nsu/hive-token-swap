import React from 'react';

export const WalletIntegration: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-6">4.6 Wallet Integration</h3>
      <p className="text-gray-300 leading-relaxed">
        The platform provides seamless integration with popular Hive blockchain wallets, ensuring users can securely manage their 
        digital assets and interact with the platform's features. The wallet integration system supports both Hive Keychain and 
        HiveSigner, offering users flexibility in how they manage their cryptographic keys and authorize transactions.
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">4.6.1 Hive Keychain Integration</h4>
      <p className="text-gray-300 leading-relaxed">
        Hive Keychain is a browser extension that provides secure key management for Hive accounts. The platform implements 
        comprehensive integration with Hive Keychain through:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Wallet Detection</strong>: Automatic detection of Hive Keychain installation status</li>
        <li><strong>Connection Management</strong>: Secure connection establishment with user account verification</li>
        <li><strong>Transaction Signing</strong>: Seamless signing of blockchain operations without exposing private keys</li>
        <li><strong>Multi-Operation Support</strong>: Ability to sign complex multi-operation transactions for token swaps</li>
        <li><strong>User Authentication</strong>: Cryptographic signature-based authentication for platform access</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">4.6.2 HiveSigner Integration</h4>
      <p className="text-gray-300 leading-relaxed">
        HiveSigner is a cloud-based wallet solution that provides an alternative to browser extensions. The platform supports 
        HiveSigner through:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>OAuth Integration</strong>: Secure authentication flow using OAuth 2.0 protocol</li>
        <li><strong>Token Management</strong>: Secure storage and management of access tokens</li>
        <li><strong>Transaction Broadcasting</strong>: Server-side transaction broadcasting with user authorization</li>
        <li><strong>Session Handling</strong>: Persistent session management with automatic token refresh</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">4.6.3 Wallet Abstraction Layer</h4>
      <p className="text-gray-300 leading-relaxed">
        To provide a unified interface for different wallet providers, the platform implements a wallet abstraction layer that:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Standardizes Operations</strong>: Provides consistent API for common wallet operations across providers</li>
        <li><strong>Handles Provider Differences</strong>: Manages differences in implementation between wallet providers</li>
        <li><strong>Ensures Security</strong>: Implements security best practices for key management and transaction signing</li>
        <li><strong>Provides Fallbacks</strong>: Offers graceful degradation when preferred wallet is unavailable</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">4.6.4 Security Considerations</h4>
      <p className="text-gray-300 leading-relaxed">
        Wallet integration security is paramount to protect user assets and maintain platform integrity:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Zero-Knowledge Architecture</strong>: Private keys never leave the user's device or HiveSigner servers</li>
        <li><strong>Transaction Verification</strong>: Users must verify all transaction details before signing</li>
        <li><strong>Secure Communication</strong>: All wallet communications occur over encrypted channels</li>
        <li><strong>Permission Management</strong>: Granular permission controls for different types of operations</li>
      </ul>
    </div>
  );
};