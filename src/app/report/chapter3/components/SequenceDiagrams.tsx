import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const SequenceDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">3.4 Blockchain Interaction Sequence Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed sequence diagrams that illustrate the interactions between the Hive Token Swap Platform and the Hive blockchain. 
            These diagrams provide a visual representation of the complex processes involved in blockchain operations.
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">3.4.1 User Authentication and Login Sequence</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`User -> Platform: Initiate Login
Platform -> HiveKeychain: Request Signature
HiveKeychain -> User: Prompt for Authentication
User -> HiveKeychain: Provide Authentication
HiveKeychain -> Platform: Return Signed Challenge
Platform -> Hive Blockchain: Verify Signature
Hive Blockchain -> Platform: Return Verification Result
Platform -> User: Grant/Deny Access`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">3.4.2 Token Swap Process Sequence</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`User -> Platform: Initiate Token Swap
Platform -> User: Display Swap Details and Fees
User -> Platform: Confirm Swap
Platform -> Hive Engine: Execute Token Swap
Hive Engine -> Platform: Return Transaction ID
Platform -> Hive Blockchain: Broadcast Transaction
Hive Blockchain -> Platform: Confirm Transaction
Platform -> User: Display Swap Result
Platform -> User: Update Wallet Balance`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">3.4.3 Content Creation and Publishing Sequence</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`User -> Platform: Create Content
User -> Platform: Submit for Publishing
Platform -> User: Request Confirmation
User -> Platform: Confirm Publication
Platform -> HiveKeychain: Request Content Signing
HiveKeychain -> User: Prompt for Signature
User -> HiveKeychain: Provide Signature
HiveKeychain -> Platform: Return Signed Content
Platform -> Hive Blockchain: Broadcast Content
Hive Blockchain -> Platform: Confirm Publication
Platform -> User: Display Published Content`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">3.4.4 Transaction History Retrieval Sequence</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`User -> Platform: Request Transaction History
Platform -> Hive Blockchain: Query Account History
Hive Blockchain -> Platform: Return Transaction Data
Platform -> Platform: Process and Format Data
Platform -> User: Display Transaction History
User -> Platform: Request Additional Details
Platform -> Hive Blockchain: Query Specific Transaction
Hive Blockchain -> Platform: Return Transaction Details
Platform -> User: Display Detailed Information`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">3.4.5 Wallet Balance Update Sequence</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`Platform -> Hive Blockchain: Query Account Balances
Hive Blockchain -> Platform: Return Balance Information
Platform -> Platform: Process Balance Data
Platform -> User Interface: Update Wallet Display
User Interface -> User: Show Updated Balances
Platform -> Hive Engine: Query Token Balances
Hive Engine -> Platform: Return Token Data
Platform -> Platform: Process Token Data
Platform -> User Interface: Update Token Display
User Interface -> User: Show Updated Token Balances`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">3.4.6 Content Interaction (Vote/Comment) Sequence</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`User -> Platform: Interact with Content (Vote/Comment)
Platform -> User: Request Confirmation
User -> Platform: Confirm Action
Platform -> HiveKeychain: Request Action Signing
HiveKeychain -> User: Prompt for Signature
User -> HiveKeychain: Provide Signature
HiveKeychain -> Platform: Return Signed Action
Platform -> Hive Blockchain: Broadcast Action
Hive Blockchain -> Platform: Confirm Action
Platform -> User: Display Updated Content
Platform -> Content Creator: Notify of Interaction`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">3.4.7 Smart Contract Interaction Sequence</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`Platform -> Hive Engine: Query Smart Contract
Hive Engine -> Platform: Return Contract Information
Platform -> User: Display Contract Details
User -> Platform: Initiate Contract Interaction
Platform -> User: Request Parameters
User -> Platform: Provide Parameters
Platform -> HiveKeychain: Request Transaction Signing
HiveKeychain -> User: Prompt for Signature
User -> HiveKeychain: Provide Signature
HiveKeychain -> Platform: Return Signed Transaction
Platform -> Hive Engine: Execute Contract Function
Hive Engine -> Platform: Return Execution Result
Platform -> User: Display Result`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">3.4.8 Error Handling and Recovery Sequence</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`Platform -> Hive Blockchain: Send Transaction
Hive Blockchain -> Platform: Return Error
Platform -> Platform: Analyze Error
Platform -> User: Display Error Message
Platform -> User: Provide Recovery Options
User -> Platform: Select Recovery Action
Platform -> Platform: Execute Recovery
Platform -> Hive Blockchain: Retry Transaction
Hive Blockchain -> Platform: Return Success/Failure
Platform -> User: Display Final Result`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">3.4.9 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>User</strong>: End user interacting with the platform</li>
              <li><strong>Platform</strong>: Hive Token Swap Platform frontend and backend services</li>
              <li><strong>HiveKeychain</strong>: Browser extension for secure key management</li>
              <li><strong>Hive Blockchain</strong>: Main Hive blockchain network</li>
              <li><strong>Hive Engine</strong>: Smart contract platform for token operations</li>
              <li><strong>User Interface</strong>: Frontend components displaying information to the user</li>
              <li><strong>Content Creator</strong>: User who created the content being interacted with</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};