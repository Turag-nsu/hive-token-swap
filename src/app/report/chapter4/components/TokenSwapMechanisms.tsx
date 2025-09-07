import React from 'react';

export const TokenSwapMechanisms: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-6">4.3 Token Swap Mechanisms</h3>
      <p className="text-gray-300 leading-relaxed">
        The token swap functionality is a core feature of the platform, enabling users to exchange various Hive-based tokens 
        seamlessly within the application. This system integrates with the Hive Engine decentralized exchange to provide 
        a user-friendly swapping experience.
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">4.3.1 Hive Engine Integration</h4>
      <p className="text-gray-300 leading-relaxed">
        Hive Engine is a smart contract sidechain that runs on the Hive blockchain, providing additional functionality 
        beyond the base Hive protocol. The platform integrates with Hive Engine through:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Custom JSON Operations</strong>: All token swap operations are executed through custom_json operations 
        broadcast to the Hive blockchain, ensuring security and transparency.</li>
        <li><strong>Smart Contract Interaction</strong>: The platform interacts with Hive Engine smart contracts for 
        token transfers, market operations, and staking functionalities.</li>
        <li><strong>Token Metadata Retrieval</strong>: Real-time token information is fetched from Hive Engine APIs to 
        display accurate balances and market data.</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">4.3.2 Swap Operation Workflow</h4>
      <p className="text-gray-300 leading-relaxed">
        The token swap process follows a secure multi-step workflow:
      </p>
      <ol className="text-gray-300 list-decimal list-inside mt-2 space-y-1">
        <li>User selects tokens to swap and specifies amounts</li>
        <li>Platform calculates exchange rates and fees using Hive Engine market data</li>
        <li>User reviews transaction details including slippage tolerance and minimum receive amounts</li>
        <li>Transaction is signed using Hive Keychain without exposing private keys</li>
        <li>Custom JSON operation is broadcast to the Hive blockchain</li>
        <li>Transaction confirmation is monitored and displayed to the user</li>
      </ol>

      <h4 className="text-lg text-cyan-400 mt-4">4.3.3 Supported Token Operations</h4>
      <p className="text-gray-300 leading-relaxed">
        The platform supports various token operations on Hive Engine:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li><strong>Token Transfer</strong>: Direct peer-to-peer transfers of Hive Engine tokens</li>
        <li><strong>Market Trading</strong>: Buy and sell orders on the Hive Engine decentralized exchange</li>
        <li><strong>Staking</strong>: Stake tokens to earn passive rewards</li>
        <li><strong>Unstaking</strong>: Unstake tokens with appropriate cooldown periods</li>
        <li><strong>Liquidity Provision</strong>: Add liquidity to trading pairs for yield farming</li>
      </ul>
    </div>
  );
};