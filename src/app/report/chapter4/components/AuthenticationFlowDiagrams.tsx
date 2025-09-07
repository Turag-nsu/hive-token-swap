import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const AuthenticationFlowDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.18 User Authentication Flow Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents enhanced visual diagrams that illustrate the user authentication flow within the Hive Token Swap Platform. 
            These diagrams provide a detailed and visually rich representation of the authentication processes, including both Hive Keychain 
            and HiveSigner authentication methods.
          </p>

          {/* Hive Keychain Authentication Flow */}
          <h4 className="text-lg text-cyan-400 mt-6">4.18.1 Hive Keychain Authentication Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Central Authentication Hub */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-center">Auth<br/>System</span>
                </div>
              </div>
              
              {/* Authentication Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Step 1: User Initiation */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">User</h5>
                    <p className="text-blue-100 text-xs">Click Login</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-cyan-400 font-bold">→</div>
                  </div>
                </div>
                
                {/* Step 2: Platform Request */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Platform</h5>
                    <p className="text-purple-100 text-xs">Request Signature</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-purple-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-pink-400 font-bold">→</div>
                  </div>
                </div>
                
                {/* Step 3: Wallet Prompt */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">HiveKeychain</h5>
                    <p className="text-pink-100 text-xs">Prompt User</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-pink-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-red-400 font-bold">→</div>
                  </div>
                </div>
                
                {/* Step 4: User Authentication */}
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">User</h5>
                    <p className="text-red-100 text-xs">Authenticate</p>
                  </div>
                </div>
              </div>
              
              {/* Return Path */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">HiveKeychain</h5>
                    <p className="text-orange-100 text-xs">Return Signature</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-amber-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Platform</h5>
                    <p className="text-amber-100 text-xs">Verify Signature</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-amber-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-yellow-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-green-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">User</h5>
                    <p className="text-yellow-100 text-xs">Access Granted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HiveSigner Authentication Flow */}
          <h4 className="text-lg text-cyan-400 mt-8">4.18.2 HiveSigner Authentication Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Timeline Visualization */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 transform -translate-x-1/2"></div>
              
              {/* Steps */}
              <div className="space-y-10">
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
                      <p className="text-purple-100 text-sm">Redirect to HiveSigner</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">HiveSigner</h5>
                      <p className="text-pink-100 text-sm">OAuth Authorization</p>
                    </div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">User</h5>
                      <p className="text-red-100 text-sm">Approve Authorization</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">HiveSigner</h5>
                      <p className="text-orange-100 text-sm">Token Exchange</p>
                    </div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">Platform</h5>
                      <p className="text-amber-100 text-sm">Receive Tokens</p>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                  <div className="w-5/12 pr-8 text-right">
                    <div className="bg-gradient-to-r from-yellow-500 to-lime-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">Platform</h5>
                      <p className="text-yellow-100 text-sm">Fetch User Data</p>
                    </div>
                  </div>
                  <div className="w-5/12 pl-8">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 shadow-md">
                      <h5 className="text-white font-bold">User</h5>
                      <p className="text-green-100 text-sm">Access Granted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Authentication State Management */}
          <h4 className="text-lg text-cyan-400 mt-8">4.18.3 Authentication State Management</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* State 1: Unauthenticated */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="text-center">
                  <h5 className="text-gray-400 font-bold">Unauthenticated</h5>
                  <p className="text-gray-500 text-xs">No user session</p>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-gray-500 to-gray-700 mt-2"></div>
              </div>
              
              {/* State 2: Authenticating */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="text-center">
                  <h5 className="text-blue-400 font-bold">Authenticating</h5>
                  <p className="text-blue-500 text-xs">Processing login</p>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 mt-2"></div>
              </div>
              
              {/* State 3: Authenticated */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="text-center">
                  <h5 className="text-green-400 font-bold">Authenticated</h5>
                  <p className="text-green-500 text-xs">Active session</p>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 mt-2"></div>
              </div>
              
              {/* State 4: Error */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="text-center">
                  <h5 className="text-red-400 font-bold">Error</h5>
                  <p className="text-red-500 text-xs">Authentication failed</p>
                </div>
              </div>
            </div>
            
            {/* State Transitions */}
            <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded p-2">
                    <span className="text-white text-sm">Unauthenticated</span>
                  </div>
                  <div className="mx-2 text-gray-400">→</div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2">
                    <span className="text-white text-sm">Authenticating</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2">
                    <span className="text-white text-sm">Authenticating</span>
                  </div>
                  <div className="mx-2 text-blue-400">→</div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2">
                    <span className="text-white text-sm">Authenticated</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2">
                    <span className="text-white text-sm">Authenticating</span>
                  </div>
                  <div className="mx-2 text-red-400">→</div>
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-2">
                    <span className="text-white text-sm">Error</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-2">
                    <span className="text-white text-sm">Error</span>
                  </div>
                  <div className="mx-2 text-gray-400">→</div>
                  <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded p-2">
                    <span className="text-white text-sm">Unauthenticated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Layers */}
          <h4 className="text-lg text-cyan-400 mt-8">4.18.4 Authentication Security Layers</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center">
              {/* Outer Layer - User Interface */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-4 w-full max-w-md text-center mb-6 shadow-lg">
                <h5 className="text-white font-bold">User Interface Layer</h5>
                <p className="text-blue-100 text-sm">Login Form & UI Components</p>
              </div>
              
              {/* Connecting Line */}
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-purple-500"></div>
              
              {/* Middle Layer - Platform Core */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 w-full max-w-md text-center mb-6 shadow-lg">
                <h5 className="text-white font-bold">Platform Core Layer</h5>
                <p className="text-purple-100 text-sm">Authentication Logic & State Management</p>
              </div>
              
              {/* Connecting Line */}
              <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-red-500"></div>
              
              {/* Inner Layer - Wallet Integration */}
              <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-xl p-4 w-full max-w-md text-center mb-6 shadow-lg">
                <h5 className="text-white font-bold">Wallet Integration Layer</h5>
                <p className="text-pink-100 text-sm">HiveKeychain / HiveSigner</p>
              </div>
              
              {/* Connecting Line */}
              <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-orange-500"></div>
              
              {/* Core Layer - Blockchain */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl p-4 w-full max-w-md text-center shadow-lg">
                <h5 className="text-white font-bold">Blockchain Layer</h5>
                <p className="text-orange-100 text-sm">Hive Blockchain Verification</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mr-2"></div>
                <span className="text-gray-300 text-sm">Each layer adds security checks</span>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.18.5 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different components and states in the authentication process</li>
              <li><strong>Arrows (→)</strong>: Data flow and process direction</li>
              <li><strong>Timeline Elements</strong>: Sequential steps in authentication flows</li>
              <li><strong>Layered Architecture</strong>: Security layers from UI to Blockchain</li>
              <li><strong>Color Coding</strong>: Different authentication states and system layers</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};