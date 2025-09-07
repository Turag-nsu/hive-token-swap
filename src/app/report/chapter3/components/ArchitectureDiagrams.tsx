import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const ArchitectureDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          {/* Data Flow Architecture */}
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold text-blue-400 mb-4">Data Flow Architecture</h4>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-4xl mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-center w-48">
                  <span className="font-bold text-white">User Interface</span>
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-2"></div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 text-center w-48">
                  <span className="font-bold text-white">Frontend Components</span>
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-2"></div>
                <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-4 text-center w-48">
                  <span className="font-bold text-white">API Routes</span>
                </div>
                <div className="flex-1 h-1 bg-gradient-to-r from-pink-500 to-red-600 mx-2"></div>
                <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-4 text-center w-48">
                  <span className="font-bold text-white">Hive Blockchain</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center my-6">
                <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-green-500"></div>
                <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-center w-64 mt-2">
                  <span className="font-bold text-white">State Management<br/>(React Query, Zustand)</span>
                </div>
                <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-teal-500 mt-2"></div>
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-4 text-center w-48 mt-2">
                  <span className="font-bold text-white">Caching Layer<br/>(Browser Cache)</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Architecture Diagram */}
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold text-blue-400 mb-4">System Architecture Diagram</h4>
            <div className="flex flex-col items-center">
              {/* Frontend Layer */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 w-full max-w-4xl mb-8 text-center">
                <h5 className="text-xl font-bold text-white mb-4">Frontend Layer</h5>
                <div className="flex justify-around">
                  <div className="bg-blue-500/80 rounded-lg p-4 w-32">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">R</span>
                    </div>
                    <span className="font-semibold text-white">React/Next.js</span>
                  </div>
                  <div className="bg-blue-500/80 rounded-lg p-4 w-32">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">UI</span>
                    </div>
                    <span className="font-semibold text-white">UI Components</span>
                  </div>
                  <div className="bg-blue-500/80 rounded-lg p-4 w-32">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">SM</span>
                    </div>
                    <span className="font-semibold text-white">State Mgmt</span>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">↓</span>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              </div>

              {/* Backend Layer */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 w-full max-w-4xl mb-8 text-center">
                <h5 className="text-xl font-bold text-white mb-4">Backend Layer</h5>
                <div className="flex justify-around">
                  <div className="bg-purple-500/80 rounded-lg p-4 w-32">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">AR</span>
                    </div>
                    <span className="font-semibold text-white">API Routes</span>
                  </div>
                  <div className="bg-purple-500/80 rounded-lg p-4 w-32">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">HA</span>
                    </div>
                    <span className="font-semibold text-white">Hive API</span>
                  </div>
                  <div className="bg-purple-500/80 rounded-lg p-4 w-32">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">DC</span>
                    </div>
                    <span className="font-semibold text-white">Data Caching</span>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold">↓</span>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-red-500"></div>
              </div>

              {/* Blockchain Layer */}
              <div className="bg-gradient-to-r from-pink-600 to-red-800 rounded-xl p-6 w-full max-w-4xl text-center">
                <h5 className="text-xl font-bold text-white mb-4">Blockchain Layer</h5>
                <div className="flex justify-around">
                  <div className="bg-pink-500/80 rounded-lg p-4 w-32">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">HN</span>
                    </div>
                    <span className="font-semibold text-white">Hive Node</span>
                  </div>
                  <div className="bg-pink-500/80 rounded-lg p-4 w-32">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">SC</span>
                    </div>
                    <span className="font-semibold text-white">Smart Contracts</span>
                  </div>
                  <div className="bg-pink-500/80 rounded-lg p-4 w-32">
                    <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold">TS</span>
                    </div>
                    <span className="font-semibold text-white">Token System</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Component Interaction Diagram */}
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold text-blue-400 mb-4">Component Interaction Flow</h4>
            <div className="relative bg-gray-800 rounded-lg p-8 overflow-hidden">
              {/* Central Component */}
              <div className="flex justify-center mb-12">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-32 h-32 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-center">Hive Token<br/>Swap Core</span>
                </div>
              </div>
              
              {/* Surrounding Components */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-blue-500 mx-auto"></div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center w-32">
                    <span className="font-bold text-white">UI Layer</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-green-500 mx-auto"></div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-center w-32">
                    <span className="font-bold text-white">Wallet API</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-yellow-500 mx-auto"></div>
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg p-4 text-center w-32">
                    <span className="font-bold text-white">Blockchain</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-red-500 mx-auto"></div>
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-4 text-center w-32">
                    <span className="font-bold text-white">Social API</span>
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