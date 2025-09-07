import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const BlockchainInteractionDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.17 Enhanced Blockchain Interaction Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents enhanced visual diagrams that illustrate the complex interactions between the Hive Token Swap Platform 
            and the Hive blockchain ecosystem. These diagrams provide a more detailed and visually rich representation of the processes 
            involved in blockchain operations.
          </p>

          {/* User Authentication Flow */}
          <h4 className="text-lg text-cyan-400 mt-6">4.17.1 Enhanced User Authentication Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Timeline */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">User</h5>
                      <p className="text-blue-100 text-sm">Initiate Login</p>
                    </div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">Platform</h5>
                      <p className="text-purple-100 text-sm">Request Signature</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">HiveKeychain</h5>
                      <p className="text-pink-100 text-sm">Prompt for Authentication</p>
                    </div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">User</h5>
                      <p className="text-red-100 text-sm">Provide Authentication</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">HiveKeychain</h5>
                      <p className="text-orange-100 text-sm">Return Signed Challenge</p>
                    </div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">Platform</h5>
                      <p className="text-amber-100 text-sm">Verify Signature</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-gradient-to-r from-yellow-500 to-lime-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">Hive Blockchain</h5>
                      <p className="text-yellow-100 text-sm">Return Verification Result</p>
                    </div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">Platform</h5>
                      <p className="text-green-100 text-sm">Grant/Deny Access</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">Platform</h5>
                      <p className="text-emerald-100 text-sm">Update UI</p>
                    </div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">User</h5>
                      <p className="text-teal-100 text-sm">Access Granted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Token Swap Process Visualization */}
          <h4 className="text-lg text-cyan-400 mt-8">4.17.2 Token Swap Process Visualization</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="text-center">
                  <h5 className="text-blue-400 font-bold">User Initiation</h5>
                  <p className="text-gray-400 text-xs">Select tokens & amount</p>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 mt-2"></div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="text-center">
                  <h5 className="text-purple-400 font-bold">Rate Calculation</h5>
                  <p className="text-gray-400 text-xs">Fetch market data</p>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 mt-2"></div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="text-center">
                  <h5 className="text-pink-400 font-bold">Transaction Review</h5>
                  <p className="text-gray-400 text-xs">Confirm details</p>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-red-500 mt-2"></div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="text-center">
                  <h5 className="text-orange-400 font-bold">Signature Request</h5>
                  <p className="text-gray-400 text-xs">Wallet interaction</p>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-amber-500 mt-2"></div>
              </div>
              
              {/* Step 5 */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">5</span>
                </div>
                <div className="text-center">
                  <h5 className="text-green-400 font-bold">Swap Execution</h5>
                  <p className="text-gray-400 text-xs">Tokens transferred</p>
                </div>
              </div>
            </div>
            
            {/* Detailed Flow */}
            <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-3 w-32 text-center">
                  <span className="text-white font-bold">User Interface</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                  <div className="mx-2 text-purple-400">⇄</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-3 w-32 text-center">
                  <span className="text-white font-bold">Platform Core</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-red-500"></div>
                  <div className="mx-2 text-red-400">⇄</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                </div>
                
                <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-3 w-32 text-center">
                  <span className="text-white font-bold">Hive Engine</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                  <div className="mx-2 text-amber-400">⇄</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-yellow-500"></div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-3 w-32 text-center">
                  <span className="text-white font-bold">Hive Blockchain</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Creation and Publishing Flow */}
          <h4 className="text-lg text-cyan-400 mt-8">4.17.3 Content Creation and Publishing Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative">
              {/* Central Hub */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-center">Content<br/>Creation</span>
                </div>
              </div>
              
              {/* Surrounding Components */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-3 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">User</h5>
                    <p className="text-blue-100 text-xs">Create Content</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-cyan-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-3 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Platform</h5>
                    <p className="text-green-100 text-xs">Process Content</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-green-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-teal-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-3 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">HiveKeychain</h5>
                    <p className="text-yellow-100 text-xs">Sign Content</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-amber-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-3 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Hive Blockchain</h5>
                    <p className="text-red-100 text-xs">Publish Content</p>
                  </div>
                </div>
              </div>
              
              {/* Feedback Loop */}
              <div className="mt-10 flex justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500"></div>
                  <div className="absolute top-1/2 left-4 text-pink-400 font-bold">↺</div>
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-3 text-center w-48 mx-auto">
                    <span className="text-white font-bold">Content Published</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Monitoring System */}
          <h4 className="text-lg text-cyan-400 mt-8">4.17.4 Transaction Monitoring System</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Monitoring Components */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Transaction Initiation</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">User Action</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Transaction Created</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Monitoring Process</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Broadcast to Blockchain</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Monitor Status</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-500"></div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Update UI</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Completion States</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Success</span>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Pending</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Failed</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Reverted</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Status Visualization */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
              <h5 className="text-center text-cyan-400 font-bold mb-4">Real-time Transaction Status</h5>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Pending</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Broadcast</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-300">Failed</span>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.17.5 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different components and actors in blockchain interactions</li>
              <li><strong>Arrows (→)</strong>: Unidirectional data or action flow</li>
              <li><strong>Bidirectional Arrows (⇄)</strong>: Two-way communication between components</li>
              <li><strong>Circular Arrows (↺)</strong>: Feedback loops and return paths</li>
              <li><strong>Timeline Elements</strong>: Sequential steps in a process</li>
              <li><strong>Color Coding</strong>: Different systems (blue=user, purple=platform, pink=wallet, orange=engine, yellow=blockchain)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};