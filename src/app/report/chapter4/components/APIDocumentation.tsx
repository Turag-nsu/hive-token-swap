import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

export const APIDocumentation: React.FC = () => {
  return (
    <section className="mb-12">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="prose prose-invert max-w-none">
          <h3 className="text-xl text-purple-400 mt-6">4.9 Detailed API Documentation</h3>
          <p className="text-gray-300 leading-relaxed">
            This section provides comprehensive documentation for the key API endpoints used by the Hive Token Swap Platform. 
            The documentation includes endpoint descriptions, request parameters, response formats, and example usage.
          </p>

          <h4 className="text-lg text-cyan-400 mt-4">4.9.1 Hive Blockchain API Endpoints</h4>
          
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">GET /accounts</h5>
            <p className="text-gray-300 mt-2">Retrieves detailed account information including balances and metadata.</p>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Request Parameters:</h6>
              <ul className="text-gray-300 text-sm list-disc list-inside mt-1 space-y-1">
                <li><code className="bg-gray-800 px-1 rounded">account_names</code> (array, required): Array of account names to retrieve</li>
              </ul>
            </div>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Response Format:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "accounts": [
    {
      "id": 123456,
      "name": "example_user",
      "balance": "100.000 HIVE",
      "hbd_balance": "50.000 HBD",
      "savings_balance": "10.000 HIVE",
      "savings_hbd_balance": "5.000 HBD",
      "vesting_shares": "1000.000000 VESTS",
      "reputation": 25,
      "created": "2020-01-01T00:00:00",
      "last_account_update": "2023-01-01T00:00:00",
      "last_vote_time": "2023-01-01T00:00:00"
    }
  ]
}`}
              </pre>
            </div>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Example Usage:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`const response = await fetch('/api/accounts?account_names=["example_user"]');
const data = await response.json();`}
              </pre>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">GET /account_history</h5>
            <p className="text-gray-300 mt-2">Fetches transaction history for specific accounts.</p>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Request Parameters:</h6>
              <ul className="text-gray-300 text-sm list-disc list-inside mt-1 space-y-1">
                <li><code className="bg-gray-800 px-1 rounded">account_name</code> (string, required): Account name to retrieve history for</li>
                <li><code className="bg-gray-800 px-1 rounded">from</code> (integer, optional): Starting sequence number</li>
                <li><code className="bg-gray-800 px-1 rounded">limit</code> (integer, optional): Number of operations to retrieve (default: 100, max: 1000)</li>
              </ul>
            </div>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Response Format:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "history": [
    {
      "trx_id": "abc123...",
      "block": 12345678,
      "trx_in_block": 0,
      "op_in_trx": 0,
      "operation": {
        "type": "transfer_operation",
        "value": {
          "from": "sender",
          "to": "recipient",
          "amount": "10.000 HIVE",
          "memo": "Payment for services"
        }
      },
      "timestamp": "2023-01-01T12:00:00"
    }
  ]
}`}
              </pre>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">POST /broadcast_transaction</h5>
            <p className="text-gray-300 mt-2">Submits signed transactions to the blockchain.</p>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Request Body:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "trx": {
    "ref_block_num": 12345,
    "ref_block_prefix": 67890,
    "expiration": "2023-01-01T12:30:00",
    "operations": [
      [
        "transfer",
        {
          "from": "sender",
          "to": "recipient",
          "amount": "10.000 HIVE",
          "memo": "Payment"
        }
      ]
    ],
    "extensions": [],
    "signatures": ["SIG_K1_..."]
  }
}`}
              </pre>
            </div>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Response Format:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "id": "abc123...",
  "block_num": 12345678,
  "trx_num": 0,
  "expired": false
}`}
              </pre>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.9.2 Hive Engine API Endpoints</h4>
          
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">POST /hive-engine/contracts</h5>
            <p className="text-gray-300 mt-2">Interacts with Hive Engine smart contracts for token operations.</p>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Request Body:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "contractName": "tokens",
  "contractAction": "transfer",
  "contractPayload": {
    "symbol": "SWAP.HIVE",
    "to": "recipient",
    "quantity": "100.00000000",
    "memo": "Token swap"
  }
}`}
              </pre>
            </div>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Response Format:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "success": true,
  "result": {
    "id": "abc123...",
    "blockNumber": 12345678,
    "timestamp": "2023-01-01T12:00:00",
    "payload": {
      "contractName": "tokens",
      "contractAction": "transfer",
      "contractPayload": {
        "symbol": "SWAP.HIVE",
        "to": "recipient",
        "quantity": "100.00000000",
        "memo": "Token swap"
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">GET /hive-engine/tokens</h5>
            <p className="text-gray-300 mt-2">Retrieves token information and market data from Hive Engine.</p>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Request Parameters:</h6>
              <ul className="text-gray-300 text-sm list-disc list-inside mt-1 space-y-1">
                <li><code className="bg-gray-800 px-1 rounded">symbol</code> (string, optional): Specific token symbol to retrieve</li>
                <li><code className="bg-gray-800 px-1 rounded">limit</code> (integer, optional): Number of tokens to retrieve (default: 100)</li>
              </ul>
            </div>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Response Format:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "tokens": [
    {
      "symbol": "SWAP.HIVE",
      "name": "Hive Swap Token",
      "precision": 8,
      "issuer": "hive.swap",
      "maxSupply": "1000000000.00000000",
      "supply": "500000000.00000000",
      "circulatingSupply": "450000000.00000000",
      "staked": "50000000.00000000",
      "delegated": "0.00000000",
      "metadata": {
        "desc": "Token for swapping HIVE on the Hive blockchain",
        "icon": "https://example.com/icon.png",
        "url": "https://hive-swap.com"
      }
    }
  ]
}`}
              </pre>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.9.3 Platform API Endpoints</h4>
          
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">GET /api/feed</h5>
            <p className="text-gray-300 mt-2">Retrieves the social feed with content and interactions.</p>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Request Parameters:</h6>
              <ul className="text-gray-300 text-sm list-disc list-inside mt-1 space-y-1">
                <li><code className="bg-gray-800 px-1 rounded">limit</code> (integer, optional): Number of posts to retrieve (default: 20)</li>
                <li><code className="bg-gray-800 px-1 rounded">offset</code> (integer, optional): Offset for pagination</li>
                <li><code className="bg-gray-800 px-1 rounded">tag</code> (string, optional): Filter posts by specific tag</li>
              </ul>
            </div>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Response Format:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "posts": [
    {
      "id": "123456789",
      "author": "example_user",
      "permlink": "example-post",
      "title": "Example Post Title",
      "body": "This is the content of the post...",
      "created": "2023-01-01T12:00:00",
      "tags": ["example", "test"],
      "payout": "5.000 HBD",
      "pending_payout_value": "2.500 HBD",
      "total_payout_value": "7.500 HBD",
      "curator_payout_value": "0.750 HBD",
      "net_votes": 15,
      "upvotes": 20,
      "downvotes": 5,
      "replies": 3,
      "json_metadata": {
        "tags": ["example", "test"],
        "app": "hive-token-swap/1.0"
      }
    }
  ],
  "hasMore": true
}`}
              </pre>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h5 className="text-md font-semibold text-blue-400">POST /api/swap</h5>
            <p className="text-gray-300 mt-2">Initiates a token swap operation.</p>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Request Body:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "fromToken": "HIVE",
  "toToken": "SWAP.HIVE",
  "amount": "100.000",
  "account": "example_user"
}`}
              </pre>
            </div>
            
            <div className="mt-3">
              <h6 className="text-sm font-semibold text-gray-400">Response Format:</h6>
              <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "success": true,
  "transactionId": "abc123...",
  "fromAmount": "100.000 HIVE",
  "toAmount": "100.00000000 SWAP.HIVE",
  "fee": "1.000 HIVE",
  "timestamp": "2023-01-01T12:00:00"
}`}
              </pre>
            </div>
          </div>

          <h4 className="text-lg text-cyan-400 mt-6">4.9.4 Error Responses</h4>
          <p className="text-gray-300 leading-relaxed">
            All API endpoints return standardized error responses in case of failures:
          </p>
          
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <h6 className="text-sm font-semibold text-gray-400">Error Response Format:</h6>
            <pre className="bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
{`{
  "error": {
    "code": 400,
    "message": "Bad Request",
    "details": "Invalid account name provided"
  }
}`}
            </pre>
          </div>
          
          <div className="mt-4">
            <h6 className="text-sm font-semibold text-gray-400">Common Error Codes:</h6>
            <ul className="text-gray-300 text-sm list-disc list-inside mt-2 space-y-1">
              <li><code className="bg-gray-800 px-1 rounded">400</code> - Bad Request: Invalid parameters or malformed request</li>
              <li><code className="bg-gray-800 px-1 rounded">401</code> - Unauthorized: Authentication required or failed</li>
              <li><code className="bg-gray-800 px-1 rounded">403</code> - Forbidden: Insufficient permissions for the requested operation</li>
              <li><code className="bg-gray-800 px-1 rounded">404</code> - Not Found: Requested resource does not exist</li>
              <li><code className="bg-gray-800 px-1 rounded">429</code> - Too Many Requests: Rate limit exceeded</li>
              <li><code className="bg-gray-800 px-1 rounded">500</code> - Internal Server Error: Unexpected server error</li>
              <li><code className="bg-gray-800 px-1 rounded">503</code> - Service Unavailable: Temporary service outage</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};