import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const IntroductionSection: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">1. Introduction</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-4">1.1 Problem Statement</h3>
          <p className="text-gray-300 leading-relaxed">
            Traditional social media platforms face several critical challenges:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Centralized control leading to potential censorship</li>
            <li>Monetization of user data without direct compensation to users</li>
            <li>Lack of true ownership of user-generated content</li>
            <li>Limited financial incentives for content creators</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">1.2 Objectives</h3>
          <p className="text-gray-300 leading-relaxed">
            This project aims to:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Develop a fully functional decentralized social media platform on the Hive blockchain</li>
            <li>Implement a secure wallet management system for cryptocurrency transactions</li>
            <li>Create an intuitive user interface that bridges the gap between blockchain technology and mainstream users</li>
            <li>Enable token swap functionality for various Hive ecosystem tokens</li>
            <li>Provide real-time transaction history and analytics</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">1.3 Contributions</h3>
          <p className="text-gray-300 leading-relaxed">
            The contributions of this work include:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>A comprehensive implementation of a blockchain-based social media platform</li>
            <li>Integration of wallet functionality with social features</li>
            <li>Real-time transaction history tracking with advanced filtering capabilities</li>
            <li>User-friendly interface design that abstracts blockchain complexity</li>
            <li>Documentation of best practices for decentralized application development</li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};