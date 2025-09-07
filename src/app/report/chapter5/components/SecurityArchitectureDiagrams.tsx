import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const SecurityArchitectureDiagrams: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">5.5 Security Architecture Visualization Diagrams</h3>
          <p className="text-gray-300 leading-relaxed">
            This section presents detailed diagrams that illustrate the security architecture of the Hive Token Swap Platform. 
            These diagrams provide a visual representation of the threat models, security layers, and protection mechanisms.
          </p>

          {/* STRIDE Threat Model Diagram */}
          <h4 className="text-lg text-cyan-400 mt-6">5.5.1 STRIDE Threat Model Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Spoofing & Tampering */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-red-400 font-bold mb-3 text-center">Identity Threats</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Spoofing</span>
                    <p className="text-red-200 text-xs mt-1">Impersonation</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Tampering</span>
                    <p className="text-orange-200 text-xs mt-1">Data Modification</p>
                  </div>
                </div>
              </div>
              
              {/* Repudiation & Information Disclosure */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-yellow-400 font-bold mb-3 text-center">Integrity Threats</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Repudiation</span>
                    <p className="text-yellow-200 text-xs mt-1">Action Denial</p>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-green-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Information Disclosure</span>
                    <p className="text-amber-200 text-xs mt-1">Data Exposure</p>
                  </div>
                </div>
              </div>
              
              {/* DoS & Elevation of Privilege */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-blue-400 font-bold mb-3 text-center">Access Threats</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Denial of Service</span>
                    <p className="text-blue-200 text-xs mt-1">Service Disruption</p>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Elevation of Privilege</span>
                    <p className="text-cyan-200 text-xs mt-1">Unauthorized Access</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mitigation Strategies */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-green-400 font-bold mb-3 text-center">Mitigation Strategies</h5>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                  <span className="text-white text-xs">Cryptography</span>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-2 text-center">
                  <span className="text-white text-xs">Authentication</span>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-2 text-center">
                  <span className="text-white text-xs">Authorization</span>
                </div>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded p-2 text-center">
                  <span className="text-white text-xs">Encryption</span>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded p-2 text-center">
                  <span className="text-white text-xs">Validation</span>
                </div>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded p-2 text-center">
                  <span className="text-white text-xs">Monitoring</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security Layers Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">5.5.2 Security Layers Architecture Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Outer Layer - Network Security */}
              <div className="border-2 border-red-500 rounded-xl p-6 mb-6">
                <h5 className="text-red-400 font-bold mb-3 text-center">Network Security Layer</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">HTTPS</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Firewall</span>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded p-3 text-center">
                    <span className="text-white font-bold">DDoS Protection</span>
                  </div>
                </div>
              </div>
              
              {/* Middle Layer - Application Security */}
              <div className="border-2 border-yellow-500 rounded-xl p-6 mb-6">
                <h5 className="text-yellow-400 font-bold mb-3 text-center">Application Security Layer</h5>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Input Validation</span>
                  </div>
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">CSP</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Rate Limiting</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Error Handling</span>
                  </div>
                </div>
              </div>
              
              {/* Inner Layer - Data Security */}
              <div className="border-2 border-green-500 rounded-xl p-6">
                <h5 className="text-green-400 font-bold mb-3 text-center">Data Security Layer</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Encryption</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Access Control</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Audit Logging</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Zero-Knowledge Architecture Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">5.5.3 Zero-Knowledge Architecture Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative">
              {/* User Device */}
              <div className="mb-8">
                <h5 className="text-blue-400 font-bold text-center mb-4">User Device (Trusted Environment)</h5>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center w-40">
                    <span className="text-white font-bold">Private Keys</span>
                  </div>
                  <div className="text-blue-400 font-bold">⇄</div>
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg p-4 text-center w-40">
                    <span className="text-white font-bold">Hive Keychain</span>
                  </div>
                  <div className="text-cyan-400 font-bold">⇄</div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded-lg p-4 text-center w-40">
                    <span className="text-white font-bold">Transaction Signing</span>
                  </div>
                </div>
              </div>
              
              {/* Platform Boundary */}
              <div className="border-t-2 border-dashed border-gray-500 my-8 pt-8">
                <h5 className="text-gray-400 font-bold text-center mb-4">Platform Boundary (Untrusted Environment)</h5>
                
                {/* Platform Components */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-3 text-center">
                    <span className="text-white font-bold">Frontend UI</span>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-3 text-center">
                    <span className="text-white font-bold">Business Logic</span>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-3 text-center">
                    <span className="text-white font-bold">API Layer</span>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-3 text-center">
                    <span className="text-white font-bold">Data Processing</span>
                  </div>
                </div>
                
                {/* Blockchain Interface */}
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-lg p-4 text-center w-40">
                    <span className="text-white font-bold">Signed Transactions</span>
                  </div>
                  <div className="text-amber-400 font-bold">→</div>
                  <div className="bg-gradient-to-r from-yellow-500 to-lime-600 rounded-lg p-4 text-center w-40">
                    <span className="text-white font-bold">Hive Blockchain</span>
                  </div>
                </div>
              </div>
              
              {/* Security Guarantees */}
              <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
                <h5 className="text-green-400 font-bold mb-3 text-center">Security Guarantees</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                    <span className="text-white text-sm">Private Keys Never Exposed</span>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded p-2 text-center">
                    <span className="text-white text-sm">No Server-Side Storage</span>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded p-2 text-center">
                    <span className="text-white text-sm">End-to-End Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptographic Security Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">5.5.4 Cryptographic Security Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Management */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-purple-400 font-bold mb-3 text-center">Key Management</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded p-3 text-center">
                    <span className="text-white font-bold">User Device</span>
                    <p className="text-purple-200 text-xs mt-1">Private Key Storage</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-purple-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Hive Keychain</span>
                    <p className="text-pink-200 text-xs mt-1">Key Management</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-pink-400 font-bold">↓</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Transaction Signing</span>
                    <p className="text-red-200 text-xs mt-1">Cryptographic Operations</p>
                  </div>
                </div>
              </div>
              
              {/* Data Protection */}
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                <h5 className="text-cyan-400 font-bold mb-3 text-center">Data Protection</h5>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Data at Rest</span>
                    <p className="text-cyan-200 text-xs mt-1">Encryption</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-cyan-400 font-bold">⇄</div>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Data in Transit</span>
                    <p className="text-teal-200 text-xs mt-1">HTTPS/TLS</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-teal-400 font-bold">⇄</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-3 text-center">
                    <span className="text-white font-bold">Data in Use</span>
                    <p className="text-green-200 text-xs mt-1">Secure Processing</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cryptographic Algorithms */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg">
              <h5 className="text-blue-400 font-bold mb-3 text-center">Cryptographic Algorithms</h5>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded p-2 text-center">
                  <span className="text-white text-xs">ECDSA</span>
                </div>
                <div className="bg-gradient-to-r from-cyan-500 to-teal-600 rounded p-2 text-center">
                  <span className="text-white text-xs">SHA-256</span>
                </div>
                <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded p-2 text-center">
                  <span className="text-white text-xs">AES-256</span>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded p-2 text-center">
                  <span className="text-white text-xs">TLS 1.3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attack Surface Diagram */}
          <h4 className="text-lg text-cyan-400 mt-8">5.5.5 Attack Surface Diagram</h4>
          <div className="mt-4 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <div className="relative bg-gray-800 rounded-lg p-6 overflow-hidden">
              {/* Central Platform */}
              <div className="flex justify-center mb-10">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-center">Hive Token<br/>Swap Platform</span>
                </div>
              </div>
              
              {/* Attack Vectors */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Frontend UI</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-orange-400 font-bold">←</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">API Layer</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-yellow-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-amber-400 font-bold">←</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Wallet Integration</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-teal-500 to-green-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-teal-400 font-bold">←</div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-4 text-center shadow-lg w-full">
                    <h5 className="text-white font-bold">Blockchain</h5>
                  </div>
                  <div className="relative mt-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-blue-500 mx-auto"></div>
                    <div className="absolute top-2 -right-3 text-cyan-400 font-bold">←</div>
                  </div>
                </div>
              </div>
              
              {/* Protection Mechanisms */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Input Validation</h5>
                </div>
                
                <div className="bg-gradient-to-r from-pink-500 to-red-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Rate Limiting</h5>
                </div>
                
                <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Zero-Knowledge</h5>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg p-3 text-center">
                  <h5 className="text-white font-bold">Transaction Verification</h5>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">5.5.6 Diagram Legend</h4>
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
              <li><strong>Gradient Boxes</strong>: Different security components and threat categories</li>
              <li><strong>Arrows (→, ↓, ←, ⇄)</strong>: Data flow and attack vector directions</li>
              <li><strong>Central Hubs</strong>: Core platform components</li>
              <li><strong>Layered Architecture</strong>: Different security layers of the system</li>
              <li><strong>Color Coding</strong>: Different security functions and threat types</li>
              <li><strong>Red Series</strong>: High-risk threats and network security</li>
              <li><strong>Yellow Series</strong>: Medium-risk threats and application security</li>
              <li><strong>Green/Blue Series</strong>: Protection mechanisms and data security</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};