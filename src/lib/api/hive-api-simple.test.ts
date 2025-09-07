// src/lib/api/hive-api-simple.test.ts
import { HiveAccountAPI, HiveTransactionAPI, HiveMarketAPI, makeRPCCall } from './hive-api';

describe('HiveAPI', () => {
  it('should export all required classes and functions', () => {
    expect(HiveAccountAPI).toBeDefined();
    expect(HiveTransactionAPI).toBeDefined();
    expect(HiveMarketAPI).toBeDefined();
    expect(makeRPCCall).toBeDefined();
  });

  it('should have methods in HiveAccountAPI', () => {
    expect(typeof HiveAccountAPI.getAccount).toBe('function');
    expect(typeof HiveAccountAPI.getAccountHistory).toBe('function');
    expect(typeof HiveAccountAPI.getAccountBalances).toBe('function');
  });

  it('should have methods in HiveTransactionAPI', () => {
    expect(typeof HiveTransactionAPI.getTransactionHistory).toBe('function');
    expect(typeof HiveTransactionAPI.getTransactionStats).toBe('function');
  });

  it('should have methods in HiveMarketAPI', () => {
    expect(typeof HiveMarketAPI.getPrices).toBe('function');
    expect(typeof HiveMarketAPI.getUSDValue).toBe('function');
  });
});