import { Client } from '@hiveio/dhive';
import { API_ENDPOINTS, NETWORK_CONFIG } from '@/constants';
import type { HiveAccount, Operation } from '@/types';

interface DynamicGlobalProperties {
  head_block_number: number;
  head_block_id: string;
  time: string;
  current_witness: string;
  total_pow: number;
  num_pow_witnesses: number;
  virtual_supply: string;
  current_supply: string;
  confidential_supply: string;
  current_sbd_supply: string;
  confidential_sbd_supply: string;
  total_vesting_fund_steem: string;
  total_vesting_shares: string;
  total_reward_fund_steem: string;
  total_reward_shares2: string;
  pending_rewarded_vesting_shares: string;
  pending_rewarded_vesting_steem: string;
  sbd_interest_rate: number;
  sbd_print_rate: number;
  maximum_block_size: number;
  current_aslot: number;
  recent_slots_filled: string;
  participation_count: number;
  last_irreversible_block_num: number;
  vote_power_reserve_rate: number;
}

interface AccountHistory {
  trx_id: string;
  block: number;
  trx_in_block: number;
  op_in_trx: number;
  virtual_op: number;
  timestamp: string;
  op: Operation;
}

class HiveRPCClient {
  private client: Client | null = null;
  private backupNodes: string[];

  constructor() {
    this.backupNodes = [
      API_ENDPOINTS.HIVE_RPC,
      API_ENDPOINTS.HIVE_BACKUP_RPC,
      'https://hived.privex.io',
      'https://rpc.ecency.com',
      'https://techcoderx.com',
    ];
  }

  // Lazy initialization of client with window check
  private getClient(): Client {
    if (this.client) {
      return this.client;
    }

    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }

    this.client = new Client(this.backupNodes, {
      timeout: NETWORK_CONFIG.REQUEST_TIMEOUT,
      failoverThreshold: 3,
      consoleOnFailover: true,
    });

    return this.client;
  }

  // Account operations
  async getAccount(username: string): Promise<HiveAccount | null> {
    try {
      const client = this.getClient();
      const accounts = await client.database.getAccounts([username]);
      return (accounts[0] as HiveAccount) || null;
    } catch (error) {
      console.error(`Failed to fetch account ${username}:`, error);
      return null;
    }
  }

  async getAccounts(usernames: string[]): Promise<HiveAccount[]> {
    try {
      const client = this.getClient();
      const accounts = await client.database.getAccounts(usernames);
      return accounts as HiveAccount[];
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
      throw error;
    }
  }

  async getAccountHistory(
    account: string,
    from: number = -1,
    limit: number = 100
  ): Promise<AccountHistory[]> {
    try {
      const client = this.getClient();
      const history = await client.database.getAccountHistory(
        account,
        from,
        limit
      );
      return history.map(([index, operation]) => ({
        index,
        trx_id: operation.trx_id,
        block: operation.block,
        trx_in_block: operation.trx_in_block,
        op_in_trx: operation.op_in_trx,
        virtual_op: operation.virtual_op,
        timestamp: operation.timestamp,
        op: operation.op as Operation,
      }));
    } catch (error) {
      console.error(`Failed to fetch account history for ${account}:`, error);
      throw error;
    }
  }

  // Blockchain information
  async getDynamicGlobalProperties(): Promise<DynamicGlobalProperties> {
    try {
      const client = this.getClient();
      const props = await client.database.getDynamicGlobalProperties();
      return props as unknown as DynamicGlobalProperties;
    } catch (error) {
      console.error('Failed to fetch dynamic global properties:', error);
      throw error;
    }
  }

  async getCurrentBlockNumber(): Promise<number> {
    try {
      const props = await this.getDynamicGlobalProperties();
      return props.head_block_number;
    } catch (error) {
      console.error('Failed to get current block number:', error);
      throw error;
    }
  }

  async getBlock(blockNumber: number): Promise<any> {
    try {
      const client = this.getClient();
      return await client.database.getBlock(blockNumber);
    } catch (error) {
      console.error(`Failed to fetch block ${blockNumber}:`, error);
      throw error;
    }
  }

  async getTransaction(txId: string): Promise<any> {
    try {
      const client = this.getClient();
      return await client.database.getTransaction(txId);
    } catch (error) {
      console.error(`Failed to fetch transaction ${txId}:`, error);
      throw error;
    }
  }

  // Balances and financial information
  async getBalance(account: string): Promise<{ hive: string; hbd: string }> {
    try {
      const accountData = await this.getAccount(account);
      if (!accountData) {
        throw new Error(`Account ${account} not found`);
      }

      return {
        hive: accountData.balance,
        hbd: accountData.hbd_balance,
      };
    } catch (error) {
      console.error(`Failed to get balance for ${account}:`, error);
      throw error;
    }
  }

  async getVestingShares(account: string): Promise<{
    vesting_shares: string;
    delegated_vesting_shares: string;
    received_vesting_shares: string;
  }> {
    try {
      const accountData = await this.getAccount(account);
      if (!accountData) {
        throw new Error(`Account ${account} not found`);
      }

      return {
        vesting_shares: accountData.vesting_shares,
        delegated_vesting_shares: accountData.delegated_vesting_shares,
        received_vesting_shares: accountData.received_vesting_shares,
      };
    } catch (error) {
      console.error(`Failed to get vesting shares for ${account}:`, error);
      throw error;
    }
  }

  // Resource Credits (RC) estimation
  async estimateResourceCredits(operations: Operation[]): Promise<number> {
    try {
      // Approximate RC costs for different operations
      const rcCosts: Record<string, number> = {
        'transfer': 2640000,
        'custom_json': 1320000,
        'transfer_to_vesting': 2640000,
        'withdraw_vesting': 1320000,
        'vote': 1320000,
        'comment': 6600000,
      };

      const totalRc = operations.reduce((total, op) => {
        const [opType] = op;
        return total + (rcCosts[opType] || 1320000);
      }, 0);

      return totalRc;
    } catch (error) {
      console.error('Failed to estimate RC cost:', error);
      return 1320000; // Default RC cost
    }
  }

  // Transaction broadcasting (for testing only - use HiveKeychain in production)
  async broadcastTransaction(
    operations: Operation[],
    privateKey?: any
  ): Promise<any> {
    if (!privateKey) {
      throw new Error('Use HiveKeychain for transaction signing in production');
    }

    try {
      const client = this.getClient();
      return await client.broadcast.sendOperations(operations, privateKey);
    } catch (error) {
      console.error('Failed to broadcast transaction:', error);
      throw error;
    }
  }

  // Utility methods
  async validateTransaction(operations: Operation[]): Promise<boolean> {
    try {
      // Basic validation checks
      if (!operations || operations.length === 0) {
        return false;
      }

      for (const operation of operations) {
        if (!operation || !Array.isArray(operation) || operation.length !== 2) {
          return false;
        }

        const [opType, opData] = operation;
        if (typeof opType !== 'string' || !opData || typeof opData !== 'object') {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Transaction validation failed:', error);
      return false;
    }
  }

  async checkNodeHealth(): Promise<{ node: string; healthy: boolean; latency: number }[]> {
    const results = [];

    for (const node of this.backupNodes) {
      const startTime = Date.now();
      try {
        // Check if we're in browser environment for each client creation
        if (typeof window === 'undefined') {
          throw new Error('HiveRPCClient can only be used in browser environment');
        }
        
        const client = new Client([node], { timeout: 5000 });
        await client.database.getDynamicGlobalProperties();
        const latency = Date.now() - startTime;
        results.push({ node, healthy: true, latency });
      } catch (error) {
        console.error(`Health check failed for node ${node}:`, error);
        const latency = Date.now() - startTime;
        results.push({ node, healthy: false, latency });
      }
    }

    return results;
  }

  // Convert VESTS to HIVE Power
  async vestsToHivePower(vests: number): Promise<number> {
    try {
      const props = await this.getDynamicGlobalProperties();
      const totalVestingFund = props.total_vesting_fund_steem ? parseFloat((props.total_vesting_fund_steem.split(' ')[0]) || '0') : 0;
      const totalVestingShares = props.total_vesting_shares ? parseFloat((props.total_vesting_shares.split(' ')[0]) || '0') : 0;
      
      if (totalVestingShares === 0) return 0;
      
      return (vests * totalVestingFund) / totalVestingShares;
    } catch (error) {
      console.error('Failed to convert VESTS to HIVE Power:', error);
      return 0;
    }
  }

  // Convert HIVE Power to VESTS
  async hivePowerToVests(hivePower: number): Promise<number> {
    try {
      const props = await this.getDynamicGlobalProperties();
      const totalVestingFund = props.total_vesting_fund_steem ? parseFloat((props.total_vesting_fund_steem.split(' ')[0]) || '0') : 0;
      const totalVestingShares = props.total_vesting_shares ? parseFloat((props.total_vesting_shares.split(' ')[0]) || '0') : 0;
      
      if (totalVestingFund === 0) return 0;
      
      return (hivePower * totalVestingShares) / totalVestingFund;
    } catch (error) {
      console.error('Failed to convert HIVE Power to VESTS:', error);
      return 0;
    }
  }

  // Format asset strings
  formatAsset(amount: number, symbol: 'HIVE' | 'HBD' | 'VESTS'): string {
    const precision = symbol === 'VESTS' ? 6 : 3;
    return `${amount.toFixed(precision)} ${symbol}`;
  }

  // Parse asset strings
  parseAsset(asset: string): { amount: number; symbol: string } {
    const parts = asset.trim().split(' ');
    return {
      amount: parts[0] ? parseFloat(parts[0]) || 0 : 0,
      symbol: parts[1] || '',
    };
  }
}

// Create and export singleton instance with lazy initialization
let hiveRPCInstance: HiveRPCClient | null = null;

export const hiveRPC = {
  getInstance(): HiveRPCClient {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }

    if (!hiveRPCInstance) {
      hiveRPCInstance = new HiveRPCClient();
    }
    return hiveRPCInstance;
  },

  // Proxy all methods to the singleton instance with window checks
  async getAccount(username: string): Promise<HiveAccount | null> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().getAccount(username);
  },

  async getAccounts(usernames: string[]): Promise<HiveAccount[]> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().getAccounts(usernames);
  },

  async getAccountHistory(
    account: string,
    from: number = -1,
    limit: number = 100
  ): Promise<AccountHistory[]> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().getAccountHistory(account, from, limit);
  },

  async getDynamicGlobalProperties(): Promise<DynamicGlobalProperties> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().getDynamicGlobalProperties();
  },

  async getCurrentBlockNumber(): Promise<number> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().getCurrentBlockNumber();
  },

  async getBlock(blockNumber: number): Promise<any> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().getBlock(blockNumber);
  },

  async getTransaction(txId: string): Promise<any> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().getTransaction(txId);
  },

  async getBalance(account: string): Promise<{ hive: string; hbd: string }> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().getBalance(account);
  },

  async getVestingShares(account: string): Promise<{
    vesting_shares: string;
    delegated_vesting_shares: string;
    received_vesting_shares: string;
  }> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().getVestingShares(account);
  },

  async estimateResourceCredits(operations: Operation[]): Promise<number> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().estimateResourceCredits(operations);
  },

  async broadcastTransaction(
    operations: Operation[],
    privateKey?: any
  ): Promise<any> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().broadcastTransaction(operations, privateKey);
  },

  async validateTransaction(operations: Operation[]): Promise<boolean> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().validateTransaction(operations);
  },

  async checkNodeHealth(): Promise<{ node: string; healthy: boolean; latency: number }[]> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().checkNodeHealth();
  },

  async vestsToHivePower(vests: number): Promise<number> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().vestsToHivePower(vests);
  },

  async hivePowerToVests(hivePower: number): Promise<number> {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().hivePowerToVests(hivePower);
  },

  formatAsset(amount: number, symbol: 'HIVE' | 'HBD' | 'VESTS'): string {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().formatAsset(amount, symbol);
  },

  parseAsset(asset: string): { amount: number; symbol: string } {
    if (typeof window === 'undefined') {
      throw new Error('HiveRPCClient can only be used in browser environment');
    }
    return this.getInstance().parseAsset(asset);
  }
};

export type { DynamicGlobalProperties, AccountHistory };