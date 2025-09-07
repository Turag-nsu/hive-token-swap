import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const SocialMediaDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.19 Social Media Feature Architecture Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that illustrate the architecture and flow of social media features within the Hive Token Swap Platform. 
            These diagrams provide a visual representation of how content is created, distributed, and interacted with in the decentralized social network.
          </p>

          {/* Content Feed Architecture */}
          <h4 className="text-lg text-cyan-400 mt-6">4.19.1 Content Feed Architecture</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Data Sources */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Data Sources</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive Blockchain</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">User Following</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Trending Algorithms</span>
                  </div>
                </div>
              </div>
              
              {/* Processing Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Processing Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Content Aggregator</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Filter Engine</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Ranking System</span>
                  </div>
                </div>
              </div>
              
              {/* Presentation Layer */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Presentation Layer</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Social Feed UI</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Content Cards</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Interaction Widgets</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Data Flow */}
            <div className="mt-6 flex flex-col items-center">
              <div className="flex items-center justify-between w-full max-w-md">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="mx-2 text-purple-400">→</div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="mx-2 text-pink-400">→</div>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-green-500"></div>
              </div>
              <div className="text-center text-gray-400 mt-2">Data Flow Direction</div>
            </div>
          </div>

          {/* Content Creation Flow */}
          <h4 className="text-lg text-cyan-400 mt-8">4.19.2 Content Creation Flow</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Central Creation Hub */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-center">Content<br/>Creation</span>
                </div>
              </div>
              
              {/* Creation Steps */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg mb-2">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="text-center">
                    <h5 className="text-blue-400 font-bold text-sm">Compose</h5>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg mb-2">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="text-center">
                    <h5 className="text-purple-400 font-bold text-sm">Format</h5>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg mb-2">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="text-center">
                    <h5 className="text-pink-400 font-bold text-sm">Preview</h5>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg mb-2">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="text-center">
                    <h5 className="text-red-400 font-bold text-sm">Sign</h5>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg mb-2">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div className="text-center">
                    <h5 className="text-orange-400 font-bold text-sm">Publish</h5>
                  </div>
                </div>
              </div>
              
              {/* Backend Processing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Validate Content</h5>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-500 to-lime-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Format for Blockchain</h5>
                </div>
                
                <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Broadcast to Hive</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Social Interaction System */}
          <h4 className="text-lg text-cyan-400 mt-8">4.19.3 Social Interaction System</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative">
              {/* Central Content */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg p-4 w-48 text-center shadow-xl">
                  <h5 className="text-white font-bold">Social Content</h5>
                  <p className="text-indigo-200 text-sm">Post or Comment</p>
                </div>
              </div>
              
              {/* Interaction Types */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-3 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Upvote</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-cyan-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-3 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Downvote</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-green-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-teal-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-3 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Comment</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-amber-400 font-bold">→</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-3 text-center shadow-md w-full">
                    <h5 className="text-white font-bold">Share</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-red-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-pink-400 font-bold">→</div>
                  </div>
                </div>
              </div>
              
              {/* Processing and Feedback */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-4 text-center">
                  <h5 className="text-white font-bold">Interaction Processing</h5>
                </div>
                
                <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-4 text-center">
                  <h5 className="text-white font-bold">Blockchain Broadcast</h5>
                </div>
                
                <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-4 text-center">
                  <h5 className="text-white font-bold">UI Update</h5>
                </div>
              </div>
            </div>
          </div>

          {/* User Following System */}
          <h4 className="text-lg text-cyan-400 mt-8">4.19.4 User Following System</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* State 1: Not Following */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="text-center">
                  <h5 className="text-gray-400 font-bold">Not Following</h5>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-gray-500 to-gray-700 mt-2"></div>
              </div>
              
              {/* State 2: Requesting */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="text-center">
                  <h5 className="text-blue-400 font-bold">Requesting</h5>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 mt-2"></div>
              </div>
              
              {/* State 3: Following */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="text-center">
                  <h5 className="text-green-400 font-bold">Following</h5>
                </div>
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 mt-2"></div>
              </div>
              
              {/* State 4: Unfollowing */}
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center shadow-lg mb-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <div className="text-center">
                  <h5 className="text-red-400 font-bold">Unfollowing</h5>
                </div>
              </div>
            </div>
            
            {/* Following Process Flow */}
            <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded p-2">
                    <span className="text-white text-sm">Not Following</span>
                  </div>
                  <div className="mx-2 text-blue-400">→</div>
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2">
                    <span className="text-white text-sm">Requesting</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2">
                    <span className="text-white text-sm">Requesting</span>
                  </div>
                  <div className="mx-2 text-green-400">→</div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2">
                    <span className="text-white text-sm">Following</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2">
                    <span className="text-white text-sm">Following</span>
                  </div>
                  <div className="mx-2 text-red-400">→</div>
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-2">
                    <span className="text-white text-sm">Unfollowing</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-2">
                    <span className="text-white text-sm">Unfollowing</span>
                  </div>
                  <div className="mx-2 text-gray-400">→</div>
                  <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded p-2">
                    <span className="text-white text-sm">Not Following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.19.5 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different components and states in social media features</li>
              <li><strong>Arrows (→)</strong>: Data flow and process direction</li>
              <li><strong>Central Hubs</strong>: Core functionality components</li>
              <li><strong>Layered Architecture</strong>: Different layers of the social media system</li>
              <li><strong>State Transitions</strong>: User interaction states and their transitions</li>
              <li><strong>Color Coding</strong>: Different social media functions and system layers</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};