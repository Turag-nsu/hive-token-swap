import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const APIIntegrationDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.8 API Integration Visualization Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that illustrate the API integration architecture of the Hive Token Swap Platform. 
            These diagrams provide a visual representation of API service layers, integration patterns, and data flow between components.
          </p>

          {/* API Service Layer Architecture Diagram */}
          <h4 className="text-lg text-cyan-400 mt-6">4.8.1 API Service Layer Architecture Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Frontend Layer */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-2 text-center">Frontend</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Components</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Hooks</span>
                  </div>
                </div>
              </div>
              
              {/* API Service Layer */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-2 text-center">API Services</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-2 text-center">
                    <span className="text-white text-xs">AccountAPI</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-2 text-center">
                    <span className="text-white text-xs">TransactionAPI</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-2 text-center">
                    <span className="text-white text-xs">MarketAPI</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded p-2 text-center">
                    <span className="text-white text-xs">SocialAPI</span>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded p-2 text-center">
                    <span className="text-white text-xs">EngineAPI</span>
                  </div>
                </div>
              </div>
              
              {/* Data Transformation Layer */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-2 text-center">Data Transformation</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Validation</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Normalization</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Mapping</span>
                  </div>
                </div>
              </div>
              
              {/* Caching Layer */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-bold mb-2 text-center">Caching</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-2 text-center">
                    <span className="text-white text-xs">React Query</span>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Local Storage</span>
                  </div>
                </div>
              </div>
              
              {/* Blockchain Layer */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-red-400 font-bold mb-2 text-center">Blockchain</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Hive Node</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Hive Engine</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Data Flow */}
            <div className="mt-6 flex items-center justify-between">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="text-purple-400 font-bold">→</div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-green-500"></div>
              <div className="text-green-400 font-bold">→</div>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-yellow-500"></div>
              <div className="text-yellow-400 font-bold">→</div>
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-red-500"></div>
            </div>
            <div className="text-center text-gray-400 text-sm mt-2">Data Flow Direction</div>
          </div>

          {/* Core API Integration Patterns Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.8.2 Core API Integration Patterns Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Request/Response Handling */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Request/Response Handling</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Async Operations</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-blue-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Error Handling</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-cyan-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Retry Logic</span>
                  </div>
                </div>
              </div>
              
              {/* Data Transformation */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Data Transformation</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Response Normalization</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-purple-400 font-bold">⇄</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Type Safety</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-pink-400 font-bold">⇄</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Data Validation</span>
                  </div>
                </div>
              </div>
              
              {/* Caching Strategy */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Caching Strategy</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">React Query</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-green-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Cache Invalidation</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-emerald-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Persistent Caching</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Integration Patterns Flow */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-amber-400 font-bold mb-3 text-center">Integration Patterns Flow</h5>
              <div className="flex flex-wrap justify-center gap-3 mt-3">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded p-2">
                  <span className="text-white text-sm">Request</span>
                </div>
                <div className="text-amber-400 font-bold">→</div>
                <div className="bg-gradient-to-r from-yellow-500 to-lime-600 rounded p-2">
                  <span className="text-white text-sm">Process</span>
                </div>
                <div className="text-yellow-400 font-bold">→</div>
                <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded p-2">
                  <span className="text-white text-sm">Cache</span>
                </div>
                <div className="text-lime-400 font-bold">→</div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2">
                  <span className="text-white text-sm">Respond</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key API Endpoints Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.8.3 Key API Endpoints Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Account Operations */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Account Operations</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2 text-center">
                    <span className="text-white text-xs">get_accounts</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white text-xs">get_account_history</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-2 text-center">
                    <span className="text-white text-xs">get_account_reputations</span>
                  </div>
                </div>
              </div>
              
              {/* Blockchain Operations */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Blockchain Operations</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-2 text-center">
                    <span className="text-white text-xs">get_dynamic_global_properties</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-2 text-center">
                    <span className="text-white text-xs">get_block</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-2 text-center">
                    <span className="text-white text-xs">get_feed_history</span>
                  </div>
                </div>
              </div>
              
              {/* Transaction Broadcasting */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Transaction Broadcasting</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                    <span className="text-white text-xs">broadcast_transaction</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white text-xs">broadcast_transaction_synchronous</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Endpoint Interaction Flow */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-cyan-400 font-bold mb-3 text-center">Endpoint Interaction Flow</h5>
              <div className="relative h-32 mt-4">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Frontend</span>
                </div>
                
                <div className="absolute top-16 left-1/4 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">API Layer</span>
                </div>
                
                <div className="absolute top-16 right-1/4 transform translate-x-1/2 w-20 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Blockchain</span>
                </div>
                
                <div className="absolute top-8 left-1/4 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500"></div>
                <div className="absolute top-8 right-1/4 transform translate-x-1/2 w-1 h-8 bg-gradient-to-b from-cyan-500 to-purple-500"></div>
              </div>
            </div>
          </div>

          {/* Hive Engine Integration Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.8.4 Hive Engine Integration Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Platform Components */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-2 text-center">Platform</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Frontend</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white text-xs">API Services</span>
                  </div>
                </div>
              </div>
              
              {/* Custom JSON Operations */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-2 text-center">Custom JSON</h5>
                <div className="flex justify-center items-center h-full">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">JSON</span>
                  </div>
                </div>
              </div>
              
              {/* Hive Engine */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-2 text-center">Hive Engine</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Smart Contracts</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white text-xs">Tokens</span>
                  </div>
                </div>
              </div>
              
              {/* Event Monitoring */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-amber-400 font-bold mb-2 text-center">Monitoring</h5>
                <div className="flex justify-center items-center h-full">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full w-12 h-12 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">Events</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Integration Flow */}
            <div className="mt-6 flex items-center justify-between">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="text-purple-400 font-bold">→</div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-green-500"></div>
              <div className="text-green-400 font-bold">→</div>
              <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-amber-500"></div>
            </div>
            <div className="text-center text-gray-400 text-sm mt-2">Integration Flow</div>
          </div>

          {/* Security Considerations Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.8.5 Security Considerations Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Communication Security */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-red-400 font-bold mb-3 text-center">Communication Security</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">HTTPS Encryption</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-red-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Rate Limiting</span>
                  </div>
                </div>
              </div>
              
              {/* Data Security */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Data Security</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Signature Verification</span>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-green-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Data Validation</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security Layers */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-blue-400 font-bold mb-3 text-center">Security Layers</h5>
              <div className="relative h-24 mt-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">API</span>
                  </div>
                </div>
                <div className="absolute inset-0 border-4 border-red-500 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-2 border-2 border-green-500 rounded-full"></div>
                <div className="absolute inset-4 border-2 border-yellow-500 rounded-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-1 text-center">
                  <span className="text-white text-xs">Encryption</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-1 text-center">
                  <span className="text-white text-xs">Validation</span>
                </div>
                <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-1 text-center">
                  <span className="text-white text-xs">Protection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Optimization Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.8.6 Performance Optimization Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Batch Requests */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-2 text-center">Batch Requests</h5>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-xs">10</span>
                    </div>
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 rounded-full"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-green-500 rounded-full"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Paginated Results */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-2 text-center">Pagination</h5>
                <div className="flex justify-center">
                  <div className="flex">
                    <div className="w-4 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-l"></div>
                    <div className="w-4 h-8 bg-gradient-to-r from-pink-500 to-red-600"></div>
                    <div className="w-4 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-r"></div>
                  </div>
                </div>
              </div>
              
              {/* Selective Field Retrieval */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-2 text-center">Field Selection</h5>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg"></div>
                    <div className="absolute top-1 left-1 w-4 h-4 bg-gray-800 rounded"></div>
                    <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded"></div>
                    <div className="absolute bottom-1 left-1 w-4 h-4 bg-white rounded"></div>
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-gray-800 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Connection Pooling */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-amber-400 font-bold mb-2 text-center">Connection Pool</h5>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
                      <div className="flex flex-wrap justify-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Metrics */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-cyan-400 font-bold mb-3 text-center">Performance Metrics</h5>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded p-2 text-center">
                  <div className="text-white font-bold">280ms</div>
                  <div className="text-cyan-200 text-xs">API Response</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded p-2 text-center">
                  <div className="text-white font-bold">50</div>
                  <div className="text-blue-200 text-xs">Concurrent Ops</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-2 text-center">
                  <div className="text-white font-bold">0.3%</div>
                  <div className="text-purple-200 text-xs">Error Rate</div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.8.7 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different API components and integration layers</li>
              <li><strong>Arrows (→, ↓, ⇄)</strong>: Data flow and interaction directions</li>
              <li><strong>Layered Architecture</strong>: Different layers of the API integration system</li>
              <li><strong>Performance Metrics</strong>: Key performance indicators for API operations</li>
              <li><strong>Color Coding</strong>: Different API functions and system components</li>
              <li><strong>Blue Series</strong>: Frontend and basic API components</li>
              <li><strong>Purple Series</strong>: Service layer and integration components</li>
              <li><strong>Green Series</strong>: Data transformation and caching components</li>
              <li><strong>Red/Orange Series</strong>: Security and performance optimization</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};