import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const GlossaryVisualization: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">10.3 Glossary Visualization</h3>
          
          <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Blockchain Technology Categories</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-4xl">
                {/* Central Blockchain node */}
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                    Blockchain
                  </div>
                </div>
                
                {/* Surrounding categories */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                      Consensus Mechanisms
                    </div>
                    <div className="mt-4 text-gray-300 text-sm text-center">
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded">PoW</span>
                        <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded">PoS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                      Token Standards
                    </div>
                    <div className="mt-4 text-gray-300 text-sm text-center">
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded">ERC-20</span>
                        <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded">NFT</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                      Hive Ecosystem
                    </div>
                    <div className="mt-4 text-gray-300 text-sm text-center">
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded">HIVE</span>
                        <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded">HBD</span>
                        <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded">VESTS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                      Security Concepts
                    </div>
                    <div className="mt-4 text-gray-300 text-sm text-center">
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        <span className="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded">SHA-256</span>
                        <span className="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded">ZK-SNARK</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Connecting lines */}
                <div className="absolute top-32 left-1/4 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="absolute top-32 right-1/4 transform translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="absolute top-48 left-1/4 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-yellow-500"></div>
                <div className="absolute top-48 right-1/4 transform translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-red-500"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Platform Architecture Components</h4>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-5xl">
                    {/* Layered architecture */}
                    <div className="grid grid-cols-1 gap-6">
                      {/* User Interface Layer */}
                      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg">
                        <h5 className="text-white font-semibold text-center">User Interface Layer</h5>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="p-3 bg-blue-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">Wallet UI</div>
                            <div className="text-xs mt-1">Hive Keychain</div>
                          </div>
                          <div className="p-3 bg-blue-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">Social Feed</div>
                            <div className="text-xs mt-1">Content Display</div>
                          </div>
                          <div className="p-3 bg-blue-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">Token Swap</div>
                            <div className="text-xs mt-1">Trading Interface</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Application Layer */}
                      <div className="p-4 bg-gradient-to-r from-green-600 to-green-800 rounded-lg">
                        <h5 className="text-white font-semibold text-center">Application Layer</h5>
                        <div className="grid grid-cols-4 gap-4 mt-4">
                          <div className="p-3 bg-green-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">Auth Service</div>
                            <div className="text-xs mt-1">HiveSigner</div>
                          </div>
                          <div className="p-3 bg-green-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">Wallet API</div>
                            <div className="text-xs mt-1">Balance Management</div>
                          </div>
                          <div className="p-3 bg-green-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">Content API</div>
                            <div className="text-xs mt-1">Feed Retrieval</div>
                          </div>
                          <div className="p-3 bg-green-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">Swap Engine</div>
                            <div className="text-xs mt-1">Token Exchange</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Blockchain Layer */}
                      <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg">
                        <h5 className="text-white font-semibold text-center">Blockchain Layer</h5>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div className="p-3 bg-purple-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">Hive Core</div>
                            <div className="text-xs mt-1">Consensus & Blocks</div>
                          </div>
                          <div className="p-3 bg-purple-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">Hive Engine</div>
                            <div className="text-xs mt-1">Smart Contracts</div>
                          </div>
                          <div className="p-3 bg-purple-900/50 rounded text-center text-white text-sm">
                            <div className="font-semibold">RPC Nodes</div>
                            <div className="text-xs mt-1">API Endpoints</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection arrows */}
                    <div className="flex flex-col items-center my-6">
                      <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
                      <div className="h-8 w-1 bg-gradient-to-b from-green-500 to-purple-500 mt-2"></div>
                    </div>
                    
                    {/* Legend */}
                    <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 w-full">
                      <h5 className="text-cyan-400 font-semibold mb-2">Architecture Legend</h5>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded mr-2"></div>
                          <span className="text-gray-300">User Interface</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gradient-to-r from-green-600 to-green-800 rounded mr-2"></div>
                          <span className="text-gray-300">Application Logic</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded mr-2"></div>
                          <span className="text-gray-300">Blockchain Layer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Token Relationship Diagram</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-3xl">
                {/* Token relationships */}
                <div className="grid grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-white font-bold text-lg">
                      HIVE
                    </div>
                    <div className="mt-2 text-gray-300 text-sm text-center">Native Token</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg">
                      HBD
                    </div>
                    <div className="mt-2 text-gray-300 text-sm text-center">Stablecoin</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-lg">
                      VESTS
                    </div>
                    <div className="mt-2 text-gray-300 text-sm text-center">Staked Tokens</div>
                  </div>
                </div>
                
                {/* Relationships */}
                <div className="absolute top-12 left-1/3 transform -translate-x-1/2">
                  <div className="flex flex-col items-center">
                    <div className="text-gray-400 text-xs mb-1">Swap</div>
                    <div className="w-16 h-8 bg-gradient-to-r from-yellow-500 to-teal-500 rounded flex items-center justify-center text-white text-xs">
                      1:1
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-12 right-1/3 transform translate-x-1/2">
                  <div className="flex flex-col items-center">
                    <div className="text-gray-400 text-xs mb-1">Stake</div>
                    <div className="w-16 h-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded flex items-center justify-center text-white text-xs">
                      1:∞
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
                  <div className="flex flex-col items-center">
                    <div className="text-gray-400 text-xs mb-1">Vesting</div>
                    <div className="w-16 h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded flex items-center justify-center text-white text-xs">
                      13w
                    </div>
                  </div>
                </div>
                
                {/* Additional info */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700">
                    <h5 className="text-yellow-400 font-semibold text-sm">HIVE</h5>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Transferable</li>
                      <li>Used for transactions</li>
                      <li>Can be staked to VESTS</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-teal-900/30 rounded-lg border border-teal-700">
                    <h5 className="text-teal-400 font-semibold text-sm">HBD</h5>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Stable value (~$1)</li>
                      <li>Convertible to HIVE</li>
                      <li>Used for payments</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-red-900/30 rounded-lg border border-red-700">
                    <h5 className="text-red-400 font-semibold text-sm">VESTS</h5>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Non-transferable</li>
                      <li>Provides voting power</li>
                      <li>Increases RC allocation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};