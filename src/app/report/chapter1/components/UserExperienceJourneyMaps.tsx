import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const UserExperienceJourneyMaps: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">1.6.5 User Experience Journey Maps</h3>
          
          <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">New User Onboarding Journey</h4>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Journey stages */}
                <div className="flex justify-between mb-8">
                  <div className="flex flex-col items-center w-1/5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                    <h5 className="text-blue-400 font-semibold mt-2 text-center">Discovery</h5>
                  </div>
                  <div className="flex flex-col items-center w-1/5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-bold text-xl">
                      2
                    </div>
                    <h5 className="text-green-400 font-semibold mt-2 text-center">Registration</h5>
                  </div>
                  <div className="flex flex-col items-center w-1/5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-white font-bold text-xl">
                      3
                    </div>
                    <h5 className="text-yellow-400 font-semibold mt-2 text-center">Setup</h5>
                  </div>
                  <div className="flex flex-col items-center w-1/5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-xl">
                      4
                    </div>
                    <h5 className="text-purple-400 font-semibold mt-2 text-center">First Interaction</h5>
                  </div>
                  <div className="flex flex-col items-center w-1/5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold text-xl">
                      5
                    </div>
                    <h5 className="text-red-400 font-semibold mt-2 text-center">Engagement</h5>
                  </div>
                </div>
                
                {/* Journey flow */}
                <div className="relative">
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-purple-500 to-red-500"></div>
                  
                  {/* Stage details */}
                  <div className="grid grid-cols-5 gap-4 mt-12">
                    <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-700">
                      <h6 className="text-blue-400 font-semibold">Actions</h6>
                      <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                        <li>Visit website</li>
                        <li>Read about features</li>
                        <li>Watch demo video</li>
                      </ul>
                      <h6 className="text-blue-400 font-semibold mt-3">Emotions</h6>
                      <div className="flex mt-2">
                        <div className="w-3 h-6 bg-gradient-to-t from-blue-300 to-blue-500 rounded-t mr-1"></div>
                        <div className="w-3 h-8 bg-gradient-to-t from-blue-300 to-blue-500 rounded-t mr-1"></div>
                        <div className="w-3 h-10 bg-gradient-to-t from-blue-300 to-blue-500 rounded-t mr-1"></div>
                        <div className="w-3 h-6 bg-gradient-to-t from-blue-300 to-blue-500 rounded-t"></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-900/30 rounded-lg border border-green-700">
                      <h6 className="text-green-400 font-semibold">Actions</h6>
                      <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                        <li>Click sign up</li>
                        <li>Enter credentials</li>
                        <li>Verify email</li>
                      </ul>
                      <h6 className="text-green-400 font-semibold mt-3">Emotions</h6>
                      <div className="flex mt-2">
                        <div className="w-3 h-8 bg-gradient-to-t from-green-300 to-green-500 rounded-t mr-1"></div>
                        <div className="w-3 h-10 bg-gradient-to-t from-green-300 to-green-500 rounded-t mr-1"></div>
                        <div className="w-3 h-12 bg-gradient-to-t from-green-300 to-green-500 rounded-t mr-1"></div>
                        <div className="w-3 h-8 bg-gradient-to-t from-green-300 to-green-500 rounded-t"></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-900/30 rounded-lg border border-yellow-700">
                      <h6 className="text-yellow-400 font-semibold">Actions</h6>
                      <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                        <li>Connect wallet</li>
                        <li>Set preferences</li>
                        <li>Complete profile</li>
                      </ul>
                      <h6 className="text-yellow-400 font-semibold mt-3">Emotions</h6>
                      <div className="flex mt-2">
                        <div className="w-3 h-10 bg-gradient-to-t from-yellow-300 to-yellow-500 rounded-t mr-1"></div>
                        <div className="w-3 h-12 bg-gradient-to-t from-yellow-300 to-yellow-500 rounded-t mr-1"></div>
                        <div className="w-3 h-8 bg-gradient-to-t from-yellow-300 to-yellow-500 rounded-t mr-1"></div>
                        <div className="w-3 h-6 bg-gradient-to-t from-yellow-300 to-yellow-500 rounded-t"></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-700">
                      <h6 className="text-purple-400 font-semibold">Actions</h6>
                      <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                        <li>Create first post</li>
                        <li>Make token swap</li>
                        <li>Interact with content</li>
                      </ul>
                      <h6 className="text-purple-400 font-semibold mt-3">Emotions</h6>
                      <div className="flex mt-2">
                        <div className="w-3 h-12 bg-gradient-to-t from-purple-300 to-purple-500 rounded-t mr-1"></div>
                        <div className="w-3 h-10 bg-gradient-to-t from-purple-300 to-purple-500 rounded-t mr-1"></div>
                        <div className="w-3 h-8 bg-gradient-to-t from-purple-300 to-purple-500 rounded-t mr-1"></div>
                        <div className="w-3 h-6 bg-gradient-to-t from-purple-300 to-purple-500 rounded-t"></div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-red-900/30 rounded-lg border border-red-700">
                      <h6 className="text-red-400 font-semibold">Actions</h6>
                      <ul className="text-gray-300 text-sm mt-2 list-disc list-inside space-y-1">
                        <li>Regular posting</li>
                        <li>Token transactions</li>
                        <li>Community building</li>
                      </ul>
                      <h6 className="text-red-400 font-semibold mt-3">Emotions</h6>
                      <div className="flex mt-2">
                        <div className="w-3 h-8 bg-gradient-to-t from-red-300 to-red-500 rounded-t mr-1"></div>
                        <div className="w-3 h-12 bg-gradient-to-t from-red-300 to-red-500 rounded-t mr-1"></div>
                        <div className="w-3 h-10 bg-gradient-to-t from-red-300 to-red-500 rounded-t mr-1"></div>
                        <div className="w-3 h-6 bg-gradient-to-t from-red-300 to-red-500 rounded-t"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Token Swap User Journey</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-full max-w-4xl">
                {/* Journey flow */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                  <div className="w-24 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">1</div>
                    <div className="text-sm">Wallet Connect</div>
                  </div>
                  
                  <div className="hidden md:block w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                  
                  <div className="w-24 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-green-600 to-green-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">2</div>
                    <div className="text-sm">Token Selection</div>
                  </div>
                  
                  <div className="hidden md:block w-16 h-1 bg-gradient-to-r from-green-500 to-yellow-500"></div>
                  
                  <div className="w-24 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">3</div>
                    <div className="text-sm">Amount Input</div>
                  </div>
                  
                  <div className="hidden md:block w-16 h-1 bg-gradient-to-r from-yellow-500 to-red-500"></div>
                  
                  <div className="w-24 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-red-600 to-red-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">4</div>
                    <div className="text-sm">Confirmation</div>
                  </div>
                  
                  <div className="hidden md:block w-16 h-1 bg-gradient-to-r from-red-500 to-purple-500"></div>
                  
                  <div className="w-24 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg text-white p-2 text-center">
                    <div className="text-lg font-bold">5</div>
                    <div className="text-sm">Transaction</div>
                  </div>
                </div>
                
                {/* Connecting arrows for mobile */}
                <div className="md:hidden flex flex-col items-center mt-4 space-y-2">
                  <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
                  <div className="h-8 w-1 bg-gradient-to-b from-green-500 to-yellow-500"></div>
                  <div className="h-8 w-1 bg-gradient-to-b from-yellow-500 to-red-500"></div>
                  <div className="h-8 w-1 bg-gradient-to-b from-red-500 to-purple-500"></div>
                </div>
                
                {/* Pain points and opportunities */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-12">
                  <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-700">
                    <h6 className="text-blue-400 font-semibold text-sm">Pain Points</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Wallet setup complexity</li>
                      <li>Security concerns</li>
                    </ul>
                    <h6 className="text-blue-400 font-semibold text-sm mt-2">Opportunities</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Simplified onboarding</li>
                      <li>Clear instructions</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-green-900/30 rounded-lg border border-green-700">
                    <h6 className="text-green-400 font-semibold text-sm">Pain Points</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Token variety</li>
                      <li>Price discovery</li>
                    </ul>
                    <h6 className="text-green-400 font-semibold text-sm mt-2">Opportunities</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Search functionality</li>
                      <li>Price comparison</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-900/30 rounded-lg border border-yellow-700">
                    <h6 className="text-yellow-400 font-semibold text-sm">Pain Points</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Slippage concerns</li>
                      <li>Fee transparency</li>
                    </ul>
                    <h6 className="text-yellow-400 font-semibold text-sm mt-2">Opportunities</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Real-time estimates</li>
                      <li>Fee breakdown</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-red-900/30 rounded-lg border border-red-700">
                    <h6 className="text-red-400 font-semibold text-sm">Pain Points</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Confirmation anxiety</li>
                      <li>Time estimation</li>
                    </ul>
                    <h6 className="text-red-400 font-semibold text-sm mt-2">Opportunities</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Progress indicators</li>
                      <li>Clear messaging</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-purple-900/30 rounded-lg border border-purple-700">
                    <h6 className="text-purple-400 font-semibold text-sm">Pain Points</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Success confirmation</li>
                      <li>Next steps unclear</li>
                    </ul>
                    <h6 className="text-purple-400 font-semibold text-sm mt-2">Opportunities</h6>
                    <ul className="text-gray-300 text-xs mt-2 list-disc list-inside space-y-1">
                      <li>Clear success message</li>
                      <li>Action suggestions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h4 className="text-lg text-cyan-400 mb-4">Content Creator Journey</h4>
            <div className="relative">
              {/* Timeline */}
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full"></div>
                  <div className="w-1 h-full bg-gradient-to-b from-blue-500 to-green-500"></div>
                </div>
                <div className="pb-8">
                  <h5 className="text-blue-400 font-semibold">Idea Generation</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Content creators begin with an idea or topic they want to explore. The platform provides 
                    inspiration through trending topics and community discussions.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded">Research</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded">Brainstorming</span>
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded">Planning</span>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-700 rounded-full"></div>
                  <div className="w-1 h-full bg-gradient-to-b from-green-500 to-yellow-500"></div>
                </div>
                <div className="pb-8">
                  <h5 className="text-green-400 font-semibold">Content Creation</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Using the platform's intuitive editor, creators craft their content with rich media support, 
                    formatting options, and real-time preview capabilities.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded">Writing</span>
                    <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded">Media Upload</span>
                    <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded">Formatting</span>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full"></div>
                  <div className="w-1 h-full bg-gradient-to-b from-yellow-500 to-red-500"></div>
                </div>
                <div className="pb-8">
                  <h5 className="text-yellow-400 font-semibold">Publishing & Promotion</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Content is published with customizable visibility settings and promoted through the platform's 
                    social features and token incentives.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded">Scheduling</span>
                    <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded">Tagging</span>
                    <span className="px-2 py-1 bg-yellow-900/50 text-yellow-300 text-xs rounded">Sharing</span>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-red-700 rounded-full"></div>
                  <div className="w-1 h-full bg-gradient-to-b from-red-500 to-purple-500"></div>
                </div>
                <div className="pb-8">
                  <h5 className="text-red-400 font-semibold">Engagement & Feedback</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Creators interact with their audience through comments, votes, and token rewards, building 
                    community and receiving valuable feedback.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded">Comments</span>
                    <span className="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded">Votes</span>
                    <span className="px-2 py-1 bg-red-900/50 text-red-300 text-xs rounded">Rewards</span>
                  </div>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full"></div>
                </div>
                <div>
                  <h5 className="text-purple-400 font-semibold">Analytics & Growth</h5>
                  <p className="text-gray-300 text-sm mt-1">
                    Detailed analytics help creators understand their audience, track performance, and refine 
                    their content strategy for continued growth.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded">Insights</span>
                    <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded">Trends</span>
                    <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded">Optimization</span>
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