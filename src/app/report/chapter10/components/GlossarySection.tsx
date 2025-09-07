import React from 'react';

export const GlossarySection: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl text-blue-400 mb-4">10.2 Glossary of Technical Terms and Acronyms</h2>
        <p className="text-gray-300 leading-relaxed">
          This glossary provides definitions for technical terms and acronyms used throughout this document to ensure clarity and understanding.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">API</h3>
            <p className="text-gray-300">Application Programming Interface - A set of rules and protocols for building and interacting with software applications.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">APM</h3>
            <p className="text-gray-300">Application Performance Monitoring - Tools and practices for monitoring and managing application performance and availability.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">CI/CD</h3>
            <p className="text-gray-300">Continuous Integration/Continuous Deployment - Practices for automating the integration and deployment of code changes.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">DAO</h3>
            <p className="text-gray-300">Decentralized Autonomous Organization - An organization represented by rules encoded as a computer program that is transparent and controlled by stakeholders.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">dApp</h3>
            <p className="text-gray-300">Decentralized Application - An application that runs on a blockchain network rather than a centralized server.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">ERC-20</h3>
            <p className="text-gray-300">Ethereum Request for Comment 20 - A technical standard for smart contracts on the Ethereum blockchain for implementing tokens.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">Gas</h3>
            <p className="text-gray-300">A unit of computational effort required to execute operations on the Ethereum network, paid for in Ether.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">HBD</h3>
            <p className="text-gray-300">Hive Backed Dollar - A stablecoin pegged to the US Dollar on the Hive blockchain.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">Hive</h3>
            <p className="text-gray-300">A decentralized blockchain and social media platform that rewards content creators and users.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">Hive Engine</h3>
            <p className="text-gray-300">A smart contracts side-chain platform for the Hive blockchain that enables creation of custom tokens and decentralized applications.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">Hive Keychain</h3>
            <p className="text-gray-300">A browser extension wallet for the Hive blockchain that allows users to securely manage their keys and interact with Hive dApps.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">HiveSigner</h3>
            <p className="text-gray-300">An OAuth-based authentication service for the Hive blockchain that allows users to sign in to dApps without exposing their private keys.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">HIVE</h3>
            <p className="text-gray-300">The native cryptocurrency of the Hive blockchain used for transactions, staking, and governance.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">HP</h3>
            <p className="text-gray-300">Hive Power - Staked HIVE tokens that provide voting power and increased resource credits on the Hive blockchain.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">HTML</h3>
            <p className="text-gray-300">HyperText Markup Language - The standard markup language for documents designed to be displayed in a web browser.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">IPFS</h3>
            <p className="text-gray-300">InterPlanetary File System - A protocol and peer-to-peer network for storing and sharing data in a distributed file system.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">JSON</h3>
            <p className="text-gray-300">JavaScript Object Notation - A lightweight data-interchange format that is easy for humans to read and write.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">KYC</h3>
            <p className="text-gray-300">Know Your Customer - The process of verifying the identity of customers for regulatory compliance.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">LP</h3>
            <p className="text-gray-300">Liquidity Provider - An entity that provides liquidity to a trading pair in a decentralized exchange.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">NFT</h3>
            <p className="text-gray-300">Non-Fungible Token - A unique digital asset that represents ownership of a specific item or piece of content.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">OAuth</h3>
            <p className="text-gray-300">Open Authorization - An open standard for access delegation commonly used for token-based authentication.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">PoS</h3>
            <p className="text-gray-300">Proof of Stake - A consensus mechanism where validators are chosen based on the number of tokens they hold and are willing to "stake".</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">PoW</h3>
            <p className="text-gray-300">Proof of Work - A consensus mechanism where validators must solve computational puzzles to validate transactions.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">RC</h3>
            <p className="text-gray-300">Resource Credits - A mechanism on the Hive blockchain that limits the number of operations a user can perform based on their stake.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">RPC</h3>
            <p className="text-gray-300">Remote Procedure Call - A protocol that allows one program to request a service from a program located in another computer.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">SDK</h3>
            <p className="text-gray-300">Software Development Kit - A collection of software development tools in one installable package.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">SHA-256</h3>
            <p className="text-gray-300">Secure Hash Algorithm 256-bit - A cryptographic hash function used in blockchain technology for security.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">SLA</h3>
            <p className="text-gray-300">Service Level Agreement - A commitment between a service provider and client regarding service quality and availability.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">SQL</h3>
            <p className="text-gray-300">Structured Query Language - A programming language designed for managing and manipulating relational databases.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">SSO</h3>
            <p className="text-gray-300">Single Sign-On - An authentication process that allows users to access multiple applications with one set of credentials.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">SVG</h3>
            <p className="text-gray-300">Scalable Vector Graphics - An XML-based vector image format for two-dimensional graphics.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">TTFB</h3>
            <p className="text-gray-300">Time to First Byte - A metric that measures the duration from the user making a request to the first byte of the page being received.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">UI</h3>
            <p className="text-gray-300">User Interface - The space where interactions between humans and machines occur.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">URL</h3>
            <p className="text-gray-300">Uniform Resource Locator - A reference to a web resource that specifies its location on a computer network.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">UX</h3>
            <p className="text-gray-300">User Experience - A person's emotions and attitudes about using a particular product, system, or service.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">WASM</h3>
            <p className="text-gray-300">WebAssembly - A binary instruction format for a stack-based virtual machine designed as a portable compilation target.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-semibold text-cyan-400">ZK-SNARK</h3>
            <p className="text-gray-300">Zero-Knowledge Succinct Non-Interactive Argument of Knowledge - A cryptographic proof that allows one party to prove possession of certain information without revealing that information.</p>
          </div>
        </div>
      </div>
    </section>
  );
};