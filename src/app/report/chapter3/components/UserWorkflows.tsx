import React from 'react';

export const UserWorkflows: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl text-blue-400 mb-4">3.5 Key User Workflows</h2>
        <p className="text-gray-300 leading-relaxed">
          Understanding and optimizing key user workflows is essential for creating an intuitive and efficient platform. 
          This section presents detailed flowcharts for the most important user journeys within the Hive Token Swap Platform.
        </p>

        <h3 className="text-xl text-purple-400 mt-6">3.5.1 Wallet Connection Workflow</h3>
        <p className="text-gray-300 leading-relaxed">
          The wallet connection workflow enables users to securely connect their Hive blockchain wallets to the platform:
        </p>
        <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm mt-4">
{`Start
  ↓
User clicks "Connect Wallet" button
  ↓
Display wallet selection modal
  ↓
User selects wallet type (Hive Keychain or HiveSigner)
  ↓
[Y] Hive Keychain detected?
  ↓
[N] → Display installation instructions
  ↓
[Y] → Request account access
  ↓
User confirms account selection in wallet
  ↓
Verify account signature
  ↓
[Y] Signature valid?
  ↓
[N] → Display error and retry option
  ↓
[Y] → Fetch account data from Hive API
  ↓
Update UI with connected account information
  ↓
Initialize wallet state in application
  ↓
End`}
        </pre>

        <h3 className="text-xl text-purple-400 mt-8">3.5.2 Token Swap Workflow</h3>
        <p className="text-gray-300 leading-relaxed">
          The token swap workflow allows users to exchange Hive-based tokens seamlessly within the platform:
        </p>
        <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm mt-4">
{`Start
  ↓
User navigates to Token Swap page
  ↓
Load available tokens from Hive Engine
  ↓
User selects "From" token and enters amount
  ↓
Validate token balance and input amount
  ↓
[Y] Sufficient balance?
  ↓
[N] → Display insufficient balance error
  ↓
[Y] → Calculate swap rate and fees
  ↓
Display estimated output and transaction details
  ↓
User reviews transaction details
  ↓
User confirms swap operation
  ↓
Prepare custom_json operation for Hive blockchain
  ↓
Request transaction signing through connected wallet
  ↓
User signs transaction in wallet
  ↓
Broadcast signed transaction to Hive blockchain
  ↓
Monitor transaction confirmation status
  ↓
[Y] Transaction confirmed?
  ↓
[N] → Display pending status and continue monitoring
  ↓
[Y] → Update user interface with success message
  ↓
Refresh token balances
  ↓
End`}
        </pre>

        <h3 className="text-xl text-purple-400 mt-8">3.5.3 Social Media Interaction Workflow</h3>
        <p className="text-gray-300 leading-relaxed">
          The social media interaction workflow enables users to engage with content and other users:
        </p>
        <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm mt-4">
{`Start
  ↓
User views social feed
  ↓
Load posts from Hive blockchain API
  ↓
Display posts with engagement options
  ↓
User interacts with post (vote, comment, share)
  ↓
[Y] User votes on post?
  ↓
  → Prepare vote operation
  ↓
[Y] User comments on post?
  ↓
  → Display comment input field
  ↓
  → User enters comment content
  ↓
  → Validate comment content
  ↓
  → Prepare comment operation
  ↓
Request operation signing through connected wallet
  ↓
User signs operation in wallet
  ↓
Broadcast signed operation to Hive blockchain
  ↓
Monitor operation confirmation
  ↓
[Y] Operation confirmed?
  ↓
[N] → Display pending status
  ↓
[Y] → Update UI with new interaction
  ↓
Notify relevant users (mentions, replies)
  ↓
End`}
        </pre>

        <h3 className="text-xl text-purple-400 mt-8">3.5.4 Transaction History Viewing Workflow</h3>
        <p className="text-gray-300 leading-relaxed">
          The transaction history workflow allows users to view and analyze their blockchain transaction history:
        </p>
        <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm mt-4">
{`Start
  ↓
User navigates to Wallet Dashboard
  ↓
Display recent transactions section
  ↓
User clicks "View All Transactions"
  ↓
Load transaction history from Hive API
  ↓
[Y] Cache available?
  ↓
[Y] → Display cached transactions immediately
  ↓
Fetch latest transactions from API in background
  ↓
Apply filtering and sorting options
  ↓
[Y] User applies filters?
  ↓
  → Update displayed transactions
  ↓
[Y] User sorts transactions?
  ↓
  → Reorder displayed transactions
  ↓
User selects transaction for details
  ↓
Display detailed transaction information
  ↓
[Y] User exports transaction data?
  ↓
  → Generate CSV/JSON export
  ↓
  → Trigger download
  ↓
End`}
        </pre>

        <h3 className="text-xl text-purple-400 mt-8">3.5.5 Content Creation Workflow</h3>
        <p className="text-gray-300 leading-relaxed">
          The content creation workflow enables users to create and publish posts to the Hive blockchain:
        </p>
        <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm mt-4">
{`Start
  ↓
User clicks "Create Post" button
  ↓
Display post creation interface
  ↓
User enters post title and content
  ↓
[Y] User adds tags?
  ↓
  → Validate and format tags
  ↓
[Y] User adds images?
  ↓
  → Process and optimize images
  ↓
  → Upload to IPFS or image hosting
  ↓
User previews post
  ↓
Validate post content and metadata
  ↓
[Y] Content valid?
  ↓
[N] → Display validation errors
  ↓
[Y] → Enable publish button
  ↓
User clicks "Publish" button
  ↓
Prepare custom_json operation for post
  ↓
Request signing through connected wallet
  ↓
User signs post operation
  ↓
Broadcast operation to Hive blockchain
  ↓
Monitor post confirmation
  ↓
[Y] Post confirmed?
  ↓
[N] → Display pending status
  ↓
[Y] → Update feed with new post
  ↓
Notify followers of new content
  ↓
End`}
        </pre>

        <h3 className="text-xl text-purple-400 mt-8">3.5.6 Workflow Optimization Considerations</h3>
        <p className="text-gray-300 leading-relaxed">
          Several optimization strategies are implemented to enhance workflow efficiency:
        </p>
        <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
          <li><strong>Progressive Disclosure</strong>: Complex features revealed gradually to avoid overwhelming users</li>
          <li><strong>Error Prevention</strong>: Input validation and clear guidance to prevent workflow interruptions</li>
          <li><strong>Performance Optimization</strong>: Asynchronous operations and loading states to maintain responsiveness</li>
          <li><strong>User Feedback</strong>: Clear indication of system status and operation progress</li>
          <li><strong>Recovery Options</strong>: Easy ways to undo actions or recover from errors</li>
        </ul>
      </div>
    </section>
  );
};