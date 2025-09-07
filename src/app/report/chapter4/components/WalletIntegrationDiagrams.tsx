import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const WalletIntegrationDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.15 Wallet Integration Process Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that illustrate the wallet integration processes within the Hive Token Swap Platform, 
            showing how users connect their wallets, authorize transactions, and interact with blockchain features through both 
            Hive Keychain and HiveSigner.
          </p>

          {/* Wallet Connection Flow */}
          <h4 className="text-lg text-cyan-400 mt-6">4.15.1 Wallet Connection Process Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center">
              {/* User initiates connection */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-8">
                <span className="text-white font-bold text-center">User<br/>Initiates<br/>Connection</span>
              </div>
              
              {/* First Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 mx-auto"></div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 w-full max-w-2xl text-center mb-8 shadow-md">
                <h5 className="text-white font-bold">Wallet Selection</h5>
                <p className="text-purple-100 text-sm">User chooses between Hive Keychain or HiveSigner</p>
              </div>
              
              {/* Second Level - Branching */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-8">
                {/* Hive Keychain Path */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-4 w-full text-center mb-6 shadow-md">
                    <h6 className="text-white font-bold">Hive Keychain Path</h6>
                  </div>
                  
                  <div className="space-y-6 w-full">
                    <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-3 text-center">
                      <span className="text-white font-bold">Check Extension</span>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-orange-500 mx-auto"></div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-3 text-center">
                      <span className="text-white font-bold">Request Account</span>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 mx-auto"></div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-3 text-center">
                      <span className="text-white font-bold">Verify Signature</span>
                    </div>
                  </div>
                </div>
                
                {/* HiveSigner Path */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 w-full text-center mb-6 shadow-md">
                    <h6 className="text-white font-bold">HiveSigner Path</h6>
                  </div>
                  
                  <div className="space-y-6 w-full">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-3 text-center">
                      <span className="text-white font-bold">OAuth Redirect</span>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 mx-auto"></div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-3 text-center">
                      <span className="text-white font-bold">Token Exchange</span>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-red-500 mx-auto"></div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-3 text-center">
                      <span className="text-white font-bold">Account Fetch</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Convergence */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-500 to-green-600 rounded-xl p-4 w-full max-w-2xl text-center shadow-md">
                <h5 className="text-white font-bold">Wallet Connected</h5>
                <p className="text-yellow-100 text-sm">User account available for transactions</p>
              </div>
            </div>
          </div>

          {/* Transaction Authorization Flow */}
          <h4 className="text-lg text-cyan-400 mt-8">4.15.2 Transaction Authorization Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Central Transaction Request */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-center">Transaction<br/>Request</span>
                </div>
              </div>
              
              {/* Wallet Provider Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center shadow-md">
                  <h5 className="text-white font-bold mb-2">Hive Keychain</h5>
                  <div className="space-y-3">
                    <div className="bg-cyan-500/80 rounded p-2">
                      <span className="text-white text-sm">Show Transaction Details</span>
                    </div>
                    <div className="bg-cyan-500/80 rounded p-2">
                      <span className="text-white text-sm">Request Signature</span>
                    </div>
                    <div className="bg-cyan-500/80 rounded p-2">
                      <span className="text-white text-sm">Return Signed Transaction</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 text-center shadow-md">
                  <h5 className="text-white font-bold mb-2">HiveSigner</h5>
                  <div className="space-y-3">
                    <div className="bg-pink-500/80 rounded p-2">
                      <span className="text-white text-sm">Redirect to Authorization</span>
                    </div>
                    <div className="bg-pink-500/80 rounded p-2">
                      <span className="text-white text-sm">User Confirms</span>
                    </div>
                    <div className="bg-pink-500/80 rounded p-2">
                      <span className="text-white text-sm">Broadcast Transaction</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Transaction Processing */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-center shadow-md">
                <h5 className="text-white font-bold mb-2">Transaction Processing</h5>
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="bg-emerald-500/80 rounded p-2">
                    <span className="text-white text-sm">Validate</span>
                  </div>
                  <div className="bg-emerald-500/80 rounded p-2">
                    <span className="text-white text-sm">Broadcast</span>
                  </div>
                  <div className="bg-emerald-500/80 rounded p-2">
                    <span className="text-white text-sm">Confirm</span>
                  </div>
                  <div className="bg-emerald-500/80 rounded p-2">
                    <span className="text-white text-sm">Update UI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Security Architecture */}
          <h4 className="text-lg text-cyan-400 mt-8">4.15.3 Wallet Security Architecture</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* User Device */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">User Device</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Browser</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive Keychain Extension</span>
                  </div>
                  <div className="text-center text-gray-400">🔒 Private Keys Never Leave</div>
                </div>
              </div>
              
              {/* Platform Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Platform Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Wallet Provider</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Transaction Builder</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Security Validator</span>
                  </div>
                </div>
              </div>
              
              {/* Blockchain Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Blockchain Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive Node</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Smart Contracts</span>
                  </div>
                  <div className="text-center text-gray-400">🌐 Public Network</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col items-center">
              <div className="w-full max-w-md h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 mb-3"></div>
              <div className="text-center text-gray-400">🔐 Encrypted Communication Channels</div>
            </div>
          </div>

          {/* Wallet State Management */}
          <h4 className="text-lg text-cyan-400 mt-8">4.15.4 Wallet State Management</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center">
              {/* Initial State */}
              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg p-4 w-48 text-center mb-6 shadow-md">
                <h5 className="text-white font-bold">Disconnected</h5>
              </div>
              
              {/* State Transitions */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 w-full max-w-4xl">
                <div className="flex flex-col items-center">
                  <div className="text-2xl text-blue-400 mb-2">↓</div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Connecting</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-2xl text-green-400 mb-2">↓</div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Connected</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-2xl text-yellow-400 mb-2">↓</div>
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Transacting</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-2xl text-red-400 mb-2">↓</div>
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Error/Disconnected</span>
                  </div>
                </div>
              </div>
              
              {/* Return Loop */}
              <div className="relative w-full max-w-3xl">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 to-gray-700"></div>
                <div className="absolute top-1/2 left-4 text-gray-400 font-bold">↺</div>
                <div className="text-center text-gray-400 mt-8">State transitions based on user actions and system events</div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.15.5 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different components and states in the wallet integration process</li>
              <li><strong>Arrows (↓)</strong>: State transitions and process flow</li>
              <li><strong>Circular Arrows (↺)</strong>: Return paths and state loops</li>
              <li><strong>Lock Symbol (🔒)</strong>: Security boundaries and key management</li>
              <li><strong>Globe Symbol (🌐)</strong>: Public blockchain network</li>
              <li><strong>Colored Connections</strong>: Different communication channels (blue=cold, purple=neutral, green=success)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};