import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { PlatformComparison } from './PlatformComparison';

export const BackgroundSection: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400">2. Background and Related Work</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-4">2.1 Blockchain Technology Overview</h3>
          <p className="text-gray-300 leading-relaxed">
            Blockchain technology provides a decentralized, immutable ledger system that enables trustless transactions between parties. 
            The technology has found applications in various domains, including finance, supply chain management, and digital identity verification.
          </p>

          <h3 className="text-xl text-purple-400 mt-6">2.2 Hive Blockchain</h3>
          <p className="text-gray-300 leading-relaxed">
            The Hive blockchain is a delegated proof-of-stake (DPoS) blockchain specifically designed for web-scale applications. Key features include:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Fast transaction finality (3 seconds)</li>
            <li>Low transaction costs</li>
            <li>Built-in social features (posts, comments, voting)</li>
            <li>Token creation and management capabilities</li>
            <li>Decentralized governance</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">2.3 Decentralized Social Media Platforms</h3>
          <p className="text-gray-300 leading-relaxed">
            Several decentralized social media platforms have emerged, including:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Steemit (the predecessor to Hive-based platforms)</li>
            <li>Minds</li>
            <li>Mastodon</li>
            <li>Diaspora</li>
          </ul>

          <h3 className="text-xl text-purple-400 mt-6">2.4 Cryptocurrency Wallets</h3>
          <p className="text-gray-300 leading-relaxed">
            Cryptocurrency wallets are essential components of blockchain ecosystems, providing users with the ability to store, send, and receive digital assets. 
            Wallets can be categorized as:
          </p>
          <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
            <li>Hot wallets (connected to the internet)</li>
            <li>Cold wallets (offline storage)</li>
            <li>Custodial wallets (third-party managed)</li>
            <li>Non-custodial wallets (user-controlled)</li>
          </ul>
          
          <PlatformComparison />
        </CardContent>
      </Card>
    </section>
  );
};