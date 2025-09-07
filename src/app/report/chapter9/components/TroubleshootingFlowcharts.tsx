import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const TroubleshootingFlowcharts: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">9.1.10 Troubleshooting Decision Flowcharts</h3>
          
          <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Wallet Connection Issue Resolution Flow</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-3xl">
                {/* Start */}
                <div className="flex justify-center">
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold">
                    Issue Reported
                  </div>
                </div>
                
                <div className="flex justify-center my-4">
                  <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold">
                    Wallet Detected?
                  </div>
                </div>
                
                {/* Decision branches */}
                <div className="flex justify-center mt-4">
                  <div className="flex w-64">
                    <div className="w-1/2 flex flex-col items-center">
                      <div className="text-gray-300 text-sm mb-2">Yes</div>
                      <div className="h-8 w-1 bg-gradient-to-b from-green-500 to-yellow-500"></div>
                    </div>
                    <div className="w-1/2 flex flex-col items-center">
                      <div className="text-gray-300 text-sm mb-2">No</div>
                      <div className="h-8 w-1 bg-gradient-to-b from-green-500 to-red-500"></div>
                    </div>
                  </div>
                </div>
                
                {/* Yes branch */}
                <div className="flex justify-start ml-24">
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white font-semibold text-sm">
                    Connection Timeout?
                  </div>
                </div>
                
                <div className="flex justify-start ml-24 mt-4">
                  <div className="flex w-64">
                    <div className="w-1/2 flex flex-col items-center">
                      <div className="text-gray-300 text-sm mb-2">Yes</div>
                      <div className="h-8 w-1 bg-gradient-to-b from-yellow-500 to-purple-500"></div>
                    </div>
                    <div className="w-1/2 flex flex-col items-center">
                      <div className="text-gray-300 text-sm mb-2">No</div>
                      <div className="h-8 w-1 bg-gradient-to-b from-yellow-500 to-indigo-500"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-start ml-16">
                  <div className="w-40 h-16 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-semibold text-xs p-2 text-center">
                    Check Internet & Restart Browser
                  </div>
                </div>
                
                <div className="flex justify-end mr-16">
                  <div className="w-40 h-16 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg text-white font-semibold text-xs p-2 text-center">
                    Check Account Status
                  </div>
                </div>
                
                {/* No branch */}
                <div className="flex justify-end mr-24">
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold text-sm">
                    Extension Installed?
                  </div>
                </div>
                
                <div className="flex justify-end mr-24 mt-4">
                  <div className="flex w-64">
                    <div className="w-1/2 flex flex-col items-center">
                      <div className="text-gray-300 text-sm mb-2">Yes</div>
                      <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-teal-500"></div>
                    </div>
                    <div className="w-1/2 flex flex-col items-center">
                      <div className="text-gray-300 text-sm mb-2">No</div>
                      <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-orange-500"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mr-16">
                  <div className="w-40 h-16 flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg text-white font-semibold text-xs p-2 text-center">
                    Refresh Page & Enable Extension
                  </div>
                </div>
                
                <div className="flex justify-start ml-16">
                  <div className="w-40 h-16 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-semibold text-xs p-2 text-center">
                    Install Wallet Extension
                  </div>
                </div>
                
                {/* Resolution points */}
                <div className="flex justify-center mt-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="w-32 h-12 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white text-xs text-center p-2">
                      Resolution Path 1
                    </div>
                    <div className="w-32 h-12 flex items-center justify-center bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-lg text-white text-xs text-center p-2">
                      Resolution Path 2
                    </div>
                    <div className="w-32 h-12 flex items-center justify-center bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg text-white text-xs text-center p-2">
                      Resolution Path 3
                    </div>
                    <div className="w-32 h-12 flex items-center justify-center bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg text-white text-xs text-center p-2">
                      Resolution Path 4
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Token Swap Issue Diagnosis Flow</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-4xl">
                {/* Main flow */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white font-semibold">
                    Swap Fails
                  </div>
                  
                  <div className="h-6 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
                  
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold">
                    Error Message?
                  </div>
                  
                  <div className="h-6 w-1 bg-gradient-to-b from-green-500 to-yellow-500"></div>
                  
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white font-semibold">
                    "Insufficient Balance"
                  </div>
                  
                  <div className="h-6 w-1 bg-gradient-to-b from-yellow-500 to-red-500"></div>
                  
                  <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white font-semibold">
                    Balance Check
                  </div>
                </div>
                
                {/* Diagnostic branches */}
                <div className="absolute top-24 -right-48 w-64">
                  <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <h5 className="text-cyan-400 font-semibold text-sm">Other Errors</h5>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Network issues</li>
                      <li>Contract problems</li>
                      <li>Fee insufficient</li>
                      <li>RC depletion</li>
                    </ul>
                    <div className="mt-3 flex justify-center">
                      <div className="w-24 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 rounded text-white text-xs">
                        General Fix
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-64 -right-48 w-64">
                  <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                    <h5 className="text-cyan-400 font-semibold text-sm">Verification Steps</h5>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Correct wallet</li>
                      <li>Token location</li>
                      <li>Account status</li>
                      <li>Pending txns</li>
                    </ul>
                    <div className="mt-3 flex justify-center">
                      <div className="w-24 h-8 flex items-center justify-center bg-gradient-to-r from-teal-500 to-teal-600 rounded text-white text-xs">
                        Verify All
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Resolution paths */}
                <div className="flex justify-center mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg text-white text-center">
                      <h5 className="font-semibold text-sm">Network Fix</h5>
                      <p className="text-xs mt-1">Check connection and retry</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg text-white text-center">
                      <h5 className="font-semibold text-sm">Balance Fix</h5>
                      <p className="text-xs mt-1">Transfer missing tokens</p>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg text-white text-center">
                      <h5 className="font-semibold text-sm">Fee Fix</h5>
                      <p className="text-xs mt-1">Add HIVE for fees</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Performance Issue Troubleshooting Flow</h4>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Flowchart */}
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-5xl">
                    {/* Start */}
                    <div className="flex justify-center">
                      <div className="w-40 h-16 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white p-2">
                        <div className="font-semibold text-sm">Performance Issue</div>
                        <div className="text-xs mt-1">Slow loading or lag</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center my-4">
                      <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-40 h-16 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-semibold text-sm">
                        Device Check
                      </div>
                    </div>
                    
                    {/* Decision points */}
                    <div className="grid grid-cols-3 gap-8 mt-8">
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-16 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg text-white p-2">
                          <div className="font-semibold text-sm">Browser</div>
                          <div className="text-xs mt-1">Memory/CPU</div>
                        </div>
                        <div className="mt-4 w-24 h-12 flex items-center justify-center bg-gradient-to-r from-yellow-600 to-yellow-700 rounded text-white text-xs text-center">
                          Close Tabs
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-16 flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white p-2">
                          <div className="font-semibold text-sm">Network</div>
                          <div className="text-xs mt-1">Speed/Test</div>
                        </div>
                        <div className="mt-4 w-24 h-12 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 rounded text-white text-xs text-center">
                          Check Speed
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-16 flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-red-600 rounded-lg text-white p-2">
                          <div className="font-semibold text-sm">Platform</div>
                          <div className="text-xs mt-1">Cache/Settings</div>
                        </div>
                        <div className="mt-4 w-24 h-12 flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 rounded text-white text-xs text-center">
                          Clear Cache
                        </div>
                      </div>
                    </div>
                    
                    {/* Resolution paths */}
                    <div className="flex justify-center mt-12">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                        <div className="p-4 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg text-white">
                          <h5 className="font-semibold text-sm mb-2">Device Optimized</h5>
                          <ul className="text-xs list-disc list-inside space-y-1">
                            <li>Close apps</li>
                            <li>Free memory</li>
                            <li>Restart device</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg text-white">
                          <h5 className="font-semibold text-sm mb-2">Network Improved</h5>
                          <ul className="text-xs list-disc list-inside space-y-1">
                            <li>Switch network</li>
                            <li>Use ethernet</li>
                            <li>Restart router</li>
                          </ul>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-br from-orange-600 to-orange-800 rounded-lg text-white">
                          <h5 className="font-semibold text-sm mb-2">Platform Fixed</h5>
                          <ul className="text-xs list-disc list-inside space-y-1">
                            <li>Update browser</li>
                            <li>Disable extensions</li>
                            <li>Reset settings</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Final resolution */}
                    <div className="flex justify-center mt-8">
                      <div className="w-48 h-16 flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white font-semibold">
                        Issue Resolved
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