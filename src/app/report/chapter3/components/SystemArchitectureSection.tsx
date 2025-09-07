import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArchitectureDiagrams } from './ArchitectureDiagrams';
import { UserWorkflows } from './UserWorkflows';
import { SequenceDiagrams } from './SequenceDiagrams';

export const SystemArchitectureSection: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">3. System Architecture</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-4">3.1 Overview</h3>
          <p className="text-gray-300 leading-relaxed">
            The Hive Token Swap Platform follows a client-server architecture with blockchain integration. 
            The system consists of several key components:
          </p>

          <h3 className="text-xl text-purple-400 mt-6">3.2 Frontend Layer</h3>
          <p className="text-gray-300 leading-relaxed">
            The frontend is built using React with Next.js, providing a responsive and interactive user interface. Key features include:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Social feed with content browsing and interaction</li>
            <li>Wallet management dashboard</li>
            <li>Transaction history viewer</li>
            <li>User profile management</li>
            <li>Content creation tools</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">3.3 Backend Layer</h3>
          <p className="text-gray-300 leading-relaxed">
            The backend consists of:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Next.js API routes for server-side processing</li>
            <li>Hive blockchain API integration</li>
            <li>Data caching and optimization mechanisms</li>
            <li>Security middleware for authentication and authorization</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">3.4 Blockchain Layer</h3>
          <p className="text-gray-300 leading-relaxed">
            The core of the system is the Hive blockchain, which provides:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Content storage and retrieval</li>
            <li>User authentication and identity management</li>
            <li>Token transfer and management</li>
            <li>Smart contract execution (through custom JSON operations)</li>
          </ul>
        </CardContent>
      </Card>
      <ArchitectureDiagrams />
      <UserWorkflows />
      <SequenceDiagrams />
    </section>
  );
};