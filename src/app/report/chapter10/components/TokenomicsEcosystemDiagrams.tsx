import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const TokenomicsEcosystemDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">10.8 Tokenomics Ecosystem Visualization</h3>
          
          <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Hive Ecosystem Token Flow</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-4xl">
                {/* Central Hive node */}
                <div className="flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-white font-bold text-lg">
                    HIVE
                  </div>
                </div>
                
                {/* Surrounding nodes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                      Content Creators
                    </div>
                    <div className="mt-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-xs">
                        ↑
                      </div>
                      <div className="ml-2 text-gray-300 text-sm">Rewards</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                      Curators
                    </div>
                    <div className="mt-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-xs">
                        ↑
                      </div>
                      <div className="ml-2 text-gray-300 text-sm">Rewards</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                      Holders
                    </div>
                    <div className="mt-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-xs">
                        ↑
                      </div>
                      <div className="ml-2 text-gray-300 text-sm">Rewards</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                      Witnesses
                    </div>
                    <div className="mt-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-xs">
                        ↑
                      </div>
                      <div className="ml-2 text-gray-300 text-sm">Rewards</div>
                    </div>
                  </div>
                </div>
                
                {/* Inflation source */}
                <div className="flex justify-center mt-12">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm text-center p-2">
                    Inflation
                  </div>
                </div>
                
                {/* Arrows showing flow */}
                <div className="absolute top-24 left-1/4 transform -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs">
                    →
                  </div>
                </div>
                
                <div className="absolute top-24 right-1/4 transform translate-x-1/2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs">
                    ←
                  </div>
                </div>
                
                {/* Legend */}
                <div className="mt-16 p-4 bg-gray-800 rounded-lg border border-gray-700 w-full">
                  <h5 className="text-cyan-400 font-semibold mb-2">Ecosystem Legend</h5>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-full mr-2"></div>
                      <span className="text-gray-300">HIVE Token</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mr-2"></div>
                      <span className="text-gray-300">Content Creators</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mr-2"></div>
                      <span className="text-gray-300">Curators</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-700 rounded-full mr-2"></div>
                      <span className="text-gray-300">Holders</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full mr-2"></div>
                      <span className="text-gray-300">Witnesses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Token Swap Platform Value Flow</h4>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-5xl">
                    {/* Top layer - Users */}
                    <div className="flex justify-center">
                      <div className="grid grid-cols-3 gap-8">
                        <div className="w-32 h-20 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold text-sm">
                          Content Creators
                        </div>
                        <div className="w-32 h-20 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-semibold text-sm">
                          Community
                        </div>
                        <div className="w-32 h-20 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold text-sm">
                          Traders
                        </div>
                      </div>
                    </div>
                    
                    {/* Middle layer - Platform */}
                    <div className="flex justify-center mt-8">
                      <div className="w-64 h-24 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg text-white font-bold">
                        Hive Token Swap Platform
                      </div>
                    </div>
                    
                    {/* Bottom layer - Blockchain */}
                    <div className="flex justify-center mt-8">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="w-28 h-20 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white p-2 text-center">
                          <div className="font-semibold text-xs">HIVE</div>
                          <div className="text-xs mt-1">Core Token</div>
                        </div>
                        <div className="w-28 h-20 flex flex-col items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg text-white p-2 text-center">
                          <div className="font-semibold text-xs">HBD</div>
                          <div className="text-xs mt-1">Stablecoin</div>
                        </div>
                        <div className="w-28 h-20 flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white p-2 text-center">
                          <div className="font-semibold text-xs">VESTS</div>
                          <div className="text-xs mt-1">Staked Tokens</div>
                        </div>
                        <div className="w-28 h-20 flex flex-col items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white p-2 text-center">
                          <div className="font-semibold text-xs">Hive Engine</div>
                          <div className="text-xs mt-1">Smart Tokens</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Connection arrows */}
                    <div className="absolute top-24 left-1/4 transform -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg">
                        ↓
                      </div>
                    </div>
                    
                    <div className="absolute top-24 right-1/4 transform translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-lg">
                        ↓
                      </div>
                    </div>
                    
                    <div className="absolute top-48 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-lg">
                        ↓
                      </div>
                    </div>
                    
                    <div className="absolute top-72 left-1/4 transform -translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-lg">
                        ↑
                      </div>
                    </div>
                    
                    <div className="absolute top-72 right-1/4 transform translate-x-1/2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-lg">
                        ↑
                      </div>
                    </div>
                    
                    {/* Value flows */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-lg border border-blue-700">
                        <h5 className="text-blue-400 font-semibold text-sm">Content Value</h5>
                        <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                          <li>Create posts</li>
                          <li>Receive rewards</li>
                          <li>Build reputation</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-lg border border-purple-700">
                        <h5 className="text-purple-400 font-semibold text-sm">Community Value</h5>
                        <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                          <li>Vote on content</li>
                          <li>Earn curation rewards</li>
                          <li>Participate in discussions</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-lg border border-green-700">
                        <h5 className="text-green-400 font-semibold text-sm">Trading Value</h5>
                        <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                          <li>Swap tokens</li>
                          <li>Access liquidity</li>
                          <li>Manage portfolio</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Token Distribution and Vesting Model</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-3xl">
                {/* Distribution pie chart representation */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-64">
                    {/* Pie chart segments */}
                    <div className="absolute inset-0 rounded-full bg-gradient-conic from-blue-500 via-purple-500 to-red-500"></div>
                    <div className="absolute inset-4 rounded-full bg-gray-900"></div>
                    
                    {/* Center label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white font-bold">HIVE</div>
                        <div className="text-gray-300 text-sm">Total Supply</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Distribution breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                      <h5 className="text-blue-400 font-semibold text-sm">Content (65%)</h5>
                    </div>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Creators: 50%</li>
                      <li>Curators: 15%</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-700">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
                      <h5 className="text-purple-400 font-semibold text-sm">Liquidity (15%)</h5>
                    </div>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>HIVE Holders</li>
                      <li>HBD Holders</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-red-900/30 rounded-lg border border-red-700">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                      <h5 className="text-red-400 font-semibold text-sm">Witnesses (10%)</h5>
                    </div>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Block producers</li>
                      <li>Network security</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
                      <h5 className="text-yellow-400 font-semibold text-sm">Vesting (100%)</h5>
                    </div>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>13-week period</li>
                      <li>Power increase</li>
                    </ul>
                  </div>
                </div>
                
                {/* Vesting timeline */}
                <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <h5 className="text-cyan-400 font-semibold mb-3">Vesting Timeline</h5>
                  <div className="relative">
                    <div className="absolute top-4 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-yellow-500"></div>
                    
                    <div className="flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-700"></div>
                        <div className="mt-2 text-gray-300 text-xs text-center">Week 0</div>
                        <div className="text-gray-400 text-xs">Tokens Rewarded</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
                        <div className="mt-2 text-gray-300 text-xs text-center">Week 4</div>
                        <div className="text-gray-400 text-xs">25% Vested</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-700"></div>
                        <div className="mt-2 text-gray-300 text-xs text-center">Week 8</div>
                        <div className="text-gray-400 text-xs">50% Vested</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700"></div>
                        <div className="mt-2 text-gray-300 text-xs text-center">Week 12</div>
                        <div className="text-gray-400 text-xs">75% Vested</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-700"></div>
                        <div className="mt-2 text-gray-300 text-xs text-center">Week 13</div>
                        <div className="text-gray-400 text-xs">100% Vested</div>
                      </div>
                    </div>
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