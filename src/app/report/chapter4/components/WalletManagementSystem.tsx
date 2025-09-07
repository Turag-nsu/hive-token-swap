import React from 'react';

export const WalletManagementSystem: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-6">4.2 Wallet Management System</h3>
      <p className="text-gray-300 leading-relaxed">
        The wallet management system provides users with comprehensive control over their digital assets:
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">4.2.1 Account Management</h4>
      <p className="text-gray-300 leading-relaxed">
        The AccountManager component displays:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li>Current account balances (HIVE, HBD, Hive Power)</li>
        <li>Delegation information</li>
        <li>Account statistics</li>
        <li>Refresh functionality</li>
      </ul>

      <h4 className="text-lg text-cyan-400 mt-4">4.2.2 Transaction History</h4>
      <p className="text-gray-300 leading-relaxed">
        The TransactionHistory component offers:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li>Chronological transaction display</li>
        <li>Advanced filtering capabilities</li>
        <li>Export functionality (CSV, JSON)</li>
        <li>Transaction details modal</li>
        <li>Statistics dashboard</li>
      </ul>
    </div>
  );
};