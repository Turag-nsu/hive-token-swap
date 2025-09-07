import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const DeploymentPipelineDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">1.5.6 Deployment Pipeline Diagrams</h3>
          
          <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">CI/CD Pipeline Flow</h4>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-32 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold">
                  Code Commit
                </div>
                <div className="flex-grow h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-2"></div>
                <div className="flex-shrink-0 w-32 h-12 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold">
                  CI Build
                </div>
                <div className="flex-grow h-1 bg-gradient-to-r from-green-500 to-yellow-500 mx-2"></div>
                <div className="flex-shrink-0 w-32 h-12 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white font-semibold">
                  Testing
                </div>
                <div className="flex-grow h-1 bg-gradient-to-r from-yellow-500 to-purple-500 mx-2"></div>
                <div className="flex-shrink-0 w-32 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-semibold">
                  Staging Deploy
                </div>
                <div className="flex-grow h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-2"></div>
                <div className="flex-shrink-0 w-32 h-12 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold">
                  Production
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-4 mt-8">
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
                  <h5 className="text-blue-400 font-semibold">Code Commit</h5>
                  <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                    <li>Push to GitHub</li>
                    <li>Branch protection</li>
                    <li>PR creation</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
                  <h5 className="text-green-400 font-semibold">CI Build</h5>
                  <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                    <li>Code checkout</li>
                    <li>Dependency install</li>
                    <li>Build process</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-700">
                  <h5 className="text-yellow-400 font-semibold">Testing</h5>
                  <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                    <li>Unit tests</li>
                    <li>Integration tests</li>
                    <li>E2E tests</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
                  <h5 className="text-purple-400 font-semibold">Staging Deploy</h5>
                  <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                    <li>Preview deployment</li>
                    <li>QA validation</li>
                    <li>Performance tests</li>
                  </ul>
                </div>
                <div className="p-4 bg-red-900/30 rounded-lg border border-red-700">
                  <h5 className="text-red-400 font-semibold">Production</h5>
                  <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                    <li>Blue-green deploy</li>
                    <li>Health checks</li>
                    <li>Monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Deployment Architecture</h4>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-4xl">
                {/* Developer Layer */}
                <div className="flex justify-between mb-8">
                  <div className="w-1/3 p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">Developer</h5>
                    <p className="text-sm mt-2">Code Changes</p>
                  </div>
                  <div className="w-1/3 p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">GitHub</h5>
                    <p className="text-sm mt-2">Version Control</p>
                  </div>
                  <div className="w-1/3 p-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">CI/CD System</h5>
                    <p className="text-sm mt-2">Automation</p>
                  </div>
                </div>
                
                {/* Pipeline Flow */}
                <div className="flex justify-center mb-8">
                  <div className="h-16 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
                </div>
                
                <div className="flex justify-between mb-8">
                  <div className="w-1/4 p-4 bg-gradient-to-br from-green-600 to-green-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">Build</h5>
                    <p className="text-sm mt-2">Next.js Build</p>
                  </div>
                  <div className="w-1/4 p-4 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">Test</h5>
                    <p className="text-sm mt-2">Quality Checks</p>
                  </div>
                  <div className="w-1/4 p-4 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">Staging</h5>
                    <p className="text-sm mt-2">Preview Deploy</p>
                  </div>
                  <div className="w-1/4 p-4 bg-gradient-to-br from-red-600 to-red-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">Production</h5>
                    <p className="text-sm mt-2">Vercel Deploy</p>
                  </div>
                </div>
                
                {/* Infrastructure Layer */}
                <div className="flex justify-center mb-8">
                  <div className="h-16 w-1 bg-gradient-to-b from-red-500 to-indigo-500"></div>
                </div>
                
                <div className="flex justify-between">
                  <div className="w-1/5 p-4 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">CDN</h5>
                    <p className="text-sm mt-2">Global Delivery</p>
                  </div>
                  <div className="w-1/5 p-4 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">Edge Network</h5>
                    <p className="text-sm mt-2">Vercel Edge</p>
                  </div>
                  <div className="w-1/5 p-4 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">Monitoring</h5>
                    <p className="text-sm mt-2">Analytics</p>
                  </div>
                  <div className="w-1/5 p-4 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">Security</h5>
                    <p className="text-sm mt-2">Cloudflare</p>
                  </div>
                  <div className="w-1/5 p-4 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg text-white text-center">
                    <h5 className="font-semibold">Users</h5>
                    <p className="text-sm mt-2">Global Access</p>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 w-full max-w-2xl">
                <h5 className="text-cyan-400 font-semibold mb-2">Legend</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded mr-2"></div>
                    <span className="text-gray-300">Development & Version Control</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-600 to-green-800 rounded mr-2"></div>
                    <span className="text-gray-300">Build Process</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded mr-2"></div>
                    <span className="text-gray-300">Testing & Quality Assurance</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded mr-2"></div>
                    <span className="text-gray-300">Staging Environment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-600 to-red-800 rounded mr-2"></div>
                    <span className="text-gray-300">Production Deployment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded mr-2"></div>
                    <span className="text-gray-300">Infrastructure & Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Rollback and Recovery Process</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-3xl">
                {/* Main process flow */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold">
                    Deployment Success
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-12 w-1 bg-gradient-to-b from-green-500 to-yellow-500"></div>
                  </div>
                  
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white font-semibold">
                    Health Monitoring
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-12 w-1 bg-gradient-to-b from-yellow-500 to-red-500"></div>
                  </div>
                  
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold">
                    Issue Detected
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-12 w-1 bg-gradient-to-b from-red-500 to-purple-500"></div>
                  </div>
                  
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-semibold">
                    Automated Rollback
                  </div>
                  
                  <div className="flex items-center">
                    <div className="h-12 w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                  </div>
                  
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold">
                    Previous Version
                  </div>
                </div>
                
                {/* Decision points */}
                <div className="absolute top-24 -right-32 w-48">
                  <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <h5 className="text-cyan-400 font-semibold text-sm">Threshold Check</h5>
                    <p className="text-gray-300 text-xs mt-1">Error Rate &lt; 5%</p>
                  </div>
                </div>
                
                <div className="absolute top-60 -right-32 w-48">
                  <div className="p-3 bg-gray-800 rounded-lg border border-gray-700">
                    <h5 className="text-cyan-400 font-semibold text-sm">Manual Override</h5>
                    <p className="text-gray-300 text-xs mt-1">Team Intervention</p>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-12 p-4 bg-gray-800 rounded-lg border border-gray-700 w-full max-w-2xl">
                <h5 className="text-cyan-400 font-semibold mb-2">Process Legend</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded mr-2"></div>
                    <span className="text-gray-300">Normal Operation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded mr-2"></div>
                    <span className="text-gray-300">Monitoring Phase</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded mr-2"></div>
                    <span className="text-gray-300">Issue Detection</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded mr-2"></div>
                    <span className="text-gray-300">Recovery Action</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded mr-2"></div>
                    <span className="text-gray-300">Stable State</span>
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