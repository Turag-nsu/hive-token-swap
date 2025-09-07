// src/lib/api/hive-rpc.test.ts
import { hiveRPC } from './hive-rpc';

describe('HiveRPC', () => {
  it('should export hiveRPC object', () => {
    expect(hiveRPC).toBeDefined();
    expect(typeof hiveRPC).toBe('object');
  });

  it('should have methods for account operations', () => {
    expect(typeof hiveRPC.getAccount).toBe('function');
    expect(typeof hiveRPC.getAccounts).toBe('function');
    expect(typeof hiveRPC.getAccountHistory).toBe('function');
  });

  it('should have methods for blockchain operations', () => {
    expect(typeof hiveRPC.getDynamicGlobalProperties).toBe('function');
    expect(typeof hiveRPC.getCurrentBlockNumber).toBe('function');
    expect(typeof hiveRPC.getBlock).toBe('function');
    expect(typeof hiveRPC.getTransaction).toBe('function');
  });

  it('should have methods for balance operations', () => {
    expect(typeof hiveRPC.getBalance).toBe('function');
    expect(typeof hiveRPC.getVestingShares).toBe('function');
  });

  it('should have utility methods', () => {
    expect(typeof hiveRPC.estimateResourceCredits).toBe('function');
    expect(typeof hiveRPC.validateTransaction).toBe('function');
    expect(typeof hiveRPC.checkNodeHealth).toBe('function');
    expect(typeof hiveRPC.vestsToHivePower).toBe('function');
    expect(typeof hiveRPC.hivePowerToVests).toBe('function');
    expect(typeof hiveRPC.formatAsset).toBe('function');
    expect(typeof hiveRPC.parseAsset).toBe('function');
  });
});