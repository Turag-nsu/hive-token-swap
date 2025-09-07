import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const DataFlowDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.14 Data Flow and Information Architecture</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that illustrate how data flows through the Hive Token Swap Platform, 
            from user interactions to blockchain operations and back. These visualizations help understand the complex 
            information architecture and data transformation processes.
          </p>

          {/* User Interaction Data Flow */}
          <h4 className="text-lg text-cyan-400 mt-6">4.14.1 User Interaction Data Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center">
              {/* User */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-8">
                <span className="text-white font-bold text-center">User</span>
              </div>
              
              {/* First Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 mx-auto"></div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 w-full max-w-2xl text-center mb-8 shadow-md">
                <h5 className="text-white font-bold">Frontend UI Layer</h5>
                <p className="text-purple-100 text-sm">React Components & State Management</p>
              </div>
              
              {/* Second Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
                <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-4 text-center shadow-md">
                  <h6 className="text-white font-bold">Client-Side Validation</h6>
                  <p className="text-pink-100 text-xs">Form validation and input sanitization</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-4 text-center shadow-md">
                  <h6 className="text-white font-bold">State Management</h6>
                  <p className="text-orange-100 text-xs">Zustand stores and React Query cache</p>
                </div>
              </div>
              
              {/* Third Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-amber-500 mx-auto"></div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl p-4 w-full max-w-2xl text-center mb-8 shadow-md">
                <h5 className="text-white font-bold">API Layer</h5>
                <p className="text-amber-100 text-sm">Next.js API Routes & External Services</p>
              </div>
              
              {/* Fourth Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-8">
                <div className="bg-gradient-to-r from-yellow-500 to-lime-600 rounded-lg p-3 text-center shadow-md">
                  <h6 className="text-white font-bold">Hive API</h6>
                  <p className="text-yellow-100 text-xs">Blockchain operations</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 text-center shadow-md">
                  <h6 className="text-white font-bold">Hive Engine</h6>
                  <p className="text-green-100 text-xs">Smart contract interactions</p>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-3 text-center shadow-md">
                  <h6 className="text-white font-bold">External Services</h6>
                  <p className="text-teal-100 text-xs">Price feeds, analytics</p>
                </div>
              </div>
              
              {/* Fifth Level */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-yellow-500 to-cyan-500 mx-auto"></div>
              </div>
              
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-4 w-full max-w-2xl text-center shadow-md">
                <h5 className="text-white font-bold">Blockchain Layer</h5>
                <p className="text-cyan-100 text-sm">Hive Network & Smart Contracts</p>
              </div>
            </div>
          </div>

          {/* Wallet Data Flow */}
          <h4 className="text-lg text-cyan-400 mt-8">4.14.2 Wallet Data Flow and Security</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Wallet Data Flow Diagram */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg p-4 w-48 text-center mb-4 md:mb-0 shadow-lg">
                  <h5 className="text-white font-bold">User Wallet</h5>
                  <p className="text-indigo-100 text-sm">Private Keys</p>
                </div>
                
                <div className="flex flex-col items-center mx-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-2"></div>
                  <div className="text-pink-400 font-bold">🔒</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-red-500 mt-2"></div>
                </div>
                
                <div className="bg-gradient-to-r from-pink-600 to-red-700 rounded-lg p-4 w-48 text-center mb-4 md:mb-0 shadow-lg">
                  <h5 className="text-white font-bold">Wallet Provider</h5>
                  <p className="text-pink-100 text-sm">Signature Requests</p>
                </div>
                
                <div className="flex flex-col items-center mx-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 mb-2"></div>
                  <div className="text-orange-400 font-bold">⇄</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 mt-2"></div>
                </div>
                
                <div className="bg-gradient-to-r from-amber-600 to-yellow-700 rounded-lg p-4 w-48 text-center shadow-lg">
                  <h5 className="text-white font-bold">Platform</h5>
                  <p className="text-amber-100 text-sm">Transaction Data</p>
                </div>
              </div>
              
              {/* Return Flow */}
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-lg p-4 w-48 text-center mb-4 md:mb-0 shadow-lg">
                  <h5 className="text-white font-bold">Blockchain</h5>
                  <p className="text-green-100 text-sm">Transaction Confirmation</p>
                </div>
                
                <div className="flex flex-col items-center mx-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mb-2"></div>
                  <div className="text-teal-400 font-bold">✓</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mt-2"></div>
                </div>
                
                <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-lg p-4 w-48 text-center mb-4 md:mb-0 shadow-lg">
                  <h5 className="text-white font-bold">Platform</h5>
                  <p className="text-teal-100 text-sm">Update UI</p>
                </div>
                
                <div className="flex flex-col items-center mx-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mb-2"></div>
                  <div className="text-blue-400 font-bold">⇄</div>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mt-2"></div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-4 w-48 text-center shadow-lg">
                  <h5 className="text-white font-bold">User Interface</h5>
                  <p className="text-blue-100 text-sm">Display Results</p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Data Synchronization */}
          <h4 className="text-lg text-cyan-400 mt-8">4.14.3 Real-time Data Synchronization Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Data Source */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3">Data Sources</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive Blockchain</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive Engine</span>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Social API</span>
                  </div>
                </div>
              </div>
              
              {/* Processing Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-bold mb-3">Processing & Caching</h5>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full w-24 h-24 flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-center">React Query<br/>Cache</span>
                  </div>
                  <div className="text-amber-400 text-2xl">↓</div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-full w-24 h-24 flex items-center justify-center mt-3">
                    <span className="text-white font-bold">Zustand<br/>Stores</span>
                  </div>
                </div>
              </div>
              
              {/* Presentation Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3">UI Presentation</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Wallet Dashboard</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Social Feed</span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Profile Page</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full px-6 py-2">
                <span className="text-white font-bold">🔄 Real-time Updates</span>
              </div>
            </div>
          </div>

          {/* Data Transformation Pipeline */}
          <h4 className="text-lg text-cyan-400 mt-8">4.14.4 Data Transformation Pipeline</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center">
              {/* Raw Data */}
              <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg p-4 w-64 text-center mb-6 shadow-md">
                <h5 className="text-white font-bold">Raw Blockchain Data</h5>
                <p className="text-gray-300 text-sm">JSON responses from APIs</p>
              </div>
              
              {/* Transformation Steps */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <span className="text-cyan-400 mt-2">Validation</span>
                </div>
                
                <div className="text-2xl text-gray-400">→</div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <span className="text-teal-400 mt-2">Parsing</span>
                </div>
                
                <div className="text-2xl text-gray-400">→</div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <span className="text-amber-400 mt-2">Enrichment</span>
                </div>
                
                <div className="text-2xl text-gray-400">→</div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <span className="text-pink-400 mt-2">Formatting</span>
                </div>
              </div>
              
              {/* Processed Data */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg p-4 w-64 text-center shadow-md">
                <h5 className="text-white font-bold">Processed UI Data</h5>
                <p className="text-purple-200 text-sm">Formatted for display</p>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.14.5 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different layers and components of the data flow</li>
              <li><strong>Arrows (→)</strong>: Unidirectional data flow</li>
              <li><strong>Bidirectional Arrows (⇄)</strong>: Two-way communication channels</li>
              <li><strong>Circular Arrows (🔄)</strong>: Continuous or real-time data updates</li>
              <li><strong>Lock Symbol (🔒)</strong>: Security boundaries and encryption points</li>
              <li><strong>Checkmark (✓)</strong>: Confirmation or validation points</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};