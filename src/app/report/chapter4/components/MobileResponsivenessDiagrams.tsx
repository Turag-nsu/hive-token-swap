import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const MobileResponsivenessDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.11 Mobile Responsiveness Visualization Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that illustrate the mobile responsiveness and cross-platform compatibility of the Hive Token Swap Platform. 
            These diagrams provide a visual representation of responsive design strategies, device compatibility, and mobile-specific optimizations.
          </p>

          {/* Responsive Design Breakpoints Diagram */}
          <h4 className="text-lg text-cyan-400 mt-6">4.11.1 Responsive Design Breakpoints Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Mobile View */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Mobile (≤640px)</h5>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3">
                  <div className="w-32 h-48 mx-auto bg-gray-700 rounded border-2 border-gray-600 relative">
                    <div className="absolute top-2 left-2 right-2 h-4 bg-gray-600 rounded"></div>
                    <div className="absolute top-8 left-2 right-2 h-2 bg-gray-600 rounded"></div>
                    <div className="absolute top-12 left-2 right-2 h-20 bg-gray-600 rounded"></div>
                    <div className="absolute bottom-2 left-2 right-2 h-8 bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="mt-3 text-center text-gray-400 text-sm">
                  Single column layout<br/>
                  Touch-optimized elements
                </div>
              </div>
              
              {/* Tablet View */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Tablet (641px-1024px)</h5>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3">
                  <div className="w-40 h-56 mx-auto bg-gray-700 rounded border-2 border-gray-600 relative">
                    <div className="absolute top-2 left-2 right-2 h-4 bg-gray-600 rounded"></div>
                    <div className="absolute top-8 left-2 right-2 h-2 bg-gray-600 rounded"></div>
                    <div className="absolute top-12 left-2 w-24 h-20 bg-gray-600 rounded"></div>
                    <div className="absolute top-12 right-2 w-12 h-20 bg-gray-600 rounded"></div>
                    <div className="absolute bottom-2 left-2 right-2 h-8 bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="mt-3 text-center text-gray-400 text-sm">
                  Two-column layout<br/>
                  Adaptive components
                </div>
              </div>
              
              {/* Laptop View */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-bold mb-3 text-center">Laptop (1025px-1280px)</h5>
                <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-3">
                  <div className="w-48 h-32 mx-auto bg-gray-700 rounded border-2 border-gray-600 relative">
                    <div className="absolute top-2 left-2 right-2 h-3 bg-gray-600 rounded"></div>
                    <div className="absolute top-7 left-2 right-2 h-1 bg-gray-600 rounded"></div>
                    <div className="absolute top-10 left-2 w-16 h-16 bg-gray-600 rounded"></div>
                    <div className="absolute top-10 left-20 w-28 h-16 bg-gray-600 rounded"></div>
                    <div className="absolute bottom-2 left-2 right-2 h-6 bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="mt-3 text-center text-gray-400 text-sm">
                  Multi-column layout<br/>
                  Expanded content areas
                </div>
              </div>
              
              {/* Desktop View */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Desktop (>1280px)</h5>
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3">
                  <div className="w-56 h-36 mx-auto bg-gray-700 rounded border-2 border-gray-600 relative">
                    <div className="absolute top-2 left-2 right-2 h-3 bg-gray-600 rounded"></div>
                    <div className="absolute top-7 left-2 right-2 h-1 bg-gray-600 rounded"></div>
                    <div className="absolute top-10 left-2 w-20 h-20 bg-gray-600 rounded"></div>
                    <div className="absolute top-10 left-24 w-32 h-20 bg-gray-600 rounded"></div>
                    <div className="absolute bottom-2 left-2 right-2 h-6 bg-gray-600 rounded"></div>
                  </div>
                </div>
                <div className="mt-3 text-center text-gray-400 text-sm">
                  Full-width layout<br/>
                  Maximum content display
                </div>
              </div>
            </div>
            
            {/* Breakpoint Visualization */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-cyan-400 font-bold mb-3 text-center">Breakpoint Visualization</h5>
              <div className="flex items-center justify-between h-12 mt-4">
                <div className="flex items-center">
                  <div className="w-16 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded"></div>
                  <span className="text-gray-400 text-xs ml-1">0-640px</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded"></div>
                  <span className="text-gray-400 text-xs ml-1">641-1024px</span>
                </div>
                <div className="flex items-center">
                  <div className="w-20 h-8 bg-gradient-to-r from-yellow-500 to-amber-600 rounded"></div>
                  <span className="text-gray-400 text-xs ml-1">1025-1280px</span>
                </div>
                <div className="flex items-center">
                  <div className="w-28 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded"></div>
                  <span className="text-gray-400 text-xs ml-1">1281px+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Touch Interface Optimization Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.11.2 Touch Interface Optimization Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Touch Targets */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Touch Target Sizes</h5>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">44px</span>
                    </div>
                    <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-red-500 rounded-lg"></div>
                  </div>
                  <div className="text-center text-gray-400 text-sm">
                    Minimum recommended<br/>touch target size
                  </div>
                </div>
              </div>
              
              {/* Gesture Support */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Gesture Support</h5>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg"></div>
                    <div className="absolute top-4 left-4 right-4 h-2 bg-white/30 rounded"></div>
                    <div className="absolute top-8 left-4 right-4 h-2 bg-white/30 rounded"></div>
                    <div className="absolute top-12 left-4 right-4 h-2 bg-white/30 rounded"></div>
                    <div className="absolute bottom-4 left-4 right-4 h-6 bg-white/50 rounded flex items-center justify-center">
                      <span className="text-white text-xs">Swipe</span>
                    </div>
                  </div>
                  <div className="text-center text-gray-400 text-sm">
                    Swipe gestures for<br/>navigation and interaction
                  </div>
                </div>
              </div>
              
              {/* Feedback System */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Feedback System</h5>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">Btn</span>
                    </div>
                    <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-yellow-500 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="text-center text-gray-400 text-sm">
                    Visual and haptic<br/>feedback on touch
                  </div>
                </div>
              </div>
            </div>
            
            {/* Touch Interface Flow */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-amber-400 font-bold mb-3 text-center">Touch Interaction Flow</h5>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-3">
                  <span className="text-white font-bold">Touch</span>
                </div>
                <div className="text-amber-400 font-bold">→</div>
                <div className="bg-gradient-to-r from-yellow-500 to-lime-600 rounded-lg p-3">
                  <span className="text-white font-bold">Feedback</span>
                </div>
                <div className="text-yellow-400 font-bold">→</div>
                <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-lg p-3">
                  <span className="text-white font-bold">Action</span>
                </div>
                <div className="text-lime-400 font-bold">→</div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3">
                  <span className="text-white font-bold">Result</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-Platform Compatibility Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.11.3 Cross-Platform Compatibility Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Operating Systems */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Operating Systems</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Windows</span>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">macOS</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Linux</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">iOS</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-lime-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Android</span>
                  </div>
                  <div className="bg-gradient-to-r from-lime-500 to-yellow-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Web</span>
                  </div>
                </div>
              </div>
              
              {/* Browsers */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Browser Support</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Chrome</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Firefox</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Safari</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Edge</span>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Opera</span>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-500 to-lime-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Brave</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Compatibility Matrix */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-green-400 font-bold mb-3 text-center">Compatibility Matrix</h5>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                  <span className="text-white text-xs">Full Support</span>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-2 text-center">
                  <span className="text-white text-xs">Partial Support</span>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-2 text-center">
                  <span className="text-white text-xs">Planned</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-Specific Features Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.11.4 Mobile-Specific Features Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Orientation Handling */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-2 text-center text-sm">Orientation Handling</h5>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-12 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded border-2 border-gray-600"></div>
                    <div className="absolute -right-8 top-8 w-20 h-12 bg-gradient-to-r from-cyan-500 to-teal-600 rounded border-2 border-gray-600 transform -rotate-90"></div>
                  </div>
                </div>
                <div className="text-center text-gray-400 text-xs mt-2">
                  Portrait ↔ Landscape
                </div>
              </div>
              
              {/* Network Awareness */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-2 text-center text-sm">Network Awareness</h5>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-gray-400 text-xs mt-2">
                  Online/Offline Detection
                </div>
              </div>
              
              {/* Device API Integration */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-2 text-center text-sm">Device API Integration</h5>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-gray-400 text-xs mt-2">
                  Camera, Sensors, etc.
                </div>
              </div>
              
              {/* PWA Capabilities */}
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600">
                <h5 className="text-amber-400 font-bold mb-2 text-center text-sm">PWA Capabilities</h5>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
                      <div className="text-2xl">📱</div>
                    </div>
                  </div>
                </div>
                <div className="text-center text-gray-400 text-xs mt-2">
                  Installable App
                </div>
              </div>
            </div>
            
            {/* Feature Integration Flow */}
            <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
              <h5 className="text-cyan-400 font-bold mb-2 text-center text-sm">Feature Integration Flow</h5>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-1">
                  <span className="text-white text-xs">Detect</span>
                </div>
                <div className="text-cyan-400 text-xs">→</div>
                <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-1">
                  <span className="text-white text-xs">Adapt</span>
                </div>
                <div className="text-teal-400 text-xs">→</div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-1">
                  <span className="text-white text-xs">Enhance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Optimization Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">4.11.5 Performance Optimization for Mobile</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bundle Optimization */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-red-400 font-bold mb-3 text-center">Bundle Optimization</h5>
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 rounded-full"></div>
                    <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white font-bold">847KB</div>
                        <div className="text-red-300 text-xs">Compressed</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-gray-400 text-sm mt-3">
                    Code splitting and<br/>lazy loading
                  </div>
                </div>
              </div>
              
              {/* Resource Prioritization */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-bold mb-3 text-center">Resource Prioritization</h5>
                <div className="space-y-2">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-2">
                    <div className="flex justify-between">
                      <span className="text-white font-bold text-sm">Critical</span>
                      <span className="text-white text-xs">High Priority</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded p-2">
                    <div className="flex justify-between">
                      <span className="text-white font-bold text-sm">Important</span>
                      <span className="text-white text-xs">Medium Priority</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded p-2">
                    <div className="flex justify-between">
                      <span className="text-white font-bold text-sm">Deferred</span>
                      <span className="text-white text-xs">Low Priority</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Image Optimization */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-green-400 font-bold mb-3 text-center">Image Optimization</h5>
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">IMG</span>
                    </div>
                    <div className="absolute -top-1 -left-1 -right-1 -bottom-1 border-2 border-dashed border-green-400 rounded-lg"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-1 mt-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    <div className="w-4 h-4 bg-teal-500 rounded"></div>
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                    <div className="w-4 h-4 bg-emerald-600 rounded"></div>
                    <div className="w-4 h-4 bg-teal-600 rounded"></div>
                  </div>
                  <div className="text-center text-gray-400 text-sm mt-2">
                    Automatic compression<br/>and format selection
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance Metrics */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-blue-400 font-bold mb-3 text-center">Mobile Performance Metrics</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2 text-center">
                  <div className="text-white font-bold">420ms</div>
                  <div className="text-blue-200 text-xs">Load Time</div>
                </div>
                <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-2 text-center">
                  <div className="text-white font-bold">680ms</div>
                  <div className="text-cyan-200 text-xs">Interactive</div>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-2 text-center">
                  <div className="text-white font-bold">310ms</div>
                  <div className="text-teal-200 text-xs">First Paint</div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                  <div className="text-white font-bold">45MB</div>
                  <div className="text-green-200 text-xs">Memory</div>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.11.6 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different mobile features and compatibility categories</li>
              <li><strong>Device Mockups</strong>: Visual representations of different screen sizes</li>
              <li><strong>Flow Arrows</strong>: Process flows and interaction directions</li>
              <li><strong>Performance Metrics</strong>: Key performance indicators for mobile</li>
              <li><strong>Color Coding</strong>: Different mobile features and system components</li>
              <li><strong>Blue Series</strong>: Responsive design and breakpoints</li>
              <li><strong>Green Series</strong>: Performance optimization and success metrics</li>
              <li><strong>Purple Series</strong>: Touch interface and interaction features</li>
              <li><strong>Red/Orange Series</strong>: Resource management and prioritization</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};