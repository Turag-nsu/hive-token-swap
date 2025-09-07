import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const PerformanceMetricsDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">6.3 Performance Metrics Visualization Dashboards</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that visualize the performance metrics of the Hive Token Swap Platform. 
            These dashboards provide a visual representation of key performance indicators, benchmarks, and optimization results.
          </p>

          {/* Frontend Performance Dashboard */}
          <h4 className="text-lg text-cyan-400 mt-6">6.3.1 Frontend Performance Dashboard</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Load Time Metrics */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Load Time Metrics</h5>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Page Load</span>
                      <span className="text-white font-bold">420ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Time to Interactive</span>
                      <span className="text-white font-bold">680ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">First Paint</span>
                      <span className="text-white font-bold">310ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '31%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Resource Metrics */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Resource Metrics</h5>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Bundle Size</span>
                      <span className="text-white font-bold">847KB</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Memory Usage</span>
                      <span className="text-white font-bold">45MB</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Peak Memory</span>
                      <span className="text-white font-bold">120MB</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Performance Gauge */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
                  <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ 
                    clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)'
                  }}></div>
                  <div className="absolute inset-8 rounded-full bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">85%</div>
                      <div className="text-gray-400 text-sm">Performance</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blockchain Performance Dashboard */}
          <h4 className="text-lg text-cyan-400 mt-8">6.3.2 Blockchain Performance Dashboard</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Transaction Metrics */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-bold mb-3 text-center">Transaction Metrics</h5>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Broadcast Time</span>
                      <span className="text-white font-bold">180ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Block Time</span>
                      <span className="text-white font-bold">3s</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">API Response</span>
                      <span className="text-white font-bold">280ms</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Concurrent Operations */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Concurrent Operations</h5>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Max Concurrent</span>
                      <span className="text-white font-bold">50</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Error Rate</span>
                      <span className="text-white font-bold">0.3%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Throughput</span>
                      <span className="text-white font-bold">5000/min</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Blockchain Performance Timeline */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-blue-400 font-bold mb-3 text-center">Performance Timeline</h5>
              <div className="flex items-end justify-between h-24 mt-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 bg-gradient-to-t from-blue-500 to-cyan-600 rounded-t" style={{ height: '60%' }}></div>
                  <span className="text-gray-400 text-xs mt-1">T1</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 bg-gradient-to-t from-cyan-500 to-teal-600 rounded-t" style={{ height: '75%' }}></div>
                  <span className="text-gray-400 text-xs mt-1">T2</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 bg-gradient-to-t from-teal-500 to-green-600 rounded-t" style={{ height: '90%' }}></div>
                  <span className="text-gray-400 text-xs mt-1">T3</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 bg-gradient-to-t from-green-500 to-emerald-600 rounded-t" style={{ height: '85%' }}></div>
                  <span className="text-gray-400 text-xs mt-1">T4</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 bg-gradient-to-t from-emerald-500 to-lime-600 rounded-t" style={{ height: '95%' }}></div>
                  <span className="text-gray-400 text-xs mt-1">T5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Performance Dashboard */}
          <h4 className="text-lg text-cyan-400 mt-8">6.3.3 Wallet Performance Dashboard</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Balance Refresh */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">420ms</div>
                <div className="text-purple-200 text-sm">Balance Refresh</div>
              </div>
              
              {/* Transaction History */}
              <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">850ms</div>
                <div className="text-pink-200 text-sm">Tx History Load</div>
              </div>
              
              {/* Token Swap */}
              <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">2.1s</div>
                <div className="text-red-200 text-sm">Token Swap</div>
              </div>
              
              {/* Signature Request */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">150ms</div>
                <div className="text-orange-200 text-sm">Signature Request</div>
              </div>
            </div>
            
            {/* Wallet Performance Comparison */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-cyan-400 font-bold mb-3 text-center">Wallet Performance Comparison</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-800/50 p-3 rounded">
                  <div className="text-center text-blue-400 font-bold">Hive Keychain</div>
                  <div className="flex justify-center mt-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="text-center text-gray-400 text-sm mt-1">75% Efficiency</div>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded">
                  <div className="text-center text-green-400 font-bold">HiveSigner</div>
                  <div className="flex justify-center mt-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div className="text-center text-gray-400 text-sm mt-1">68% Efficiency</div>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded">
                  <div className="text-center text-purple-400 font-bold">Combined</div>
                  <div className="flex justify-center mt-2">
                    <div className="w-32 bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  <div className="text-center text-gray-400 text-sm mt-1">82% Efficiency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Performance Dashboard */}
          <h4 className="text-lg text-cyan-400 mt-8">6.3.4 Social Media Performance Dashboard</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feed Performance */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Feed Performance</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <div className="text-white font-bold">620ms</div>
                    <div className="text-blue-200 text-sm">Initial Feed Load</div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <div className="text-white font-bold">380ms</div>
                    <div className="text-cyan-200 text-sm">Infinite Scroll</div>
                  </div>
                </div>
              </div>
              
              {/* Interaction Performance */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Interaction Performance</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <div className="text-white font-bold">450ms</div>
                    <div className="text-green-200 text-sm">Post Creation</div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3 text-center">
                    <div className="text-white font-bold">280ms</div>
                    <div className="text-emerald-200 text-sm">Vote Registration</div>
                  </div>
                </div>
              </div>
              
              {/* Comment Performance */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Comment Performance</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <div className="text-white font-bold">220ms</div>
                    <div className="text-purple-200 text-sm">Comment Loading</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <div className="text-white font-bold">180ms</div>
                    <div className="text-pink-200 text-sm">Comment Posting</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Performance Trend */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-amber-400 font-bold mb-3 text-center">Performance Trend Over Time</h5>
              <div className="relative h-32 mt-4">
                <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end justify-between">
                  <div className="w-8 bg-gradient-to-t from-amber-500 to-yellow-600 rounded-t" style={{ height: '40%' }}></div>
                  <div className="w-8 bg-gradient-to-t from-yellow-500 to-lime-600 rounded-t" style={{ height: '60%' }}></div>
                  <div className="w-8 bg-gradient-to-t from-lime-500 to-green-600 rounded-t" style={{ height: '80%' }}></div>
                  <div className="w-8 bg-gradient-to-t from-green-500 to-emerald-600 rounded-t" style={{ height: '90%' }}></div>
                  <div className="w-8 bg-gradient-to-t from-emerald-500 to-teal-600 rounded-t" style={{ height: '85%' }}></div>
                </div>
              </div>
              <div className="flex justify-between text-gray-400 text-xs mt-2">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
                <span>Week 5</span>
              </div>
            </div>
          </div>

          {/* Stress Testing Dashboard */}
          <h4 className="text-lg text-cyan-400 mt-8">6.3.5 Stress Testing Dashboard</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Load Testing */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-red-400 font-bold mb-3 text-center">User Load Testing</h5>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Concurrent Users</span>
                      <span className="text-white font-bold">1000</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-pink-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Transaction Volume</span>
                      <span className="text-white font-bold">5000/min</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* System Stability */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-orange-400 font-bold mb-3 text-center">System Stability</h5>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Memory Stability</span>
                      <span className="text-white font-bold">No Leaks</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold">Error Recovery</span>
                      <span className="text-white font-bold">99.2%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '99%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stress Test Results Matrix */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-green-400 font-bold mb-3 text-center">Stress Test Results Matrix</h5>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">✓</div>
                  <div className="text-green-200 text-sm">All Tests Passed</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">99.2%</div>
                  <div className="text-emerald-200 text-sm">Recovery Rate</div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">6.3.6 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different performance metrics and categories</li>
              <li><strong>Progress Bars</strong>: Performance levels and completion rates</li>
              <li><strong>Gauges</strong>: Overall performance scores and ratings</li>
              <li><strong>Timelines</strong>: Performance trends over time</li>
              <li><strong>Color Coding</strong>: Different performance categories and severity levels</li>
              <li><strong>Blue Series</strong>: Frontend performance metrics</li>
              <li><strong>Green Series</strong>: Success rates and positive metrics</li>
              <li><strong>Red/Orange Series</strong>: Critical metrics and potential issues</li>
              <li><strong>Purple Series</strong>: Wallet and blockchain performance</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};