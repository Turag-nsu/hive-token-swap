// src/lib/api/hive-api.ts
import { HiveAccount } from '@/types';

// Hive RPC API endpoint
const HIVE_API_URL = 'https://api.hive.blog';

// Backup endpoints
const BACKUP_ENDPOINTS = [
  'https://anyx.io',
  'https://api.openhive.network',
  'https://hived.emre.sh'
];

interface HiveRPCRequest {
  jsonrpc: string;
  method: string;
  params: any;
  id: number;
}

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

// Generic RPC call function
async function makeRPCCall<T>(method: string, params: any, endpoint: string = HIVE_API_URL): Promise<T> {
  const request: HiveRPCRequest = {
    jsonrpc: '2.0',
    method,
    params,
    id: Date.now()
  };

  try {
    // Use fetch with proper context binding
    let response: Response;
    
    if (typeof window !== 'undefined') {
      // Client-side: bind fetch to window context
      response = await fetch.call(window, endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
    } else {
      // Server-side: use fetch directly
      response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HiveRPCResponse<T> = await response.json();
    
    if (data.error) {
      throw new Error(`Hive API error: ${data.error.message}`);
    }

    return data.result;
  } catch (error) {
    // Try backup endpoints if main endpoint fails
    if (endpoint === HIVE_API_URL) {
      for (const backupEndpoint of BACKUP_ENDPOINTS) {
        try {
          return await makeRPCCall<T>(method, params, backupEndpoint);
        } catch {
          continue;
        }
      }
    }
    throw error;
  }
}

// Account-related API calls
export class HiveAccountAPI {
  /**
   * Get account information
   */
  static async getAccount(username: string): Promise<HiveAccount | null> {
    try {
      const accounts = await makeRPCCall<any[]>('condenser_api.get_accounts', [[username]]);
      
      if (!accounts || accounts.length === 0) {
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
      console.error('Error fetching account:', error);
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
      const history = await makeRPCCall<any[]>('condenser_api.get_account_history', [
        username,
        start,
        limit
      ]);

      if (!history) {
        return [];
      }

      // Filter operations if specified
      if (operationFilter && operationFilter.length > 0) {
        return history.filter(([, transaction]) => {
          const operationType = transaction.op[0];
          return operationFilter.includes(operationType);
        });
      }

      return history;
    } catch (error) {
      console.error('Error fetching account history:', error);
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

      return {
        hive: account.balance || '0.000 HIVE',
        hbd: account.hbd_balance || '0.000 HBD',
        hive_power: `${vestsToHp(vestingShares - delegatedVests + receivedVests).toFixed(3)} HP`,
        delegated_hp: `${vestsToHp(delegatedVests).toFixed(3)} HP`,
        received_hp: `${vestsToHp(receivedVests).toFixed(3)} HP`,
      };
    } catch (error) {
      console.error('Error fetching account balances:', error);
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
  }>> {
    try {
      const history = await HiveAccountAPI.getAccountHistory(username, -1, limit);
      
      return history.map(([index, transaction]) => {
        const [opType, opData] = transaction.op;
        const timestamp = new Date(transaction.timestamp + 'Z').toISOString();
        
        // Format different operation types
        switch (opType) {
          case 'transfer':
            return {
              id: `${index}`,
              type: 'transfer',
              description: `Transfer ${opData.from === username ? 'to' : 'from'} @${opData.from === username ? opData.to : opData.from}`,
              amount: opData.amount,
              currency: opData.amount.split(' ')[1],
              status: 'completed' as const,
              timestamp,
              hash: transaction.trx_id,
              from: opData.from,
              to: opData.to,
            };
          
          case 'transfer_to_vesting':
            return {
              id: `${index}`,
              type: 'power_up',
              description: `Power up ${opData.from === username ? 'to' : 'from'} @${opData.from === username ? opData.to : opData.from}`,
              amount: opData.amount,
              currency: 'HIVE',
              status: 'completed' as const,
              timestamp,
              hash: transaction.trx_id,
              from: opData.from,
              to: opData.to,
            };
          
          case 'withdraw_vesting':
            return {
              id: `${index}`,
              type: 'power_down',
              description: 'Power down initiated',
              amount: opData.vesting_shares,
              currency: 'VESTS',
              status: 'completed' as const,
              timestamp,
              hash: transaction.trx_id,
            };
          
          case 'delegate_vesting_shares':
            return {
              id: `${index}`,
              type: 'delegation',
              description: `Delegate HP ${opData.delegator === username ? 'to' : 'from'} @${opData.delegator === username ? opData.delegatee : opData.delegator}`,
              amount: opData.vesting_shares,
              currency: 'VESTS',
              status: 'completed' as const,
              timestamp,
              hash: transaction.trx_id,
              from: opData.delegator,
              to: opData.delegatee,
            };
          
          case 'claim_reward_balance':
            return {
              id: `${index}`,
              type: 'reward',
              description: 'Claim rewards',
              amount: `${opData.reward_hive || '0.000 HIVE'}, ${opData.reward_hbd || '0.000 HBD'}, ${opData.reward_vests || '0.000000 VESTS'}`,
              currency: 'MIXED',
              status: 'completed' as const,
              timestamp,
              hash: transaction.trx_id,
            };
          
          case 'convert':
            return {
              id: `${index}`,
              type: 'conversion',
              description: 'Convert HBD to HIVE',
              amount: opData.amount,
              currency: 'HBD',
              status: 'completed' as const,
              timestamp,
              hash: transaction.trx_id,
            };
          
          case 'custom_json':
            // Handle Hive Engine tokens and other custom operations
            let description = 'Custom operation';
            if (opData.id === 'ssc-mainnet-hive') {
              try {
                const jsonData = JSON.parse(opData.json);
                if (jsonData.contractName === 'tokens' && jsonData.contractAction === 'transfer') {
                  description = `Transfer ${jsonData.contractPayload.quantity} ${jsonData.contractPayload.symbol}`;
                }
              } catch (e) {
                // Ignore JSON parse errors
                console.debug('Failed to parse JSON metadata:', e);
              }
            }
            
            return {
              id: `${index}`,
              type: 'custom',
              description,
              amount: '0',
              currency: 'N/A',
              status: 'completed' as const,
              timestamp,
              hash: transaction.trx_id,
            };
          
          default:
            return {
              id: `${index}`,
              type: 'other',
              description: `${opType.replace(/_/g, ' ')}`,
              amount: '0',
              currency: 'N/A',
              status: 'completed' as const,
              timestamp,
              hash: transaction.trx_id,
            };
        }
      }).reverse(); // Reverse to show newest first
    } catch (error) {
      console.error('Error fetching transaction history:', error);
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
      const history = await HiveAccountAPI.getAccountHistory(username, -1, 1000);
      
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
      
      return {
        totalTransactions: totalTransactions,
        totalVolume: `${totalVolumeHive.toFixed(3)} HIVE + ${totalVolumeHbd.toFixed(3)} HBD`,
        avgFee: '0.000 HIVE', // Hive has no fees for basic operations
        successRate: totalTransactions > 0 ? `${((successfulTx / totalTransactions) * 100).toFixed(1)}%` : '0%',
      };
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
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
  }> {
    try {
      // This would typically call CoinGecko or another price API
      // For now, return placeholder data
      return {
        hive_usd: 0.35,
        hbd_usd: 1.00,
      };
    } catch (error) {
      console.error('Error fetching prices:', error);
      return {
        hive_usd: 0,
        hbd_usd: 0,
      };
    }
  }
}
