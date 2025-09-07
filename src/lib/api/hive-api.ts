// src/lib/api/hive-api.ts
import { HiveAccount } from '@/types';

// Use the Next.js API route as a proxy for Hive API calls
const HIVE_PROXY_URL = '/api/hive-proxy';

// interface HiveRPCRequest {
//   jsonrpc: string;
//   method: string;
//   params: any;
//   id: number;
// }

interface HiveRPCResponse<T = any> {
  jsonrpc: string;
  result: T;
  id: number;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

// Cache for deduplicating requests
const requestCache = new Map<string, Promise<any>>();

// Generic RPC call function using the proxy with caching
export async function makeRPCCall<T>(method: string, params: any): Promise<T> {
  // Create a unique cache key for this request
  const cacheKey = `${method}-${JSON.stringify(params)}`;
  
  // Check if we already have a pending request for this key
  if (requestCache.has(cacheKey)) {
    console.log(`[HiveAPI] Returning cached request for ${method}`);
    return requestCache.get(cacheKey);
  }

  console.log(`[HiveAPI] Making new request for ${method}`, { method, params });

  try {
    // Create the promise for this request
    const requestPromise = (async () => {
      try {
        // Use fetch with proper context binding
        let response: Response;
        
        // Check if fetch is available (browser or Node.js with fetch support)
        if (typeof fetch !== 'undefined') {
          // Use the proxy endpoint
          response = await fetch(HIVE_PROXY_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ method, params }),
          });
        } else {
          // Server-side environment without fetch (like Jest tests)
          // In this case, we can't make the call, so we throw an error
          throw new Error('Fetch is not available in this environment. This function can only be used in browser or Next.js server environments.');
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`[HiveAPI] HTTP error for ${method}:`, response.status, errorText);
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data: HiveRPCResponse<T> = await response.json();
        console.log(`[HiveAPI] Response for ${method}:`, data);
        
        if (data.error) {
          console.error(`[HiveAPI] Hive API error for ${method}:`, data.error);
          throw new Error(`Hive API error: ${data.error.message}`);
        }

        return data.result;
      } catch (error) {
        console.error(`[HiveAPI] Error in requestPromise for ${method}:`, error);
        throw error;
      } finally {
        // Remove the request from cache when it's completed
        requestCache.delete(cacheKey);
        console.log(`[HiveAPI] Removed ${method} from cache`);
      }
    })();

    // Store the promise in cache
    requestCache.set(cacheKey, requestPromise);
    console.log(`[HiveAPI] Added ${method} to cache`);
    
    // Return the result
    return await requestPromise;
  } catch (error) {
    // Remove the request from cache on error
    requestCache.delete(cacheKey);
    console.error(`[HiveAPI] Error calling Hive API method ${method}:`, error);
    throw error;
  }
}

// Function to decrypt memo (simplified implementation)
export async function decryptMemo(memo: string, _privateKey: string): Promise<string> {
  // In a real implementation, this would use the Hive crypto library
  // to decrypt the memo using the private key
  // For now, we'll return a placeholder
  if (memo.startsWith('#')) {
    return '[Encrypted memo - requires private key to decrypt]';
  }
  return memo;
}

// Function to encrypt memo (simplified implementation)
export async function encryptMemo(memo: string, _publicKey: string): Promise<string> {
  // In a real implementation, this would use the Hive crypto library
  // to encrypt the memo using the recipient's public key
  // For now, we'll return a placeholder
  return `#${memo}`;
}

// Account-related API calls
export class HiveAccountAPI {
  /**
   * Get account information
   */
  static async getAccount(username: string): Promise<HiveAccount | null> {
    try {
      console.log(`[HiveAccountAPI] Fetching account for ${username}`);
      const accounts = await makeRPCCall<any[]>('condenser_api.get_accounts', [[username]]);
      console.log(`[HiveAccountAPI] Account data for ${username}:`, accounts);
      
      if (!accounts || accounts.length === 0) {
        console.log(`[HiveAccountAPI] No account found for ${username}`);
        return null;
      }

      const account = accounts[0];
      return {
        name: account.name,
        balance: account.balance,
        hbd_balance: account.hbd_balance,
        vesting_shares: account.vesting_shares,
        delegated_vesting_shares: account.delegated_vesting_shares,
        received_vesting_shares: account.received_vesting_shares,
      };
    } catch (error) {
      console.error('[HiveAccountAPI] Error fetching account:', error);
      throw error;
    }
  }

  /**
   * Get account history with operations
   */
  static async getAccountHistory(
    username: string,
    start: number = -1,
    limit: number = 100,
    operationFilter?: string[]
  ): Promise<any[]> {
    try {
      console.log(`[HiveAccountAPI] Fetching account history for ${username}`, { start, limit });
      const history = await makeRPCCall<any[]>('condenser_api.get_account_history', [
        username,
        start,
        limit
      ]);
      console.log(`[HiveAccountAPI] Account history for ${username}:`, history?.length);
      
      // Log the actual history data structure for debugging
      if (history && history.length > 0) {
        console.log(`[HiveAccountAPI] First history item for ${username}:`, history[0]);
      }

      if (!history) {
        console.log(`[HiveAccountAPI] No history found for ${username}`);
        return [];
      }

      // Filter operations if specified
      if (operationFilter && operationFilter.length > 0) {
        const filtered = history.filter(([, transaction]) => {
          const operationType = transaction.op[0];
          return operationFilter.includes(operationType);
        });
        console.log(`[HiveAccountAPI] Filtered history for ${username}:`, filtered?.length);
        return filtered;
      }

      return history;
    } catch (error) {
      console.error('[HiveAccountAPI] Error fetching account history:', error);
      throw error;
    }
  }

  /**
   * Get account balance details including liquid and staked tokens
   */
  static async getAccountBalances(username: string): Promise<{
    hive: string;
    hbd: string;
    hive_power: string;
    delegated_hp: string;
    received_hp: string;
  }> {
    try {
      console.log(`[HiveAccountAPI] Fetching account balances for ${username}`);
      const account = await this.getAccount(username);
      if (!account) {
        throw new Error('Account not found');
      }

      // Convert VESTS to Hive Power (approximate calculation)
      const vestingShares = parseFloat((account.vesting_shares || '0 VESTS').split(' ')[0] || '0') || 0;
      const delegatedVests = parseFloat((account.delegated_vesting_shares || '0 VESTS').split(' ')[0] || '0') || 0;
      const receivedVests = parseFloat((account.received_vesting_shares || '0 VESTS').split(' ')[0] || '0') || 0;

      // Get dynamic global properties for VESTS to HP conversion
      const globalProps = await makeRPCCall<any>('condenser_api.get_dynamic_global_properties', []);
      const totalVestingShares = parseFloat((globalProps.total_vesting_shares || '0 VESTS').split(' ')[0]) || 0;
      const totalVestingFund = parseFloat((globalProps.total_vesting_fund_hive || '0 HIVE').split(' ')[0]) || 0;
      
      const vestsToHp = (vests: number) => (vests * totalVestingFund) / totalVestingShares;

      const result = {
        hive: account.balance || '0.000 HIVE',
        hbd: account.hbd_balance || '0.000 HBD',
        hive_power: `${vestsToHp(vestingShares - delegatedVests + receivedVests).toFixed(3)} HP`,
        delegated_hp: `${vestsToHp(delegatedVests).toFixed(3)} HP`,
        received_hp: `${vestsToHp(receivedVests).toFixed(3)} HP`,
      };
      
      console.log(`[HiveAccountAPI] Account balances for ${username}:`, result);
      return result;
    } catch (error) {
      console.error('[HiveAccountAPI] Error fetching account balances:', error);
      throw error;
    }
  }
}

// Transaction history API calls
export class HiveTransactionAPI {
  /**
   * Get formatted transaction history for the UI
   */
  static async getTransactionHistory(
    username: string,
    limit: number = 50
  ): Promise<Array<{
    id: string;
    type: string;
    description: string;
    amount: string;
    currency: string;
    status: 'completed' | 'pending' | 'failed';
    timestamp: string;
    hash: string;
    from?: string;
    to?: string;
    tags?: string[];
    category?: string;
    usdValue?: number;
    memo?: string;
  }>> {
    try {
      console.log(`[HiveTransactionAPI] Fetching transaction history for ${username}`, { limit });
      const history = await HiveAccountAPI.getAccountHistory(username, -1, limit);
      console.log(`[HiveTransactionAPI] Raw history for ${username}:`, history?.length);
      
      // Check if we have any history data
      if (!history || history.length === 0) {
        console.log(`[HiveTransactionAPI] No transaction history found for ${username}`);
        return [];
      }
      
      // Log a sample of the history data for debugging
      console.log(`[HiveTransactionAPI] Sample history items for ${username}:`, history.slice(0, 3));
      
      const prices = await HiveMarketAPI.getPrices();
      console.log(`[HiveTransactionAPI] Market prices:`, prices);
      
      const result = history.map(([index, transaction]) => {
        try {
          // Log the transaction structure for debugging
          console.log(`[HiveTransactionAPI] Processing transaction ${index}:`, {
            hasOp: !!transaction.op,
            opType: Array.isArray(transaction.op) ? transaction.op[0] : 'unknown',
            opDataKeys: Array.isArray(transaction.op) && transaction.op[1] ? Object.keys(transaction.op[1]) : []
          });
          
          const [opType, opData] = transaction.op;
          const timestamp = new Date(transaction.timestamp + 'Z').toISOString();
          
          // Format different operation types
          switch (opType) {
            case 'transfer':
              const transferDirection = opData.from === username ? 'to' : 'from';
              const transferCounterparty = opData.from === username ? opData.to : opData.from;
              const transferAmount = opData.amount;
              const transferCurrency = opData.amount.split(' ')[1] || 'N/A';
              const hasMemo = opData.memo && opData.memo.trim() !== '';
              
              // Decrypt memo if it exists and is encrypted (starts with #)
              let decryptedMemo = opData.memo || '';
              if (hasMemo && opData.memo.startsWith('#')) {
                // In a real implementation, we would decrypt the memo here
                // For now, we'll just mark it as encrypted
                decryptedMemo = '[Encrypted memo - requires private key to decrypt]';
              }
              
              // Determine category and tags
              let transferTags = ['transfer'];
              let transferCategory = 'transfer';
              
              if (hasMemo) {
                transferTags.push('memo');
              }
              
              // Check if it's a payment for specific services
              if (decryptedMemo && decryptedMemo.toLowerCase().includes('swap')) {
                transferTags.push('swap');
                transferCategory = 'exchange';
              } else if (decryptedMemo && decryptedMemo.toLowerCase().includes('tip')) {
                transferTags.push('tip');
                transferCategory = 'tip';
              } else if (decryptedMemo && decryptedMemo.toLowerCase().includes('donation')) {
                transferTags.push('donation');
                transferCategory = 'donation';
              }
              
              // Calculate USD value
              let transferUsdValue = 0;
              if (transferAmount && transferCurrency) {
                const numericAmount = parseFloat(transferAmount.split(' ')[0]);
                if (!isNaN(numericAmount)) {
                  switch (transferCurrency.toUpperCase()) {
                    case 'HIVE':
                      transferUsdValue = numericAmount * prices.hive_usd;
                      break;
                    case 'HBD':
                      transferUsdValue = numericAmount * prices.hbd_usd;
                      break;
                  }
                }
              }
              
              return {
                id: `${index}`,
                type: 'transfer',
                description: `Transfer ${transferAmount} ${transferDirection} @${transferCounterparty}${hasMemo ? ' (has memo)' : ''}`,
                amount: transferAmount,
                currency: transferCurrency,
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                from: opData.from,
                to: opData.to,
                tags: transferTags,
                category: transferCategory,
                usdValue: transferUsdValue,
                memo: decryptedMemo
              };
            
            case 'transfer_to_vesting':
              const powerUpDirection = opData.from === username ? 'to' : 'from';
              const powerUpCounterparty = opData.from === username ? opData.to : opData.from;
              const powerUpAmount = opData.amount;
              
              return {
                id: `${index}`,
                type: 'power_up',
                description: `Power up ${powerUpAmount} ${powerUpDirection} @${powerUpCounterparty}`,
                amount: powerUpAmount,
                currency: 'HIVE',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                from: opData.from,
                to: opData.to,
                tags: ['power_up', 'staking'],
                category: 'staking'
              };
            
            case 'withdraw_vesting':
              const withdrawAmount = opData.vesting_shares;
              
              return {
                id: `${index}`,
                type: 'power_down',
                description: `Power down initiated: ${withdrawAmount}`,
                amount: withdrawAmount,
                currency: 'VESTS',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                tags: ['power_down', 'unstaking'],
                category: 'staking'
              };
            
            case 'delegate_vesting_shares':
              const delegationDirection = opData.delegator === username ? 'to' : 'from';
              const delegationCounterparty = opData.delegator === username ? opData.delegatee : opData.delegator;
              const delegationAmount = opData.vesting_shares;
              
              return {
                id: `${index}`,
                type: 'delegation',
                description: `Delegate ${delegationAmount} ${delegationDirection} @${delegationCounterparty}`,
                amount: delegationAmount,
                currency: 'VESTS',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                from: opData.delegator,
                to: opData.delegatee,
                tags: ['delegation', 'staking'],
                category: 'staking'
              };
            
            case 'claim_reward_balance':
              const rewards = [];
              let totalAmount = '';
              let rewardCurrency = '';
              
              // Process each reward type
              if (opData.reward_hive && parseFloat(opData.reward_hive.split(' ')[0]) > 0) {
                rewards.push(opData.reward_hive);
              }
              if (opData.reward_hbd && parseFloat(opData.reward_hbd.split(' ')[0]) > 0) {
                rewards.push(opData.reward_hbd);
              }
              if (opData.reward_vests && parseFloat(opData.reward_vests.split(' ')[0]) > 0) {
                rewards.push(opData.reward_vests);
              }
              
              // Create description based on rewards
              let rewardDescription = 'Claimed rewards';
              if (rewards.length > 0) {
                rewardDescription = `Claimed rewards: ${rewards.join(', ')}`;
                if (rewards.length === 1) {
                  totalAmount = rewards[0];
                  rewardCurrency = rewards[0].split(' ')[1] || '';
                } else {
                  totalAmount = rewards.join(', ');
                  rewardCurrency = 'MIXED';
                }
              } else {
                rewardDescription = 'No rewards claimed';
              }
              
              return {
                id: `${index}`,
                type: 'reward',
                description: rewardDescription,
                amount: totalAmount,
                currency: rewardCurrency,
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                tags: ['reward', 'income'],
                category: 'income'
              };
            
            case 'convert':
              const convertAmount = opData.amount;
              const convertCurrency = opData.amount.split(' ')[1] || 'HBD';
              
              return {
                id: `${index}`,
                type: 'conversion',
                description: `Convert ${convertAmount} to HIVE`,
                amount: convertAmount,
                currency: convertCurrency,
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                tags: ['conversion', 'exchange'],
                category: 'exchange'
              };
            
            case 'fill_convert_request':
              const filledAmount = opData.amount_out;
              const filledCurrency = opData.amount_out.split(' ')[1] || 'HIVE';
              
              return {
                id: `${index}`,
                type: 'conversion_filled',
                description: `HBD to HIVE conversion filled: ${filledAmount}`,
                amount: filledAmount,
                currency: filledCurrency,
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                tags: ['conversion_filled', 'exchange'],
                category: 'exchange'
              };
            
            case 'limit_order_create':
              const sellAmount = opData.amount_to_sell;
              const sellCurrency = opData.amount_to_sell.split(' ')[1] || 'N/A';
              const minToReceive = opData.min_to_receive;

              
              return {
                id: `${index}`,
                type: 'order_create',
                description: `Create limit order: Sell ${sellAmount} for ${minToReceive}`,
                amount: sellAmount,
                currency: sellCurrency,
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                tags: ['order_create', 'trading'],
                category: 'trading'
              };
            
            case 'limit_order_cancel':
              return {
                id: `${index}`,
                type: 'order_cancel',
                description: `Cancel limit order #${opData.orderid}`,
                amount: '0',
                currency: 'N/A',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                tags: ['order_cancel', 'trading'],
                category: 'trading'
              };
            
            case 'fill_order':
              const paidAmount = opData.current_pays;
              const paidCurrency = opData.current_pays.split(' ')[1] || 'N/A';
              const receivedAmount = opData.opens_pays;

              
              return {
                id: `${index}`,
                type: 'order_filled',
                description: `Filled order: Paid ${paidAmount}, Received ${receivedAmount}`,
                amount: paidAmount,
                currency: paidCurrency,
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                tags: ['order_filled', 'trading'],
                category: 'trading'
              };
            
            case 'create_claimed_account':
              return {
                id: `${index}`,
                type: 'account_creation',
                description: `Created claimed account: ${opData.new_account_name}`,
                amount: '0',
                currency: 'N/A',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                from: opData.creator,
                to: opData.new_account_name,
                tags: ['account_creation', 'system'],
                category: 'other'
              };
            
            case 'account_created':
              return {
                id: `${index}`,
                type: 'account_created',
                description: `Account created by: ${opData.creator}`,
                amount: '0',
                currency: 'N/A',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                from: opData.creator,
                to: opData.new_account_name,
                tags: ['account_created', 'system'],
                category: 'other'
              };
            
            case 'account_update':
              const updateFields = [];
              if (opData.active) updateFields.push('active key');
              if (opData.owner) updateFields.push('owner key');
              if (opData.posting) updateFields.push('posting key');
              if (opData.memo_key) updateFields.push('memo key');
              if (opData.json_metadata) updateFields.push('metadata');
              
              return {
                id: `${index}`,
                type: 'account_update',
                description: `Updated account ${opData.account}${updateFields.length > 0 ? ` (${updateFields.join(', ')})` : ''}`,
                amount: '0',
                currency: 'N/A',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                from: opData.account,
                to: opData.account,
                tags: ['account_update', 'security'],
                category: 'other'
              };
            
            case 'vote':
              return {
                id: `${index}`,
                type: 'vote',
                description: `Voted on @${opData.author}/${opData.permlink} (${opData.weight / 100}%)`,
                amount: '0',
                currency: 'N/A',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                from: opData.voter,
                to: opData.author,
                tags: ['vote', 'social'],
                category: 'other'
              };
            
            case 'effective_comment_vote':
              const pendingPayout = opData.pending_payout || '0.000 HBD';
              // Check if the user is the author (earning the payout) or voter (giving the vote)
              const isAuthor = opData.author === username;
              const effectiveVoteDescription = isAuthor 
                ? `Earned vote payout on @${opData.author}/${opData.permlink} (${pendingPayout})`
                : `Voted on @${opData.author}/${opData.permlink} (${pendingPayout})`;
              
              return {
                id: `${index}`,
                type: 'effective_vote',
                description: effectiveVoteDescription,
                amount: pendingPayout,
                currency: 'HBD',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                from: opData.voter,
                to: opData.author,
                tags: ['effective_vote', isAuthor ? 'income' : 'social'],
                category: isAuthor ? 'income' : 'other'
              };
            
            case 'comment':
              const isReply = !!opData.parent_author;
              const action = opData.title ? 'Posted' : 'Commented';
              const target = isReply ? `on @${opData.parent_author}/${opData.parent_permlink}` : 'a new post';
              
              return {
                id: `${index}`,
                type: 'content',
                description: `${action} ${target}: ${opData.permlink}`,
                amount: '0',
                currency: 'N/A',
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                from: opData.author,
                to: opData.parent_author || '',
                tags: ['content', 'social'],
                category: 'other'
              };
            
            case 'custom_json':
              // Handle Hive Engine tokens and other custom operations
              let description = 'Custom operation';
              let amount = '0';
              let currency = 'N/A';
              let tags = ['custom'];
              let category = 'other';
              
              if (opData.id === 'ssc-mainnet-hive') {
                try {
                  const jsonData = JSON.parse(opData.json);
                  
                  // Handle array of operations (common in Hive Engine)
                  const operations = Array.isArray(jsonData) ? jsonData : [jsonData];
                  
                  for (const op of operations) {
                    if (op.contractName === 'tokens') {
                      switch (op.contractAction) {
                        case 'transfer':
                          description = `Transfer ${op.contractPayload.quantity} ${op.contractPayload.symbol} to @${op.contractPayload.to}`;
                          amount = op.contractPayload.quantity;
                          currency = op.contractPayload.symbol;
                          tags = ['token_transfer', 'tokens'];
                          category = 'transfer';
                          break;
                        case 'stake':
                          description = `Stake ${op.contractPayload.quantity} ${op.contractPayload.symbol}`;
                          amount = op.contractPayload.quantity;
                          currency = op.contractPayload.symbol;
                          tags = ['token_stake', 'tokens', 'staking'];
                          category = 'staking';
                          break;
                        case 'unstake':
                          description = `Unstake ${op.contractPayload.quantity} ${op.contractPayload.symbol}`;
                          amount = op.contractPayload.quantity;
                          currency = op.contractPayload.symbol;
                          tags = ['token_unstake', 'tokens', 'staking'];
                          category = 'staking';
                          break;
                        case 'delegate':
                          description = `Delegate ${op.contractPayload.quantity} ${op.contractPayload.symbol} to @${op.contractPayload.to}`;
                          amount = op.contractPayload.quantity;
                          currency = op.contractPayload.symbol;
                          tags = ['token_delegate', 'tokens', 'staking'];
                          category = 'staking';
                          break;
                        default:
                          description = `Token ${op.contractAction}: ${op.contractPayload.quantity || ''} ${op.contractPayload.symbol || ''}`.trim();
                          if (op.contractPayload.quantity) {
                            amount = op.contractPayload.quantity;
                          }
                          if (op.contractPayload.symbol) {
                            currency = op.contractPayload.symbol;
                          }
                          tags = ['token_operation', 'tokens'];
                          category = 'other';
                          break;
                      }
                      break; // Process only the first recognized operation
                    } else if (op.contractName === 'market') {
                      switch (op.contractAction) {
                        case 'buy':
                          description = `Buy ${op.contractPayload.symbol} with ${op.contractPayload.quantity} ${op.contractPayload.token}`;
                          amount = op.contractPayload.quantity;
                          currency = op.contractPayload.token;
                          tags = ['market_buy', 'tokens', 'trading'];
                          category = 'trading';
                          break;
                        case 'sell':
                          description = `Sell ${op.contractPayload.quantity} ${op.contractPayload.symbol}`;
                          amount = op.contractPayload.quantity;
                          currency = op.contractPayload.symbol;
                          tags = ['market_sell', 'tokens', 'trading'];
                          category = 'trading';
                          break;
                        case 'cancel':
                          description = `Cancel ${op.contractPayload.type} order #${op.contractPayload.id}`;
                          tags = ['market_cancel', 'tokens', 'trading'];
                          category = 'trading';
                          break;
                        default:
                          description = `Market ${op.contractAction}`;
                          tags = ['market_operation', 'tokens'];
                          category = 'trading';
                          break;
                      }
                      break; // Process only the first recognized operation
                    } else if (op.contractName) {
                      // Handle other contract operations
                      description = `${op.contractName} ${op.contractAction}`;
                      if (op.contractPayload && op.contractPayload.quantity) {
                        amount = op.contractPayload.quantity;
                        if (op.contractPayload.symbol) {
                          currency = op.contractPayload.symbol;
                        } else if (op.contractPayload.token) {
                          currency = op.contractPayload.token;
                        }
                      }
                      tags = ['contract_operation', op.contractName];
                      category = 'other';
                    }
                  }
                  
                  // If we still have the default description, try to make it more informative
                  if (description === 'Custom operation' && operations.length > 0) {
                    const firstOp = operations[0];
                    if (firstOp.contractName && firstOp.contractAction) {
                      description = `${firstOp.contractName} ${firstOp.contractAction}`;
                    }
                  }
                } catch (e) {
                  // Ignore JSON parse errors
                  console.debug('[HiveTransactionAPI] Failed to parse JSON metadata:', e);
                  description = 'Custom JSON operation';
                  tags = ['custom_json', 'parse_error'];
                  category = 'other';
                }
              } else {
                // Handle other custom JSON operations
                description = opData.id ? `Custom operation (${opData.id})` : 'Custom operation';
                tags = ['custom_json', opData.id || 'unknown'];
                category = 'other';
              }
              
              return {
                id: `${index}`,
                type: 'custom',
                description,
                amount,
                currency,
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                tags,
                category
              };
            
            default:
              // Try to extract meaningful information from the operation
              let defaultDescription = `${opType.replace(/_/g, ' ')}`;
              let defaultAmount = '0';
              let defaultCurrency = 'N/A';
              let defaultTags = ['other'];
              let defaultCategory = 'other';
              
              // Try to find amount and currency in common fields
              if (opData.amount) {
                defaultAmount = opData.amount;
                if (typeof opData.amount === 'string' && opData.amount.includes(' ')) {
                  defaultCurrency = opData.amount.split(' ')[1];
                }
              } else if (opData.vesting_shares) {
                defaultAmount = opData.vesting_shares;
                defaultCurrency = 'VESTS';
              } else if (opData.reward_hive || opData.reward_hbd || opData.reward_vests) {
                const rewards = [];
                if (opData.reward_hive && parseFloat(opData.reward_hive.split(' ')[0]) > 0) rewards.push(opData.reward_hive);
                if (opData.reward_hbd && parseFloat(opData.reward_hbd.split(' ')[0]) > 0) rewards.push(opData.reward_hbd);
                if (opData.reward_vests && parseFloat(opData.reward_vests.split(' ')[0]) > 0) rewards.push(opData.reward_vests);
                
                if (rewards.length > 0) {
                  defaultDescription = `Claim rewards: ${rewards.join(', ')}`;
                  defaultAmount = rewards.join(', ');
                  defaultCurrency = rewards.length === 1 ? (rewards[0].split(' ')[1] || 'MIXED') : 'MIXED';
                  defaultTags = ['reward', 'income'];
                  defaultCategory = 'income';
                } else {
                  defaultDescription = 'Claim rewards (no rewards)';
                  defaultTags = ['reward'];
                  defaultCategory = 'income';
                }
              }
              
              // Improve description by adding context
              if (opData.from && opData.to) {
                const direction = opData.from === username ? 'to' : 'from';
                const counterparty = opData.from === username ? opData.to : opData.from;
                defaultDescription = `${defaultDescription} ${direction} @${counterparty}`;
              } else if (opData.from) {
                defaultDescription = `${defaultDescription} from @${opData.from}`;
              } else if (opData.to) {
                defaultDescription = `${defaultDescription} to @${opData.to}`;
              }
              
              return {
                id: `${index}`,
                type: 'other',
                description: defaultDescription,
                amount: defaultAmount,
                currency: defaultCurrency,
                status: 'completed' as const,
                timestamp,
                hash: transaction.trx_id,
                tags: defaultTags,
                category: defaultCategory
              };
          }
        } catch (error) {
          console.error(`[HiveTransactionAPI] Error processing transaction ${index}:`, error);
          // Return a fallback transaction object
          return {
            id: `${index}`,
            type: 'error',
            description: 'Error processing transaction',
            amount: '0',
            currency: 'N/A',
            status: 'failed' as const,
            timestamp: new Date().toISOString(),
            hash: 'error',
            tags: ['error'],
            category: 'other'
          };
        }
      }).reverse(); // Reverse to show newest first
      
      console.log(`[HiveTransactionAPI] Formatted transactions for ${username}:`, result?.length);
      return result;
    } catch (error) {
      console.error('[HiveTransactionAPI] Error fetching transaction history:', error);
      throw error;
    }
  }

  /**
   * Get transaction statistics
   */
  static async getTransactionStats(username: string): Promise<{
    totalTransactions: number;
    totalVolume: string;
    avgFee: string;
    successRate: string;
  }> {
    try {
      console.log(`[HiveTransactionAPI] Fetching transaction stats for ${username}`);
      const history = await HiveAccountAPI.getAccountHistory(username, -1, 1000);
      console.log(`[HiveTransactionAPI] Raw history for stats ${username}:`, history?.length);
      
      if (!history || history.length === 0) {
        console.log(`[HiveTransactionAPI] No transaction history found for stats ${username}`);
        return {
          totalTransactions: 0,
          totalVolume: '0.000 HIVE + 0.000 HBD',
          avgFee: '0.000 HIVE',
          successRate: '0%',
        };
      }
      
      let totalTransactions = history.length;
      let totalVolumeHive = 0;
      let totalVolumeHbd = 0;
      let successfulTx = 0;
      
      history.forEach(([, transaction]) => {
        const [opType, opData] = transaction.op;
        
        // Count successful transactions (all blockchain operations are successful by definition)
        successfulTx++;
        
        // Calculate volume for transfer operations
        if (opType === 'transfer') {
          const amount = parseFloat(opData.amount.split(' ')[0]);
          const currency = opData.amount.split(' ')[1];
          
          if (currency === 'HIVE') {
            totalVolumeHive += amount;
          } else if (currency === 'HBD') {
            totalVolumeHbd += amount;
          }
        }
      });
      
      const result = {
        totalTransactions: totalTransactions,
        totalVolume: `${totalVolumeHive.toFixed(3)} HIVE + ${totalVolumeHbd.toFixed(3)} HBD`,
        avgFee: '0.000 HIVE', // Hive has no fees for basic operations
        successRate: totalTransactions > 0 ? `${((successfulTx / totalTransactions) * 100).toFixed(1)}%` : '0%',
      };
      
      console.log(`[HiveTransactionAPI] Transaction stats for ${username}:`, result);
      return result;
    } catch (error) {
      console.error('[HiveTransactionAPI] Error fetching transaction stats:', error);
      return {
        totalTransactions: 0,
        totalVolume: '0.000 HIVE + 0.000 HBD',
        avgFee: '0.000 HIVE',
        successRate: '0%',
      };
    }
  }
}

// Market data API calls (for future implementation)
export class HiveMarketAPI {
  /**
   * Get current HIVE and HBD prices
   */
  static async getPrices(): Promise<{
    hive_usd: number;
    hbd_usd: number;
    [key: string]: number; // For other token prices
  }> {
    try {
      console.log('[HiveMarketAPI] Fetching prices');
      // For now, return placeholder data with more realistic values
      const result = {
        hive_usd: 0.35,
        hbd_usd: 1.00,
      };
      console.log('[HiveMarketAPI] Prices:', result);
      return result;
    } catch (error) {
      console.error('[HiveMarketAPI] Error fetching prices:', error);
      return {
        hive_usd: 0,
        hbd_usd: 0,
      };
    }
  }
  
  /**
   * Get USD value for a given amount and currency
   */
  static async getUSDValue(amount: string, currency: string): Promise<number> {
    if (!amount || !currency) {
      console.log('[HiveMarketAPI] Invalid amount or currency for USD value calculation');
      return 0;
    }
    
    const amountParts = amount.split(' ');
    const numericAmount = parseFloat(amountParts[0] || '0');
    if (isNaN(numericAmount)) {
      console.log('[HiveMarketAPI] Invalid numeric amount for USD value calculation');
      return 0;
    }
    
    const prices = await this.getPrices();
    
    let result = 0;
    switch (currency.toUpperCase()) {
      case 'HIVE':
        result = numericAmount * prices.hive_usd;
        break;
      case 'HBD':
        result = numericAmount * prices.hbd_usd;
        break;
      case 'VESTS':
        // VESTS need to be converted to HIVE first
        // For simplicity, we'll assume 1 VEST = 0.0001 HIVE
        result = numericAmount * 0.0001 * prices.hive_usd;
        break;
      case 'HP':
        // HP (Hive Power) is already in HIVE equivalent
        result = numericAmount * prices.hive_usd;
        break;
      default:
        // For other tokens, assume 0 value unless we have specific data
        result = 0;
        break;
    }
    
    console.log(`[HiveMarketAPI] USD value for ${amount} ${currency}: ${result}`);
    return result;
  }
}