// src/lib/api/hive-api.test.ts
import { HiveTransactionAPI, HiveMarketAPI } from './hive-api';

// Mock data for testing
const mockTransferTransaction = [
  12345,
  {
    trx_id: 'abc123',
    timestamp: '2023-01-01T12:00:00',
    op: [
      'transfer',
      {
        from: 'alice',
        to: 'bob',
        amount: '10.000 HIVE',
        memo: 'Test transfer'
      }
    ]
  }
];

const mockPowerUpTransaction = [
  12346,
  {
    trx_id: 'def456',
    timestamp: '2023-01-01T12:05:00',
    op: [
      'transfer_to_vesting',
      {
        from: 'alice',
        to: 'bob',
        amount: '5.000 HIVE'
      }
    ]
  }
];

const mockRewardTransaction = [
  12347,
  {
    trx_id: 'ghi789',
    timestamp: '2023-01-01T12:10:00',
    op: [
      'claim_reward_balance',
      {
        reward_hive: '1.000 HIVE',
        reward_hbd: '0.500 HBD',
        reward_vests: '100.000000 VESTS'
      }
    ]
  }
];

const mockCustomJsonTransaction = [
  12348,
  {
    trx_id: 'jkl012',
    timestamp: '2023-01-01T12:15:00',
    op: [
      'custom_json',
      {
        id: 'ssc-mainnet-hive',
        json: JSON.stringify({
          contractName: 'tokens',
          contractAction: 'transfer',
          contractPayload: {
            symbol: 'LEO',
            quantity: '100',
            to: 'bob'
          }
        })
      }
    ]
  }
];

// Mock the makeRPCCall function before importing the modules that use it
jest.mock('./hive-api', () => {
  const originalModule = jest.requireActual('./hive-api');
  
  // Create a mock version of makeRPCCall
  const mockMakeRPCCall = jest.fn();
  
  return {
    ...originalModule,
    makeRPCCall: mockMakeRPCCall,
  };
});

// Mock fetch for tests
global.fetch = jest.fn();

// Now import the modules after mocking
const { HiveAccountAPI } = require('./hive-api');

describe('HiveTransactionAPI', () => {
  beforeEach(() => {
    // Clear any existing mocks
    jest.clearAllMocks();
    
    // Reset the fetch mock
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getTransactionHistory', () => {
    it('should format transfer transactions correctly', async () => {
      // Mock the makeRPCCall function to return mock data
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall.mockResolvedValue([mockTransferTransaction]);

      const result = await HiveTransactionAPI.getTransactionHistory('alice', 10);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: '12345',
        type: 'transfer',
        amount: '10.000 HIVE',
        currency: 'HIVE',
        from: 'alice',
        to: 'bob',
        description: expect.stringContaining('Transfer 10.000 HIVE to @bob')
      });
    });

    it('should format power up transactions correctly', async () => {
      // Mock the makeRPCCall function to return mock data
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall.mockResolvedValue([mockPowerUpTransaction]);

      const result = await HiveTransactionAPI.getTransactionHistory('alice', 10);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: '12346',
        type: 'power_up',
        amount: '5.000 HIVE',
        currency: 'HIVE',
        from: 'alice',
        to: 'bob',
        description: expect.stringContaining('Power up 5.000 HIVE to @bob')
      });
    });

    it('should format reward transactions correctly', async () => {
      // Mock the makeRPCCall function to return mock data
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall.mockResolvedValue([mockRewardTransaction]);

      const result = await HiveTransactionAPI.getTransactionHistory('alice', 10);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: '12347',
        type: 'reward',
        description: expect.stringContaining('Claimed rewards: 1.000 HIVE, 0.500 HBD, 100.000000 VESTS'),
        currency: 'MIXED'
      });
    });

    it('should format custom JSON transactions correctly', async () => {
      // Mock the makeRPCCall function to return mock data
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall.mockResolvedValue([mockCustomJsonTransaction]);

      const result = await HiveTransactionAPI.getTransactionHistory('alice', 10);
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: '12348',
        type: 'custom',
        amount: '100',
        currency: 'LEO',
        description: expect.stringContaining('Transfer 100 LEO to @bob')
      });
    });
  });

  describe('getTransactionStats', () => {
    it('should calculate transaction stats correctly', async () => {
      // Mock the makeRPCCall function to return mock data
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall.mockResolvedValue([mockTransferTransaction]);

      const result = await HiveTransactionAPI.getTransactionStats('alice');
      
      expect(result).toMatchObject({
        totalTransactions: 1,
        totalVolume: expect.stringContaining('HIVE'),
        avgFee: '0.000 HIVE',
        successRate: '100.0%'
      });
    });
  });
});

describe('HiveAccountAPI', () => {
  beforeEach(() => {
    // Clear any existing mocks
    jest.clearAllMocks();
    
    // Reset the fetch mock
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getAccount', () => {
    it('should return account data when account exists', async () => {
      // Mock the makeRPCCall function to return mock account data
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall.mockResolvedValue([{
        name: 'alice',
        balance: '10.000 HIVE',
        hbd_balance: '5.000 HBD',
        vesting_shares: '1000.000000 VESTS',
        delegated_vesting_shares: '0.000000 VESTS',
        received_vesting_shares: '0.000000 VESTS'
      }]);

      const result = await HiveAccountAPI.getAccount('alice');
      
      expect(result).toMatchObject({
        name: 'alice',
        balance: '10.000 HIVE',
        hbd_balance: '5.000 HBD'
      });
    });

    it('should return null when account does not exist', async () => {
      // Mock the makeRPCCall function to return empty array
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall.mockResolvedValue([]);

      const result = await HiveAccountAPI.getAccount('nonexistent');
      
      expect(result).toBeNull();
    });
  });

  describe('getAccountHistory', () => {
    it('should return account history', async () => {
      // Mock the makeRPCCall function to return mock history data
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall.mockResolvedValue([mockTransferTransaction]);

      const result = await HiveAccountAPI.getAccountHistory('alice');
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(mockTransferTransaction);
    });
  });

  describe('getAccountBalances', () => {
    it('should return account balances', async () => {
      // Mock the makeRPCCall function for get_accounts
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall
        .mockResolvedValueOnce([{
          name: 'alice',
          balance: '10.000 HIVE',
          hbd_balance: '5.000 HBD',
          vesting_shares: '1000.000000 VESTS',
          delegated_vesting_shares: '100.000000 VESTS',
          received_vesting_shares: '50.000000 VESTS'
        }])
        .mockResolvedValueOnce({
          total_vesting_shares: '1000000.000000 VESTS',
          total_vesting_fund_hive: '10000.000 HIVE'
        });

      const result = await HiveAccountAPI.getAccountBalances('alice');
      
      expect(result).toHaveProperty('hive');
      expect(result).toHaveProperty('hbd');
      expect(result).toHaveProperty('hive_power');
      expect(result).toHaveProperty('delegated_hp');
      expect(result).toHaveProperty('received_hp');
    });

    it('should throw error when account not found', async () => {
      // Mock the makeRPCCall function to return empty array
      const { makeRPCCall } = require('./hive-api');
      makeRPCCall.mockResolvedValue([]);

      await expect(HiveAccountAPI.getAccountBalances('nonexistent')).rejects.toThrow('Account not found');
    });
  });
});

describe('HiveMarketAPI', () => {
  describe('getPrices', () => {
    it('should return price data', async () => {
      const result = await HiveMarketAPI.getPrices();
      
      expect(result).toHaveProperty('hive_usd');
      expect(result).toHaveProperty('hbd_usd');
      expect(typeof result.hive_usd).toBe('number');
      expect(typeof result.hbd_usd).toBe('number');
    });
  });

  describe('getUSDValue', () => {
    it('should calculate USD value for HIVE', async () => {
      // Mock the getPrices method to return consistent values
      jest.spyOn(HiveMarketAPI, 'getPrices').mockResolvedValue({
        hive_usd: 0.50,
        hbd_usd: 1.00
      });

      const result = await HiveMarketAPI.getUSDValue('10.000 HIVE', 'HIVE');
      expect(result).toBe(5.0); // 10 HIVE * $0.50
    });

    it('should calculate USD value for HBD', async () => {
      // Mock the getPrices method to return consistent values
      jest.spyOn(HiveMarketAPI, 'getPrices').mockResolvedValue({
        hive_usd: 0.50,
        hbd_usd: 1.00
      });

      const result = await HiveMarketAPI.getUSDValue('5.000 HBD', 'HBD');
      expect(result).toBe(5.0); // 5 HBD * $1.00
    });

    it('should return 0 for invalid inputs', async () => {
      const result = await HiveMarketAPI.getUSDValue('', '');
      expect(result).toBe(0);
    });
  });
});