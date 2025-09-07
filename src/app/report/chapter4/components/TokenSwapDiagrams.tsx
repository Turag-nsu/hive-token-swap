import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const TokenSwapDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.16 Token Swap Mechanism Visualizations</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that illustrate the token swap mechanisms within the Hive Token Swap Platform, 
            showing how users exchange tokens, how the system calculates exchange rates, and how transactions are processed 
            through the Hive Engine decentralized exchange.
          </p>

          {/* Token Swap Process Flow */}
          <h4 className="text-lg text-cyan-400 mt-6">4.16.1 Token Swap Process Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center">
              {/* User initiates swap */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-8">
                <span className="text-white font-bold text-center">User<br/>Initiates<br/>Swap</span>
              </div>
              
              {/* First Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 mx-auto"></div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 w-full max-w-2xl text-center mb-8 shadow-md">
                <h5 className="text-white font-bold">Token Selection</h5>
                <p className="text-purple-100 text-sm">User selects tokens to swap and amounts</p>
              </div>
              
              {/* Second Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
                <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-4 text-center shadow-md">
                  <h6 className="text-white font-bold">Exchange Rate Calculation</h6>
                  <p className="text-pink-100 text-xs">Fetch market data from Hive Engine</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-4 text-center shadow-md">
                  <h6 className="text-white font-bold">Fee Calculation</h6>
                  <p className="text-orange-100 text-xs">Calculate platform and network fees</p>
                </div>
              </div>
              
              {/* Third Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-amber-500 mx-auto"></div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl p-4 w-full max-w-2xl text-center mb-8 shadow-md">
                <h5 className="text-white font-bold">Transaction Review</h5>
                <p className="text-amber-100 text-sm">User confirms swap details</p>
              </div>
              
              {/* Fourth Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
                <div className="bg-gradient-to-r from-yellow-500 to-lime-600 rounded-lg p-3 text-center shadow-md">
                  <h6 className="text-white font-bold">Wallet Signature</h6>
                  <p className="text-yellow-100 text-xs">User signs transaction</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 text-center shadow-md">
                  <h6 className="text-white font-bold">Blockchain Broadcast</h6>
                  <p className="text-green-100 text-xs">Transaction sent to Hive</p>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-3 text-center shadow-md">
                  <h6 className="text-white font-bold">Confirmation Monitoring</h6>
                  <p className="text-teal-100 text-xs">Track transaction status</p>
                </div>
              </div>
              
              {/* Fifth Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-lime-500 to-cyan-500 mx-auto"></div>
              </div>
              
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-4 w-full max-w-2xl text-center shadow-md">
                <h5 className="text-white font-bold">Swap Completed</h5>
                <p className="text-cyan-100 text-sm">Tokens transferred to user's wallet</p>
              </div>
            </div>
          </div>

          {/* Liquidity Pool Mechanism */}
          <h4 className="text-lg text-cyan-400 mt-8">4.16.2 Liquidity Pool Mechanism</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Central Liquidity Pool */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-center">Liquidity<br/>Pool</span>
                </div>
              </div>
              
              {/* Pool Participants */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Liquidity Providers</h5>
                  </div>
                  <div className="relative mt-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto"></div>
                    <div className="absolute top-4 -right-4 text-cyan-400 font-bold">⇄</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Token A Holders</h5>
                  </div>
                  <div className="relative mt-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-teal-500 to-green-500 mx-auto"></div>
                    <div className="absolute top-4 -right-4 text-teal-400 font-bold">⇄</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Token B Holders</h5>
                  </div>
                  <div className="relative mt-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
                    <div className="absolute top-4 -right-4 text-amber-400 font-bold">⇄</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-4 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Arbitrageurs</h5>
                  </div>
                  <div className="relative mt-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-red-500 mx-auto"></div>
                    <div className="absolute top-4 -right-4 text-pink-400 font-bold">⇄</div>
                  </div>
                </div>
              </div>
              
              {/* Pool Functions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-3 text-center">
                  <span className="text-white font-bold">Add Liquidity</span>
                </div>
                <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-3 text-center">
                  <span className="text-white font-bold">Remove Liquidity</span>
                </div>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-3 text-center">
                  <span className="text-white font-bold">Swap Tokens</span>
                </div>
              </div>
            </div>
          </div>

          {/* Token Swap Architecture */}
          <h4 className="text-lg text-cyan-400 mt-8">4.16.3 Token Swap Architecture</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Frontend Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Swap Interface</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Token Selector</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Rate Display</span>
                  </div>
                </div>
              </div>
              
              {/* Platform Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Platform Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Swap Calculator</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Transaction Builder</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Fee Calculator</span>
                  </div>
                </div>
              </div>
              
              {/* Blockchain Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Blockchain Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive Engine</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Smart Contracts</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive Blockchain</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col items-center">
              <div className="w-full max-w-md h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 mb-3"></div>
              <div className="text-center text-gray-400">Data flow between layers</div>
            </div>
          </div>

          {/* Slippage Protection Mechanism */}
          <h4 className="text-lg text-cyan-400 mt-8">4.16.4 Slippage Protection Mechanism</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center">
              {/* User sets slippage tolerance */}
              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg p-4 w-64 text-center mb-6 shadow-md">
                <h5 className="text-white font-bold">User Sets Slippage Tolerance</h5>
                <p className="text-gray-300 text-sm">e.g., 0.5%</p>
              </div>
              
              {/* Slippage Calculation */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full max-w-4xl">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center w-full">
                    <span className="text-white font-bold">Market Price</span>
                  </div>
                  <div className="text-2xl text-blue-400 mt-2">↓</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center w-full">
                    <span className="text-white font-bold">Expected Output</span>
                  </div>
                  <div className="text-2xl text-purple-400 mt-2">↓</div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center w-full">
                    <span className="text-white font-bold">Minimum Output</span>
                  </div>
                  <div className="text-2xl text-green-400 mt-2">↓</div>
                </div>
              </div>
              
              {/* Transaction Execution */}
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-4 w-64 text-center mb-6 shadow-md">
                <h5 className="text-white font-bold">Transaction Execution</h5>
              </div>
              
              {/* Outcome Paths */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-center">
                  <h6 className="text-white font-bold mb-2">Within Tolerance</h6>
                  <p className="text-green-100 text-sm">Transaction completes successfully</p>
                </div>
                
                <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-4 text-center">
                  <h6 className="text-white font-bold mb-2">Exceeds Tolerance</h6>
                  <p className="text-red-100 text-sm">Transaction reverts to protect user</p>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.16.5 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different components and states in the token swap process</li>
              <li><strong>Arrows (↓)</strong>: Process flow and data movement</li>
              <li><strong>Bidirectional Arrows (⇄)</strong>: Two-way interactions between components</li>
              <li><strong>Circular Arrows (↺)</strong>: Return paths and state loops</li>
              <li><strong>Colored Connections</strong>: Different layers and functions (blue=frontend, purple=platform, green=blockchain)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};