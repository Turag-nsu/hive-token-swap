import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const ClassDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.12 Core Component Class Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed class diagrams that illustrate the structure and relationships of the core components 
            within the Hive Token Swap Platform. These diagrams provide a visual representation of the object-oriented design 
            and help understand how different parts of the system interact with each other.
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">4.12.1 Wallet Management Class Diagram</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`+---------------------+        +---------------------+
|   WalletService     |<>----->|   HiveKeychainAPI   |
+---------------------+        +---------------------+
| + connectWallet()   |        | + signTransaction() |
| + getBalance()      |        | + getAccounts()     |
| + transferTokens()  |        | + requestSignature()|
| + stakeTokens()     |        +---------------------+
| + unstakeTokens()   |                
+---------------------+                
         ^                             
         | inherits                      
         |                             
+---------------------+        +---------------------+
| HiveWalletService   |<>----->|   HiveSignerAPI     |
+---------------------+        +---------------------+
| + connectHiveSigner()|       | + signTransaction() |
| + getHiveBalance()   |       | + getAccounts()     |
| + hiveTransfer()     |       | + requestSignature()|
+---------------------+        +---------------------+

+---------------------+
|    WalletStore      |
+---------------------+
| - balance: number   |
| - address: string   |
| - isConnected: bool |
+---------------------+
| + updateBalance()   |
| + setAddress()      |
| + setConnection()   |
+---------------------+`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.12.2 Token Swap Class Diagram</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`+---------------------+        +---------------------+
|  TokenSwapService   |<>----->|  HiveEngineAPI      |
+---------------------+        +---------------------+
| + swapTokens()      |        | + executeContract() |
| + getSwapRate()     |        | + getContractData() |
| + validateSwap()    |        | + getTableData()    |
| + calculateFees()   |        +---------------------+
+---------------------+                
         ^                             
         | uses                        
         |                             
+---------------------+        +---------------------+
| SwapTransaction     |<>----->|   TransactionStore  |
+---------------------+        +---------------------+
| - fromToken: string |        | - transactions: []  |
| - toToken: string   |        | - pending: []       |
| - amount: number    |        +---------------------+
| - fee: number       |        | + addTransaction()  |
| - timestamp: Date   |        | + updateStatus()    |
+---------------------+        | + getHistory()      |
| + execute()         |        +---------------------+
| + validate()        |                
| + calculateOutput() |                
+---------------------+`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.12.3 Social Media Content Class Diagram</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`+---------------------+        +---------------------+
|   ContentService    |<>----->|   HiveBlockchainAPI |
+---------------------+        +---------------------+
| + createPost()      |        | + broadcastOp()     |
| + getFeed()         |        | + getAccounts()     |
| + voteContent()     |        | + getDiscussions()  |
| + commentOnPost()   |        | + getAccountHistory()|
+---------------------+        +---------------------+
         ^                             
         | manages                     
         |                             
+---------------------+        +---------------------+
|     Post            |<>----->|     User            |
+---------------------+        +---------------------+
| - author: string    |        | - username: string  |
| - permlink: string  |        | - reputation: number|
| - title: string     |        | - profile: object   |
| - body: string      |        +---------------------+
| - tags: string[]    |        | + getProfile()      |
| - metadata: object  |        | + updateProfile()   |
+---------------------+        +---------------------+
| + publish()         |                
| + edit()            |                
| + delete()          |                
+---------------------+

+---------------------+
|    Comment          |
+---------------------+
| - parentAuthor: string
| - parentPermlink: string
| - body: string
+---------------------+
| + reply()           |
| + edit()            |
+---------------------+`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.12.4 State Management Class Diagram</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`+---------------------+        +---------------------+
|   ZustandStore      |<>----->|   ReactQueryClient  |
+---------------------+        +---------------------+
| - userState         |        | - queryCache        |
| - walletState       |        | - mutationCache     |
| - contentState      |        | - defaultOptions    |
+---------------------+        +---------------------+
| + getState()        |        | + fetchQuery()      |
| + setState()        |        | + prefetchQuery()   |
| + subscribe()       |        | + invalidateQueries()|
| + unsubscribe()     |        | + setQueryData()    |
+---------------------+        +---------------------+
         ^                             
         | uses                        
         |                             
+---------------------+        +---------------------+
|  StoreProvider      |<>----->|   QueryProvider     |
+---------------------+        +---------------------+
| + provideStore()    |        | + provideClient()   |
+---------------------+        +---------------------+

+---------------------+
|   StoreHooks        |
+---------------------+
| + useUserStore()    |
| + useWalletStore()  |
| + useContentStore() |
+---------------------+`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.12.5 API Integration Class Diagram</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`+---------------------+        +---------------------+
|   APIService        |<>----->|   HttpClient        |
+---------------------+        +---------------------+
| + get()             |        | + request()         |
| + post()            |        | + get()             |
| + put()             |        | + post()            |
| + delete()          |        | + intercept()       |
+---------------------+        +---------------------+
         ^                             
         | implements                  
         |                             
+---------------------+        +---------------------+
| HiveAPI             |<>----->|   APIConfig         |
+---------------------+        +---------------------+
| + getAccount()      |        | - baseURL: string   |
| + getFeed()         |        | - timeout: number   |
| + broadcastOp()     |        | - headers: object   |
| + getHistory()      |        +---------------------+
+---------------------+                
         ^                             
         | extends                     
         |                             
+---------------------+        +---------------------+
| HiveEngineAPI       |<>----->|   ContractService   |
+---------------------+        +---------------------+
| + getContract()     |        | + execute()         |
| + getTable()        |        | + call()            |
| + find()            |        | + getContractInfo() |
+---------------------+        +---------------------+`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.12.6 Component Hierarchy Class Diagram</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`+---------------------+
|    App              |
+---------------------+
| + render()          |
+---------------------+
         |                             
         | contains                    
         |                             
+---------------------+        +---------------------+
|   Layout            |<>----->|   Header            |
+---------------------+        +---------------------+
| + render()          |        | + render()          |
+---------------------+        +---------------------+
         |                             
         | contains                    
         |                             
+---------------------+        +---------------------+
|   MainContent       |<>----->|   Sidebar           |
+---------------------+        +---------------------+
| + render()          |        | + render()          |
+---------------------+        +---------------------+
         |                             
         | contains                    
         |                             
+---------------------+        +---------------------+
|   RouteComponents   |<>----->|   SharedComponents  |
+---------------------+        +---------------------+
| + Dashboard         |        | + Button            |
| + Wallet            |        | + Card              |
| + SocialFeed        |        | + Modal             |
| + Profile           |        | + Input             |
+---------------------+        | + Table             |
         |                     +---------------------+
         | uses                          
         |                             
+---------------------+        +---------------------+
|   PageComponents    |<>----->|   UIComponents      |
+---------------------+        +---------------------+
| + DashboardPage     |        | + WalletBalance     |
| + WalletPage        |        | + TransactionList   |
| + FeedPage          |        | + ContentCard       |
| + ProfilePage       |        | + VoteButton        |
+---------------------+        +---------------------+`}
            </pre>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.12.7 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Class Name</strong>: Represented in bold at the top of each box</li>
              <li><strong>Attributes</strong>: Listed below the class name, preceded by visibility indicators (+ for public, - for private)</li>
              <li><strong>Methods</strong>: Listed after attributes, also with visibility indicators</li>
              <li><strong>Association</strong>: Solid line connecting classes that interact with each other</li>
              <li><strong>Inheritance</strong>: Arrow with a hollow triangle pointing to the parent class</li>
              <li><strong>Aggregation</strong>: Diamond-shaped connection indicating a "has-a" relationship</li>
              <li><strong>Dependency</strong>: Dashed line with arrow indicating a usage relationship</li>
            </ul>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.12.8 Class Diagram Benefits</h4>
          <p className="text-gray-300 leading-relaxed">
            These class diagrams provide several benefits for understanding and maintaining the Hive Token Swap Platform:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li><strong>Architectural Clarity</strong>: Visual representation of the system's structure and organization</li>
            <li><strong>Communication Tool</strong>: Common language for developers to discuss system design</li>
            <li><strong>Design Validation</strong>: Mechanism to verify that the design meets requirements</li>
            <li><strong>Documentation</strong>: Living documentation that evolves with the codebase</li>
            <li><strong>Refactoring Guidance</strong>: Clear understanding of dependencies when making changes</li>
            <li><strong>Onboarding</strong>: Quick understanding of the system for new team members</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};