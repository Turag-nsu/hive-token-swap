import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const StateManagementDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.9 State Management Visualization Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that illustrate the state management architecture of the Hive Token Swap Platform. 
            These diagrams provide a visual representation of how React Query and Zustand work together to manage application state.
          </p>

          {/* React Query Architecture */}
          <h4 className="text-lg text-cyan-400 mt-6">4.9.1 React Query Architecture Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Data Sources */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Data Sources</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive API</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive Engine</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Market Data</span>
                  </div>
                </div>
              </div>
              
              {/* React Query Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">React Query Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Query Cache</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Query Hooks</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Mutations</span>
                  </div>
                </div>
              </div>
              
              {/* Application Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Application Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Components</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hooks</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Context</span>
                  </div>
                </div>
              </div>
              
              {/* Zustand Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-bold mb-3 text-center">Zustand Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Stores</span>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Selectors</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Actions</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Data Flow */}
            <div className="mt-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-2xl">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="mx-2 text-purple-400">→</div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="mx-2 text-pink-400">→</div>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-green-500"></div>
                <div className="mx-2 text-green-400">→</div>
                <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-yellow-500"></div>
              </div>
              <div className="text-center text-gray-400 mt-2">Data Flow Direction</div>
            </div>
          </div>

          {/* Zustand Store Architecture */}
          <h4 className="text-lg text-cyan-400 mt-8">4.9.2 Zustand Store Architecture Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Central Store Hub */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-center">Zustand<br/>Store Hub</span>
                </div>
              </div>
              
              {/* Store Types */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Wallet Store</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-cyan-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">UI Store</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-green-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-teal-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Swap Store</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-amber-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Social Store</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-red-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-pink-400 font-bold">→</div>
                  </div>
                </div>
              </div>
              
              {/* Store Components */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">State</h5>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Actions</h5>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Selectors</h5>
                </div>
              </div>
            </div>
          </div>

          {/* State Integration Flow */}
          <h4 className="text-lg text-cyan-400 mt-8">4.9.3 State Integration Flow Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative">
              {/* React Query Flow */}
              <div className="mb-8">
                <h5 className="text-blue-400 font-bold text-center mb-4">React Query Data Flow</h5>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-3 text-center w-32">
                    <span className="text-white font-bold">API Request</span>
                  </div>
                  <div className="text-blue-400 font-bold">→</div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg p-3 text-center w-32">
                    <span className="text-white font-bold">Cache Layer</span>
                  </div>
                  <div className="text-cyan-400 font-bold">→</div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded-lg p-3 text-center w-32">
                    <span className="text-white font-bold">Component</span>
                  </div>
                </div>
              </div>
              
              {/* Zustand Integration */}
              <div className="mb-8">
                <h5 className="text-purple-400 font-bold text-center mb-4">Zustand Integration</h5>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-3 text-center w-32">
                    <span className="text-white font-bold">Store State</span>
                  </div>
                  <div className="text-purple-400 font-bold">⇄</div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-3 text-center w-32">
                    <span className="text-white font-bold">React Query</span>
                  </div>
                  <div className="text-pink-400 font-bold">⇄</div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-3 text-center w-32">
                    <span className="text-white font-bold">UI Components</span>
                  </div>
                </div>
              </div>
              
              {/* Synchronization */}
              <div>
                <h5 className="text-green-400 font-bold text-center mb-4">State Synchronization</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-center">
                    <h5 className="text-white font-bold">Cache Invalidation</h5>
                  </div>
                  
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-center">
                    <h5 className="text-white font-bold">Optimistic Updates</h5>
                  </div>
                  
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-4 text-center">
                    <h5 className="text-white font-bold">Derived State</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* State Management Patterns */}
          <h4 className="text-lg text-cyan-400 mt-8">4.9.4 State Management Patterns Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pattern 1: Server State */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Server State Pattern</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2 text-center">
                    <span className="text-white font-bold">React Query</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-blue-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white font-bold">API Services</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-cyan-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-2 text-center">
                    <span className="text-white font-bold">Blockchain APIs</span>
                  </div>
                </div>
              </div>
              
              {/* Pattern 2: Client State */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Client State Pattern</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-2 text-center">
                    <span className="text-white font-bold">Zustand Stores</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-purple-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-2 text-center">
                    <span className="text-white font-bold">UI Components</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-pink-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-2 text-center">
                    <span className="text-white font-bold">User Interactions</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Integration Pattern */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-yellow-400 font-bold mb-3 text-center">Integration Pattern</h5>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2">
                    <span className="text-white text-sm">React Query</span>
                  </div>
                  <div className="mx-2 text-blue-400">⇄</div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-2">
                    <span className="text-white text-sm">Zustand</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-2">
                    <span className="text-white text-sm">Zustand</span>
                  </div>
                  <div className="mx-2 text-purple-400">⇄</div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded p-2">
                    <span className="text-white text-sm">Components</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.9.5 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different components and layers in state management</li>
              <li><strong>Arrows (→, ↓, ⇄)</strong>: Data flow and interaction directions</li>
              <li><strong>Central Hubs</strong>: Core state management components</li>
              <li><strong>Layered Architecture</strong>: Different layers of the state management system</li>
              <li><strong>Color Coding</strong>: Different state management functions and system layers</li>
              <li><strong>Blue Series</strong>: React Query related components</li>
              <li><strong>Purple Series</strong>: Zustand related components</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};