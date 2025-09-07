import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const TechnicalDebtDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">1.5.7 Technical Debt Visualization</h3>
          
          <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Technical Debt Distribution</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-blue-400 font-semibold mb-3">By Component</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-32 text-gray-300 text-sm">Frontend</div>
                    <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        style={{ width: '6.2%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-300 text-sm">6.2%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-gray-300 text-sm">Backend</div>
                    <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                        style={{ width: '9.8%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-300 text-sm">9.8%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-gray-300 text-sm">Blockchain</div>
                    <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                        style={{ width: '12.3%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-300 text-sm">12.3%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-gray-300 text-sm">Overall</div>
                    <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                        style={{ width: '8.5%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-300 text-sm">8.5%</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-blue-400 font-semibold mb-3">By Debt Type</h5>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-32 text-gray-300 text-sm">Code Debt</div>
                    <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                        style={{ width: '45%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-300 text-sm">45%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-gray-300 text-sm">Design Debt</div>
                    <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
                        style={{ width: '25%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-300 text-sm">25%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-gray-300 text-sm">Documentation</div>
                    <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full"
                        style={{ width: '15%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-300 text-sm">15%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 text-gray-300 text-sm">Test Debt</div>
                    <div className="flex-1 h-6 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"
                        style={{ width: '10%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-300 text-sm">10%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h5 className="text-blue-400 font-semibold mb-3">Technical Debt Trend</h5>
              <div className="h-48 flex items-end space-x-2 justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t" style={{ height: '40%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q1</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t" style={{ height: '60%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q2</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t" style={{ height: '80%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q3</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t" style={{ height: '70%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q4</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t" style={{ height: '65%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q1 2025</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t" style={{ height: '55%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q2 2025</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t" style={{ height: '45%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q3 2025</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-green-500 to-green-300 rounded-t" style={{ height: '35%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q4 2025</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-green-500 to-green-300 rounded-t" style={{ height: '30%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q1 2026</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-green-500 to-green-300 rounded-t" style={{ height: '25%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q2 2026</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-green-500 to-green-300 rounded-t" style={{ height: '20%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q3 2026</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-gradient-to-t from-green-500 to-green-300 rounded-t" style={{ height: '15%' }}></div>
                  <div className="text-gray-400 text-xs mt-1">Q4 2026</div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Time →</span>
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-300 mr-1"></div>
                  <span>Accumulation</span>
                </span>
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-300 mr-1"></div>
                  <span>Reduction</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Technical Debt Management Process</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-4xl">
                {/* Process flow */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-4">
                  <div className="w-32 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">1</div>
                    <div className="text-sm">Debt Identification</div>
                  </div>
                  
                  <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                  
                  <div className="w-32 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-green-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">2</div>
                    <div className="text-sm">Impact Assessment</div>
                  </div>
                  
                  <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-green-500 to-yellow-500"></div>
                  
                  <div className="w-32 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">3</div>
                    <div className="text-sm">Prioritization</div>
                  </div>
                  
                  <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-yellow-500 to-red-500"></div>
                  
                  <div className="w-32 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-red-600 to-red-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">4</div>
                    <div className="text-sm">Repayment Planning</div>
                  </div>
                  
                  <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-red-500 to-purple-500"></div>
                  
                  <div className="w-32 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">5</div>
                    <div className="text-sm">Execution & Monitoring</div>
                  </div>
                </div>
                
                {/* Connecting arrows for mobile */}
                <div className="md:hidden flex flex-col items-center mt-4 space-y-2">
                  <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
                  <div className="h-8 w-1 bg-gradient-to-b from-green-500 to-yellow-500"></div>
                  <div className="h-8 w-1 bg-gradient-to-b from-yellow-500 to-red-500"></div>
                  <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-purple-500"></div>
                </div>
              </div>
              
              {/* Process details */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8 w-full">
                <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700">
                  <h5 className="text-blue-400 font-semibold text-sm">Identification</h5>
                  <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                    <li>Code reviews</li>
                    <li>Static analysis</li>
                    <li>Performance monitoring</li>
                  </ul>
                </div>
                <div className="p-3 bg-green-900/30 rounded-lg border border-green-700">
                  <h5 className="text-green-400 font-semibold text-sm">Assessment</h5>
                  <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                    <li>User impact</li>
                    <li>System stability</li>
                    <li>Maintenance cost</li>
                  </ul>
                </div>
                <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700">
                  <h5 className="text-yellow-400 font-semibold text-sm">Prioritization</h5>
                  <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                    <li>Business value</li>
                    <li>Risk analysis</li>
                    <li>Effort estimation</li>
                  </ul>
                </div>
                <div className="p-3 bg-red-900/30 rounded-lg border border-red-700">
                  <h5 className="text-red-400 font-semibold text-sm">Planning</h5>
                  <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                    <li>Refactoring sprints</li>
                    <li>Resource allocation</li>
                    <li>Timeline definition</li>
                  </ul>
                </div>
                <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-700">
                  <h5 className="text-purple-400 font-semibold text-sm">Execution</h5>
                  <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                    <li>Implementation</li>
                    <li>Testing</li>
                    <li>Monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Technical Debt Reduction Roadmap</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <div className="ml-4 flex-1">
                  <h5 className="text-blue-400 font-semibold">Q1 2026: Blockchain Integration Refactor</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Refactor the blockchain integration layer to improve maintainability and reduce the 12.3% debt in this area.
                    This will involve creating more modular components and better error handling mechanisms.
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-24 text-gray-400 text-xs">Progress:</div>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full"
                        style={{ width: '15%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-400 text-xs">15%</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <div className="ml-4 flex-1">
                  <h5 className="text-blue-400 font-semibold">Q2 2026: Documentation Improvement</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Implement comprehensive documentation for all components to address the 15% documentation debt.
                    This includes API documentation, component guides, and user manuals.
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-24 text-gray-400 text-xs">Progress:</div>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"
                        style={{ width: '5%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-400 text-xs">5%</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <div className="ml-4 flex-1">
                  <h5 className="text-blue-400 font-semibold">Q3 2026: Test Coverage Enhancement</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Address test coverage gaps in critical modules to reduce the 10% test debt.
                    Focus on wallet functionality, token swap mechanisms, and blockchain interactions.
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-24 text-gray-400 text-xs">Progress:</div>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-400 text-xs">0%</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white text-sm font-bold">
                  4
                </div>
                <div className="ml-4 flex-1">
                  <h5 className="text-blue-400 font-semibold">Q4 2026: Legacy Component Modernization</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Modernize legacy components and reduce dependency on deprecated libraries to address remaining code debt.
                    This includes updating UI components and optimizing performance.
                  </p>
                  <div className="mt-2 flex items-center">
                    <div className="w-24 text-gray-400 text-xs">Progress:</div>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-300 rounded-full"
                        style={{ width: '0%' }}
                      ></div>
                    </div>
                    <div className="w-12 text-right text-gray-400 text-xs">0%</div>
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