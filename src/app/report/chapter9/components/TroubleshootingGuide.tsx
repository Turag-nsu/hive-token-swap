import React from 'react';

export const TroubleshootingGuide: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl text-blue-400 mb-4">9.1 Troubleshooting Guide and Common Issues Resolution</h2>
        <p className="text-gray-300 leading-relaxed">
          This section provides solutions to common issues users may encounter when using the Hive Token Swap Platform. 
          The troubleshooting guide is organized by category to help users quickly identify and resolve problems.
        </p>

        <h3 className="text-xl text-purple-400 mt-6">9.1.1 Wallet Connection Issues</h3>
        
        <h4 className="text-lg text-cyan-400 mt-4">Problem: Wallet Not Detected</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Symptoms</strong>: The platform fails to detect installed wallets like Hive Keychain or HiveSigner.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Ensure the wallet extension is properly installed and enabled in your browser</li>
          <li>Refresh the page after installing or enabling the wallet extension</li>
          <li>Check browser compatibility - some wallets may not support all browsers</li>
          <li>Try using a different browser if the issue persists</li>
          <li>Verify that the wallet is unlocked and has an active account</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">Problem: Connection Timeout</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Symptoms</strong>: The wallet connection process hangs or times out without completing.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Check your internet connection stability</li>
          <li>Clear browser cache and cookies for the platform domain</li>
          <li>Restart your browser and try connecting again</li>
          <li>Ensure your wallet extension is up to date</li>
          <li>Try connecting during off-peak hours when network congestion is lower</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">9.1.2 Token Swap Issues</h3>
        
        <h4 className="text-lg text-cyan-400 mt-4">Problem: Insufficient Balance Error</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Symptoms</strong>: The platform displays an "insufficient balance" error despite having tokens in your wallet.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Verify that you're connected to the correct Hive account</li>
          <li>Check that your tokens are in the correct wallet (Hive Engine vs. native Hive)</li>
          <li>Refresh your wallet balance by disconnecting and reconnecting</li>
          <li>Ensure you have sufficient RC (Resource Credits) for transaction processing</li>
          <li>Check if there are any pending transactions that might affect your balance</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">Problem: Transaction Not Processing</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Symptoms</strong>: Token swap transactions appear to submit but never complete or confirm.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Check the Hive blockchain explorer for transaction status using the transaction ID</li>
          <li>Ensure your account has sufficient HIVE for transaction fees</li>
          <li>Verify that the token contract is active and functioning properly</li>
          <li>Try the transaction again after a few minutes if the network is congested</li>
          <li>Contact support if the transaction remains pending for more than 24 hours</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">9.1.3 Performance Issues</h3>
        
        <h4 className="text-lg text-cyan-400 mt-4">Problem: Slow Page Loading</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Symptoms</strong>: Pages take an unusually long time to load or display content.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Check your internet connection speed and stability</li>
          <li>Clear browser cache and cookies</li>
          <li>Disable browser extensions that might interfere with the platform</li>
          <li>Try accessing the platform from a different network</li>
          <li>Use a modern browser for optimal performance</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">Problem: UI Freezing or Lagging</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Symptoms</strong>: The user interface becomes unresponsive or experiences significant lag.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Close other browser tabs and applications to free up system resources</li>
          <li>Restart your browser</li>
          <li>Update your browser to the latest version</li>
          <li>Check if your device meets the minimum system requirements</li>
          <li>Try accessing the platform on a different device</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">9.1.4 Security and Authentication Issues</h3>
        
        <h4 className="text-lg text-cyan-400 mt-4">Problem: Authentication Failures</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Symptoms</strong>: Unable to authenticate or login to the platform despite correct credentials.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Ensure you're using the correct Hive account name</li>
          <li>Verify that your wallet is unlocked and accessible</li>
          <li>Check that you've approved the authentication request in your wallet</li>
          <li>Try clearing browser cache and cookies</li>
          <li>Contact support if the issue persists</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">9.1.5 Browser-Specific Issues</h3>
        
        <h4 className="text-lg text-cyan-400 mt-4">Chrome-Specific Problems</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Ensure Chrome is updated to the latest version</li>
          <li>Check that all required extensions are enabled</li>
          <li>Disable conflicting extensions temporarily</li>
          <li>Reset Chrome settings to default if necessary</li>
        </ul>

        <h4 className="text-lg text-cyan-400 mt-4">Firefox-Specific Problems</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Ensure Firefox is updated to the latest version</li>
          <li>Check that tracking protection is not blocking essential scripts</li>
          <li>Adjust privacy settings to allow necessary cookies</li>
          <li>Try disabling Firefox containers for the platform</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">9.1.6 Mobile Device Issues</h3>
        
        <h4 className="text-lg text-cyan-400 mt-4">Problem: Mobile Browser Compatibility</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Symptoms</strong>: Features not working correctly on mobile browsers.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Use the latest version of your mobile browser</li>
          <li>Try switching between desktop and mobile site modes</li>
          <li>Check if your mobile device meets the minimum requirements</li>
          <li>Consider using a dedicated mobile application if available</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">9.1.7 Network and Connectivity Issues</h3>
        
        <h4 className="text-lg text-cyan-400 mt-4">Problem: Intermittent Connection Loss</h4>
        <p className="text-gray-300 leading-relaxed">
          <strong>Symptoms</strong>: Frequent disconnections or loss of connectivity to the platform.
        </p>
        <p className="text-gray-300 leading-relaxed">
          <strong>Solutions</strong>:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Check your internet connection stability</li>
          <li>Switch to a wired connection if using Wi-Fi</li>
          <li>Try connecting to a different network</li>
          <li>Restart your router or modem</li>
          <li>Contact your internet service provider if issues persist</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">9.1.8 Contacting Support</h3>
        <p className="text-gray-300 leading-relaxed">
          If you encounter issues that cannot be resolved through this troubleshooting guide, please contact our support team:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Email: support@hivetokenswap.io</li>
          <li>Community Discord: discord.gg/hivetokenswap</li>
          <li>GitHub Issues: github.com/hivetokenswap/platform/issues</li>
          <li>When reporting issues, include screenshots, error messages, and steps to reproduce</li>
        </ul>

        <h3 className="text-xl text-purple-400 mt-6">9.1.9 Preventive Measures</h3>
        <p className="text-gray-300 leading-relaxed">
          To minimize the likelihood of encountering issues:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li>Keep your browser and wallet extensions updated</li>
          <li>Regularly clear browser cache and cookies</li>
          <li>Maintain sufficient HIVE balance for transaction fees</li>
          <li>Monitor Hive blockchain status for any ongoing issues</li>
          <li>Bookmark official communication channels for updates</li>
        </ul>
      </div>
    </section>
  );
};