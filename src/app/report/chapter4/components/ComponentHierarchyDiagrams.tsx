import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const ComponentHierarchyDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.13 Component Hierarchy and Interaction Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed interactive diagrams that illustrate the hierarchical structure and interaction patterns 
            of the core components within the Hive Token Swap Platform. These diagrams provide a visual representation of how 
            different parts of the system are organized and communicate with each other.
          </p>

          {/* Main Application Hierarchy */}
          <h4 className="text-lg text-cyan-400 mt-6">4.13.1 Main Application Component Hierarchy</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center">
              {/* Root Component */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-4 w-64 text-center mb-8 shadow-lg">
                <h5 className="text-white font-bold">App.tsx</h5>
                <p className="text-blue-100 text-sm">Root Application Component</p>
              </div>
              
              {/* Level 1 */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 w-48 text-center shadow-md">
                    <h6 className="text-white font-bold">AppProviders.tsx</h6>
                    <p className="text-purple-100 text-xs">Context Providers</p>
                  </div>
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 my-2"></div>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded p-2 text-center">
                      <span className="text-white text-xs">WalletProvider</span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded p-2 text-center">
                      <span className="text-white text-xs">QueryProvider</span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded p-2 text-center">
                      <span className="text-white text-xs">ThemeProvider</span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded p-2 text-center">
                      <span className="text-white text-xs">NotificationProvider</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 w-48 text-center shadow-md">
                    <h6 className="text-white font-bold">AppLayout.tsx</h6>
                    <p className="text-green-100 text-xs">Layout Structure</p>
                  </div>
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-teal-500 my-2"></div>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Header</span>
                    </div>
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Sidebar</span>
                    </div>
                    <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Footer</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg p-4 w-48 text-center shadow-md">
                    <h6 className="text-white font-bold">Route Components</h6>
                    <p className="text-yellow-100 text-xs">Page Routes</p>
                  </div>
                  <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 my-2"></div>
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Wallet</span>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Social</span>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Profile</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* UI Component Hierarchy */}
          <h4 className="text-lg text-cyan-400 mt-8">4.13.2 UI Component Hierarchy</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="flex flex-col items-center">
              {/* Root UI Component */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-4 w-64 text-center mb-8 shadow-lg">
                <h5 className="text-white font-bold">UI Components</h5>
                <p className="text-indigo-100 text-sm">Shared UI Library</p>
              </div>
              
              {/* Level 1 */}
              <div className="flex justify-center mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-5xl">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-3 w-36 text-center shadow-md">
                    <h6 className="text-white font-bold">Atoms</h6>
                  </div>
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 my-2"></div>
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Button</span>
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Input</span>
                    </div>
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Card</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-3 w-36 text-center shadow-md">
                    <h6 className="text-white font-bold">Molecules</h6>
                  </div>
                  <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 my-2"></div>
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Modal</span>
                    </div>
                    <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Alert</span>
                    </div>
                    <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Badge</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-3 w-36 text-center shadow-md">
                    <h6 className="text-white font-bold">Organisms</h6>
                  </div>
                  <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-amber-500 my-2"></div>
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Navbar</span>
                    </div>
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Sidebar</span>
                    </div>
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Footer</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-3 w-36 text-center shadow-md">
                    <h6 className="text-white font-bold">Templates</h6>
                  </div>
                  <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-pink-500 my-2"></div>
                  <div className="space-y-2">
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded p-2 text-center">
                      <span className="text-white text-xs">Dashboard</span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded p-2 text-center">
                      <span className="text-white text-xs">ProfilePage</span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded p-2 text-center">
                      <span className="text-white text-xs">WalletPage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Flow Interaction Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.13.3 Data Flow Interaction Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Central Store */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-center">Zustand<br/>Stores</span>
                </div>
              </div>
              
              {/* Surrounding Components with Arrows */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center">
                  <div className="animate-pulse">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center w-32 shadow-md">
                      <span className="font-bold text-white">UI Components</span>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto"></div>
                    <div className="absolute top-4 -right-4 text-cyan-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="animate-pulse">
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-center w-32 shadow-md">
                      <span className="font-bold text-white">API Hooks</span>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-teal-500 to-green-500 mx-auto"></div>
                    <div className="absolute top-4 -right-4 text-teal-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="animate-pulse">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg p-4 text-center w-32 shadow-md">
                      <span className="font-bold text-white">Blockchain</span>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-yellow-500 mx-auto"></div>
                    <div className="absolute top-4 -right-4 text-orange-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="animate-pulse">
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-4 text-center w-32 shadow-md">
                      <span className="font-bold text-white">Wallet API</span>
                    </div>
                  </div>
                  <div className="relative mt-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-red-500 mx-auto"></div>
                    <div className="absolute top-4 -right-4 text-pink-400 font-bold">→</div>
                  </div>
                </div>
              </div>
              
              {/* Return Arrows */}
              <div className="absolute top-24 left-1/4 w-1/2 h-1 bg-gradient-to-r from-purple-500 to-indigo-500">
                <div className="absolute -top-2 right-0 text-purple-400 font-bold">↺</div>
              </div>
            </div>
          </div>

          {/* Component Communication Patterns */}
          <h4 className="text-lg text-cyan-400 mt-8">4.13.4 Component Communication Patterns</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Parent-Child Communication */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3">Parent → Child Props</h5>
                <div className="flex items-center justify-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-3 w-32 text-center">
                    <span className="text-white font-bold">Parent</span>
                  </div>
                  <div className="text-2xl text-blue-400">→</div>
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg p-3 w-32 text-center">
                    <span className="text-white font-bold">Child</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mt-3">
                  Data flows down from parent to child components through props
                </p>
              </div>
              
              {/* Child-Parent Communication */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3">Child → Parent Callbacks</h5>
                <div className="flex items-center justify-center space-x-4">
                  <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-lg p-3 w-32 text-center">
                    <span className="text-white font-bold">Child</span>
                  </div>
                  <div className="text-2xl text-green-400">→</div>
                  <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-lg p-3 w-32 text-center">
                    <span className="text-white font-bold">Parent</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mt-3">
                  Child components communicate with parents through callback functions
                </p>
              </div>
              
              {/* Context Communication */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600 md:col-span-2">
                <h5 className="text-purple-400 font-bold mb-3">Context API Communication</h5>
                <div className="flex flex-col items-center">
                  <div className="flex space-x-8 mb-4">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-lg p-3 w-32 text-center">
                      <span className="text-white font-bold">Provider</span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-600 to-red-700 rounded-lg p-3 w-32 text-center">
                      <span className="text-white font-bold">Consumer</span>
                    </div>
                  </div>
                  <div className="relative w-full max-w-md">
                    <div className="flex justify-between">
                      <div className="text-purple-400 font-bold">⇄</div>
                      <div className="text-pink-400 font-bold">⇄</div>
                    </div>
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mt-3 text-center">
                  Global state management through React Context API
                </p>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.13.5 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different components and modules of the system</li>
              <li><strong>Arrows (→)</strong>: Data flow direction between components</li>
              <li><strong>Bidirectional Arrows (⇄)</strong>: Two-way communication between components</li>
              <li><strong>Connecting Lines</strong>: Hierarchical relationships between components</li>
              <li><strong>Animated Elements</strong>: Active components or real-time data flow</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};