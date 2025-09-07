import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const FrontendArchitectureDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.7 Frontend Architecture Visualization Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that illustrate the frontend architecture of the Hive Token Swap Platform. 
            These diagrams provide a visual representation of the component structure, data flow, and architectural patterns.
          </p>

          {/* Project Structure Diagram */}
          <h4 className="text-lg text-cyan-400 mt-6">4.7.1 Project Structure Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* App Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">App Layer</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2 text-center">
                    <span className="text-white font-bold">report</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white font-bold">social</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-2 text-center">
                    <span className="text-white font-bold">swap</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                    <span className="text-white font-bold">wallet</span>
                  </div>
                </div>
              </div>
              
              {/* Components Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Components Layer</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-2 text-center">
                    <span className="text-white font-bold">layout</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-2 text-center">
                    <span className="text-white font-bold">social</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-2 text-center">
                    <span className="text-white font-bold">swap</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded p-2 text-center">
                    <span className="text-white font-bold">ui</span>
                  </div>
                </div>
              </div>
              
              {/* Core Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Core Layer</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                    <span className="text-white font-bold">hooks</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white font-bold">stores</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-2 text-center">
                    <span className="text-white font-bold">services</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded p-2 text-center">
                    <span className="text-white font-bold">utils</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hierarchy Flow */}
            <div className="mt-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-md">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="mx-2 text-purple-400">→</div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-green-500"></div>
              </div>
              <div className="text-center text-gray-400 mt-2">Dependency Flow</div>
            </div>
          </div>

          {/* Component Architecture Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.7.2 Component Architecture Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Central Component */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-center">Root<br/>Component</span>
                </div>
              </div>
              
              {/* Component Types */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Presentational</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-cyan-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Container</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-green-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-teal-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Compound</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-amber-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Hooks</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-red-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-pink-400 font-bold">→</div>
                  </div>
                </div>
              </div>
              
              {/* Data Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Props</h5>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">State</h5>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Events</h5>
                </div>
              </div>
            </div>
          </div>

          {/* State Management Architecture */}
          <h4 className="text-lg text-cyan-400 mt-8">4.7.3 State Management Architecture Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative">
              {/* State Management Layers */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">React Query</h5>
                    <p className="text-blue-200 text-sm mt-1">Server State</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-cyan-400 font-bold">↓</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Zustand</h5>
                    <p className="text-green-200 text-sm mt-1">Client State</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-green-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-teal-400 font-bold">↓</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Context</h5>
                    <p className="text-yellow-200 text-sm mt-1">Global State</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-amber-400 font-bold">↓</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Component</h5>
                    <p className="text-red-200 text-sm mt-1">Local State</p>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-red-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-pink-400 font-bold">↓</div>
                  </div>
                </div>
              </div>
              
              {/* Integration Flow */}
              <div className="p-4 bg-gray-800/30 rounded-lg">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Integration Flow</h5>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2">
                      <span className="text-white text-sm">React Query</span>
                    </div>
                    <div className="mx-2 text-blue-400">⇄</div>
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded p-2">
                      <span className="text-white text-sm">Zustand</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded p-2">
                      <span className="text-white text-sm">Zustand</span>
                    </div>
                    <div className="mx-2 text-green-400">⇄</div>
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-2">
                      <span className="text-white text-sm">Context</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-2">
                      <span className="text-white text-sm">Context</span>
                    </div>
                    <div className="mx-2 text-yellow-400">⇄</div>
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-2">
                      <span className="text-white text-sm">Components</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Routing Architecture */}
          <h4 className="text-lg text-cyan-400 mt-8">4.7.4 Routing Architecture Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Router Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Router Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Next.js App Router</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">File-based Routing</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Dynamic Routes</span>
                  </div>
                </div>
              </div>
              
              {/* Route Handlers */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Route Handlers</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">API Endpoints</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Middleware</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Error Handling</span>
                  </div>
                </div>
              </div>
              
              {/* UI Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">UI Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Page Components</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Layout Components</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Loading States</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Routing Flow */}
            <div className="mt-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-lg">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="mx-2 text-purple-400">→</div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-green-500"></div>
              </div>
              <div className="text-center text-gray-400 mt-2">Request Flow</div>
            </div>
          </div>

          {/* Performance Optimization Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.7.5 Performance Optimization Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Build Optimization */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Build Optimization</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2 text-center">
                    <span className="text-white font-bold">Turbopack</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-blue-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white font-bold">Tree Shaking</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-cyan-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-2 text-center">
                    <span className="text-white font-bold">Minification</span>
                  </div>
                </div>
              </div>
              
              {/* Runtime Optimization */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Runtime Optimization</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-2 text-center">
                    <span className="text-white font-bold">Code Splitting</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-purple-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-2 text-center">
                    <span className="text-white font-bold">Caching</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-pink-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-2 text-center">
                    <span className="text-white font-bold">Lazy Loading</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Optimization Flow */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-green-400 font-bold mb-3 text-center">Optimization Pipeline</h5>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2">
                    <span className="text-white text-sm">Build</span>
                  </div>
                  <div className="mx-2 text-blue-400">→</div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-2">
                    <span className="text-white text-sm">Bundle</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-2">
                    <span className="text-white text-sm">Deploy</span>
                  </div>
                  <div className="mx-2 text-teal-400">→</div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2">
                    <span className="text-white text-sm">Runtime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.7.6 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different components and layers in frontend architecture</li>
              <li><strong>Arrows (→, ↓, ⇄)</strong>: Data flow and dependency directions</li>
              <li><strong>Central Hubs</strong>: Core architectural components</li>
              <li><strong>Layered Architecture</strong>: Different layers of the frontend system</li>
              <li><strong>Color Coding</strong>: Different architectural functions and system layers</li>
              <li><strong>Blue Series</strong>: Routing and build related components</li>
              <li><strong>Green Series</strong>: UI and component related components</li>
              <li><strong>Purple Series</strong>: State management related components</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};